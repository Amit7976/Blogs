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


// GET BLOG DATA
export async function GET(request: any) {
    const category = request.nextUrl.searchParams.get("category");

    if (category) {
        try {
            // Fetch blogs by category
            const blogs = await BlogModel.find({
                category: category,
                status: { $ne: 'draft' }
            })
            .sort({ date: -1 })
            .select('title image shortDescription _id');

            return NextResponse.json({ blogs });

        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////