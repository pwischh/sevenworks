"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from "react";

const IconBar = () => {
  const [sections, setSections] = useState<React.JSX.Element[]>([]);

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
      {/* Main icon buttons */}
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=personal#personal-section">
          <Image src="/user.svg" alt="user" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Personal</span>
        </Link>
      </div>
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=education">
          <Image src="/book-open.svg" alt="open book" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Education</span>
        </Link>
      </div>
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=experience">
          <Image src="/briefcase.svg" alt="briefcase" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Experience</span>
        </Link>
      </div>
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=leadership">
          <Image src="/leadership.svg" alt="award" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Leadership & Community Development</span>
        </Link>
      </div>
      {/* Extra icons */}
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=honors">
          <Image src="/honors.svg" alt="settings" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Honors</span>
        </Link>
      </div>
      <div className="p-1 aspect-square rounded-lg flex items-center justify-center hover:bg-[#BFB7B6]/60 group relative">
        <Link href="/editor?tab=additional">
          <Image src="/additional.svg" alt="help" width={32} height={32} className="w-8 h-8" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Additional Skills and Interests</span>
        </Link>
      </div>
      
      {/* Add Section Button and Overlay - COMMENTED OUT */}
      {/* 
         <button className="p-0.5 aspect-square flex items-center justify-center bg-black rounded-lg hover:bg-gray-700 relative" onClick={() => displayCreateNewSectionOverlay()}>
           <Image src="/plus-square.svg" alt="plus square" width={32} height={32} className="w-8 h-8" style={{filter: "invert(100%)"}}/>
           <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Add Section</span>
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
        </div> */}
        
        <div className="mt-auto p-0.5 flex items-center justify-center group">
          <Link href="/dashboard">
            <Image
              src="/chevron-left.svg"
              alt="chevron left"
              width={32} height={32}
              className="w-8 h-8"
            />
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IconBar;