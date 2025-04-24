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
  bullets?: string[]; // Adding bullets array for leadership entries, similar to experience
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

// Use this interface explicitly for the component props
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
    fontSize: 11,
    padding: 20,
    lineHeight: 1.2,
    color: "#000",
  },
  resumeHeader: {
    textAlign: "center",
    marginBottom: 8,
  },
  resumeName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  resumeContactLinear: {
    fontSize: 11,
    marginBottom: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 2,
  },
  resumeFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 1,
  },
  resumeDateLocation: {
    flexDirection: "column",
    alignItems: "flex-end",
    textAlign: "right",
    fontSize: 11,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  resumeRole: {
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 0,
  },
  bulletItem: {
    marginBottom: 1,
    marginLeft: 5,
    paddingLeft: 5,
  },
  paragraph: {
    marginBottom: 2,
  },
  title: {
    fontWeight: "bold",
  }
});

const PublicPolicyResume = ({ formData }: TemplateProps) => {
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
      fontSize: formData.fontSize || 11,
      padding: 20,
      lineHeight: 1.2,
    },
    name: {
      fontSize: (formData.fontSize || 11) + 3,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    }
  });

  return (
    <Document>
      <Page size="LETTER" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.resumeHeader}>
          <Text style={styles.resumeName}>
            {formData.firstName || "JOHN"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "STUDENT"}
          </Text>
          <Text style={styles.resumeContactLinear}>
            {formData.address || "New York, NY 01234"}
          </Text>
          <Text style={styles.resumeContactLinear}>
            {formData.email || "jstudent@emory.edu"} {formData.phone || "(212) 123-4567"}
          </Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>EDUCATION</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx}>
                <View style={styles.resumeFlex}>
                  <View>
                    <Text><Text style={styles.title}>{edu.institution || ""}</Text>{edu.institution ? ", " : ""}{edu.institution?.includes("Atlanta") ? "" : "Atlanta, GA"}</Text>
                    <Text>{edu.degree || ""}</Text>
                    {idx === 0 && <Text>GPA: 3.8/4.0</Text>}
                    {idx === 0 && <Text style={{fontWeight:"bold"}}><Text style={styles.resumeRole}>Honors and Awards</Text></Text>}
                  </View>
                  <View style={styles.resumeDateLocation}>
                    <Text>{edu.years || "May 2021"}</Text>
                  </View>
                </View>
                {idx === 0 && (
                  <>
                    {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
                      formData.honorsList.map((honor, idx) => (
                        <Text key={idx} style={styles.bulletItem}>• {honor.honor}</Text>
                      ))
                    ) : (
                      <>
                        <Text style={styles.bulletItem}>• Dean's List, 6 semesters</Text>
                        <Text style={styles.bulletItem}>• Pi Sigma Alpha (Political Science Honor Society) – Inducted April 2019</Text>
                        <Text style={styles.bulletItem}>• Selected to Political Science Honors Program; Thesis completed with Honors</Text>
                        <Text style={styles.bulletItem}>• Thesis: <Text style={styles.resumeRole}>Political Engagement in High-Risk Urban Young Adults: Encouraging Activism, Discouraging Apathy</Text></Text>
                      </>
                    )}
                  </>
                )}
              </View>
            ))
          ) : (
            <View>
              <View style={styles.resumeFlex}>
                <View>
                  <Text><Text style={styles.title}>Emory University,</Text> Atlanta, GA</Text>
                  <Text>Bachelor of Arts in Political Science</Text>
                  <Text>GPA: 3.8/4.0</Text>
                  <Text style={{fontWeight:"bold"}}><Text style={styles.resumeRole}>Honors and Awards</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>May 2021</Text>
                </View>
              </View>
              <Text style={styles.bulletItem}>• Dean's List, 6 semesters</Text>
              <Text style={styles.bulletItem}>• Pi Sigma Alpha (Political Science Honor Society) – Inducted April 2019</Text>
              <Text style={styles.bulletItem}>• Selected to Political Science Honors Program; Thesis completed with Honors</Text>
              <Text style={styles.bulletItem}>• Thesis: <Text style={styles.resumeRole}>Political Engagement in High-Risk Urban Young Adults: Encouraging Activism, Discouraging Apathy</Text></Text>
            </View>
          )}
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</Text>

          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx}>
                <View style={styles.resumeFlex}>
                  <View>
                    <Text><Text style={styles.title}>{exp.company || ""}</Text>{exp.company?.includes("NY") ? "" : ", Syracuse, NY"}</Text>
                    <Text style={styles.resumeRole}>{exp.title || ""}</Text>
                  </View>
                  <View style={styles.resumeDateLocation}>
                    <Text>{exp.years || ""}</Text>
                  </View>
                </View>
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                  exp.bullets.map((bullet, idx) => (
                    <Text key={idx} style={styles.bulletItem}>• {bullet}</Text>
                  ))
                ) : (
                  <>
                    <Text style={styles.bulletItem}>• Utilized strong communication and presentation skills while canvassing neighborhoods</Text>
                    <Text style={styles.bulletItem}>• Designed campaign marketing materials including posters, flyers, and banners</Text>
                    <Text style={styles.bulletItem}>• Drafted press releases and brief articles for media</Text>
                    <Text style={styles.bulletItem}>• Gained knowledge of inner workings of politics and campaigns</Text>
                  </>
                )}
              </View>
            ))
          ) : (
            <>
              <View>
                <View style={styles.resumeFlex}>
                  <View>
                    <Text><Text style={styles.title}>Lisa Melguine for Mayor,</Text> Syracuse, NY</Text>
                    <Text style={styles.resumeRole}>Campaign Intern (remote position)</Text>
                  </View>
                  <View style={styles.resumeDateLocation}>
                    <Text>Jun 2020 - Nov 2020</Text>
                  </View>
                </View>
                <Text style={styles.bulletItem}>• Utilized strong communication and presentation skills while canvassing neighborhoods to introduce candidate's platform to residents and other community establishments</Text>
                <Text style={styles.bulletItem}>• Designed campaign marketing materials including posters, flyers, and banners</Text>
                <Text style={styles.bulletItem}>• Drafted press releases and brief articles for media</Text>
                <Text style={styles.bulletItem}>• Gained knowledge of inner workings of politics and campaigns, including coalition building, persuasive presentations, and constituent responsiveness</Text>
              </View>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>The Governor's Intern Program,</Text> Albany, NY</Text>
                  <Text style={styles.resumeRole}>Policy Intern</Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>Jun 2019 - Aug 2019</Text>
                </View>
              </View>
              <Text style={styles.bulletItem}>• Conducted researched and prepared reports on education and health care policy reform, including estimating costs and other logistical processes</Text>
              <Text style={styles.bulletItem}>• Conducted presentations to the Governor and staff on research findings. Received Governor's Research Award, top award for best presentation and research results</Text>
              <Text style={styles.bulletItem}>• Learned the process of creating policy initiatives and transforming them into law</Text>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Office of the Honorable J.C. Bradford,</Text> Brooklyn, NY</Text>
                  <Text style={styles.resumeRole}>Intern</Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>May 2018 - Aug 2018</Text>
                </View>
              </View>
              <Text style={styles.bulletItem}>• Researched policy initiatives and made recommendations to the Congressman for appropriate actions to take on various bills before the House of Representatives</Text>
              <Text style={styles.bulletItem}>• Drafted a weekly email newsletter sent to district constituents on the Congressman's activities and voting record. Increased constituent engagement with newsletter by 35% over previous newsletter format</Text>
              <Text style={styles.bulletItem}>• Responded to constituent concerns by writing response letters. Received favorable constituent praise for thoroughness of replies multiple times</Text>
            </>
          )}
        </View>

        {/* Leadership & Service */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>LEADERSHIP & SERVICE</Text>
          
          {hasContent(formData.leadership, ['title', 'description', 'bullets']) ? (
            formData.leadership?.map((lead, idx) => (
              <View key={idx}>
                <View style={styles.resumeFlex}>
                  <View>
                    <Text><Text style={styles.title}>{lead.title || ""}</Text>{lead.role && <Text>, <Text style={styles.resumeRole}>{lead.role}</Text></Text>}</Text>
                  </View>
                  <View style={styles.resumeDateLocation}>
                    <Text>{lead.years || (idx === 0 ? "Aug 2019 - Present" : idx === 1 ? "Feb 2019 - May 2020" : "Aug 2019 - May 2020")}</Text>
                  </View>
                </View>
                {Array.isArray(lead.bullets) && lead.bullets.length > 0 ? (
                  lead.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.bulletItem}>• {bullet}</Text>
                  ))
                ) : lead.description ? (
                  <Text style={styles.bulletItem}>• {lead.description}</Text>
                ) : (
                  <Text style={styles.bulletItem}>• Contributed to organization's mission and objectives through active participation and leadership</Text>
                )}
              </View>
            ))
          ) : (
            <>
              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Students for a Better Tomorrow,</Text> <Text style={styles.resumeRole}>Founder & President</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>Aug 2019 - Present</Text>
                </View>
              </View>
              <Text style={styles.bulletItem}>• Chartered a student group for Latinx students to become better educated on understanding policy initiatives and how they impact their specific communities</Text>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Beta Theta Pi Fraternity,</Text> <Text style={styles.resumeRole}>Vice President</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>Feb 2019 - May 2020</Text>
                </View>
              </View>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Emory University Intra-Mural Tennis,</Text> <Text style={styles.resumeRole}>Champion</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>Aug 2019 - May 2020</Text>
                </View>
              </View>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Refugee Center of Atlanta,</Text> <Text style={styles.resumeRole}>Volunteer</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>Jan 2017 - May 2019</Text>
                </View>
              </View>

              <View style={styles.resumeFlex}>
                <View>
                <Text><Text style={styles.title}>Children's Division of Brooklyn Community Hospital,</Text> <Text style={styles.resumeRole}>Volunteer</Text></Text>
                </View>
                <View style={styles.resumeDateLocation}>
                  <Text>May 2018 - Aug 2018</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Additional Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ADDITIONAL SKILLS</Text>
          {formData.skillsInterests && formData.skillsInterests.trim() !== '' ? (
            <Text>{formData.skillsInterests}</Text>
          ) : (
            <>
              <Text>Microsoft Word, Excel, Access, PowerPoint, & Adobe Dreamweaver</Text>
              <Text>Fluent in Spanish; Conversational in Italian</Text>
              <Text>Proficient in Facebook, Twitter, YouTube, Tumblr, WordPress</Text>
            </>
          )}
        </View>

        {/* Custom Personal Fields Section if available */}
        {Array.isArray(formData.customPersonal) && formData.customPersonal.length > 0 && formData.customPersonal.some(field => field.label && field.value) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>ADDITIONAL INFORMATION</Text>
            {formData.customPersonal.map((field) => (
              field.label && field.value && (
                <Text key={field.id} style={styles.bulletItem}>
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

export default PublicPolicyResume;
