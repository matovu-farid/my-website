"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import ExperienceCard from "@/components/experience-card";

const experiences = [
  {
    id: 1,
    company: "Dabble Lab",
    position: "Full Stack Developer",
    period: "Oct 2022 — Present",
    description:
      "Built platforms like DialogCast (podcasting from group chat conversations) and Coverage in a Click (automotive warranty services) with integrations like OpenAI, Telegram, Discord, CRMs, and Stripe.",
  },
  {
    id: 2,
    company: "Microverse",
    position: "Frontend Engineer",
    period: "2022",
    description:
      "Collaborated internationally to build full-stack applications, focusing on React, Node.js, and PostgreSQL while emphasizing test-driven development and modular architectures.",
  },
  {
    id: 3,
    company: "Sustainable and Greener World",
    position: "Developer",
    period: "Jan 2020 — Jan 2021",
    description:
      "Contributed to the Kula-Safi Project, integrating AI to predict crop shelf life, connecting farmers to markets, and improving food supply chain resilience.",
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12 max-w-2xl">
        <PageTransition>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-center">
            Work Experience
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Where I&apos;ve worked and what I&apos;ve built
          </p>
          <div className="space-y-4">
            {experiences.map((experience, i) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
                index={i}
              />
            ))}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
