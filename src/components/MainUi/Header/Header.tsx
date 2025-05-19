"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogs } from "react-icons/tb";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface HeaderProps {
  position: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Header: React.FC<HeaderProps> = ({ position }) => {


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <header className={`flex flex-wrap md:justify-start md:flex-nowrap w-full ${position} top-0 z-50 transition-all duration-500 shadow-xl bg-white dark:bg-neutral-800 sm:py-2 lg:py-3"
      }`}>
      <nav className="relative w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center pl-4 lg:py-1.5 md:px-20 mx-auto ">
        <div className="md:col-span-3">

          <Link href="/" className="flex items-center gap-2 " prefetch={false}>
            <Image
              src="/images/logo/electricIcon.svg"
              alt="Jobboost Logo"
              width={200}
              height={35}
              className={"w-4 sm:w-3 md:w-6"}
            />
            <span className="text-xl font-bold">Assignment</span>
          </Link>

        </div>


        <div className="flex items-center gap-x-1 md:gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          <Button type="button" asChild className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm bg-white border border-gray-200 text-black hover:bg-gray-500 hover:text-white focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:focus:text-white duration-300">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button type="button" asChild className="hidden lg:block py-2 px-5 items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 dark:border-gray-600 bg-[#fe2222] text-white hover:bg-white hover:text-black focus:outline-none focus:bg-[#f15413] transition disabled:opacity-50 disabled:pointer-events-none duration-300">
            <Link href="/auth/register">Get Started</Link>
          </Button>
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

        <div className="hidden lg:block overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6">
          <div className="flex flex-row justify-center items-center">
            <div>
              <Link
                className="relative font-medium text-black dark:text-white hover:text-[#FC520C] dark:hover:text-[#FC520C] outline-none duration-300 px-4"
                href="/doc/assignment.pdf"
              >
                Use Case
              </Link>
            </div>
            <div>
              <Link
                className="relative font-medium text-black dark:text-white hover:text-[#FC520C] dark:hover:text-[#FC520C] outline-none duration-300 px-4"
                href="/blogs"
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                className="relative font-medium text-black dark:text-white hover:text-[#FC520C] dark:hover:text-[#FC520C] outline-none duration-300 px-4"
                href="https://portfolio-amit7976s-projects.vercel.app/"
              >
                About us
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;