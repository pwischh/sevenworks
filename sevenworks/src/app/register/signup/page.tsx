"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, githubProvider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/io";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null); // ✅ new
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        setError(null);
        setSuccess(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setPending(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );

            await sendEmailVerification(userCredential.user);
            console.log("Verification email sent ✅");

            setSuccess("A verification email has been sent. Please check your inbox before logging in.");
            setPending(false);

            // Optional: redirect after 3 seconds
            setTimeout(() => {
                router.push("/register/login");
            }, 3000);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPending(false);
        }
    };

    const handleGithubSignUp = async () => {
        setPending(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log("GitHub user signed up:", result.user);
            setPending(false);
            router.push("/dashboard");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPending(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setPending(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google user signed up:", result.user);
            setPending(false);
            router.push("/dashboard");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setPending(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-navy to-darkRed">
            <a href="../../" className="absolute left-2 top-3">
                <IoIosArrowBack className="text-offWhite text-[45px] hover:text-neutral-400" />
            </a>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[450px] bg-offWhite p-6 rounded-xl shadow-2xl border-b-4 border-lightGray"
            >
                <h2 className="text-[32px] font-extrabold text-navy text-center">
                    Create an Account
                </h2>

                <div className="flex justify-center">
                    <div className="w-[90%] h-[2px] bg-navy mt-2 mb-5"></div>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>} {/* ✅ */}

                <div className="flex flex-col h-fit gap-1">
                    <p className="text-black/60 text-[16px] font-medium pl-1">Email</p>
                    <input
                        type="email"
                        placeholder="example@email.com"
                        name="email"
                        disabled={pending}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-[50px] rounded-xl pl-4 shadow-md text-navy border border-gray-200"
                    />
                </div>
                <div className="flex flex-col h-fit gap-1 mt-5">
                    <p className="text-black/60 text-[16px] font-medium pl-1">Password</p>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        disabled={pending}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full h-[50px] rounded-xl pl-4 shadow-md text-navy border border-gray-200"
                    />
                </div>
                <div className="flex flex-col h-fit gap-1 mt-5">
                    <p className="text-black/60 text-[16px] font-medium pl-1">Confirm Password</p>
                    <input
                        type="password"
                        placeholder="confirm password"
                        name="confirmPassword"
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
                        className="w-[80%] text-offWhite text-[18px] bg-lightRed py-3 rounded-lg hover:bg-darkRed transition duration:200"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleGithubSignUp}
                        disabled={pending}
                        className="w-[80%] text-offWhite text-[18px] bg-gray-800 py-3 rounded-lg hover:bg-gray-900 transition duration-200 flex items-center justify-center"
                    >
                        <FaGithub className="mr-2" />
                        Sign Up with GitHub
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={pending}
                        className="w-[80%] text-offWhite text-[18px] bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" />
                        Sign Up with Google
                    </button>
                </div>



                <p className="text-[12px] text-gray-500 text-center mt-4 px-6">
                    By signing up, you agree to our{" "}
                    <a href="/terms" className="text-sky-600 hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</a>.
                </p>



                <p className="text-[14px] text-gray-500 text-center mt-2">
                    Already have an account?&nbsp;
                    <a href="./login" className="text-sky-600 hover:underline">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}
