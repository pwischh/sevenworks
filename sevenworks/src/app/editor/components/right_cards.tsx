"use client";

import React, { useState, useRef, useEffect } from "react";
import features from "./features.json";
import exampleEdits from "../example_edits.json";
import { generateResumeText } from './gemini';
import { useFormContext } from "../formcontext";

const RightView = () => {
  const { formData } = useFormContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([
    { 
      sender: "gemini", 
      text: "Hi! I can help with your resume. What would you like assistance with today?" 
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatOnlyView, setChatOnlyView] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      sender: "user",
      text: chatInput
    };
    
    setChatMessages((msgs) => [...msgs, userMessage]);
    setChatInput("");
    setLoading(true);
    
    try {
      // Create a more structured and readable summary of the resume data
      const resumeData = {
        personalInfo: {
          name: `${formData.firstName || ''} ${formData.middleName || ''} ${formData.lastName || ''}`.trim(),
          email: formData.email || 'Not provided',
          phone: formData.phone || 'Not provided',
          address: formData.address || 'Not provided'
        },
        experience: Array.isArray(formData.experience) ? formData.experience.map(exp => ({
          title: exp.title || '',
          company: exp.company || '',
          years: exp.years || ''
        })) : [],
        education: Array.isArray(formData.education) ? formData.education.map(edu => ({
          degree: edu.degree || '',
          institution: edu.institution || '',
          years: edu.years || ''
        })) : [],
        skills: formData.skillsInterests || 'None provided',
        leadership: Array.isArray(formData.leadership) ? formData.leadership.map(lead => ({
          title: lead.title || '',
          description: lead.description || ''
        })) : [],
        honors: Array.isArray(formData.honorsList) ? formData.honorsList.map(honor => 
          honor.honor || ''
        ).filter(h => h) : []
      };

      // Format the resume data as a readable string for the AI
      const resumeSummary = `
Name: ${resumeData.personalInfo.name}
Email: ${resumeData.personalInfo.email}
Phone: ${resumeData.personalInfo.phone}
Address: ${resumeData.personalInfo.address}

Experience:
${resumeData.experience.length > 0 
  ? resumeData.experience.map(exp => 
      `- ${exp.title} at ${exp.company} (${exp.years})`
    ).join('\n')
  : 'No experience provided'
}

Education:
${resumeData.education.length > 0
  ? resumeData.education.map(edu => 
      `- ${edu.degree} from ${edu.institution} (${edu.years})`
    ).join('\n')
  : 'No education provided'
}

Skills: ${resumeData.skills}

Leadership:
${resumeData.leadership.length > 0
  ? resumeData.leadership.map(lead => 
      `- ${lead.title}: ${lead.description}`
    ).join('\n')
  : 'No leadership information provided'
}

Honors:
${resumeData.honors.length > 0
  ? resumeData.honors.map(honor => 
      `- ${honor}`
    ).join('\n')
  : 'No honors listed'
}`;

      // Craft the prompt for the AI
      const prompt = `You are a helpful, friendly resume assistant having a conversation. 
      Respond to this message from the user: "${chatInput}"
      
      Here is the context about their resume:
      ${resumeSummary}
      
      Keep your response conversational, brief, and helpful. If they ask for specific resume advice, 
      refer to the exact fields from their resume and provide constructive suggestions.`;

      // Call the API with the prompt
      const aiResponse = await generateResumeText(prompt);
      
      // Add the response to chat
      setChatMessages((msgs) => [
        ...msgs,
        {
          sender: "ai",
          text: aiResponse || "I couldn't understand your message. Could you try rephrasing it?"
        }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatMessages((msgs) => [
        ...msgs,
        {
          sender: "ai",
          text: "Sorry, I'm having trouble responding right now. Please try again later."
        }
      ]);
    }
    
    setLoading(false);
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
              {/* Hide button for Resume Analysis */}
              {feature.title !== "Resume Analysis" && (
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
              )}
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
              className="self-start mb-2 px-3 py-1 bg-[#435058] text-white rounded hover:bg-gray-400 transition"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Chat with Resume</h2>
            <div className="mt-4 w-full bg-gray-100 text-black p-4 rounded flex flex-col max-h-full overflow-y-auto flex-1">
              <div className="flex-1 overflow-y-auto mb-2" style={{ maxHeight: "calc(100vh - 300px)" }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`mb-2 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-[#10a37f] text-white" : "bg-[#3b5d54] text-white"}`}>{msg.text}</span>
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