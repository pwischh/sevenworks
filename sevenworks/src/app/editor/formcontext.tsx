"use client";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

  useEffect(() => {
    async function loadSessionData(){
      const res = await fetch("/api/session/");
      if (res.ok){
        const {sessionData} = await res.json();
        setFormDataState(sessionData?.formData || {});
      }
    }
    loadSessionData();
  }, [])

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
