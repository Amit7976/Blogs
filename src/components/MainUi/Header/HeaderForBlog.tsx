"use client";

import * as React from "react";
import Link from "next/link";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";

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
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/blogs" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/doc/assignment.pdf" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Use Case
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://portfolio-amit7976s-projects.vercel.app/" passHref>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " text-orange-500"
                    }
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
