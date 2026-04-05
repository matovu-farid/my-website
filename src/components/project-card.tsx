"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ExternalLink, Code, ArrowRight } from "lucide-react";
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
  const hasNarrative = Boolean(project.narrative);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-lg ${
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
          } bg-secondary flex items-center justify-center`}
        >
          <span className="text-4xl font-bold text-muted-foreground/30">
            {project.title[0]}
          </span>
        </div>
      )}
      <div
        className={`p-5 flex flex-col flex-grow ${featured ? "md:w-1/2" : ""}`}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold text-foreground ${featured ? "text-xl" : "text-lg"}`}>
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 ml-2">
            {project.archived && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                Archived
              </span>
            )}
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
              {CATEGORY_LABELS[project.category]}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
          {featured ? project.longDescription : project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          {hasNarrative && (
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              Case Study
              <ArrowRight size={14} />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
