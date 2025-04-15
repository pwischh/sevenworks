 "use client";
import React, { useEffect, useState } from "react";
import { BlobProvider } from '@react-pdf/renderer';
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "./formcontext";
import { useResume } from "../resumeContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const NewBlobProvider = dynamic(() => Promise.resolve(BlobProvider), { ssr: false });

const InputFields = () => {
  const searchParams = useSearchParams();
  const { formData, setFormData } = useFormContext();
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);
  const template  = useResume();
  const [templateID, setTemplateID] = useState<string | null>(null);
  const [templateIdLoading, setTemplateIdLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user){
            try {
                const sessionData = (await getDoc(doc(db, "sessions", user.uid))).data();

                if (!sessionData){
                    throw new Error("Error retrieving session data");
                }

                const sessionTemplateID = sessionData.templateID;
                setTemplateID(sessionTemplateID);
            } catch(error) {
                console.error("Error fetching templateID:", error);
            }
        }
        setTemplateIdLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab") || "personal";
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [activeTab, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const renderFields = () => {
    if (activeTab === "personal") {
      return (
        <div className="flex flex-col gap-3 pt-2">
          <h1 className="text-black font-bold text-center">Personal Information</h1>
          {["firstName", "middleName", "lastName", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <span className="text-xs font-bold text-[#848C8E]">
                {field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}{" "}
                {(field === "firstName" || field === "lastName" || field === "email" || field === "phone") 
                  && <span className="text-red-500">*</span>}
              </span>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                placeholder={field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1)}
                onChange={handleInputChange}
                className="border bg-white border-gray-300 shadow-sm p-2 rounded-lg w-full text-black"
              />
            </div>
          ))}
          <div className="flex flex-col pt-3">
            <button className="border bg-[#435058] border-[#999999] shadow-sm p-2 rounded-lg w-full text-white">
              + Add a New Element
            </button>
          </div>
        </div>
      );
    } else if (activeTab === "contact") {
      return (
        <div className="flex flex-col gap-3 pt-2">
          <h1 className="text-black font-bold text-center">Contact Information</h1>
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
                className="border bg-white border-gray-300 shadow-sm p-2 rounded-lg w-full text-black"
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
        {renderFields()}
      </div>
      <div className="flex-[2] p-2 rounded-lg bg-[#E6E6E6]" style={{ height: "100%" }}>
        {(templateIdLoading) ? (
          <div></div>
        ) : (
          <NewBlobProvider document={template(templateID, formData)} key={JSON.stringify(formData)}>
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
        )}
      </div>
    </div>
  );
};

export default InputFields;