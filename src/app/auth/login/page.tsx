import { auth } from '@/nextAuth/auth';
import Footer from '@/components/MainUi/Footer/Footer';
import Header from '@/components/MainUi/Header/Header';
import { redirect } from 'next/navigation';
import MainContent from './MainContent';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = async () => {


  // CHECK IF CANDIDATE IS LOGGED IN, IF YES THEN REDIRECT HIM TO THE DASHBOARD
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard")
  }


  // CHECK IF EMPLOYER IS LOGGED IN, IF YES THEN REDIRECT HIM TO THE DASHBOARD
  // await verifyToken() ? redirect('/company/dashboard') : '';


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <Header position='relative' />
      <MainContent />
      <Footer />
    </>
  )
}

export default page