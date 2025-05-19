"use client";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { FaAngleLeft, FaRegUser } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLayoutDashboard, TbLogs } from "react-icons/tb";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface HeaderForBlogProps {
  back?: boolean;
}

function HeaderForBlog({ back = false }: HeaderForBlogProps) {

  const router = useRouter();

  return (
    <>
      <header
        className={
          "bg-white text-black dark:bg-neutral-800 dark:text-[#111827] py-4 px-2 md:px-10 flex items-center justify-between top-0 shadow-xl z-[99] sticky gap-2"
        }
      >
        <div className={`${back ? '' : 'hidden'} w-10 h-10 shrink-0 flex items-center justify-center rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 text-black dark:text-white`}
          onClick={() => router.back()}
        >
          <FaAngleLeft className="text-2xl" />
        </div>

        <div className="flex gap-5 w-full justify-between">
          <Link href="/" className="flex items-center gap-1 " prefetch={false}>
            <Image
              src="/images/logo/electricIcon.svg"
              alt="Jobboost Logo"
              width={200}
              height={35}
              className="w-5 sm:w-3 md:w-6"
            />
            <span className="text-xl font-bold text-black dark:text-white">Assignment</span>
          </Link>
          <div className="hidden lg:flex items-center gap-2">
            <div className="hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-sm duration-300">
              <Link href="/dashboard" passHref>
                <p className="text-sm font-semibold px-5 py-1.5 duration-300 text-gray-600 hover:text-black dark:text-white">
                  Dashboard
                </p>
              </Link>
            </div>
            <div className="hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-sm duration-300">
              <Link href="/doc/assignment.pdf" passHref>
                <p className="text-sm font-semibold px-5 py-1.5 duration-300 text-gray-600 hover:text-black dark:text-white">
                  Use Case
                </p>
              </Link>
            </div>
            <div className="hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-sm duration-300">
              <Link href="https://portfolio-amit7976s-projects.vercel.app/" passHref>
                <p className={"text-sm font-semibold px-5 py-1.5 duration-300 text-orange-500 hover:text-orange-600"}>
                  About Us
                </p>
              </Link>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="hidden lg:flex items-center relative w-40">
              <Input
                type="text"
                className="rounded-full py-2 h-auto px-5 w-96 absolute right-0 pr-16 text-base border-2 font-medium tracking-wide"
                placeholder="Search...."
                spellCheck={"false"}
                autoFocus
              />
              <BiSearch className="absolute right-0 text-xl p-2.5 w-16 h-full" />
            </div>
            <ModeToggle />
            <div className="md:hidden">

              <Popover>
                <PopoverTrigger className="size-[56px] flex justify-center items-center text-2xl font-semibold rounded-lg bg-white dark:bg-neutral-800 text-black hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-900">
                  <RxHamburgerMenu />
                </PopoverTrigger>
                <PopoverContent
                  className="w-[100vw] bg-gray-200 dark:bg-neutral-900 border-8 border-t-0 border-white dark:border-neutral-800 rounded-t-none mt-0 shadow-2xl dark:shadow-gray-800"
                >
                  <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                    <div>
                      <Link
                        className="relative flex items-center gap-5 text-base text-black hover:text-gray-600 dark:text-white dark:hover:bg-neutral-800 rounded-sm px-4 py-2 font-semibold w-full"
                        href="/dashboard"
                      >
                        <TbLayoutDashboard className="text-xl" /> Dashboard
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="relative flex items-center gap-5 text-base text-black hover:text-gray-600 dark:text-white dark:hover:bg-neutral-800 rounded-sm px-4 py-2 font-semibold w-full"
                        href="/doc/assignment.pdf"
                      >
                        <MdOutlineWorkOutline className="text-xl" /> Use Case
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="relative flex items-center gap-5 text-base text-black hover:text-gray-600 dark:text-white dark:hover:bg-neutral-800 rounded-sm px-4 py-2 font-semibold w-full"
                        href="/blogs"
                      >
                        <TbLogs className="text-xl" /> Blog
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="relative flex items-center gap-5 text-base text-black hover:text-gray-600 dark:text-white dark:hover:bg-neutral-800 rounded-sm px-4 py-2 font-semibold w-full"
                        href="https://portfolio-amit7976s-projects.vercel.app/"
                      >
                        <FaRegUser className="text-xl" /> About us
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>


            </div>
          </div>


        </div>
      </header>
    </>
  );
}
export default HeaderForBlog;
