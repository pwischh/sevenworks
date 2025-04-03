import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface FormContextType {
  formData: { [key: string]: string };
  setFormData: (key: string, value: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function loadSessionData(){
      const res = await fetch("/api/session/");
      if (res.ok){
        const {sessionData} = await res.json();
        console.log("Session data: ", sessionData);
        setFormDataState(sessionData?.formData || {});
      }
    }
    loadSessionData();
  }, [])

  const setFormData = async (key: string, value: string) => {
    const updatedFormData = { ...formData, [key]: value };
    setFormDataState(updatedFormData);
    const currentUser = auth.currentUser;

    if (currentUser){
      try {
        await setDoc(doc(db, "sessions", currentUser.uid), {formData: updatedFormData}, {merge: true});
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