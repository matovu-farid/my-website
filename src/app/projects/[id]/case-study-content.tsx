"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CaseStudyContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function CaseStudyContent({
  project,
  prevProject,
  nextProject,
}: CaseStudyContentProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12 max-w-3xl">
        <PageTransition>
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {CATEGORY_LABELS[project.category]}
              </span>
              {project.year && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {project.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            {project.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-secondary h-48 flex items-center justify-center border border-border">
                <span className="text-5xl font-bold text-muted-foreground/20">
                  {project.title[0]}
                </span>
              </div>
            )}
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="border-l-2 border-primary pl-5">
              <p className="text-foreground leading-relaxed text-lg">
                {project.narrative}
              </p>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Key Decisions */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">
                Key Decisions
              </h2>
              <div className="space-y-3">
                {project.keyDecisions.map((decision, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <ChevronRight
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-muted-foreground leading-relaxed">
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex gap-4 mb-16"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-card border border-border px-5 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <Code size={16} />
                View Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </motion.div>

          {/* Prev/Next navigation */}
          <div className="border-t border-border pt-8 flex justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <div>
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium text-foreground">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium text-foreground">
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
