// LeadershipPanel.tsx
import React from "react";

interface LeadershipEntry {
  title: string;
  description: string;
}

interface LeadershipPanelProps {
  leadership?: LeadershipEntry[];
  onChange: (idx: number, key: keyof LeadershipEntry, value: string) => void;
  onAdd: () => void;
}

const LeadershipPanel: React.FC<LeadershipPanelProps> = ({
  leadership = [],
  onChange,
  onAdd,
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
        <div key={idx} className="flex flex-col mt-2 border-b pb-2">
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