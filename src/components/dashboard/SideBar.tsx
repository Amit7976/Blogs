"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { TbDeviceAnalytics, TbLayoutDashboard } from 'react-icons/tb';
import { IoAdd } from "react-icons/io5";
import { BiCategoryAlt } from 'react-icons/bi';
import { signOut } from "next-auth/react";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Sidebar({ session }: { session: any }) {

    const handleLogout = async () => {
      if (confirm("SAre you sure you want to Logout this account!")) {
          await signOut({ redirect: false });
          window.location.replace('/auth/login');
      }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <aside className='bg-white dark:bg-neutral-900 h-screen col-span-2 w-full rounded-r-xl'>
            <div className="md:col-span-3 pt-10 pb-5 px-4 flex flex-col justify-between h-full">

                <Link href={"/"} className="flex items-center gap-2 w-full justify-center">
                    <Image
                        src="/images/logo/electricIcon.svg"
                        alt="Jobboost Logo"
                        width={200}
                        height={35}
                        className={"w-2 sm:w-3 md:w-6"}
                    />
                    <span className="text-xl font-bold">Assignment</span>
                </Link>

                <div className="space-y-10">
                    <Link href={"/dashboard"} className='hover:bg-orange-500 hover:shadow-xl text-black dark:text-white hover:text-white duration-300 rounded-lg p-2.5 w-full flex justify-center'>
                        <p className='text-lg font-semibold flex gap-2 items-center'><TbLayoutDashboard />Dashboard</p>
                    </Link>
                    <Link href={"/blogs/add_blog"} className='hover:bg-orange-500 hover:shadow-xl text-black dark:text-white hover:text-white duration-300 rounded-lg p-2.5 w-full flex justify-center'>
                        <p className='text-lg font-semibold flex gap-2 items-center'> <IoAdd /> Add Blog</p>
                    </Link>
                    <Link href={"/blogs"} className='hover:bg-orange-500 hover:shadow-xl text-black dark:text-white hover:text-white duration-300 rounded-lg p-2.5 w-full flex justify-center'>
                        <p className='text-lg font-semibold flex gap-2 items-center'><BiCategoryAlt /> Blogs</p>
                    </Link>
                    <Link href={"/blogs/analytics"} className='hover:bg-orange-500 hover:shadow-xl text-black dark:text-white hover:text-white duration-300 rounded-lg p-2.5 w-full flex justify-center'>
                        <p className='text-lg font-semibold flex gap-2 items-center'><TbDeviceAnalytics /> Analytics</p>
                    </Link>
                </div>

                <div className='duration-300 rounded-lg p-2 w-full space-y-2'>
                    <p className='text-lg font-semibold text-center text-black dark:text-white'>{session?.user?.name}</p>
                    <p className='text-sm font-medium text-gray-500 text-center line-clamp-1'>{session?.user?.email}</p>
                    <Button onClick={handleLogout} className='w-full h-10 text-base mt-5 cursor-pointer flex justify-center gap-2'>
                        <FaArrowRightFromBracket /> Logout
                    </Button>
                </div>

            </div>
        </aside>
    );
}
