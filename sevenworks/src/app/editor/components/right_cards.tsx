"use client";

import React, { useState, useRef } from "react";
import features from "./features.json";
import exampleEdits from "../example_edits.json";
import { generateResumeText } from './gemini';

const RightView = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatOnlyView, setChatOnlyView] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    setChatMessages((msgs) => [...msgs, userMessage]);
    setChatInput("");
    setLoading(true);
    try {
      const geminiText = await generateResumeText(chatInput);
      setChatMessages((msgs) => [...msgs, { sender: "gemini", text: geminiText }]);
    } catch (e) {
      setChatMessages((msgs) => [...msgs, { sender: "gemini", text: "Error connecting to Gemini API." }]);
    }
    setLoading(false);
    // setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="flex-[650px] pl-0 pr-4 rounded-lg">
      <div className="flex flex-col gap-4 p-0 h-full">
        {!chatOnlyView ? (
          features.map((feature, index) => (
            <div
              key={index}
              className="bg-white flex-1 w-full rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition transform p-6 border border-gray-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
              <p className="text-sm text-gray-600 mt-2 text-center">{feature.description}</p>
              <button
                onClick={() => {
                  if (feature.title === "Chat with Resume") {
                    setChatOnlyView(true);
                  } else {
                    setExpandedIndex(expandedIndex === index ? null : index);
                  }
                }}
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
          ))
        ) : (
          <div className="bg-white w-full rounded-lg flex flex-col items-center justify-center shadow-md p-6 border border-gray-300 h-full">
            <button
              onClick={() => setChatOnlyView(false)}
              className="self-start mb-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Chat with Resume</h2>
            <div className="mt-4 w-full bg-gray-100 text-black p-4 rounded flex flex-col max-h-full overflow-y-auto flex-1">
              <div className="flex-1 overflow-y-auto mb-2" style={{ maxHeight: "calc(100vh - 300px)" }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`mb-2 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block px-2 py-1 rounded ${msg.sender === "user" ? "bg-blue-200" : "bg-green-100"}`}>{msg.text}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  className="flex-1 px-2 py-1 rounded border border-gray-300"
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Ask about your resume..."
                  disabled={loading}
                />
                <button
                  className="px-4 py-1 bg-[#435058] text-white rounded-lg hover:bg-[#1c2428] transition"
                  onClick={handleSend}
                  disabled={loading}
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightView;