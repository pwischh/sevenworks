"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Markazi_Text } from "next/font/google";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { signOut } from "firebase/auth";

const markazi = Markazi_Text({
  subsets: ["latin"],
  variable: "--font-markazi",
});

async function handleSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error: ", error);
  }
}

// Sidebar Component
const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-navy text-offWhite p-6 fixed shadow-lg">
      <div className="flex flex-row w-full items-center mb-2">
        <div className={markazi.className}>
          <Link href="/" className="text-3xl font-bold text-offWhite hover:underline">
            SevenWorks
          </Link>
        </div>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8h5a2 2 0 012 2v7a2 2 0 01-2 2h-5m-4 0H6a2 2 0 01-2-2v-7a2 2 0 012-2h5" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/templates" className="flex items-center space-x-2 hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
              <span>Resumes</span>
            </Link>
          </li>
          <li>
            <Link href="/editor" className="flex items-center space-x-2 hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-1 0v14m-7-7h14" />
              </svg>
              <span>Editor</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center space-x-2 hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a1.5 1.5 0 00-1.5 1.5V5.25h7.5V4.5a1.5 1.5 0 00-1.5-1.5h-4.5zM6 8.25h12v12H6v-12z" />
              </svg>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center space-x-2 hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.338 0 4.503.634 6.379 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="flex items-center space-x-2 hover:text-red-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

interface Resume {
  id: string;
  title: string;
  description: string;
  image?: string;
}

// ResumeCard Component using Next.js <Image>
const ResumeCard = ({ resume }: { resume: Resume }) => (
  <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    {/* Document Thumbnail */}
    <div className="relative w-full aspect-[8.5/11] bg-gray-50">
      {resume.image ? (
        <Image
          src={resume.image}
          alt={resume.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-light">
          [A]
        </div>
      )}
    </div>

    {/* Title & Description */}
    <div className="p-4">
      <h3 className="text-sm font-semibold truncate">{resume.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{resume.description}</p>
    </div>
  </div>
);

// Create New Button Component
const CreateNewButton = ({ type }: { type: string }) => (
  <Link href={`/editor/new?type=${type}`}>
    <div className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-300 h-full min-h-[260px] hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200">
      <div className="text-5xl font-light text-gray-400">+</div>
      <span className="mt-2 text-sm font-medium text-gray-600">Create New {type}</span>
    </div>
  </Link>
);

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Two separate state variables for each section
  const [templateResumes, setTemplateResumes] = useState<Resume[]>([]);
  const [editingResumes, setEditingResumes] = useState<Resume[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/register/login");
    }
  }, [user, loading, router]);

  // Fetch resumes for "Resume Templates" from Firestore collection "resume_templates"
  useEffect(() => {
    const fetchTemplateResumes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "resume_templates"));
        const templatesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            description: data.category,
            image: "/sample-business-resume.png",
          };
        });
        setTemplateResumes(templatesData);
      } catch (error) {
        console.error("Error fetching resume templates:", error);
      }
    };

    fetchTemplateResumes();
  }, []);

  // Fetch resumes for "Editing Resumes" from Firestore collection "editing_resumes"
  useEffect(() => {
    const fetchEditingResumes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "editing_resumes"));
        const editingData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            description: data.category,
            image: "/sample-business-resume.png",
          };
        });
        setEditingResumes(editingData);
      } catch (error) {
        console.error("Error fetching editing resumes:", error);
      }
    };

    fetchEditingResumes();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-medium mt-4 text-gray-700">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.displayName || "User"}</h1>
          <p className="text-gray-500 mt-2">Manage and create your professional resumes</p>
        </header>

        {/* Resume Templates Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Resume Templates</h2>
            <Link href="/templates" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
            {templateResumes.slice(0, 3).map((resume) => (
              <div key={resume.id}>
                <ResumeCard resume={resume} />
              </div>
            ))}
            <CreateNewButton type="Template" />
          </div>
        </section>

        {/* Editing Resumes Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Resumes</h2>
            <Link href="/editor" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CreateNewButton type="Resume" />
            {editingResumes.map((resume) => (
              <div key={resume.id}>
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;