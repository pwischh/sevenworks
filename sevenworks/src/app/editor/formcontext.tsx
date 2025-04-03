import { createContext, useState, ReactNode, useContext } from "react";

type CustomPersonalField = { id: number; label: string; value: string };

interface FormContextType {
  formData: { [key: string]: string | CustomPersonalField[] };
  setFormData: (key: string, value: string | CustomPersonalField[]) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<{ [key: string]: string | CustomPersonalField[] }>({});

  const setFormData = (key: string, value: string | CustomPersonalField[]) => {
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