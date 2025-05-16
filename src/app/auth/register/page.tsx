import { auth } from '@/nextAuth/auth';
import Footer from '@/components/MainUi/Footer/Footer';
import { redirect } from 'next/navigation';
import MainContent from './MainContent';
import Header from '@/components/MainUi/Header/Header';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = async () => {


  // CHECK IF CANDIDATE IS LOGGED IN, IF YES THEN REDIRECT HIM TO THE DASHBOARD
  // const session = await auth();

  // if (session?.user) {
  //   redirect("/dashboard")
  // }


 


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