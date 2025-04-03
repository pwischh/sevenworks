"use client";

import React from "react";

const RightView = () => {
  return (
    <div className="flex-[650px] pl-0 pr-4 rounded-lg">
      <div className="flex flex-col gap-4 p-0 h-full">
        {/* Resume Analysis Feature */}
        <div className="bg-white flex-1 w-full rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition transform p-6 border border-gray-15">
          <h2 className="text-xl font-semibold text-gray-800">Resume Analysis</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Get insights on your resume&#39;s strengths and areas for improvement with AI-powered analysis.
          </p>
        </div>
        {/* Content Suggestions Feature */}
        <div className="bg-white flex-1 w-full rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition transform p-6 border border-gray-15">
          <h2 className="text-xl font-semibold text-gray-800">Content Suggestions</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Receive AI-driven recommendations to enhance your resume content and make it more impactful.
          </p>
        </div>
        {/* Formatting Tools Feature */}
        <div className="bg-white flex-[1.5] w-full rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition transform p-6 border border-gray-15">
          <h2 className="text-xl font-semibold text-gray-800">Formatting Tools</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Customize your resume layout and design for a professional, modern look.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightView;