"use client"
import Footer from '@/components/MainUi/Footer/Footer';
import Header from '@/components/MainUi/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Page = () => {


    const searchParams = useSearchParams();
    const message = searchParams.get('message');


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <>

            <Header position='relative' />

            {/* Graphic from https://www.opendoodles.com/ */}

            <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
                <div className="text-center">
                    <Image src={'/images/svg/accountError.svg'} alt='accountError svg' width={800} height={800} className='w-96 mx-auto mb-10' />

                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Sign-in Error!
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-xl max-w-4xl mx-auto">{message ? decodeURIComponent(message) : "An unknown error occurred."}.</p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/auth/login"
                            className="rounded-md bg-orange-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Login Page
                        </Link>
                        <Link href="/helpCenter" className="text-sm font-semibold text-gray-900">
                            Go to Help Center <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
