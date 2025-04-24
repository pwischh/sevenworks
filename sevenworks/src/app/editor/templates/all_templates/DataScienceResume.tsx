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
    marginBottom: 15,
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
    marginBottom: 5,
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
  company: {
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
  skill: {
    marginBottom: 2,
  },
});

const DataScienceResume = ({ formData }: TemplateProps) => {
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>
            {formData.firstName || "ALEX"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "DATA SCIENTIST"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Analytics Avenue, Atlanta, GA 30322"} | {formData.phone || "(404) 555-9876"} | {formData.email || "adatascientist@gmail.com"} | github.com/adatascientist
          </Text>
        </View>

        {/* Skills Section (First for technical resumes) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Programming Languages:</Text> Python, R, SQL, MATLAB, Julia</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Data Science & Machine Learning:</Text> Scikit-learn, TensorFlow, PyTorch, Keras, XGBoost, Natural Language Processing</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Data Manipulation & Visualization:</Text> Pandas, NumPy, Matplotlib, Seaborn, Plotly, Tableau, Power BI</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Big Data & Cloud:</Text> AWS (S3, EC2, SageMaker), Hadoop, Spark, Apache Airflow, Docker, Git</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Databases:</Text> PostgreSQL, MongoDB, MySQL, Redis</Text>
              </View>
            </>
          )}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>{edu.institution || ""}</Text>
                  <Text>{edu.years || ""}</Text>
                </View>
                <Text style={styles.role}>{edu.degree || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>EMORY UNIVERSITY</Text>
                  <Text>Atlanta, GA • May 2023</Text>
                </View>
                <Text style={styles.role}>Master of Science in Data Science</Text>
                <Text>GPA: 3.92/4.00</Text>
                <Text>Relevant Coursework: Machine Learning, Statistical Learning, Deep Learning, Natural Language Processing, Big Data Analytics, Data Visualization, Advanced Programming</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>GEORGIA INSTITUTE OF TECHNOLOGY</Text>
                  <Text>Atlanta, GA • May 2021</Text>
                </View>
                <Text style={styles.role}>Bachelor of Science in Applied Mathematics, Minor in Computer Science</Text>
                <Text>GPA: 3.85/4.00, Magna Cum Laude</Text>
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
                  <Text style={styles.company}>{exp.company || ""}</Text>
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
                  <Text style={styles.company}>MICROSOFT</Text>
                  <Text>Redmond, WA • May - Aug 2022</Text>
                </View>
                <Text style={styles.role}>Data Science Intern</Text>
                <Text style={styles.bullet}>• Developed a customer churn prediction model using XGBoost with 92% accuracy, identifying at-risk customers</Text>
                <Text style={styles.bullet}>• Created ETL pipelines to process 50+ GB of user behavior data using Azure Data Factory and PySpark</Text>
                <Text style={styles.bullet}>• Built interactive dashboards in Power BI to visualize model insights and track key retention metrics</Text>
                <Text style={styles.bullet}>• Presented findings to cross-functional teams, resulting in a 15% reduction in customer churn</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>EMORY UNIVERSITY, DEPARTMENT OF BIOSTATISTICS</Text>
                  <Text>Atlanta, GA • Jan - May 2022</Text>
                </View>
                <Text style={styles.role}>Research Assistant</Text>
                <Text style={styles.bullet}>• Implemented deep learning models to analyze medical imaging data for early disease detection</Text>
                <Text style={styles.bullet}>• Pre-processed and augmented 10,000+ medical images for neural network training</Text>
                <Text style={styles.bullet}>• Improved model accuracy by 20% through feature engineering and hyperparameter optimization</Text>
                <Text style={styles.bullet}>• Co-authored research paper submitted to a peer-reviewed medical informatics journal</Text>
              </View>
            </>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA SCIENCE PROJECTS</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((project, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>{project.title || ""}</Text>
                  <Text>{project.years || ""}</Text>
                </View>
                {project.role && <Text style={styles.role}>{project.role}</Text>}
                {project.description && <Text style={styles.bullet}>• {project.description}</Text>}
                {Array.isArray(project.bullets) && project.bullets.length > 0 && project.bullets.map((bullet, bulletIdx) => (
                  <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>NATURAL LANGUAGE PROCESSING FOR SENTIMENT ANALYSIS</Text>
                  <Text>github.com/adatascientist/nlp-sentiment</Text>
                </View>
                <Text style={styles.bullet}>• Built a BERT-based sentiment analysis model to classify customer reviews with 89% accuracy</Text>
                <Text style={styles.bullet}>• Fine-tuned pre-trained language model on domain-specific data using Hugging Face Transformers</Text>
                <Text style={styles.bullet}>• Deployed model as a REST API using Flask and Docker for real-time sentiment scoring</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>TIME SERIES FORECASTING FOR STOCK PRICE PREDICTION</Text>
                  <Text>github.com/adatascientist/stock-prediction</Text>
                </View>
                <Text style={styles.bullet}>• Developed LSTM and ARIMA models to predict stock prices using historical market data</Text>
                <Text style={styles.bullet}>• Implemented feature engineering techniques to incorporate technical indicators and sentiment data</Text>
                <Text style={styles.bullet}>• Created a Python package for backtesting trading strategies based on model predictions</Text>
              </View>
            </>
          )}
        </View>

        {/* Honors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS & AWARDS</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• AWS Certified Machine Learning Specialty</Text>
              <Text style={styles.bullet}>• Microsoft Certified: Azure Data Scientist Associate</Text>
              <Text style={styles.bullet}>• 2nd Place, Kaggle Competition - Housing Price Prediction Challenge</Text>
              <Text style={styles.bullet}>• Emory Data Science Hackathon Winner (2022) - Healthcare Analytics Track</Text>
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

export default DataScienceResume;