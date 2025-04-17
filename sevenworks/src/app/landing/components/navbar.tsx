"use client"

import { Markazi_Text } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../../authContext";
import ProfilePhoto from "../../../components/profilephoto";

const markazi = Markazi_Text({
    subsets: ["latin"],
    variable: "--font-markazi",
});

export default function Navbar() {
    const { user, loading } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll effect for transparent/solid navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="w-full px-4 sm:px-6 lg:px-5">
                <div className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex-1">
                        <div className={`${markazi.className} flex items-center`}>
                            <Link href="/" className="text-3xl font-bold text-offWhite cursor-pointer">
                                SevenWorks
                            </Link>
                        </div>
                    </div>

                    {/* Right: Navigation, Auth Buttons, and Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 justify-end">
                        <div className="hidden md:flex items-center gap-8">
                            <nav className="flex items-center gap-8">
                                <Link href="/templates" className="text-offWhite hover:text-lightRed font-medium tracking-wide transition-all duration-300 ease-in-out">
                                    Templates
                                </Link>
                                <Link href="#" className="text-offWhite hover:text-lightRed font-medium tracking-wide transition-all duration-300 ease-in-out">
                                    Examples
                                </Link>
                                <Link href="#" className="text-offWhite hover:text-lightRed font-medium tracking-wide transition-all duration-300 ease-in-out">
                                    About
                                </Link>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-3">
                                {(loading || !user) ? (
                                    <>
                                        <Link 
                                            href="../register/login"
                                            className="px-4 py-2 rounded-lg text-offWhite border border-offWhite hover:bg-offWhite hover:text-navy transition-all duration-300"
                                        >
                                            Log In
                                        </Link>
                                        <Link 
                                            href="../register/signup"
                                            className="px-4 py-2 rounded-lg bg-lightRed hover:bg-darkRed text-white transition-all duration-300"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ) : (
                                    <Link 
                                        href="/dashboard" 
                                        className="group flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/10 transition-all duration-300"
                                    >
                                        <ProfilePhoto />
                                        <span className="text-offWhite group-hover:text-lightRed transition-colors duration-300">Dashboard</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden flex items-center p-2 rounded-md text-offWhite hover:bg-white/10 transition-colors" 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy shadow-lg">
                    <Link 
                        href="/templates" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-offWhite hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Templates
                    </Link>
                    <Link 
                        href="#" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-offWhite hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Examples
                    </Link>
                    <Link 
                        href="#" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-offWhite hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    
                    {/* Mobile auth buttons */}
                    {(loading || !user) ? (
                        <div className="flex flex-col space-y-2 pt-2">
                            <Link 
                                href="../register/login"
                                className="block w-full px-3 py-2 text-center rounded-md text-offWhite border border-offWhite hover:bg-offWhite hover:text-navy transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log In
                            </Link>
                            <Link 
                                href="../register/signup"
                                className="block w-full px-3 py-2 text-center rounded-md bg-lightRed hover:bg-darkRed text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <Link 
                            href="/dashboard" 
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-offWhite hover:bg-white/10 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <ProfilePhoto />
                            <span>Dashboard</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}