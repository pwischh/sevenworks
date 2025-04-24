import React from "react";
import { formValues } from "../types";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

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

export default function BusinessTemplate({form}: {form: formValues}){
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {form.firstName} {form.lastName}
          </Text>
          <Text style={styles.subtitle}>
            Email: john.doe@example.com | Phone: 123-456-7890
          </Text>
        </View>
        <View style={styles.content}>
          <Text>
            {form.content}
          </Text>
        </View>
      </Page>
    </Document>
  );
};