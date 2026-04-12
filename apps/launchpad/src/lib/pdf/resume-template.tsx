import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeContent } from "@/lib/db/schema/resumes";
import { registerFonts } from "./register-fonts";

registerFonts();

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    color: "#1a1a1a",
    lineHeight: 1.4,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
    textAlign: "center",
  },
  contactRow: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 14,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  companyPosition: {
    fontSize: 10,
    fontWeight: 600,
  },
  period: {
    fontSize: 9,
    color: "#555",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
});

interface ResumeDocumentProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  content: ResumeContent;
}

export function ResumeDocument({
  name,
  email,
  phone,
  location,
  content,
}: ResumeDocumentProps) {
  const contactParts = [email, phone, location].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.contactRow}>{contactParts.join("  |  ")}</Text>

        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{content.summary}</Text>

        <Text style={styles.sectionTitle}>Experience</Text>
        {content.experiences.map((exp, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View style={styles.experienceHeader}>
              <Text style={styles.companyPosition}>
                {exp.position} — {exp.company}
              </Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            {exp.bullets.map((bullet, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillsText}>{content.skills.join("  •  ")}</Text>

        {content.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {content.education.map((edu, i) => (
              <View key={i} style={styles.educationRow}>
                <Text style={styles.companyPosition}>
                  {edu.degree} — {edu.institution}
                </Text>
                <Text style={styles.period}>{edu.year}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
