"use client";

import Image from "next/image";

export default function ProfilePhoto() {
  return (
    <div className="relative w-10 h-10">
      <Image
        src="/defaultProfile.png" 
        alt="Profile Photo"
        fill
        className="object-cover rounded-full bg-white"
      />
    </div>
  );
}