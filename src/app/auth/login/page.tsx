import { auth } from '@/nextAuth/auth';
import Footer from '@/components/MainUi/Footer/Footer';
import Header from '@/components/MainUi/Header/Header';
import { redirect } from 'next/navigation';
import MainContent from './MainContent';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = async () => {


  const session = await auth();

  if (session?.user) {
    redirect("/dashboard")
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className='bg-white dark:bg-neutral-900'>
        <Header position='relative' />
        <MainContent />
        <Footer />
     </div>
    </>
  )
}

export default page