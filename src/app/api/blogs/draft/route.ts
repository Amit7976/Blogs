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
  
        try {
            const blogs = await BlogModel.find({ status: 'draft' })
                .select('title image date status category _id');
            return NextResponse.json({ blogs });



        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////