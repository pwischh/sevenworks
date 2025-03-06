"use client";

import Navbar from "./navbar";


export default function Editor() {
    return (
      <div className="bg-white min-h-screen p-3">
        <Navbar />
        <div className="p-2" />
        <hr className="border-t border-black w-full p-10" />
        <h1 className="text-black">Editor</h1>
      </div>
    );
  }