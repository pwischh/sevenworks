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
  institution: {
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

const HealthResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "ALEX"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "HEALTHCARE"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Medical Drive, Atlanta, GA 30322"} | {formData.phone || "(404) 555-1234"} | {formData.email || "ahealthcare@emory.edu"}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>{edu.institution || ""}</Text>
                  <Text>{edu.years || ""}</Text>
                </View>
                <Text style={styles.role}>{edu.degree || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>EMORY UNIVERSITY</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Bachelor of Science in Human Health, Minor in Biology</Text>
                  <Text>May 2023</Text>
                </View>
                <Text>GPA: 3.8/4.0, Dean's List (All Semesters)</Text>
                <Text>Relevant Coursework: Anatomy and Physiology, Epidemiology, Health Policy, Global Health, Biostatistics, Medical Ethics, Nutrition</Text>
              </View>
            </>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLINICAL & RESEARCH EXPERIENCE</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.role}>{exp.title || ""}</Text>
                <Text style={styles.bullet}>• Assisted with patient care and health monitoring procedures</Text>
                <Text style={styles.bullet}>• Collaborated with healthcare professionals on research and treatment protocols</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>EMORY UNIVERSITY HOSPITAL</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Patient Care Volunteer, Emergency Department</Text>
                  <Text>Jan 2022 – Present</Text>
                </View>
                <Text style={styles.bullet}>• Assist nursing staff with non-clinical patient care for 8+ hours weekly</Text>
                <Text style={styles.bullet}>• Perform patient comfort rounds, restocking supplies, and transport discharged patients</Text>
                <Text style={styles.bullet}>• Serve as liaison between patients, families, and medical staff</Text>
                <Text style={styles.bullet}>• Completed 200+ hours of service while maintaining full academic course load</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>CENTER FOR DISEASE CONTROL AND PREVENTION (CDC)</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Public Health Research Intern, Division of Global Health Protection</Text>
                  <Text>May – Aug 2022</Text>
                </View>
                <Text style={styles.bullet}>• Assisted with data collection and analysis for global infectious disease surveillance</Text>
                <Text style={styles.bullet}>• Created visualizations of epidemiological data for internal reports and publications</Text>
                <Text style={styles.bullet}>• Reviewed literature on emerging health threats and summarized findings for senior staff</Text>
                <Text style={styles.bullet}>• Participated in weekly disease outbreak response team meetings</Text>
              </View>
            </>
          )}
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEADERSHIP & EXTRACURRICULAR ACTIVITIES</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <Text style={styles.institution}>{lead.title || ""}</Text>
                <Text style={styles.bullet}>• {lead.description || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>EMORY UNIVERSITY EMERGENCY MEDICAL SERVICES</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Emergency Medical Technician (EMT-B)</Text>
                  <Text>Sep 2021 – Present</Text>
                </View>
                <Text style={styles.bullet}>• Provide emergency medical care during 12-hour shifts on campus</Text>
                <Text style={styles.bullet}>• Respond to medical emergencies, perform patient assessments, and provide basic life support</Text>
                <Text style={styles.bullet}>• Completed 160-hour EMT certification course and maintain continuing education requirements</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>GLOBAL HEALTH STUDENT ASSOCIATION</Text>
                  <Text>Atlanta, GA</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.role}>Vice President</Text>
                  <Text>Aug 2021 – Present</Text>
                </View>
                <Text style={styles.bullet}>• Organize monthly guest lecture series featuring public health experts and healthcare professionals</Text>
                <Text style={styles.bullet}>• Coordinate annual Global Health Symposium with 15+ speakers and 200+ attendees</Text>
                <Text style={styles.bullet}>• Lead fundraising efforts raising $5,000 for international medical service trip</Text>
              </View>
            </>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS & CERTIFICATIONS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <Text style={styles.bullet}>• Certifications: Emergency Medical Technician (EMT-B), BLS/CPR, HIPAA Compliance, Stop the Bleed</Text>
              <Text style={styles.bullet}>• Clinical Skills: Vital signs assessment, patient history taking, sterile technique, phlebotomy</Text>
              <Text style={styles.bullet}>• Research Skills: SPSS, R, Qualtrics, literature review, data collection and analysis</Text>
              <Text style={styles.bullet}>• Languages: English (native), Spanish (conversational medical Spanish)</Text>
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
              <Text style={styles.bullet}>• Emory University Merit Scholarship (2019-2023)</Text>
              <Text style={styles.bullet}>• Alpha Epsilon Delta Pre-Health Honor Society</Text>
              <Text style={styles.bullet}>• Outstanding Service Award, Emory University Hospital (2022)</Text>
              <Text style={styles.bullet}>• 1st Place, Undergraduate Research Symposium, Health Sciences Division (2022)</Text>
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

export default HealthResume;
