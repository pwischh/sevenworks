// EducationPanel.tsx
import React from "react";

interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
}

interface EducationPanelProps {
  education?: EducationEntry[];
  onChange: (idx: number, key: keyof EducationEntry, value: string) => void;
  onAdd: () => void;
}

const EducationPanel: React.FC<EducationPanelProps> = ({ education = [], onChange, onAdd }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
    <h1 className="text-black text-center mb-4">Education</h1>
    {education.map((edu, idx) => (
      <div key={idx} className="flex flex-col mt-2 border-b pb-2">
        {[
          { key: "degree", label: "Degree" },
          { key: "institution", label: "Institution" },
          { key: "years", label: "Years" },
        ].map(({ key, label }) => (
          <div key={key}>
            <span className="text-xs font-bold text-[#848C8E]">{label}</span>
            <input
              type="text"
              value={(edu as any)[key] ?? ""}
              onChange={(e) => onChange(idx, key as keyof EducationEntry, e.target.value)}
              placeholder={label}
              className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E] mt-1"
            />
          </div>
        ))}
      </div>
    ))}
    <button
      onClick={onAdd}
      className="mt-4 border bg-[#435058] shadow-md p-2 rounded-lg w-full hover:bg-[#1c2428] text-white transition"
    >
      + Add Education
    </button>
  </div>
);

export default EducationPanel;