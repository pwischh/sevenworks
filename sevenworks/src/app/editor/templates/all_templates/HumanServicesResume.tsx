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
    paddingBottom: 3,
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

const HumanServicesResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "JANE"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "CAREGIVER"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Compassion Avenue, Atlanta, GA 30309"} | {formData.phone || "(404) 555-1234"} | {formData.email || "jcaregiver@email.com"}
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
            <View style={styles.detailsContainer}>
              <View style={styles.flexRow}>
                <Text style={styles.institution}>Emory University</Text>
                <Text>May 2022</Text>
              </View>
              <Text style={styles.role}>Bachelor of Arts in Human Services, Minor in Psychology</Text>
              <Text>GPA: 3.8/4.0, Dean's List (All Semesters)</Text>
              <Text>Related Coursework: Human Development, Social Work Practice, Counseling Techniques, Crisis Intervention, Cultural Diversity</Text>
            </View>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RELEVANT EXPERIENCE</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.role}>{exp.title || ""}</Text>
                <Text style={styles.bullet}>• Provided compassionate support to individuals facing challenging life circumstances</Text>
                <Text style={styles.bullet}>• Developed and implemented care plans tailored to client needs</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>Atlanta Family Crisis Center</Text>
                  <Text>May 2021 - Present</Text>
                </View>
                <Text style={styles.role}>Case Management Intern</Text>
                <Text style={styles.bullet}>• Assist with intake assessments for clients seeking emergency housing and support services</Text>
                <Text style={styles.bullet}>• Coordinate with community partners to connect clients with resources for housing, employment, and healthcare</Text>
                <Text style={styles.bullet}>• Maintain detailed case notes and track client progress toward self-sufficiency goals</Text>
                <Text style={styles.bullet}>• Participate in weekly case review meetings with interdisciplinary team to develop intervention strategies</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>Grady Memorial Hospital</Text>
                  <Text>Jan 2021 - May 2021</Text>
                </View>
                <Text style={styles.role}>Social Services Volunteer</Text>
                <Text style={styles.bullet}>• Supported hospital social work department in connecting patients with community resources</Text>
                <Text style={styles.bullet}>• Assisted with discharge planning for patients requiring continued care</Text>
                <Text style={styles.bullet}>• Created resource guides for common patient needs including transportation, medication assistance, and food security</Text>
              </View>
            </>
          )}
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEADERSHIP & COMMUNITY ENGAGEMENT</Text>
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
                  <Text style={styles.institution}>Emory Peer Support Network</Text>
                  <Text>Aug 2019 - Present</Text>
                </View>
                <Text style={styles.role}>Peer Counselor</Text>
                <Text style={styles.bullet}>• Provide confidential peer counseling to students struggling with academic, personal, or mental health concerns</Text>
                <Text style={styles.bullet}>• Complete 40+ hours of training in active listening, crisis response, and mental health first aid</Text>
                <Text style={styles.bullet}>• Collaborate with campus counseling services to develop outreach programs focused on stress management</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.institution}>Volunteer Emory</Text>
                  <Text>Sep 2018 - Present</Text>
                </View>
                <Text style={styles.role}>Service Trip Leader</Text>
                <Text style={styles.bullet}>• Lead bi-weekly service trips to local homeless shelter, coordinating 10-15 student volunteers</Text>
                <Text style={styles.bullet}>• Organize donation drives collecting hygiene supplies and clothing for shelter residents</Text>
                <Text style={styles.bullet}>• Design reflection activities to help volunteers process their experiences and deepen understanding of homelessness</Text>
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
              <Text style={styles.bullet}>• Case Management: Intake assessment, needs evaluation, resource coordination, progress documentation</Text>
              <Text style={styles.bullet}>• Counseling Skills: Active listening, crisis intervention, motivational interviewing, trauma-informed care</Text>
              <Text style={styles.bullet}>• Certifications: Mental Health First Aid, QPR Suicide Prevention, Trauma-Informed Care</Text>
              <Text style={styles.bullet}>• Software: HMIS (Homeless Management Information System), Microsoft Office Suite, case management databases</Text>
              <Text style={styles.bullet}>• Languages: English (native), Spanish (conversational)</Text>
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
              <Text style={styles.bullet}>• Human Services Student of the Year, Emory University (2021)</Text>
              <Text style={styles.bullet}>• Community Impact Award, Volunteer Emory (2020)</Text>
              <Text style={styles.bullet}>• Presidential Service Award, Gold Level - 250+ hours of community service (2019, 2020)</Text>
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

export default HumanServicesResume;
