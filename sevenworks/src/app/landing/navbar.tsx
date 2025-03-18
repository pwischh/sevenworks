"use client"

import { Markazi_Text } from "next/font/google";
import Link from "next/link";
import { useAuth } from "../authContext";
import ProfilePhoto from "../components/profilephoto";


const markazi = Markazi_Text({
    subsets: ["latin"],
    variable: "--font-markazi",
  });



export default function Navbar() {
    const { user, loading } = useAuth();

    return (
        <div className = "navbar flex flex-row p-4 gap-3 bg-navy text-white w-full text-offWhite text-l fixed top-0 right-0 left-0">
            <div className = "flex flex-row items-center gap-5 w-full">
                <div className={markazi.className}>
                    <Link href="/" className="text-3xl font-bold text-offWhite hover:none">
                        SevenWorks
                    </Link>
                </div>
                <div className="w-[2px] h-[80%] bg-gray-400/30 rounded-md"></div>
                <nav className = "flex flex-row gap-7 px-1 w-fit text-nowrap font-semibold">
                    <Link href="/templates" className="hover:scale-[1.05] transition">Templates</Link>
                    <Link href = "#" className="hover:scale-[1.05] transition">Examples</Link>
                    <Link href = "#" className="hover:scale-[1.05] transition">About</Link>
                </nav>
            </div>
            <div className = "flex flex-row justify-end items-center gap-4 text-nowrap">
                {(loading || !user) ? (
                    <>  
                        <a href = "../register/login" 
                        className = "border-2 border-offWhite px-2 py-1 rounded-xl hover:bg-lightRed hover:border-transparent">
                            Log In
                        </a>
                        <a href = "../register/signup" 
                        className = "bg-lightRed border-2 border-lightRed px-2 py-1 rounded-xl hover:bg-darkRed hover:border-darkRed">
                            Sign Up
                        </a>
                    </>
                ) : (
                    <>  
                        <Link href="/dashboard">
                            <ProfilePhoto/>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}