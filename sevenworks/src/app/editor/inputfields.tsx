"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const InputFields = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update the activeTab if the search param changes
  useEffect(() => {
    const tab = searchParams.get("tab") || "personal";
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  const renderFields = () => {
    if (activeTab === "personal") {
      return (
        <div className="flex flex-col gap-4">
          <h1 className="text-black text-center">Personal Information</h1>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">
              First Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="First Name"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Middle Name</span>
            <input
              type="text"
              placeholder="Middle Name"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Last Name</span>
            <input
              type="text"
              placeholder="Last Name"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Email</span>
            <input
              type="text"
              placeholder="Email"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Phone</span>
            <input
              type="text"
              placeholder="Phone"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
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
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Company Name</span>
            <input
              type="text"
              placeholder="Company Name"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#848C8E]">Role</span>
            <input
              type="text"
              placeholder="Role"
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex-[1.5] bg-[#E6E6E6] p-2 rounded-lg">
      {renderFields()}
    </div>
  );
};

export default InputFields;