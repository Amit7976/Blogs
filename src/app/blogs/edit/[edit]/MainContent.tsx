"use client";
import HeaderForBlog from '@/components/MainUi/Header/HeaderForBlog';
import RichTextEditor from '@/components/rich-text-editor';
import SideBar from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import Image from 'next/image';
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import usePreventReload from '@/components/blogAction/usePreventReload';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


export default function MainContent({ params }: { params: Promise<{ edit: string }> }) {

    const resolvedParams = use(params);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET PAGE NOT RELOAD IF ANY FILED IS FILLED
    const [isDirty, setIsDirty] = useState(true);

    // Prevent Reload
    usePreventReload({ isDirty });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleChange = () => {
        setIsDirty(false);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // FETCH BLOG DATA FOR INITIAL FILL
    const [data, setData] = useState<Partial<Blog>>({});
    const [dataLoading, setDataLoading] = useState(true);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);



    useEffect(() => {
        const fetchBlogData = async () => {
            setDataLoading(true);
            try {
                const response = await axios.get('/api/blogs/blogs', { params: { blogPost: resolvedParams.edit } });
                setData(response.data);
                setContent(response.data.description);
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setDataLoading(false);
            }
        };
        fetchBlogData();
    }, [resolvedParams.edit]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // UPDATE THE DATA WHEN SUBMIT THE FORM
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(data);
        const formData = new FormData();

        formData.append('description', content || '');
        formData.append('blogId', resolvedParams.edit);
        (Object.keys(data) as Array<keyof Blog>).forEach((key) => {
            const value = data[key];
            if (value !== undefined && key !== 'image') {
                formData.append(key as string, value!.toString());
            }
        });

        if (image) {
            formData.append('image', image);

            if (data && data.image) {
                formData.append('oldImage', data.image);
            }
        }

        try {
            const response = await axios.put('/api/blogs/blogs', formData);
            if (response.data.success) {
                toast.success("Blog has been Updated.")
            } else {
                toast.error("Please try again later! Server is on High Demand");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const [lastSavedData, setLastSavedData] = useState<Partial<Blog>>({});
    const [lastSavedContent, setLastSavedContent] = useState<string>("");
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
    const [notOwn, setNotOwn] = useState<boolean | null>(false);
    const dataRef = useRef(data);
    const contentRef = useRef(content);
    const lastSavedDataRef = useRef(lastSavedData);
    const lastSavedContentRef = useRef(lastSavedContent);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        dataRef.current = data;
    }, [data]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        contentRef.current = content;
    }, [content]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        lastSavedDataRef.current = lastSavedData;
    }, [lastSavedData]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        lastSavedContentRef.current = lastSavedContent;
    }, [lastSavedContent]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const autoSave = useCallback(async () => {
        if (!resolvedParams.edit) return;

        const currentData = dataRef.current;
        const currentContent = contentRef.current;

        const dataUnchanged = JSON.stringify(currentData) === JSON.stringify(lastSavedDataRef.current);
        const contentUnchanged = currentContent === lastSavedContentRef.current;
        if (dataUnchanged && contentUnchanged) return;

        const formData = new FormData();
        formData.append('description', currentContent || '');
        formData.append('blogId', resolvedParams.edit);

        (Object.keys(currentData) as Array<keyof Blog>).forEach((key) => {
            const value = currentData[key];
            if (value !== undefined && key !== 'image') {
                formData.append(key as string, value!.toString());
            }
        });


        if (image) {
            formData.append('image', image);

            if (data && data.image) {
                formData.append('oldImage', data.image);
            }
        }

        try {
            const response = await axios.put('/api/blogs/blogs', formData);
            if (response.data.success) {
                setNotOwn(false);
                //console.log("Autosaved ✅");
                toast.success("Blog Updated Saved.");
                setLastSavedData(currentData);
                setLastSavedContent(currentContent);
            }
        } catch (error) {
            console.error('Autosave error:', error);
            setNotOwn(true);
        }
    }, [resolvedParams.edit, image]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const interval = setInterval(() => {
            autoSave();
        }, 30000);

        return () => clearInterval(interval);
    }, [autoSave]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(prevData => ({ ...prevData, [name]: value }));
        setIsDirty(true);

        if (saveTimeout) clearTimeout(saveTimeout);
        setSaveTimeout(setTimeout(() => {
            autoSave();
        }, 5000)); // save after 5s of inactivity
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onContentChange = (value: string) => {
        setContent(value);
        setIsDirty(true);

        if (saveTimeout) clearTimeout(saveTimeout);
        setSaveTimeout(setTimeout(() => {
            autoSave();
        }, 5000)); // save after 5s inactivity
    };



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        notOwn ?
            <div className="h-screen w-screen fixed z-[100] bg-white flex items-center justify-center px-4">
                <div className="p-8 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">
                        Unauthorized Access
                    </h2>
                    <p className="text-gray-700 mt-2 mb-10">
                        You do not have permission to access or edit this blog post. Please refrain from any suspicious activity. Your actions may be monitored.
                    </p>
                    <Button
                        variant={"destructive"}
                        onClick={() => window.history.back()}
                        className="bg-red-600 h-12 hover:bg-red-700 text-white font-semibold px-20 py-2 rounded-lg transition"
                    >
                        Go Back
                    </Button>
                </div>
            </div>

            : dataLoading ? (
                <div className="flex items-center justify-center h-screen" >
                    <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
                </div >
            ) : (
                <>
                    <HeaderForBlog back={true} />

                    <div className="w-full relative top-0">
                        <form onSubmit={onSubmitHandler}>
                            <div className="dark:bg-neutral-900 flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5 lg:p-5 bg-dots dark:bg-dots">

                                <SideBar
                                    data={{
                                        title: data.title || '',
                                        shortDescription: data.shortDescription || '',
                                        description: data.description || '',
                                        category: data.category || '',
                                        tags: data.tags || '',
                                        status: data.status || '',
                                        imageTitle: data.imageTitle || '',
                                        image: data.image || null,
                                    }}
                                    setData={setData as React.Dispatch<React.SetStateAction<Blog>>}
                                    onChangeHandler={onChangeHandler}
                                    handleChange={handleChange}
                                    image={image}
                                    setImage={setImage}
                                    content={content}
                                    use={"Update"}
                                />


                                <div className="pt-0 py-4 sm:pb-2 lg:col-span-9 w-full max-w-5xl mx-auto">
                                    <div className="border-4 lg:mt-5 lg:rounded-2xl overflow-hidden border-gray-200 dark:border-neutral-700 lg:shadow-xl">

                                        {/* Blog Title */}
                                        <div className=''>
                                            <Textarea autoFocus name='title' onChange={onChangeHandler} value={data.title || ''} className="p-5 lg:px-10 lg:py-12 h-full w-full rounded-none bg-white text-5xl font-bold leading-14 border-0 outline-none border-b-4 tracking-wider border-gray-200 ring-orange-500 placeholder:text-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none shadow-none" placeholder="Title"></Textarea>
                                        </div>
                                        {/* End Blog Title */}


                                        <div className="w-full mx-auto p-0">
                                            <RichTextEditor content={content || ''} onChange={onContentChange} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )
    )
}
// export default Page;