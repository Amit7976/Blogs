"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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


  // DEFINE TOAST FOR DISPLAYING MESSAGE
  const { toast } = useToast()


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // POST SUBSCRIBER EMAIL WHEN SUBMIT THE FORM
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setLoading(true); // Set loading state to true when form submission starts

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.newsletter);

      const response = await axios.post('/api/newsletter', formDataToSend);
      const responseData = response.data;

      if (responseData.success) {
        toast({
          title: "Hurray🎉 You Subscribed Jobboost",
          description: "You have successfully subscribed to the JobBoost newsletter.",
          variant: "success",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: responseData.msg,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Submission Failed",
          description: error.response.data.msg,
          variant: "destructive",
        });
      } else {
        toast({
          title: "An unexpected error occurred",
          description: error.message || "Failed to save FAQ",
          variant: "destructive",
        });
      }
      console.error('Error saving FAQ:', error);
    } finally {
      setLoading(false); // Reset loading state after form submission is completed
    }
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
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-5 gap-10">
          {Object.entries(menuItems).map(([section, items]) => (
            <ul key={section} className="">
              <li>
                <h6 className="text-base font-bold text-black select-none">
                  {section}
                </h6>
              </li>
              {items.map(({ text, link }) => (
                <li
                  key={text}
                  className={`my-2.5  ${link ? "opacity-100" : "opacity-40"}`}
                >
                  {link ? (
                    <a
                      href={link}
                      className="text-sm font-medium text-gray-500"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-gray-500">
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {Object.entries(menuItems).map(([section, items]) => (
            <Accordion key={section} type="single" collapsible>
              <AccordionItem value="{section}">
                <AccordionTrigger className="hover:no-underline text-base font-semibold text-black">{section}</AccordionTrigger>
                <AccordionContent>
                  {items.map(({ text, link }) => (
                    <div key={text} className={`w-full ${link ? "opacity-100" : "opacity-40"}`}>
                      {link ? (
                        <Link
                          href={link}
                          className="text-base font-semibold hover:underline text-gray-600 w-full h-full block py-2.5 pl-5"
                        >
                          {text}
                        </Link>
                      ) : (
                        <span className="text-base font-medium text-gray-600 w-full h-full block py-2.5 pl-5">{text}</span>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>



        {/* Footer Bottom Section */}
        <div className="bg-gray-100 text-black rounded-xl p-9 my-10 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link href="/" className="flex items-center w-full">
              <Image
                src="/images/logo/logo_short.svg"
                alt="Jobboost Logo"
                width={80}
                height={80}
                className="w-32 h-auto"
              />
              <div>
                <h3 className="text-2xl font-bold">Jobboost</h3>
                <p className="text-base mt-1">The Ultimate for Job Seekers</p>
              </div>
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
            © 2023 <Link href={"/"}>Jobboost</Link> Business Corporation.{" "}
            <Link href={"/"}>Jobboost</Link> and the{" "}
            <Link href={"/"}>Jobboost</Link> logo are registered trademarks of
            the company. All services are currently available only within
            India. For any inquiries or support, please contact us through our{" "}
            <Link href={"/contact"} className="text-[#FF4A02]">
              Contact Page
            </Link>
            . Please see our{" "}
            <Link href={"/terms"} className="text-[#FF4A02]">
              Terms of Service
            </Link>{" "}
            for more details.
          </p>
          <p className="mt-5 font-medium text-sm text-gray-500">
            Read our{" "}
            <Link href={"/communityGuidelines"} className="text-[#FF4A02]">
              Community Guidelines
            </Link>{" "}
            and{" "}
            <Link href={"/privacy"} className="text-[#FF4A02]">
              Privacy Policy
            </Link>{" "}
            to understand how we operate and manage your information. For
            detailed information on how we protect your data, visit our{" "}
            <Link href={"/privacy"} className="text-[#FF4A02]">
              Privacy Policy
            </Link>
            . By using our services, you agree to our{" "}
            <Link href={"/terms"} className="text-[#FF4A02]">
              Terms of Service
            </Link>{" "}
            . Thank you for choosing JobBoost.
          </p>
        </div>
      </div>
    </footer >
  );
}

export default Footer;
``