"use client";

import Navbar from "./navbar";

export default function Editor() {
  return (
      <div className="bg-white h-screen p-3 flex flex-col">
          <Navbar />
          <div className="flex-1 flex w-full pt-5 gap-4">
              <div className="flex-none w-[70] h-full p-2 rounded-lg bg-[#E6E6E6]">
                  {/* vertical stack */}
                  <div className="flex flex-col gap-4 h-full">
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
                        <div className="p-0.5 flex items-center justify-center">
                            <img src="/plus-square.svg" alt="plus square" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                        </div>
                        <div className="mt-auto p-0.5 flex items-center justify-center">
                            <img src="/chevron-left.svg" alt="chevron left" className="w-8 h-8" style={{ filter: 'invert(29%) sepia(14%) saturate(1580%) hue-rotate(175deg) brightness(92%) contrast(88%)' }} />
                        </div>
                  </div>
              </div>
              <div className="flex-[1.5] border border-black p-2 rounded-lg">
                  <h1 className="text-black text-center">Personal Information</h1>
              </div>
              <div className="flex-[2] border border-black p-10 rounded-lg" >
                      <div className="flex items-center justify-center border self-center border-black p-20 h-full w-full flex-row gap-4 rounded-lg">
                          <h1 className="text-black">Editor Window</h1>
                      </div>
              </div>
              <div className="flex-[2] border border-black p-2 rounded-lg">
                  <h1 className="text-black">Right</h1>
              </div>
          </div>
      </div>
  );
}