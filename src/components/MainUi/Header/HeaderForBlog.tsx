"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function HeaderForBlog() {
  return (
    <>
      <header
        className={
          "bg-white text-black dark:bg-gray-900 dark:text-[#111827] py-4 px-6 md:px-10 flex items-center justify-between top-0 shadow-xl z-[99] sticky"
        }
      >
        <div className="flex gap-5 w-full justify-between">
          <Link href="/" className="flex items-center gap-2 " prefetch={false}>
            <Image
              src="/images/logo/electricIcon.svg"
              alt="Jobboost Logo"
              width={200}
              height={35}
              className="w-2 sm:w-3 md:w-6"
            />
            <span className="text-xl font-bold">Assignment</span>
          </Link>
          <div className="flex items-center gap-2">
              <div className="hover:bg-slate-100 rounded-sm duration-300">
                <Link href="/dashboard" passHref>
                  <p className="text-sm font-semibold px-5 py-1.5 duration-300 text-gray-600 hover:text-black">
                    Dashboard
                  </p>
                </Link>
              </div>
              <div className="hover:bg-slate-100 rounded-sm duration-300">
                <Link href="/doc/assignment.pdf" passHref>
                  <p className="text-sm font-semibold px-5 py-1.5 duration-300 text-gray-600 hover:text-black">
                    Use Case
                  </p>
                </Link>
              </div>
              <div className="hover:bg-slate-100 rounded-sm duration-300">
                <Link href="https://portfolio-amit7976s-projects.vercel.app/" passHref>
                  <p
                    className={"text-sm font-semibold px-5 py-1.5 duration-300 text-orange-500 hover:text-orange-600"}
                  >
                    About Us
                  </p>
                </Link>
              </div>
          </div>

          <div className="flex items-center relative w-40">
            <Input
              type="text"
              className="rounded-full py-2 h-auto px-5 w-96 absolute right-0 pr-16 text-base border-2 font-medium tracking-wide"
              placeholder="Search...."
              spellCheck={"false"}
              autoFocus
            />
            <BiSearch className="absolute right-0 text-xl p-2.5 w-16 h-full" />
          </div>
        </div>
      </header>
    </>
  );
}
export default HeaderForBlog;
