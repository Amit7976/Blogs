"use client";
import BlogCard from "../BlogCard";
import axios from "axios";
import Footer from "@/components/MainUi/Footer/Footer";
import React, { useEffect, useState } from "react";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import AnnouncementBanner from "@/components/MainUi/AnnouncementBanner/AnnouncementBanner";
import BlogSubFooter from "@/components/MainUi/Footer/BlogSubFooter";
import { Skeleton } from "@/components/ui/skeleton";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG FOR TYPESCRIPT
interface Blog {
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


const page = ({ params }: any) => {


    // FETCH BLOGS FOR SPECIFIC CATEGORY 
    const [data, setData] = useState<Blog[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blogs/category', {
                params: {
                    category: params.category,
                },
            });
            setData(response.data.blogs);
            console.log(response.data.blogs);
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
            {/* Header For Blog */}
            <HeaderForBlog />
            {/* End Header For Blog */}

            {/* Announcement Banner */}
            <AnnouncementBanner />
            {/* End Announcement Banner */}

            {/* Main Content */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20 mx-auto">
                <h4 className="mb-16 mt-0 text-4xl font-bold tracking-wide capitalize">
                    {params.category} Blogs
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
                                    category={blog.category}
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
            {/* End Main Content */}

            {/* Blog Sub Footer */}
            <BlogSubFooter />
            {/* End Blog Section*/}

            {/* Footer */}
            <Footer />
            {/* End Footer */}
        </>
    );
};

export default page;
