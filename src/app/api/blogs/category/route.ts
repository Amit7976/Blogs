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
  const rawCategory = request.nextUrl.searchParams.get("category");

  if (rawCategory) {
    try {
      const category = decodeURIComponent(rawCategory); // Decode the category

      console.log("====================================");
      console.log("Decoded Category:", category);
      console.log("====================================");

      // Fetch blogs by category
      const blogs = await BlogModel.find({
        category: category,
        status: { $ne: "draft" },
      })
        .sort({ date: -1 }) // or .sort({ created_at: -1 }) if your field is named like that
        .limit(2) // Limit to 2 blogs
        .select("title image shortDescription _id");

      return NextResponse.json({ blogs });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////