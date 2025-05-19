"use server";
import { signIn } from "@/nextAuth/auth";
import { CredentialsSignin } from "next-auth";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const credentialsLogin = async (email: string, password: string) => {
    try {
        const result = await signIn("credentials", {
            email,
            password,
        });
        

        return result;
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
    }
};

export { credentialsLogin };
