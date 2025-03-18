"use client";

import { useState, useRef, useEffect } from "react";

const IconBar = () => {

  const [sections, setSections] = useState<React.JSX.Element[]>([]);


  const addSection = () => {
    const newSection = (
      <div key={sections.length} className="pr-2 pl-2 flex items-center justify-center">
      <img src="/user.svg" alt="user" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
      </div>
    );
    setSections([...sections, newSection]);
  };

  const [overlay, setOverlay] = useState<React.JSX.Element[]>([]);
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
    <div className="flex-none w-[70] h-full p-2 rounded-lg bg-[#E6E6E6]">
      {/* vertical stack */}
      <div className="flex flex-col gap-4 h-full">
      {sections}
        <div className="p-0.5 flex items-center justify-center">
          <img src="/user.svg" alt="user" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <img src="/phone.svg" alt="phone" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <img src="/book-open.svg" alt="open book" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <img src="/briefcase.svg" alt="briefcase" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
        </div>
        <div className="p-0.5 flex items-center justify-center">
          <img src="/award.svg" alt="award" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
        </div>

        <div ref={newSectionOverlayRef} className="relative p-0.5 flex items-center justify-center">
          {overlay}
          <button className="p-0.5 aspect-square rounded-lg flex items-center justify-center bg-[#435058] hover:bg-[#BFB7B6]" onClick={() => displayCreateNewSectionOverlay()}>
            <img src="/plus-square.svg" alt="plus square" className="w-8 h-8" style={{ filter: 'invert(100%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(100%) contrast(88%)' }} />
          </button>
          {isCreateNewSectionOverlayVisible &&
          <div className="absolute top-0 left-full p-3 ml-2 w-80 gap-4 bg-[#BFB7B6] text-black rounded-lg shadow-lg">
             Create New Section
            <div className="flex w-full gap-4 items-center justify-center">
              <div className="flex items-center border bg-[#BFB7B6] border-[#999999] shadow-md rounded-lg w-5/6">
                <input type="text" className="bg-[#BFB7B6] border-[#999999] p-2 rounded-lg w-full text-white placeholder-white" placeholder="New Section"/>
                <button className="relative m-2 w-14 h-8 aspect-square rounded-lg flex items-center justify-left bg-[#BFB7B6] border border-[#888888] hover:bg-[#999999]" onClick={() => addSection()}>
                  <img src="/award.svg" alt="award" className="w-8 h-8 p-0.5" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                  <img src="/chevron-down.svg" alt="chevron-down" className="absolute right-0.5 w-3 h-3" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                </button>
              </div>
              <button className="rounded-lg size-8 flex items-center justify-center bg-[#435058] hover:bg-[#999999]" onClick={() => addSection()}>
                <img src="/check.svg" alt="check" className="w-8 h-8" style={{ filter: 'invert(100%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(100%) contrast(88%)' }} />
              </button>
            </div>
            <img src="/x.svg" alt="x" className="absolute top-2 right-2 w-4 h-4" onClick={() => displayCreateNewSectionOverlay()} style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
          </div> }
        </div>
        
        <div className="mt-auto flex items-center justify-center">
          <a href="/dashboard">
            <img src="/chevron-left.svg" alt="chevron left" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
          </a>
       </div>
     </div>
    </div>
  );
};

export default IconBar;