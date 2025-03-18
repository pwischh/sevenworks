"use client";
import React, { useState } from "react";
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import BusinessTemplate from "../TEST-TEMPLATES/business-template";
import dynamic from "next/dynamic";

<<<<<<< HEAD
const NewPDFDownloadLink = dynamic(() => Promise.resolve(PDFDownloadLink), { ssr: false });
=======
import React from "react";
import BusinessTemplate from "../TEST-TEMPLATES/business-template";
import dynamic from "next/dynamic";
import { BlobProvider } from "@react-pdf/renderer";

>>>>>>> 60db2736f7db906da6a256e7f6ee56717fa6f2e7
const NewBlobProvider = dynamic(() => Promise.resolve(BlobProvider), { ssr: false });

const EditorWindow = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        content: "",
    });

    return (
        <div className="flex-[2] p-4 rounded-lg bg-[#E6E6E6]">
<<<<<<< HEAD
            <div className="flex flex-col items-center bg-white h-full w-full gap-4 rounded-lg p-4">
                {/* Input Fields for Dynamic PDF */}
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="First Name"
                    name="firstName"
                />
                <input
                    className="border-[2px] border-gray-400 px-2 rounded-md text-gray-700"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Last Name"
                    name="lastName"
                />
                <textarea
                    className="border-[2px] border-gray-400 px-2 rounded-md resize-none text-gray-700"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Content"
                    name="content"
                />

                {/* PDF Preview */}
                <div className="flex justify-center items-center w-full h-[500px] bg-offWhite mt-4">
                    <NewBlobProvider document={<BusinessTemplate form={form} />}>
                        {({ url, loading, error }) => {
                            if (loading) return 'Loading document...';
                            if (error) return 'Error generating PDF';
                            return (
                                <iframe
                                    src={`${url}#toolbar=0`}
                                    style={{ width: "100%", height: "100%", backgroundColor: "white" }}
                                    title="PDF Preview"
                                />
                            );
                        }}
                    </NewBlobProvider>
                </div>
=======
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
>>>>>>> 60db2736f7db906da6a256e7f6ee56717fa6f2e7
            </div>
        </div>
    );
};

export default EditorWindow;
