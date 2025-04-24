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

const MuseumResume = ({ formData }: TemplateProps) => {
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
            {formData.firstName || "JAMIE"} {formData.middleName ? `${formData.middleName} ` : ""}
            {formData.lastName || "CURATOR"}
          </Text>
          <Text style={styles.contactInfo}>
            {formData.address || "123 Gallery Lane, Atlanta, GA 30322"} | {formData.phone || "(404) 555-1234"} | {formData.email || "jamie.curator@email.com"}
          </Text>
        </View>

        {/* PROFESSIONAL SUMMARY */}
        <View>
          <Text style={styles.sectionHeader}>PROFESSIONAL SUMMARY</Text>
          <Text>Dedicated museum professional with expertise in exhibition development, collections management, and visitor engagement. Strong background in art history and museum education. Committed to creating inclusive, engaging, and accessible cultural experiences that connect diverse audiences with art and cultural heritage.</Text>
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
                  <Text style={styles.itemTitle}>NEW YORK UNIVERSITY</Text>
                  <Text>Master of Arts in Museum Studies</Text>
                  <Text>Concentration: Curatorial Practice and Exhibition Development</Text>
                  <Text>GPA: 3.9/4.0</Text>
                  <Text>Thesis: "Reimagining Visitor Engagement: Interactive Technologies in Contemporary Art Museums"</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>New York, NY</Text>
                  <Text>May 2021</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={styles.institution}>
                  <Text style={styles.itemTitle}>EMORY UNIVERSITY</Text>
                  <Text>Bachelor of Arts in Art History, Minor in Anthropology</Text>
                  <Text>GPA: 3.7/4.0, Magna Cum Laude</Text>
                  <Text>Honors Thesis: "Representation of Cultural Identity in Contemporary Southern Art"</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>Atlanta, GA</Text>
                  <Text>May 2019</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* MUSEUM EXPERIENCE */}
        <View>
          <Text style={styles.sectionHeader}>MUSEUM EXPERIENCE</Text>
          
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
                {Array.isArray(exp.bullets) && exp.bullets.map((bullet, bulletIdx) => (
                  <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))
          ) : (
            // Default experience entries
            <>
              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>HIGH MUSEUM OF ART</Text>
                    <Text style={styles.itemRole}>Assistant Curator, Contemporary Art</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Atlanta, GA</Text>
                    <Text>Jun 2022 – Present</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Curate and develop 3-4 exhibitions annually, including research, artwork selection, and interpretive materials</Text>
                <Text style={styles.bullet}>• Manage a collection of over 1,000 contemporary artworks, overseeing new acquisitions and loans</Text>
                <Text style={styles.bullet}>• Write exhibition catalogs, gallery text, and digital content for museum website and social media</Text>
                <Text style={styles.bullet}>• Collaborate with education department to create engaging programming for diverse audiences</Text>
                <Text style={styles.bullet}>• Assist in fundraising initiatives, including grant writing and donor cultivation events</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>BROOKLYN MUSEUM</Text>
                    <Text style={styles.itemRole}>Curatorial Assistant</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>Brooklyn, NY</Text>
                    <Text>Aug 2021 – May 2022</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Supported senior curators in research, exhibition planning, and installation for 5 major exhibitions</Text>
                <Text style={styles.bullet}>• Coordinated with registrar's office on artwork loans, shipping, and installation requirements</Text>
                <Text style={styles.bullet}>• Conducted research on collection objects and potential acquisitions</Text>
                <Text style={styles.bullet}>• Developed content for audio guides, gallery labels, and digital interactives</Text>
                <Text style={styles.bullet}>• Led gallery tours for members, donors, and special interest groups</Text>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.flexRow}>
                  <View style={styles.institution}>
                    <Text style={styles.itemTitle}>WHITNEY MUSEUM OF AMERICAN ART</Text>
                    <Text style={styles.itemRole}>Curatorial Intern</Text>
                  </View>
                  <View style={styles.dateLocation}>
                    <Text>New York, NY</Text>
                    <Text>Jan – May 2021</Text>
                  </View>
                </View>
                <Text style={styles.bullet}>• Assisted with research and development for "American Perspectives" exhibition</Text>
                <Text style={styles.bullet}>• Created database of contemporary artists from the Southern United States</Text>
                <Text style={styles.bullet}>• Compiled bibliographic information and artwork documentation</Text>
                <Text style={styles.bullet}>• Prepared materials for curatorial meetings and presentations</Text>
              </View>
            </>
          )}
        </View>

        {/* EXHIBITIONS & PROJECTS */}
        <View>
          <Text style={styles.sectionHeader}>EXHIBITIONS & PROJECTS</Text>
          
          {hasContent(formData.leadership, ['title']) ? (
            // Map through leadership data as exhibitions/projects
            formData.leadership?.map((lead, idx) => (
              <View key={idx} style={styles.itemContent}>
                <Text style={styles.itemTitle}>{lead.title || ""}</Text>
                {lead.description && <Text style={styles.bullet}>• {lead.description}</Text>}
                {Array.isArray(lead.bullets) && lead.bullets.map((bullet, bulletIdx) => (
                  <Text key={bulletIdx} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))
          ) : (
            // Default exhibition entries
            <>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>"NEW VOICES: EMERGING ARTISTS FROM THE SOUTH" (CURATOR)</Text>
                <Text style={styles.bullet}>• Curated exhibition featuring 15 emerging artists exploring themes of identity, place, and history</Text>
                <Text style={styles.bullet}>• Developed exhibition concept, selected artworks, and wrote catalog and interpretive materials</Text>
                <Text style={styles.bullet}>• Secured $25,000 in grant funding and coordinated with development team for additional support</Text>
                <Text style={styles.bullet}>• Oversaw installation design and collaborated with education department on public programming</Text>
                <Text style={styles.bullet}>• Exhibition received critical acclaim in ArtForum and The Atlanta Journal-Constitution</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>"DIGITAL NARRATIVES: TECHNOLOGY IN CONTEMPORARY ART" (CO-CURATOR)</Text>
                <Text style={styles.bullet}>• Co-curated exhibition exploring the intersection of technology and contemporary art practices</Text>
                <Text style={styles.bullet}>• Managed relationships with artists working in new media, VR, and interactive installations</Text>
                <Text style={styles.bullet}>• Coordinated technical requirements and solved complex installation challenges</Text>
                <Text style={styles.bullet}>• Developed interactive components increasing visitor engagement by 35% compared to previous exhibitions</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>COLLECTION DIGITIZATION PROJECT</Text>
                <Text style={styles.bullet}>• Led initiative to digitize contemporary art collection, improving accessibility and research capabilities</Text>
                <Text style={styles.bullet}>• Created metadata standards and workflows for processing over 1,000 artworks</Text>
                <Text style={styles.bullet}>• Collaborated with IT department to integrate digital assets into collection management system</Text>
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
              <Text style={styles.bullet}>• Collections Management: PastPerfect, TMS (The Museum System), condition reporting, preventive conservation</Text>
              <Text style={styles.bullet}>• Exhibition Development: Concept development, spatial planning, installation design, interpretive material creation</Text>
              <Text style={styles.bullet}>• Digital Tools: Adobe Creative Suite, SketchUp, collection database management, digital asset management</Text>
              <Text style={styles.bullet}>• Research: Archival research, provenance research, contemporary art history, Southern art and culture</Text>
              <Text style={styles.bullet}>• Public Engagement: Gallery talks, public lectures, donor tours, community outreach, educational programming</Text>
              <Text style={styles.bullet}>• Languages: Fluent in French, proficient in Spanish</Text>
            </>
          )}
        </View>

        {/* PUBLICATIONS & PRESENTATIONS */}
        <View>
          <Text style={styles.sectionHeader}>PUBLICATIONS & PRESENTATIONS</Text>
          
          {Array.isArray(formData.honorsList) && formData.honorsList.some(h => h.honor && h.honor.trim() !== '') ? (
            // Map through actual honors data as publications
            formData.honorsList.filter(h => h.honor && h.honor.trim() !== '').map((honor, idx) => (
              <Text key={idx} style={styles.bullet}>• {honor.honor}</Text>
            ))
          ) : (
            // Default publication entries
            <>
              <Text style={styles.bullet}>• Curator, J. (2023). "New Voices: Emerging Artists from the South." Exhibition catalog, High Museum of Art.</Text>
              <Text style={styles.bullet}>• Curator, J. (2022). "Digital Engagement in Art Museums: New Frontiers." Journal of Museum Studies, 28(2), 45-58.</Text>
              <Text style={styles.bullet}>• "Technology as Artistic Medium: Challenges and Opportunities for Museums." Panel moderator, American Alliance of Museums Annual Conference, 2023.</Text>
              <Text style={styles.bullet}>• "Community Engagement in Exhibition Development." Presentation at Southeastern Museums Conference, 2022.</Text>
            </>
          )}
        </View>

        {/* PROFESSIONAL AFFILIATIONS */}
        <View>
          <Text style={styles.sectionHeader}>PROFESSIONAL AFFILIATIONS</Text>
          
          <Text style={styles.bullet}>• American Alliance of Museums (AAM)</Text>
          <Text style={styles.bullet}>• Association of Art Museum Curators (AAMC)</Text>
          <Text style={styles.bullet}>• Southeastern Museums Conference (SEMC)</Text>
          <Text style={styles.bullet}>• College Art Association (CAA)</Text>
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

export default MuseumResume;
