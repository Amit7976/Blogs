"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Blog } from "@/lib/utils";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function CategoryPlaceholder() {
    return (
        <div className="flex items-center space-x-4 w-40 overflow-hidden">
            <Skeleton className="h-10 w-40 rounded-full" />
        </div>
    );
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Category() {


    const [blogsCategories, setBlogsCategories] = useState<Blog[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const fetchBlogsCategories = async () => {
        try {
            const response = await axios.get('/api/blogs/category');
            setBlogsCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching blog categories:', error);
        } finally {
            setLoadingCategories(false);
        }
    };
 

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const fetchData = async () => {
            await fetchBlogsCategories();
        };
        fetchData();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <section className='p-10 sm:p-16 lg:p-28 py-5 mb-10'>
                <h3 className='text-3xl font-bold'>Popular Category</h3>
                <div className="flex items-center gap-x-5 gap-y-3 flex-wrap my-10">
                    {loadingCategories ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <CategoryPlaceholder key={index} />
                        ))
                    ) : (
                        blogsCategories.map((category, index) => (
                            <Link href={`/blogs/${category.category}`} key={index} className='text-base font-medium p-3 px-10 bg-gray-100 dark:bg-neutral-800 rounded-full'>
                                {category.category} <span className="opacity-60 text-sm pl-1">({category.count})</span>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}

export default Category