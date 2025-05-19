"use client"
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// PLACEHOLDER FOR LATEST BLOGS
function LatestBlogPlaceholder() {
    return (
        <div className="flex items-center space-x-4 w-full overflow-hidden">
            <Skeleton className="w-full size-20 rounded-xl flex-shrink-0" />
            <div className="w-full">
                <div className="space-y-2 w-full">
                    <Skeleton className="h-3 w-full rounded-full" />
                    <Skeleton className="h-3 w-1/2 rounded-full" />
                </div>
                <div className="space-y-2 w-full pt-1">
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-2 w-2/3 rounded-full" />
                </div>
            </div>
        </div>
    );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function LatestBlogs() {

    // FETCH 5 LATEST BLOGS
    const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
    const [latestBlogsLoading, setLatestBlogsLoading] = useState(true);

    const fetchLatestBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/latestBlogs');
            setLatestBlogs(response.data.latestBlogs);
            // console.log(response.data.latestBlogs);

        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLatestBlogsLoading(false);
        }
    }

    useEffect(() => {
        fetchLatestBlogs();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
      <>
          <div className="lg:col-span-1 lg:w-full lg:h-full">
              <div className="sticky top-14 start-0 py-8 lg:ps-10">
                  <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-4 mb-8 dark:border-neutral-700 select-none">
                      <h2 className="text-lg font-semibold">Latest Blog Posts</h2>
                  </div>

                  <div className="space-y-6">
                      {latestBlogsLoading ? (
                          Array.from({ length: 5 }).map((_, index) => (
                              <LatestBlogPlaceholder key={index} />
                          ))
                      ) : (latestBlogs.map((blog, index) => (
                          <a
                              key={index}
                              className="group flex items-center gap-x-6"
                              href={`/blogs/${blog.category}/${blog._id}`}
                          >
                              <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                                  <Image
                                      className="size-full absolute top-0 start-0 object-cover rounded-lg select-none"
                                      src={`/images/blogs${blog.image}`}
                                      alt={blog.title}
                                      width={800}
                                      height={800}
                                  />
                              </div>
                              <div className="h-full">
                                  <h3 className="mt-0.5 text-base font-medium text-gray-800 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                                      {blog.title}
                                  </h3>
                                  <p className="mt-1 text-xs text-gray-500 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                                      {blog.shortDescription}
                                  </p>
                              </div>
                          </a>
                      ))
                      )}
                  </div>
              </div>
          </div>
      </>
  )
}

export default LatestBlogs