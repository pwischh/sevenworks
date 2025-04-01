"use client";
import React, { useEffect, useState } from "react";
import { BlobProvider } from '@react-pdf/renderer';
import dynamic from "next/dynamic";
import BusinessTemplate from "./business-template";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormContext } from "./formcontext";

const NewBlobProvider = dynamic(() => Promise.resolve(BlobProvider), { ssr: false });

const InputFields = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formData, setFormData } = useFormContext();
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

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
    <div className="flex flex-row gap-2 w-[65.5%] h-full items-start">
      <div className="flex-[1.5] flex-col bg-white p-0 rounded-lg overflow-auto h-full">
      {/* <div className="flex flex-row gap-2 mb-4">
          <button onClick={() => changeTab("personal")} className={`p-2 rounded ${activeTab === "personal" ? "bg-[#435058] text-white" : "bg-white text-black"}`}>Personal</button>
          <button onClick={() => changeTab("experience")} className={`p-2 rounded ${activeTab === "experience" ? "bg-[#435058] text-white" : "bg-white text-black"}`}>Experience</button>
          <button onClick={() => changeTab("education")} className={`p-2 rounded ${activeTab === "education" ? "bg-[#435058] text-white" : "bg-white text-black"}`}>Education</button>
          <button onClick={() => changeTab("additional")} className={`p-2 rounded ${activeTab === "additional" ? "bg-[#435058] text-white" : "bg-white text-black"}`}>Additional</button>
        </div> */}
        {renderFields()}
      </div>
      <div className="flex-[2] p-2 rounded-lg bg-white border border-gray-15 h-full overflow-auto">
        <NewBlobProvider document={<BusinessTemplate formData={formData} />}>
          {({ url, loading, error }) => {
            if (loading) return 'Loading document...';
            if (error) return 'Error generating PDF';
            // Append #toolbar=0 to try to hide browser toolbar (supported in some browsers)
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
  );
};

export default InputFields;