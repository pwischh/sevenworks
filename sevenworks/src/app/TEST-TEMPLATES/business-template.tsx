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


/*const BusinessTemplate = forwardRef<HTMLDivElement, { values: formValues }>(
  ({ values }, ref) => {
    return (
      <div ref={ref}>
        <div className="scroll-div bg-white text-black w-[550px] p-0 m-0"
              style={{aspectRatio: "1 / 1.294", overflow: "scoll"}}>
            <header className="border-b pb-4 px-4 pt-4">
              <h1 className="text-xl font-bold">{values.firstName}&nbsp;{values.lastName}</h1>
              <p className="text-sm text-gray-600">
                Email: john.doe@example.com | Phone: 123-456-7890
              </p>
            </header>
            <main className="px-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <section>
                  <h2 className="text-lg font-semibold mb-2">Profile</h2>
                  <p className="text-sm text-gray-700">
                    {values.content}
                  </p>
                  <h2 className="text-lg font-semibold mt-4 mb-2">Skills</h2>
                  <ul className="list-disc list-inside text-sm text-gray-700 list-none">
                    <li>Skill One</li>
                    <li>Skill Two</li>
                    <li>Skill Three</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-lg font-semibold mb-2">Experience</h2>
                  <div className="mb-4">
                    <h3 className="font-medium">Job Title at Company</h3>
                    <p className="text-sm text-gray-600">Jan 2020 - Present</p>
                    <p className="text-sm">
                      Description of responsibilities and achievements.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Education</h2>
                    <h3 className="font-medium">Degree, Institution</h3>
                    <p className="text-sm text-gray-600">Graduation Date</p>
                  </div>
                </section>
              </div>
            </main>
          </div>
      </div>      
    );
  }
);

BusinessTemplate.displayName = "BusinessTemplate";
export default BusinessTemplate;*/
