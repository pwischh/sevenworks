"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BusinessTemplate from "./business-template";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormContext } from "./formcontext";
import { Worker } from '@react-pdf-viewer/core';
import { pdf } from '@react-pdf/renderer';
const ViewerNoSSR = dynamic(() => import('@react-pdf-viewer/core').then(mod => mod.Viewer), { ssr: false });
import '@react-pdf-viewer/core/lib/styles/index.css';

const InputFields = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formData, setFormData } = useFormContext();
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // New state for custom personal fields
  const [customPersonalFields, setCustomPersonalFields] = useState<{ id: number; label: string; value: string }[]>([]);

  // Function to add a new custom field
  const addCustomField = () => {
    const newField = { id: Date.now(), label: "", value: "" };
    const updatedFields = [...customPersonalFields, newField];
    setCustomPersonalFields(updatedFields);
    setFormData("customPersonal", updatedFields);
  };

  // Function to handle changes to custom fields
  const handleCustomFieldChange = (id: number, key: "label" | "value", newValue: string) => {
    const updatedFields = customPersonalFields.map(field =>
      field.id === id ? { ...field, [key]: newValue } : field
    );
    setCustomPersonalFields(updatedFields);
    setFormData("customPersonal", updatedFields);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "personal";
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [activeTab, searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const generatePdf = async () => {
        const blob = await pdf(<BusinessTemplate formData={formData} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      };

      generatePdf();
    }, 500); // wait 500ms after last change

    return () => clearTimeout(timeout); // cleanup if formData changes quickly
  }, [formData]);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const renderFields = () => {
    if (activeTab === "personal") {
      return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-lg transition transform p-6 border border-gray-150 flex flex-col flex-1 min-h-full">          <h1 className="text-black text-center">Personal Information</h1>
          {["firstName", "middleName", "lastName", "email", "phone", "address"].map((field) => (
            <div key={field} className="flex flex-col mt-2">
              <span className="text-xs font-bold text-[#848C8E]">
                {field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}{" "}
                {field === "firstName" && <span className="text-red-500">*</span>}
              </span>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                placeholder={field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
                onChange={handleInputChange}
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              />
            </div>
          ))}
          {customPersonalFields.map((field) => (
            <div key={field.id} className="flex flex-col mt-2">
              <span className="text-xs font-bold text-[#848C8E]">Custom Field Label</span>
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleCustomFieldChange(field.id, "label", e.target.value)}
                placeholder="Custom Label"
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              />
              <span className="text-xs font-bold text-[#848C8E] mt-2">Custom Field Value</span>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleCustomFieldChange(field.id, "value", e.target.value)}
                placeholder="Custom Value"
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              />
            </div>
          ))}
          <div className="flex flex-col pt-3">
            <button
              onClick={addCustomField}
              className="border bg-[#435058] border-[#999999] shadow-md p-2 rounded-lg w-full text-white"
            >
              + Add a New Element
            </button>
          </div>
        </div>
      );
    } else if (activeTab === "experience") {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6">
          <h1 className="text-black text-center">Work Experience</h1>
          {["companyName", "role", "location", "duration"].map((field) => (
            <div key={field} className="flex flex-col mt-2">
              <span className="text-xs font-bold text-[#848C8E]">
                {field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
              </span>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                placeholder={field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
                onChange={handleInputChange}
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              />
            </div>
          ))}
          <div className="flex flex-col mt-2">
            <span className="text-xs font-bold text-[#848C8E]">Experience Details</span>
            <textarea
              name="experienceDetails"
              value={formData["experienceDetails"] || ""}
              placeholder="Enter job details, separate lines for each detail"
              onChange={handleInputChange}
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              rows={4}
            />
          </div>
        </div>
      );
    } else if (activeTab === "education") {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6">
          <h1 className="text-black text-center">Education Information</h1>
          {["educationSchool", "educationGraduation", "educationDegree", "educationDescription", "educationGPA"].map((field) => (
            <div key={field} className="flex flex-col mt-2">
              <span className="text-xs font-bold text-[#848C8E]">
                {field === "educationSchool" ? "School" :
                  field === "educationGraduation" ? "Graduation Date" :
                  field === "educationDegree" ? "Degree" :
                  field === "educationDescription" ? "Coursework/Description" : "GPA"}
              </span>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                placeholder={field === "educationSchool" ? "School" :
                  field === "educationGraduation" ? "Graduation Date" :
                  field === "educationDegree" ? "Degree" :
                  field === "educationDescription" ? "Coursework/Description" : "GPA"}
                onChange={handleInputChange}
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
              />
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "additional") {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6">
          <h1 className="text-black text-center">Additional Information</h1>
          {["leadership", "ubsProgram", "honors", "skillsInterests"].map((field) => (
            <div key={field} className="flex flex-col mt-2">
              <span className="text-xs font-bold text-[#848C8E]">
                {field === "leadership" ? "Leadership and Community Engagement" :
                  field === "ubsProgram" ? "UBS Freshman Frenzy Program" :
                  field === "honors" ? "Honors" : "Additional Skills and Interests"}
              </span>
              <textarea
                name={field}
                value={formData[field] || ""}
                placeholder={field === "leadership" ? "Enter leadership experience" :
                  field === "ubsProgram" ? "Enter UBS program details" :
                  field === "honors" ? "Enter honors received" : "Enter additional skills and interests"}
                onChange={handleInputChange}
                className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
                rows={4}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    // <div className="flex flex-row gap-2 w-[65.5%] h-full items-start">
    <div className="grid grid-cols-[1.5fr,2.5fr] gap-2 w-full max-h-screen overflow-hidden">
      <div className="flex-[1.5] flex-col bg-white p-0 rounded-lg overflow-hidden h-full">
        {renderFields()}
      </div>
      {/* <div className="flex-[2] p-2 rounded-lg bg-white border border-gray-15 h-full overflow-hidden flex items-center justify-center"> */}
      <div className="p-0 rounded-lg bg-white border border-gray-15 h-full overflow-hidden min-h-0">
        <div className="w-full h-full">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
  {pdfUrl ? (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <ViewerNoSSR fileUrl={pdfUrl} className="w-full h-full" />
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
      Generating PDF...
    </div>
  )}
</Worker>
        </div>
      </div>
    </div>
  );
};

<style jsx global>{`
  .rpv-core__viewer {
    width: 100% !important;
    height: 100% !important;
  }

  .rpv-core__inner-pages {
    width: 100% !important;
    height: 100% !important;
    justify-content: flex-start !important;
  }

  .rpv-core__page-layer,
  .rpv-core__canvas-layer canvas {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
  }

  .rpv-core__page {
    padding: 0 !important;
  }
`}</style>

export default InputFields;