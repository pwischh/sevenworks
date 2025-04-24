"use client";
import React from "react";
import { pdf } from '@react-pdf/renderer';
import { useResume } from "@/app/resumeContext";
import { db, auth } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useFormContext } from "../formcontext"; // Import useFormContext

// Define interfaces matching the expected TemplateFormData
interface EducationEntry {
  degree: string;
  institution: string;
  years: string; // Changed from 'year' to 'years' to match the expected type
}

interface ExperienceEntry {
  title: string;
  company: string;
  years: string;
}

interface LeadershipEntry {
  title: string;
  description: string;
}

// Define a proper interface for form data
interface FormData {
  font?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  education?: EducationEntry[]; // Changed to use the properly defined EducationEntry
  experience?: ExperienceEntry[];
  leadership?: LeadershipEntry[];
  honorsList?: { honor: string }[];
  skillsInterests?: string;
  [key: string]: unknown; // Using unknown instead of any for better type safety
}

export default function DownloadButton() {
  const template = useResume();
  const { formData } = useFormContext(); // Get formData directly from context

  const handleDownload = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      // Fetch session data to get templateID and resumeID
      const sessionRef = doc(db, "sessions", user.uid);
      const userSessionData = (await getDoc(sessionRef)).data();
      
      if (!userSessionData) {
        console.error("No session data found for user.");
        // Optionally, inform the user
        return;
      }

      const templateID = userSessionData.templateID;
      const resumeID = userSessionData.resumeID;

      if (!resumeID) {
        console.error("No resumeID found in session data.");
        // Optionally, inform the user
        return;
      }

      // Fetch resume data to get the name
      const resumeRef = doc(db, "user_resumes", user.uid, "resumes", resumeID);
      const userResumeData = (await getDoc(resumeRef)).data();

      if(!userResumeData) {
        console.error("No resume data found for resumeID:", resumeID);
        // Optionally, inform the user
        return;
      }

      const resumeName = userResumeData.name || 'resume'; // Default name if missing

      // Use the formData directly from the context for PDF generation
      const blob = await pdf(template(templateID, formData)).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resumeName + ".pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading resume: ", error);
      // Optionally, inform the user about the error
    }
  };
  // The button might need styling if it was relying on props before
  return <button onClick={handleDownload} className="hover:scale-110 transition-transform duration-200">Download</button>;
}
