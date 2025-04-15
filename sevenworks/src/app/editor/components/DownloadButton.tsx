"use client";
import React from "react";
import { pdf } from '@react-pdf/renderer';
import BusinessTemplate from './business_template';

export default function DownloadButton({ formData }: { formData: any }) {
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
