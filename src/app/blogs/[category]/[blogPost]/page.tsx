"use client"
import Footer from "@/components/MainUi/Footer/Footer";
import MainContent from "./MainContent";
import RelatedBlogs from "./RelatedBlogs";
import { auth } from "@/nextAuth/auth";
import Header from "@/components/MainUi/Header/Header";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type paramsType = Promise<{ blogPost: string }>;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default async function Page(props: { params: paramsType }) {


  const { blogPost } = await props.params;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const session = await auth();


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>

      <div className="bg-white dark:bg-neutral-900">
        
        {!session?.user ? <Header position="sticky" /> : <HeaderForBlog />}

        <MainContent resolvedParams={{ blogPost: blogPost }} />

        <RelatedBlogs resolvedParams={{ blogPost: blogPost }} />

        <Footer />

      </div>

    </>
  );
}

