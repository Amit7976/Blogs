import Footer from "@/components/MainUi/Footer/Footer";
import React from "react";
import MainContent from "./MainContent";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
// import AnnouncementBanner from "@/components/MainUi/AnnouncementBanner/AnnouncementBanner";
import BlogSubFooter from "@/components/MainUi/Footer/BlogSubFooter";


// 
import { redirect } from "next/navigation";
//


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Page = async () => {

  //

  // await verifyToken() ? '' : redirect('/auth/companyLogin');

  //


  return (
    <>
      {/* Header For Blog */}
      <HeaderForBlog />
      {/* End Header For Blog */}

      {/* Announcement Banner */}
      {/* <AnnouncementBanner /> */}
      {/* End Announcement Banner */}

      {/* Main Content */}
      <MainContent />
      {/* End Main Content */}

      {/* BLOG SUB FOOTER */}
      <BlogSubFooter />
      {/* End BLOG SUB FOOTER */}

      {/* Footer */}
      <Footer />
      {/* End Footer */}

    </>
  );

}

export default Page;
