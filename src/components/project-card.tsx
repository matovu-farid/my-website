"use client";

import { motion } from "motion/react";
import { ExternalLink, Code } from "lucide-react";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({
  project,
  featured = false,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col ${
        featured ? "md:flex-row" : ""
      }`}
    >
      {project.imageUrl ? (
        <div
          className={`relative overflow-hidden ${
            featured ? "md:w-1/2 h-48 md:h-auto" : "h-48"
          }`}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`relative overflow-hidden ${
            featured ? "md:w-1/2 h-48 md:h-auto" : "h-48"
          } bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center`}
        >
          <span className="text-4xl font-bold text-primary/30">
            {project.title[0]}
          </span>
        </div>
      )}
      <div className={`p-5 flex flex-col flex-grow ${featured ? "md:w-1/2" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold ${featured ? "text-xl" : "text-lg"}`}>
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap ml-2">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {featured ? project.longDescription : project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Code size={16} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
