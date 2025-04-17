import React from "react";
import { TemplateProps } from "../types";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({family: "Arial", src: "/fonts/ARIAL.TTF"});
Font.register({family: "Calibri", src: "/fonts/calibri.ttf"});

const styles = StyleSheet.create({
  section: {
    marginBottom: 6,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 4,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  role: {
    fontStyle: "italic",
  },
  listItem: {
    marginBottom: 2,
    marginLeft: 10,
  },
});

const BusinessResume = ({formData}: TemplateProps) => {
  return (
    <Document>
      <Page size="A4" style={{fontSize: 10, padding: 10}}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{fontFamily: formData.font, fontSize: 14, fontWeight: "bold",}}>{formData.firstName} {formData.lastName}</Text>
          <View style={styles.contactContainer}>
            <Text>5032 Forbes Avenue, Atlanta, GA 30322</Text>
            <Text>{formData.phone} | {formData.email}</Text>
          </View>
          <View style={styles.hr} />
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>EDUCATION</Text>
          <View style={styles.flexRow}>
            <View>
              <Text>Emory University, Atlanta, GA</Text>
              <Text style={styles.role}>Bachelor of Arts in Economics</Text>
              <Text>Relevant Coursework: Accounting, Regression, Microeconomics</Text>
              <Text>GPA: 3.7/4.0</Text>
            </View>
            <Text>May 2022</Text>
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>EXPERIENCE</Text>
          <View style={styles.flexRow}>
            <View>
              <Text>Morgan Stanley, Private Wealth Management - Boise, ID</Text>
              <Text style={styles.role}>Financial Advising Intern</Text>
            </View>
            <Text>May – August 2020</Text>
          </View>
          <Text style={styles.listItem}>• Researched equities and investment products</Text>
          <Text style={styles.listItem}>• Utilized Morgan Stanley resources for financial analysis</Text>
        </View>

        {/* Leadership Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>LEADERSHIP AND COMMUNITY ENGAGEMENT</Text>
          <View style={styles.flexRow}>
            <View>
              <Text>Undergraduate Finance Association</Text>
              <Text style={styles.role}>Events and Sports Coordinator</Text>
            </View>
            <Text>Nov 2020 – Present</Text>
          </View>
          <Text style={styles.listItem}>• Help coordinate events and expand membership</Text>
        </View>

        {/* Honors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>HONORS</Text>
          <Text style={styles.listItem}>• Marine Corps Outstanding Achievement Award</Text>
          <Text style={styles.listItem}>• Co-Captain and 2020 MVP, Emory Womens Varsity Soccer</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ADDITIONAL SKILLS AND INTERESTS</Text>
          <Text><Text style={styles.role}>Languages:</Text> Intermediate in Spanish</Text>
          <Text><Text style={styles.role}>Computing:</Text> Microsoft Office, Adobe Acrobat, Minitab</Text>
          <Text><Text style={styles.role}>Interests:</Text> Photography, Travel, Soccer</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BusinessResume;
