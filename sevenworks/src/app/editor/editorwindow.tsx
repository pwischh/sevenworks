"use client";

import React from "react";
import BusinessTemplate from "../TEST-TEMPLATES/business-template";
import dynamic from "next/dynamic";
import { BlobProvider } from "@react-pdf/renderer";
import { useFormContext } from "./formcontext";

const NewBlobProvider = dynamic(() => Promise.resolve(BlobProvider), { ssr: false });

const EditorWindow = () => {
    return (
        <div className="flex-[2] p-4 rounded-lg bg-[#E6E6E6]">
            <NewBlobProvider document={<BusinessTemplate form={form} />}>
                {({ url, loading, error }) => {
                        if (loading) return 'Loading document...';
                        if (error) return 'Error generating PDF';
                        // Append #toolbar=0 to try to hide browser toolbar (ONLY SUPPORTED IN SOME BROWSERS)
                        return (
                            <iframe
                            src={`${url}#toolbar=0`}
                            style={{ width: "100%", height: "100%", backgroundColor: "white"}}
                            title="PDF Preview"
                            />
                        );
                    }}
            </NewBlobProvider>
        </div>
    );
    }

export default EditorWindow;
