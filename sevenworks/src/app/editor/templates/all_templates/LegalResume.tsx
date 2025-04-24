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
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemRole: {
    fontStyle: "italic",
  },
  institution: {
    flexGrow: 1,
  },
  dateLocation: {
    textAlign: "right",
    width: "30%",
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 3,
  },
  itemContent: {
    flexGrow: 1,
    marginBottom: 8,
  },
});

const LegalResume = ({ formData }: TemplateProps) => {
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
      lineHeight: 1.2,
    },
    name: {
      fontSize: (formData.fontSize || 10) + 8,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      marginBottom: 5,
    }
  });

  return (
    <Document>
      <Page size="LETTER" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>
            {formData.firstName || "JANE"} {formData.middleName ? `${formData.middleName} ` : "D. "}
            {formData.lastName || "ADVOCATE"}
          </Text>
          <Text style={styles.contactInfo}>
            {formData.address || "123 Legal Way, Atlanta, GA 30322"} | {formData.phone || "(404) 123-4567"} | {formData.email || "jadvocate@emory.edu"}
          </Text>
        </View>

        {/* EDUCATION */}
        <View>
          <Text style={styles.sectionHeader}>EDUCATION</Text>
          
          {hasContent(formData.education, ['degree', 'institution']) ? (
            // Use actual education data from formData
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.flexRow}>
                <View style={styles.institution}>
                  <Text style={styles.itemTitle}>{edu.institution || ""}</Text>
                  <Text>{edu.degree || ""}</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>{edu.years || ""}</Text>
                </View>
              </View>
            ))
          ) : (
            // Default education entries
            <>
              <View style={styles.flexRow}>
                <View style={styles.institution}>
                  <Text style={styles.itemTitle}>EMORY UNIVERSITY SCHOOL OF LAW</Text>
                  <Text>Juris Doctor Candidate</Text>
                  <Text>GPA: 3.7/4.0</Text>
                  <Text>Honors: Dean's List (all semesters); Top 10% of class</Text>
                  <Text>Activities: Moot Court Special Teams, Emory Bankruptcy Developments Journal, Black Law Students Association</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Atlanta, GA</Text>
                  <Text>May 2024</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={styles.institution}>
                  <Text style={styles.itemTitle}>SPELMAN COLLEGE</Text>
                  <Text>Bachelor of Arts in Political Science, minor in Economics</Text>
                  <Text>GPA: 3.8/4.0, Magna Cum Laude</Text>
                  <Text>Honors: Phi Beta Kappa; Dean's List (all semesters); Department Achievement Award</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Atlanta, GA</Text>
                  <Text>May 2021</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* LEGAL EXPERIENCE */}
        <View>
          <Text style={styles.sectionHeader}>LEGAL EXPERIENCE</Text>
          
          {hasContent(formData.experience, ['title', 'company']) ? (
            // Map through actual experience data
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>{exp.company || ""}</Text>
                    <Text style={styles.itemRole}>{exp.title || ""}</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>{exp.years || ""}</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Professional experience details</Text>
              </View>
            ))
          ) : (
            // Default experience entries
            <>
              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>KING & SPALDING LLP</Text>
                    <Text style={styles.itemRole}>Summer Associate</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>May – Jul 2023</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Conducted research and drafted memoranda on various legal topics including corporate, real estate, and data privacy law</Text>
                <Text style={styles.bullet}>• Assisted in preparation of trial exhibits and witness materials for a major securities litigation case</Text>
                <Text style={styles.bullet}>• Drafted sections of briefs and motions in federal court cases, including dispositive motions</Text>
                <Text style={styles.bullet}>• Gained exposure to multiple legal areas across four different practice groups during rotation program</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>U.S. DISTRICT COURT, NORTHERN DISTRICT OF GEORGIA</Text>
                    <Text style={styles.itemRole}>Judicial Intern, Honorable Eleanor L. Ross</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Jan – Apr 2023</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Researched federal procedural and substantive law and drafted bench memoranda for pending cases</Text>
                <Text style={styles.bullet}>• Assisted in preparation of court proceedings and observed federal trials, hearings, and sentencings</Text>
                <Text style={styles.bullet}>• Reviewed and summarized trial transcripts for complex commercial litigation case</Text>
              </View>
            </>
          )}
        </View>

        {/* LEADERSHIP & ACTIVITIES */}
        <View>
          <Text style={styles.sectionHeader}>LEADERSHIP & ACTIVITIES</Text>
          
          {hasContent(formData.leadership, ['title', 'description']) ? (
            // Map through actual leadership data
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>{lead.title || ""}</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• {lead.description || ""}</Text>
              </View>
            ))
          ) : (
            // Default leadership entries
            <>
              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>MOOT COURT SOCIETY, EMORY UNIVERSITY SCHOOL OF LAW</Text>
                    <Text style={styles.itemRole}>Special Teams Executive Member</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Aug 2022 – Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Selected for Frederick Douglass Moot Court Competition team through rigorous tryout process</Text>
                <Text style={styles.bullet}>• Advanced to quarterfinals in regional competition and received Best Brief Award (top 5 of 32 teams)</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>EMORY BANKRUPTCY DEVELOPMENTS JOURNAL</Text>
                    <Text style={styles.itemRole}>Managing Editor</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>May 2022 – Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Oversee production schedule and coordinate with 8 associate editors in reviewing and editing articles</Text>
                <Text style={styles.bullet}>• Selected from over 100 candidates based on writing competition and academic performance</Text>
                <Text style={styles.bullet}>• Comment selected for publication: "Reforming Chapter 11 to Address Small Business Challenges"</Text>
              </View>
            </>
          )}
        </View>

        {/* HONORS & AWARDS */}
        <View>
          <Text style={styles.sectionHeader}>HONORS & AWARDS</Text>
          
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            // Map through actual honors data
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            // Default honors entries
            <>
              <Text style={styles.bullet}>• Emory Law Dean's Achievement Scholarship, Full Tuition Merit Award</Text>
              <Text style={styles.bullet}>• CALI Excellence for the Future Award, Civil Procedure (highest grade in class)</Text>
              <Text style={styles.bullet}>• Finalist, Emory Law School Negotiation Competition, 2022</Text>
              <Text style={styles.bullet}>• Georgia Association for Women Lawyers Outstanding Student Award, 2023</Text>
            </>
          )}
        </View>

        {/* SKILLS & INTERESTS */}
        <View>
          <Text style={styles.sectionHeader}>SKILLS & INTERESTS</Text>
          
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            // Use actual skills and interests data
            <Text>{formData.skillsInterests}</Text>
          ) : (
            // Default skills and interests
            <>
              <Text style={styles.bullet}>• Technical Skills: Proficient in Westlaw, LexisNexis, Bloomberg Law, PACER, Microsoft Office Suite</Text>
              <Text style={styles.bullet}>• Bar Admissions: Registered for Georgia Bar Examination (July 2024)</Text>
              <Text style={styles.bullet}>• Languages: Intermediate Spanish (reading, writing, speaking)</Text>
              <Text style={styles.bullet}>• Pro Bono: 100+ hours with Atlanta Legal Aid Society, Expungement Project (2022-2023)</Text>
              <Text style={styles.bullet}>• Interests: Marathon running (completed Chicago Marathon 2022), jazz piano, science fiction literature</Text>
            </>
          )}
        </View>

        {/* Custom Personal Fields Section if available */}
        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && formData.customPersonal.some(field => field.label && field.value) && (
          <View>
            <Text style={styles.sectionHeader}>ADDITIONAL INFORMATION</Text>
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

export default LegalResume;
