"use client"
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Resume } from "./templates/page";
import { Document, Page, Text } from "@react-pdf/renderer";

/* All Templates */
import BusinessResume from "./TEST-TEMPLATES/businessResume";


interface Props {
    resume: Resume | null;
    loading: boolean;
    setResume: (resume: Resume | null) => void;
    template: (formData: {[key: string]: string}) => React.JSX.Element;
}

const ResumeContext = createContext<Props>({
    resume: null, 
    loading: true, 
    setResume: () => {}, 
    template: () => {return(<Page></Page>)}
});

export function ResumeProvider({children}: {children: ReactNode}){
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);

    /* Once page is rendered, store resume info in localStorage */
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedResume = localStorage.getItem("resume");
            if (storedResume) {
                setResume(JSON.parse(storedResume));
            }
        }
    }, []);

    /* Every time resume data changes, update localStorage */
    useEffect(() => {
        if (typeof window !== "undefined" && resume !== null) {
            localStorage.setItem("resume", JSON.stringify(resume));
        }
    }, [resume]);
    
    /* Manage loading state */
    useEffect(() => {
        if (resume !== null){
            setLoading(false);
        }
        else {
            setLoading(true);
        }
    }, [resume]);

    /* Store template file that corresponds to resume title */
    const template = (formData: {[key: string]: string}) => {
        if (!resume) {
            return (
                <Document>
                    <Page size = "A4" style={{fontSize: 30}}>
                        <Text>No template loaded</Text>
                    </Page>
                </Document>
            );
        }

        switch (resume.title) {
            case "Business Resume": return (<BusinessResume formData={formData} />);
            default: {
                return (
                    <Document>
                        <Page size = "A4" style={{fontSize: 30}}>
                            <Text>Template name mismatch</Text>
                        </Page>
                    </Document>
                )
            }
        }
    }

    return (
        <ResumeContext.Provider value={{resume, loading, setResume, template}}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    return useContext(ResumeContext);
}