import Link from "next/link";
import Image from "next/image";
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
}: ProjectCardProps) {
  const story = featured ? project.story : undefined;
  const Heading = featured ? "h3" : "h2";
  const hasNarrative = Boolean(project.narrative);
  const isPhone = project.id === "rishi";
  // Phone screenshots occupy a narrow part of the contain frame.
  const imageSizes = isPhone
    ? featured ? "(max-width: 620px) 149px, 204px" : "(max-width: 620px) 114px, 123px"
    : featured
      ? "(max-width: 620px) calc(100vw - 64px), (max-width: 1264px) 44vw, 536px"
      : "(max-width: 620px) calc(100vw - 32px), (max-width: 900px) calc(50vw - 32px), (max-width: 1264px) calc(33vw - 32px), 389px";

  return (
    <article id={`project-${project.id}`} className={`project-card ${featured ? "project-card--story" : ""}`}>
      {project.imageUrl ? (
        <figure className={`project-card-media ${project.id === "rishi" ? "project-card-media--phone" : ""}`}>
          <div className="project-card-image-frame"><Image
            src={project.imageUrl}
            alt={project.imageAlt ?? `${project.title} product interface preview`}
            fill
            sizes={imageSizes}
            loading="lazy"
          /></div>
          {story && <figcaption>{story.caption}</figcaption>}
        </figure>
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
        <Heading>{story?.name ?? project.title}</Heading>
        {story ? <>
          <p className="project-story-intro">{story.intro}</p>
          <dl className="project-story-details">
            <div><dt>The situation</dt><dd>{story.situation}</dd></div>
            <div><dt>My approach</dt><dd>{story.decision}</dd></div>
            <div><dt>Delivered</dt><dd>{story.delivered}</dd></div>
          </dl>
        </> : <p>{project.description}</p>}
        <div className="project-card-links">
          {hasNarrative && (
            <Link
              href={`/projects/${project.id}`}
              aria-label={`Case study: ${project.title}`}
            >
              Case study <ArrowRight size={12} aria-hidden="true" />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
            >
              <Code size={16} aria-hidden="true" />
              Source
            </a>
          )}
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              aria-label={`App Store: ${project.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} aria-hidden="true" />
              App Store
            </a>
          )}
          {project.productUrl && (
            <a
              href={project.productUrl}
              aria-label={`Product site: ${project.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Product Site
            </a>
          )}
          {project.videoUrl && (
            <a href={project.videoUrl} aria-label={`Walkthrough: ${project.title}`} target="_blank" rel="noopener noreferrer">Walkthrough <ExternalLink size={14} aria-hidden="true" /></a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              aria-label={`${project.liveLabel ?? "Live"}: ${project.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} aria-hidden="true" />
              {project.liveLabel ?? "Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
