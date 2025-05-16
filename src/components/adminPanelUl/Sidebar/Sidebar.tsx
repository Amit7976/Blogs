"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiFileOn } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { FaChevronUp, FaPowerOff, FaRegBuilding, FaRegUser, FaUser } from 'react-icons/fa6';
import { IoBugOutline } from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdAddToPhotos } from 'react-icons/md';
import { PiArticleNyTimes, PiBookOpenText, PiChatTeardropText } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
import { SiAmazonsimpleemailservice } from 'react-icons/si';
import { TbTextPlus } from 'react-icons/tb';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF HEADER PROPS FOR TYPESCRIPT
interface HeaderProps {
    className: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Sidebar: React.FC<HeaderProps> = ({ className }) => {


    const { toast } = useToast();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [eioafap, setEioafap] = useState('');
    const [uaoafap, setUaoafap] = useState('');
    const [pnoafap, setPnoafap] = useState('');
    const [uioafap, setUioafap] = useState('');
    const [upoafap, setUpoafap] = useState('');

    useEffect(() => {
        setEioafap(sessionStorage.getItem('eioafap') || '');
        setUaoafap(sessionStorage.getItem('uaoafap') || '');
        setPnoafap(sessionStorage.getItem('pnoafap') || '');
        setUioafap(sessionStorage.getItem('uioafap') || '');
        setUpoafap(sessionStorage.getItem('upoafap') || '');
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const adminOptions = require('@/components/adminPanelUl/utils/adminAllowed/AdminAllowed.ts');

    // Convert to string if needed
    const adminOptionsString = String(adminOptions);

    // Now split the string into an array
    const adminOptionsArray = adminOptionsString.split(',');

    // console.log("adminOptionsArray:", adminOptionsArray);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [allowedValues, setAllowedValues] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);


    const fetchAllowedField = async () => {
        if (uioafap !== '66ce103af33d6a37ae4ba179') {
            try {
                const response = await axios.get("/api/admin/getAllowedField");
                const data = response.data;

                if (data.allowed.length === 0) {
                    setAllowedValues(adminOptionsArray);
                } else {
                    setAllowedValues(data.allowed);
                }
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to fetch allowed field');
            }
        } else {
            // Handle case when `uioafap` equals '66ce103af33d6a37ae4ba179'
            setAllowedValues(adminOptionsArray); // or some other logic
        }
    };

    useEffect(() => {
        fetchAllowedField();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Function to determine the correct image URL
    const getImageUrl = (picture: string) => {
        return picture.startsWith("https://")
            ? picture
            : `/images/admins/${picture}`;
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // State for handling image selection
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        upoafap ? getImageUrl(upoafap) : null
    );


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        adminId: uioafap,
        name: uaoafap,
        number: pnoafap,
        password: "",
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("adminId", data.adminId);
            formData.append("name", data.name);
            formData.append("email", eioafap);
            formData.append("number", data.number);

            // Append password if it's provided
            if (data.password) {
                formData.append("password", data.password);
            }

            // Append file if selected

            if (image) {
                formData.append("picture", image);
            }


            const response = await axios.put(`/api/admin/getAdmin`, formData);

            if (response.data.success) {


                toast({
                    title: "Profile updated successfully!",
                    description: "ReLogin for see all the changes",
                    variant: "success",
                });


                setOpen(false);



                sessionStorage.setItem('uaoafap', data.name);
                sessionStorage.setItem('pnoafap', data.number);


            } else {
                alert("Failed to update admin. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>

            <div className={`${className}`}>
                <div className="flex flex-col sm:flex-row sm:justify-around flex-shrink-0">
                    <div className="h-screen w-72 relative flex flex-col justify-between">
                        <div className="">

                            {/* Logo */}
                            <Link className="p-2 my-1 space-y-3" href="/20/admin">
                                <Image src="/images/logo/cut_logo_long.png" alt='Jobboost Logo' width={300} height={50} className='w-2/3 mx-auto' />
                                <p className='font-semibold text-base text-white text-center'>Admin Panel</p>
                            </Link>
                            {/* End Logo */}

                            {/* Sidebar Menu */}
                            <nav className="mt-0 space-y-3">

                                <Link className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12" href="#">
                                    <LuLayoutDashboard className='text-xl' />
                                    <span className="mx-4 font-normal text-md">
                                        Dashboard
                                    </span>
                                </Link>

                                <Link href={'/20/admin/page/companies'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <FaRegBuilding className='text-xl' style={{ strokeWidth: '0.4 !important' }} />
                                    <span className="mx-4 font-normal text-md">
                                        Companies
                                    </span>
                                </Link>

                                <Link href={'/20/admin/page/candidate'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <FaRegUser className='text-xl' style={{ strokeWidth: '0.4 !important' }} />
                                    <span className="mx-4 font-normal text-md">
                                        Candidate
                                    </span>
                                </Link>

                                <Link href={'/20/admin/page/faq'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <PiChatTeardropText className='text-2xl' />
                                    <span className="mx-4 font-normal text-md">
                                        Faq
                                    </span>
                                </Link>

                                <Link href={'/20/admin/page/newsletter'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <SiAmazonsimpleemailservice className='text-2xl' style={{ strokeWidth: '0.4 !important' }} />
                                    <span className="mx-4 font-normal text-md">
                                        NewsLetter
                                    </span>
                                </Link>

                                <Link href={'/20/admin/page/bugReport'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <IoBugOutline className='text-2xl' />
                                    <span className="mx-4 font-normal text-md">
                                        Bug Report
                                    </span>
                                </Link>






                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                


                                {allowedValues.includes("Admin Page") ? (
                                    <Link
                                        href={'/20/admin/page/admins_control'}
                                        className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12"
                                    >
                                        <RiAdminLine className='text-2xl' />
                                        <span className="mx-4 font-normal text-md">
                                            Admins
                                        </span>
                                    </Link>
                                ) : ''}


                                
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                                


                                <div>
                                    <Accordion type="single" collapsible className='text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white min-h-12'>
                                        <AccordionItem value="blog" className='border-none'>
                                            <AccordionTrigger className="w-full px-8 font-normal text-white text-base hover:no-underline">Blog</AccordionTrigger>
                                            <AccordionContent>
                                                <Link href={'/20/admin/page/blogs/add_blog'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <TbTextPlus className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        Add Blogs
                                                    </span>
                                                </Link>
                                                <Link href={'/20/admin/page/blogs/draft_blogs'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <CiEdit className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        Draft Blogs
                                                    </span>
                                                </Link>
                                                <Link href={'/20/admin/page/blogs'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <PiBookOpenText className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        All Blogs
                                                    </span>
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                <div>
                                    <Accordion type="single" collapsible className='text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white min-h-12'>
                                        <AccordionItem value="articles" className='border-none'>
                                            <AccordionTrigger className="w-full px-8 font-normal text-white text-base hover:no-underline">Articles</AccordionTrigger>
                                            <AccordionContent>
                                                <Link href={'/20/admin/page/articles/add_article'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <MdAddToPhotos className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        Add Article
                                                    </span>
                                                </Link>
                                                <Link href={'/20/admin/page/articles/draft_articles'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <CiFileOn className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        Draft Articles
                                                    </span>
                                                </Link>
                                                <Link href={'/20/admin/page/articles'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-900 pl-8 h-12">
                                                    <PiArticleNyTimes className='text-xl' />
                                                    <span className="mx-4 font-normal text-md">
                                                        All Articles
                                                    </span>
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                <Link href={'/api/admin/logout'} className="flex items-center justify-start p-2 mt-2 text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700 border-l-2 border-transparent hover:border-white pl-8 h-12">
                                    <FaPowerOff className='text-xl' />
                                    <span className="mx-4 font-normal text-md">
                                        Logout
                                    </span>
                                </Link>

                                <div className='w-full h-3 relative'></div>
                            </nav>
                            {/* End Sidebar Menu */}

                        </div>
                        <div className='flex items-center justify-center sticky bottom-3 w-full'>

                            {/* User Account */}
                            <Popover>
                                <PopoverTrigger className='w-full px-3'>
                                    <div className='rounded-full py-1.5 pl-1 pr-5 h-12 flex items-center justify-between gap-3 bg-gray-700 shadow-2xl'>
                                        <Image src={`/images/admins${upoafap}`} alt='Profile Icon' width={100} height={100} className='w-10 h-10 rounded-full object-cover' />
                                        <h2 className='text-left text-white font-medium text-base line-clamp-1 capitalize'>{uaoafap}</h2>
                                        <FaChevronUp className='text-base font-bold text-white flex-shrink-0' />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col gap-5 items-center w-72 py-8 bg-gray-700 border-0 ml-5 mb-2 rounded-2xl relative'>
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger >
                                            <FaUserEdit className='w-12 h-12 flex items-center justify-center absolute top-0 right-0 p-4 cursor-pointer text-white' />
                                        </DialogTrigger>
                                        <DialogContent className="w-full max-w-5xl h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    <span className="text-2xl">Update Profile</span>
                                                </DialogTitle>
                                            </DialogHeader>

                                            <form onSubmit={handleSubmit}>
                                                {/* Image Input */}
                                                <div className="gap-4 space-y-3 py-5">
                                                    <Label className="text-base font-medium">Image</Label>
                                                    <div className="w-32 aspect-square border rounded-xl">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{ display: "none" }}
                                                        />
                                                        <label
                                                            htmlFor="image"
                                                            className="group p-4 sm:p-7 h-32 w-32 flex items-center justify-center cursor-pointer duration-500 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 dark:border-neutral-700 aspect-video bg-cover bg-center"
                                                            style={
                                                                previewUrl
                                                                    ? {
                                                                        backgroundImage: `url('${previewUrl}')`,
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                    }
                                                                    : {}
                                                            }
                                                        >
                                                            {!previewUrl && (
                                                                <span className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                                                                    <FaUser className="text-6xl text-gray-300" />
                                                                </span>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="grid gap-4 py-10 space-y-6">
                                                    {/* Input Fields */}
                                                    <div className="space-y-3">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            value={data.name}
                                                            onChange={onChangeHandler}
                                                            placeholder="Admin Name"
                                                            className="h-14 "
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            value={eioafap}
                                                            className="h-14 "
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="number">Phone Number</Label>
                                                        <Input
                                                            id="number"
                                                            name="number"
                                                            value={data.number}
                                                            onChange={onChangeHandler}
                                                            placeholder="Admin Phone Number"
                                                            className="h-14 "
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label htmlFor="password">Password (optional)</Label>
                                                        <Input
                                                            id="password"
                                                            name="password"
                                                            value={data.password}
                                                            onChange={onChangeHandler}
                                                            placeholder="Admin Password"
                                                            className="h-14 "
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="submit" className="w-full h-14">
                                                            Update & Save
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <Image src={`/images/admins${upoafap}`} alt='Profile Icon' width={400} height={400} className='w-32 h-32 rounded-full object-cover' />

                                    <div className="space-y-2">
                                        <h2 className='text-center text-white font-medium text-xl line-clamp-2 capitalize'>{uaoafap}</h2>
                                        <h2 className='text-center text-gray-400 font-medium text-sm line-clamp-2'>+91 {pnoafap}</h2>
                                        <h2 className='text-center text-gray-400 font-medium text-sm line-clamp-2'>{eioafap}</h2>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {/* End User Account */}
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Sidebar