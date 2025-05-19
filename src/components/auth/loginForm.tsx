"use client";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { credentialsLogin } from "./actions/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner"


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const LoginForm = () => {


    const router = useRouter();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return toast.warning("Please provide all fields");
        }

        const error = await credentialsLogin(email, password);

        if (!error) {
            toast.success("Login success");
            router.refresh();
        } else {
            toast.error("Login failed");
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className="w-full py-10 sm:px-10 space-y-6 flex flex-col items-end">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }}
                className="w-full space-y-12 flex flex-col items-center"
            >
                <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-10">
                    <Input
                        type="email"
                        name="email"
                        className="flex items-center gap-3 border-2 rounded-full px-10 w-full max-w-96 h-14 text-sm shadow-none hover:shadow-xl duration-500 transition-shadow font-semibold tracking-wide lowercase"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <Input
                        type="password"
                        name="password"
                        className="flex items-center gap-3 border-2 rounded-full px-10 w-full max-w-96 h-14 text-sm shadow-none hover:shadow-xl duration-500 transition-shadow font-semibold tracking-wide"
                        placeholder="Password"
                    />
                </div>
                <Button
                    variant="default"
                    type="submit"
                    className="flex items-center justify-between gap-3 rounded-full cursor-pointer px-10 w-full max-w-96 h-14 text-sm shadow-none hover:shadow-xl duration-500 transition-shadow"
                >
                    <span className="ml-5">Login Now</span>
                    <FaArrowRightLong className="text-2xl mr-5" />
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
