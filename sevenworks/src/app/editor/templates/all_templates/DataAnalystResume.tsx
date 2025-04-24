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
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    marginBottom: 8,
  },
});

const DataAnalystResume = ({ formData }: TemplateProps) => {
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
      marginBottom: 5,
    }
  });

  return (
    <Document>
      <Page size="LETTER" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>
            {formData.firstName || "ALEX"} {formData.middleName ? `${formData.middleName} ` : ""}
            {formData.lastName || "ANALYST"}
          </Text>
          <Text style={styles.contactInfo}>
            {formData.address || "123 Data Drive, Atlanta, GA 30322"} | {formData.phone || "(404) 555-1234"} | {formData.email || "alex.analyst@email.com"} | linkedin.com/in/alexanalyst
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
                  <Text style={styles.itemTitle}>EMORY UNIVERSITY, GOIZUETA BUSINESS SCHOOL</Text>
                  <Text>Bachelor of Business Administration, Concentration in Information Systems & Operations Mgmt.</Text>
                  <Text>GPA: 3.7/4.0</Text>
                  <Text>Related Coursework: Data Management, Data Visualization, Analytics Programming, Database Systems</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Atlanta, GA</Text>
                  <Text>May 2023</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* SKILLS */}
        <View>
          <Text style={styles.sectionHeader}>TECHNICAL SKILLS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            // Use actual skills data
            <Text>{formData.skillsInterests}</Text>
          ) : (
            // Default skills entries
            <>
              <Text style={styles.bullet}>• Programming: Python, R, SQL, JavaScript, HTML/CSS</Text>
              <Text style={styles.bullet}>• Data Analysis: Pandas, NumPy, SciPy, Scikit-learn, Statistical Analysis</Text>
              <Text style={styles.bullet}>• Visualization: Tableau, Power BI, Matplotlib, Seaborn, D3.js</Text>
              <Text style={styles.bullet}>• Database: MySQL, PostgreSQL, MongoDB, Database Design and Administration</Text>
              <Text style={styles.bullet}>• Tools: Git, Jupyter Notebook, Excel, Google Analytics, JIRA, Azure</Text>
              <Text style={styles.bullet}>• Machine Learning: Regression, Classification, Clustering, Natural Language Processing</Text>
            </>
          )}
        </View>

        {/* EXPERIENCE */}
        <View>
          <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>
          
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
                    <Text>{exp.years || ""}</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Analyzed data to derive business insights and create reports</Text>
                <Text style={styles.bullet}>• Implemented data pipelines and visualization solutions</Text>
              </View>
            ))
          ) : (
            // Default experience entries
            <>
              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>ACCENTURE</Text>
                    <Text style={styles.itemRole}>Data Analytics Consultant</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Jun 2023 – Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Lead a team of 3 analysts in developing dashboards and reports for a Fortune 500 retail client, resulting in 15% improvement in inventory management</Text>
                <Text style={styles.bullet}>• Designed and implemented ETL processes using Python and SQL to integrate data from multiple sources, improving data accuracy by 25%</Text>
                <Text style={styles.bullet}>• Created predictive models for customer segmentation using machine learning algorithms, increasing marketing campaign effectiveness by 20%</Text>
                <Text style={styles.bullet}>• Conducted A/B testing on website features, leading to a 10% increase in conversion rates</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>THE HOME DEPOT</Text>
                    <Text style={styles.itemRole}>Data Analytics Intern</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>May – Aug 2022</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Analyzed sales data across 2,200 stores to identify trends and opportunities, presenting findings to senior management</Text>
                <Text style={styles.bullet}>• Developed interactive Tableau dashboards to visualize KPIs, improving executive decision-making efficiency</Text>
                <Text style={styles.bullet}>• Automated weekly reporting using Python scripts, saving the team approximately 10 hours per week</Text>
                <Text style={styles.bullet}>• Collaborated with cross-functional teams to optimize inventory allocation algorithms, reducing overstock by 8%</Text>
              </View>
            </>
          )}
        </View>

        {/* PROJECTS */}
        <View>
          <Text style={styles.sectionHeader}>DATA PROJECTS</Text>
          
          {hasContent(formData.leadership, ['title', 'description']) ? (
            // Map through leadership data as projects
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.itemContent}>
                <Text style={styles.itemTitle}>{lead.title || "Project"}</Text>
                <Text style={styles.bullet}>• {lead.description || ""}</Text>
              </View>
            ))
          ) : (
            // Default project entries
            <>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>CUSTOMER CHURN PREDICTION MODEL</Text>
                <Text style={styles.bullet}>• Developed a machine learning model using Python (scikit-learn) to predict customer churn with 85% accuracy</Text>
                <Text style={styles.bullet}>• Implemented feature engineering techniques to identify key indicators of churn risk</Text>
                <Text style={styles.bullet}>• Created a web application using Flask to allow business users to interact with the model</Text>
                <Text style={styles.bullet}>• GitHub: github.com/alexanalyst/churn-prediction</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>SALES FORECASTING DASHBOARD</Text>
                <Text style={styles.bullet}>• Built an end-to-end data pipeline using Python, SQL, and Airflow to extract and transform sales data</Text>
                <Text style={styles.bullet}>• Implemented time series forecasting models (ARIMA, Prophet) to predict future sales with 92% accuracy</Text>
                <Text style={styles.bullet}>• Designed an interactive Tableau dashboard allowing stakeholders to explore forecasts by region and product category</Text>
              </View>
            </>
          )}
        </View>

        {/* CERTIFICATIONS & AWARDS */}
        <View>
          <Text style={styles.sectionHeader}>CERTIFICATIONS & AWARDS</Text>
          
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            // Map through actual honors data
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            // Default honors entries
            <>
              <Text style={styles.bullet}>• Microsoft Certified: Azure Data Scientist Associate</Text>
              <Text style={styles.bullet}>• Google Analytics Individual Qualification</Text>
              <Text style={styles.bullet}>• Tableau Desktop Specialist</Text>
              <Text style={styles.bullet}>• First Place, Emory Data Analytics Hackathon (2022)</Text>
              <Text style={styles.bullet}>• Dean's List (All Semesters)</Text>
            </>
          )}
        </View>

        {/* LEADERSHIP & ACTIVITIES */}
        <View>
          <Text style={styles.sectionHeader}>LEADERSHIP & ACTIVITIES</Text>
          
          <View style={styles.itemContent}>
            <View style={styles.flexRow}>
              <Text style={styles.itemTitle}>Emory Data Science Club</Text>
              <Text>2020 – 2023</Text>
            </View>
            <Text style={styles.bullet}>• Vice President (2022-2023): Led workshops on data visualization and machine learning for 50+ members</Text>
            <Text style={styles.bullet}>• Organized annual datathon event, securing sponsorships from local tech companies</Text>
          </View>
          
          <View style={styles.itemContent}>
            <View style={styles.flexRow}>
              <Text style={styles.itemTitle}>Volunteer Data Analyst, Atlanta Food Bank</Text>
              <Text>2021 – 2023</Text>
            </View>
            <Text style={styles.bullet}>• Analyzed donation patterns and distribution efficiency, helping optimize resource allocation</Text>
            <Text style={styles.bullet}>• Created visualizations to support grant applications, assisting in securing $50,000 in additional funding</Text>
          </View>
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

export default DataAnalystResume;
