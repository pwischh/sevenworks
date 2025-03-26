import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { TemplateProps } from "../types";

Font.register({family: "Arial", src: "/fonts/ARIAL.TTF"});
Font.register({family: "Calibri", src: "/fonts/calibri.ttf"});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 5,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

export default function BusinessTemplate({formData}: TemplateProps) {

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text 
          style={{fontSize: 18, fontWeight: 'bold', fontFamily: formData.font}}>
            {formData.firstName} {formData.lastName}
          </Text>
          <Text style={{fontSize: 12, marginTop: 5, fontFamily: formData.font}}>
            Email: {formData?.email || "No Email"} | Phone: {formData?.phone || "No Phone"}
          </Text>
        </View>
        <View style={{fontSize: 12, lineHeight: 1.5, fontFamily: formData.font}}>
          <Text>
            {formData?.content || "No content provided."}
          </Text>
        </View>
      </Page>
    </Document>
  );
};