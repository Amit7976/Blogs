import { NextRequest, NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'
import BlogModel from '@/models/blogModel'


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const LoadDb = async () => {
    try {
        await connect();
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

LoadDb();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// GET BLOG DATA
export async function GET(request: NextRequest) {
  const rawCategory = request.nextUrl.searchParams.get("category");

  if (rawCategory) {

    // Fetch blogs by category

    try {
      const category = decodeURIComponent(rawCategory);

      //-----------------------------------------------------------------------

      const blogs = await BlogModel.find({
        category: category,
        status: { $ne: "draft" },
      })
        .sort({ date: -1 })
        .select("title image shortDescription _id");

      //-----------------------------------------------------------------------

      return NextResponse.json({ blogs });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

  } else {

    //  Fetch Category and Count the blogs Number in each Category

    try {
      const categories = await BlogModel.aggregate([
        {
          $match: { status: { $ne: "draft" } },
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            category: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]);

      //-----------------------------------------------------------------------

      return NextResponse.json({ categories });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////