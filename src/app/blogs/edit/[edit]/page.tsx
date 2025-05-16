"use client";
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextareaWithHTMLConversion from '@/components/adminPanelUl/Textarea/Textarea';
import Image from 'next/image';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG FOR TYPESCRIPT
interface Blog {
    sponsored: boolean,
    category: string,
    title: string,
    shortDescription: string,
    description: string,
    image: string,
    imageTitle: string,
    tags: string,
    status: string,
    date: Date,
    priority: Boolean
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF PAGE PROPS FOR TYPESCRIPT
interface PageProps {
    params: {
        edit: string;
    };
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type Category = {
    count: number;
    category: string;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Define the type for the API response
interface CategoriesResponse {
    categories: Category[];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Page: React.FC<PageProps> = ({ params }) => {


    // SET PAGE NOT RELOAD IF ANY FILED IS FILLED
    const [isDirty, setIsDirty] = useState(true);
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ''; // This is required to show the confirmation dialog
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    const handleChange = () => {
        setIsDirty(false);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // FETCH BLOG DATA FOR INITIAL FILL
    const [data, setData] = useState<Partial<Blog>>({});
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/blogs/admin_blog', { params: { blogPost: params.edit } });
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setDataLoading(false);
            }
        };
        fetchBlogData();
    }, [params.edit]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // FETCH CATEGORIES FROM DATABASE
    const [blogsCategories, setBlogsCategories] = useState<Category[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<CategoriesResponse>('/api/blogs/blogCategories');
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


    // HANDLE IMAGE UPDATE
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN INPUT
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
        setIsDirty(true);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN CLICK ON TOGGLE BUTTON [PRIORITY, SPONSORED]
    const onToggleHandler = (name: keyof typeof data) => {
        setData(prevData => ({ ...prevData, [name]: !prevData[name] }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN STATUS SELECTED
    const onSelectStatus = (status: string) => {
        setData(prevData => ({ ...prevData, status }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN CATEGORY FILED
    const onCategoryClick = (category: string) => {
        setData(prevData => ({ ...prevData, category }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // UPDATE THE DATA WHEN SUBMIT THE FORM
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        const formData = new FormData();

        // Add existing blog data to formData
        formData.append('blogId', params.edit); // Include the blogId here
        (Object.keys(data) as Array<keyof Blog>).forEach((key) => {
            const value = data[key];
            if (value !== undefined && key !== 'image') {  // Skip image for now
                formData.append(key as string, value.toString());
            }
        });

        if (image) {
            // If a new image is selected, add it to formData
            formData.append('image', image);

            // Include the old image path to delete it later
            if (data.image) {
                formData.append('oldImage', data.image);
            }
        }

        try {
            const response = await axios.put('/api/blogs/admin_blog', formData);
            if (response.data.success) {
                alert('Success');
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SHOW OLD IMAGE IN PREVIEW AND SET SELECTED IMAGE TO THE PREVIEW
    const labelStyle = previewUrl
        ? {
            backgroundImage: `url('${previewUrl}')`,
        }
        : {
            backgroundImage: `url('/images/blogs${data.image}')`,
        };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        dataLoading ? (
            <div className="flex items-center justify-center h-screen" >
                <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
            </div >
        ) : (
            <>
                <div className="w-full relative top-0">
                    <form onSubmit={onSubmitHandler}>
                        <div className="bg-white rounded-xl dark:bg-neutral-900 grid grid-cols-12 gap-5">
                            <div className="pt-10 py-4 sm:pb-2 col-span-9">
                                <div className="space-y-4 sm:space-y-10">

                                    {/* Blog Title */}
                                    <div>
                                        <Textarea name='title' onChange={onChangeHandler} value={data.title} className="px-5 pt-0 pb-3 h-14 w-full border-gray-200 text-xl rounded-none border-0 outline-none border-b font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none" placeholder="Enter your Blog Title"></Textarea>
                                    </div>
                                    {/* End Blog Title */}


                                    {/* Description */}
                                    <TextareaWithHTMLConversion
                                        onChangeHandler={onChangeHandler}
                                        data={{ ...data, description: data.description || '' }}
                                    />
                                    {/* End Description */}

                                </div>
                            </div>

                            <div className="pt-10 p-4 sm:p-7 col-span-3 bg-gray-100 h-screen overflow-y-scroll sticky top-0">
                                <div className="space-y-4 sm:space-y-10">

                                    {/* Blog Image */}
                                    <div className="space-y-4">
                                        <label htmlFor="af-submit-app-upload-images" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                                            Blog Image
                                        </label>

                                        <label
                                            htmlFor="af-submit-app-upload-images"
                                            style={labelStyle}
                                            className="group p-4 sm:p-7 h-auto block cursor-pointer text-center duration-500 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 dark:border-neutral-700 aspect-video bg-cover bg-center"
                                        >
                                            <input
                                                id="af-submit-app-upload-images"
                                                name="af-submit-app-upload-images"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <div className="space-y-2 mt-2">
                                            <Input name='imageTitle' onChange={onChangeHandler} value={data.imageTitle} type="text" className="py-2 px-5 h-12 text-sm border-2 font-medium tracking-wider rounded-full focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Image Title" />
                                        </div>
                                    </div>
                                    {/* End Blog Image */}


                                    {/* Short Description */}
                                    <div className="space-y-4">
                                        <label htmlFor="af-submit-app-description" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                                            Short Description
                                        </label>
                                        <Textarea name='shortDescription' onChange={onChangeHandler} value={data.shortDescription} className="p-2 w-full border-gray-200 shadow-sm rounded-xl text-sm border-2 font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none" rows={6} placeholder="A short summary will better explain of blog to the audiences."></Textarea>
                                    </div>
                                    {/* End Short Description */}


                                    {/* Category */}
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
                                                <p key={index} className='text-xs font-medium py-1.5 px-5 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg active:shadow-sm duration-200 select-none' onClick={() => onCategoryClick(category.category)}>
                                                    {category.category}
                                                    <span className="opacity-60 text-xs pl-1">({category.count})</span>
                                                </p>
                                            )))}
                                        </div>
                                    </div>
                                    {/* End Category */}


                                    <div className="flex flex-col gap-5 items-end justify-between">

                                        {/* Status Select */}
                                        <div className="space-y-2 w-full">
                                            <label htmlFor="af4submit-app-category" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                                                Status
                                            </label>
                                            <Select name='status' onValueChange={onSelectStatus} value={data.status}>
                                                <SelectTrigger className="py-2 px-5 h-12 w-full border-gray-200 shadow-sm rounded-xl text-sm border-2 font-medium tracking-wider">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="publish">Publish</SelectItem>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* End Status Select */}


                                        {/* Priority Toggle */}
                                        <div className="space-y-2 w-full">
                                            <Toggle
                                                aria-label="Toggle priority"
                                                name='priority'
                                                onClick={() => onToggleHandler('priority')}
                                                data-state={data.priority ? 'on' : 'off'}
                                                className='w-full border py-2 px-10 h-12 shadow-sm rounded-xl text-sm font-medium tracking-wider'
                                            >
                                                <p>Priority</p>
                                            </Toggle>
                                        </div>
                                        {/* End Priority Toggle */}


                                        {/* Sponsored Toggle */}
                                        <div className="space-y-2 w-full">
                                            <Toggle
                                                aria-label="Toggle sponsored"
                                                name='sponsored'
                                                onClick={() => onToggleHandler('sponsored')}
                                                data-state={data.sponsored ? 'on' : 'off'}
                                                className='w-full border py-2 px-10 h-12 shadow-sm rounded-xl text-sm font-medium tracking-wider'
                                            >
                                                <p>Sponsored</p>
                                            </Toggle>
                                        </div>
                                        {/* End Sponsored Toggle */}

                                    </div>

                                    {/* Tags */}
                                    <div className="space-y-4">
                                        <label htmlFor="af-submit-app-project-name" className="inline-block text-lg font-medium text-gray-800 pl-5 mt-2.5 dark:text-neutral-200">
                                            Tags
                                        </label>
                                        <Input name='tags' onChange={onChangeHandler} value={data.tags} type="text" className="py-2 px-5 h-14 w-full border-gray-200 shadow-sm rounded-full text-sm border-2 font-medium tracking-wider focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter all tags separate by coma (,)" />
                                    </div>
                                    {/* End Tags */}

                                </div>

                                <div className="mt-16 mb-5 flex justify-center gap-x-2">

                                    {/* Update Button */}
                                    <Button type="submit" onClick={handleChange} className="py-3 px-4 h-12 inline-flex w-full items-center gap-x-2 text-sm font-medium border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Update Blog Post
                                    </Button>
                                    {/* End Update Button */}

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    )
}
export default Page;