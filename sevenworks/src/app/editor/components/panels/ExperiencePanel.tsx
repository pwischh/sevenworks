// ExperiencePanel.tsx
import React from "react";

interface ExperienceEntry {
  title: string;
  company: string;
  years: string;
}

interface ExperiencePanelProps {
  experience?: ExperienceEntry[];
  onChange: (idx: number, key: keyof ExperienceEntry, value: string) => void;
  onAdd: () => void;
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ experience = [], onChange, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
      <h1 className="text-black text-center mb-4">Experience</h1>
      {experience.map((exp, idx) => (
        <div key={idx} className="flex flex-col mt-2 border-b pb-2">
          {[
            { key: "title", label: "Job Title" },
            { key: "company", label: "Company" },
            { key: "years", label: "Years" },
          ].map(({ key, label }) => (
            <div key={key}>
              <span className="text-xs font-bold text-[#848C8E]">{label}</span>
              <input
                type="text"
                value={exp[key as keyof ExperienceEntry] ?? ""}
                onChange={(e) => onChange(idx, key as keyof ExperienceEntry, e.target.value)}
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
        + Add Experience
      </button>
    </div>
  );
};

export default ExperiencePanel;