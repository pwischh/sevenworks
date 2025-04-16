import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({family: "Arial", src: "/fonts/ARIAL.TTF"});
Font.register({family: "Calibri", src: "/fonts/calibri.ttf"});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20, // Reduced padding to fit content on one page
  },
  header: {
    marginBottom: 10, // Reduced spacing for a more compact header
  },
  title: {
    fontSize: 10, // Adjusted title size to better reflect the PDF
    fontWeight: 'bold',
    marginBottom: 4,
    textDecoration: 'underline',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  job_header: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 10, // Reduced font size for content to ensure it fits on one page
    lineHeight: 1.3,
  },
});

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
interface TemplateFormData {
  font?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  educationSchool?: string;
  educationGraduation?: string;
  educationDegree?: string;
  educationDescription?: string;
  educationGPA?: string;
  leadership?: string;
  ubsProgram?: string;
  honors?: string;
  skillsInterests?: string;
  [key: string]: any;
}
interface TemplateProps {
  formData: TemplateFormData;
}

export default function BusinessTemplate({ formData }: TemplateProps) {
  if (!formData) return null;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View wrap={false}>
          <View style={styles.header}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: formData?.font ?? "Helvetica" }}>
              {formData.firstName || "First Name"} {formData.middleName ? formData.middleName + " " : ""}{formData.lastName || "Last Name"}
            </Text>
            <Text style={{ fontSize: 12, marginTop: 5, fontFamily: formData?.font ?? "Helvetica" }}>
              {formData.address || "Address not provided | "}
              {formData.address && " | "}
              {formData.phone || "Phone not provided | "}
              {formData.phone && " | "}
              {formData.email || "Email not provided"}
            </Text>
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.title}>EDUCATION</Text>
            {formData.education && formData.education.length > 0 ? (
              <View style={{ marginBottom: 16 }}>
                {formData.education.map((edu, idx) => (
                  <View key={idx} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.degree} at {edu.institution}</Text>
                    <Text style={{ fontSize: 12 }}>{edu.years}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.content}>
                {formData.educationSchool || "Education School"} — {formData.educationGraduation || "Graduation Date"}{"\n"}
                {formData.educationDegree || "Degree"}{"\n"}
                {formData.educationDescription || "Coursework/Description"}{"\n"}
                {formData.educationGPA ? "GPA: " + formData.educationGPA : ""}
              </Text>
            )}
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.title}>EXPERIENCE</Text>
            {formData.experience && formData.experience.length > 0 ? (
              <View style={{ marginBottom: 16 }}>
                {formData.experience.map((exp, idx) => (
                  <View key={idx} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{exp.title} at {exp.company}</Text>
                    <Text style={{ fontSize: 12 }}>{exp.years}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <>
                <Text style={styles.job_header}>Company Name — Role</Text>
                <Text style={styles.content}>
                  Job details go here.
                </Text>
              </>
            )}
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.title}>LEADERSHIP AND COMMUNITY ENGAGEMENT</Text>
            {formData.leadership ? (
              <Text style={styles.content}>
                {formData.leadership}
              </Text>
            ) : (
              <>
                <Text style={styles.job_header}>
                  Undergraduate Finance Association — November 2020 – Present
                </Text>
                <Text style={styles.content}>
                  Events and Sports Coordinator{"\n"}
                  • Help coordinate events such as keynote presentations to develop interest in finance{"\n"}
                  • Increased membership by planning events targeted at athletes
                </Text>
                <Text style={styles.job_header}>
                  Emory University Solutions High School Conversion Project — September 2019 – Present
                </Text>
                <Text style={styles.content}>
                  Finance Committee Member{"\n"}
                  • Assist in launching a $21 million project to convert a high school into a neighborhood center{"\n"}
                  • Research criteria and restrictions for low income tax credits
                </Text>
              </>
            )}
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.job_header}>UBS Freshman Frenzy Program, New York, NY — June 2019</Text>
            {formData.ubsProgram ? (
              <Text style={styles.content}>
                {formData.ubsProgram}
              </Text>
            ) : (
              <Text style={styles.content}>
                Participant{"\n"}
                • Selected among 25 freshmen for a four-day UBS program{"\n"}
                • Explored equities, fixed income, rates and currencies, municipal securities, operations, and private banking{"\n"}
                • Engaged in trading simulations and pitch book preparations
              </Text>
            )}
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.title}>HONORS</Text>
            {formData.honors ? (
              <Text style={styles.content}>
                {formData.honors}
              </Text>
            ) : (
              <Text style={styles.content}>
                • Marine Corps Outstanding Achievement Award{"\n"}
                • Co-Captain and 2020 MVP, Emory Women’s Varsity Soccer
              </Text>
            )}
          </View>

          <View style={{ marginTop: 10, fontFamily: formData?.font ?? "Helvetica" }}>
            <Text style={styles.title}>ADDITIONAL SKILLS AND INTERESTS</Text>
            {formData.skillsInterests ? (
              <Text style={styles.content}>
                {formData.skillsInterests}
              </Text>
            ) : (
              <Text style={styles.content}>
                Languages: Intermediate in written and spoken Spanish{"\n"}
                Computing: Microsoft Excel, Word, PowerPoint, Minitab, Adobe Acrobat Reader, Outlook, Contact Manager, Windows OS{"\n"}
                Interests: Photography, Travel, Table Tennis, Soccer, Yoga
              </Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}