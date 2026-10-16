import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Code, ExternalLink, RefreshCw } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS, allProjectsSorted } from "@/data/projects";
import { site } from "@/data/site";

function EvidenceLinks({ project }: { project: Project }) {
  return (
    <div className="case-study-links" aria-label="Project evidence">
      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Code size={13} aria-hidden="true" /> Repository</a>}
      {project.appStoreUrl && <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} aria-hidden="true" /> App Store</a>}
      {project.productUrl && <a href={project.productUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} aria-hidden="true" /> Product site</a>}
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} aria-hidden="true" /> {project.liveLabel ?? "Live"}</a>}
      {project.videoUrl && <a href={project.videoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} aria-hidden="true" /> Watch walkthrough</a>}
    </div>
  );
}

interface CaseStudyContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}
export default function CaseStudyContent({ project, prevProject, nextProject }: CaseStudyContentProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" tabIndex={-1} className="site-shell case-study-shell">
          <article className="case-study-main">
            <Link href="/projects" className="eyebrow">← Back to index</Link>
            <p className="case-study-meta" style={{ marginTop: "2rem" }}>{CATEGORY_LABELS[project.category]} {project.year ? "· " + project.year : ""}</p>
            <h1>{project.title}</h1>
            <p className="case-study-description">{project.description}</p>

            {project.caseStudy && (
              <dl className="case-study-summary">
                <div><dt>My role</dt><dd>{project.caseStudy.role}</dd></div>
                <div><dt>Delivery</dt><dd>{project.caseStudy.status}</dd></div>
              </dl>
            )}

            <p className="case-study-label">Product evidence</p>
            {project.imageUrl ? (
              <div className="case-study-media">
                <Image src={project.imageUrl} alt={project.imageAlt ?? project.title + " product interface preview"} fill sizes={project.id === "rishi" ? "(max-width: 620px) 100px, (max-width: 900px) 220px, 250px" : "(max-width: 620px) calc(100vw - 80px), (max-width: 900px) 84vw, (max-width: 1264px) 62vw, 788px"} priority />
              </div>
            ) : (
              <div className="case-study-media"><span className="project-card-media-placeholder" aria-hidden="true">{project.title[0]}</span></div>
            )}

            {project.story && <p className="media-provenance">{project.story.caption}</p>}
            {project.caseStudy && <EvidenceLinks project={project} />}

            {project.screenshots && project.screenshots.length > 1 && (
              <>
                <p className="case-study-label">Additional screens</p>
                <div className="evidence-captures">
                  {project.screenshots.map((src, index) => <figure key={src}><Image src={src} alt={project.screenshotDescriptions?.[index] ?? project.title + " screen " + (index + 1)} width={index === 0 ? 1184 : 1168} height={index === 0 ? 539 : 172} sizes="(max-width: 620px) calc(100vw - 80px), (max-width: 900px) 84vw, (max-width: 1264px) 62vw, 788px" loading="lazy" />{project.screenshotDescriptions?.[index] && <figcaption className="media-provenance">{project.screenshotDescriptions[index]}</figcaption>}</figure>)}
                </div>
              </>
            )}

            <h2 className="case-study-label">Why it exists</h2>
            <p className="case-study-copy">{project.narrative}</p>

            {project.caseStudy && (
              <section>
                <h2 className="case-study-label">My contribution</h2>
                <p className="case-study-copy">{project.caseStudy.contribution}</p>
              </section>
            )}

            {project.rebuiltFrom && (
              <>
                <p className="case-study-label"><RefreshCw size={13} style={{ display: "inline", marginRight: ".35rem" }} />Evolution</p>
                <div className="detail-card"><p>{project.rebuiltFrom.reason}</p></div>
              </>
            )}

            {project.keyDecisions && (
              <>
                <h2 className="case-study-label">Key decisions</h2>
                <ul className="case-study-decision-list">{project.keyDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
              </>
            )}

            {project.caseStudy ? (
              <>
                <section>
                  <h2 className="case-study-label">Delivered</h2>
                  <ul className="case-study-decision-list">{project.caseStudy.delivered.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <h2 className="case-study-label">Evidence and scope</h2>
                  <p className="case-study-copy">{project.caseStudy.evidence}</p>
                </section>
                <section className="case-study-contact" aria-labelledby="case-study-contact-title">
                  <h2 id="case-study-contact-title">Need this kind of ownership on your team?</h2>
                  <p>I&apos;m open to senior remote product and full-stack engineering roles.</p>
                  <div className="case-study-contact-actions">
                    <Link href="/contact" className="button-primary">Discuss a similar role</Link>
                    <a href={site.resumePath} download>Download résumé (PDF)</a>
                  </div>
                </section>
              </>
            ) : <EvidenceLinks project={project} />}

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
