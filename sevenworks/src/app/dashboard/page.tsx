"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Markazi_Text } from "next/font/google";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { 
  LuFiles, 
  LuBriefcaseBusiness,
  LuAtom,
  LuHospital,
  LuGavel,
  LuPaintbrush,
  LuEarth,
  LuLandmark 
} from "react-icons/lu";

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
          <Link href="/" className="text-3xl font-bold text-offWhite cursor-pointer">
            SevenWorks
          </Link>
        </div>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link href="/templates" className="flex items-center space-x-2 hover:text-lightRed transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
              <span>Templates</span>
            </Link>
          </li>
          <li>
            <Link href="/editor" className="flex items-center space-x-2 hover:text-lightRed transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-1 0v14m-7-7h14" />
              </svg>
              <span>Editor</span>
            </Link>
          </li>
          {/* <li>
            <Link href="/settings" className="flex items-center space-x-2 hover:text-lightRed transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a1.5 1.5 0 00-1.5 1.5V5.25h7.5V4.5a1.5 1.5 0 00-1.5-1.5h-4.5zM6 8.25h12v12H6v-12z" />
              </svg>
              <span>Settings</span>
            </Link>
          </li> */}
          <li>
            <Link href="/profile" className="flex items-center space-x-2 hover:text-lightRed transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.338 0 4.503.634 6.379 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="flex items-center space-x-2 hover:text-lightRed transition-colors">
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

interface InProgressResume {
  id: string;
  templateID: string;
  name: string;
  image: string;
  category?: string;
}

// Function to determine which icon to display based on template category
const getCategoryIcon = (templateID: string, category?: string) => {
  // If we have a category, use it directly
  if (category) {
    switch(category){
      case "Business": return <LuBriefcaseBusiness className="w-[24px] h-[24px]"/>;
      case "STEM": return <LuAtom className="w-[24px] h-[24px]"/>;
      case "Health & Human Services": return <LuHospital className="w-[24px] h-[24px]"/>;
      case "Law": return <LuGavel className="w-[24px] h-[24px]"/>;
      case "Creative": return <LuPaintbrush className="w-[24px] h-[24px]"/>;
      case "Environmental & Sustainability": return <LuEarth className="w-[24px] h-[24px]"/>;
      case "Policy, Government & International Affairs": return <LuLandmark className="w-[24px] h-[24px]"/>;
      default: return <LuFiles className="w-[24px] h-[24px]"/>;
    }
  }
  
  // If no category, try to infer from templateID
  if (templateID.includes("business")) return <LuBriefcaseBusiness className="w-[24px] h-[24px]"/>;
  if (templateID.includes("data") || templateID.includes("tech") || templateID.includes("analytics")) 
    return <LuAtom className="w-[24px] h-[24px]"/>;
  if (templateID.includes("health") || templateID.includes("medical")) 
    return <LuHospital className="w-[24px] h-[24px]"/>;
  if (templateID.includes("law") || templateID.includes("legal")) 
    return <LuGavel className="w-[24px] h-[24px]"/>;
  if (templateID.includes("creative") || templateID.includes("art")) 
    return <LuPaintbrush className="w-[24px] h-[24px]"/>;
  if (templateID.includes("environmental") || templateID.includes("sustainability")) 
    return <LuEarth className="w-[24px] h-[24px]"/>;
  if (templateID.includes("policy") || templateID.includes("government")) 
    return <LuLandmark className="w-[24px] h-[24px]"/>;
  
  // Default icon
  return <LuFiles className="w-[24px] h-[24px]"/>;
}

// ResumeCard Component using Next.js <Image>
const ResumeCard = ({ resume }: { resume: InProgressResume }) => {
  const router = useRouter();
  
  async function handleResumeClick() {
    const currentUser = auth.currentUser;
  
    if (currentUser) { 
      try {
        //Get fields from the resume being clicked
        const clickedResumeRef = doc(db, "user_resumes", currentUser.uid, "resumes", resume.id);
        const clickedResumeSnap = await getDoc(clickedResumeRef);

        if (!clickedResumeSnap.exists()){
          throw new Error("Unable to retrieve resume data");
        }
        const clickedResumeData = clickedResumeSnap.data();

        //Get formData and templateID from the db
        const clickedResumeFormData = clickedResumeData.formData || {}; // Default to empty object if undefined
        const clickedResumeTemplateID = clickedResumeData.templateID;

        // Store resumeID in localStorage to persist through refreshes
        localStorage.setItem('currentResumeID', resume.id);

        //Update session with correct data
        await setDoc(
          doc(db, "sessions", currentUser.uid), 
          {
            formData: clickedResumeFormData, 
            resumeID: resume.id, 
            templateID: clickedResumeTemplateID
          }, 
          {merge: false}); // Overwrite existing session data
          
        // Redirect to editor only after successful update
        router.push("/editor");

      } catch(error) {
        console.error("Error handling resume click:", error);
        // Optionally: Show an error message to the user
      } 
      // Removed finally block to prevent navigation on error
    } else {
        console.error("User not authenticated.");
        // Optionally: Redirect to login or show a message
    }
  }

  return(
    <div className="flex flex-col relative items-center w-full max-w-xs">
      {/* Document Thumbnail */}
      <div className="relative w-full aspect-[8.5/11] bg-white rounded-md shadow hover:shadow-lg overflow-hidden">
        {/* Category Icon */}
        <div className="absolute top-2 right-2 z-10 bg-navy/80 p-1.5 rounded-full text-offWhite">
          {getCategoryIcon(resume.templateID, resume.category)}
        </div>
        <Image
          src={resume.image}
          alt={resume.templateID}
          fill
          className="object-cover"
        />
        <div 
          className="flex flex-col justify-center items-center absolute top-0 rounded-md w-full h-full bg-black/40 
              font-medium text-offWhite text-[18px] transition duration-150 opacity-0 hover:opacity-100"
        >
          <button className="px-3 py-0.5 bg-transparent border-2 border border-offWhite rounded-lg hover:border-lightRed hover:bg-lightRed" 
            onClick={handleResumeClick}>
              Edit
          </button>
        </div> 
      </div>

      {/* Title & Description */}
      <div className="mt-2 text-center">
        <h3 className="text-sm text-gray-800 font-semibold">{resume.name}</h3>
        <p className="text-xs text-gray-600">{resume.templateID}</p>
      </div>
    </div>
  );
};

// Create New Button Component
const CreateNewButton = ({ type }: { type: string }) => (
  <Link href={`/templates`}>
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
  const [templateResumes, setTemplateResumes] = useState<InProgressResume[]>([]);

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
        if (!loading) {
          if (!user) throw new Error("User not authenticated");

          const resumesCollectionRef = collection(db, "user_resumes", user.uid, "resumes");
          const querySnapshot = await getDocs(resumesCollectionRef);

          const templatesData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              templateID: data.templateID,
              name: data.name,
              image: data.image || "/sample-business-resume.png",
              category: data.category,
            };
          });
          setTemplateResumes(templatesData);
        }
      } catch (error) {
        console.error("Error fetching resume templates:", error);
      }
    };

    fetchTemplateResumes();
  }, [user, loading]);

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
        {/*<section className="mb-12">
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
        </section>*/}

        {/* Editing Resumes Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Resumes</h2>
            <Link href="/editor" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CreateNewButton type="Resume" />
            {templateResumes.map((resume) => (
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