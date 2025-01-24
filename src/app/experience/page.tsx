"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExperienceCard from "@/components/experience-card";


const experiences = [
  {
    id: 1,
    company: "Dabble Lab",
    position: "Full Stack Developer",
    period: "Oct 2022 - Present",
    description:
      "Built platforms like DialogCast (podcasting from group chat conversations) and Coverage in a Click (automotive warranty services) with integrations like OpenAI, Telegram, Discord, CRMs, and Stripe.",
  },
  {
    id: 2,
    company: "Microverse",
    position: "Frontend Engineer",
    period: "2022 - 2022",
    description:
      "Collaborated internationally to build full-stack applications, focusing on React, Node.js, and PostgreSQL while emphasizing test-driven development and modular architectures.",
  },
  {
    id: 3,
    company: "Sustainable and Greener World",
    position: "Developer",
    period: "Jan 2020 - Jan 2021",
    description:
      "Contributed to the Kula-Safi Project, integrating AI to predict crop shelf life, connecting farmers to markets, and improving food supply chain resilience.",
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
