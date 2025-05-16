"use client"

import { signIn } from "@/nextAuth/auth";
import { CredentialsSignin } from "next-auth";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ProviderLoginSignUp = async (provider: string) => {


    console.log("1");
    console.log("provider: " + provider);

    try {
        console.log("2");
        await signIn(provider);
        console.log("3");
    } catch (error: any) {
        const err = error as CredentialsSignin;
        return err.cause;
    }


};


export default ProviderLoginSignUp;