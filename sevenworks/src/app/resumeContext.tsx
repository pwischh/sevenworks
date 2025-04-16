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
    const template = (templateID: string | null, formData: { [key: string]: string }) => {
        if (!templateID) {
            return (
                <Document>
                    <Page size = "A4" style={{fontSize: 30}}>
                        <Text>No template loaded</Text>
                    </Page>
                </Document>
            );
        }

        switch (templateID) {
            case "Business Resume": return (<BusinessResume formData={formData} />);
            case "Data Analytics Resume": return (<DataAnalystResume formData={formData} />);
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
        <ResumeContext.Provider value={template}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    return useContext(ResumeContext);
}