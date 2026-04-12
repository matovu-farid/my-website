"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Smartphone, Server, Sparkles, Cloud, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import StatCounter from "@/components/stat-counter";
import CapabilityCard from "@/components/capability-card";
import ScrollReveal from "@/components/scroll-reveal";
import ProjectCard from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

const capabilities = [
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description:
      "Tauri, Flutter, Electron — desktop, mobile, and web from shared codebases",
    tags: ["Tauri", "Flutter", "Electron", "Rust"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Full-stack services with type-safe APIs, serverless, and real-time data",
    tags: ["Next.js", "Rails", "tRPC", "AWS Lambda"],
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    description:
      "AI-powered scraping, TTS narration, algorithmic trading strategies",
    tags: ["OpenAI", "Effect.js", "Binance API"],
  },
  {
    icon: Cloud,
    title: "DevOps & Infra",
    description:
      "Docker Swarm, reverse proxies, CI/CD, database orchestration",
    tags: ["Docker", "Nginx", "PostgreSQL", "Prisma"],
  },
];

const experiences = [
  {
    company: "Dabble Lab",
    position: "Full Stack Developer",
    period: "Oct 2022 — Present",
  },
  {
    company: "Microverse",
    position: "Frontend Engineer",
    period: "2022",
  },
  {
    company: "Sustainable and Greener World",
    position: "Developer",
    period: "Jan 2020 — Jan 2021",
  },
];

const topFeatured = featuredProjects.slice(0, 4);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PageTransition>
          {/* Hero */}
          <section className="container mx-auto px-6 pt-32 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-full bg-secondary border-2 border-border mx-auto mb-6 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-muted-foreground">
                FM
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs uppercase tracking-[3px] text-muted-foreground mb-4"
            >
              Full-Stack · Polyglot · Systems Thinker
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              I build complete
              <br />
              systems that ship.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed"
            >
              From algorithmic trading bots to cross-platform book readers —
              picking the right tool for every job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-10 mb-10"
            >
              <StatCounter end={15} suffix="+" label="Projects" />
              <StatCounter end={6} label="Languages" />
              <StatCounter end={5} suffix="+" label="Years" />
              <StatCounter end={2} label="Play Store" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium text-sm text-foreground hover:bg-secondary transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </section>

          {/* Capabilities */}
          <section className="container mx-auto px-6 pb-20">
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
                What I Build
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {capabilities.map((cap, i) => (
                <CapabilityCard key={cap.title} {...cap} index={i} />
              ))}
            </div>
          </section>

          {/* Selected Work */}
          <section className="container mx-auto px-6 pb-20">
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
                Selected Work
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {topFeatured.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} index={i} />
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View All Projects
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Experience Preview */}
          <section className="container mx-auto px-6 pb-20">
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
                Experience
              </h2>
            </ScrollReveal>
            <div className="max-w-2xl mx-auto space-y-4">
              {experiences.map((exp, i) => (
                <ScrollReveal key={exp.company} delay={i * 0.1}>
                  <div className="flex items-baseline justify-between py-3 border-b border-border">
                    <div>
                      <span className="font-medium text-foreground">
                        {exp.position}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        at {exp.company}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {exp.period}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View Full Experience
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="container mx-auto px-6 pb-24">
            <ScrollReveal>
              <div className="text-center py-16 border-t border-border">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                  Interested in working together?
                </h2>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </section>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
