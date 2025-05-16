"use client";
import Footer from "@/components/MainUi/Footer/Footer";
import HeaderForBlog from "@/components/MainUi/Header/HeaderForBlog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { IoChevronBackOutline } from "react-icons/io5";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG FOR TYPESCRIPT
interface Blog {
  [x: string]: any;
  title: string;
  category: string;
  description: string;
  tags: string;
  image: string;
  imageTitle: string;
  date: Date;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// PLACEHOLDER FOR RELATED BLOGS
function RelatedBlogPlaceholder() {
  return (
    <>
      <div className="flex flex-col space-y-3 basis-1/3 pl-5 flex-grow">
        <Skeleton className="w-full object-cover rounded-xl h-[250px]" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-1/2 rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-1/4 rounded-full" />
        </div>
      </div>
    </>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// PLACEHOLDER FOR LATEST BLOGS
function LatestBlogPlaceholder() {
  return (
    <div className="flex items-center space-x-4 w-full overflow-hidden">
      <Skeleton className="w-full size-20 rounded-xl flex-shrink-0" />
      <div className="w-full">
        <div className="space-y-2 w-full">
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-1/2 rounded-full" />
        </div>
        <div className="space-y-2 w-full pt-1">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-2 w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = ({ params }: any) => {


  // FETCH MAIN BLOG COMPLETE DATA
  const [data, setData] = useState<Blog | null>(null);
  const [blogLoading, setBlogLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blogs/blog', {
        params: {
          blogPost: params.blogPost,
        },
      })
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setBlogLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogData();
  }, [])


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  // SEPARATE TAGS
  const itemsString = data && data.tags;
  const itemsArray = itemsString && itemsString.split(', ');



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // FETCH 5 LATEST BLOGS
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
  const [latestBlogsLoading, setLatestBlogsLoading] = useState(true);

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs/latestBlogs');
      setLatestBlogs(response.data.latestBlogs);
      console.log(response.data.latestBlogs);

    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLatestBlogsLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestBlogs();
  }, []);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // FETCH RELATED BLOGS [FOCUS SERIES:- CATEGORY > TAGS > RANDOM]
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [relatedBlogsLoading, setRelatedBlogsLoading] = useState(true);

  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs/relatedBlogs', {
        params: {
          blogPost: params.blogPost,
        },
      })
      setRelatedBlogs(response.data.relatedBlogs);
      console.log(response.data.relatedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setRelatedBlogsLoading(false);
    }
  }

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // ROUTER FOR BACK BUTTON
  const router = useRouter();


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* Header For Blog */}
      <HeaderForBlog />
      {/* End Header For Blog */}

      <div className="w-full px-4 sm:px-6 lg:py-16 lg:px-28 mx-auto relative">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">

          {/* Complete Blog */}
          <div className="lg:col-span-2">
            <div className="">
              <div className="space-y-5 lg:space-y-8">
                <Button
                  variant={"ghost"}
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 dark:text-blue-500 select-none"
                >
                  <IoChevronBackOutline className="flex-shrink-0 size-4" />
                  Back to Blog
                </Button>

                {blogLoading ? (
                  <div className="flex items-center justify-center h-screen">
                    <Image src="/images/gif/loader.gif" alt="Loading" width={100} height={100} />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">{data && data.title}</h2>

                    <div className="flex items-center gap-x-5">
                      <a
                        className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200 capitalize"
                        href={`/blogs/${data && data.category}`}
                      >
                        {data && data.category}
                      </a>
                      <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                        {data && new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <p className="text-lg text-gray-800">{data && data.shortDescription}</p>

                    <figure>
                      {data && (
                        <Image
                          className="w-full aspect-video object-cover rounded-xl select-none"
                          src={`/images/blogs${data.image}`}
                          alt={data && data.imageTitle}
                          width={800}
                          height={800}
                        />
                      )}
                      <p className="text-sm font-medium text-center mt-3 mb-10 text-gray-500">{data && data.imageTitle}</p>
                    </figure>


                    <section className="my-10 space-y-5 md:space-y-8">
                      {data && (<div dangerouslySetInnerHTML={{ __html: data.description }} />)}
                    </section>

                    <div className="grid lg:flex lg:items-center gap-2 pt-5">
                      {/* Badges/Tags */}
                      {itemsArray && itemsArray.map((item, index) => (
                        <p
                          key={index}
                          className="m-0.5 inline-flex items-center gap-1.5 py-2 px-6 rounded-lg text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                        >
                          {item}
                        </p>
                      ))}
                      {/* End Badges/Tags */}

                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
          {/* End Complete Blog */}


          {/* latest Blogs */}
          <div className="lg:col-span-1 lg:w-full lg:h-full">
            <div className="sticky top-14 start-0 py-8 lg:ps-10">
              <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-4 mb-8 dark:border-neutral-700 select-none">
                <h2 className="text-lg font-semibold">Latest Blog Posts</h2>
              </div>

              <div className="space-y-6">
                {latestBlogsLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <LatestBlogPlaceholder key={index} />
                  ))
                ) : (latestBlogs.map((blog, index) => (
                  <a
                    key={index}
                    className="group flex items-center gap-x-6"
                    href={`/blogs/${blog.category}/${blog._id}`}
                  >
                    <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                      <Image
                        className="size-full absolute top-0 start-0 object-cover rounded-lg select-none"
                        src={`/images/blogs${blog.image}`}
                        alt={blog.title}
                        width={800}
                        height={800}
                      />
                    </div>
                    <div className="h-full">
                      <h3 className="mt-0.5 text-base font-medium text-gray-800 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                        {blog.shortDescription}
                      </p>
                    </div>
                  </a>
                ))
                )}
              </div>
            </div>
          </div>
          {/* End latest Blogs */}

        </div>
      </div>

      {/* Related Blogs */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="text-start mb-10 lg:my-10 px-6 w-fit">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Related Blogs
          </h2>
          <div className="w-3/4 h-1.5 bg-gradient-to-l from-gray-300 to-gray-400 rounded-full mt-1.5"></div>
        </div>

        <Carousel
          className="h-auto"
          opts={{
            align: "start",
            dragFree: false,
          }}
        >
          <CarouselContent className="flex">
            {relatedBlogsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <RelatedBlogPlaceholder key={index} />
              ))
            ) : (relatedBlogs.map((RelatedBlog, index) => (
              <CarouselItem key={index} className="basis-1/3 pl-5 flex-grow">
                <div
                  data-aos="fade-up"
                  data-aos-offset="0"
                  data-aos-delay="0"
                  data-aos-duration={`${index * 300 + 200}`}
                  data-aos-easing="ease"
                  data-aos-mirror="false"
                  data-aos-once="true"
                  className="w-full rounded-xl flex flex-col h-full min-h-[330px]"
                >
                  <a
                    className="group hover:bg-gray-100 rounded-xl p-5 transition-all dark:hover:bg-white/10"
                    href={`/blogs/${RelatedBlog.category}/${RelatedBlog._id}`}>
                    <div className="aspect-w-16 aspect-h-10">
                      <Image
                        className="w-full object-cover rounded-xl h-[250px] select-none"
                        src={`/images/blogs${RelatedBlog.image}`}
                        alt={RelatedBlog.title}
                        width={800}
                        height={800}
                      />
                    </div>
                    <h3 className="mt-5 text-xl font-medium text-gray-800 dark:text-neutral-300 dark:hover:text-white line-clamp-2">
                      {RelatedBlog.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-300 dark:hover:text-white line-clamp-3">
                      {RelatedBlog.shortDescription}
                    </p>
                    <p className="mt-3 select-none inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                      Learn more
                      <svg
                        className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </p>
                  </a>
                </div>
              </CarouselItem>
            )))}
          </CarouselContent>
          <CarouselPrevious className="select-none" />
          <CarouselNext className="select-none" />
        </Carousel>
      </div>
      {/* End Related Blogs */}

      {/* Footer */}
      <Footer />
      {/* End Footer */}
    </>
  );
}

export default page;
