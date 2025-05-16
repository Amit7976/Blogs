import { NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'
import fs from 'fs'
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


/// DELETE BLOG
export async function DELETE(request: any) { 

    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }

        const imagePath = `./public/images/blogs/${blog.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete image: ${err.message}`);
            } else {
                console.log(`Image deleted: ${imagePath}`);
            }
        });

        await BlogModel.findByIdAndDelete(id);
        console.log("Blog Deleted");

        return NextResponse.json({ success: true, msg: "Blog deleted successfully" });

    } catch (error:any) {
        console.error(`Error deleting blog: ${error.message}`);
        return NextResponse.json({ success: false, msg: "Failed to delete blog" }, { status: 500 });
    }
    
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////