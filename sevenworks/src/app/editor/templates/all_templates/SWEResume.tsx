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

const SWEResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "TAYLOR"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "DEVELOPER"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Code Avenue, Atlanta, GA 30322"} | {formData.phone || "(404) 555-0123"} | {formData.email || "tdeveloper@gmail.com"} | github.com/tdeveloper
          </Text>
        </View>

        {/* Skills Section (First for tech resumes) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Languages:</Text> JavaScript, TypeScript, Python, Java, HTML, CSS, SQL</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Frameworks/Libraries:</Text> React, Node.js, Express, Django, Spring Boot, Redux, jQuery</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Tools/Platforms:</Text> Git, AWS (EC2, S3, Lambda), Docker, Jenkins, Jira, REST APIs, GraphQL</Text>
              </View>
              <View style={styles.skill}>
                <Text><Text style={{ fontWeight: 'bold' }}>Databases:</Text> MongoDB, PostgreSQL, MySQL, Firebase</Text>
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
                <Text style={styles.company}>EMORY UNIVERSITY</Text>
                <Text>Atlanta, GA • May 2023</Text>
              </View>
              <Text style={styles.role}>Bachelor of Science in Computer Science, Minor in Mathematics</Text>
              <Text>GPA: 3.85/4.00 • Dean's List (All Semesters)</Text>
              <Text>Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Systems, Computer Networks, Software Engineering, Machine Learning, Web Development</Text>
            </View>
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
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                  exp.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                  ))
                ) : (
                  <>
                    <Text style={styles.bullet}>• Developed and maintained web applications using modern frameworks and technologies</Text>
                    <Text style={styles.bullet}>• Collaborated with cross-functional teams to implement new features and optimize performance</Text>
                    <Text style={styles.bullet}>• Participated in code reviews and ensured high-quality, well-tested code</Text>
                  </>
                )}
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>AMAZON</Text>
                  <Text>Seattle, WA • May - Aug 2022</Text>
                </View>
                <Text style={styles.role}>Software Engineering Intern</Text>
                <Text style={styles.bullet}>• Developed a full-stack feature for internal tool using React, Node.js, and AWS, improving workflow efficiency by 25%</Text>
                <Text style={styles.bullet}>• Implemented RESTful APIs that processed over 10,000 daily requests with 99.9% uptime</Text>
                <Text style={styles.bullet}>• Created automated tests achieving 90% code coverage and reducing QA time by 15%</Text>
                <Text style={styles.bullet}>• Collaborated with 5 team members using agile methodologies, completing all sprint tasks on schedule</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>TECH STARTUP</Text>
                  <Text>Atlanta, GA • Jan - May 2022</Text>
                </View>
                <Text style={styles.role}>Frontend Developer (Part-time)</Text>
                <Text style={styles.bullet}>• Built responsive web interfaces using React and Redux, improving user engagement by 30%</Text>
                <Text style={styles.bullet}>• Optimized application performance, reducing load time by 40% through code splitting and lazy loading</Text>
                <Text style={styles.bullet}>• Integrated third-party APIs for payment processing and user authentication</Text>
              </View>
            </>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((project, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>{project.title || ""}</Text>
                  <Text>{project.years || ""}</Text>
                </View>
                <Text style={styles.role}>{project.role || ""}</Text>
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
                  <Text style={styles.company}>E-COMMERCE PLATFORM</Text>
                  <Text>github.com/tdeveloper/ecommerce</Text>
                </View>
                <Text style={styles.bullet}>• Developed a full-stack e-commerce application with React, Node.js, Express, and MongoDB</Text>
                <Text style={styles.bullet}>• Implemented features including user authentication, product search, shopping cart, and payment processing</Text>
                <Text style={styles.bullet}>• Deployed application on AWS using Docker containers and CI/CD pipeline with GitHub Actions</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>MACHINE LEARNING IMAGE CLASSIFIER</Text>
                  <Text>github.com/tdeveloper/image-ai</Text>
                </View>
                <Text style={styles.bullet}>• Built an image classification model using TensorFlow and Keras with 95% accuracy</Text>
                <Text style={styles.bullet}>• Created a web interface with Flask to allow users to upload and classify images</Text>
                <Text style={styles.bullet}>• Implemented data preprocessing pipeline to handle various image formats and sizes</Text>
              </View>
            </>
          )}
        </View>

        {/* Honors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AWARDS & ACTIVITIES</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• 1st Place, Emory University Hackathon (2022) - Smart City Transportation App</Text>
              <Text style={styles.bullet}>• President, Computer Science Student Association (2021-2023)</Text>
              <Text style={styles.bullet}>• Open Source Contributor - 15+ merged pull requests to popular React libraries</Text>
              <Text style={styles.bullet}>• Teaching Assistant for Data Structures & Algorithms course (2021-2022)</Text>
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

export default SWEResume;
