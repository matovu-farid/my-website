"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";

const experiences = [
  { company: "Dabble Lab", position: "Full Stack Developer", period: "Oct 2022 — Present", description: "Built platforms like DialogCast and Coverage in a Click with integrations across OpenAI, Telegram, Discord, CRMs, and Stripe." },
  { company: "Microverse", position: "Frontend Engineer", period: "2022", description: "Collaborated internationally to build full-stack applications with React, Node.js, and PostgreSQL, emphasizing test-driven development and modular architectures." },
  { company: "Sustainable and Greener World", position: "Developer", period: "Jan 2020 — Jan 2021", description: "Contributed to the Kula-Safi Project, integrating AI to predict crop shelf life and connect farmers to markets." },
];

export default function Experience() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero"><div className="site-shell"><p className="eyebrow eyebrow-light">03 / Experience</p><h1>Work that<br />compounds.</h1><p>A record of building across products, teams, and the infrastructure that makes the work last.</p></div></section>
        <section className="site-shell page-content"><PageTransition><div className="detail-layout">{experiences.map((experience) => <article className="detail-card" key={experience.company}><p className="eyebrow">{experience.period}</p><h2>{experience.position}</h2><p style={{ color: "var(--violet)", marginBottom: ".9rem" }}>{experience.company}</p><p>{experience.description}</p></article>)}</div></PageTransition></section>
      </main>
      <Footer />
    </div>
  );
}
