"use client";
import Footer from "@/components/MainUi/Footer/Footer";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import MainContent from "./MainContent";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Page({ params }: { params: Promise<{ category: string }> }) {

    return (
        <>

            <HeaderForBlog />

            <MainContent params={params} />

            <Footer />
            
        </>
    );
};
