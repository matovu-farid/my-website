import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata(site.pages.home),
  applicationName: "Farid Matovu Portfolio",
  verification: {
    google: "bTBFEwGrxsDFxs7EtUBa3ZtS-ftB_ynhsKQangb7fXY",
    other: {
      "msvalidate.01": "F3CA30D9E0BCF463C458546E8C9773E3",
    },
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
