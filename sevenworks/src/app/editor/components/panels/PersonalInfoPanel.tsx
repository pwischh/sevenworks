// PersonalInfoPanel.tsx
import React from "react";
import type { FormDataValue } from "../../formcontext";

interface PersonalInfoPanelProps {
  formData: Record<string, any>;
  setFormData: (key: string, value: any) => void;
  customFields: { id: number; label: string; value: string }[];
  onFieldChange: (id: number, key: "label" | "value", value: string) => void;
  onAddField: () => void;
}

const PersonalInfoPanel: React.FC<PersonalInfoPanelProps> = ({
  formData,
  setFormData,
  customFields,
  onFieldChange,
  onAddField,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.name, e.target.value);
  };

  const labels = [
    { key: "firstName", label: "First Name", required: true },
    { key: "middleName", label: "Middle Name" },
    { key: "lastName", label: "Last Name", required: true },
    { key: "email", label: "Email", required: true },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col flex-1 overflow-auto pb-20">
      <h1 className="text-black text-center mb-4">Personal Information</h1>
      {labels.map(({ key, label, required }) => (
        <div key={key} className="flex flex-col mt-2">
          <span className="text-xs font-bold text-[#848C8E]">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          <input
            type="text"
            name={key}
            value={formData[key] ?? ""}
            placeholder={label}
            onChange={handleChange}
            className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg w-full text-[#848C8E]"
          />
        </div>
      ))}

      {customFields.map((field) => (
        <div key={field.id} className="flex flex-col mt-4">
          <span className="text-xs font-bold text-[#848C8E]">Custom Label</span>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onFieldChange(field.id, "label", e.target.value)}
            placeholder="Label"
            className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg text-[#848C8E]"
          />

          <span className="text-xs font-bold text-[#848C8E] mt-2">Custom Value</span>
          <input
            type="text"
            value={field.value}
            onChange={(e) => onFieldChange(field.id, "value", e.target.value)}
            placeholder="Value"
            className="border bg-[#E6E6E6] border-[#999999] shadow-md p-2 rounded-lg text-[#848C8E]"
          />
        </div>
      ))}

      <button
        onClick={onAddField}
        className="mt-6 border bg-[#435058] shadow-md p-2 rounded-lg w-full hover:bg-[#1c2428] text-white transition"
      >
        + Add a New Element
      </button>
    </div>
  );
};

export default PersonalInfoPanel;