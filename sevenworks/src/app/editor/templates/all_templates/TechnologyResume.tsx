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

const TechnologyResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "MORGAN"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "TECH"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Innovation Boulevard, Atlanta, GA 30322"} | {formData.phone || "(404) 555-8765"} | {formData.email || "mtech@gmail.com"} | github.com/morgantech
          </Text>
        </View>

        {/* Skills Section (First for tech resumes) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS & COMPETENCIES</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Programming Languages:</Text> JavaScript/TypeScript, Python, Java, C/C++, Go, Ruby, PHP</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Web Technologies:</Text> React.js, Angular, Vue.js, Node.js, Express, HTML5, CSS3/SCSS, RESTful APIs, GraphQL</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>DevOps & Infrastructure:</Text> AWS, Google Cloud, Azure, Docker, Kubernetes, CI/CD, Jenkins, Terraform, Linux</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Databases & Data:</Text> SQL (PostgreSQL, MySQL), NoSQL (MongoDB, DynamoDB), Redis, Elasticsearch, Data Modeling</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Tools & Methodologies:</Text> Git, JIRA, Agile/Scrum, Test-Driven Development, Microservices Architecture</Text>
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
                <Text style={styles.bullet}>• Developed robust applications using modern technologies and best practices</Text>
                <Text style={styles.bullet}>• Collaborated with cross-functional teams to deliver high-quality software solutions</Text>
                <Text style={styles.bullet}>• Implemented efficient algorithms and optimized system performance</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>GOOGLE</Text>
                  <Text>Mountain View, CA • Jul 2022 - Present</Text>
                </View>
                <Text style={styles.role}>Senior Software Engineer</Text>
                <Text style={styles.bullet}>• Lead development of cloud-based data processing pipeline handling 5TB of data daily with 99.99% uptime</Text>
                <Text style={styles.bullet}>• Architect and implement microservices using Go and Kubernetes, improving system scalability and fault tolerance</Text>
                <Text style={styles.bullet}>• Mentor junior engineers through code reviews and pair programming sessions</Text>
                <Text style={styles.bullet}>• Collaborate with product managers and designers to define and refine product requirements</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>MICROSOFT</Text>
                  <Text>Redmond, WA • Jun 2019 - Jun 2022</Text>
                </View>
                <Text style={styles.role}>Software Development Engineer</Text>
                <Text style={styles.bullet}>• Developed features for Azure DevOps using TypeScript, React, and C#, improving user productivity by 35%</Text>
                <Text style={styles.bullet}>• Implemented CI/CD pipelines that reduced deployment time by 50% and increased release frequency</Text>
                <Text style={styles.bullet}>• Fixed critical security vulnerabilities, enhancing platform robustness and customer trust</Text>
                <Text style={styles.bullet}>• Participated in on-call rotation, troubleshooting and resolving production issues</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>STARTUP TECH</Text>
                  <Text>San Francisco, CA • Jan 2018 - May 2019</Text>
                </View>
                <Text style={styles.role}>Full Stack Developer</Text>
                <Text style={styles.bullet}>• Built responsive web application using React.js and Node.js, serving 10,000+ daily active users</Text>
                <Text style={styles.bullet}>• Designed and implemented RESTful API endpoints consumed by web and mobile applications</Text>
                <Text style={styles.bullet}>• Created automated testing suite that achieved 80% code coverage, significantly reducing bugs</Text>
              </View>
            </>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL PROJECTS</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((project, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <Text style={styles.company}>{project.title || ""}</Text>
                <Text style={styles.bullet}>• {project.description || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>DISTRIBUTED MESSAGING SYSTEM</Text>
                  <Text>github.com/morgantech/messaging</Text>
                </View>
                <Text style={styles.bullet}>• Designed and implemented a high-performance distributed messaging system using Go and gRPC</Text>
                <Text style={styles.bullet}>• Created fault-tolerant architecture capable of handling 100,000+ messages per second</Text>
                <Text style={styles.bullet}>• Open-source project with 500+ GitHub stars and 50+ contributors</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>AI-POWERED CODE ASSISTANT</Text>
                  <Text>github.com/morgantech/codeai</Text>
                </View>
                <Text style={styles.bullet}>• Developed VS Code extension using TypeScript that provides intelligent code suggestions</Text>
                <Text style={styles.bullet}>• Integrated with OpenAI API to enable natural language code generation</Text>
                <Text style={styles.bullet}>• Published to VS Code Marketplace with 10,000+ active installs and 4.8/5 rating</Text>
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
            <View style={styles.detailsContainer}>
              <View style={styles.flexRow}>
                <Text style={styles.company}>MASSACHUSETTS INSTITUTE OF TECHNOLOGY (MIT)</Text>
                <Text>Cambridge, MA • May 2018</Text>
              </View>
              <Text style={styles.role}>Bachelor of Science in Computer Science and Engineering</Text>
              <Text>GPA: 3.92/4.00 • Minor in Mathematics</Text>
              <Text>Relevant Coursework: Algorithms, Distributed Systems, Machine Learning, Computer Networks, Database Systems, Software Engineering</Text>
            </View>
          )}
        </View>

        {/* Awards & Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AWARDS & ACTIVITIES</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• Google Peer Bonus Award for Excellence in Engineering (2023)</Text>
              <Text style={styles.bullet}>• Microsoft Hackathon Winner - AI Category (2021)</Text>
              <Text style={styles.bullet}>• ACM ICPC Programming Contest, North America Regional Finalist (2017)</Text>
              <Text style={styles.bullet}>• Open Source Contributor to Kubernetes, React, and TensorFlow projects</Text>
              <Text style={styles.bullet}>• Conference Speaker at KubeCon, ReactConf, and GoLang Summit</Text>
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

export default TechnologyResume;
