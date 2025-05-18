"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { use, useEffect, useState } from "react";
import BlogCard from "../../../components/MainUi/BlogCard";
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// PLACEHOLDER FOR BLOGS
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


export default function MainContent({ params }: { params: Promise<{ category: string }> }) {

    const resolvedParams = use(params); // unwraps the Promise


    // FETCH BLOGS FOR SPECIFIC CATEGORY 
    const [data, setData] = useState<Blog[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blogs/category', {
                params: {
                    category: resolvedParams.category,
                },
            });
            setData(response.data.blogs);
            // console.log(response.data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoadingBlogs(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20 mx-auto">
                <h4 className="mb-16 mt-0 text-4xl font-bold tracking-wide capitalize">
                    {decodeURIComponent(resolvedParams.category)} <span className="text-gray-500">Blogs</span>
                </h4>
                <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
                    {loadingBlogs ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <AllBlogPlaceholder key={index} />
                        ))
                    ) : (
                        data.length > 0 ? (
                            data.map((blog, index) => (
                                <BlogCard
                                    key={index}
                                    title={blog.title}
                                    shortDescription={blog.shortDescription}
                                    imageUrl={blog.image}
                                    href={blog._id}
                                    category={decodeURIComponent(resolvedParams.category)}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center my-16 w-full lg:col-span-2">
                                <h4 className="text-4xl font-bold text-gray-500 dark:text-white">No Blog Found</h4>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}