"use client";
import React from "react";
import { pdf } from '@react-pdf/renderer';
import BusinessTemplate from './business_template';

// Define a proper interface for form data
interface FormData {
  // Add specific fields based on what your form contains
  name?: string;
  email?: string;
  phone?: string;
  experience?: Array<{title: string; company: string; description: string}>;
  education?: Array<{degree: string; institution: string; year: string}>;
  skills?: string[];
  [key: string]: unknown; // Replace 'any' with 'unknown' for better type safety
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
