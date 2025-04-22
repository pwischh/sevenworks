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
  isSaving: boolean;
  saveFormData: () => Promise<void>;
  isQuotaExceeded: boolean;
  forceLocalMode: boolean;
  toggleSaveMode: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [forceLocalMode, setForceLocalMode] = useState(false);
  const [isClientReady, setIsClientReady] = useState(false);
  const [templateID] = useState<string | null>(null);
  const localStorageKey = 'sevenworks_local_form_data';

  // Use useEffect to handle localStorage after hydration is complete
  useEffect(() => {
    // Only access localStorage client-side after component is mounted
    const savedMode = localStorage.getItem('sevenworks_local_storage_mode');
    setForceLocalMode(savedMode === 'true');
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (!isClientReady || !forceLocalMode) return;
    const resumeID = localStorage.getItem('currentResumeID') || 'default';
    const key = `${localStorageKey}_${resumeID}`;
    localStorage.setItem(key, JSON.stringify(formData));
  }, [formData, isClientReady, forceLocalMode]);

  // Function to save data locally when Firebase quota is exceeded
  const saveDataLocally = (data: FormData) => {
    try {
      // Get resumeID to use as part of the key
      const resumeID = localStorage.getItem('currentResumeID') || 'default';
      const key = `${localStorageKey}_${resumeID}`;
      
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(data));
      console.log('Data saved locally due to quota limitations');
      return true;
    } catch (error) {
      console.error('Error saving data locally:', error);
      return false;
    }
  };

  // Function to load session data from Firestore or localStorage if quota exceeded
  const loadSessionData = async () => {
    try {
      // Check if user is authenticated
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      
      // Get the resumeID from localStorage
      const savedResumeID = localStorage.getItem('currentResumeID') || 'default';
      
      // Try to get data from Firebase first
      try {
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
        console.error("Error loading session data from Firebase:", error);
        
        // If quota exceeded, try to load from localStorage
        if (error.toString().includes('resource-exhausted') || 
            error.toString().includes('Quota exceeded')) {
          setIsQuotaExceeded(true);
          console.log("Firebase quota exceeded. Attempting to load data from localStorage...");
          
          // Try to load data from localStorage
          const localKey = `${localStorageKey}_${savedResumeID}`;
          const localData = localStorage.getItem(localKey);
          
          if (localData) {
            try {
              const parsedData = JSON.parse(localData);
              setFormDataState(parsedData);
              console.log("Successfully loaded data from localStorage");
            } catch (parseError) {
              console.error("Error parsing local data:", parseError);
            }
          }
        }
      }
    } catch (outerError) {
      console.error("Error in loadSessionData:", outerError);
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

  const setFormData = (key: string, value: FormDataValue) => {
    // Only update the local state without saving to Firebase
    if (key === "RESET") {
      setFormDataState({});
    } else {
      const updatedFormData = { ...formData, [key]: value };
      setFormDataState(updatedFormData);
    }
  };

  const saveFormData = async () => {
    try {
      setIsSaving(true); // Show saving indicator
      console.log("Manually saving data...");
      
      // If user has forced local mode or quota is exceeded, save locally only
      if (forceLocalMode || isQuotaExceeded) {
        console.log("Saving locally due to " + (forceLocalMode ? "user preference" : "quota limitations"));
        
        // Make sure to save to localStorage properly
        const resumeID = localStorage.getItem('currentResumeID') || 'default';
        const key = `${localStorageKey}_${resumeID}`;
        localStorage.setItem(key, JSON.stringify(formData));
        
        // Also save the resumeID and templateID for future reference
        localStorage.setItem('currentTemplateID', templateID || 'default');
        
        console.log("Data saved locally successfully to key:", key);
        
        // Add a small delay to make the saving indicator visible
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
      }
      
      // Try to save to Firebase first
      try {
        // Update the session document
        await setDoc(
          doc(db, "sessions", auth.currentUser?.uid || ""), 
          { formData }, 
          { merge: true }
        );

        // Get the current resumeID from localStorage
        const resumeID = localStorage.getItem('currentResumeID');
        
        // Update the actual resume document if we have a resumeID
        if (resumeID) {
          await setDoc(
            doc(db, "user_resumes", auth.currentUser?.uid || "", "resumes", resumeID), 
            { formData }, 
            { merge: true }
          );
        }
        
        console.log("Data saved to Firebase successfully");
        // Ensure the quota flag is false if save succeeds
        setIsQuotaExceeded(false);
      } catch (firebaseError) {
        console.error("Error saving to Firebase:", firebaseError);
        
        // Check if error is due to quota exceeded
        if (firebaseError.toString().includes('resource-exhausted') || 
            firebaseError.toString().includes('Quota exceeded')) {
          console.warn("Firebase quota exceeded, falling back to local storage");
          // Force set the quota exceeded flag to ensure notification shows
          setIsQuotaExceeded(true);
          
          // Save to localStorage as fallback
          const localSaveSuccess = saveDataLocally(formData);
          
          if (localSaveSuccess) {
            console.log("Data saved locally as fallback");
            // Keep the quota notification visible for a while to ensure user sees it
            setTimeout(() => {
              alert("Firebase quota exceeded - Your changes are now being saved locally only");
            }, 500);
          } else {
            throw new Error("Failed to save data locally after Firebase quota exceeded");
          }
        } else {
          throw firebaseError; // Rethrow if not a quota error
        }
      }
    } catch (error) {
      console.error("Error in save process:", error);
    } finally {
      setIsSaving(false); // Always hide the saving indicator
    }
  };

  const toggleSaveMode = () => {
    setForceLocalMode((prevMode) => {
      const newMode = !prevMode;
      console.log(`Switching save mode to ${newMode ? 'local' : 'cloud'} storage`);
      
      // If switching to local mode, verify we can access localStorage
      if (newMode) {
        try {
          // Test localStorage access
          const testKey = `${localStorageKey}_test`;
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);
          
          // If we get here, localStorage is working
        } catch (error) {
          console.error('Cannot access localStorage for local saving mode:', error);
          alert('Unable to enable local storage mode. Your browser may have restrictions on localStorage.');
          return prevMode; // Keep previous mode if localStorage isn't available
        }
      }
      
      // Save the mode to localStorage so it persists across page refreshes
      localStorage.setItem('sevenworks_local_storage_mode', newMode.toString());
      
      return newMode;
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, isSaving, saveFormData, isQuotaExceeded, forceLocalMode, toggleSaveMode }}>
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
