"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, githubProvider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import Head from "next/head";

export default function Signup() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load reCAPTCHA script dynamically
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/enterprise.js?render=6LdSgOIqAAAAAPH44iDi2AO52brR6Saib4JWWHQe";
        script.async = true;
        script.onload = () => {
            console.log("reCAPTCHA script loaded.");
        };
        document.body.appendChild(script);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setPending(false);
            return;
        }

        try {
            if (!window.grecaptcha) {
                throw new Error("reCAPTCHA is not loaded");
            }

            // Execute reCAPTCHA
            const token = await window.grecaptcha.enterprise.execute("6LdSgOIqAAAAAPH44iDi2AO52brR6Saib4JWWHQe", { action: "submit" });

            if (!token) {
                throw new Error("reCAPTCHA verification failed");
            }

            console.log("reCAPTCHA token:", token);

            // Create user with email & password
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log("User signed up:", userCredential.user);

            setPending(false);
            router.push("/register/login");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPending(false);
        }
    };

    const handleGithubSignIn = async () => {
        setPending(true);
        setError(null);

        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log("GitHub user signed in:", result.user);

            setPending(false);
            router.push("/register/login");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPending(false);
        }
    };

    return (
        <>
            <Head>
                <title>Signup</title>
                <script src="https://www.google.com/recaptcha/enterprise.js?render=6LdSgOIqAAAAAPH44iDi2AO52brR6Saib4JWWHQe"></script>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-navy to-darkRed">
                <a href="../../" className="absolute left-2 top-3">
                    <IoIosArrowBack className="text-offWhite text-[45px] hover:text-neutral-400"/>
                </a>
                <form id="signup-form" onSubmit={handleSubmit} className="flex flex-col w-[450px] bg-offWhite p-6 rounded-xl shadow-2xl border-b-4 border-lightGray">
                    <h2 className="text-[32px] font-extrabold text-navy text-center">Create an Account</h2>

                    <div className="flex justify-center">
                        <div className="w-[90%] h-[2px] bg-navy mt-2 mb-5"></div>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div className="flex flex-col h-fit gap-1">
                        <p className="text-lightGray text-[16px] font-medium pl-1">Email</p>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            disabled={pending}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full h-[50px] rounded-xl pl-4 shadow-md text-navy border border-gray-200"
                        />
                    </div>
                    <div className="flex flex-col h-fit gap-1 mt-5">
                        <p className="text-lightGray text-[16px] font-medium pl-1">Password</p>
                        <input
                            type="password"
                            placeholder="password"
                            disabled={pending}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full h-[50px] rounded-xl pl-4 shadow-md text-navy border border-gray-200"
                        />
                    </div>
                    <div className="flex flex-col h-fit gap-1 mt-5">
                        <p className="text-lightGray text-[16px] font-medium pl-1">Confirm Password</p>
                        <input
                            type="password"
                            placeholder="confirm password"
                            disabled={pending}
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            className="w-full h-[50px] rounded-xl pl-4 shadow-md text-navy border border-gray-200"
                        />
                    </div>
                    <div className="flex justify-center mt-12">
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-[80%] text-offWhite text-[18px] bg-lightRed py-3 rounded-lg hover:bg-darkRed transition duration-200"
                        >
                            {pending ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            disabled={pending}
                            className="w-[80%] text-offWhite text-[18px] bg-gray-800 py-3 rounded-lg hover:bg-gray-900 transition duration-200 flex items-center justify-center"
                        >
                            <FaGithub className="mr-2" />
                            {pending ? "Signing In with GitHub..." : "Sign Up with GitHub"}
                        </button>
                    </div>
                    <p className="text-[14px] text-gray-500 text-center mt-2">
                        Already have an account?&nbsp;
                        <a href="./login" className="text-sky-600 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </>
    );
}