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
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row gap-2 w-[62.5%]">
      <div className="flex-[1.5] flex-row bg-[#E6E6E6] p-2 rounded-lg">
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
      </div>
      <div className="flex-[2] p-2 rounded-lg bg-[#E6E6E6]" style={{ height: "100%" }}>
        <NewBlobProvider document={<BusinessTemplate formData={formData}/>}>
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
};

export default InputFields;