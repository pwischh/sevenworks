"use client";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";

const ProfilePhoto = () => {
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setPhotoURL(user.photoURL);
    }
  }, []);

  return (
    <div>
      {photoURL ? (
        <img
          src={photoURL}
          alt="Profile Photo"
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        // Placeholder (could be an icon or default image)
        <div className="w-12 h-12 rounded-full bg-gray-300" />
      )}
    </div>
  );
};

export default ProfilePhoto;