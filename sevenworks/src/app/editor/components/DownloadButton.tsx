"use client";
import React from "react";
import { pdf } from '@react-pdf/renderer';
import BusinessTemplate from './business_template';

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
  const handleDownload = async () => {
    const blob = await pdf(<BusinessTemplate formData={formData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return <button onClick={handleDownload}>Download</button>;
}
