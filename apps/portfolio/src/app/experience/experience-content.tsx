"use client";

import { experiences, education } from "@/data/experience";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";


export default function Experience() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero"><div className="site-shell"><h1>Work that<br />compounds.</h1><p>A record of building across products, teams, and the infrastructure that makes the work last.</p></div></section>
        <section className="site-shell page-content"><PageTransition><div className="detail-layout">{experiences.map((experience) => <article className="detail-card" key={experience.company}><p className="eyebrow">{experience.period}</p><h2>{experience.position}</h2><p style={{ color: "var(--violet)", marginBottom: ".9rem" }}>{experience.company}</p><p>{experience.description}</p>{experience.href && <a className="detail-card-link" href={experience.href} target="_blank" rel="noreferrer">{experience.linkLabel} ↗</a>}</article>)}<section className="detail-card" aria-labelledby="education-heading"><p className="eyebrow">Education</p><h2 id="education-heading">{education.degree}</h2><p style={{ color: "var(--violet)", marginBottom: ".9rem" }}>{education.institution}</p><p>{education.period}</p></section></div></PageTransition></section>
      </main>
      <Footer />
    </div>
  );
}
