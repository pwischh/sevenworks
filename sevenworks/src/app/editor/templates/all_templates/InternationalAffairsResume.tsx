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
  bullets?: string[]; // Adding bullets array for experience entries
}

interface LeadershipEntry {
  title: string;
  description?: string;
  role?: string;
  years?: string;
  bullets?: string[]; // Adding bullets array for leadership entries
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

// Register fonts
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
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  contact: {
    textAlign: "center",
    marginBottom: 3,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  organization: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  role: {
    fontStyle: "italic",
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  detailsContainer: {
    marginBottom: 8,
  },
});

const InternationalAffairsResume = ({ formData }: TemplateProps) => {
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
      textAlign: "center",
      marginBottom: 5,
    }
  });

  return (
    <Document>
      <Page size="LETTER" style={dynamicStyles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>
            {formData.firstName || "SOPHIA"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "GLOBAL"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 International Way, Atlanta, GA 30322"} | {formData.phone || "(404) 555-7890"} | {formData.email || "sglobal@emory.edu"}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{edu.institution || ""}</Text>
                  <Text>{edu.years || ""}</Text>
                </View>
                <Text style={styles.role}>{edu.degree || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY UNIVERSITY</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Bachelor of Arts in International Studies, Minor in Economics</Text>
                  <Text>May 2023</Text>
                </View>
                <Text>GPA: 3.85/4.00, Dean's List (All Semesters)</Text>
                <Text>Relevant Coursework: International Relations Theory, Global Political Economy, Diplomatic History, International Security, International Organizations, Middle East Politics, International Law</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>SCIENCES PO PARIS</Text>
                  <Text>Paris, France</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Study Abroad, Political Science and International Relations</Text>
                  <Text>Fall 2021</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.role}>{exp.title || ""}</Text>
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 && exp.bullets.map((bullet, bulletIdx) => (
                  <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>U.S. DEPARTMENT OF STATE, BUREAU OF EUROPEAN AND EURASIAN AFFAIRS</Text>
                  <Text>Washington, DC</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Policy and Research Intern</Text>
                  <Text>May – Aug 2022</Text>
                </View>
                <Text style={styles.bullet}>• Drafted and edited daily briefing materials on EU-US relations and NATO policy development</Text>
                <Text style={styles.bullet}>• Researched and analyzed political and economic developments in Eastern Europe</Text>
                <Text style={styles.bullet}>• Prepared background materials for diplomatic engagements and official meetings</Text>
                <Text style={styles.bullet}>• Produced weekly reports summarizing regional media coverage of U.S. foreign policy</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>THE CARTER CENTER, CONFLICT RESOLUTION PROGRAM</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Research Assistant</Text>
                  <Text>Jan – May 2022</Text>
                </View>
                <Text style={styles.bullet}>• Conducted research on peace processes and conflict resolution strategies in Syria and South Sudan</Text>
                <Text style={styles.bullet}>• Compiled and analyzed data on political violence and ceasefire violations</Text>
                <Text style={styles.bullet}>• Assisted in organizing roundtable discussions with international stakeholders</Text>
              </View>
            </>
          )}
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEADERSHIP & ACTIVITIES</Text>
          {hasContent(formData.leadership, ['title']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{lead.title || ""}</Text>
                  <Text>{lead.years || ""}</Text>
                </View>
                {lead.role && <Text style={styles.role}>{lead.role}</Text>}
                {lead.description && <Text style={styles.bullet}>• {lead.description}</Text>}
                {Array.isArray(lead.bullets) && lead.bullets.length > 0 && lead.bullets.map((bullet, bulletIdx) => (
                  <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY INTERNATIONAL RELATIONS ASSOCIATION</Text>
                  <Text>2020 – Present</Text>
                </View>
                <Text style={styles.role}>Vice President (2022-23), Model UN Committee Chair (2021-22)</Text>
                <Text style={styles.bullet}>• Lead executive board of 8 officers in planning campus events and conferences</Text>
                <Text style={styles.bullet}>• Organize annual Model UN conference hosting 300+ delegates from 25 universities</Text>
                <Text style={styles.bullet}>• Coordinate speaker series featuring diplomats and international affairs experts</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY JOURNAL OF INTERNATIONAL AFFAIRS</Text>
                  <Text>2019 – Present</Text>
                </View>
                <Text style={styles.role}>Senior Editor</Text>
                <Text style={styles.bullet}>• Review and edit undergraduate submissions on global politics, economics, and security</Text>
                <Text style={styles.bullet}>• Published article: "The Evolution of EU Migration Policy in Response to the Syrian Refugee Crisis"</Text>
              </View>
            </>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS & QUALIFICATIONS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <Text style={styles.bullet}>• Languages: English (native), French (fluent), Arabic (intermediate), Spanish (basic)</Text>
              <Text style={styles.bullet}>• Research Skills: Policy analysis, data visualization, qualitative and quantitative research methods</Text>
              <Text style={styles.bullet}>• Technical Skills: Proficient in R, Stata, Bloomberg Terminal, ArcGIS; Advanced Microsoft Office Suite</Text>
              <Text style={styles.bullet}>• Regional Expertise: Middle East and North Africa, European Union, Transatlantic Relations</Text>
            </>
          )}
        </View>

        {/* Honors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HONORS & AWARDS</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• Emory University Woodruff Scholar, Full Merit Scholarship (2019-2023)</Text>
              <Text style={styles.bullet}>• Outstanding Delegate Award, National Model United Nations Conference (2022)</Text>
              <Text style={styles.bullet}>• Foreign Language and Area Studies (FLAS) Fellowship for Arabic Study (Summer 2021)</Text>
              <Text style={styles.bullet}>• Institute for International Public Policy Fellowship (2020-2023)</Text>
            </>
          )}
        </View>

        {/* Custom Personal Fields Section if available */}
        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && formData.customPersonal.some(field => field.label && field.value) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
            {formData.customPersonal.map((field) => (
              field.label && field.value && (
                <Text key={field.id} style={styles.bullet}>
                  • <Text style={{ fontWeight: 'bold' }}>{field.label}:</Text> {field.value}
                </Text>
              )
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default InternationalAffairsResume;
