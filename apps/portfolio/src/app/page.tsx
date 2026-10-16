import Link from "next/link";
import StructuredData from "@/components/structured-data";
import { site } from "@/data/site";
import { pageMetadata, pageStructuredData } from "@/lib/seo";
import Image from "next/image";
import { ArrowDown, ArrowRight, Cloud, Server, Smartphone, Sparkles } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CapabilityCard from "@/components/capability-card";
import ProjectCard from "@/components/project-card";
import { experiences } from "@/data/experience";
import { homepageProjects } from "@/data/projects";

export const metadata = pageMetadata(site.pages.home);

const capabilities = [
  { icon: Smartphone, title: "Native Apple delivery", description: "Reading, audio, sync, and companion experiences designed for the Apple platforms people already use.", tags: ["Swift", "SwiftUI", "Apple platforms"] },
  { icon: Server, title: "Product systems", description: "Operational software with the data model, permissions, workflows, and interfaces that make a business run.", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { icon: Sparkles, title: "AI and automation", description: "Useful automation that turns messy inputs into dependable product capabilities and repeatable operations.", tags: ["OpenAI", "Effect.js", "Serverless"] },
  { icon: Cloud, title: "Infrastructure that holds", description: "Deployments and integrations shaped for observability, reliability, and the next version of the product.", tags: ["Cloudflare", "Docker", "CI/CD"] },
];


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StructuredData data={pageStructuredData(site.pages.home, "ProfilePage")} />
        <section className="hero-panel">
          <div className="site-shell hero-inner">
            <div>
              <p className="hero-role">Senior Full-Stack Product Engineer</p>
              <h1 className="hero-title">I build <em>systems</em> that ship.</h1>
              <p className="hero-intro">I build operational and financial production systems with TypeScript, React, Node.js, and PostgreSQL. From the data model to the interface, I carry the work into production.</p>
              <div className="hero-actions">
                <Link href="/projects" className="button-primary">See the work <ArrowRight size={14} /></Link>
                <a href="/Farid-Matovu-Resume.pdf" className="button-secondary" download aria-label="Download Farid Matovu's resume as a PDF">Download résumé <ArrowDown size={14} aria-hidden="true" /></a>
              </div>
            </div>
            <Link href="/projects/rishi" className="hero-product" aria-label="Explore Rishi, my Apple reading app">
              <div className="hero-product-image"><Image src="/projects/rishi-showcase-poster.jpg" alt="Rishi iPhone library with books in progress and reading navigation" width={660} height={1310} priority /></div>
              <div className="hero-product-caption"><div><strong>Rishi</strong><span>Read, listen, and return to your books.</span></div><ArrowRight size={20} aria-hidden="true" /></div>
              <span className="hero-product-note">Shipped on the App Store · iPhone, iPad & Mac</span>
            </Link>
          </div>
          <div className="site-shell hero-rail"><span>7+ years of non-overlapping professional software delivery</span><span>Kampala, Uganda · Remote · GMT+3</span><Link href="/experience">My experience <ArrowRight size={14} aria-hidden="true" /></Link></div>
        </section>

        <section className="work-section section-block section-rule">
          <div className="site-shell">
            <div className="section-heading">
              <div><h2>Selected work.</h2><p>Four shipped products. The situations behind them, the decisions I made, and what reached production.</p></div>
            </div>
            <div className="project-proof-stories">
              {homepageProjects.map((project, index) => <ProjectCard key={project.id} project={project} featured index={index} />)}
            </div>
            <Link href="/projects" className="button-secondary" style={{ color: "var(--ink)", borderColor: "var(--line)", marginTop: "1.5rem" }}>Open the full index <ArrowRight size={14} /></Link>
          </div>
        </section>

        <section className="site-shell section-block section-rule" aria-label="What I build">
          <div className="section-heading">
            <div><h2>One practice.<br />Many surfaces.</h2><p>I work across the product boundary: shaping the experience, building the system, and carrying it into production.</p></div>
          </div>
          <div className="capability-grid">
            {capabilities.map((cap, index) => <CapabilityCard key={cap.title} {...cap} index={index} />)}
          </div>
        </section>

        <section className="experience-strip">
          <div className="site-shell experience-strip-inner">
            <div><h2>Work that compounds.</h2></div>
            <div className="experience-list">
              {experiences.map(({ company, position: role, period }) => <div className="experience-row" key={company}><div><strong>{role}</strong><span>{company}</span></div><small>{period}</small></div>)}
              <Link href="/experience" className="button-secondary" style={{ color: "var(--ink)", borderColor: "var(--line)", marginTop: "1.25rem", width: "fit-content" }}>View experience <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        <section className="contact-banner">
          <div className="site-shell contact-banner-inner">
            <div><h2>Have a useful thing in mind?</h2></div>
            <Link href="/contact" className="button-primary">Let&apos;s talk <ArrowRight size={14} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
