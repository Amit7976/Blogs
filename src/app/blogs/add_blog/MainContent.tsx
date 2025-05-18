"use client"
import HeaderForBlog from '@/components/MainUi/Header/HeaderForBlog';
import RichTextEditor from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { debounce } from "lodash";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from "sonner";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


function MainContent() {



    // SET PAGE NOT RELOAD IF ANY FILED IS FILLED
    const [isDirty, setIsDirty] = useState(true); // Initially, consider the page as dirty
    const [hashValue, setHashValue] = useState("");
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const blogIdFromHash = window.location.hash?.substring(1);
            if (blogIdFromHash) {
                setHashValue(blogIdFromHash);
                setBlogId(blogIdFromHash); // Also set blogId directly
            } else {
                setDataLoading(false);
            }
        }
    }, []);

    if (typeof window !== "undefined") {
        const hash = window.location.hash?.substring(1); // remove #
        if (hash && !localStorage.getItem(hash)) {
            // If hash exists but no data in localStorage, remove the hash from URL
            history.replaceState(null, "", window.location.pathname);
            setHashValue("");
        }
    }


    useEffect(() => {

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ''; // This is required to show the confirmation dialog
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup event listener on component unmount
        };
    }, [isDirty]); // Effect runs whenever `isDirty` changes

    const handleChange = () => {
        setIsDirty(false); // Set `isDirty` to false to stop showing the confirmation dialog
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    // HANDLE IMAGE SELECT
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



    const [content, setContent] = useState<string | null>(null);

    const [data, setData] = useState({
        title: "",
        shortDescription: "",
        description: "",
        category: "General",
        tags: "",
        status: "draft",
        imageTitle: "",
    });


    useEffect(() => {
        if (typeof window !== "undefined" && hashValue) {
            const saved = localStorage.getItem(hashValue);
            setDataLoading(true);
            if (saved) {
                const parsed = JSON.parse(saved);
                console.log("Parsed:", parsed);

                setData(prev => ({
                    ...prev,
                    title: parsed.title || "",
                    shortDescription: parsed.shortDescription || "",
                    description: parsed.description || "",
                    category: parsed.category || "General",
                    tags: parsed.tags || "",
                    status: parsed.status || "draft",
                    imageTitle: parsed.imageTitle || "",
                }));

                // Only if string
                if (typeof parsed.description === 'string') {
                    setContent(parsed.description);
                }

                setDataLoading(false);

            } else {
                setDataLoading(false);
            }
        }
    }, [hashValue]);



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN INPUT
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);

        const draftDataForLocalStorage = {
            blogId,
            ...data,
            [name]: value,
            description: content,
            imageName: image?.name || null,
        };

        if (hashValue) {
            localStorage.setItem(hashValue, JSON.stringify(draftDataForLocalStorage));
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const router = useRouter();





    const [hasCreatedDraft, setHasCreatedDraft] = useState(false);
    const [blogId, setBlogId] = useState("");

    // 🔁 Refs to always hold latest values
    const dataRef = useRef(data);
    const contentRef = useRef(content);
    const imageRef = useRef(image);

    // Keep refs in sync with latest state
    useEffect(() => {
        dataRef.current = data;
        contentRef.current = content;
        imageRef.current = image;
    }, [data, content, image]);




    // ✅ 1. Create Draft (first POST)
    const createDraft = useCallback(async () => {
        const formData = new FormData();
        formData.append("title", dataRef.current.title);
        formData.append("shortDescription", dataRef.current.shortDescription);
        formData.append("description", contentRef.current || "");
        formData.append("category", dataRef.current.category);
        formData.append("tags", dataRef.current.tags);
        formData.append("status", "draft");
        formData.append("imageTitle", dataRef.current.imageTitle);
        if (imageRef.current) formData.append("image", imageRef.current);

        try {
            const res = await axios.post("/api/blogs/admin_blog", formData);
            if (res.data.success && res.data.blogId) {
                setHasCreatedDraft(true);
                setBlogId(res.data.blogId);
                setHashValue(res.data.blogId); // Important
                const draftDataForLocalStorage = {
                    blogId,
                    ...dataRef.current,
                    description: contentRef.current,
                    imageName: imageRef.current?.name || null,
                };
                localStorage.setItem(res.data.blogId, JSON.stringify(draftDataForLocalStorage));
                router.replace(`#${res.data.blogId}`);
                toast.success("Draft created.");
            } else {
                toast.error("Failed to create draft.");
            }
        } catch (err) {
            console.error("Create draft error:", err);
            toast.error("Create draft error");
        }
    }, []);





    // ✅ 2. Auto-save (PUT)
    const autoSaveDraft = useCallback(async () => {
        if (
            !dataRef.current.title &&
            !dataRef.current.shortDescription &&
            !contentRef.current &&
            !dataRef.current.tags &&
            !imageRef.current &&
            !dataRef.current.imageTitle
        ) return;

        if (!hasCreatedDraft) {
            await createDraft();
            return;
        }

        const draftDataForLocalStorage = {
            blogId,
            ...dataRef.current,
            description: contentRef.current,
            imageName: imageRef.current?.name || null,
        };

        if (hashValue) {
            localStorage.setItem(hashValue, JSON.stringify(draftDataForLocalStorage));
        }

        const formData = new FormData();
        formData.append("blogId", blogId);
        formData.append("title", dataRef.current.title);
        formData.append("shortDescription", dataRef.current.shortDescription);
        formData.append("description", contentRef.current || "");
        formData.append("category", dataRef.current.category);
        formData.append("tags", dataRef.current.tags);
        formData.append("status", "draft");
        formData.append("imageTitle", dataRef.current.imageTitle);
        if (imageRef.current) formData.append("image", imageRef.current);

        try {
            const res = await axios.put("/api/blogs/admin_blog", formData);
            if (res.data.success) toast.success("Draft auto-saved.");
            else toast.error("Auto-save failed.");
        } catch (err) {
            console.error("Auto-save error:", err);
            toast.error("Auto-save error");
        }
    }, [hasCreatedDraft, blogId, createDraft, hashValue]);





    // ✅ 3. Keypress = first interaction trigger
    useEffect(() => {
        if (hasCreatedDraft) return;

        if (typeof window !== "undefined") {
            const blogIdFromHash = window.location.hash?.substring(1);

            if (blogIdFromHash) {
                const existingDraft = localStorage.getItem(blogIdFromHash);

                if (existingDraft) {
                    // ✅ Draft exists in localStorage, just set and return
                    setBlogId(blogIdFromHash);
                    setHashValue(blogIdFromHash);
                    setHasCreatedDraft(true);
                    return;
                } else {
                    // 🟡 Hash exists but data missing from localStorage ⇒ Draft expired or cleared
                    console.warn("Draft not found in localStorage, creating new draft.");
                    // No return → will fall through to attach keydown listener
                }
            }
        }

        const handleFirstKey = () => {
            if (!hasCreatedDraft) {
                createDraft();
            }
            window.removeEventListener("keydown", handleFirstKey);
        };

        window.addEventListener("keydown", handleFirstKey);
        return () => window.removeEventListener("keydown", handleFirstKey);
    }, [hasCreatedDraft, createDraft]);





    // ✅ 4. Auto-save every 10s (latest data always used)
    useEffect(() => {
        if (!hasCreatedDraft) return;

        const interval = setInterval(() => {
            autoSaveDraft();
        }, 30000);

        return () => clearInterval(interval);
    }, [hasCreatedDraft, autoSaveDraft]);




    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            autoSaveDraft(); // Save draft first

            event.preventDefault(); // Some browsers require this
            event.returnValue = ""; // Trigger the confirmation dialog
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [data]);





    // ✅ 5. Debounced save on user activity
    const debouncedSave = useCallback(debounce(() => {
        autoSaveDraft();
    }, 5000), [autoSaveDraft]);

    useEffect(() => {
        debouncedSave();
        return () => debouncedSave.cancel();
    }, [data, content, image]);





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET SELECTED IMAGE TO THE PREVIEW
    const labelStyle = previewUrl
        ? {
            backgroundImage: `url('${previewUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            aspectRatio: 16 / 9,
        }
        : {};


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


    // SET DATA WHEN CATEGORY FILED
    const onCategoryClick = (category: string) => {
        setData(data => ({ ...data, category: category }));
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN STATUS SELECTED
    const onSelectStatus = (status: string) => {
        setData(data => ({ ...data, status: status }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    return (
        <>
            <HeaderForBlog />

            <div className="w-full relative top-0">
                <form onSubmit={autoSaveDraft}>
                    <div className="rounded-xl dark:bg-neutral-900 grid grid-cols-12 gap-5 p-5" style={{ backgroundImage: "url(/images/random/pattern-randomized.svg)" }}>


                        <div className="pt-20 p-4 sm:p-7 col-span-3 bg-white shadow-2xl rounded-2xl h-screen overflow-y-scroll sticky top-0">
                            <div className="space-y-4 sm:space-y-6">

                                {/* Blog Image */}
                                <div className="space-y-4">
                                    <label htmlFor="upload-images" className="inline-block text-lg font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                                        Blog Image
                                    </label>

                                    <label
                                        htmlFor="upload-images"
                                        style={labelStyle}
                                        className="group p-4 sm:p-7 h-auto block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 dark:border-neutral-700"
                                    >
                                        <input
                                            id="upload-images"
                                            name="upload-images"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleImageChange}
                                        />
                                        {!previewUrl && (
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
                                        )}
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

                                        <Select
                                            name="status"
                                            onValueChange={onSelectStatus}
                                            value={data.status}
                                            defaultValue='draft'
                                            disabled={
                                                !data.title ||
                                                !data.shortDescription ||
                                                !content ||       // description
                                                !data.category ||
                                                !data.tags ||
                                                !image            // image
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
                                    {/* End Status Select */}

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

                                {/* Publish Button */}
                                <Button type="submit" onClick={handleChange} className="py-3 px-4 h-12 inline-flex w-full items-center gap-x-2 text-sm font-medium border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Publish Blog Post
                                </Button>
                                {/* End Publish Button */}

                            </div>
                        </div>



                        <div className="pt-0 py-4 sm:pb-2 col-span-9 w-5xl mx-auto">
                            <div className="space-y-4 sm:space-y-0 border-4 mt-5 rounded-2xl overflow-hidden border-gray-200 shadow-xl">

                                {/* Blog Title */}
                                <div className=''>
                                    <Textarea autoFocus name='title' onChange={onChangeHandler} value={data.title} className="px-10 py-12 h-full w-full rounded-none bg-white text-5xl font-bold leading-14 border-0 outline-none border-b-4 tracking-wider border-slate-100 ring-orange-500 placeholder:text-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none shadow-none" placeholder="Title"></Textarea>
                                </div>
                                {/* End Blog Title */}


                                {/* Description */}
                                {/* <TextareaWithHTMLConversion onChangeHandler={onChangeHandler} data={data} /> */}
                                {/* End Description */}
                                <div className="w-full mx-auto p-0">
                                    {
                                        dataLoading ? (
                                            <div className="flex items-center justify-center h-screen" >
                                                <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
                                            </div >
                                        ) : (
                                            <RichTextEditor content={content || ''} onChange={setContent} />
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default MainContent