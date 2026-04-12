import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CoverLetterContent } from "@/lib/ai/generate-cover-letter";
import { registerFonts } from "./register-fonts";

registerFonts();

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 11,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  date: {
    fontSize: 10,
    color: "#555",
    marginBottom: 24,
  },
  addressee: {
    fontSize: 11,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  signoff: {
    fontSize: 11,
    marginTop: 20,
    marginBottom: 4,
  },
  name: {
    fontSize: 11,
    fontWeight: 600,
  },
  contact: {
    fontSize: 9,
    color: "#555",
    marginTop: 2,
  },
});

interface CoverLetterDocumentProps {
  name: string;
  email: string;
  phone: string;
  content: CoverLetterContent;
}

export function CoverLetterDocument({
  name,
  email,
  phone,
  content,
}: CoverLetterDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.date}>{content.date}</Text>
        <Text style={styles.addressee}>{content.addressee}</Text>
        <Text style={styles.greeting}>{content.greeting}</Text>

        {content.paragraphs.map((para, i) => (
          <Text key={i} style={styles.paragraph}>
            {para}
          </Text>
        ))}

        <Text style={styles.signoff}>{content.signoff}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.contact}>
          {[email, phone].filter(Boolean).join(" | ")}
        </Text>
      </Page>
    </Document>
  );
}
