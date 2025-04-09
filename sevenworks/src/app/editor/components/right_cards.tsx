"use client";

import React from "react";
import { useState } from "react";
import features from "./features.json";
import exampleEdits from "../example_edits.json";

const RightView = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="flex-[650px] pl-0 pr-4 rounded-lg">
      <div className="flex flex-col gap-4 p-0 h-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white flex-1 w-full rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition transform p-6 border border-gray-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">{feature.description}</p>
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="mt-4 px-4 py-2 bg-[#435058] text-white rounded-lg hover:bg-[#1c2428] transition"
            >
              {feature.buttonText}
            </button>
            {expandedIndex === index && feature.title === "Content Suggestions" && (
              <div className="mt-4 w-full text-xs text-left bg-gray-100 text-black p-4 rounded space-y-4 overflow-y-auto max-h-60">
                {exampleEdits.experience.map((exp, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <div className="font-semibold text-sm">{exp.role} — {exp.company}</div>
                    <div className="text-gray-600 text-xs italic">{exp.duration} | {exp.location}</div>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {exp.descriptions.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightView;