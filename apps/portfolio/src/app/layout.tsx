import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Farid Matovu — Systems that ship",
  description:
    "Farid Matovu builds products, platforms, and the systems between them.",
  icons: {
    icon: "/fidexa-app-icon.svg",
    shortcut: "/fidexa-app-icon.svg",
    apple: "/fidexa-app-icon.svg",
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
