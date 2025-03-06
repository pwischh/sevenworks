"use client";

import Image from "next/image";

export default function ProfilePhoto() {
  return (
    <div className="relative w-24 h-24">
      <Image
        src="/sample-business-resume.png" // Update the path as needed
        alt="Profile Photo"
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
}