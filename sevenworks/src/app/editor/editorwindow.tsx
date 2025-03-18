"use client";

import React from "react";
import BusinessTemplate from "../TEST-TEMPLATES/business-template";
import dynamic from "next/dynamic";
import { BlobProvider } from "@react-pdf/renderer";

const NewBlobProvider = dynamic(() => Promise.resolve(BlobProvider), { ssr: false });

const EditorWindow = () => {
    return (
        <div className="flex-[2] p-4 rounded-lg bg-[#E6E6E6]">
            <div className="flex items-center justify-center self-center bg-white p-20 h-full w-full flex-row gap-4 rounded-lg">
                <NewBlobProvider document={<BusinessTemplate form={form} />}>
                    {({ url, loading, error }) => {
                            if (loading) return 'Loading document...';
                            if (error) return 'Error generating PDF';
                            // Append #toolbar=0 to try to hide browser toolbar (supported in some browsers)
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
        </div>
    );
    }

export default EditorWindow;
