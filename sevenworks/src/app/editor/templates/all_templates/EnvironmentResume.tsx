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

const EnvironmentResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "RILEY"} {formData.middleName ? `${formData.middleName} ` : ""}
            {formData.lastName || "ENVIRONMENT"}
          </Text>
          <Text style={styles.contactInfo}>
            {formData.address || "123 Green Street, Atlanta, GA 30322"} | {formData.phone || "(404) 555-1234"} | {formData.email || "riley.environment@email.com"}
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
                  <Text style={styles.itemTitle}>EMORY UNIVERSITY</Text>
                  <Text>Master of Science in Environmental Sciences</Text>
                  <Text>Concentration: Conservation Ecology and Sustainable Development</Text>
                  <Text>GPA: 3.9/4.0</Text>
                  <Text>Thesis: "Impact of Urban Green Spaces on Air Quality and Community Health in Atlanta"</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Atlanta, GA</Text>
                  <Text>May 2023</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={styles.institution}>
                  <Text style={styles.itemTitle}>UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL</Text>
                  <Text>Bachelor of Science in Environmental Science, Minor in Public Policy</Text>
                  <Text>GPA: 3.8/4.0, Magna Cum Laude</Text>
                  <Text>Capstone Project: "Watershed Management Strategies for the Piedmont Region"</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Chapel Hill, NC</Text>
                  <Text>May 2020</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* SKILLS & EXPERTISE */}
        <View>
          <Text style={styles.sectionHeader}>SKILLS & EXPERTISE</Text>
          
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            // Use actual skills and interests data
            <Text>{formData.skillsInterests}</Text>
          ) : (
            // Default skills entries
            <>
              <Text style={styles.bullet}>• Environmental Assessment: Environmental Impact Assessment (EIA), Ecological Risk Assessment, Habitat Assessment</Text>
              <Text style={styles.bullet}>• Field Research: Water & Soil Sampling, Species Identification, Survey Design, Biodiversity Monitoring</Text>
              <Text style={styles.bullet}>• Data Analysis: GIS (ArcGIS, QGIS), R, Python, Statistical Analysis, Remote Sensing, Environmental Modeling</Text>
              <Text style={styles.bullet}>• Regulatory Compliance: NEPA, Clean Water Act, ESA, CERCLA, State Environmental Regulations</Text>
              <Text style={styles.bullet}>• Technical Writing: Environmental Reports, Grant Proposals, Policy Briefs, Scientific Publications</Text>
              <Text style={styles.bullet}>• Sustainability: Climate Action Planning, Carbon Footprint Analysis, Renewable Energy, Green Building (LEED)</Text>
            </>
          )}
        </View>

        {/* PROFESSIONAL EXPERIENCE */}
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
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                  exp.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                  ))
                ) : (
                  <>
                    <Text style={styles.bullet}>• Conducted environmental assessments and implemented conservation strategies</Text>
                    <Text style={styles.bullet}>• Collaborated with stakeholders on sustainable development initiatives</Text>
                    <Text style={styles.bullet}>• Analyzed environmental data and prepared technical reports</Text>
                  </>
                )}
              </View>
            ))
          ) : (
            // Default experience entries
            <>
              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>ENVIRONMENTAL PROTECTION AGENCY (EPA), REGION 4</Text>
                    <Text style={styles.itemRole}>Environmental Scientist</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Jun 2023 – Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Conduct environmental assessments and compliance inspections for industrial facilities under the Clean Water Act</Text>
                <Text style={styles.bullet}>• Analyze water quality data from monitoring networks to identify pollution trends and sources</Text>
                <Text style={styles.bullet}>• Develop technical guidance documents on best management practices for watershed protection</Text>
                <Text style={styles.bullet}>• Collaborate with state agencies and local governments on water quality improvement projects</Text>
                <Text style={styles.bullet}>• Present environmental data and findings to diverse stakeholders and community groups</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>THE NATURE CONSERVANCY</Text>
                    <Text style={styles.itemRole}>Conservation Project Coordinator</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Aug 2021 – May 2023</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Managed urban forestry initiatives, coordinating with city planners to increase tree canopy coverage by 15%</Text>
                <Text style={styles.bullet}>• Developed GIS mapping of conservation priority areas, identifying 500+ acres for potential protection</Text>
                <Text style={styles.bullet}>• Assisted in securing $250,000 in grant funding for wetland restoration projects</Text>
                <Text style={styles.bullet}>• Organized volunteer events engaging 500+ community members in habitat restoration activities</Text>
                <Text style={styles.bullet}>• Wrote quarterly reports and policy briefs on conservation outcomes and ecosystem services</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>ARCADIS</Text>
                    <Text style={styles.itemRole}>Environmental Consultant (Intern)</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Raleigh, NC</Text>
                    <Text>May – Aug 2020</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Assisted senior consultants with environmental site assessments and remediation planning</Text>
                <Text style={styles.bullet}>• Collected and analyzed soil and groundwater samples from contaminated sites</Text>
                <Text style={styles.bullet}>• Prepared Phase I Environmental Site Assessment reports for commercial property transactions</Text>
                <Text style={styles.bullet}>• Conducted research on emerging contaminants and regulatory developments</Text>
              </View>
            </>
          )}
        </View>

        {/* RESEARCH & PROJECTS */}
        <View>
          <Text style={styles.sectionHeader}>RESEARCH & PROJECTS</Text>
          
          {hasContent(formData.leadership, ['title', 'description']) ? (
            // Map through leadership data as research projects
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.itemContent}>
                <Text style={styles.itemTitle}>{lead.title || ""}</Text>
                {Array.isArray(lead.bullets) && lead.bullets.length > 0 ? (
                  lead.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                  ))
                ) : (
                  <Text style={styles.bullet}>• {lead.description || ""}</Text>
                )}
              </View>
            ))
          ) : (
            // Default project entries
            <>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>URBAN AIR QUALITY MONITORING NETWORK</Text>
                <Text style={styles.bullet}>• Designed and deployed a network of 15 low-cost air quality sensors across Atlanta neighborhoods</Text>
                <Text style={styles.bullet}>• Analyzed spatial patterns of PM2.5 and ozone in relation to traffic density and green spaces</Text>
                <Text style={styles.bullet}>• Created interactive data visualization dashboard for community access to real-time air quality data</Text>
                <Text style={styles.bullet}>• Findings presented at the American Association for Aerosol Research Conference</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>CLIMATE VULNERABILITY ASSESSMENT</Text>
                <Text style={styles.bullet}>• Conducted GIS analysis to identify communities most vulnerable to climate change impacts in Georgia</Text>
                <Text style={styles.bullet}>• Integrated social vulnerability indices with flood risk, extreme heat, and other climate hazards</Text>
                <Text style={styles.bullet}>• Developed adaptation recommendations for local governments and emergency management agencies</Text>
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
            // Default certifications and awards
            <>
              <Text style={styles.bullet}>• Certified Environmental Professional (CEP), Institute of Professional Environmental Practice</Text>
              <Text style={styles.bullet}>• Geographic Information Systems Professional (GISP)</Text>
              <Text style={styles.bullet}>• Hazardous Waste Operations and Emergency Response (HAZWOPER) 40-Hour Certification</Text>
              <Text style={styles.bullet}>• National Science Foundation Graduate Research Fellowship (2020-2023)</Text>
              <Text style={styles.bullet}>• Environmental Leadership Award, Georgia Environmental Organization (2022)</Text>
            </>
          )}
        </View>

        {/* LEADERSHIP & PROFESSIONAL AFFILIATIONS */}
        <View>
          <Text style={styles.sectionHeader}>LEADERSHIP & PROFESSIONAL AFFILIATIONS</Text>
          
          <View style={styles.itemContent}>
            <View style={styles.flexRow}>
              <Text style={styles.itemTitle}>Society of Environmental Scientists and Professionals</Text>
              <Text>2019 – Present</Text>
            </View>
            <Text style={styles.bullet}>• Georgia Chapter Executive Committee Member (2022-Present)</Text>
            <Text style={styles.bullet}>• Early Career Professionals Committee Chair (2021-2022)</Text>
          </View>
          
          <View style={styles.itemContent}>
            <View style={styles.flexRow}>
              <Text style={styles.itemTitle}>Trees Atlanta</Text>
              <Text>2020 – Present</Text>
            </View>
            <Text style={styles.bullet}>• Volunteer Team Leader for community planting and maintenance events</Text>
            <Text style={styles.bullet}>• Contributed 200+ volunteer hours to urban forestry initiatives</Text>
          </View>
        </View>

        {/* PUBLICATIONS & PRESENTATIONS */}
        <View>
          <Text style={styles.sectionHeader}>PUBLICATIONS & PRESENTATIONS</Text>
          
          <Text style={styles.bullet}>• Environment, R., Johnson, T., & Smith, A. (2022). "Spatial Analysis of Urban Green Space Distribution and Air Quality in Atlanta." Journal of Urban Ecology, 15(2), 45-58.</Text>
          <Text style={styles.bullet}>• Environment, R. (2021). "Community-Based Approaches to Climate Resilience." Presented at the Climate Adaptation Forum, Boston, MA.</Text>
          <Text style={styles.bullet}>• Davis, K., Environment, R., & Wilson, J. (2020). "Watershed Management Strategies for Urbanizing Regions." Water Resources Management, 28(3), 112-125.</Text>
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

export default EnvironmentResume;
