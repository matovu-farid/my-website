# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio with a Refined & Polished aesthetic (warm stone + emerald), add homepage hero with stats, capability cards, project case study pages with narrative format, and expressive page transitions.

**Architecture:** Hub & spoke — homepage hub with hero/capabilities/featured projects sections, deep-dive case study pages at `/projects/[id]`, restyled existing pages. All pages share a page transition wrapper using Motion's AnimatePresence.

**Tech Stack:** Next.js 15, React 19, Motion 12, Tailwind CSS 3.4, Lucide React, TypeScript 5

---

## File Structure

### New Files
- `src/components/stat-counter.tsx` — Animated count-up number component
- `src/components/capability-card.tsx` — Homepage capability card (icon + title + description + tags)
- `src/components/scroll-reveal.tsx` — Scroll-triggered fade+slide wrapper using Motion whileInView
- `src/components/page-transition.tsx` — AnimatePresence wrapper for route transitions
- `src/app/projects/[id]/page.tsx` — Case study dynamic route page

### Modified Files
- `src/app/globals.css` — Replace CSS variables with warm stone + emerald palette
- `tailwind.config.ts` — Add stone/emerald color tokens
- `src/app/layout.tsx` — New body classes, page transition wrapper
- `src/components/header.tsx` — Restyle with new palette + emerald active state
- `src/components/footer.tsx` — Restyle with stone palette + proper name
- `src/data/projects.ts` — Add narrative, keyDecisions, year fields + content for all featured projects
- `src/app/page.tsx` — Complete homepage redesign
- `src/components/project-card.tsx` — Restyle + add layoutId + click-through to case study
- `src/components/experience-card.tsx` — Restyle with stone palette + emerald accent
- `src/app/projects/page.tsx` — Restyle with new palette
- `src/components/project-search.tsx` — Restyle with stone borders + emerald focus
- `src/components/category-filter.tsx` — Restyle with emerald selected state
- `src/components/pagination.tsx` — Restyle with emerald active state
- `src/app/experience/page.tsx` — Restyle with new palette + scroll reveal
- `src/app/contact/page.tsx` — Restyle with stone inputs + emerald button

---

### Task 1: Color System Foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace globals.css with warm stone + emerald color system**

Replace the entire contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 60 9% 98%;
    --foreground: 24 10% 10%;
    --card: 0 0% 100%;
    --card-foreground: 24 10% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 24 10% 10%;
    --primary: 160 84% 39%;
    --primary-foreground: 0 0% 100%;
    --secondary: 60 5% 96%;
    --secondary-foreground: 24 10% 10%;
    --muted: 60 5% 96%;
    --muted-foreground: 25 5% 45%;
    --accent: 60 5% 96%;
    --accent-foreground: 24 10% 10%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 24 6% 83%;
    --input: 24 6% 83%;
    --ring: 160 84% 39%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 20 14% 4%;
    --foreground: 60 9% 98%;
    --card: 24 10% 10%;
    --card-foreground: 60 9% 98%;
    --popover: 24 10% 10%;
    --popover-foreground: 60 9% 98%;
    --primary: 160 64% 52%;
    --primary-foreground: 20 14% 4%;
    --secondary: 12 6% 15%;
    --secondary-foreground: 60 9% 98%;
    --muted: 12 6% 15%;
    --muted-foreground: 24 6% 64%;
    --accent: 12 6% 15%;
    --accent-foreground: 60 9% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 100%;
    --border: 12 6% 15%;
    --input: 12 6% 15%;
    --ring: 160 64% 52%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Update tailwind.config.ts to add stone and emerald direct tokens**

The existing tailwind.config.ts already has HSL variable-based colors. Keep that system but add direct stone/emerald utility colors. Replace the entire file with:

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

- [ ] **Step 3: Verify the build compiles**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: replace color system with warm stone + emerald palette"
```

---

### Task 2: Layout + Page Transition Wrapper

**Files:**
- Create: `src/components/page-transition.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create page-transition.tsx**

Create `src/components/page-transition.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Update layout.tsx with new body classes and metadata**

Replace the entire contents of `src/app/layout.tsx` with:

```tsx
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Farid Matovu — Full-Stack Engineer",
  description:
    "Full-stack polyglot engineer building complete systems — from trading bots to cross-platform readers to AI-powered tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/page-transition.tsx src/app/layout.tsx
git commit -m "feat: add page transition component and update layout with new palette"
```

---

### Task 3: Header Restyle

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Restyle header with stone palette + emerald active state**

Replace the entire contents of `src/components/header.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link href={href} passHref>
                  <motion.span
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label}
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: restyle header with stone palette and emerald active state"
```

---

### Task 4: Footer Restyle

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Restyle footer with proper name and stone palette**

Replace the entire contents of `src/components/footer.tsx` with:

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Farid Matovu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: restyle footer with stone palette and proper name"
```

---

### Task 5: Extend Project Data with Narratives

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Add narrative, keyDecisions, year fields and content**

Replace the entire contents of `src/data/projects.ts` with:

```typescript
export type Category =
  | "ai-automation"
  | "cross-platform"
  | "web-apps"
  | "dev-tools";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  rank: number;
  featured: boolean;
  narrative?: string;
  keyDecisions?: string[];
  year?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "ai-automation": "AI & Automation",
  "cross-platform": "Cross-Platform Apps",
  "web-apps": "Web Applications",
  "dev-tools": "Developer Tools",
};

export const projects: Project[] = [
  {
    id: "rishi",
    title: "Rishi",
    description:
      "Cross-platform EPUB and PDF reader with offline-friendly Text-to-Speech, built with Tauri as a monorepo spanning desktop, web, and mobile.",
    longDescription:
      "A cross-platform book reader featuring library management, reading progress tracking, TTS with background generation queue, themes, keyboard/touch navigation, and PDF dual-page viewing. Built as a monorepo with Tauri for native desktop performance across macOS, Windows, and Linux.",
    category: "cross-platform",
    technologies: ["Tauri", "TypeScript", "Rust", "Bun", "TTS", "Monorepo"],
    githubUrl: "https://github.com/matovu-farid/rishi-monorepo",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/rishi-monorepo/main/screenshots/library.png",
    rank: 1,
    featured: true,
    year: "2025",
    narrative:
      "I wanted a book reader that worked everywhere — desktop, web, and eventually mobile — with text-to-speech that didn't require an internet connection for every page. So I built Rishi as a monorepo with Tauri for native performance and a Rust worker for background audio generation.",
    keyDecisions: [
      "Chose Tauri over Electron for 10x smaller binaries and native Rust backend integration",
      "Monorepo structure shares core reading logic across desktop, web, and mobile targets",
      "Background TTS queue prevents UI blocking during audio generation",
      "Dual-page PDF viewing mode for desktop-sized screens",
    ],
  },
  {
    id: "maria",
    title: "Maria",
    description:
      "Production cryptocurrency trading bot with multiple strategies, backtesting, grid-search optimization, and Docker Swarm deployment.",
    longDescription:
      "A sophisticated crypto trading bot built with TypeScript and Effect.js for Binance Futures. Features multiple trading strategies, Spearman noise validation, Kelly criterion position sizing, strategy parameter optimization via grid search, and automated Docker Swarm deployment with Prisma/PostgreSQL state management.",
    category: "ai-automation",
    technologies: [
      "TypeScript",
      "Effect.js",
      "Docker",
      "Prisma",
      "PostgreSQL",
      "Binance API",
    ],
    rank: 2,
    featured: true,
    year: "2026",
    narrative:
      "Manual crypto trading is emotional and inconsistent. I built Maria as an algorithmic trading system with statistical validation to remove human bias from trading decisions entirely. Every strategy is backtested with noise injection to ensure it isn't curve-fitted to historical data.",
    keyDecisions: [
      "Effect.js for type-safe functional composition with tagged errors — no try/catch anywhere in the codebase",
      "Kelly criterion for mathematically optimal position sizing, with half-Kelly for conservative risk management",
      "Spearman noise validation ensures strategies work on noisy data, not just clean historical curves",
      "Docker Swarm deployment with heartbeat health checks for 24/7 production reliability",
    ],
  },
  {
    id: "scrap-platform",
    title: "AI Scraping Ecosystem",
    description:
      "Full AI-powered scraping product: interactive Next.js dashboard, published npm library (scrap-ai), and serverless AWS Lambda backend.",
    longDescription:
      "A complete AI scraping ecosystem comprising three projects: a Next.js dashboard for managing scraping operations with API key management, a published npm package (scrap-ai) providing AI-powered data extraction with webhook support and Zod schema validation, and a serverless backend using AWS Lambda for processing webhooks and PDF conversion.",
    category: "ai-automation",
    technologies: [
      "Next.js",
      "TypeScript",
      "AWS Lambda",
      "npm",
      "AI",
      "Serverless",
    ],
    githubUrl: "https://github.com/matovu-farid/scrap-platform",
    rank: 3,
    featured: true,
    year: "2025",
    narrative:
      "I needed an AI-powered scraping tool and realized it should be three composable pieces — a dashboard for managing operations, an npm library others could use, and a serverless backend for processing. Each piece works independently but they compose into a complete product.",
    keyDecisions: [
      "Decomposed into 3 independent services: dashboard, npm package (scrap-ai), and Lambda backend",
      "Async callback architecture instead of polling for long-running scrape operations",
      "Published scrap-ai to npm with Zod schema validation for type-safe extraction",
      "Webhook verification using timing-safe signature comparison for security",
    ],
  },
  {
    id: "case-medinsurance",
    title: "CaseMedInsurance",
    description:
      "Mobile insurance app on Google Play Store enabling client-to-personnel communication with automated email drafting via Firebase.",
    longDescription:
      "A Flutter mobile application for CaseMedInsurance deployed on Google Play Store. Allows insurance clients to communicate with personnel and request services like quotations. Features automated email drafting, Firebase backend with Cloud Functions, and a companion admin dashboard for managing hospital data.",
    category: "cross-platform",
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Functions"],
    githubUrl: "https://github.com/matovu-farid/case_medinsurance",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/case_medinsurance/master/assets/images/splash.png",
    rank: 4,
    featured: true,
    year: "2022",
    narrative:
      "Built for a real insurance company to let clients communicate with personnel and request quotations directly from their phones. This was a full product delivery — from design to Play Store publication.",
    keyDecisions: [
      "Flutter for cross-platform from a single Dart codebase targeting Android, iOS, and web",
      "Firebase Cloud Functions for serverless email automation — no server to manage",
      "Published to Google Play Store with full store listing and review process",
      "Companion admin dashboard for hospital data management built separately",
    ],
  },
  {
    id: "painter",
    title: "Painter",
    description:
      "Creative drawing and painting app on Google Play Store with shape tools, color palettes, and screenshot saving.",
    longDescription:
      "A Flutter painting app available on Google Play Store for drawing with your hands. Supports drawing shapes like circles, squares, and ovals in various colours, with the ability to save artwork via screenshots. Built with Flutter and Dart for cross-platform mobile support.",
    category: "cross-platform",
    technologies: ["Flutter", "Dart", "Canvas API"],
    githubUrl: "https://github.com/matovu-farid/painter",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/painter/master/assets/image.png",
    rank: 5,
    featured: true,
    year: "2022",
    narrative:
      "A creative drawing app — I wanted to explore Flutter's custom canvas APIs and ship something fun to the Play Store. The challenge was mapping touch input to smooth, natural-feeling strokes.",
    keyDecisions: [
      "Custom canvas rendering instead of third-party drawing libraries for full control",
      "Direct touch input mapping for a natural drawing feel",
      "Screenshot-based export keeps the save flow simple and reliable",
    ],
  },
  {
    id: "apartment-manager",
    title: "Apartment Manager",
    description:
      "Property management application for tracking tenants, payments, and maintenance built with Ruby on Rails.",
    longDescription:
      "A Ruby on Rails application for managing apartment properties, tenants, rent payments, and maintenance requests. Features a full CRUD interface with authentication and authorization.",
    category: "web-apps",
    technologies: ["Ruby on Rails", "PostgreSQL", "Ruby"],
    githubUrl: "https://github.com/matovu-farid/apartment_manager",
    rank: 6,
    featured: true,
    year: "2023",
    narrative:
      "A property management tool for tracking tenants, payments, and maintenance requests. I used this project to learn modern Rails patterns with Vite and Tailwind while building something practically useful.",
    keyDecisions: [
      "Modern Rails stack with Vite over Webpacker for faster frontend builds",
      "RSpec + Rubocop for testing discipline and consistent code quality",
      "Full CRUD with authentication and role-based authorization",
    ],
  },
  {
    id: "book-reader",
    title: "Book Reader",
    description:
      "Desktop EPUB reader with AI-powered narration using OpenAI's TTS API, smart audio caching, and paragraph highlighting.",
    longDescription:
      "An Electron desktop application with React and TypeScript for reading EPUB books. Features text-to-speech narration powered by OpenAI's TTS API with smart audio caching, paragraph highlighting during narration, and auto page navigation.",
    category: "cross-platform",
    technologies: ["Electron", "React", "TypeScript", "OpenAI TTS"],
    githubUrl: "https://github.com/matovu-farid/book-reader",
    rank: 7,
    featured: false,
  },
  {
    id: "proxy-service",
    title: "Proxy Service",
    description:
      "Containerized reverse proxy for OpenAI's TTS API with rate limiting, CORS, Docker secrets, and nginx.",
    longDescription:
      "A Dockerized proxy service that forwards requests to OpenAI's Text-to-Speech API with security hardening, rate limiting, CORS support, gzip compression, and health monitoring. Uses nginx as a reverse proxy with Bun runtime.",
    category: "dev-tools",
    technologies: ["TypeScript", "Docker", "nginx", "Bun", "REST API"],
    githubUrl: "https://github.com/matovu-farid/proxy-service",
    rank: 8,
    featured: false,
  },
  {
    id: "realtime-analytics",
    title: "Realtime Analytics",
    description:
      "Real-time search analytics dashboard with trend tracking and IP-based user analytics, built with Ruby on Rails.",
    longDescription:
      "A real-time search analytics application featuring article search with live analytics, trend tracking, and IP-based user identification. Built with Ruby on Rails and PostgreSQL with comprehensive RSpec test coverage.",
    category: "web-apps",
    technologies: ["Ruby on Rails", "PostgreSQL", "RSpec", "Real-time"],
    githubUrl: "https://github.com/matovu-farid/realtime-analytics",
    liveUrl: "https://realtime-analytics-ae1974cb754c.herokuapp.com/",
    rank: 9,
    featured: false,
  },
  {
    id: "rc-textfield",
    title: "RC-Textfield",
    description:
      "Published React component library on npm providing flexible text fields with built-in validation and Tailwind CSS styling.",
    longDescription:
      "A reusable React text field component library published as rc-textfield on npm. Features built-in validation with initialization/touched/submitted states, prefix support, and customizable styling via Tailwind CSS.",
    category: "dev-tools",
    technologies: ["React", "TypeScript", "Tailwind CSS", "npm"],
    githubUrl: "https://github.com/matovu-farid/rc-textfield",
    rank: 10,
    featured: false,
  },
  {
    id: "pearl-of-africa-tour",
    title: "Pearl of Africa Tour",
    description:
      "Responsive tourism website showcasing Uganda's annual tour event featuring game park visits and cultural experiences.",
    longDescription:
      "A responsive website for The Pearl of Africa tour — an annual event bringing tourists from all over the world to Uganda, featuring tours to the best game parks. Built with HTML, CSS, and JavaScript with a mobile-first responsive design.",
    category: "web-apps",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/matovu-farid/Pearl-of-Africa-tour",
    liveUrl: "https://matovu-farid.github.io/Pearl-of-Africa-tour/",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/Pearl-of-Africa-tour/main/assets/screenshot.png",
    rank: 11,
    featured: false,
  },
  {
    id: "case-dashboard",
    title: "Case Dashboard",
    description:
      "Admin dashboard for CaseMedInsurance managing hospital data and coordinates with Firebase backend.",
    longDescription:
      "A web dashboard for the CaseMedInsurance system used to enter and manage hospital names and coordinates. Built with JavaScript, HTML, CSS, and webpack, connecting to a Firebase backend for data persistence.",
    category: "web-apps",
    technologies: ["JavaScript", "Firebase", "webpack"],
    githubUrl: "https://github.com/matovu-farid/case-dashboard",
    liveUrl: "https://caseapp-8a255.web.app",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/case-dashboard/develop/app_screenshot.png",
    rank: 12,
    featured: false,
  },
  {
    id: "sophie-website",
    title: "Sophie Website",
    description:
      "Business website for Abia Cleaning Services LLC built with the T3 stack (Next.js, tRPC, Prisma, Tailwind).",
    longDescription:
      "A professional business website for Abia Cleaning Services LLC built with the T3 stack featuring Next.js, NextAuth.js, Prisma, tRPC, and Tailwind CSS for a modern, type-safe architecture.",
    category: "web-apps",
    technologies: ["Next.js", "tRPC", "Prisma", "Tailwind CSS", "T3 Stack"],
    githubUrl: "https://github.com/matovu-farid/sophie-website",
    rank: 13,
    featured: false,
  },
  {
    id: "stocks-app",
    title: "Stocks App",
    description:
      "Mobile-friendly stock price viewer displaying company information and real-time prices with React and Redux.",
    longDescription:
      "A React application showing company stock prices and detailed information. Built with React and Redux for state management, featuring a clean interface for browsing and filtering stock data.",
    category: "web-apps",
    technologies: ["React", "Redux", "JavaScript"],
    githubUrl: "https://github.com/matovu-farid/stocks-app",
    liveUrl: "https://frosty-beaver-391916.netlify.app",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/stocks-app/develop/screenshot.PNG",
    rank: 14,
    featured: false,
  },
  {
    id: "space-travellers",
    title: "Space Travellers",
    description:
      "SpaceX rocket booking and mission joining app consuming live SpaceX API data with React and Redux.",
    longDescription:
      "A website built with real live data from the SpaceX API providing commercial and scientific space travel services. Users can book rockets and join selected space missions. Built with React and Redux.",
    category: "web-apps",
    technologies: ["React", "Redux", "SpaceX API"],
    githubUrl: "https://github.com/matovu-farid/space-travellers",
    liveUrl: "https://space-travellers-farid-anny.netlify.app/",
    imageUrl:
      "https://user-images.githubusercontent.com/87186552/156379820-3e11ea74-556f-41a2-963f-244ed33f7faf.png",
    rank: 15,
    featured: false,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.rank - b.rank);

export const allProjectsSorted = [...projects].sort(
  (a, b) => a.rank - b.rank
);
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add narrative, keyDecisions, and year fields to project data"
```

---

### Task 6: Scroll Reveal Component

**Files:**
- Create: `src/components/scroll-reveal.tsx`

- [ ] **Step 1: Create scroll-reveal.tsx**

Create `src/components/scroll-reveal.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/scroll-reveal.tsx
git commit -m "feat: add scroll reveal animation wrapper component"
```

---

### Task 7: Stat Counter Component

**Files:**
- Create: `src/components/stat-counter.tsx`

- [ ] **Step 1: Create stat-counter.tsx**

Create `src/components/stat-counter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ end, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-foreground">
        {count}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/stat-counter.tsx
git commit -m "feat: add animated stat counter component with viewport trigger"
```

---

### Task 8: Capability Card Component

**Files:**
- Create: `src/components/capability-card.tsx`

- [ ] **Step 1: Create capability-card.tsx**

Create `src/components/capability-card.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  index?: number;
}

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  tags,
  index = 0,
}: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-lg"
    >
      <Icon size={24} className="text-primary mb-4" />
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/capability-card.tsx
git commit -m "feat: add capability card component for homepage skills section"
```

---

### Task 9: Homepage Redesign

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Complete homepage redesign**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign homepage with hero, capability cards, featured work, and experience preview"
```

---

### Task 10: Project Card Restyle + Case Study Links

**Files:**
- Modify: `src/components/project-card.tsx`

- [ ] **Step 1: Restyle project card with new palette and case study click-through**

Replace the entire contents of `src/components/project-card.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
  index = 0,
}: ProjectCardProps) {
  const hasNarrative = Boolean(project.narrative);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-lg ${
        featured ? "md:flex-row" : ""
      }`}
    >
      {project.imageUrl ? (
        <div
          className={`relative overflow-hidden ${
            featured ? "md:w-1/2 h-48 md:h-auto" : "h-48"
          }`}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`relative overflow-hidden ${
            featured ? "md:w-1/2 h-48 md:h-auto" : "h-48"
          } bg-secondary flex items-center justify-center`}
        >
          <span className="text-4xl font-bold text-muted-foreground/30">
            {project.title[0]}
          </span>
        </div>
      )}
      <div
        className={`p-5 flex flex-col flex-grow ${featured ? "md:w-1/2" : ""}`}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold text-foreground ${featured ? "text-xl" : "text-lg"}`}>
            {project.title}
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap ml-2">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
          {featured ? project.longDescription : project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          {hasNarrative && (
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              Case Study
              <ArrowRight size={14} />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Code size={16} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-card.tsx
git commit -m "feat: restyle project card with new palette and case study links"
```

---

### Task 11: Case Study Page

**Files:**
- Create: `src/app/projects/[id]/page.tsx`

- [ ] **Step 1: Create the case study dynamic route page**

Create `src/app/projects/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudyContent from "./case-study-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.narrative)
    .map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Farid Matovu`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project || !project.narrative) {
    notFound();
  }

  const projectIndex = projects.filter((p) => p.narrative).findIndex((p) => p.id === id);
  const narrativeProjects = projects.filter((p) => p.narrative);
  const prevProject = projectIndex > 0 ? narrativeProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < narrativeProjects.length - 1
      ? narrativeProjects[projectIndex + 1]
      : null;

  return (
    <CaseStudyContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
```

- [ ] **Step 2: Create the client component for case study content**

Create `src/app/projects/[id]/case-study-content.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CaseStudyContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function CaseStudyContent({
  project,
  prevProject,
  nextProject,
}: CaseStudyContentProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12 max-w-3xl">
        <PageTransition>
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {CATEGORY_LABELS[project.category]}
              </span>
              {project.year && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {project.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            {project.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-secondary h-48 flex items-center justify-center border border-border">
                <span className="text-5xl font-bold text-muted-foreground/20">
                  {project.title[0]}
                </span>
              </div>
            )}
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="border-l-2 border-primary pl-5">
              <p className="text-foreground leading-relaxed text-lg">
                {project.narrative}
              </p>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Key Decisions */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">
                Key Decisions
              </h2>
              <div className="space-y-3">
                {project.keyDecisions.map((decision, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <ChevronRight
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-muted-foreground leading-relaxed">
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex gap-4 mb-16"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-card border border-border px-5 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <Code size={16} />
                View Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </motion.div>

          {/* Prev/Next navigation */}
          <div className="border-t border-border pt-8 flex justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <div>
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium text-foreground">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium text-foreground">
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -10`
Expected: Build succeeds with static params generated for featured projects

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/\[id\]/page.tsx src/app/projects/\[id\]/case-study-content.tsx
git commit -m "feat: add project case study pages with narrative and key decisions"
```

---

### Task 12: Projects Page Restyle

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/components/project-search.tsx`
- Modify: `src/components/category-filter.tsx`
- Modify: `src/components/pagination.tsx`

- [ ] **Step 1: Restyle projects page**

Replace the entire contents of `src/app/projects/page.tsx` with:

```tsx
"use client";

import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import ProjectCard from "@/components/project-card";
import ProjectSearch from "@/components/project-search";
import CategoryFilter from "@/components/category-filter";
import Pagination from "@/components/pagination";
import ScrollReveal from "@/components/scroll-reveal";
import { featuredProjects, allProjectsSorted } from "@/data/projects";
import type { Category } from "@/data/projects";

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase();
    return allProjectsSorted.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const isFiltering = search !== "" || category !== "all";

  const handleCategoryChange = (cat: Category | "all") => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12">
        <PageTransition>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-center">
            Projects
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            A curated selection of my work across different domains
          </p>

          {!isFiltering && (
            <section className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Featured
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured
                    index={i}
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            {!isFiltering && (
              <h2 className="text-xl font-semibold text-foreground mb-6">
                All Projects
              </h2>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <ProjectSearch
                  value={search}
                  onSearchChangeAction={handleSearchChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <CategoryFilter
                selected={category}
                onCategoryChangeAction={handleCategoryChange}
              />
            </div>

            {paginatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No projects found matching your search.
              </div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChangeAction={setPage}
            />
          </section>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Restyle project search**

Replace the entire contents of `src/components/project-search.tsx` with:

```tsx
"use client";

import { Search } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onSearchChangeAction: (value: string) => void;
}

export default function ProjectSearch({
  value,
  onSearchChangeAction,
}: ProjectSearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onSearchChangeAction(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
      />
    </div>
  );
}
```

- [ ] **Step 3: Restyle category filter**

Replace the entire contents of `src/components/category-filter.tsx` with:

```tsx
"use client";

import { motion } from "motion/react";
import type { Category } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CategoryFilterProps {
  selected: Category | "all";
  onCategoryChangeAction: (category: Category | "all") => void;
}

const categories: (Category | "all")[] = [
  "all",
  "ai-automation",
  "cross-platform",
  "web-apps",
  "dev-tools",
];

export default function CategoryFilter({
  selected,
  onCategoryChangeAction,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChangeAction(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
        </motion.button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Restyle pagination**

Replace the entire contents of `src/components/pagination.tsx` with:

```tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChangeAction,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChangeAction(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-secondary transition-colors text-foreground"
      >
        <ChevronLeft size={20} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChangeAction(page)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChangeAction(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-secondary transition-colors text-foreground"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/app/projects/page.tsx src/components/project-search.tsx src/components/category-filter.tsx src/components/pagination.tsx
git commit -m "feat: restyle projects page, search, filters, and pagination with new palette"
```

---

### Task 13: Experience Card + Page Restyle

**Files:**
- Modify: `src/components/experience-card.tsx`
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Restyle experience card**

Replace the entire contents of `src/components/experience-card.tsx` with:

```tsx
"use client";

import { motion } from "motion/react";

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string;
  index?: number;
}

export default function ExperienceCard({
  company,
  position,
  period,
  description,
  index = 0,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">{position}</h3>
          <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
            {period}
          </span>
        </div>
        <h4 className="text-sm text-primary font-medium mb-3">{company}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Restyle experience page**

Replace the entire contents of `src/app/experience/page.tsx` with:

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/experience-card.tsx src/app/experience/page.tsx
git commit -m "feat: restyle experience card and page with new palette and scroll reveals"
```

---

### Task 14: Contact Page Restyle

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Restyle contact page with stone inputs and emerald button**

Replace the entire contents of `src/app/contact/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);
    setFormStatus(result);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12 max-w-md">
        <PageTransition>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-center">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Have a project in mind? Let&apos;s talk.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </form>

          {formStatus && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg text-sm ${
                formStatus.success
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {formStatus.message}
            </motion.div>
          )}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify full build**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build 2>&1 | tail -15`
Expected: Build succeeds with all pages generated

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: restyle contact page with stone inputs and emerald accent"
```

---

### Task 15: Final Verification + Dev Server Check

- [ ] **Step 1: Run the dev server and verify all pages load**

Run: `cd /Users/faridmatovu/projects/portfolio && bun run build`
Expected: Full build succeeds with no errors

- [ ] **Step 2: Spot-check all routes work**

Start dev server: `bun run dev`
Check these routes load without errors:
- `http://localhost:3000/` — homepage with hero, stats, capability cards, featured projects
- `http://localhost:3000/projects` — projects grid with search/filter
- `http://localhost:3000/projects/rishi` — case study page
- `http://localhost:3000/projects/maria` — case study page
- `http://localhost:3000/experience` — experience timeline
- `http://localhost:3000/contact` — contact form

- [ ] **Step 3: Final commit with any fixes needed**

If any issues found during dev check, fix and commit.
