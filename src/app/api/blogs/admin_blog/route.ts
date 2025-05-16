import { NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'
import BlogModel from '@/models/blogModel'
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { Buffer } from 'buffer';


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


// GET BLOG DATA
export async function GET(request: any) {

    const blogID = request.nextUrl.searchParams.get("blogPost");
    if (blogID) {

        const blog = await BlogModel.findById(blogID);
        return NextResponse.json(blog)

    } else {

        // const blogs = await BlogModel.find({}).sort({ date: -1 }).select('-description');
        // return NextResponse.json({ blogs })  
        const blogs = await BlogModel.find({})
            .sort({ date: -1 })
            .select('title image date status category _id');

        return NextResponse.json({ blogs });

        
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/// POST BLOG DATA
export async function POST(request: any) { 
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/images/blogs/${timeStamp}_${image.name}`
    await writeFile(path, buffer);
    const imgUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        shortDescription: `${formData.get('shortDescription')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        tags: `${formData.get('tags')}`,
        status: `${formData.get('status')}`,
        priority: `${formData.get('priority')}`,
        sponsored: `${formData.get('sponsored')}`,
        image: `${imgUrl}`,
        imageTitle: `${formData.get('imageTitle')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog Saved");
    
    return NextResponse.json({success:true, msg:"Blog Added successfully"})
    
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// UPDATE BLOG
export async function PUT(request: any) {
    try {
        const formData = await request.formData();
        const blogId = formData.get('blogId');
        const timeStamp = Date.now();

        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" });
        }

        let imgUrl = blog.image;
        const newImage = formData.get('image');

        // Handle image upload if a new image is provided
        if (newImage && newImage.size > 0) {
            const imageByteData = await newImage.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const imagePath = path.join('./public/images/blogs', `${timeStamp}_${newImage.name}`);
            await writeFile(imagePath, buffer);

            // Delete the old image if it exists
            if (blog.image) {
                const oldImagePath = path.join('./public/images/blogs', blog.image);
                await unlink(oldImagePath).catch((err) => {
                    console.error("Error deleting old image:", err);
                });
            }

            imgUrl = `/${timeStamp}_${newImage.name}`;
        }

        const updatedBlogData = {
            title: formData.get('title')?.toString(),
            shortDescription: formData.get('shortDescription')?.toString(),
            description: formData.get('description')?.toString(),
            category: formData.get('category')?.toString(),
            tags: formData.get('tags')?.toString(),
            status: formData.get('status')?.toString(),
            priority: formData.get('priority') === 'true',
            sponsored: formData.get('sponsored') === 'true',
            image: imgUrl,
            imageTitle: formData.get('imageTitle')?.toString(),
        };

        await BlogModel.findByIdAndUpdate(blogId, updatedBlogData);

        return NextResponse.json({ success: true, msg: "Blog updated successfully" });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ success: false, msg: "Error updating blog" });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
