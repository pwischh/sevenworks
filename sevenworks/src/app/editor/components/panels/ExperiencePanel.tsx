// ExperiencePanel.tsx
import React from "react";

interface ExperienceEntry {
  title: string;
  company: string;
  years: string;
  bullets?: string[];
}

interface ExperiencePanelProps {
  experience?: ExperienceEntry[];
  onChange: (idx: number, key: keyof ExperienceEntry, value: string) => void;
  onAdd: () => void;
  onAddBullet: (idx: number) => void;
  onEditBullet: (expIdx: number, bulletIdx: number, value: string) => void;
  onRemoveBullet: (expIdx: number, bulletIdx: number) => void;
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ 
  experience = [], 
  onChange, 
  onAdd, 
  onAddBullet = () => {}, 
  onEditBullet = () => {}, 
  onRemoveBullet = () => {} 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
      <h1 className="text-black text-center mb-4">Experience</h1>
      {experience.map((exp, idx) => (
        <div key={idx} className="flex flex-col mt-2 border-b pb-4">
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
          
          {/* Bullet Points Section */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#848C8E]">Bullet Points</span>
              <button 
                onClick={() => onAddBullet(idx)}
                className="text-xs text-[#435058] hover:text-[#1c2428]"
              >
                + Add Bullet
              </button>
            </div>
            
            {/* List of bullet points */}
            {Array.isArray(exp.bullets) && exp.bullets.map((bullet, bulletIdx) => (
              <div key={bulletIdx} className="flex items-center mt-2">
                <span className="mr-2">•</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => onEditBullet(idx, bulletIdx, e.target.value)}
                  placeholder="Enter bullet point description"
                  className="flex-1 border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg text-[#848C8E]"
                />
                <button 
                  onClick={() => onRemoveBullet(idx, bulletIdx)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Show a message if no bullets */}
            {(!exp.bullets || exp.bullets.length === 0) && (
              <div className="text-xs text-gray-500 italic mt-2">
                Add bullet points to highlight your achievements and responsibilities
              </div>
            )}
          </div>
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