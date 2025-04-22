"use client"
import React, { ReactNode, createContext, useContext } from "react";
import { DocumentProps, Document, Page, Text } from "@react-pdf/renderer";

/* All Templates */
import BusinessResume from "./TEST-TEMPLATES/businessResume";
import DataAnalystResume from "./TEST-TEMPLATES/DataAnalystResume";

type Props = (
    templateID: string | null,
    formData: { [key: string]: string }
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

        // Fix the issue by correctly handling template file paths
        // The problem is likely due to filename case sensitivity in imports
        // BusinessResume.tsx uses lowercase filename but DataAnalystResume.tsx uses PascalCase
        
        // Import path case handling
        if (templateID.includes("business") || 
            templateID.includes("Business") || 
            templateID === "business-resume" || 
            templateID === "business resume") {
            return <BusinessResume formData={formData} />;
        }
        
        if (templateID.includes("data") || 
            templateID.includes("Data") || 
            templateID === "data-analyst-resume" || 
            templateID === "data analyst resume") {
            return <DataAnalystResume formData={formData} />;
        }
        
        // Fallback case - if we can't match, default to a template to avoid errors
        console.error(`Template ID mismatch: ${templateID}`);
        return <BusinessResume formData={formData} />;
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