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
        // Aggregation pipeline to group blogs by category and count the number of blogs in each category
       const categories = await BlogModel.aggregate([
    {
        $match: { status: { $ne: 'draft' } } // Filter out drafts
    },
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            category: "$_id",
            count: 1,
            _id: 0
        }
    }
]);

return NextResponse.json({ categories });

        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////