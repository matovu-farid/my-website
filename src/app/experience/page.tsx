"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExperienceCard from "@/components/experience-card";

const experiences = [
  {
    id: 1,
    company: "Tech Innovators Inc.",
    position: "Senior Frontend Developer",
    period: "Jan 2020 - Present",
    description:
      "Leading the frontend development team in creating cutting-edge web applications.",
  },
  {
    id: 2,
    company: "Digital Solutions LLC",
    position: "Full Stack Developer",
    period: "Jun 2017 - Dec 2019",
    description:
      "Developed and maintained various web applications using React, Node.js, and PostgreSQL.",
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Work Experience
        </motion.h1>
        <div className="space-y-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
