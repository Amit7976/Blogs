"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { MdAlternateEmail } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox"
import { credentialsSignUp } from "./actions/register";
import { z } from "zod";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const SignUpForm = () => {


    // DEFINE TOAST FOR DISPLAYING MESSAGE
    const { toast } = useToast();
    const router = useRouter();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    // DEFINE THE ZOD SCHEMA
    const SignUpSchema = z.object({
        firstName: z.string().min(3, "First name is required"),
        lastName: z.string().min(3, "Last name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <form
                action={async (formData) => {

                    // Extract form data
                    const firstName = formData.get("firstName") as string;
                    const lastName = formData.get("lastName") as string;
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;
                    const confirmPassword = formData.get("confirmPassword") as string;
                    const terms = formData.get("terms") === "on";

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    // Validate form data using Zod
                    const result = SignUpSchema.safeParse({
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        terms,
                    });

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    if (!result.success) {
                        // Display error messages
                        result.error.errors.forEach((error) =>
                            toast({
                                title: error.message,
                                variant: "default",
                            })
                        );
                        return;
                    }

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    const error = await credentialsSignUp(firstName, lastName, email, password);

                    if (!error) {
                        toast({
                            title: "Register success",
                            variant: "success",
                        });

                        router.refresh();
                    } else {
                        toast({
                            title: "Registration failed",
                            variant: "default",
                        });
                    }

                }}
                className="mt-10"
            >
                <div className="space-y-5">
                    <div className="w-full py-2 grid grid-cols-2 items-center gap-5">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium text-gray-500 pl-5">
                                First name
                            </label>
                            <Input
                                type="text"
                                name="firstName"
                                className="border-2 rounded-full px-10 w-full h-14 text-sm hover:shadow-lg duration-500 transition-shadow font-semibold tracking-wide capitalize placeholder:text-gray-400 placeholder:font-normal"
                                placeholder="First name"
                                autoComplete="given-name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium text-gray-500 pl-5">
                                Last name
                            </label>
                            <Input
                                type="text"
                                name="lastName"
                                className="border-2 rounded-full px-10 w-full h-14 text-sm hover:shadow-lg duration-500 transition-shadow font-semibold tracking-wide capitalize placeholder:text-gray-400 placeholder:font-normal"
                                placeholder="Last name"
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-500 pl-5">
                            Email address
                        </label>
                        <div className="mt-2.5 relative text-gray-600">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                                <MdAlternateEmail className="w-5 h-5" />
                            </div>

                            <Input
                                type="email"
                                name="email"
                                className="border-2 rounded-full px-12 w-full h-14 text-sm hover:shadow-lg duration-500 transition-shadow font-semibold tracking-wide placeholder:text-gray-400 placeholder:font-normal"
                                placeholder="Enter your email address"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="w-full py-2 grid grid-cols-2 items-center gap-5">
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-500 pl-5">
                                Password
                            </label>
                            <Input
                                type="password"
                                name="password"
                                className="border-2 rounded-full px-10 w-full h-14 text-sm hover:shadow-lg duration-500 transition-shadow font-semibold tracking-wide placeholder:text-gray-400 placeholder:font-normal"
                                placeholder="Password"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-500 pl-5">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                className="border-2 rounded-full px-10 w-full h-14 text-sm hover:shadow-lg duration-500 transition-shadow font-semibold tracking-wide placeholder:text-gray-400 placeholder:font-normal"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div className="items-top flex space-x-2 py-5 pl-4">
                        <Checkbox id="terms" name="terms" className="w-7 h-7 border-2" />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our <a href="/terms" className="text-orange-500">Terms of Service</a> and{" "}
                                <a href="/privacy" className="text-orange-500">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center w-full pt-2 pb-3">
                        <Button
                            variant="default"
                            type="submit"
                            className="flex items-center justify-center gap-6 rounded-xl px-10 w-full h-14 text-sm hover:shadow-lg duration-500 bg-[#FC4C01]"
                        >
                            Sign up your Jobboost Account
                            <FaArrowRightLong className="text-2xl" />
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignUpForm;
