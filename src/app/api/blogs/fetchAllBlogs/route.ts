import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogModel from "@/models/blogModel";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LoadDb = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

LoadDb();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET BLOG DATA
export async function GET(request: NextRequest) {
  const blogID = request.nextUrl.searchParams.get("blogPost");
  
  if (blogID) {
    //-----------------------------------------------------------------------

    const blog = await BlogModel.findById(blogID);
    return NextResponse.json(blog);

    //-----------------------------------------------------------------------
  } else {
    //-----------------------------------------------------------------------

    const blogs = await BlogModel.find({ status: { $ne: "draft" } })
      .sort({ date: -1 })
      .select("title image category shortDescription _id");
    return NextResponse.json({ blogs });

    //-----------------------------------------------------------------------
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
