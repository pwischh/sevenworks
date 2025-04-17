"use client";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Define a more specific type for array values to replace any[]
type FormDataValue = string | number | boolean | null | undefined | Record<string, unknown>[] | Record<string, unknown>;
type FormData = { [key: string]: FormDataValue };

interface FormContextType {
  formData: FormData;
  setFormData: (key: string, value: FormDataValue) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({});

  // Function to load session data from Firestore
  const loadSessionData = async () => {
    try {
      // Check if user is authenticated
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      
      // Get the resumeID from localStorage (if it exists)
      const savedResumeID = localStorage.getItem('currentResumeID');
      
      // Get current session data
      const userSessionRef = doc(db, "sessions", currentUser.uid);
      const userSession = await getDoc(userSessionRef);
      const sessionData = userSession.data();
      
      // Check if we need to load a specific resume based on localStorage
      if (savedResumeID && sessionData?.resumeID !== savedResumeID) {
        console.log("Form context loading resume from saved ID:", savedResumeID);
        
        // Load the specific resume from the user's resumes collection
        const resumeRef = doc(db, "user_resumes", currentUser.uid, "resumes", savedResumeID);
        const resumeSnapshot = await getDoc(resumeRef);
        const resumeData = resumeSnapshot.data();
        
        if (resumeData?.formData) {
          // Update both state and session with the correct resume data
          setFormDataState(resumeData.formData);
          
          // Update the session document to match this resume
          await setDoc(userSessionRef, {
            formData: resumeData.formData,
            resumeID: savedResumeID,
            templateID: resumeData.templateID
          }, { merge: false });
          
          console.log("Loaded and synced form data for resume:", savedResumeID);
          return;
        }
      }
      
      // If no specific resume needed to be loaded, or if that failed,
      // just use the current session data
      if (sessionData?.formData) {
        setFormDataState(sessionData.formData);
        console.log("Loaded form data from current session");
      }
    } catch (error) {
      console.error("Error loading session data:", error);
    }
  };

  useEffect(() => {
    // Load data on component mount
    loadSessionData();
    
    // Set up a listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadSessionData();
      } else {
        // Clear form data if user signs out
        setFormDataState({});
      }
    });
    
    return () => unsubscribe();
  }, []);

  const setFormData = async (key: string, value: FormDataValue) => {
    const updatedFormData = { ...formData, [key]: value };
    if (key === "RESET") {
      setFormDataState({});
    }
    else {
      setFormDataState(updatedFormData);
    }
    
    const currentUser = auth.currentUser;

    if (currentUser){
      try {
        await setDoc(doc(db, "sessions", currentUser.uid), 
          {formData: (key === "RESET" ? {} : updatedFormData),}, 
          {merge: (key === "RESET" ? false : true)});

        const userSessionRef = doc(db, "sessions", currentUser.uid);
        const userSession = await getDoc(userSessionRef);
        const userSessionData = userSession.data();

        if (!userSessionData) {
          throw new Error("Unable to retrieve user session data");
        }
        const resumeID = userSessionData.resumeID;

        await setDoc(doc(db, "user_resumes", currentUser.uid, "resumes", resumeID), {formData: updatedFormData}, {merge: true});
      } catch (error) {
        console.log("Error updating session data: ", error);
      }
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
