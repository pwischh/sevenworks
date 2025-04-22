import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { TemplateProps, TemplateFormData } from "../types";

Font.register({
    family: "Arial",
    fonts: [
      { src: "/fonts/ARIAL.TTF", fontWeight: "normal" },
      { src: "/fonts/ARIALBD.TTF", fontWeight: "bold" },
      { src: "/fonts/ARIALI.TTF", fontStyle: "italic" },
      { src: "/fonts/ARIALBI.TTF", fontWeight: "bold", fontStyle: "italic" },
    ],
});
Font.register({ family: "Calibri", src: "/fonts/calibri.ttf" });
Font.register({ family: "Times-Roman", src: "/fonts/times.ttf" });
Font.register({ family: "Courier", src: "/fonts/cour.ttf" });

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    lineHeight: 1.2,
    padding: 30,
  },
  resumeHeader: {
    textAlign: "center",
    marginBottom: 12,
  },
  resumeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resumeContact: {
    fontSize: 9,
    marginBottom: 8,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
  },
  resumeTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    borderBottomWidth: 0.5,
    borderBottomColor: "#555",
    paddingBottom: 2,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  flexColumn: {
    flexDirection: "column",
  },
  role: {
    fontStyle: "italic",
    fontSize: 9,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
    fontSize: 9,
  },
  paragraph: {
    fontSize: 9,
    marginBottom: 8,
    textAlign: 'justify',
  },
  competencies: {
    fontSize: 9,
    marginBottom: 2,
  },
  skills: {
    fontSize: 9,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  projectDetails: {
    fontSize: 8,
    color: '#444',
  }
});

const DataAnalystResume = ({ formData }: TemplateProps) => {
  const hasContent = (arr: Record<string, unknown>[] | undefined, fields: string[]) => {
    return Array.isArray(arr) && arr.some(item => fields.some(field => item[field] && String(item[field]).trim() !== ''));
  };

  const selectedFont = formData.font || 'Arial';

  return (
    <Document>
      <Page size="LETTER" style={{ ...styles.page, fontFamily: selectedFont }}>
        <View style={styles.resumeHeader}>
          <Text style={styles.resumeName}>
            {formData.firstName || "First"} {formData.middleName ? formData.middleName + " " : ""}{formData.lastName || "Last"}
          </Text>
          <Text style={styles.resumeContact}>
            {formData.address || "City, ST"} | {formData.phone || "Your Phone"} | {formData.email || "your.email@example.com"}
          </Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {hasContent(formData.education, ['degree', 'institution', 'years']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.flexRow}>
                <View style={styles.flexColumn}> 
                  <Text style={{ fontWeight: 'bold' }}>{edu.institution || "Institution Name"}</Text>
                  <Text style={styles.role}>{edu.degree || "Degree Name"}</Text>
                </View>
                <Text>{edu.years || "Year"}</Text>
              </View>
            ))
          ) : (
            <View style={styles.flexRow}>
              <View style={styles.flexColumn}>
                <Text style={{ fontWeight: 'bold' }}>Default University</Text>
                <Text style={styles.role}>B.S. in Default Major</Text>
              </View>
              <Text>Expected Grad Year</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Core Competencies & Technical Skills</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <View>
              <Text style={styles.competencies}><Text style={{fontWeight: 'bold'}}>Core Competencies:</Text> {formData.skillsInterests.split('\n')[0] || 'Data Visualization, Statistical Analysis'}</Text>
              <Text style={styles.skills}><Text style={{fontWeight: 'bold'}}>Technical Skills:</Text> {formData.skillsInterests.split('\n')[1] || 'Excel, SQL, R, Python'}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.competencies}><Text style={{fontWeight: 'bold'}}>Core Competencies:</Text> Data Visualization, Statistical Analysis, Big Data, Database Design, Documentation & Reporting, Machine Learning, Artificial Intelligence, Automation, Data Cleaning</Text>
              <Text style={styles.skills}><Text style={{fontWeight: 'bold'}}>Technical Skills:</Text> Excel, SQL, R, Python</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Technical Projects</Text>
          <View style={{marginBottom: 5}}>
            <Text style={styles.projectTitle}>Employee Performance Dashboard (Example)</Text>
            <Text style={styles.projectDetails}>Project Link | Completed: Month Year | Technologies: SQL, Python, Excel</Text>
            <Text style={styles.listItem}>• Developed a comprehensive employee performance dashboard using SQL and Python.</Text>
            <Text style={styles.listItem}>• Reduced reporting time by automating data processes and enhancing visualizations.</Text>
          </View>
          <View>
            <Text style={styles.projectTitle}>Customer Satisfaction Survey Analysis (Example)</Text>
            <Text style={styles.projectDetails}>Project Link | Completed: Month Year | Technologies: R, Excel</Text>
            <Text style={styles.listItem}>• Processed and analyzed survey data in R to assess satisfaction levels.</Text>
            <Text style={styles.listItem}>• Built an interactive Excel dashboard to share insights with management.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Professional Experience</Text>
          {hasContent(formData.experience, ['title', 'company', 'years']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <View style={styles.flexRow}>
                  <View style={styles.flexColumn}>
                    <Text style={{ fontWeight: 'bold' }}>{exp.company || "Company Name"}</Text>
                    <Text style={styles.role}>{exp.title || "Job Title"}</Text>
                  </View>
                  <Text>{exp.years || "Dates"}</Text>
                </View>
                <Text style={styles.listItem}>• Collected, cleaned, and analyzed data (Example Point).</Text>
                <Text style={styles.listItem}>• Built dashboards (Example Point).</Text>
              </View>
            ))
          ) : (
            <View style={{ marginBottom: 8 }}>
              <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                  <Text style={{ fontWeight: 'bold' }}>Default Tech Company</Text>
                  <Text style={styles.role}>Data Analyst Intern</Text>
                </View>
                <Text>Year</Text>
              </View>
              <Text style={styles.listItem}>• Default experience detail point 1.</Text>
              <Text style={styles.listItem}>• Default experience detail point 2.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Involvement & Engagement</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 'bold' }}>{lead.title || "Organization/Role"}</Text>
                {lead.description && <Text style={styles.listItem}>• {lead.description}</Text>}
              </View>
            ))
          ) : (
            <View>
              <Text style={{ fontWeight: 'bold' }}>Vice President, Default Data Club</Text>
            </View>
          )}
        </View>

        {hasContent(formData.honorsList, ['honor']) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Honors & Awards</Text>
            {formData.honorsList?.map((honor, idx) => (
              <Text key={idx} style={styles.listItem}>• {honor.honor}</Text>
            ))}
          </View>
        )}

        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Additional Information</Text>
            {formData.customPersonal.map((field) => (
              field.label && field.value && (
                <Text key={field.id} style={{ fontSize: 9, marginBottom: 2 }}>
                  <Text style={{ fontWeight: 'bold' }}>{field.label}:</Text> {field.value}
                </Text>
              )
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default DataAnalystResume;
