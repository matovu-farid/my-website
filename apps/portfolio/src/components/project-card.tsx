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
}: ProjectCardProps) {
  const story = featured ? project.story : undefined;
  const Heading = featured ? "h3" : "h2";
  const hasNarrative = Boolean(project.narrative);

  return (
    <article id={`project-${project.id}`} className={`project-card ${featured ? "project-card--story" : ""}`}>
      {project.imageUrl ? (
        <figure className={`project-card-media ${project.id === "rishi" ? "project-card-media--phone" : ""}`}>
          <img
            src={project.imageUrl}
            alt={project.imageAlt ?? `${project.title} product interface preview`}
            width={1021}
            height={657}
            loading="lazy"
            decoding="async"
          />
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
          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">Walkthrough <ExternalLink size={14} aria-hidden="true" /></a>
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
