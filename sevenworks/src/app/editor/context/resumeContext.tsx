"use client"
import React, { ReactNode, createContext, useContext } from "react";
import { DocumentProps, Document, Page, Text } from "@react-pdf/renderer";

/* Import from centralized templates index */
import templates from "../templates/index";

interface EducationEntry {
    degree: string;
    institution: string;
    years: string; // Changed from 'year' to 'years' to match the expected type
}
  
interface ExperienceEntry {
    title: string;
    company: string;
    years: string;
}

interface LeadershipEntry {
    title: string;
    description: string;
}

interface FormData {
    font?: string;
    fontSize?: number; // Add fontSize property
    firstName?: string;
    middleName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
    education?: EducationEntry[]; // Changed to use the properly defined EducationEntry
    experience?: ExperienceEntry[];
    leadership?: LeadershipEntry[];
    honorsList?: { honor: string }[];
    skillsInterests?: string;
    customPersonal?: { id: number; label: string; value: string }[]; // Support for custom fields
    [key: string]: unknown; // Using unknown instead of any for better type safety
}

type Props = (
    templateID: string | null,
    formData: FormData,
) => React.ReactElement<DocumentProps>;

const ResumeContext = createContext<Props>((templateID) => {
    return (
        <Document>
          <Page>
            <Text>{templateID}</Text>
          </Page>
        </Document>
      );
});

export function ResumeProvider({children}: {children: ReactNode}){

    /* Store template file that corresponds to resume title */
    const template = (templateID: string | null, formData: { [key: string]: any }) => {
        if (!templateID) {
            return (
                <Document>
                    <Page size = "A4" style={{fontSize: 30}}>
                        <Text>No template loaded</Text>
                    </Page>
                </Document>
            );
        }

        // Log the templateID for debugging
        console.log("Template ID received:", templateID);

        // Match the template ID to the appropriate template component
        const templateIdLower = templateID.toLowerCase();
        
        // Business resume variants
        if (templateIdLower.includes("business") || templateIdLower === "business-resume") {
            return <templates.business formData={formData} />;
        }
        
        // Data Analyst resume variants
        if (templateIdLower.includes("data-analyst") || templateIdLower.includes("dataanalyst")) {
            return <templates.dataAnalyst formData={formData} />;
        }
        
        // All other templates mapped from our central index
        if (templateIdLower.includes("journalism")) {
            return <templates.journalism formData={formData} />;
        }
        
        if (templateIdLower.includes("legal") || templateIdLower.includes("law")) {
            return <templates.legal formData={formData} />;
        }
        
        if (templateIdLower.includes("human-services") || templateIdLower.includes("humanservices")) {
            return <templates.humanServices formData={formData} />;
        }
        
        if (templateIdLower.includes("international") || templateIdLower.includes("affairs")) {
            return <templates.internationalAffairs formData={formData} />;
        }
        
        if (templateIdLower.includes("health") || templateIdLower.includes("healthcare")) {
            return <templates.health formData={formData} />;
        }
        
        if (templateIdLower.includes("swe") || templateIdLower.includes("software-engineer")) {
            return <templates.swe formData={formData} />;
        }
        
        if (templateIdLower.includes("it") || templateIdLower.includes("consulting")) {
            return <templates.itConsulting formData={formData} />;
        }
        
        if (templateIdLower.includes("tech") || templateIdLower.includes("technology")) {
            return <templates.technology formData={formData} />;
        }
        
        if (templateIdLower.includes("environment") || templateIdLower.includes("sustainability")) {
            return <templates.environment formData={formData} />;
        }
        
        if (templateIdLower.includes("museum") || templateIdLower.includes("cultural")) {
            return <templates.museum formData={formData} />;
        }
        
        if (templateIdLower.includes("policy") || templateIdLower.includes("public") || templateIdLower.includes("government")) {
            return <templates.publicPolicy formData={formData} />;
        }
        
        if (templateIdLower.includes("business-component") || templateIdLower.includes("businesscomponent")) {
            return <templates.businessComponent formData={formData} />;
        }
        
        // Fallback case - if we can't match, default to a template to avoid errors
        console.error(`Template ID mismatch: ${templateID}`);
        return <templates.business formData={formData} />;
    }

    return (
        <ResumeContext.Provider value={template}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    return useContext(ResumeContext);
}