import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farid Matovu — Senior Full-Stack Product Engineer",
  description:
    "Senior Full-Stack Product Engineer with 7+ years of non-overlapping delivery in TypeScript, React, Node.js, and PostgreSQL. Builds production financial and operational systems; available remotely from Uganda (GMT+3).",
  keywords: [
    "Senior Full-Stack Product Engineer",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "production financial systems",
    "operational systems",
    "remote engineer",
    "Uganda",
  ],
  openGraph: {
    title: "Farid Matovu — Senior Full-Stack Product Engineer",
    description: "7+ years building TypeScript, React, Node.js, and PostgreSQL production financial and operational systems. Available remotely from Uganda (GMT+3).",
    type: "website",
    locale: "en_UG",
    siteName: "Farid Matovu",
  },
  twitter: {
    card: "summary",
    title: "Farid Matovu — Senior Full-Stack Product Engineer",
    description: "7+ years building production financial and operational systems with TypeScript, React, Node.js, and PostgreSQL.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
