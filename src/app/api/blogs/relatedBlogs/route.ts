import { NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'
import BlogModel from '@/models/blogModel'


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const LoadDb = async () => {
    try {
        await connect();
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit process if connection fails
    }
}

LoadDb();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export async function GET(request: any) {
    const blogID = request.nextUrl.searchParams.get("blogPost");

    if (blogID) {
        try {
            // Fetch the current blog
            const currentBlog = await BlogModel.findById(blogID);
            if (!currentBlog) {
                return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            }

            const category = currentBlog.category;
            const tags = currentBlog.tags.split(','); // Assuming tags are comma-separated

            // Step 1: Fetch blogs by category
            const blogsByCategory = await BlogModel.find({ 
                category, 
                status: { $ne: 'draft' } 
            })
            .where('_id').ne(blogID) // Exclude the current blog
            .limit(10);

            // Step 2: Fetch blogs by tags if needed
            let relatedBlogs = [...blogsByCategory];
            if (relatedBlogs.length < 10) {
                const additionalBlogsByTags = await BlogModel.find({
                    tags: { $in: tags },
                    status: { $ne: 'draft' }
                })
                .where('_id').ne(blogID) // Exclude the current blog
                .limit(10 - relatedBlogs.length);

                relatedBlogs = [...relatedBlogs, ...additionalBlogsByTags];
            }

            // Step 3: Fetch any remaining blogs if needed
            if (relatedBlogs.length < 10) {
                const remainingBlogs = await BlogModel.find({
                    status: { $ne: 'draft' }
                })
                .where('_id').ne(blogID) // Exclude the current blog
                .limit(10 - relatedBlogs.length);

                relatedBlogs = [...relatedBlogs, ...remainingBlogs];
            }

            // Ensure uniqueness
            const uniqueBlogsMap = new Map();
            relatedBlogs.forEach(blog => {
                uniqueBlogsMap.set(blog._id.toString(), blog);
            });
            const uniqueBlogs = Array.from(uniqueBlogsMap.values());

            return NextResponse.json({ relatedBlogs: uniqueBlogs });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////