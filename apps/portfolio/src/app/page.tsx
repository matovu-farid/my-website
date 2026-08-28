"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Server, Smartphone, Sparkles } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CapabilityCard from "@/components/capability-card";
import ProjectCard from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

const capabilities = [
  { icon: Smartphone, title: "Native Apple delivery", description: "Reading, audio, sync, and companion experiences designed for the Apple platforms people already use.", tags: ["Swift", "SwiftUI", "Apple platforms"] },
  { icon: Server, title: "Product systems", description: "Operational software with the data model, permissions, workflows, and interfaces that make a business run.", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { icon: Sparkles, title: "AI and automation", description: "Useful automation that turns messy inputs into dependable product capabilities and repeatable operations.", tags: ["OpenAI", "Effect.js", "Serverless"] },
  { icon: Cloud, title: "Infrastructure that holds", description: "Deployments and integrations shaped for observability, reliability, and the next version of the product.", tags: ["Cloudflare", "Docker", "CI/CD"] },
];

const experiences = [
  ["Dabble Lab", "Full Stack Developer", "Oct 2022 — Present"],
  ["Microverse", "Frontend Engineer", "2022"],
  ["Sustainable and Greener World", "Developer", "Jan 2020 — Jan 2021"],
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="hero-panel">
          <div className="site-shell hero-inner">
            <div>
              <p className="hero-kicker">Independent product engineer / Kampala, Uganda</p>
              <h1 className="hero-title">I build <em>systems</em> that ship.</h1>
              <p className="hero-intro">From the first useful interaction to the infrastructure behind it, I turn ambitious ideas into products people can rely on.</p>
              <div className="hero-actions">
                <Link href="/projects" className="button-primary">See the work <ArrowRight size={14} /></Link>
                <Link href="/contact" className="button-secondary">Start a conversation</Link>
              </div>
            </div>
            <aside className="hero-proof">
              <p className="hero-proof-label">The point of view</p>
              <h2>Right tool. Clear system. Real outcome.</h2>
              <p>Projects change. The practice stays consistent: understand the operation, choose the right constraints, and make the result feel inevitable.</p>
              <ul className="hero-proof-list">
                <li>Products shipped <span>15+</span></li>
                <li>Primary modes <span>Web · Apple · AI</span></li>
                <li>Current focus <span>End-to-end systems</span></li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="site-shell section-block section-rule">
          <div className="section-heading">
            <p className="eyebrow">01 / What I build</p>
            <div><h2>One practice.<br />Many surfaces.</h2><p>I work across the product boundary: shaping the experience, building the system, and carrying it into production.</p></div>
          </div>
          <div className="capability-grid">
            {capabilities.map((cap, index) => <CapabilityCard key={cap.title} {...cap} index={index} />)}
          </div>
        </section>

        <section className="work-section section-block section-rule">
          <div className="site-shell">
            <div className="section-heading">
              <p className="eyebrow">02 / Selected work</p>
              <div><h2>Proof over promises.</h2><p>These are a few shipped systems. The catalog holds the wider range: products, internal tools, experiments that became useful, and the decisions behind them.</p></div>
            </div>
            <div className="project-proof-grid">
              {featuredProjects.slice(0, 3).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
            <p className="catalog-note">{featuredProjects.length} selected projects / a broader catalog is still being built.</p>
            <Link href="/projects" className="button-secondary" style={{ color: "var(--ink)", borderColor: "var(--line)", marginTop: "1.5rem" }}>Open the full index <ArrowRight size={14} /></Link>
          </div>
        </section>

        <section className="experience-strip">
          <div className="site-shell experience-strip-inner">
            <div><p className="eyebrow">03 / Experience</p><h2>Work that compounds.</h2></div>
            <div className="experience-list">
              {experiences.map(([company, role, period]) => <div className="experience-row" key={company}><div><strong>{role}</strong><span>{company}</span></div><small>{period}</small></div>)}
              <Link href="/experience" className="button-secondary" style={{ color: "var(--ink)", borderColor: "var(--line)", marginTop: "1.25rem", width: "fit-content" }}>View experience <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        <section className="contact-banner">
          <div className="site-shell contact-banner-inner">
            <div><p className="eyebrow eyebrow-light">04 / Next system</p><h2>Have a useful thing in mind?</h2></div>
            <Link href="/contact" className="button-primary">Let&apos;s talk <ArrowRight size={14} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
