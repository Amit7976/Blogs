"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Blog = {
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    tags: string;
    status: string;
    imageTitle: string;
    image: string | null;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



type Category = {
    count: number;
    category: string;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface CategoriesResponse {
    categories: Category[];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function SideBar({ data, setData, onChangeHandler, handleChange, image, setImage, content, use }: {
    data: Blog;
    setData: React.Dispatch<React.SetStateAction<Blog>>;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChange: () => void;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    content: string;
    use: string;
}) {



    // HANDLE IMAGE SELECT

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // SET SELECTED IMAGE TO THE PREVIEW
    const labelStyle =
        (use === "Publish") ?
            previewUrl
                ? {
                    backgroundImage: `url('${previewUrl}')`,
                }
                :
                {}
            :
            previewUrl
                ? {
                    backgroundImage: `url('${previewUrl}')`,
                }
                : {
                    backgroundImage: `url('/images/blogs${data.image}')`,
                };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // FETCH CATEGORIES FROM DATABASE
    const [blogsCategories, setBlogsCategories] = useState<Category[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<CategoriesResponse>('/api/blogs/category');
                const categories: Category[] = response.data?.categories ?? [];
                setBlogsCategories(categories);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setCategoryLoading(false);
            }
        };
        fetchCategories();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onCategoryClick = (category: string) => {
        setData((data: Blog) => ({ ...data, category: category }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onSelectStatus = (status: string) => {
        setData((data: Blog) => ({ ...data, status: status }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <>
            <div className="pt-20 p-4 sm:p-7 col-span-3 bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl h-screen overflow-y-scroll sticky top-0">
                <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-4">
                        <label htmlFor="upload-images" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                            Blog Image
                        </label>

                        <label
                            htmlFor="upload-images"
                            style={labelStyle}
                            className="group p-4 sm:p-7 h-auto block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 dark:border-neutral-700 aspect-video bg-cover bg-center"
                        >
                            <input
                                id="upload-images"
                                name="upload-images"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                            />
                            {(use === 'Publish') ? !previewUrl && (
                                <>
                                    <svg className="size-10 mx-auto text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                    </svg>
                                    <span className="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                                        Browse from your device
                                    </span>
                                    <span className="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                                        Maximum file size is 2 MB
                                    </span>
                                </>
                            ) : ''}
                        </label>
                        <div className="space-y-2 mt-2">
                            <Input name='imageTitle' onChange={onChangeHandler} value={data.imageTitle} type="text" className="py-2 px-5 h-12 text-sm border-2 font-medium tracking-wider rounded-full focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Image Title" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="af-submit-app-description" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                            Short Description
                        </label>
                        <Textarea name='shortDescription' onChange={onChangeHandler} value={data.shortDescription} className="p-2 w-full border-gray-200 shadow-sm rounded-xl text-sm border-2 font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none" rows={6} placeholder="A short summary will better explain of blog to the audiences."></Textarea>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="af-submit-app-category" className="inline-block text-lg font-medium text-gray-800 pl-2 mt-2.5 dark:text-neutral-200">
                            Category
                        </label>
                        <Input name='category' onChange={onChangeHandler} value={data.category} type="text" className="py-2 px-5 h-12 w-full border-gray-200 shadow-sm rounded-full text-sm border-2 font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Blog Category" />
                        <div className="flex items-center gap-x-4 gap-y-3 flex-wrap">
                            {categoryLoading ? (
                                <div className="flex items-center justify-center h-20">
                                    <Image src="/images/gif/loader2.gif" alt="Loading" width={400} height={200} />
                                </div>
                            ) : (blogsCategories.length > 0 && blogsCategories.map((category, index) => (
                                <p key={index} className='text-xs font-medium py-1.5 px-5 bg-gray-200 dark:bg-neutral-800 rounded-lg cursor-pointer hover:shadow-lg active:shadow-sm duration-200 select-none' onClick={() => onCategoryClick(category.category)}>
                                    {category.category}
                                    <span className="opacity-60 text-xs pl-1">({category.count})</span>
                                </p>
                            )))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 items-end justify-between">
                        <div className="space-y-2 w-full">
                            <label htmlFor="af4submit-app-category" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                                Status
                            </label>

                            <Select
                                name="status"
                                onValueChange={onSelectStatus}
                                value={data.status}
                                defaultValue='draft'
                                disabled={
                                    !data.title ||
                                    !data.shortDescription ||
                                    !content ||
                                    !data.category ||
                                    !data.tags ||
                                    !image
                                }
                            >
                                <SelectTrigger className="py-2 px-5 h-12 w-full border-gray-200 shadow-sm rounded-xl text-sm border-2 font-medium tracking-wider">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="publish">Publish</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <label htmlFor="af-submit-app-project-name" className="inline-block text-lg font-medium text-gray-800 pl-5 mt-2.5 dark:text-neutral-200">
                            Tags
                        </label>

                        <Input name='tags' onChange={onChangeHandler} value={data.tags} type="text" className="py-2 px-5 h-14 w-full border-gray-200 shadow-sm rounded-full text-sm border-2 font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter all tags separate by coma (,)" />
                    </div>
                </div>

                <div className="mt-16 mb-5 flex justify-center gap-x-2">
                    <Button type="submit" onClick={handleChange} className="py-3 px-4 h-12 inline-flex w-full items-center gap-x-2 text-sm font-medium border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none">
                        {use} Blog Post
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SideBar
