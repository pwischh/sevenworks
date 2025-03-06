// import Logo from "../icons/tmpLogo";
import { Markazi_Text } from "next/font/google";
import Link from "next/link";

const markazi = Markazi_Text({
    subsets: ["latin"],
    variable: "--font-markazi",
  });

export default function Navbar() {
    return (
        <div className = "navbar flex flex-row p-4 gap-3 bg-navy text-white w-full text-offWhite text-l fixed top-0 right-0 left-0 z-3">
            <div className = "flex flex-row items-center gap-5 w-full">
                <div className={markazi.className}>
                    <Link href="/" className="text-3xl font-bold text-offWhite hover:none">
                    SevenWorks
                    </Link>
                    </div>
                {/* <Logo /> */}
                <nav className = "flex flex-row gap-7 px-1 w-fit text-nowrap font-semibold">
                    <a href = "../templates">Resumes</a>
                    <a href = "../templates">Cover Letters</a>
                    <a href = "#">Examples</a>
                    <a href = "#">About</a>
                </nav>
            </div>
            <div className = "flex flex-row justify-end items-center gap-4 text-nowrap">
                <a href = "../register/login" className = "border-2 border-offWhite px-2 py-1 rounded-xl hover:bg-lightRed hover:border-transparent">
                    Log In
                </a>
                <a href = "../register/signup" className = "bg-lightRed border-2 border-lightRed px-2 py-1 rounded-xl hover:bg-darkRed hover:border-darkRed">
                    Sign Up
                </a>
            </div>
        </div>
    );
}