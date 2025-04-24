// AdditionalPanel.tsx
import React from "react";

interface AdditionalPanelProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AdditionalPanel: React.FC<AdditionalPanelProps> = ({ value = "", onChange }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
    <h1 className="text-black text-center mb-4">Additional Skills & Interests</h1>
    <span className="text-xs font-bold text-[#848C8E]">List your skills, languages, interests, etc…</span>
    <textarea
      name="skillsInterests"
      value={value}
      onChange={onChange}
      placeholder="e.g. JavaScript, Spanish, Public Speaking…"
      className="mt-2 border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E] h-24 resize-none"
    />
  </div>
);

export default AdditionalPanel;