"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";

const experiences = [
  { company: "Fidexa LLC", position: "Founder and Product Engineer", period: "Apr 2025 — Present", description: "Founded and run an independent product studio, owning discovery, domain modelling, product decisions, implementation, deployment, technical documentation, and support. Shipped Rishi Reader to the App Store for iPhone, iPad, and Mac, and built and deployed lending and inventory operations systems for customer businesses.", href: "https://www.fidexa.org/", linkLabel: "Visit Fidexa" },
  { company: "Dabble Lab", position: "Full-Stack Developer", period: "Oct 2022 — Present", description: "Build and maintain web applications and conversational AI products for US-based clients, delivering React and Next.js interfaces, Node.js endpoints, third-party integrations, LLM workflows, and production issue investigation.", href: "https://dabblelab.com/", linkLabel: "Visit Dabble Lab" },
  { company: "Microverse", position: "Code Reviewer and Student Mentor", period: "Jan 2022 — Oct 2022", description: "Mentored junior web developers through code review and technical support in a structured full-stack program.", href: "https://www.microverse.org/", linkLabel: "Visit Microverse" },
  { company: "FEMME Agencies", position: "Software Developer", period: "Jul 2018 — Jan 2021", description: "Built a unified API for web and mobile applications, plus a web application with database architecture and CI/CD workflows." },
  { company: "Sustainable and Greener World", position: "Web Developer", period: "Jan 2020 — Jan 2021", description: "Built and maintained the organization's web presence, delivered features, and resolved issues directly with non-technical stakeholders." },
];

export default function Experience() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero"><div className="site-shell"><p className="eyebrow eyebrow-light">03 / Experience</p><h1>Work that<br />compounds.</h1><p>A record of building across products, teams, and the infrastructure that makes the work last.</p></div></section>
        <section className="site-shell page-content"><PageTransition><div className="detail-layout">{experiences.map((experience) => <article className="detail-card" key={experience.company}><p className="eyebrow">{experience.period}</p><h2>{experience.position}</h2><p style={{ color: "var(--violet)", marginBottom: ".9rem" }}>{experience.company}</p><p>{experience.description}</p>{experience.href && <a className="detail-card-link" href={experience.href} target="_blank" rel="noreferrer">{experience.linkLabel} ↗</a>}</article>)}<section className="detail-card" aria-labelledby="education-heading"><p className="eyebrow">Education</p><h2 id="education-heading">Bachelor of Engineering (BE), Civil Engineering</h2><p style={{ color: "var(--violet)", marginBottom: ".9rem" }}>Kyambogo University</p><p>Jan 2016 — Jan 2020</p></section></div></PageTransition></section>
      </main>
      <Footer />
    </div>
  );
}
