// was in src/app/editor/editorwindow.tsx
"use client";
import React, { useState } from "react";
// import { useEffect } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import dynamic from "next/dynamic";
import BusinessTemplate from "../TEST-TEMPLATES/business-template";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormContext, FormProvider } from "../editor/formcontext";

const NewPDFDownloadLink = dynamic(() => Promise.resolve(PDFDownloadLink), { ssr: false });
const NewBlobProvider = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.BlobProvider), { ssr: false });

const EditorWindow = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { formData, setFormData } = useFormContext();
    const initialTab = searchParams?.get("tab") || "personal";
    const [activeTab, setActiveTab] = useState(initialTab);

    // useEffect(() => {
    //     const tab = searchParams.get("tab") || "personal";
    //     if (tab !== activeTab) {
    //         setActiveTab(tab);
    //     }
    // }, [searchParams]);

    const changeTab = (tab: string) => {
        setActiveTab(tab);
        router.push(`?tab=${tab}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(name, value);
    };

    const renderFields = () => {
        if (activeTab === "personal") {
            return (
                <div className="flex flex-col gap-4">
                    <h1 className="text-black text-center">Personal Information</h1>
                    {["firstName", "middleName", "lastName", "email", "phone"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <span className="text-xs font-bold text-[#848C8E]">
                                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                                {field === "firstName" && <span className="text-red-500">*</span>}
                            </span>
                            <input
                                type="text"
                                name={field}
                                value={typeof formData[field] === "string" ? formData[field] : ""}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                onChange={handleInputChange}
                                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
                            />
                        </div>
                    ))}
                    <div className="flex flex-col pt-3">
                        <button className="border bg-[#435058] border-[#999999] shadow-md p-2 rounded-lg w-full text-white">
                            + Add a New Element
                        </button>
                    </div>
                </div>
            );
        } else if (activeTab === "phone") {
            return (
                <div className="flex flex-col gap-4">
                    <h1 className="text-black text-center">Work Information</h1>
                    {["companyName", "role"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <span className="text-xs font-bold text-[#848C8E]">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </span>
                            <input
                                type="text"
                                name={field}
                                value={typeof formData[field] === "string" ? formData[field] : ""}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                onChange={handleInputChange}
                                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="flex gap-4">
            {/* Left side - Form Fields */}
            <div className="flex-none w-[350px] bg-white p-2 rounded-lg border border-gray-300">
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => changeTab("personal")}
                        className={`p-2 rounded-lg ${activeTab === "personal" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => changeTab("phone")}
                        className={`p-2 rounded-lg ${activeTab === "phone" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    >
                        Work
                    </button>
                </div>
                {renderFields()}
                <div className="flex flex-col pt-3">
                    <NewPDFDownloadLink 
                        document={<BusinessTemplate formData={formData} />}
                        fileName="exported_form.pdf"
                        className="px-4 py-2 bg-blue-500 text-white text-center rounded"
                    >
                        Export to PDF
                    </NewPDFDownloadLink>
                </div>
            </div>

            {/* Middle - PDF Preview */}
            <div className="flex-none w-[650px] p-4 rounded-lg bg-white border border-gray-300">
                <div className="flex flex-col items-center bg-white h-full w-full gap-4 rounded-lg p-4">
                    {/* real time preview note on right side of top preview
                    <div className="flex justify-end items-center w-full h-full">
                        <div className="text-sm text-gray-500">Real-time PDF Preview</div>
                    </div> */}
                    <div className="flex justify-center items-center w-full h-[700px] bg-w mt-0">
                        <NewBlobProvider document={<BusinessTemplate formData={formData} />}>
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
                </div>
            </div>
        </div>
    );
};

const EditorWindowWrapper = () => (
    <FormProvider>
        <EditorWindow />
    </FormProvider>
);

export default EditorWindowWrapper;