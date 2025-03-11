import { formValues } from "@/app/types";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

// Create styles using react-pdf's StyleSheet.
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
          {/* The Text component automatically wraps text that exceeds the page boundaries.
              If the content is long enough, it will continue on the next page. */}
          <Text>
            {form.content}
          </Text>
        </View>
      </Page>
    </Document>
  );
};