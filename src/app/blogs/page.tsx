import Footer from "@/components/MainUi/Footer/Footer";
import React from "react";
import MainContent from "./MainContent";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import Header from "@/components/MainUi/Header/Header";
import { auth } from "@/nextAuth/auth";
//


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Page = async () => {

  const session = await auth();




  return (
    <>
      {/* Header For Blog */}
      {(!session?.user) ?
        <Header position="sticky" />
        :
        <HeaderForBlog />
      }

      {/* End Header For Blog */}

      {/* Announcement Banner */}
      {/* <AnnouncementBanner /> */}
      {/* End Announcement Banner */}

      {/* Main Content */}
      <MainContent />
      {/* End Main Content */}

      {/* BLOG SUB FOOTER */}
      {/* <BlogSubFooter /> */}
      {/* End BLOG SUB FOOTER */}
    
      {/* Footer */}
      <Footer />
      {/* End Footer */}

    </>
  );

}

export default Page;
