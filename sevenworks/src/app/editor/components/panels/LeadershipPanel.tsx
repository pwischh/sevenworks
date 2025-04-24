// LeadershipPanel.tsx
import React from "react";

interface LeadershipEntry {
  title: string;
  description: string;
  bullets?: string[]; // Add bullets array for leadership entries
}

interface LeadershipPanelProps {
  leadership?: LeadershipEntry[];
  onChange: (idx: number, key: keyof LeadershipEntry, value: string) => void;
  onAdd: () => void;
  onAddBullet: (idx: number) => void;
  onEditBullet: (leadershipIdx: number, bulletIdx: number, value: string) => void;
  onRemoveBullet: (leadershipIdx: number, bulletIdx: number) => void;
}

const LeadershipPanel: React.FC<LeadershipPanelProps> = ({
  leadership = [],
  onChange,
  onAdd,
  onAddBullet = () => {},
  onEditBullet = () => {},
  onRemoveBullet = () => {}
}) => {
  // Ensure at least two entries in UI if empty
  const entries =
    leadership.length === 0
      ? [{ title: "", description: "" }, { title: "", description: "" }]
      : leadership;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
      <h1 className="text-black text-center mb-4">Leadership & Community Engagement</h1>
      {entries.map((item, idx) => (
        <div key={idx} className="flex flex-col mt-2 border-b pb-4">
          {[
            { key: "title", label: "Title" },
            { key: "description", label: "Description" },
          ].map(({ key, label }) => (
            <div key={key} className="mt-2">
              <span className="text-xs font-bold text-[#848C8E]">{label}</span>
              <input
                type="text"
                value={(item as any)[key] ?? ""}
                onChange={(e) => onChange(idx, key as keyof LeadershipEntry, e.target.value)}
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
            {Array.isArray(item.bullets) && item.bullets.map((bullet, bulletIdx) => (
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
            {(!item.bullets || item.bullets.length === 0) && (
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
        + Add Leadership
      </button>
    </div>
  );
};

export default LeadershipPanel;