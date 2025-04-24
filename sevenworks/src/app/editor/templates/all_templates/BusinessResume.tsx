import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Define proper formData interface
interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
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
  fontSize?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  leadership?: LeadershipEntry[];
  honorsList?: { honor: string }[];
  skillsInterests?: string;
  customPersonal?: { id: number; label: string; value: string }[];
  [key: string]: unknown;
}

interface TemplateProps {
  formData: FormData;
}

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/ARIAL.TTF", fontWeight: "normal" },
    { src: "/fonts/ARIALBD.TTF", fontWeight: "bold" },
    { src: "/fonts/ARIALI.TTF", fontStyle: "italic" },
    { src: "/fonts/ARIALBI.TTF", fontWeight: "bold", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
    fontSize: 10,
    padding: 30,
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contact: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
  },
  subsection: {
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

const BusinessResume = ({ formData }: TemplateProps) => {
  // Helper function to check if a data array has content
  const hasContent = (arr: any[] | undefined, fields: string[]) => {
    return Array.isArray(arr) && arr.length > 0 && arr.some(item => 
      fields.some(field => item[field] && String(item[field]).trim() !== '')
    );
  };

  // Set proper font size and font family based on formData
  const dynamicStyles = StyleSheet.create({
    page: {
      fontFamily: formData.font || "Arial",
      fontSize: formData.fontSize || 10,
      padding: 30,
      lineHeight: 1.3,
    },
    name: {
      fontSize: (formData.fontSize || 10) + 6,
      fontWeight: "bold",
      marginBottom: 5,
    }
  });

  return (
    <Document>
      <Page size="LETTER" style={dynamicStyles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={dynamicStyles.name}>
              {formData.firstName || "JOHN"} {formData.middleName ? formData.middleName + " " : ""}
              {formData.lastName || "BUSINESS"}
            </Text>
            {formData.address && <Text style={styles.contact}>{formData.address}</Text>}
          </View>
          <View style={styles.headerRight}>
            {formData.email && <Text style={styles.contact}>{formData.email}</Text>}
            {formData.phone && <Text style={styles.contact}>{formData.phone}</Text>}
          </View>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.subsection}>
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>{edu.institution || ""}</Text>
                  <Text>{edu.years || ""}</Text>
                </View>
                <Text style={styles.italic}>{edu.degree || ""}</Text>
              </View>
            ))
          ) : (
            <View style={styles.subsection}>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>University of Business</Text>
                <Text>2018 - 2022</Text>
              </View>
              <Text style={styles.italic}>Bachelor of Business Administration</Text>
              <Text>GPA: 3.8/4.0, Dean's List</Text>
            </View>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.subsection}>
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.italic}>{exp.title || ""}</Text>
                <Text style={styles.bullet}>• Managed cross-functional teams and delivered projects on schedule</Text>
                <Text style={styles.bullet}>• Improved operational efficiency by implementing innovative solutions</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.subsection}>
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Business Consulting Firm</Text>
                  <Text>Jan 2022 - Present</Text>
                </View>
                <Text style={styles.italic}>Business Analyst</Text>
                <Text style={styles.bullet}>• Analyze business processes and identify areas for improvement</Text>
                <Text style={styles.bullet}>• Develop strategic recommendations based on data analysis</Text>
                <Text style={styles.bullet}>• Create and present detailed reports to executive leadership</Text>
              </View>
              <View style={styles.subsection}>
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Financial Services Company</Text>
                  <Text>May 2020 - Dec 2021</Text>
                </View>
                <Text style={styles.italic}>Financial Analyst Intern</Text>
                <Text style={styles.bullet}>• Assisted in financial forecasting and budget preparation</Text>
                <Text style={styles.bullet}>• Conducted market research and prepared competitive analysis</Text>
              </View>
            </>
          )}
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leadership & Activities</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.subsection}>
                <Text style={styles.bold}>{lead.title || ""}</Text>
                <Text style={styles.bullet}>• {lead.description || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.subsection}>
                <Text style={styles.bold}>Business Students Association</Text>
                <Text style={styles.italic}>Vice President</Text>
                <Text style={styles.bullet}>• Led a team of 5 officers in organizing networking events and workshops</Text>
                <Text style={styles.bullet}>• Increased membership by 25% through targeted recruitment campaigns</Text>
              </View>
              <View style={styles.subsection}>
                <Text style={styles.bold}>Volunteer Financial Literacy Program</Text>
                <Text style={styles.italic}>Volunteer Instructor</Text>
                <Text style={styles.bullet}>• Taught financial literacy to high school students in underserved communities</Text>
                <Text style={styles.bullet}>• Developed curriculum materials focused on personal finance</Text>
              </View>
            </>
          )}
        </View>

        {/* Honors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Honors & Awards</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• Dean's List Scholar (All semesters)</Text>
              <Text style={styles.bullet}>• Business Leadership Award, 2021</Text>
              <Text style={styles.bullet}>• National Business Merit Scholarship</Text>
            </>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Interests</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <Text><Text style={styles.bold}>Technical Skills:</Text> Microsoft Excel (advanced), PowerPoint, Tableau, SQL, SAP</Text>
              <Text><Text style={styles.bold}>Languages:</Text> English (native), Spanish (professional working proficiency)</Text>
              <Text><Text style={styles.bold}>Certifications:</Text> Bloomberg Market Concepts, Google Analytics</Text>
              <Text><Text style={styles.bold}>Interests:</Text> Market analysis, entrepreneurship, financial markets, business innovation</Text>
            </>
          )}
        </View>

        {/* Custom Personal Fields Section if available */}
        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && formData.customPersonal.some(field => field.label && field.value) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            {formData.customPersonal.map((field) => (
              field.label && field.value && (
                <Text key={field.id} style={styles.bullet}>
                  • <Text style={styles.bold}>{field.label}:</Text> {field.value}
                </Text>
              )
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BusinessResume;
