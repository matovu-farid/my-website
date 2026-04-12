# Portfolio Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the `/projects` page with curated GitHub projects, search, category filtering, pagination, and a featured projects showcase.

**Architecture:** Client-side rendered page with a static TypeScript data file. Search and filtering are client-side with React state. The page uses the existing `motion` animation library, `lucide-react` icons, and Tailwind CSS.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, motion, lucide-react

---

### Task 1: Create project data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the data file with types and all 15 projects**

```typescript
// src/data/projects.ts

export type Category = "ai-automation" | "cross-platform" | "web-apps" | "dev-tools";

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
    technologies: ["Tauri", "TypeScript", "Bun", "TTS", "Monorepo"],
    githubUrl: "https://github.com/matovu-farid/rishi-monorepo",
    imageUrl:
      "https://raw.githubusercontent.com/matovu-farid/rishi-monorepo/main/screenshots/library.png",
    rank: 1,
    featured: true,
  },
  {
    id: "maria",
    title: "Maria",
    description:
      "Production cryptocurrency trading bot with multiple strategies, backtesting, grid-search optimization, and Docker Swarm deployment.",
    longDescription:
      "A sophisticated crypto trading bot built with TypeScript and Effect.js for Binance Futures. Features multiple trading strategies, Spearman noise validation, Kelly criterion position sizing, strategy parameter optimization via grid search, and automated Docker Swarm deployment with Prisma/PostgreSQL state management.",
    category: "ai-automation",
    technologies: ["TypeScript", "Effect.js", "Docker", "Prisma", "PostgreSQL", "Binance API"],
    rank: 2,
    featured: true,
  },
  {
    id: "scrap-platform",
    title: "AI Scraping Ecosystem",
    description:
      "Full AI-powered scraping product: interactive Next.js dashboard, published npm library (scrap-ai), and serverless AWS Lambda backend.",
    longDescription:
      "A complete AI scraping ecosystem comprising three projects: a Next.js dashboard for managing scraping operations with API key management, a published npm package (scrap-ai) providing AI-powered data extraction with webhook support and Zod schema validation, and a serverless backend using AWS Lambda for processing webhooks and PDF conversion.",
    category: "ai-automation",
    technologies: ["Next.js", "TypeScript", "AWS Lambda", "npm", "AI", "Serverless"],
    githubUrl: "https://github.com/matovu-farid/scrap-platform",
    rank: 3,
    featured: true,
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

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.rank - b.rank);

export const allProjectsSorted = [...projects].sort((a, b) => a.rank - b.rank);
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/faridmatovu/projects/portfolio && npx tsc --noEmit src/data/projects.ts`

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add curated project data with 15 GitHub projects"
```

---

### Task 2: Enhance ProjectCard component

**Files:**
- Modify: `src/components/project-card.tsx`

- [ ] **Step 1: Rewrite ProjectCard with image, tech tags, links, and featured variant**

Replace the entire contents of `src/components/project-card.tsx` with:

```typescript
"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col ${
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
          } bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center`}
        >
          <span className="text-4xl font-bold text-primary/30">
            {project.title[0]}
          </span>
        </div>
      )}
      <div className={`p-5 flex flex-col flex-grow ${featured ? "md:w-1/2" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold ${featured ? "text-xl" : "text-lg"}`}>
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap ml-2">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {featured ? project.longDescription : project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Github size={16} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/faridmatovu/projects/portfolio && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/project-card.tsx
git commit -m "feat: enhance ProjectCard with images, tech tags, links, and featured variant"
```

---

### Task 3: Create search, category filter, and pagination components

**Files:**
- Create: `src/components/project-search.tsx`
- Create: `src/components/category-filter.tsx`
- Create: `src/components/pagination.tsx`

- [ ] **Step 1: Create ProjectSearch component**

```typescript
// src/components/project-search.tsx
"use client";

import { Search } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create CategoryFilter component**

```typescript
// src/components/category-filter.tsx
"use client";

import { motion } from "motion/react";
import type { Category } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CategoryFilterProps {
  selected: Category | "all";
  onChange: (category: Category | "all") => void;
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
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
        </motion.button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create Pagination component**

```typescript
// src/components/pagination.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Verify all compile**

Run: `cd /Users/faridmatovu/projects/portfolio && npx tsc --noEmit`

- [ ] **Step 5: Commit**

```bash
git add src/components/project-search.tsx src/components/category-filter.tsx src/components/pagination.tsx
git commit -m "feat: add search, category filter, and pagination components"
```

---

### Task 4: Rewrite projects page

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Rewrite the projects page with featured section, search, filter, and pagination**

Replace the entire contents of `src/app/projects/page.tsx` with:

```typescript
"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import ProjectSearch from "@/components/project-search";
import CategoryFilter from "@/components/category-filter";
import Pagination from "@/components/pagination";
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 text-center"
        >
          My Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-center mb-10"
        >
          A curated selection of my work across different domains
        </motion.p>

        {!isFiltering && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Featured</h2>
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
            <h2 className="text-2xl font-semibold mb-6">All Projects</h2>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <ProjectSearch value={search} onChange={handleSearchChange} />
            </div>
          </div>
          <div className="mb-6">
            <CategoryFilter
              selected={category}
              onChange={handleCategoryChange}
            />
          </div>

          {paginatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No projects found matching your search.
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles and runs**

Run: `cd /Users/faridmatovu/projects/portfolio && npx tsc --noEmit`
Run: `cd /Users/faridmatovu/projects/portfolio && npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: rewrite projects page with featured section, search, filtering, and pagination"
```
