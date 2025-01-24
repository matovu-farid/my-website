import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Matovu Farid - Portfolio",
  description: "A showcase of my projects and work experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
