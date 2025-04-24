"use client";
import React from "react";
import { pdf } from '@react-pdf/renderer';
import { useResume } from "@/app/resumeContext";
import { db, auth } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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

export default function DownloadButton({ formData }: { formData: FormData }) {
  const template = useResume();

  const handleDownload = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      const sessionRef = doc(db, "sessions", user.uid);
      const userSessionData = (await getDoc(sessionRef)).data();
      
      if (!userSessionData) return;

      const templateID = userSessionData.templateID;
      const resumeID = userSessionData.resumeID;

      const resumeRef = doc(db, "user_resumes", user.uid, "resumes", resumeID);
      const userResumeData = (await getDoc(resumeRef)).data();

      if(!userResumeData) return;

      const resumeName = userResumeData.name;

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
    }
  };
  return <button onClick={handleDownload}>Download</button>;
}
