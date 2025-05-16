import React from "react";
import Image from "next/image";
import Link from "next/link";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// INTERFACE OF BLOG CARD FOR TYPESCRIPT
interface BlogCardProps {
  title: string;
  shortDescription: string;
  imageUrl: string;
  href: string;
  category: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const BlogCard: React.FC<BlogCardProps> = ({ title, shortDescription, imageUrl, href, category }) => (
  <>
    <Link className="group rounded-xl overflow-hidden" href={`/pages/blogs/${category}/${href}`}>
      <div className="sm:flex">
        <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
          <Image
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out absolute top-0 start-0 object-cover rounded-xl select-none"
            src={`/images/blogs${imageUrl}`}
            alt="Image Description"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white line-clamp-2">
            {title}
          </h3>
          <p className="mt-3 text-gray-600 dark:text-neutral-400 line-clamp-3">
            {shortDescription}
          </p>
          <p className="mt-4 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium select-none">
            Read more
            <svg
              className="flex-shrink-0 size-4"
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
        </div>
      </div>
    </Link>
  </>
);

export default BlogCard;
