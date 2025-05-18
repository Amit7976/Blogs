import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import fs from "fs";
import BlogModel from "@/models/blogModel";
import { auth } from "@/nextAuth/auth";
import User from "@/models/userModel";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LoadDb = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit process if connection fails
  }
};

LoadDb();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// DELETE BLOG
export async function DELETE(request: any) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      console.log("[ERROR] User authentication failed.");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    console.log("🔑 Authenticated User ID:", userId);

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "ID is required" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    const imagePath = `./public/images/blogs/${blog.image}`;
    if (blog.image !== "/defaultBlog.png") {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${err.message}`);
        } else {
          console.log(`Image deleted: ${imagePath}`);
        }
      });
    }

    await User.updateOne({ _id: userId }, { $pull: { Blogs: id } });

    await BlogModel.findByIdAndDelete(id);
    console.log("Blog Deleted");

    return NextResponse.json({
      success: true,
      msg: "Blog deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting blog: ${error.message}`);
    return NextResponse.json(
      { success: false, msg: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
