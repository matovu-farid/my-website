"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Code, ExternalLink, RefreshCw } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS, allProjectsSorted } from "@/data/projects";

interface CaseStudyContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}
export default function CaseStudyContent({ project, prevProject, nextProject }: CaseStudyContentProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="site-shell case-study-shell">
          <article className="case-study-main">
            <Link href="/projects" className="eyebrow">← Back to index</Link>
            <p className="case-study-meta" style={{ marginTop: "2rem" }}>{CATEGORY_LABELS[project.category]} {project.year ? "· " + project.year : ""}</p>
            <h1>{project.title}</h1>
            <p className="case-study-description">{project.description}</p>

            <p className="case-study-label">Product evidence</p>
            {project.imageUrl ? (
              <div className="case-study-media">
                <img src={project.imageUrl} alt={project.imageAlt ?? project.title + " product interface preview"} width={1021} height={657} />
              </div>
            ) : (
              <div className="case-study-media"><span className="project-card-media-placeholder" aria-hidden="true">{project.title[0]}</span></div>
            )}

            {project.story && <p className="media-provenance">{project.story.caption}</p>}

            {project.screenshots && project.screenshots.length > 1 && (
              <>
                <p className="case-study-label">Additional screens</p>
                <div className="evidence-captures">
                  {project.screenshots.map((src, index) => <figure key={src}><img src={src} alt={project.screenshotDescriptions?.[index] ?? project.title + " screen " + (index + 1)} width={index === 0 ? 1184 : 1168} height={index === 0 ? 539 : 172} loading="lazy" />{project.screenshotDescriptions?.[index] && <figcaption className="media-provenance">{project.screenshotDescriptions[index]}</figcaption>}</figure>)}
                </div>
              </>
            )}

            <p className="case-study-label">Why it exists</p>
            <p className="case-study-copy">{project.narrative}</p>

            {project.rebuiltFrom && (
              <>
                <p className="case-study-label"><RefreshCw size={13} style={{ display: "inline", marginRight: ".35rem" }} />Evolution</p>
                <div className="detail-card"><p>{project.rebuiltFrom.reason}</p></div>
              </>
            )}

            {project.keyDecisions && (
              <>
                <p className="case-study-label">Key decisions</p>
                <ul className="case-study-decision-list">{project.keyDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
              </>
            )}

            <div className="case-study-links">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Code size={13} style={{ display: "inline" }} /> Source</a>}
              {project.appStoreUrl && <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} style={{ display: "inline" }} /> App Store</a>}
              {project.productUrl && <a href={project.productUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} style={{ display: "inline" }} /> Product site</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} style={{ display: "inline" }} /> {project.liveLabel ?? "Live"}</a>}
            </div>

            <div className="case-study-nav">
              {prevProject ? <Link href={"/projects/" + prevProject.id}><ArrowLeft size={12} style={{ display: "inline" }} /> {prevProject.title}</Link> : <span />}
              {nextProject ? <Link href={"/projects/" + nextProject.id}>{nextProject.title} <ArrowRight size={12} style={{ display: "inline" }} /></Link> : <span />}
            </div>
          </article>

          <aside className="case-study-aside">
                        <h2>Selected case studies.</h2>
            <ul className="route-list">{allProjectsSorted.filter((p) => p.narrative).slice(0, 8).map((route) => <li key={route.id}><Link href={"/projects/" + route.id}>{route.title}</Link></li>)}</ul>

          </aside>
      </main>
      <Footer />
    </div>
  );
}
