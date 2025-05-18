"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "@/components/MainUi/BlogCard";
import PriorityBlogs from "./PriorityBlogs";
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function AllBlogPlaceholder() {
  return (
    <div className="flex items-center space-x-4 w-full overflow-hidden">
      <Skeleton className="w-full sm:w-56 h-44 rounded-xl flex-shrink-0" />
      <div className="w-full">
        <div className="space-y-2 w-full mt-3">
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-1/2 rounded-full" />
        </div>
        <div className="space-y-2 w-full pt-4">
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
        <div className="space-y-2 pt-4">
          <Skeleton className="h-6 w-1/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function MainContent() {


  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs/fetchAllBlogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    const fetchData = async () => {
      await fetchBlogs();
    };
    fetchData();
  }, []);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>

      <PriorityBlogs blogs={blogs} loadingBlogs={loadingBlogs} />


      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-10 mx-auto">
        <h4 className="mb-16 mt-0 text-4xl font-bold tracking-wide">
          All Blogs
        </h4>
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {loadingBlogs ? (
            Array.from({ length: 4 }).map((_, index) => (
              <AllBlogPlaceholder key={index} />
            ))
          ) : (
            blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                shortDescription={blog.shortDescription}
                imageUrl={blog.image}
                href={blog._id}
                category={blog.category}
              />
            ))
          )}
        </div>
      </div>

    </>
  );
}

export default MainContent;

