"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCircleDashed } from "react-icons/lu";
import { z } from "zod";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FROM SCHEMA FOR VALIDATION
const FormSchema = z.object({
  newsletter: z.string().min(12, { message: "Email must be at least 12 characters." }).email({ message: 'Must be a valid email' }),
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Footer() {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newsletter: "",
    },
  })


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // POST SUBSCRIBER EMAIL WHEN SUBMIT THE FORM
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setLoading(true); // Set loading state to true when form submission starts
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // MAKE LOADING STATE OF BUTTON WHEN API IS WORKING
  const [loading, setLoading] = useState(false);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // FOOTER ALL LINKS
  const menuItems = {
    Explores: [
      { text: "Jobs Listings", link: "/pages/jobs" },
      { text: "Companies", link: "/pages/companies" },
      { text: "Job Seekers", link: "/pages/candidates" },
      { text: "Login/Sign Up", link: "/auth/login" },
      { text: "Company Portal", link: "/auth/companyRegister" },
    ],
    Learn: [
      { text: "Courses", link: "/pages/courses" },
      { text: "Articles", link: "/pages/articles" },
      { text: "Guides", link: "/pages/guide" },
      { text: "Career Advice", link: "/pages/careerAdvice" },
    ],
    Resources: [
      { text: "Blogs", link: "/pages/blogs" },
      { text: "Live Events", link: "/pages/liveEvent" },
      { text: "Webinars", link: "/pages/webinars" },
      { text: "Sitemap", link: "/pages/sitemap" },
    ],
    Products: [
      { text: "Resume Builder", link: "/pages/resumeBuilder" },
      { text: "ATS Tool", link: "/pages/atsTool" },
      { text: "Store", link: "/pages/store" },
      { text: "Idea Hub", link: "/pages/ideaHub" },
    ],
    Help: [
      { text: "Help Center", link: "/pages/helpCenter" },
      { text: "FAQs", link: "/pages/faqs" },
      { text: "Complain", link: "/pages/complain" },
      { text: "Bug Report", link: "/pages/bugReport" },
    ],
    "For Job Seekers": [
      { text: "Go Pro", link: "" },
      { text: "Announcement", link: "/pages/announcement" },
      { text: "Job Alerts", link: "/pages/jobAlerts" },
      { text: "Testimonials", link: "/pages/testimonials" },
    ],
    Social: [
      { text: "Instagram", link: "https://www.instagram.com/jobboost_in/" },
      {
        text: "Facebook",
        link: "https://www.facebook.com/profile.php?id=61558875241634&mibextid=ZbWKwL",
      },
      { text: "Tweeter(X)", link: "https://x.com/jobboost_20" },
      {
        text: "LinkedIn",
        link: "https://www.linkedin.com/company/jobboost-india",
      },
      {
        text: "Whatsapp",
        link: "https://api.whatsapp.com/send/?phone=919660050909",
      },
    ],
    Solutions: [
      { text: "Human Resources", link: "" },
      { text: "Sales & Marketing", link: "" },
      { text: "Revenue", link: "" },
      { text: "Investor", link: "" },
    ],
    Company: [
      { text: "Press & Media", link: "/pages/press-media" },
      { text: "Our Story", link: "/pages/ourStory" },
      { text: "Contact", link: "/pages/contact" },
      { text: "Team", link: "/pages/team" },
      { text: "Career", link: "/pages/career" },
    ],
    Policies: [
      { text: "Terms and Conditions", link: "/pages/terms" },
      { text: "Privacy Policy", link: "/pages/privacy" },
      { text: "Community Guidelines", link: "/pages/communityGuidelines" },
      { text: "Cookies Policy", link: "/pages/cookiesPolicy" },
    ],
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <footer className="bg-white text-black mt-40 p-0 lg:p-10">






      {/* <Toaster /> */}

      <div className="container mx-auto lg:px-4">


        {/* Footer Bottom Section */}
        <div className="bg-gray-100 text-black rounded-xl p-9 my-10 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8"><Link href="/" className="flex items-center gap-2 " prefetch={false}>
            <Image
              src="/images/logo/electricIcon.svg"
              alt="Jobboost Logo"
              width={200}
              height={35}
              className={"w-2 sm:w-3 md:w-10"}
            />
            <span className="text-2xl font-bold">Assignment</span>
          </Link>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-col items-end">
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem>
                        <h3 className="text-2xl font-bold text-black">Newsletter</h3>
                        <FormDescription className="text-sm font-medium text-gray-500 mt-1 w-full">
                          Subscribe to our newsletter to get latest updates and news
                        </FormDescription>
                        <div className="gap-4 items-center mt-3">
                          <div className="px-3 text-sm relative">
                            <FormMessage className="bg-white px-10 py-2 rounded-lg absolute bottom-2 shadow-xl" />
                          </div>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="What is your work email"
                              className="text-base px-6 pt-5 pb-6 mt-2 rounded-full outline-none border-2 border-gray-500 shadow-none min-w-full lg:min-w-96 font-medium tracking-wider"
                              {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-[#FC4C02] rounded-full py-2 mt-2 w-fit h-10 disabled:opacity-90"
                    disabled={loading} // Disable the button when loading
                  >
                    {loading ? (
                      <>
                        <div className="flex items-end gap-2 px-5">
                          <LuCircleDashed className="h-4 w-4 animate-spin font-bold mb-0.5" /> Please wait...
                        </div>
                      </>
                    ) : (
                      <span className="px-14">Subscribe</span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>


        <div className="w-full border-t border-gray-600 py-10">
          <p className="mt-2 font-medium text-sm text-gray-500">
            © 2023 <Link href={"/"}>assignment</Link> .{" "}
            <Link href={"/"}>assignment</Link> and the{" "}
            <Link href={"/"}>assignment</Link> logo are registered trademarks of
            the company. All services are currently available only within
            India. For any inquiries or support, please contact us through our{" "}
            <Link href={"https://portfolio-amit7976s-projects.vercel.app/contact"} className="text-[#FF4A02]">
              Contact Page
            </Link>
            . Please see our
            Terms of Service
            for more details.
          </p>
          <p className="mt-5 font-medium text-sm text-gray-500">
            Read our
            Community Guidelines
            and
            Privacy Policy
            to understand how we operate and manage your information. For
            detailed information on how we protect your data, visit our
            Privacy Policy
            . By using our services, you agree to our
            Terms of Service
            . Thank you for choosing Us.
          </p>
        </div>
      </div>
    </footer >
  );
}

export default Footer;
``