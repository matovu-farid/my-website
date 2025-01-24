"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
const professionalProjects = [
  {
    id: 1,
    title: "DialogCast",
    description:
      "A platform converting group chat conversations into podcast episodes using OpenAI text-to-speech processing.",
  },
  {
    id: 2,
    title: "Coverage in a Click",
    description:
      "A scalable platform for automotive warranty services with CRM integration, Stripe payments, and automated email campaigns.",
  },
  {
    id: 3,
    title: "Kula-Safi Project",
    description:
      "An AI-powered smartphone app connecting smallholder farmers to local markets while predicting crop shelf life.",
  },
];

const personalProjects = [
  {
    id: 3,
    title: "Weather App",
    description: "A sleek weather application using modern web technologies.",
  },
  {
    id: 4,
    title: "Task Manager",
    description:
      "A personal project management tool with a focus on productivity.",
  },
];

export default function Projects() {
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
          My Projects
        </motion.h1>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Professional Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
