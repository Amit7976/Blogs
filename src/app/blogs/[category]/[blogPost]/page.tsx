"use client";
import Footer from "@/components/MainUi/Footer/Footer";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import { use } from "react";
import MainContent from "./MainContent";
import RelatedBlogs from "./RelatedBlogs";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Page({ params }: { params: Promise<{ blogPost: string }> }) {


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const resolvedParams = use(params);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>

      <div className="bg-white dark:bg-neutral-900">

        <HeaderForBlog />

        <MainContent resolvedParams={{ blogPost: resolvedParams.blogPost }} />

        <RelatedBlogs resolvedParams={{ blogPost: resolvedParams.blogPost }} />

        <Footer />

      </div>
      
    </>
  );
}

