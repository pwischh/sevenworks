"use client";
import React, { useEffect, useState } from "react";
import { pdf } from '@react-pdf/renderer';
import dynamic from "next/dynamic";
import BusinessTemplate from "./business-template";
import { useFormContext } from "./formcontext";

// Dynamically import PDFViewer with SSR disabled
const PDFViewerWithNoSSR = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
);

const EditorWindow = () => {
    const { formData } = useFormContext();
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0); // Add a key for forced re-rendering

    // Generate a stringified version of formData for comparison
    const formDataString = JSON.stringify(formData);

    useEffect(() => {
        const generatePDF = async () => {
            try {
                setLoading(true);
                
                // Create a new PDF blob
                const blob = await pdf(<BusinessTemplate formData={formData} />).toBlob();
                
                // Clean up old URL if it exists
                if (url) URL.revokeObjectURL(url);
                
                // Create and set new URL
                const newUrl = URL.createObjectURL(blob);
                setUrl(newUrl);
                
                // Force re-render by updating the key
                setKey(prevKey => prevKey + 1);
                
                setLoading(false);
            } catch (error) {
                console.error("Error generating PDF:", error);
                setLoading(false);
            }
        };

        generatePDF();

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [formDataString]); // Use stringified formData instead

    // Option 1: Using iframe with blob URL
    if (loading) {
        return (
            <div className="flex-[2] p-4 rounded-lg bg-[#E6E6E6] flex items-center justify-center">
                Loading PDF...
            </div>
        );
    }

    // For client-side rendering, use PDFViewer for direct rendering (Option 2)
    // This approach might work better as it skips the blob URL step
    return (
        <div className="flex-[2] p-4 rounded-lg bg-[#E6E6E6]" style={{ height: "100%" }}>
            {typeof window !== 'undefined' ? (
                <PDFViewerWithNoSSR style={{ width: "100%", height: "100%", border: "none" }}>
                    <BusinessTemplate formData={formData} key={key} />
                </PDFViewerWithNoSSR>
            ) : (
                <div>Loading PDF viewer...</div>
            )}
        </div>
    );
};

export default EditorWindow;