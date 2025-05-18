import SignUpForm from '@/components/candidateAuth/signUpForm'
import Image from 'next/image'
import { FaAnglesRight } from 'react-icons/fa6'
import { SiTicktick } from 'react-icons/si'


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const MainContent = async () => {
  

    return (
        <>
            <section className="bg-white dark:bg-neutral-900">
                <div className="grid grid-cols-1 lg:grid-cols-7 items-stretch">
                    <div className="flex items-center justify-center px-4 pt-10 h-auto bg-white dark:bg-neutral-900 sm:px-6 lg:px-8 sm:py-16 lg:py-10 col-span-4">
                        <div className="xl:w-full px-10">

                            <h2 className="text-3xl font-bold leading-tight text-gray-400 sm:text-4xl flex flex-col gap-2"><span className='pl-3'>Register new</span><span className='text-6xl text-black dark:text-white'>Account</span></h2>
                           

                            <SignUpForm />

                            <div className='w-full py-6 flex justify-center-center gap-5'>
                                <p className='w-full text-center mt-4 text-gray-400'><a href="/auth/login" className='font-medium text-base justify-center flex items-center'>Already have a account<span className='font-bold text-orange-500 px-1 underline underline-offset-2 flex items-center gap-0.5 hover:text-gray-500 duration-500'>Login Now <FaAnglesRight className='text-' /></span></a></p>
                            </div>
                        </div>
                    </div>


                    <div className="w-full col-span-3 pt-6 pr-4 min-h-screen relative">
                        <div className="flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-10 bg-gray-50 sm:px-6 lg:px-10 w-full rounded-3xl overflow-hidden min-h-screen sticky top-0">
                            <div className="absolute inset-0">
                                <Image
                                    className="object-cover w-full h-full"
                                    src="/images/Random/6263767_3236268.svg"
                                    alt="Join Blogging Community"
                                    width={800}
                                    height={800}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-600 to-transparent"></div>

                            <div className="relative w-full">
                                <div className="w-full">
                                    <h3 className="text-5xl font-bold text-white leading-[3.5rem]">
                                        Join Our Blogging <span className="text-[#fc4c01e1]">Community</span> Today!
                                    </h3>
                                    <p className="mt-4 text-white text-lg max-w-2xl">
                                        Connect with passionate writers, share your ideas, and grow your personal brand through the power of words.
                                    </p>
                                    <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-transparent rounded-full">
                                                <SiTicktick className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <span className="text-lg font-medium text-white"> Publish Your Own Blogs </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-transparent rounded-full">
                                                <SiTicktick className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <span className="text-lg font-medium text-white"> Get Featured on Our Homepage </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-transparent rounded-full">
                                                <SiTicktick className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <span className="text-lg font-medium text-white"> Connect with 10k+ Bloggers </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-transparent rounded-full">
                                                <SiTicktick className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <span className="text-lg font-medium text-white"> Build Your Writing Portfolio </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default MainContent