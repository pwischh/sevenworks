"use client";
import { Markazi_Text } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import Link from "next/link";
import { useFormContext } from "./formcontext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useResume } from "../resumeContext";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const NewPDFDownloadLink = dynamic(() => Promise.resolve(PDFDownloadLink), { ssr: false });

const markazi = Markazi_Text({
    subsets: ["latin"],
    variable: "--font-markazi",
});

async function handleSignOut(){
    try {
      await signOut(auth);
    } catch (error){
      console.error("Sign out error: ", error);
    }
  };

export default function Navbar() {
    const [fontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const [showAutosave, setShowAutosave] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const { formData, setFormData } = useFormContext();
    const [hovering, setHovering] = useState("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const template = useResume();
    const [templateID, setTemplateID] = useState<string | null>(null);
    const [templateIdLoading, setTemplateIdLoading] = useState(true);

    const handleMouseEnter = (hoveredElement: string) => {
        const id = setTimeout(() => {
          setHovering(hoveredElement);
        }, 500);
        setTimeoutId(id);
      };

      const handleMouseLeave = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }
        setHovering("")
      };

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user){
                try {
                    const sessionData = (await getDoc(doc(db, "sessions", user.uid))).data();

                    if (!sessionData){
                        throw new Error("Error retrieving session data");
                    }

                    const sessionTemplateID = sessionData.templateID;
                    setTemplateID(sessionTemplateID);
                } catch(error) {
                    console.error("Error fetching templateID:", error);
                }
            }
            setTemplateIdLoading(false);
        });

        return () => unsubscribe();
      }, []);

    function handleFontClick(value: string) {
        setFormData("font", value);
    }

    return (
        <div className="bg-white">
            <div className="pt-18 pb-18 pl-90 pr-90">
                <nav ref={navRef} className="text-black flex flex-row justify-start items-center gap-6 pt-2 pb-2 px-6 w-fill text-nowrap font-semibold mx-auto bg-[#E6E6E6] rounded-lg">
                    <span className="flex items-center gap-2 transition-opacity duration-200">
                        <Link href="/" className={`${markazi.className} text-3xl`}>SevenWorks</Link>
                    </span>
                    <span className="h-7 w-px bg-black rounded"></span>
                    <span className="flex items-center gap-2 transition-opacity duration-200">
                        <Image src="/zoom-out.svg" alt="zoom out" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span className="text-black !text-black">Zoom</span>
                        <Image src="/zoom-in.svg" alt="zoom in" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                    </span>
                    <span className="relative flex items-center gap-2 cursor-pointer transition-opacity duration-200" onClick={() => {
                        setFontDropdownOpen(!fontDropdownOpen);
                        setFontSizeDropdownOpen(false);
                    }}>
                        <div className="flex hover:opacity-65"> 
                            <span>Font</span>
                            <Image src="/chevron-down.svg" alt="chevron down" width={24} height={24}/>
                        </div>
                        {fontDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-[Arial]" onClick={() => handleFontClick("Arial")}>Arial</li>
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-[Calibri]" onClick={() => handleFontClick("Calibri")}>Calibri</li>
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-[TimesNewRoman]" onClick={() => handleFontClick("Times-Roman")}>Times New Roman</li>
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-[CourierNew]" onClick={() => handleFontClick("Courier")}>Courier New</li>
                                </ul>
                            </div>
                        )}
                    </span>
                    <span className="relative flex items-center gap-2 cursor-pointer" onClick={() => {
                        setFontSizeDropdownOpen(!fontSizeDropdownOpen);
                        setFontDropdownOpen(false);
                    }}>
                        <div className="flex hover:opacity-65"> 
                            <span>Font Size</span>
                            <Image src="/chevron-down.svg" alt="chevron down" width={24} height={24}/>
                        </div>
                        {fontSizeDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Small</li>
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Medium</li>
                                    <li className="px-4 py-1 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">Large</li>
                                </ul>
                            </div>
                        )}
                    </span>
                    <span className="h-7 w-px bg-black rounded"></span>
                    <span 
                        className="relative flex items-center gap-2 hover:opacity-65 transition-opacity duration-200"
                        onMouseEnter={() => {handleMouseEnter("list")}}
                        onMouseLeave={() => {handleMouseLeave()}}>
                        <Image src="/list.svg" alt="list" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span 
                            className={`pointer-events-none cursor-default absolute top-7 left-[-22] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "list" ? "opacity-100" : "opacity-0"}`}
                        >
                            Bulleted List
                        </span> 
                    </span>
                    <span 
                        className="relative flex items-center gap-2 hover:opacity-65 transition-opacity duration-200"
                        onMouseEnter={() => {handleMouseEnter("link")}}
                        onMouseLeave={() => {handleMouseLeave()}}>
                        <Image src="/link.svg" alt="link" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span 
                            className={`pointer-events-none cursor-default absolute top-7 left-[-22] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "link" ? "opacity-100" : "opacity-0"}`}
                        >
                            Embed Link
                        </span> 
                    </span>
                    <div className={`relative flex items-center gap-2 ${showAutosave ? "" : "hover:opacity-65"} transition duration-200`} 
                        onClick={() => {setShowAutosave(!showAutosave);}}
                        onMouseEnter={() => {handleMouseEnter("autosave")}}
                        onMouseLeave={() => {handleMouseLeave()}}>
                        <span className="flex items-center gap-2">
                            <Image src={showAutosave ? "/saveColored.svg" : "/save.svg"} alt="save" width={24} height={24} className="hover:scale-110 transition duration-200"/>
                        </span>
                        <span 
                            className={`pointer-events-none cursor-default absolute top-[25] left-[-30] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "autosave" ? "opacity-100" : "opacity-0"}`}
                        >
                            Toggle Autosave
                        </span> 
                    </div>
                    <span 
                        className="flex relative items-center gap-2 hover:opacity-65 transition-opacity duration-200"
                        onMouseEnter={() => {handleMouseEnter("swap")}}
                        onMouseLeave={() => {handleMouseLeave()}}>
                        <Image src="/refresh-cw.svg" alt="refresh" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span 
                            className={`pointer-events-none cursor-default absolute top-7 left-[-30] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "swap" ? "opacity-100" : "opacity-0"}`}
                        >
                            Swap Template
                        </span> 
                    </span>
                    {(templateIdLoading) ? (
                        <span className="text-red-500 text-[20px]">!</span>
                    ) : (
                        <NewPDFDownloadLink
                            document={template(templateID, formData)}
                            fileName="exported_form.pdf"
                            className="relative flex items-center gap-2 hover:opacity-65 transition-opacity duration-200"
                            onMouseEnter={() => {handleMouseEnter("download")}}
                            onMouseLeave={() => {handleMouseLeave()}}
                        >
                            <Image src="/download.svg" alt="download" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                            <span 
                                className={`pointer-events-none cursor-default absolute top-7 left-[-18] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                        border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                        ${hovering === "download" ? "opacity-100" : "opacity-0"}`}
                            >
                                Download
                            </span> 
                        </NewPDFDownloadLink>
                    )}
                    <span 
                        className="relative flex items-center gap-2 hover:opacity-65 transition-opacity duration-200"
                        onMouseEnter={() => {handleMouseEnter("settings")}}
                        onMouseLeave={() => {handleMouseLeave()}}
                    >
                        <Image src="/settings.svg" alt="settings" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span 
                            className={`pointer-events-none cursor-default absolute top-7 left-[-13] mt-2.5 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "settings" ? "opacity-100" : "opacity-0"}`}
                        >
                            Settings
                        </span> 
                    </span>
                    <button 
                        onClick={handleSignOut} 
                        className="relative hover:underline hover:opacity-65 transition-opacity duration-200"
                        onMouseEnter={() => {handleMouseEnter("signOut")}}
                        onMouseLeave={() => {handleMouseLeave()}}
                    >
                        <Image src="/log-out.svg" alt="logout" width={24} height={24} className="hover:scale-110 transition-transform duration-200" />
                        <span 
                            className={`pointer-events-none cursor-default absolute right-[-11] mt-2 px-1 rounded-md bg-[#435058]/70 
                                    border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                                    ${hovering === "signOut" ? "opacity-100" : "opacity-0"}`}
                        >
                            Sign Out
                        </span> 
                    </button>
                </nav>
            </div>
        </div>
    );
}
