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

const LawResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "TAYLOR"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "JUSTICE"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Legal Avenue, Atlanta, GA 30322"} | {formData.phone || "(404) 555-6789"} | {formData.email || "tjustice@emory.edu"}
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
                  <Text style={styles.organization}>EMORY UNIVERSITY SCHOOL OF LAW</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Juris Doctor</Text>
                  <Text>May 2023</Text>
                </View>
                <Text style={styles.bullet}>• GPA: 3.75/4.00, Top 15% of class</Text>
                <Text style={styles.bullet}>• Emory Law Journal, Articles Editor</Text>
                <Text style={styles.bullet}>• Moot Court Society, Member</Text>
                <Text style={styles.bullet}>• Legal Aid Society, Student Attorney</Text>
                <Text style={styles.bullet}>• Relevant Coursework: Constitutional Law, Contracts, Criminal Law, Civil Procedure, Property, Torts, Evidence, Business Associations, Administrative Law</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>UNIVERSITY OF GEORGIA</Text>
                  <Text>Athens, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Bachelor of Arts in Political Science, Minor in Philosophy</Text>
                  <Text>May 2020</Text>
                </View>
                <Text style={styles.bullet}>• GPA: 3.85/4.00, Magna Cum Laude</Text>
                <Text style={styles.bullet}>• Phi Beta Kappa Honor Society</Text>
                <Text style={styles.bullet}>• Presidential Scholar</Text>
              </View>
            </>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL EXPERIENCE</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.role}>{exp.title || ""}</Text>
                <Text style={styles.bullet}>• Conducted legal research and drafted memoranda on complex legal issues</Text>
                <Text style={styles.bullet}>• Assisted with case preparation and document review for litigation matters</Text>
                <Text style={styles.bullet}>• Participated in client interviews and court proceedings under attorney supervision</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>KING & SPALDING LLP</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Summer Associate</Text>
                  <Text>May – July 2022</Text>
                </View>
                <Text style={styles.bullet}>• Conducted legal research and drafted memoranda on issues in corporate, litigation, and regulatory matters</Text>
                <Text style={styles.bullet}>• Prepared due diligence reports for M&A transactions valued at over $100 million</Text>
                <Text style={styles.bullet}>• Assisted in drafting motions, briefs, and discovery requests for complex commercial litigation</Text>
                <Text style={styles.bullet}>• Participated in pro bono asylum case, interviewing client and drafting affidavit</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>U.S. DISTRICT COURT, NORTHERN DISTRICT OF GEORGIA</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Judicial Intern, Hon. Judge Sarah E. Thompson</Text>
                  <Text>Jan – Apr 2022</Text>
                </View>
                <Text style={styles.bullet}>• Researched legal issues and drafted bench memoranda for civil and criminal cases</Text>
                <Text style={styles.bullet}>• Observed courtroom proceedings, including trials, hearings, and settlement conferences</Text>
                <Text style={styles.bullet}>• Assisted in drafting judicial opinions on motions for summary judgment and motions to dismiss</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>DEKALB COUNTY DISTRICT ATTORNEY'S OFFICE</Text>
                  <Text>Decatur, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Legal Intern, Major Case Division</Text>
                  <Text>May – Aug 2021</Text>
                </View>
                <Text style={styles.bullet}>• Conducted legal research and drafted memoranda on criminal procedure and evidence issues</Text>
                <Text style={styles.bullet}>• Assisted ADAs in preparing for felony trials, including witness interviews and evidence review</Text>
                <Text style={styles.bullet}>• Observed court proceedings, including bond hearings, arraignments, and trials</Text>
              </View>
            </>
          )}
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEADERSHIP & ACTIVITIES</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <Text style={styles.organization}>{lead.title || ""}</Text>
                <Text style={styles.bullet}>• {lead.description || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY LAW MOOT COURT SOCIETY</Text>
                  <Text>2021 – 2023</Text>
                </View>
                <Text style={styles.role}>Member</Text>
                <Text style={styles.bullet}>• Competed in National Appellate Advocacy Competition, advanced to regional semifinals</Text>
                <Text style={styles.bullet}>• Drafted appellate briefs and presented oral arguments on complex constitutional issues</Text>
                <Text style={styles.bullet}>• Received Best Brief Award at internal competition</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY LAW STUDENT BAR ASSOCIATION</Text>
                  <Text>2021 – 2022</Text>
                </View>
                <Text style={styles.role}>Class Representative</Text>
                <Text style={styles.bullet}>• Served as liaison between student body and administration on academic and community issues</Text>
                <Text style={styles.bullet}>• Organized networking events connecting students with legal professionals</Text>
                <Text style={styles.bullet}>• Advocated for expanded clinical opportunities and course offerings</Text>
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
              <Text style={styles.bullet}>• Legal Research: Westlaw, LexisNexis, Bloomberg Law, HeinOnline</Text>
              <Text style={styles.bullet}>• Technology: Microsoft Office Suite, Clio, Relativity, TrialDirector</Text>
              <Text style={styles.bullet}>• Languages: English (native), Spanish (proficient)</Text>
              <Text style={styles.bullet}>• Bar Admission: Georgia Bar Exam scheduled for July 2023</Text>
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
              <Text style={styles.bullet}>• Dean's List (All Semesters)</Text>
              <Text style={styles.bullet}>• Emory Law Merit Scholarship Recipient</Text>
              <Text style={styles.bullet}>• CALI Excellence for the Future Award in Constitutional Law</Text>
              <Text style={styles.bullet}>• Best Brief Award, First-Year Moot Court Competition</Text>
              <Text style={styles.bullet}>• Outstanding Pro Bono Service Award</Text>
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

export default LawResume;