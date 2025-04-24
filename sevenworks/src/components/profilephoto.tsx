"use client";

import Image from "next/image";
import { useAuth } from "../app/context/authContext";

export default function ProfilePhoto() {
  const { user } = useAuth();

  // gets first letter of email (fallback: "U" for user)
  const initial = (user?.displayName) ?  user?.displayName?.charAt(0).toUpperCase() || "U" : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center text-sm font-bold text-white">
      {user?.photoURL ? (
        <Image
          src={user.photoURL}
          alt="Profile Photo"
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-lightRed flex items-center justify-center rounded-full">
          {initial}
        </div>
      )}
    </div>
  );
}
