"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from "react";

const IconBar = () => {

  const [sections, setSections] = useState<React.JSX.Element[]>([]);
  const [hovering, setHovering] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (hoveredElement: string) => {
    const id = setTimeout(() => {
      setHovering(hoveredElement);
    }, 300);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setHovering("")
  };

  const addSection = () => {
    const newSection = (
      <div key={sections.length} className="pr-2 pl-2 flex items-center justify-center">
      <Image src="/user.svg" alt="user" width={32} height={32} className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
      </div>
    );
    setSections([...sections, newSection]);
  };

  const [overlay] = useState<React.JSX.Element[]>([]);
  const [isCreateNewSectionOverlayVisible, setCreateNewSectionOverlay] = useState(false);
  const [isNewSectionIconOverlayVisible, setNewSectionIconOverlay] = useState(false);
  const newSectionOverlayRef = useRef<HTMLDivElement>(null);

  const displayCreateNewSectionOverlay = () => {
    setCreateNewSectionOverlay((prev) => !prev);
  };

  const displayNewSectionIconOverlay = () => {
    setNewSectionIconOverlay((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (newSectionOverlayRef.current && !newSectionOverlayRef.current.contains(event.target as Node)) {
        setCreateNewSectionOverlay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-none w-[60] h-full p-2 rounded-lg bg-white shadow-lg border border-gray-300 z-10">
      {/* vertical stack */}
      <div className="flex flex-col gap-3 h-full">
      {sections}
        <div className="relative p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60"
          onMouseEnter={() => {handleMouseEnter("personal")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <Link href="/editor?tab=personal#personal-section">
            <Image
              src="/user.svg"
              alt="user"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "personal" ? "opacity-100" : "opacity-0"}`}
            >
              Personal Information
          </span>
        </div>
        <div className="relative p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60"
          onMouseEnter={() => {handleMouseEnter("contact")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <Link href="/editor?tab=contact">
            <Image
              src="/phone.svg"
              alt="phone"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "contact" ? "opacity-100" : "opacity-0"}`}
            >
              Contact Information
          </span>
        </div>
        <div className="relative p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60"
          onMouseEnter={() => {handleMouseEnter("education")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <Link href="/editor?tab=education">
            <Image
              src="/book-open.svg"
              alt="open book"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "education" ? "opacity-100" : "opacity-0"}`}
            >
              Education
          </span>
        </div>
        <div className="relative p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60"
          onMouseEnter={() => {handleMouseEnter("experience")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <Link href="/editor?tab=experience">
            <Image
              src="/briefcase.svg"
              alt="briefcase"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "experience" ? "opacity-100" : "opacity-0"}`}
            >
              Experience
          </span>
        </div>
        <div className="relative p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60"
          onMouseEnter={() => {handleMouseEnter("skills")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <Link href="/editor?tab=additional">
            <Image
              src="/award.svg"
              alt="award"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "skills" ? "opacity-100" : "opacity-0"}`}
            >
              Skills & Awards
          </span>
        </div>
        <div ref={newSectionOverlayRef} className="relative p-0.5 flex items-center justify-center"
          onMouseEnter={() => {handleMouseEnter("addSection")}}
          onMouseLeave={() => {handleMouseLeave()}}>
          <span 
            className={`pointer-events-none cursor-default absolute left-10 ml-2 px-1 rounded-sm bg-[#435058]/70 
                      border border-gray-600 text-offWhite text-[10px] w-fit text-nowrap transition duration-300
                      ${hovering === "addSection" ? "opacity-100" : "opacity-0"}`}
            >
              Add Section
          </span>
         {overlay}
         <button className="p-0.5 aspect-square flex items-center justify-center bg-black rounded-lg hover:bg-gray-700" onClick={() => displayCreateNewSectionOverlay()}>
           <Image src="/plus-square.svg" alt="plus square" width={32} height={32} className="w-8 h-8" style={{filter: "invert(100%)"}}/>
           </button>
          {isCreateNewSectionOverlayVisible &&
          <div className="absolute top-0 left-full p-3 ml-2 w-80 gap-4 bg-[#BFB7B6] text-black rounded-lg shadow-lg z-10">
             Create New Section
            <div className="flex w-full gap-4 items-center justify-center">
              <div className="flex items-center border bg-[#BFB7B6] border-[#999999] shadow-md rounded-lg w-5/6">
                <input type="text" className="bg-[#BFB7B6] border-[#999999] p-2 rounded-lg w-full text-white placeholder-white" placeholder="New Section"/>
                <button className="relative m-2 w-14 h-8 aspect-square rounded-lg flex items-center justify-left bg-[#BFB7B6] border border-[#888888] hover:bg-[#999999]" onClick={() => displayNewSectionIconOverlay()}>
                  <Image src="/award.svg" alt="award" width={32} height={32} className="w-8 h-8 p-0.5" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                  <Image src="/chevron-down.svg" alt="chevron-down" width={32} height={32} className="absolute right-0.5 w-3 h-3" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                </button>
              </div>
              <button className="rounded-lg size-8 flex items-center justify-center bg-[#435058] hover:bg-[#999999]" onClick={() => addSection()}>
                <Image src="/check.svg" alt="check" width={32} height={32} className="w-8 h-8" style={{ filter: 'invert(100%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(100%) contrast(88%)' }} />
              </button>
            </div>
            <Image src="/x.svg" alt="x" width={32} height={32} className="absolute top-2 right-2 w-4 h-4" onClick={() => displayCreateNewSectionOverlay()} style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
            {isNewSectionIconOverlayVisible &&
            <div>
              <div className="absolute top-0 left-full p-3 ml-2 w-80 gap-4 bg-[#BFB7B6] text-black rounded-lg shadow-lg z-10">
                Select Icon
                <div className="flex w-full gap-4 items-center justify-center">
                  <Image src="/user.svg" alt="user" width={32} height={32} className="w-8 h-8" />
                  <Image src="/phone.svg" alt="phone" width={32} height={32} className="w-8 h-8" />
                  <Image src="/book-open.svg" alt="open book" width={32} height={32} className="w-8 h-8" />
                  <Image src="/briefcase.svg" alt="briefcase" width={32} height={32} className="w-8 h-8" />
                  <Image src="/award.svg" alt="award" width={32} height={32} className="w-8 h-8" />
                </div>
              </div>
            </div>
            }
          </div>
          }
        </div>
        
        <div className="mt-auto p-0.5 flex items-center justify-center">
          <Link href="/dashboard">
            <Image
              src="/chevron-left.svg"
              alt="chevron left"
              width={32} height={32}
              className="w-8 h-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IconBar;