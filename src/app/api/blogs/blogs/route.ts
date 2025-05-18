import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import BlogModel from "@/models/blogModel";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { Buffer } from "buffer";
import User from "@/models/userModel";
import { auth } from "@/nextAuth/auth";
import fs from "fs";

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
export async function GET(request: any) {
  try {
    const blogID = request.nextUrl.searchParams.get("blogPost");
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //-----------------------------------------------------------------------

    if (blogID) {
      const userOwnsBlog = await User.exists({
        _id: session.user.id,
        Blogs: blogID,
      });

      if (!userOwnsBlog) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 403 }
        );
      }

      const blog = await BlogModel.findById(blogID);
      return NextResponse.json(blog);
    }

    //-----------------------------------------------------------------------

    const user = await User.findById(session.user.id).select("Blogs");

    //-----------------------------------------------------------------------

    const blogs = await BlogModel.find({ _id: { $in: user.Blogs } })
      .sort({ date: -1 })
      .select("title image date status category _id created_at updated_at");

    //-----------------------------------------------------------------------

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// POST BLOG DATA
export async function POST(request: any) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.log("[ERROR] User authentication failed.");
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  console.log("🔑 Authenticated User ID:", userId);

  //-----------------------------------------------------------------------

  const formData = await request.formData();
  const timeStamp = Date.now();

  //-----------------------------------------------------------------------

  const image = formData.get("image");
  let imgUrl = "/defaultBlog.png";
  if (image) {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/images/blogs/${timeStamp}_${image.name}`;
    await writeFile(path, buffer);
    imgUrl = `/${timeStamp}_${image.name}`;
  }

  //-----------------------------------------------------------------------

  const blogData = {
    title: `${formData.get("title")}`,
    shortDescription: `${formData.get("shortDescription")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")?.toString().trim() || ""}`,
    tags: `${formData.get("tags")}`,
    status: `${formData.get("status")}`,
    image: `${imgUrl}`,
    imageTitle: `${formData.get("imageTitle")}`,
  };

  //-----------------------------------------------------------------------

  const newPost = await BlogModel.create(blogData);
  console.log("Blog Saved");

  //-----------------------------------------------------------------------

  await User.updateOne({ _id: userId }, { $push: { Blogs: newPost._id } });

  //-----------------------------------------------------------------------

  return NextResponse.json({
    success: true,
    blogId: newPost.id,
    msg: "Blog Added successfully",
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// UPDATE BLOG
export async function PUT(request: any) {
  try {
    const formData = await request.formData();
    const blogId = formData.get("blogId");
    const timeStamp = Date.now();

    //-----------------------------------------------------------------------

    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    //-----------------------------------------------------------------------

    const blogExists = await User.exists({
      _id: userId,
      Blogs: blogId,
    });

    if (!blogExists) {
      return NextResponse.json(
        { error: "This blog does not belong to the user" },
        { status: 403 }
      );
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" });
    }

    //-----------------------------------------------------------------------

    let imgUrl = blog.image;
    const newImage = formData.get("image");

    // Handle image upload
    if (newImage && newImage.size > 0) {
      const imageByteData = await newImage.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const imagePath = path.join(
        "./public/images/blogs",
        `${timeStamp}_${newImage.name}`
      );
      await writeFile(imagePath, buffer);

      // Delete the old image if it exists
      if (blog.image !== "/defaultBlog.png") {
        const oldImagePath = path.join("./public/images/blogs", blog.image);
        await unlink(oldImagePath).catch((err) => {
          console.error("Error deleting old image:", err);
        });
      }

      imgUrl = `/${timeStamp}_${newImage.name}`;
    }

    //-----------------------------------------------------------------------

    const updatedBlogData = {
      title: formData.get("title")?.toString(),
      shortDescription: formData.get("shortDescription")?.toString(),
      description: formData.get("description")?.toString(),
      category: `${formData.get("category")?.toString().trim() || ""}`,
      tags: formData.get("tags")?.toString(),
      status: formData.get("status")?.toString(),
      image: imgUrl,
      imageTitle: formData.get("imageTitle")?.toString(),
    };

    //-----------------------------------------------------------------------

    await BlogModel.findByIdAndUpdate(blogId, updatedBlogData);

    //-----------------------------------------------------------------------

    return NextResponse.json({
      success: true,
      msg: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, msg: "Error updating blog" });
  }
}

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

    //-----------------------------------------------------------------------

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "ID is required" },
        { status: 400 }
      );
    }

    //-----------------------------------------------------------------------

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    //-----------------------------------------------------------------------

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

    //-----------------------------------------------------------------------

    await User.updateOne({ _id: userId }, { $pull: { Blogs: id } });

    //-----------------------------------------------------------------------

    await BlogModel.findByIdAndDelete(id);
    console.log("Blog Deleted");

    //-----------------------------------------------------------------------

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
