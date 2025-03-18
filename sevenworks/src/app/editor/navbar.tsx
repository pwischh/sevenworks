"use client";
import { Markazi_Text } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const markazi = Markazi_Text({
    subsets: ["latin"],
    variable: "--font-markazi",
});

export default function Navbar() {
    const [fontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setFontDropdownOpen(false);
                setFontSizeDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navRef]);

    return (
        <div className="bg-white">
            <div className="pt-18 pb-18 pl-90 pr-90">
                <nav ref={navRef} className="text-black flex flex-row gap-10 pt-2 pb-2 pl-4 pr-4 w-fit text-nowrap font-semibold mx-auto bg-[#E6E6E6] rounded-[1.25vw]">
                    <span className="flex items-center gap-2">
                        <span className={`${markazi.className} text-3xl`}>SevenWorks</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/zoom-out.svg" alt="zoom out" width={24} height={24} />
                        <span>Zoom</span>
                        <Image src="/zoom-in.svg" alt="zoom in" width={24} height={24} />
                    </span>
                    <span className="self-center h-6 border-r border-black"></span>
                    <span className="relative flex items-center gap-2 cursor-pointer" onClick={() => {
                        setFontDropdownOpen(!fontDropdownOpen);
                        setFontSizeDropdownOpen(false);
                    }}>
                        <span>Font</span>
                        <Image src="/chevron-down.svg" alt="chevron down" width={24} height={24} />
                        {fontDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-[Arial]">Arial</li>
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-[Calibri]">Calibri</li>
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-[TimesNewRoman]">Times New Roman</li>
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-[CourierNew]">Courier New</li>
                                </ul>
                            </div>
                        )}
                    </span>
                    <span className="relative flex items-center gap-2 cursor-pointer" onClick={() => {
                        setFontSizeDropdownOpen(!fontSizeDropdownOpen);
                        setFontDropdownOpen(false);
                    }}>
                        <span>Font Size</span>
                        <Image src="/chevron-down.svg" alt="chevron down" width={24} height={24} />
                        {fontSizeDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Small</li>
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Medium</li>
                                    <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Large</li>
                                </ul>
                            </div>
                        )}
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/list.svg" alt="list" width={24} height={24} />
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/link.svg" alt="link" width={24} height={24} />
                    </span>
                    <span className="self-center h-6 border-r border-black"></span>
                    <span className="flex items-center gap-2">
                        <Image src="/save.svg" alt="save" width={24} height={24} />
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/refresh-cw.svg" alt="refresh" width={24} height={24} />
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/download.svg" alt="download" width={24} height={24} />
                    </span>
                    <span className="flex items-center gap-2">
                        <Image src="/settings.svg" alt="settings" width={24} height={24} />
                    </span>
                    <span className="flex items-center gap-2 text-red-500">
                        <Image src="/log-out.svg" alt="logout" width={24} height={24} />
                    </span>
                </nav>
            </div>
        </div>
    );
}
