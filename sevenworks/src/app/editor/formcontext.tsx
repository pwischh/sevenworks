import { createContext, useState, ReactNode, useContext } from "react";

type ExperienceEntry = { title: string; company: string; years: string };
type EducationEntry = { degree: string; institution: string; years: string };
type CustomPersonalField = { id: number; label: string; value: string };

interface FormData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  customPersonal?: CustomPersonalField[];
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  additionalInfo?: string;
  [key: string]: any;
}

interface FormContextType {
  formData: FormData;
  setFormData: (key: keyof FormData, value: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({});

  const setFormData = (key: keyof FormData, value: any) => {
    setFormDataState((prev) => ({ ...prev, [key]: value }));
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