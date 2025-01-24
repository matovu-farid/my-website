"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Welcome to My Portfolio</h1>
          <p className="text-xl mb-8">
            I&apos;m a passionate developer creating amazing web experiences.
          </p>
          <motion.a
            href="/projects"
            className="inline-block bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Projects
          </motion.a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
