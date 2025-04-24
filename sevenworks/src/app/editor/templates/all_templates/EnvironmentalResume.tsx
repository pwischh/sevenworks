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
});

const EnvironmentalResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "JAMIE"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "EARTH"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Sustainable Street, Atlanta, GA 30322"} | {formData.phone || "(404) 555-1234"} | {formData.email || "jearth@gmail.com"}
          </Text>
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
                  <Text>Atlanta, GA • May 2022</Text>
                </View>
                <Text style={styles.role}>Master of Science in Environmental Sciences</Text>
                <Text style={styles.bullet}>• GPA: 3.85/4.00</Text>
                <Text style={styles.bullet}>• Thesis: "Urban Heat Island Mitigation Strategies through Green Infrastructure Implementation"</Text>
                <Text style={styles.bullet}>• Relevant Coursework: Environmental Policy, Conservation Biology, Climate Science, GIS for Environmental Analysis, Environmental Justice, Sustainable Development</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>UNIVERSITY OF GEORGIA</Text>
                  <Text>Athens, GA • May 2020</Text>
                </View>
                <Text style={styles.role}>Bachelor of Science in Environmental Engineering, Minor in Public Policy</Text>
                <Text style={styles.bullet}>• GPA: 3.78/4.00, Magna Cum Laude</Text>
                <Text style={styles.bullet}>• Honors Thesis: "Assessing Microplastic Pollution in Urban Watersheds"</Text>
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
                <Text style={styles.bullet}>• Conducted environmental assessments and developed sustainable initiatives</Text>
                <Text style={styles.bullet}>• Collaborated with stakeholders to implement eco-friendly practices</Text>
                <Text style={styles.bullet}>• Analyzed environmental data to inform policy decisions and project planning</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>U.S. ENVIRONMENTAL PROTECTION AGENCY, REGION 4</Text>
                  <Text>Atlanta, GA • Jul 2022 - Present</Text>
                </View>
                <Text style={styles.role}>Environmental Scientist</Text>
                <Text style={styles.bullet}>• Conduct environmental impact assessments for proposed development projects in the Southeast region</Text>
                <Text style={styles.bullet}>• Analyze water quality data from 15+ monitoring stations to track compliance with Clean Water Act standards</Text>
                <Text style={styles.bullet}>• Collaborate with state agencies and local stakeholders on watershed protection initiatives</Text>
                <Text style={styles.bullet}>• Prepare technical reports and give presentations to community groups on environmental findings</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>THE NATURE CONSERVANCY</Text>
                  <Text>Atlanta, GA • May - Aug 2021</Text>
                </View>
                <Text style={styles.role}>Conservation Policy Intern</Text>
                <Text style={styles.bullet}>• Researched state-level conservation policies and prepared briefings for advocacy team</Text>
                <Text style={styles.bullet}>• Assisted in developing GIS maps of priority conservation areas in Georgia</Text>
                <Text style={styles.bullet}>• Supported community outreach efforts for urban conservation initiatives</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>ATLANTA REGIONAL COMMISSION</Text>
                  <Text>Atlanta, GA • Jan - Apr 2021</Text>
                </View>
                <Text style={styles.role}>Sustainability Planning Assistant</Text>
                <Text style={styles.bullet}>• Contributed to the development of Atlanta's Climate Action Plan through research and stakeholder engagement</Text>
                <Text style={styles.bullet}>• Conducted analysis of transportation emissions data to inform sustainable mobility planning</Text>
                <Text style={styles.bullet}>• Assisted in organizing community workshops on climate resilience strategies</Text>
              </View>
            </>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESEARCH & FIELD PROJECTS</Text>
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
                  <Text style={styles.company}>CHATTAHOOCHEE RIVER WATERSHED MONITORING PROJECT</Text>
                  <Text>2021-2022</Text>
                </View>
                <Text style={styles.bullet}>• Led team of 4 researchers in quarterly water quality sampling at 12 sites along the Chattahoochee River</Text>
                <Text style={styles.bullet}>• Analyzed macroinvertebrate populations as indicators of ecosystem health</Text>
                <Text style={styles.bullet}>• Developed interactive map of findings for public education on watershed health</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.company}>URBAN HEAT ISLAND MITIGATION STUDY</Text>
                  <Text>2020-2021</Text>
                </View>
                <Text style={styles.bullet}>• Designed research methodology to assess temperature differences across Atlanta neighborhoods</Text>
                <Text style={styles.bullet}>• Correlated urban canopy cover with temperature data using GIS analysis</Text>
                <Text style={styles.bullet}>• Presented findings at the Southeastern Climate Conference, leading to implementation of cooling strategies in vulnerable neighborhoods</Text>
              </View>
            </>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <Text style={styles.bullet}>• Environmental Monitoring: Water quality testing, soil sampling, air quality monitoring, ecological surveys</Text>
              <Text style={styles.bullet}>• Technical Tools: ArcGIS, QGIS, R, Python, EPA-SWMM, EnviroMapper, Remote sensing analysis</Text>
              <Text style={styles.bullet}>• Laboratory Techniques: Spectrophotometry, chromatography, microbiology, water/soil analytics</Text>
              <Text style={styles.bullet}>• Policy Analysis: Environmental impact assessment, regulatory compliance, policy evaluation</Text>
              <Text style={styles.bullet}>• Field Experience: Wetland delineation, habitat assessment, biodiversity surveys, GPS mapping</Text>
            </>
          )}
        </View>

        {/* Awards & Certifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AWARDS & CERTIFICATIONS</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• USACE Wetland Delineation Certification</Text>
              <Text style={styles.bullet}>• HAZWOPER 40-Hour Certification</Text>
              <Text style={styles.bullet}>• Emory Environmental Leadership Award (2022)</Text>
              <Text style={styles.bullet}>• EPA STAR Graduate Fellowship</Text>
              <Text style={styles.bullet}>• GIS Professional (GISP) Certification</Text>
            </>
          )}
        </View>

        {/* Professional Affiliations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL AFFILIATIONS</Text>
          <Text style={styles.bullet}>• Society of Environmental Scientists and Engineers</Text>
          <Text style={styles.bullet}>• American Association for the Advancement of Science</Text>
          <Text style={styles.bullet}>• Georgia Environmental Network</Text>
          <Text style={styles.bullet}>• Urban Land Institute - Sustainable Development Council</Text>
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

export default EnvironmentalResume;