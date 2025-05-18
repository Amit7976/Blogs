import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface RelatedBlogsProps {
    resolvedParams: {
        blogPost: string;
    };
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// PLACEHOLDER FOR RELATED BLOGS
function RelatedBlogPlaceholder() {
    return (
        <>
            <div className="flex flex-col space-y-3 basis-1/3 pl-5 flex-grow">
                <Skeleton className="w-full object-cover rounded-xl h-[250px]" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full rounded-full" />
                    <Skeleton className="h-5 w-1/2 rounded-full" />
                </div>
                <div className="space-y-2 pt-1">
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-full rounded-full" />
                </div>
                <div className="space-y-2 pt-1">
                    <Skeleton className="h-3 w-1/4 rounded-full" />
                </div>
            </div>
        </>
    );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function RelatedBlogs({ resolvedParams }: RelatedBlogsProps) {


    // FETCH RELATED BLOGS [FOCUS SERIES:- CATEGORY > TAGS > RANDOM]
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
    const [relatedBlogsLoading, setRelatedBlogsLoading] = useState(true);

    const fetchRelatedBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/relatedBlogs', {
                params: {
                    blogPost: resolvedParams.blogPost,
                },
            })
            setRelatedBlogs(response.data.relatedBlogs);
            //console.log(response.data.relatedBlogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setRelatedBlogsLoading(false);
        }
    }

    useEffect(() => {
        fetchRelatedBlogs();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="text-start mb-10 lg:my-10 px-6 w-fit">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                        Related Blogs
                    </h2>
                    <div className="w-3/4 h-1.5 bg-gradient-to-l from-gray-300 to-gray-400 rounded-full mt-1.5"></div>
                </div>

                <div
                    className="h-auto">
                    <div className="flex">
                        {relatedBlogsLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <RelatedBlogPlaceholder key={index} />
                            ))
                        ) : (relatedBlogs.map((RelatedBlog, index) => (
                            <div key={index} className="basis-1/3 pl-5 flex-grow">
                                <div
                                    data-aos="fade-up"
                                    data-aos-offset="0"
                                    data-aos-delay="0"
                                    data-aos-duration={`${index * 300 + 200}`}
                                    data-aos-easing="ease"
                                    data-aos-mirror="false"
                                    data-aos-once="true"
                                    className="w-full rounded-xl flex flex-col h-full min-h-[330px]"
                                >
                                    <a
                                        className="group hover:bg-gray-100 rounded-xl p-5 transition-all dark:hover:bg-white/10"
                                        href={`/blogs/${RelatedBlog.category}/${RelatedBlog._id}`}>
                                        <div className="aspect-w-16 aspect-h-10">
                                            <Image
                                                className="w-full object-cover rounded-xl h-[250px] select-none"
                                                src={`/images/blogs${RelatedBlog.image}`}
                                                alt={RelatedBlog.title}
                                                width={800}
                                                height={800}
                                            />
                                        </div>
                                        <h3 className="mt-5 text-xl font-medium text-gray-800 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                                            {RelatedBlog.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-300 dark:hover:text-white line-clamp-3">
                                            {RelatedBlog.shortDescription}
                                        </p>
                                        <p className="mt-3 select-none inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                            Learn more
                                            <svg
                                                className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
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
                                    </a>
                                </div>
                            </div>
                        )))}
                    </div>
                    <div className="select-none" />
                    <div className="select-none" />
                </div>
            </div>
        </>
    )
}

export default RelatedBlogs
