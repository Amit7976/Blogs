import React from 'react'
import MainContent from './MainContent'
import { auth } from '@/nextAuth/auth';
import { redirect } from 'next/navigation';

async function page({ params }: { params: Promise<{ edit: string }> }) {

    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login")
    }

    return (
        <>
            <MainContent params={params} />
        </>
    )
}

export default page