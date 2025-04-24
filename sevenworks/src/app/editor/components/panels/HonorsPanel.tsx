// HonorsPanel.tsx
import React from "react";

interface HonorEntry {
  honor: string;
}

interface HonorsPanelProps {
  honorsList?: HonorEntry[];
  onChange: (idx: number, value: string) => void;
  onAdd: () => void;
}

const HonorsPanel: React.FC<HonorsPanelProps> = ({
  honorsList = [],
  onChange,
  onAdd,
}) => {
  const entries =
    honorsList.length === 0 ? [{ honor: "" }, { honor: "" }] : honorsList;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto">
      <h1 className="text-black text-center mb-4">Honors</h1>
      {entries.map((item, idx) => (
        <div key={idx} className="flex flex-col mt-2 border-b pb-2">
          <span className="text-xs font-bold text-[#848C8E]">Honor</span>
          <input
            type="text"
            value={item.honor}
            onChange={(e) => onChange(idx, e.target.value)}
            placeholder="Honor, Award, or Recognition"
            className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E] mt-1"
          />
        </div>
      ))}

      <button
        onClick={onAdd}
        className="mt-4 border bg-[#435058] shadow-md p-2 rounded-lg w-full hover:bg-[#1c2428] text-white transition"
      >
        + Add Honor
      </button>
    </div>
  );
};

export default HonorsPanel;