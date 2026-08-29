import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Farid Matovu — Systems that ship",
  description:
    "Farid Matovu builds products, platforms, and the systems between them.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/png", sizes: "32x32" },
      { url: "/fidexa-app-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
