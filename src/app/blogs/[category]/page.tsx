"use client";
import Footer from "@/components/MainUi/Footer/Footer";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import MainContent from "./MainContent";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Page({ params }: { params: Promise<{ category: string }> }) {

    return (
        <>

            <div className="bg-white dark:bg-neutral-900">

                <HeaderForBlog />

                <MainContent params={params} />

                <Footer />

            </div>
            
        </>
    );
};
