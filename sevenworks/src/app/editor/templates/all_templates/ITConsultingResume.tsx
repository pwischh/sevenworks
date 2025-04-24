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

const ITConsultingResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "JORDAN"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "CONSULTANT"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Technology Lane, Atlanta, GA 30322"} | {formData.phone || "(404) 555-7654"} | {formData.email || "jconsultant@gmail.com"} | linkedin.com/in/jconsultant
          </Text>
        </View>

        {/* Skills Section (First for consulting resumes) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SKILLS & EXPERTISE</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>IT Strategy & Transformation:</Text> Digital Transformation, IT Roadmap Development, Strategic Planning, Business Process Optimization</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Project Management:</Text> Agile, Scrum, Waterfall, Prince2, PMP, Budget Management, Resource Allocation, Risk Mitigation</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Technical Expertise:</Text> Cloud Migration (AWS, Azure), Enterprise Architecture, CRM Implementation, ERP Systems, Data Analytics</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Client Relationship Management:</Text> Stakeholder Communication, Requirements Gathering, Client Presentations, Solution Design</Text>
              </View>
            </>
          )}
        </View>

        {/* Experience Section (Earlier for consulting resumes) */}
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
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                  exp.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                  ))
                ) : (
                  <>
                    <Text style={styles.bullet}>• Led strategic IT consulting projects for enterprise clients across various industries</Text>
                    <Text style={styles.bullet}>• Developed technical solutions to solve complex business challenges and improve efficiency</Text>
                    <Text style={styles.bullet}>• Managed client relationships and communicated project status to key stakeholders</Text>
                  </>
                )}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>DELOITTE CONSULTING</Text>
                  <Text>Atlanta, GA • Aug 2021 - Present</Text>
                </View>
                <Text style={styles.role}>Technology Consultant</Text>
                <Text style={styles.bullet}>• Lead a team of 6 consultants in delivering cloud migration projects for Fortune 500 clients, resulting in 30% cost reduction</Text>
                <Text style={styles.bullet}>• Developed IT strategy roadmaps for 5 enterprise clients across financial services, healthcare, and retail sectors</Text>
                <Text style={styles.bullet}>• Implemented Salesforce CRM solution for major healthcare provider, improving customer service metrics by 45%</Text>
                <Text style={styles.bullet}>• Conducted technology assessments and provided recommendations that streamlined operations and reduced IT costs by 25%</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>ACCENTURE</Text>
                  <Text>Chicago, IL • Jun 2019 - Jul 2021</Text>
                </View>
                <Text style={styles.role}>Associate Consultant</Text>
                <Text style={styles.bullet}>• Assisted in the implementation of SAP ERP system for manufacturing client, completed on time and 5% under budget</Text>
                <Text style={styles.bullet}>• Gathered and documented business requirements through stakeholder interviews and workshop facilitation</Text>
                <Text style={styles.bullet}>• Created detailed process flows and solution designs to align technology implementation with business objectives</Text>
                <Text style={styles.bullet}>• Developed test plans and conducted system testing to ensure solution quality and business alignment</Text>
              </View>
            </>
          )}
        </View>

        {/* Project Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KEY CONSULTING PROJECTS</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((project, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>{project.title || ""}</Text>
                  <Text>{project.years || ""}</Text>
                </View>
                {project.role && <Text style={styles.role}>{project.role}</Text>}
                {Array.isArray(project.bullets) && project.bullets.length > 0 ? (
                  project.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                  ))
                ) : (
                  <Text style={styles.bullet}>• {project.description || ""}</Text>
                )}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>DIGITAL TRANSFORMATION FOR FINANCIAL SERVICES COMPANY</Text>
                  <Text>2022-2023</Text>
                </View>
                <Text style={styles.bullet}>• Led digital transformation initiative for $5B financial services company, modernizing legacy systems</Text>
                <Text style={styles.bullet}>• Orchestrated migration of on-premise infrastructure to AWS cloud, reducing operational costs by 40%</Text>
                <Text style={styles.bullet}>• Implemented data analytics platform to provide real-time business insights for executive decision-making</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>CRM IMPLEMENTATION FOR HEALTHCARE PROVIDER</Text>
                  <Text>2021-2022</Text>
                </View>
                <Text style={styles.bullet}>• Managed end-to-end implementation of Salesforce Healthcare Cloud for network of 12 hospitals</Text>
                <Text style={styles.bullet}>• Integrated CRM with existing EHR system to create unified patient view and improve care coordination</Text>
                <Text style={styles.bullet}>• Trained 200+ staff members on new system, resulting in 90% adoption rate within first month</Text>
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
                  <Text style={styles.company}>EMORY UNIVERSITY, GOIZUETA BUSINESS SCHOOL</Text>
                  <Text>Atlanta, GA • May 2019</Text>
                </View>
                <Text style={styles.role}>Master of Business Administration (MBA), Concentration in Information Systems</Text>
                <Text>GPA: 3.8/4.0 • Beta Gamma Sigma Honor Society</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>GEORGIA INSTITUTE OF TECHNOLOGY</Text>
                  <Text>Atlanta, GA • May 2017</Text>
                </View>
                <Text style={styles.role}>Bachelor of Science in Industrial Engineering</Text>
                <Text>GPA: 3.7/4.0 • Minor in Computer Science</Text>
              </View>
            </>
          )}
        </View>

        {/* Certifications & Awards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS & AWARDS</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• Project Management Professional (PMP) Certification</Text>
              <Text style={styles.bullet}>• AWS Certified Solutions Architect - Associate</Text>
              <Text style={styles.bullet}>• Salesforce Certified Administrator</Text>
              <Text style={styles.bullet}>• Deloitte Outstanding Performance Award (2022)</Text>
              <Text style={styles.bullet}>• Accenture Rising Star Award (2020)</Text>
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

export default ITConsultingResume;
