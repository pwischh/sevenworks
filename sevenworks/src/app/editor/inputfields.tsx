"use client";

import React from 'react';

const InputFields = () => {
  return (
    <div className="flex-[1.5] bg-[#E6E6E6] p-2 rounded-lg">
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
        <input
          type="text"
          placeholder="+ Add a New Element"
          className="border bg-[#435058] border-[#999999] shadow-md p-2 rounded-lg w-full text-white placeholder-white"
        />
      </div>
    </div>
    </div>
  );
};

export default InputFields;