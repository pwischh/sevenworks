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


const markazi = Markazi_Text({
  subsets: ["latin"],
  variable: "--font-markazi",
});

async function handleSignOut(){
  try {
    await signOut(auth);
  } catch (error){
    console.error("Sign out error: ", error);
  }
};

// Sidebar Component
const Sidebar = () => {

  return (
    <aside className="w-64 h-screen bg-navy text-offWhite p-6 fixed">
      <div className="flex flex-row w-full items-center mb-2">
        <div className={markazi.className}>
          <Link href="/" className="text-3xl font-bold text-offWhite hover:underline">
            SevenWorks
          </Link>
        </div>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/dashboard" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/templates" className="hover:underline">
              Resumes
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/editor" className="hover:underline">
              Editor
            </Link>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:underline">Settings</a>
          </li>
          <li className="mb-4">
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <button onClick={handleSignOut} className="hover:underline">
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
};

interface InProgressResume {
  id: string;
  templateID: string;
  name: string;
  image: string;
}

// ResumeCard Component using Next.js <Image>
const ResumeCard = ({ resume }: { resume: InProgressResume }) => {
  const router = useRouter();
  const [resumeLoading, setResumeLoading] = useState(false);
  
  async function handleResumeClick() {
    setResumeLoading(true);
    const currentUser = auth.currentUser;
  
    if (currentUser) { 
      try {
        //Get fields from the resume being clicked
        const clickedResume = await getDoc(doc(db, "user_resumes", currentUser.uid, "resumes", resume.id));
        const clickedResumeData = clickedResume.data();

        if (!clickedResumeData){
          throw new Error("Unable to retrieve resume data");
        }

        //Get formData and templateID from the db
        const clickedResumeFormData = clickedResumeData.formData;
        const clickedResumeTemplateID = clickedResumeData.templateID;

        //Update session with correct data
        await setDoc(
          doc(db, "sessions", currentUser.uid), 
          {formData: clickedResumeFormData, resumeID: resume.id, templateID: clickedResumeTemplateID}, 
          {merge: false});
          
      } catch(error) {
        console.error("Error updating session data: ", error);
      } finally {
        setResumeLoading(false);
        router.push("/editor")
      }
    }
  }

  return(
    <div className="flex flex-col relative items-center w-full max-w-xs">
      {/* Document Thumbnail */}
      <div className="relative w-full aspect-[8.5/11] bg-white rounded-md shadow hover:shadow-lg overflow-hidden">
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
      <h3 className="text-sm font-semibold">{resume.name}</h3>
      <p className="text-xs text-gray-600">{resume.templateID}</p>
    </div>
    </div>
  );
};

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
              image: data.image,
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-screen p-8 bg-gray-100 text-navy ml-64 overflow-y-auto">
        {/* Resume Templates Section (Horizontal Scrolling) */}
        <h1 className="text-3xl font-bold mb-8">My Templates</h1>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {templateResumes.map((resume) => (
            <div key={resume.id} className="flex-none w-full max-w-xs">
              <ResumeCard resume={resume} />
            </div>
          ))}
        </div>

        {/* Editing Resumes Section */}
        <h1 className="text-3xl font-bold my-8">Editing Resumes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
