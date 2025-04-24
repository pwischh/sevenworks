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
  organization: {
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

const JournalismResume = ({ formData }: TemplateProps) => {
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
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={dynamicStyles.name}>
            {formData.firstName || "MORGAN"} {formData.middleName ? formData.middleName + " " : ""}
            {formData.lastName || "WRITER"}
          </Text>
          <Text style={styles.contact}>
            {formData.address || "123 Press Avenue, Atlanta, GA 30322"} | {formData.phone || "(404) 555-7890"} | {formData.email || "mwriter@gmail.com"}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {hasContent(formData.education, ['degree', 'institution']) ? (
            formData.education?.map((edu, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{edu.institution || ""}</Text>
                  <Text>{edu.years || ""}</Text>
                </View>
                <Text style={styles.role}>{edu.degree || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>EMORY UNIVERSITY</Text>
                  <Text>Atlanta, GA • May 2023</Text>
                </View>
                <Text style={styles.role}>Bachelor of Arts in Journalism and Media Studies, Minor in Political Science</Text>
                <Text style={styles.bullet}>• GPA: 3.8/4.0, Magna Cum Laude</Text>
                <Text style={styles.bullet}>• Relevant Coursework: Investigative Reporting, Multimedia Storytelling, Data Journalism, Media Ethics, Feature Writing, Broadcast Journalism</Text>
                <Text style={styles.bullet}>• Senior Thesis: "Changing Landscapes of Local News in Digital Media Ecosystems"</Text>
              </View>
            </>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>JOURNALISM EXPERIENCE</Text>
          {hasContent(formData.experience, ['title', 'company']) ? (
            formData.experience?.map((exp, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>{exp.company || ""}</Text>
                  <Text>{exp.years || ""}</Text>
                </View>
                <Text style={styles.role}>{exp.title || ""}</Text>
                <Text style={styles.bullet}>• Reported on and created engaging content for diverse audiences</Text>
                <Text style={styles.bullet}>• Conducted interviews and research to develop comprehensive stories</Text>
                <Text style={styles.bullet}>• Collaborated with editors and team members to meet publication deadlines</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>THE ATLANTA JOURNAL-CONSTITUTION</Text>
                  <Text>Atlanta, GA • Jan 2023 - Present</Text>
                </View>
                <Text style={styles.role}>Junior Reporter, Local News</Text>
                <Text style={styles.bullet}>• Report on city government, local politics, and community issues for Atlanta's largest daily newspaper</Text>
                <Text style={styles.bullet}>• Produce 3-5 stories weekly for print and digital platforms, including multimedia content</Text>
                <Text style={styles.bullet}>• Cover breaking news and develop enterprise stories on urban development and social justice issues</Text>
                <Text style={styles.bullet}>• Maintain active engagement on social media platforms to promote stories and interact with readers</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>NPR AFFILIATE WABE 90.1 FM</Text>
                  <Text>Atlanta, GA • May - Dec 2022</Text>
                </View>
                <Text style={styles.role}>News Intern</Text>
                <Text style={styles.bullet}>• Assisted producers and reporters with research, fact-checking, and pre-interview preparation</Text>
                <Text style={styles.bullet}>• Produced 3 radio packages that aired during "Morning Edition" and "All Things Considered"</Text>
                <Text style={styles.bullet}>• Conducted person-on-the-street interviews and gathered ambient sound for news stories</Text>
                <Text style={styles.bullet}>• Wrote web versions of broadcast stories for station website and social media channels</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.organization}>THE EMORY WHEEL</Text>
                  <Text>Atlanta, GA • Aug 2020 - May 2023</Text>
                </View>
                <Text style={styles.role}>News Editor (2022-2023); Staff Writer (2020-2022)</Text>
                <Text style={styles.bullet}>• Managed team of 10 reporters, assigning stories and providing editorial guidance</Text>
                <Text style={styles.bullet}>• Published over 45 articles covering campus news, events, and administrative decisions</Text>
                <Text style={styles.bullet}>• Led investigation into university housing policies that resulted in policy changes</Text>
                <Text style={styles.bullet}>• Redesigned news section layout, increasing readership by 30% according to analytics</Text>
              </View>
            </>
          )}
        </View>

        {/* Multimedia Projects & Publications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MULTIMEDIA PROJECTS & PUBLICATIONS</Text>
          {hasContent(formData.leadership, ['title', 'description']) ? (
            formData.leadership?.map((project, idx) => (
              <View key={idx} style={styles.detailsContainer}>
                <Text style={styles.organization}>{project.title || ""}</Text>
                <Text style={styles.bullet}>• {project.description || ""}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.detailsContainer}>
                <Text style={styles.organization}>"Forgotten Neighborhoods: Atlanta's Infrastructure Inequality" (2023)</Text>
                <Text style={styles.bullet}>• Produced five-part investigative series examining infrastructure disparities across Atlanta neighborhoods</Text>
                <Text style={styles.bullet}>• Created interactive map using GIS data to visualize resource allocation patterns</Text>
                <Text style={styles.bullet}>• Series received Georgia Press Association award for investigative reporting</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.organization}>"Voices of the Pandemic" Podcast Series (2021-2022)</Text>
                <Text style={styles.bullet}>• Conceptualized and produced 8-episode podcast highlighting personal stories during COVID-19</Text>
                <Text style={styles.bullet}>• Conducted interviews, edited audio, and developed narrative structure for each episode</Text>
                <Text style={styles.bullet}>• Generated over 15,000 downloads across streaming platforms</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.organization}>Freelance Articles</Text>
                <Text style={styles.bullet}>• Published articles in Atlanta Magazine, Georgia Trend, and The Georgia Straight</Text>
                <Text style={styles.bullet}>• Topics include local arts, food culture, and profiles of community leaders</Text>
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
              <Text style={styles.bullet}>• Reporting & Writing: AP Style, feature writing, news writing, investigative reporting, fact-checking</Text>
              <Text style={styles.bullet}>• Audio/Visual: Adobe Audition, Premiere Pro, Photoshop, DSLR photography, audio recording</Text>
              <Text style={styles.bullet}>• Data Journalism: Data visualization, basic coding (HTML, CSS, R), spreadsheet analysis</Text>
              <Text style={styles.bullet}>• Digital Media: Social media management, SEO, content management systems (WordPress, Arc Publishing)</Text>
              <Text style={styles.bullet}>• Languages: English (native), Spanish (proficient)</Text>
            </>
          )}
        </View>

        {/* Awards & Recognition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AWARDS & RECOGNITION</Text>
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            <>
              <Text style={styles.bullet}>• Georgia College Press Association Award for Best News Article (2022)</Text>
              <Text style={styles.bullet}>• Emory University Excellence in Journalism Scholarship (2021-2023)</Text>
              <Text style={styles.bullet}>• Society of Professional Journalists Mark of Excellence Award, Regional Finalist (2022)</Text>
              <Text style={styles.bullet}>• Selected for Poynter Institute's College Media Project (2022)</Text>
              <Text style={styles.bullet}>• James M. Cox Jr. Foundation Journalism Fellowship (2022)</Text>
            </>
          )}
        </View>

        {/* Professional Memberships Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL MEMBERSHIPS</Text>
          <Text style={styles.bullet}>• Society of Professional Journalists, Student Member</Text>
          <Text style={styles.bullet}>• Online News Association, Student Member</Text>
          <Text style={styles.bullet}>• National Association of Black Journalists, Student Member</Text>
          <Text style={styles.bullet}>• Investigative Reporters and Editors, Student Member</Text>
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

export default JournalismResume;
