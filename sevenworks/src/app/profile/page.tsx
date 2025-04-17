"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User
} from "firebase/auth";
import { app } from "../lib/firebase"; // adjust as needed

const ProfilePage = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (!user || !user.email) throw new Error("User not authenticated.");

      // Handle password change if both fields are filled
      if (currentPassword && newPassword) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      // Update display name if changed
      if (user.displayName !== displayName) {
        await updateProfile(user, { displayName });
      }

      // Update email if changed
      if (user.email !== email) {
        await updateEmail(user, email);
      }

      setMessage("Profile updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Failed to update profile.");
      } else {
        setError("Failed to update profile.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e2f] to-[#730c1b] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-500 mb-4"
        >
          <svg
            className="h-6 w-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
  
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 border-b pb-2 text-gray-800">
          Manage Your Profile
        </h1>
  
        {/* Notifications */}
        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
        {message && <p className="mb-4 text-green-600 text-sm">{message}</p>}
  
        {/* Form */}
        <form onSubmit={handleSaveChanges} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your display name"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email address"
            />
          </div>
  
          <div>
            <label className="block mb-1 font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter current password"
            />
          </div>
  
          <div className="mb-6"> {/* 👈 Adds extra spacing before the button */}
            <label className="block mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter new password"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
          >
            Save Changes
          </button>
        </form>
  
        {/* Legal Links */}
        <p className="text-[12px] text-gray-500 text-center mt-6">
          By using this app, you agree to our{" "}
          <a href="/terms" className="text-sky-600 hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );  
};

export default ProfilePage;

