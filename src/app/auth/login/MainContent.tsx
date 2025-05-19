import LoginForm from '@/components/auth/loginForm'
import Image from 'next/image'
import { FaAnglesRight } from 'react-icons/fa6'


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const MainContent = async () => {


    return (
        <>
            <section className='pt-16 px-5'>
                <div className='w-full max-w-xl mx-auto'>
                    <h2 className='text-6xl font-medium text-center leading-[65px] font-serif'>
                        <span className="relative p-4 py-8">
                            <span className='relative z-10'>Login</span>
                            <Image
                                src={'/images/Random/hand_circle.svg'}
                                alt='Hand Circle'
                                width={800}
                                height={800}
                                className='absolute top-0 left-0 w-full h-full object-cover p-9 overflow-visible z-0'
                            />
                        </span>
                        <span className='pl-1'>to your <br /> Account</span>
                    </h2>
                </div>
                <div className="w-full max-w-3xl mx-auto my-5">
                    <p className='text-xl text-center font-medium'>Search and find your dream job is now easier than ever. Just browse a job and apply if you need to.</p>
                </div>
            </section>

            <section className='w-full gap-6 my-5 mb-2 p-5 pb-0 max-w-7xl mx-auto'>
                <LoginForm />
            </section >

            <div className='mt-6'>
                <p className='w-full text-center'><a href="/auth/candidatePasswordReset/sendForgotPasswordToken" className='font-semibold text-base'>Forget Password?</a></p>
                <p className='w-full text-center mt-4 text-gray-400'><a href="/auth/register" className='font-medium text-base justify-center flex items-center'>Don't have a account<span className='font-bold text-orange-500 px-1 underline underline-offset-2 flex items-center gap-0.5 hover:text-gray-500 duration-500'>Create a new account <FaAnglesRight className='text-' /></span></a></p>
            </div>
        </>
    )
}

export default MainContent