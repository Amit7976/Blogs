import { auth } from '@/nextAuth/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import MainContent from './MainContent';

async function page() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login")
    }
    return (
        <>
            <MainContent />
        </>
    )
}

export default page
