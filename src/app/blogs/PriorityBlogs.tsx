import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Blog } from "@/lib/utils";


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


interface CategoryProps {
    blogs: Blog[];
    loadingBlogs: boolean;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function PriorityBlogs({ blogs, loadingBlogs }: CategoryProps) {


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const topTwoRecentBlogs = blogs
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 2);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20 lg:pb-10 mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingBlogs ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <PriorityBlogPlaceholder key={index} />
                        ))
                    ) : (
                        topTwoRecentBlogs.map((blog, index) => (
                            <Link className="group" href={`/blogs/${blog.category}/${blog._id}`} key={index}>
                                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                                    <Image
                                        width={800}
                                        height={800}
                                        className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl select-none"
                                        src={`/images/blogs${blog.image}`}
                                        alt={blog.title}
                                    />
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
                    <div
                        className="group relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition border-2"
                    >
                        <div className="w-full h-72 col-span-1">
                            <Image
                                src="/images/logo/electricIcon.svg"
                                alt="Accelerate Your Business"
                                width={800}
                                height={800}
                                className="w-full h-full object-contain select-none"
                            />
                        </div>
                        <div className="flex flex-col px-5 py-6 gap-2 col-span-2">
                            <h1 className="text-2xl font-bold text-[#2b2b2b] dark:text-white">
                                Full Stack Assignment for Internship Hiring
                            </h1>
                            <p className="text-sm font-medium my-2 text-gray-400">
                                Design and develop a full-stack application that allows users to write, edit, save, and publish
                                blogs with an auto-save draft feature.
                            </p>
                            <div className="flex gap-2 items-center flex-wrap select-none">
                                <Link href={"/doc/assignment.pdf"} className="px-4 py-2 mt-5 text-sm font-semibold text-white bg-[#FE4A03] hover:bg-orange-700 rounded-full flex items-center gap-2">
                                    Assignment Details <FaChevronRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriorityBlogs
