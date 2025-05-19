import Footer from "@/components/MainUi/Footer/Footer";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import MainContent from "./MainContent";
import Header from "@/components/MainUi/Header/Header";
import { auth } from "@/nextAuth/auth";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default async function Page({ params }: { params: Promise<{ category: string }> }) {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
    const session = await auth();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <>

            <div className="bg-white dark:bg-neutral-900">

                {!session?.user ? <Header position="sticky" /> : <HeaderForBlog />}

                <MainContent params={params} />

                <Footer />

            </div>

        </>
    );
};
