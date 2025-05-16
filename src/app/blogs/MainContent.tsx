"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function PriorityBlogPlaceholder() {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-ful w-full aspect-[16/11] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded-full" />
          <Skeleton className="h-6 w-1/2 rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-full rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-5 w-1/4 rounded-full" />
        </div>
      </div>
    </>
  );
}


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


function CategoryPlaceholder() {
  return (
    <div className="flex items-center space-x-4 w-40 overflow-hidden">
      <Skeleton className="h-10 w-40 rounded-full" />
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG FOR TYPESCRIPT
interface Blog {
  sponsored: Boolean;
  category: string;
  count: number;
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  tags: string;
  createdAt: Date;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function MainContent() {
  
  
  // FETCH ALL BLOGS
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };
  
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // FETCH BLOG CATEGORIES
  const [blogsCategories, setBlogsCategories] = useState<Blog[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const fetchBlogsCategories = async () => {
    try {
      const response = await axios.get('/api/blogs/blogCategories');
      setBlogsCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // FETCH PRIORITY BLOGS
  const [priorityBlogs, setPriorityBlogs] = useState<Blog[]>([]);
  const [loadingPriorityBlogs, setLoadingPriorityBlogs] = useState(true);
  const fetchPriorityBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs/priority');
      const blogs = response.data.blogs;
      const sortedBlogs = blogs.sort((a: Blog, b: Blog) => {
        if (a.sponsored && !b.sponsored) return -1;
        if (!a.sponsored && b.sponsored) return 1;
        return 0;
      });
      setPriorityBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching priority blogs:', error);
    } finally {
      setLoadingPriorityBlogs(false);
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchBlogs(), fetchBlogsCategories(), fetchPriorityBlogs()]);
    };
    fetchData();
  }, []);



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  return (
    <>
      {/* Priority Blogs */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20 lg:pb-10 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingPriorityBlogs ? (
            Array.from({ length: 2 }).map((_, index) => (
              <PriorityBlogPlaceholder key={index} />
            ))
          ) : (
            priorityBlogs.map((blog, index) => (
              <Link className="group" href={`/pages/blogs/${blog.category}/${blog._id}`} key={index}>
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                  <Image
                    width={800}
                    height={800}
                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl select-none"
                    src={`/images/blogs${blog.image}`}
                    alt={blog.title}
                  />
                  {blog.sponsored ? (
                    <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900 select-none">
                      Sponsored
                    </span>
                  ) : null}
                </div>
                <div className="mt-7">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-3 text-gray-800 dark:text-neutral-200 line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium select-none">
                    Read more
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </p>
                </div>
              </Link>
            ))
          )}
          <Link
            className="group relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition border-2"
            href="#"
          >
            <div className="w-full h-72 col-span-1">
              <Image
                src="/images/Random/weAreHiring.svg"
                alt="Accelerate Your Business"
                width={800}
                height={800}
                className="w-full h-full object-contain select-none"
              />
            </div>
            <div className="flex flex-col px-5 py-6 gap-2 col-span-2">
              <h1 className="text-2xl font-bold text-[#2b2b2b]">
                Need Office/Working Staff?
              </h1>
              <p className="text-sm font-medium my-2 text-gray-400">
                Save your valuable time and find the most suitable candidate for
                your company. Jobboost makes that it is possible to find the
                correct personnel for your team.
              </p>
              <div className="flex gap-2 items-center flex-wrap select-none">
                <Button className="px-4 py-2 mt-5 text-sm font-semibold text-white bg-[#FE4A03] hover:bg-orange-700 rounded-full flex items-center gap-2">
                  Post a Job Role <FaChevronRight />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Ebd Priority Blogs */}

      {/* All Blogs */}
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
      {/* End All Blogs */}

      {/* Popular Category */}
      <section className='p-28 py-5 mb-10'>
        <h3 className='text-3xl font-bold'>Popular Category</h3>
        <div className="flex items-center gap-x-5 gap-y-3 flex-wrap my-10">
          {loadingCategories ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CategoryPlaceholder key={index} />
            ))
          ) : (
            blogsCategories.map((category, index) => (
              <Link href={`/pages/blogs/${category.category}`} key={index} className='text-base font-medium p-3 px-10 bg-gray-100 rounded-full'>
                {category.category} <span className="opacity-60 text-sm pl-1">({category.count})</span>
              </Link>
            ))
          )}
        </div>
      </section>
      {/* End Popular Category */}
    </>
  );
}

export default MainContent;

