"use client";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
// import type { JSX } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useFormContext, FormDataValue } from "../context/formcontext";
import { Worker } from '@react-pdf-viewer/core';
import { pdf } from '@react-pdf/renderer';
import { useZoom } from "../context/zoomcontext";
import { onAuthStateChanged } from "firebase/auth";
import PersonalInfoPanel from "./panels/PersonalInfoPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import EducationPanel from "./panels/EducationPanel";
import AdditionalPanel from "./panels/AdditionalPanel";
import LeadershipPanel from "./panels/LeadershipPanel";
import HonorsPanel from "./panels/HonorsPanel";

const ViewerNoSSR = dynamic(() => import('@react-pdf-viewer/core').then(mod => mod.Viewer), { ssr: false });
import '@react-pdf-viewer/core/lib/styles/index.css';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { useResume } from "@/app/editor/context/resumeContext";

// Define interfaces for form data
interface ExperienceEntry {
  title: string;
  company: string;
  years: string;
}
interface EducationEntry {
  degree: string;
  institution: string | undefined;
  years: string;
}

const InputFields = () => {
  const searchParams = useSearchParams();
  const { formData, setFormData, isSaving } = useFormContext();
  const { zoom } = useZoom();
  const initialTab = searchParams?.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [fontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);

  // References for PDF URLs and transitions
  const [primaryPdfUrl, setPrimaryPdfUrl] = useState<string | null>(null);
  const [secondaryPdfUrl, setSecondaryPdfUrl] = useState<string | null>(null);
  const [isPrimaryActive, setIsPrimaryActive] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // TemplateID from user session and template function to retrieve templates
  const template = useResume();
  const [templateID, setTemplateID] = useState<string | null>(null);

  // Refs for tracking and cleanup
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const previousFormDataRef = useRef(formData);
  const isFirstRender = useRef(true);

  // New state for custom personal fields
  const [customPersonalFields, setCustomPersonalFields] = useState<{ id: number; label: string; value: string }[]>([]);

  // Function to add a new custom field
  const addCustomField = () => {
    const newField = { id: Date.now(), label: "", value: "" };
    const updatedFields = [...customPersonalFields, newField];
    setCustomPersonalFields(updatedFields);
    setFormData("customPersonal", updatedFields);
  };

  // Function to handle changes to custom fields
  const handleCustomFieldChange = (id: number, key: "label" | "value", newValue: string) => {
    const updatedFields = customPersonalFields.map(field =>
      field.id === id ? { ...field, [key]: newValue } : field
    );
    setCustomPersonalFields(updatedFields);
    setFormData("customPersonal", updatedFields);
  };

  // Function to handle font size selection
  const handleFontSizeClick = (value: string) => {
    setFormData("fontSize", value);
    setFontSizeDropdownOpen(false);
  };

  // Add new experience entry
  const addExperience = () => {
    const updated = [...(Array.isArray(formData.experience) ? formData.experience : []), { title: '', company: '', years: '' }];
    setFormData('experience', updated);
  };

  // Add new education entry
  const addEducation = () => {
    const updated = Array.isArray(formData.education) 
      ? [...formData.education, { degree: '', institution: '', years: '' }] 
      : [{ degree: '', institution: '', years: '' }];
    setFormData('education', updated);
  };

  // Handle experience field change
  const handleExperienceChange = (idx: number, key: keyof ExperienceEntry, value: string) => {
    const updated = Array.isArray(formData.experience) ? [...formData.experience] : [];
    while (updated.length <= idx) {
      updated.push({ title: '', company: '', years: '' });
    }
    updated[idx][key] = value;
    setFormData('experience', updated);
  };
  
  // Handle education field change
  const handleEducationChange = (idx: number, key: keyof EducationEntry, value: string) => {
    const updated = Array.isArray(formData.education) ? [...formData.education] : [];
    while (updated.length <= idx) {
      updated.push({ degree: '', institution: '', years: '' });
    }
    updated[idx] = {
      ...updated[idx],
      [key]: value ?? ''
    };
    setFormData('education', updated);
  };

  // Add new leadership entry
  const addLeadership = () => {
    const updated = Array.isArray(formData.leadership) 
      ? [...formData.leadership, { title: '', description: '' }] 
      : [{ title: '', description: '' }];
    setFormData('leadership', updated);
  };

  // Handle leadership field change
  const handleLeadershipChange = (idx: number, key: 'title' | 'description', value: string) => {
    const updated = Array.isArray(formData.leadership) ? [...formData.leadership] : [];
    // If editing a placeholder row, expand the array
    while (updated.length <= idx) {
      updated.push({ title: '', description: '' });
    }
    updated[idx][key] = value;
    setFormData('leadership', updated);
  };

  // Add new honor entry
  const addHonor = () => {
    const updated = Array.isArray(formData.honorsList) ? [...formData.honorsList, { honor: '' }] : [{ honor: '' }];
    setFormData('honorsList', updated);
  };

  // Handle honor field change
  const handleHonorsChange = (idx: number, value: string) => {
    const updated = Array.isArray(formData.honorsList) ? [...formData.honorsList] : [];
    while (updated.length <= idx) {
      updated.push({ honor: '' });
    }
    updated[idx] = { honor: value };
    setFormData('honorsList', updated);
  };

  // Define generatePdf with useCallback before any useEffects that use it
  const generatePdf = useCallback(async () => {
    if (isGenerating && !isFirstRender.current) return;

    setIsGenerating(true);
    try {
      // Pass formData directly, templates expect arrays/objects
      const dataForPdf = { ...formData };
      
      // Generate the PDF blob with error handling
      let blob;
      try {
        // Pass the dataForPdf directly, casting to 'any' to bypass strict type check
        // This assumes the template function can handle the actual structure of formData
        // TODO: Investigate the actual expected type for the template function for a safer fix
        blob = await pdf(template(templateID, dataForPdf as any)).toBlob();
      } catch (pdfError) {
        console.error("Error generating PDF blob:", pdfError);
        setIsGenerating(false);
        return;
      }
      
      // Create the URL with additional error handling
      let newUrl;
      try {
        newUrl = URL.createObjectURL(blob);
      } catch (urlError) {
        console.error("Error creating blob URL:", urlError);
        setIsGenerating(false);
        return;
      }

      // Store the new PDF in the inactive slot with proper cleanup
      if (isPrimaryActive) {
        // Clean up secondary URL before setting new one
        if (secondaryPdfUrl) {
          try {
            URL.revokeObjectURL(secondaryPdfUrl);
          } catch (e) {
            console.warn("Error revoking secondary URL:", e);
          }
        }
        setSecondaryPdfUrl(newUrl);
      } else {
        // Clean up primary URL before setting new one
        if (primaryPdfUrl) {
          try {
            URL.revokeObjectURL(primaryPdfUrl);
          } catch (e) {
            console.warn("Error revoking primary URL:", e);
          }
        }
        setPrimaryPdfUrl(newUrl);
      }

      // Start transition if we have a PDF already displayed
      if ((primaryPdfUrl || secondaryPdfUrl) && !isFirstRender.current) {
        // Wait for the new PDF to fully load before switching
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
        }

        transitionTimerRef.current = setTimeout(() => {
          setIsPrimaryActive(!isPrimaryActive);
        }, 300); // Transition duration
      } else {
        // First load - no transition needed
        if (!primaryPdfUrl && !secondaryPdfUrl) {
          setPrimaryPdfUrl(newUrl);
          setIsPrimaryActive(true);
        }
      }

      // Save current form data to compare for future changes
      previousFormDataRef.current = { ...formData };

    } catch (error) {
      console.error("Error in PDF generation process:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [formData, isPrimaryActive, isGenerating, primaryPdfUrl, secondaryPdfUrl, template, templateID]);

  useEffect(() => {
    const tab = searchParams?.get("tab") || "personal";
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [activeTab, searchParams]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;
        try {
            // Try to get the resumeID from localStorage first (set when clicking from dashboard)
                const savedResumeID = localStorage.getItem('currentResumeID');
                
                // Get the session data to check if we need to update it
                const sessionData = (await getDoc(doc(db, "sessions", user.uid))).data();

                if (!sessionData){
                    throw new Error("Error retrieving session data");
                }

                // If there's a saved resumeID that doesn't match the session, we need to load the correct resume
                if (savedResumeID && sessionData.resumeID !== savedResumeID) {
                    console.log("Loading resume from saved ID:", savedResumeID);
                    
                    // Get the specific resume data
                    const resumeData = (await getDoc(doc(db, "user_resumes", user.uid, "resumes", savedResumeID))).data();
                    
                    if (resumeData) {
                        // Update the session with the correct resumeID and data
                        await setDoc(doc(db, "sessions", user.uid), {
                            formData: resumeData.formData,
                            resumeID: savedResumeID,
                            templateID: resumeData.templateID
                        }, { merge: false });
                        
                        // Reload the session data
                        const updatedSessionData = (await getDoc(doc(db, "sessions", user.uid))).data();
                        if (updatedSessionData && updatedSessionData.formData) {
                            // Set form data from the correct resume
                            Object.entries(updatedSessionData.formData).forEach(([key, value]) => {
                                setFormData(key as string, value as FormDataValue);
                            });
                            
                            // Initialize customPersonalFields if they exist
                            if (updatedSessionData.formData.customPersonal && Array.isArray(updatedSessionData.formData.customPersonal)) {
                                setCustomPersonalFields(updatedSessionData.formData.customPersonal);
                            }
                            
                            setTemplateID(updatedSessionData.templateID);
                            return; // Exit early as we've already set the data
                        }
                    }
                }
                
                // If we didn't need to update the session or couldn't find the resume,
                // just load the current session data
                if (sessionData.formData) {
                    // Set the entire formData object at once through context
                    Object.entries(sessionData.formData).forEach(([key, value]) => {
                        // Cast the value to the correct type to fix type error
                        setFormData(key as string, value as FormDataValue);
                    });
                    
                    // Initialize customPersonalFields if they exist in the loaded data
                    if (sessionData.formData.customPersonal && Array.isArray(sessionData.formData.customPersonal)) {
                        setCustomPersonalFields(sessionData.formData.customPersonal);
                    }
                }
                
                setTemplateID(sessionData.templateID);
            } catch(error) {
                console.error("Error fetching session data:", error);
            }
        
    });

    return () => unsubscribe();
  }, []);

  // Generate initial PDF on first load
  useEffect(() => {
    if (!templateID) return;

    if (isFirstRender.current) {
      setIsGenerating(true); // Set generating state immediately
      // Small timeout to ensure UI renders before heavy PDF generation
      setTimeout(() => {
        generatePdf().then(() => {
          setInitialLoadComplete(true);
        });
        isFirstRender.current = false;
      }, 100);
    }
  }, [templateID, generatePdf]); // Added generatePdf as dependency

  // Ensure at least 2 leadership and 2 honors entries to start (but not in render!)
  useEffect(() => {
    if (activeTab === "leadership" && (!Array.isArray(formData.leadership) || formData.leadership.length === 0)) {
      setFormData('leadership', [{ title: '', description: '' }, { title: '', description: '' }]);
    }
    if (activeTab === "honors" && (!Array.isArray(formData.honorsList) || formData.honorsList.length === 0)) {
      setFormData('honorsList', [{ honor: '' }, { honor: '' }]);
    }
  }, [activeTab]);

  // Check if form data has actually changed
  const hasFormDataChanged = useMemo(() => {
    if (isFirstRender.current) return true;

    // Do a deep comparison of current and previous form data
    const prevData = previousFormDataRef.current;
    const currData = formData;

    for (const key in currData) {
      if (JSON.stringify(currData[key]) !== JSON.stringify(prevData[key])) {
        return true;
      }
    }

    return false;
  }, [formData]);

  // Improved PDF generation with debouncing
  useEffect(() => {
    // Don't regenerate if form data hasn't changed or during initial load
    if (!hasFormDataChanged || isFirstRender.current) return;

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer with a short debounce for instant feedback
    debounceTimerRef.current = setTimeout(() => {
      generatePdf();
    }, 100); // 100ms debounce for more responsive updates

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [formData, hasFormDataChanged]);

  useEffect(() => {
    if (!primaryPdfUrl && !secondaryPdfUrl) return;
    previousFormDataRef.current = { ...formData };
  }, [primaryPdfUrl, secondaryPdfUrl]);

  // Clean up URLs on component unmount
  useEffect(() => {
    return () => {
      if (primaryPdfUrl) {
        URL.revokeObjectURL(primaryPdfUrl);
      }
      if (secondaryPdfUrl) {
        URL.revokeObjectURL(secondaryPdfUrl);
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const renderFields = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoPanel
            formData={formData}
            setFormData={setFormData}
            customFields={customPersonalFields}
            onFieldChange={handleCustomFieldChange}
            onAddField={addCustomField}
          />
        );
      case "experience":
        return (
          <ExperiencePanel
            experience={
              Array.isArray(formData.experience)
                ? formData.experience.map((entry) => ({
                    title: typeof entry.title === "string" ? entry.title : "",
                    company: typeof entry.company === "string" ? entry.company : "",
                    years: typeof entry.years === "string" ? entry.years : "",
                  }))
                : []
            }
            onChange={handleExperienceChange}
            onAdd={addExperience}
          />
        );
      case "education":
        return (
          <EducationPanel
            education={
              Array.isArray(formData.education)
                ? formData.education.map((entry) => ({
                    degree: typeof entry.degree === "string" ? entry.degree : "",
                    institution: typeof entry.institution === "string" ? entry.institution : "",
                    years: typeof entry.years === "string" ? entry.years : "",
                  }))
                : []
            }
            onChange={handleEducationChange}
            onAdd={addEducation}
          />
        );
      case "additional":
        return (
          <AdditionalPanel
            value={typeof formData.skillsInterests === 'string' ? formData.skillsInterests : ''}
            onChange={handleInputChange}
          />
        );
      case "leadership":
        return (
          <LeadershipPanel
            leadership={(Array.isArray(formData.leadership) ? formData.leadership : []) as {title: string, description: string}[]}
            onChange={handleLeadershipChange}
            onAdd={addLeadership}
          />
        );
      case "honors":
        return (
          <HonorsPanel
            honorsList={(Array.isArray(formData.honorsList) ? formData.honorsList : []) as {honor: string}[]}
            onChange={handleHonorsChange}
            onAdd={addHonor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F8F8F8] flex w-full h-full overflow-hidden">
      {/* Top banner and storage mode toggle removed */}
      
      <div className="w-[38%] flex flex-col bg-[#F8F8F8] h-full overflow-auto">
        {renderFields()}
      </div>
      <div className="flex-1 overflow-auto bg-[#F8F8F8] h-full">
        <div className="w-full h-full flex flex-col">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div className={`flex-1 overflow-auto max-h-full relative bg-[#F8F8F8]`}>
              {/* PDF content container with fade-in animation */}
              <div className={`w-full h-full ${initialLoadComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-[#F8F8F8]`}>
                <div className="pdf-container bg-[#F8F8F8]" style={{
                  minWidth: '100%',
                  minHeight: '100%',
                  width: zoom > 100 ? `${zoom}%` : '100%',
                  height: '100%'
                }}>
                  {/* Primary PDF Layer */}
                  <div
                    className={`absolute bg-[#F8F8F8] top-0 left-0 w-full h-full transition-opacity duration-300 ${
                      isPrimaryActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                  >
                    {primaryPdfUrl && <ViewerNoSSR key={primaryPdfUrl} fileUrl={primaryPdfUrl} />}
                  </div>

                  {/* Secondary PDF Layer */}
                  <div
                    className={`absolute bg-[#F8F8F8] top-0 left-0 w-full h-full transition-opacity duration-300 ${
                      !isPrimaryActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                  >
                    {secondaryPdfUrl && <ViewerNoSSR key={secondaryPdfUrl} fileUrl={secondaryPdfUrl} />}
                  </div>
                </div>
              </div>

              {/* Initial loading indicator - shows before any PDF is ready */}
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#F8F8F8]
                  ${initialLoadComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
                  transition-opacity duration-500 z-20`}
              >
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-[#435058] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Preparing your document...</p>
                </div>
              </div>
            </div>
          </Worker>
        </div>
      </div>
      {/* Save indicator */}
      {isSaving && (
        <div className="fixed top-4 right-4 flex items-center bg-navy text-white border border-gray-300 shadow-md px-2 py-2 rounded-lg z-50">
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          <span className="text-white text-sm font-semibold">Saving...</span>
        </div>
      )}
    </div>
  );
};

export default InputFields;