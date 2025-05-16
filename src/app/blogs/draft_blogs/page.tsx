"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG FOR TYPESCRIPT
interface Blog {
    sponsored: Boolean;
    category: string;
    _id: string;
    title: string;
    shortDescription: string;
    image: string;
    tags: string,
    status: string,
    date: Date
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function page() {


    // FETCH  BLOGS WHO HAVE STATUS DRAFT
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [blogLoading, setBlogLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/draft');
            setBlogs(response.data.blogs);
            console.log(response.data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setBlogLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Filter blogs based on the search query
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
        const filtered = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [searchQuery, blogs]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // DELETE THE BLOG
    const deleteBlog = async (blogId: string) => {
        if (confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await axios.delete(`/api/blogs/delete?id=${blogId}`);

                if (response.data.success) {
                    console.log('Blog deleted successfully');
                    setBlogs(blogs.filter(blog => blog._id !== blogId));
                    alert("Blog deleted successfully");
                } else {
                    console.error('Failed to delete blog:', response.data.msg);
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="px-4 py-10 sm:px-6 lg:px-0 lg:py-4">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border-gray-200 rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                                {/* <!-- Header --> */}
                                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                    <h2 className="text-4xl font-bold text-black">Draft Blogs</h2>

                                    {/* <!-- Search --> */}
                                    <div className="flex items-center gap-10">
                                        <div className="sm:col-span-1">
                                            <label htmlFor="blogSearch" className="sr-only">Search Blog</label>
                                            <div className="relative">
                                                <Input type="text" id="blogSearch" name="blogSearch" className="py-2 px-3 ps-11 h-12 block w-96 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search Blog" value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                                    <svg className="shrink-0 size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- End Search --> */}

                                </div>
                                {/* <!-- End Header --> */}

                                {/* Main Content */}
                                {blogLoading ? (
                                    <div className="flex items-center justify-center h-screen">
                                        <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
                                    </div>
                                ) : (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead className="bg-gray-50 dark:bg-neutral-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                        Product
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                        Review
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                        Date
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                        Status
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                        Actions
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {filteredBlogs.length > 0 ? (
                                            filteredBlogs.map((blog) => (
                                                <tr key={blog._id} className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                                <td className="size-px whitespace-nowrap flex-shrink-0">
                                                    <div className="p-4">
                                                        <Link href={`/blogs/${blog.category}/${blog._id}`} target="_blank">
                                                            <Image
                                                                width={300}
                                                                height={300}
                                                                className="shrink-0 w-56 aspect-video rounded-lg"
                                                                src={`/images/blogs${blog.image}`}
                                                                alt="Product Image"
                                                            />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="h-px w-72 min-w-72 flex-shrink-0 px-5">
                                                    <Link href={`/blogs/${blog.category}/${blog._id}`} target="_blank">
                                                        <span className="block text-base text-gray-500 dark:text-neutral-500 line-clamp-2">{blog.title}</span>
                                                    </Link>
                                                </td>
                                                <td className="size-px whitespace-nowrap flex-shrink-0">
                                                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                                                        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </span>
                                                </td>
                                                <td className="size-px whitespace-nowrap flex-shrink-0">
                                                    <span
                                                        className={`py-1.5 px-5 inline-flex items-center gap-x-1 text-xs font-medium ${blog.status === 'publish'
                                                            ? 'bg-teal-100 text-teal-800 rounded-lg dark:bg-teal-500/10 dark:text-teal-500'
                                                            : 'bg-blue-100 text-blue-800 rounded-lg dark:bg-blue-500/10 dark:text-blue-500'
                                                            }`}
                                                    >
                                                        {blog.status === 'publish' ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="size-px whitespace-nowrap">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Link href={`/blogs/${blog.category}/${blog._id}`} target="_blank">
                                                            <MdOutlineRemoveRedEye className="bg-gray-50 hover:bg-gray-100 hover:text-gray-600 duration-300 active:scale-90 rounded-lg w-10 h-10 p-2.5 cursor-pointer" />
                                                        </Link>
                                                        <Link href={`/20/admin/blogs/edit/${blog._id}`} target="_blank">
                                                            <TbEdit className="bg-gray-50 hover:bg-blue-100 hover:text-gray-600 duration-300 active:scale-90 rounded-lg w-10 h-10 p-2.5 cursor-pointer" />
                                                        </Link>
                                                        <MdOutlineDeleteOutline
                                                            className="bg-gray-50 hover:bg-red-100 hover:text-gray-600 duration-300 active:scale-90 rounded-lg w-10 h-10 p-2.5 cursor-pointer"
                                                            onClick={() => deleteBlog(blog._id)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-5">
                                                    No blogs available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                   )}
                                {/* End Main Content */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page