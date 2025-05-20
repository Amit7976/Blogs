"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import LatestBlogs from "./LatestBlogs";
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface blogsProps {
    resolvedParams: {
        blogPost: string;
    };
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function MainContent({ resolvedParams }: blogsProps) {


    const [data, setData] = useState<Blog | null>(null);
    const [blogLoading, setBlogLoading] = useState(true);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blogs/fetchAllBlogs', {
                params: {
                    blogPost: resolvedParams.blogPost,
                },
            })
            setData(response.data);
            //console.log(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setBlogLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [])


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SEPARATE TAGS
    const itemsString = data && data.tags;
    const itemsArray = itemsString && itemsString.split(', ');


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const router = useRouter();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="w-full px-4 sm:px-6 lg:py-16 lg:px-28 mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">

                    <div className="col-span-1 lg:col-span-2">
                        <div className="">
                            <div className="space-y-5 lg:space-y-8">
                                <Button
                                    variant={"ghost"}
                                    onClick={() => router.back()}
                                    className="inline-flex items-center gap-x-1.5 mt-2 text-sm text-gray-600 decoration-2 dark:text-gray-500 select-none cursor-pointer"
                                    style={{ padding: 0 }}
                                >
                                    <IoChevronBackOutline className="flex-shrink-0 size-4" />
                                    Back to Blogs
                                </Button>

                                {blogLoading ? (
                                    <div className="flex items-center justify-center h-screen">
                                        <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">{data && data.title}</h2>

                                        <div className="flex items-center gap-x-5">
                                            <a
                                                className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200 capitalize"
                                                href={`/blogs/${data && data.category}`}
                                            >
                                                {data && data.category}
                                            </a>
                                            <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                                                {data && new Date(data.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>

                                        <p className="text-lg text-gray-800 dark:text-gray-300">{data && data.shortDescription}</p>

                                        <figure>
                                            {data && (
                                                <Image
                                                    className="w-full aspect-video object-cover rounded-xl select-none"
                                                    src={`/images/blogs${data.image}`}
                                                    alt={data && data.imageTitle}
                                                    width={800}
                                                    height={800}
                                                />
                                            )}
                                            <p className="text-sm font-medium text-center mt-3 mb-10 text-gray-500">{data && data.imageTitle}</p>
                                        </figure>


                                        <section className="my-10 space-y-5 md:space-y-8 text-ellipsis overflow-x-auto pb-5 blogContent">
                                            {data && (<div dangerouslySetInnerHTML={{ __html: data.description }} />)}
                                        </section>

                                        <div className="grid lg:flex lg:items-center gap-2 pt-5">

                                            {itemsArray && itemsArray.map((item, index) => (
                                                <p
                                                    key={index}
                                                    className="m-0.5 inline-flex w-fit items-center gap-1.5 py-2 px-6 rounded-lg text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                                                >
                                                    {item}
                                                </p>
                                            ))}

                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                    <LatestBlogs />

                </div>
            </div>
        </>
    )
}

export default MainContent