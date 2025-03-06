"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, User } from "firebase/auth";
import { app } from "../lib/firebase"; // adjust the import to your Firebase initialization file

const ProfilePage = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
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
        // Redirect to login if not authenticated
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (user) {
        if (user.displayName !== displayName) {
          await updateProfile(user, { displayName });
        }
        if (user.email !== email) {
          await updateEmail(user, email);
        }
        setMessage("Profile updated successfully.");
        router.push("/dashboard");
      }
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto py-10 px-6 bg-gray-800 rounded-lg shadow-md">
        {/* Back Arrow */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
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

        <h1 className="text-3xl font-bold mb-6 text-gray-100">Manage Your Profile</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your display name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;