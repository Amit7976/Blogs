"use client";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Blog } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface CardProps {
    blog: Blog;
    deleteBlog: (id: string) => void;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Card: React.FC<CardProps> = ({ blog, deleteBlog }) => {
    return (
        <div className="bg-white hover:bg-gray-50 dark:bg-neutral-900 w-full col-span-1 h-fit p-2 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-red-100 dark:hover:shadow-gray-950 hover:scale-105 dark:hover:scale-101 will-change-transform duration-300">

            <Link href={`/blogs/${blog.category}/${blog._id}`} target="_blank">
                <Image width={300} height={300} className="shrink-0 w-full aspect-video rounded-lg" src={`/images/blogs${blog.image}`} alt="Blog Image" />
            </Link>

            <div className="pt-2">
                <Link href={`/blogs/${blog.category}/${blog._id}`} target="_blank">
                    <span className="text-lg text-gray-600 dark:text-neutral-300 line-clamp-1 font-semibold">{blog.title}</span>
                </Link>
            </div>

            <div className="flex justify-between items-center pt-3">
                <p className="text-sm text-gray-600 dark:text-neutral-400 flex flex-col gap-0.5">
                    {blog.updated_at &&
                        new Date(blog.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", })}
                    <span className="text-xs text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", })}
                    </span>
                </p>

                <p>-</p>

                <p className={`py-1.5 px-5 inline-flex items-center gap-x-1 text-xs font-medium ${blog.status === "publish" ? "text-teal-800 rounded-lg dark:text-teal-500" : "text-blue-800 rounded-lg dark:text-blue-500"}`} >
                    {blog.status === "publish" ? "Published" : "Draft"}
                </p>
            </div>

            <div className="pt-3">
                <div className="flex items-center justify-between gap-1">
                    <Link href={`/blogs/${blog.category}/${blog._id}`} className="w-full">
                        <MdOutlineRemoveRedEye className="bg-gray-50 hover:bg-gray-100 hover:text-gray-600 duration-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 active:scale-90 rounded w-full h-10 p-2.5 cursor-pointer" />
                    </Link>

                    <Link href={`/blogs/edit/${blog._id}`} className="w-full">
                        <TbEdit className="bg-gray-50 hover:bg-blue-100 dark:bg-neutral-800 dark:hover:bg-neutral-900 hover:text-gray-600 duration-300 active:scale-90 rounded w-full h-10 p-2.5 cursor-pointer" />
                    </Link>

                    <MdOutlineDeleteOutline className="bg-gray-50 hover:bg-red-100 hover:text-gray-600 duration-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 active:scale-90 rounded w-full h-10 p-2.5 cursor-pointer" onClick={() => deleteBlog(blog._id)} />
                </div>
            </div>
            
        </div>
    );
};

export default Card;
