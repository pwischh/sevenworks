"use client";

import { useState } from 'react';
import { FaUser, FaPhone, FaBook, FaBriefcase, FaPlus, FaSync, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    firstName: 'John',
    middleName: 'Jay',
    lastName: 'Doe',
    desiredJob: 'Ice Cream Taster',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 flex flex-col items-center py-4 space-y-6">
        <FaUser size={24} />
        <FaPhone size={24} />
        <FaBook size={24} />
        <FaBriefcase size={24} />
        <FaPlus size={24} />
        <FaSync size={24} />
        <FaCog size={24} />
        <FaSignOutAlt size={24} />
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Form Section */}
        <div className="w-1/4 bg-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <label className="block text-sm">First Name *</label>
          <input 
            name="firstName" 
            value={form.firstName} 
            onChange={handleChange} 
            className="w-full bg-gray-800 text-white p-2 rounded mb-2" 
          />
          <label className="block text-sm">Middle Name</label>
          <input 
            name="middleName" 
            value={form.middleName} 
            onChange={handleChange} 
            className="w-full bg-gray-800 text-white p-2 rounded mb-2" 
          />
          <label className="block text-sm">Last Name *</label>
          <input 
            name="lastName" 
            value={form.lastName} 
            onChange={handleChange} 
            className="w-full bg-gray-800 text-white p-2 rounded mb-2" 
          />
          <label className="block text-sm">Desired Job *</label>
          <input 
            name="desiredJob" 
            value={form.desiredJob} 
            onChange={handleChange} 
            className="w-full bg-gray-800 text-white p-2 rounded" 
          />
        </div>

        {/* Resume Preview Section */}
        <div className="flex-1 flex justify-center items-center bg-gray-600">
          <div className="w-2/3 h-4/5 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Side Content Boxes */}
        <div className="w-1/4 bg-gray-700 p-4 space-y-4">
          <div className="w-full h-32 bg-gray-800 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
