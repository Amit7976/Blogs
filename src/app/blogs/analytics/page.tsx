import { auth } from '@/nextAuth/auth';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
      const session = await auth();
  
      if (!session?.user) {
          redirect("/auth/login")
      }
  return (
      <div className='h-screen w-screen flex items-center justify-center'>
          <p className='text-2xl font-semibold animate-pulse'>This feature is currently under development.</p>
    </div>
  )
}

export default page