import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { TemplateProps, TemplateFormData } from "../../types";

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
    lineHeight: 1.2,
    padding: 30,
  },
  resumeHeader: {
    textAlign: "center",
    marginBottom: 12,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  flexColumn: {
    flexDirection: "column",
  },
});

const DataAnalystResume = ({ formData }: TemplateProps) => {
  const hasContent = (arr: Record<string, unknown>[] | undefined, fields: string[]) => {
    return Array.isArray(arr) && arr.some(item => fields.some(field => item[field] && String(item[field]).trim() !== ''));
  };

  const selectedFont = formData.font || 'Arial';
  const baseFontSize = formData.fontSize || 10;

  const dynamicStyles = StyleSheet.create({
    page: {
      fontSize: baseFontSize,
      fontFamily: selectedFont,
    },
    resumeName: {
      fontSize: baseFontSize + 10,
      fontWeight: "bold",
      marginBottom: 5,
    },
    resumeContact: {
      fontSize: baseFontSize - 1,
      marginBottom: 8,
    },
    sectionHeader: {
      fontSize: baseFontSize,
      fontWeight: "bold",
      marginBottom: 4,
      textTransform: "uppercase",
      borderBottomWidth: 0.5,
      borderBottomColor: "#555",
      paddingBottom: 2,
    },
    role: {
      fontStyle: "italic",
      fontSize: baseFontSize - 1,
    },
    listItem: {
      marginLeft: 10,
      marginBottom: 2,
      fontSize: baseFontSize - 1,
    },
    paragraph: {
      fontSize: baseFontSize - 1,
      marginBottom: 8,
      textAlign: 'justify',
    },
    competencies: {
      fontSize: baseFontSize - 1,
      marginBottom: 2,
    },
    skills: {
      fontSize: baseFontSize - 1,
    },
    projectTitle: {
      fontWeight: 'bold',
      fontSize: baseFontSize - 1,
    },
    projectDetails: {
      fontSize: baseFontSize - 2,
      color: '#444',
    },
  });

  return (
    <Document>
      <Page size="LETTER" style={{ ...styles.page, ...dynamicStyles.page }}>
        <View style={styles.resumeHeader}>
          <Text style={dynamicStyles.resumeName}>
            {formData.firstName || "First"} {formData.middleName ? formData.middleName + " " : ""}{formData.lastName || "Last"}
          </Text>
          <Text style={dynamicStyles.resumeContact}>
            {formData.address || "City, ST"} | {formData.phone || "Your Phone"} | {formData.email || "your.email@example.com"}
          </Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.sectionHeader}>Education</Text>
          {hasContent(formData.education, ['degree', 'institution', 'years']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.flexRow}>
                <View style={styles.flexColumn}> 
                  <Text style={{ fontWeight: 'bold' }}>{edu.institution || "Institution Name"}</Text>
                  <Text style={dynamicStyles.role}>{edu.degree || "Degree Name"}</Text>
                </View>
                <Text>{edu.years || "Year"}</Text>
              </View>
            ))
          ) : (
            <View style={styles.flexRow}>
              <View style={styles.flexColumn}>
                <Text style={{ fontWeight: 'bold' }}>Default University</Text>
                <Text style={dynamicStyles.role}>B.S. in Default Major</Text>
              </View>
              <Text>Expected Grad Year</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.sectionHeader}>Core Competencies & Technical Skills</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <View>
              <Text style={dynamicStyles.competencies}><Text style={{fontWeight: 'bold'}}>Core Competencies:</Text> {formData.skillsInterests.split('\n')[0] || 'Data Visualization, Statistical Analysis'}</Text>
              <Text style={dynamicStyles.skills}><Text style={{fontWeight: 'bold'}}>Technical Skills:</Text> {formData.skillsInterests.split('\n')[1] || 'Excel, SQL, R, Python'}</Text>
            </View>
          ) : (
            <View>
              <Text style={dynamicStyles.competencies}><Text style={{fontWeight: 'bold'}}>Core Competencies:</Text> Data Visualization, Statistical Analysis, Big Data, Database Design, Documentation & Reporting, Machine Learning, Artificial Intelligence, Automation, Data Cleaning</Text>
              <Text style={dynamicStyles.skills}><Text style={{fontWeight: 'bold'}}>Technical Skills:</Text> Excel, SQL, R, Python</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.sectionHeader}>Technical Projects</Text>
          <View style={{marginBottom: 5}}>
            <Text style={dynamicStyles.projectTitle}>Employee Performance Dashboard (Example)</Text>
            <Text style={dynamicStyles.projectDetails}>Project Link | Completed: Month Year | Technologies: SQL, Python, Excel</Text>
            <Text style={dynamicStyles.listItem}>• Developed a comprehensive employee performance dashboard using SQL and Python.</Text>
            <Text style={dynamicStyles.listItem}>• Reduced reporting time by automating data processes and enhancing visualizations.</Text>
          </View>
          <View>
            <Text style={dynamicStyles.projectTitle}>Customer Satisfaction Survey Analysis (Example)</Text>
            <Text style={dynamicStyles.projectDetails}>Project Link | Completed: Month Year | Technologies: R, Excel</Text>
            <Text style={dynamicStyles.listItem}>• Processed and analyzed survey data in R to assess satisfaction levels.</Text>
            <Text style={dynamicStyles.listItem}>• Built an interactive Excel dashboard to share insights with management.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.sectionHeader}>Professional Experience</Text>
          {hasContent(formData.experience, ['title', 'company', 'years']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <View style={styles.flexRow}>
                  <View style={styles.flexColumn}>
                    <Text style={{ fontWeight: 'bold' }}>{exp.company || "Company Name"}</Text>
                    <Text style={dynamicStyles.role}>{exp.title || "Job Title"}</Text>
                  </View>
                  <Text>{exp.years || "Dates"}</Text>
                </View>
                <Text style={dynamicStyles.listItem}>• Collected, cleaned, and analyzed data (Example Point).</Text>
                <Text style={dynamicStyles.listItem}>• Built dashboards (Example Point).</Text>
              </View>
            ))
          ) : (
            <View style={{ marginBottom: 8 }}>
              <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                  <Text style={{ fontWeight: 'bold' }}>Default Tech Company</Text>
                  <Text style={dynamicStyles.role}>Data Analyst Intern</Text>
                </View>
                <Text>Year</Text>
              </View>
              <Text style={dynamicStyles.listItem}>• Default experience detail point 1.</Text>
              <Text style={dynamicStyles.listItem}>• Default experience detail point 2.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.sectionHeader}>Involvement & Engagement</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 'bold' }}>{lead.title || "Organization/Role"}</Text>
                {lead.description && <Text style={dynamicStyles.listItem}>• {lead.description}</Text>}
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
            <Text style={dynamicStyles.sectionHeader}>Honors & Awards</Text>
            {formData.honorsList?.map((honor, idx) => (
              <Text key={idx} style={dynamicStyles.listItem}>• {honor.honor}</Text>
            ))}
          </View>
        )}

        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionHeader}>Additional Information</Text>
            {formData.customPersonal.map((field) => (
              field.label && field.value && (
                <Text key={field.id} style={{ fontSize: baseFontSize - 1, marginBottom: 2 }}>
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
