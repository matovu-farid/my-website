"use client";

import Link from "next/link";
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
    <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
      {project.imageUrl ? (
        <div className="project-card-media">
          <img
            src={project.imageUrl}
            alt={`${project.title} product interface preview`}
            width={1021}
            height={657}
            loading={index > 2 ? "lazy" : "eager"}
          />
        </div>
      ) : (
        <div className="project-card-media">
          <span className="project-card-media-placeholder" aria-hidden="true">{project.title[0]}</span>
        </div>
      )}
      <div className="project-card-body">
        <div className="project-card-meta">
          <span>{CATEGORY_LABELS[project.category]}</span>
          <span>{project.year ?? "Selected work"}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{featured ? project.longDescription : project.description}</p>
        <div className="project-card-links">
          {hasNarrative && (
            <Link
              href={`/projects/${project.id}`}
            >
              Case study <ArrowRight size={12} />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
            >
              <Code size={16} />
              Source
            </a>
          )}
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              App Store
            </a>
          )}
          {project.productUrl && (
            <a
              href={project.productUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              Product Site
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              {project.liveLabel ?? "Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
