"use client"
import HeaderForBlog from '@/components/MainUi/Header/HeaderForBlog';
import RichTextEditor from '@/components/rich-text-editor';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useState } from 'react';
import SideBar from '@/components/SideBar';
import useAutoSaveDraft from '@/components/blogAction/useAutoSave';
import handleLocalstorage from '@/components/blogAction/handleLocalstorage';
import extractBlogId from '@/components/blogAction/extractBlogId';
import preventReload from '@/components/blogAction/preventReload';


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


function MainContent() {

    // SET PAGE NOT RELOAD IF ANY FILED IS FILLED
    const [isDirty, setIsDirty] = useState(true);
    const [hashValue, setHashValue] = useState("");
    const [dataLoading, setDataLoading] = useState(true);
    const [blogId, setBlogId] = useState("");


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Prevent Reload
    preventReload({ isDirty });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Extract BlogId from hash
    extractBlogId({ setDataLoading, setHashValue, setBlogId });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleChange = () => {
        setIsDirty(false);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState<string | null>(null);


    const [data, setData] = useState<Blog>({
        title: "",
        shortDescription: "",
        description: "",
        category: "General",
        tags: "",
        status: "draft",
        imageTitle: "",
        image: null,
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // SET DATA WHEN INPUT
    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setData((prev: any) => ({ ...prev, [name]: value }));
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


    // Get Data from LOCAL STORAGE
    handleLocalstorage({ hashValue, setDataLoading, setData, setContent });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Auto Save Function With 30sec or 5 sec inactive
    const { autoSaveDraft } = useAutoSaveDraft({ data, content, image, hashValue, setHashValue, blogId, setBlogId });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <HeaderForBlog />

            <div className="w-full relative top-0">
                <form onSubmit={autoSaveDraft}>
                    <div className="rounded-xl dark:bg-neutral-900 grid grid-cols-12 gap-5 p-5 bg-dots dark:bg-dots">
                        <SideBar data={data} setData={setData} onChangeHandler={onChangeHandler} handleChange={handleChange} image={image} setImage={setImage} content={content || ''} use={"Publish"} />

                        <div className="pt-0 py-4 sm:pb-2 col-span-9 w-5xl mx-auto">
                            <div className="space-y-4 sm:space-y-0 border-4 mt-5 rounded-2xl overflow-hidden border-gray-200 shadow-xl">

                                <div className=''>
                                    <Textarea autoFocus name='title' onChange={onChangeHandler} value={data.title} className="px-10 py-12 h-full w-full rounded-none bg-white text-5xl font-bold leading-14 border-0 outline-none border-b-4 tracking-wider border-slate-100 ring-orange-500 placeholder:text-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:ring-0 resize-none shadow-none" placeholder="Title"></Textarea>
                                </div>

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