# Launchpad + Portfolio Turborepo Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Turborepo monorepo with the existing portfolio and a new AI-powered career admin tool (Launchpad) that generates ATS-optimized resumes and cover letters from job descriptions.

**Architecture:** Two independent Next.js apps in a Turborepo. Portfolio is moved in as-is. Launchpad is a new Next.js 15 app with Drizzle ORM, PostgreSQL, OpenAI GPT-4o, React-PDF, and Resend. No shared packages — portfolio has no DB and doesn't consume launchpad code.

**Tech Stack:** Turborepo, pnpm, Next.js 15, Tailwind CSS, shadcn/ui, Drizzle ORM, PostgreSQL, OpenAI GPT-4o, React-PDF (@react-pdf/renderer), Resend

---

## File Structure

```
portfolio/                          ← repo root (renamed conceptually to monorepo)
├── turbo.json                      ← Turborepo config
├── pnpm-workspace.yaml             ← workspace definition
├── package.json                    ← root package.json (workspace scripts)
├── .env                            ← shared env vars
├── .gitignore                      ← updated for monorepo
├── apps/
│   ├── portfolio/                  ← existing portfolio moved here
│   │   ├── package.json            ← name: @portfolio/web
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── src/...
│   └── launchpad/                  ← new app
│       ├── package.json            ← name: @portfolio/launchpad
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── postcss.config.mjs
│       ├── eslint.config.mjs
│       ├── components.json
│       ├── drizzle.config.ts
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   ├── globals.css
│       │   │   ├── page.tsx                    ← dashboard
│       │   │   ├── profile/
│       │   │   │   └── page.tsx                ← edit profile
│       │   │   └── jobs/
│       │   │       ├── new/
│       │   │       │   └── page.tsx            ← paste job description
│       │   │       └── [id]/
│       │   │           ├── page.tsx            ← job detail
│       │   │           ├── resume/
│       │   │           │   └── page.tsx        ← resume preview
│       │   │           └── cover-letter/
│       │   │               └── page.tsx        ← cover letter preview
│       │   ├── lib/
│       │   │   ├── db/
│       │   │   │   ├── index.ts               ← drizzle client
│       │   │   │   └── schema/
│       │   │   │       ├── index.ts
│       │   │   │       ├── profile.ts
│       │   │   │       ├── companies.ts
│       │   │   │       ├── jobs.ts
│       │   │   │       ├── job-descriptions.ts
│       │   │   │       ├── resumes.ts
│       │   │   │       └── cover-letters.ts
│       │   │   ├── ai/
│       │   │   │   ├── openai.ts              ← OpenAI client
│       │   │   │   ├── parse-job.ts           ← parse job description
│       │   │   │   ├── match-score.ts         ← calculate match score
│       │   │   │   ├── generate-resume.ts     ← generate resume content
│       │   │   │   └── generate-cover-letter.ts
│       │   │   ├── pdf/
│       │   │   │   ├── resume-template.tsx     ← React-PDF resume component
│       │   │   │   ├── cover-letter-template.tsx
│       │   │   │   └── render-pdf.ts          ← render to buffer
│       │   │   ├── email/
│       │   │   │   └── send-documents.ts      ← Resend email
│       │   │   └── utils.ts
│       │   ├── actions/
│       │   │   ├── profile-actions.ts
│       │   │   ├── job-actions.ts
│       │   │   └── document-actions.ts
│       │   └── components/
│       │       └── ui/                        ← shadcn/ui components
│       └── drizzle/                           ← migrations output
│           └── ...
```

---

### Task 1: Initialize Turborepo Monorepo Structure

**Files:**
- Create: `turbo.json`
- Create: `pnpm-workspace.yaml`
- Modify: `package.json` (root)
- Move: all existing portfolio files → `apps/portfolio/`
- Modify: `apps/portfolio/package.json` (rename to `@portfolio/web`)
- Modify: `.gitignore` (update paths for monorepo)

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "apps/*"
```

- [ ] **Step 2: Create `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "db:push": {
      "cache": false
    },
    "db:generate": {
      "cache": false
    }
  }
}
```

- [ ] **Step 3: Move portfolio into `apps/portfolio/`**

```bash
mkdir -p apps/portfolio
# Move all portfolio source files (not .git, not node_modules, not .env)
git mv src apps/portfolio/
git mv public apps/portfolio/
git mv next.config.ts apps/portfolio/
git mv tailwind.config.ts apps/portfolio/
git mv tsconfig.json apps/portfolio/
git mv postcss.config.mjs apps/portfolio/
git mv eslint.config.mjs apps/portfolio/
git mv components.json apps/portfolio/
git mv playwright.config.ts apps/portfolio/
git mv tests apps/portfolio/
git mv tests-examples apps/portfolio/
git mv scraping apps/portfolio/
git mv docs apps/portfolio/
git mv logs apps/portfolio/
```

- [ ] **Step 4: Update `apps/portfolio/package.json`**

Change name and verify scripts still work:

```json
{
  "name": "@portfolio/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.474.0",
    "motion": "^12.0.5",
    "next": "15.1.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^4.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@playwright/test": "",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@zerostep/playwright": "^0.1.5",
    "eslint": "^9",
    "eslint-config-next": "15.1.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 5: Create root `package.json`**

```json
{
  "name": "portfolio-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "dev:portfolio": "turbo dev --filter=@portfolio/web",
    "dev:launchpad": "turbo dev --filter=@portfolio/launchpad"
  },
  "devDependencies": {
    "turbo": "^2"
  },
  "packageManager": "pnpm@9.15.0"
}
```

- [ ] **Step 6: Update `.gitignore` for monorepo**

Add these lines to the existing `.gitignore`:

```gitignore
# turbo
.turbo

# generated PDFs
apps/launchpad/generated/
```

- [ ] **Step 7: Create root `.env`**

Merge env vars from portfolio `.env` and money-lending `.env`:

```env
# Portfolio
ZEROSTEP_TOKEN=ece81c92-0db3-429a-a341-5fa45c45223a

# Launchpad
DATABASE_URL=postgres://faridmatovu:alphanew90@localhost:5432/launchpad
OPENAI_API_KEY=sk-your-openai-key-here

# Shared
RESEND_API_KEY=REDACTED_RESEND_API_KEY
EMAIL_ADDRESS=matovu90@gmail.com
```

Note: The user needs to replace `OPENAI_API_KEY` with their real key. The `RESEND_API_KEY` is taken from the money-lending `.env`. Portfolio's own Resend key (`REDACTED_RESEND_API_KEY`) is replaced with the money-lending one since they share credentials now.

- [ ] **Step 8: Remove old portfolio root `.env`**

Delete `apps/portfolio/.env` — env vars now live at root. Next.js apps in Turborepo automatically read from the root `.env`.

Actually, Turborepo does NOT auto-pass root `.env` to apps. Each app needs its own `.env` or you configure `dotEnv` in `turbo.json`. Update `turbo.json` to include root env:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDotEnv": [".env"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "db:push": {
      "cache": false
    },
    "db:generate": {
      "cache": false
    }
  }
}
```

- [ ] **Step 9: Install dependencies and verify portfolio works**

```bash
pnpm install
pnpm dev:portfolio
```

Expected: Portfolio runs on `localhost:3000` with no errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: convert to Turborepo monorepo, move portfolio to apps/portfolio"
```

---

### Task 2: Scaffold Launchpad Next.js App

**Files:**
- Create: `apps/launchpad/package.json`
- Create: `apps/launchpad/next.config.ts`
- Create: `apps/launchpad/tsconfig.json`
- Create: `apps/launchpad/tailwind.config.ts`
- Create: `apps/launchpad/postcss.config.mjs`
- Create: `apps/launchpad/eslint.config.mjs`
- Create: `apps/launchpad/components.json`
- Create: `apps/launchpad/src/app/layout.tsx`
- Create: `apps/launchpad/src/app/globals.css`
- Create: `apps/launchpad/src/app/page.tsx`
- Create: `apps/launchpad/src/lib/utils.ts`

- [ ] **Step 1: Create `apps/launchpad/package.json`**

```json
{
  "name": "@portfolio/launchpad",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3001",
    "build": "next build",
    "start": "next start --port 3001",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "next": "15.1.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "drizzle-orm": "^0.38.0",
    "postgres": "^3.4.0",
    "@react-pdf/renderer": "^4.3.0",
    "openai": "^4.80.0",
    "resend": "^4.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.474.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "drizzle-kit": "^0.30.0",
    "eslint": "^9",
    "eslint-config-next": "15.1.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create `apps/launchpad/next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React-PDF needs webpack config for canvas
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
```

- [ ] **Step 3: Create `apps/launchpad/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `apps/launchpad/tailwind.config.ts`**

Dashboard-oriented dark theme with slate base (distinct from portfolio's zinc):

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

- [ ] **Step 5: Create `apps/launchpad/postcss.config.mjs`**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

- [ ] **Step 6: Create `apps/launchpad/eslint.config.mjs`**

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

- [ ] **Step 7: Create `apps/launchpad/components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

- [ ] **Step 8: Create `apps/launchpad/src/app/globals.css`**

Slate-based dark dashboard theme:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 215 25% 9%;
    --card: 0 0% 100%;
    --card-foreground: 215 25% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 215 25% 9%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 215 25% 9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 210 40% 96%;
    --accent-foreground: 215 25% 9%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 221 83% 53%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;
    --card: 222 47% 8%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 8%;
    --popover-foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 222 47% 6%;
    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 224 76% 48%;
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

- [ ] **Step 9: Create `apps/launchpad/src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 10: Create `apps/launchpad/src/app/layout.tsx`**

```typescript
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Launchpad — Career Admin",
  description: "AI-powered resume and cover letter generation",
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

- [ ] **Step 11: Create `apps/launchpad/src/app/page.tsx`**

Placeholder dashboard page:

```typescript
export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-2">Launchpad</h1>
      <p className="text-muted-foreground">Career admin tool — coming soon</p>
    </main>
  );
}
```

- [ ] **Step 12: Install dependencies and verify both apps run**

```bash
pnpm install
pnpm dev
```

Expected: Portfolio on `localhost:3000`, Launchpad on `localhost:3001` both running.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold launchpad Next.js app with dashboard theme"
```

---

### Task 3: Database Schema & Drizzle Setup

**Files:**
- Create: `apps/launchpad/drizzle.config.ts`
- Create: `apps/launchpad/src/lib/db/index.ts`
- Create: `apps/launchpad/src/lib/db/schema/index.ts`
- Create: `apps/launchpad/src/lib/db/schema/profile.ts`
- Create: `apps/launchpad/src/lib/db/schema/companies.ts`
- Create: `apps/launchpad/src/lib/db/schema/jobs.ts`
- Create: `apps/launchpad/src/lib/db/schema/job-descriptions.ts`
- Create: `apps/launchpad/src/lib/db/schema/resumes.ts`
- Create: `apps/launchpad/src/lib/db/schema/cover-letters.ts`

- [ ] **Step 1: Create the `launchpad` database locally**

```bash
createdb launchpad
```

Expected: Database created successfully (or "already exists" if it does).

- [ ] **Step 2: Create `apps/launchpad/drizzle.config.ts`**

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

- [ ] **Step 3: Create `apps/launchpad/src/lib/db/index.ts`**

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });
```

- [ ] **Step 4: Create `apps/launchpad/src/lib/db/schema/profile.ts`**

```typescript
import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  summary: text("summary"),
  skills: jsonb("skills").$type<string[]>().default([]),
  experienceJson: jsonb("experience_json").$type<{
    company: string;
    position: string;
    period: string;
    description: string;
    bullets: string[];
  }[]>().default([]),
  educationJson: jsonb("education_json").$type<{
    institution: string;
    degree: string;
    year: string;
  }[]>().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 5: Create `apps/launchpad/src/lib/db/schema/companies.ts`**

```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  industry: text("industry"),
  size: text("size"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 6: Create `apps/launchpad/src/lib/db/schema/jobs.ts`**

```typescript
import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const jobTypeEnum = pgEnum("job_type", ["remote", "hybrid", "onsite"]);

export const jobSourceEnum = pgEnum("job_source", [
  "manual_paste",
  "linkedin",
  "indeed",
  "other",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "saved",
  "applied",
  "interviewing",
  "rejected",
  "offered",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyId: integer("company_id").references(() => companies.id),
  location: text("location"),
  type: jobTypeEnum("type"),
  source: jobSourceEnum("source").notNull().default("manual_paste"),
  sourceUrl: text("source_url"),
  status: jobStatusEnum("status").notNull().default("saved"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 7: Create `apps/launchpad/src/lib/db/schema/job-descriptions.ts`**

```typescript
import { pgTable, serial, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const jobDescriptions = pgTable("job_descriptions", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  rawText: text("raw_text").notNull(),
  parsedSkills: jsonb("parsed_skills").$type<string[]>().default([]),
  parsedRequirements: jsonb("parsed_requirements").$type<string[]>().default([]),
  matchScore: integer("match_score"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 8: Create `apps/launchpad/src/lib/db/schema/resumes.ts`**

```typescript
import { pgTable, serial, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export interface ResumeContent {
  summary: string;
  experiences: {
    company: string;
    position: string;
    period: string;
    bullets: string[];
  }[];
  skills: string[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  contentJson: jsonb("content_json").$type<ResumeContent>().notNull(),
  pdfPath: text("pdf_path"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 9: Create `apps/launchpad/src/lib/db/schema/cover-letters.ts`**

```typescript
import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const coverLetters = pgTable("cover_letters", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  contentText: text("content_text").notNull(),
  pdfPath: text("pdf_path"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 10: Create `apps/launchpad/src/lib/db/schema/index.ts`**

```typescript
export * from "./profile";
export * from "./companies";
export * from "./jobs";
export * from "./job-descriptions";
export * from "./resumes";
export * from "./cover-letters";
```

- [ ] **Step 11: Push schema to database**

```bash
cd apps/launchpad
pnpm db:push
```

Expected: All tables created in the `launchpad` database.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: add Drizzle schema for launchpad (profile, jobs, resumes, cover letters)"
```

---

### Task 4: Profile Management

**Files:**
- Create: `apps/launchpad/src/actions/profile-actions.ts`
- Create: `apps/launchpad/src/app/profile/page.tsx`
- Modify: `apps/launchpad/src/app/page.tsx` (add nav links)

- [ ] **Step 1: Install shadcn/ui components needed for profile page**

```bash
cd apps/launchpad
pnpm dlx shadcn@latest add button input textarea card label badge
```

- [ ] **Step 2: Create `apps/launchpad/src/actions/profile-actions.ts`**

```typescript
"use server";

import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}

export async function upsertProfile(data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experienceJson: {
    company: string;
    position: string;
    period: string;
    description: string;
    bullets: string[];
  }[];
  educationJson: {
    institution: string;
    degree: string;
    year: string;
  }[];
}) {
  const existing = await getProfile();

  if (existing) {
    await db
      .update(profile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profile.id, existing.id));
  } else {
    await db.insert(profile).values(data);
  }

  revalidatePath("/profile");
  revalidatePath("/");
}

export async function seedProfileFromPortfolio() {
  const existing = await getProfile();
  if (existing) return existing;

  const seed = {
    name: "Farid Matovu",
    email: "matovu90@gmail.com",
    phone: "",
    location: "Uganda",
    summary:
      "Full-stack polyglot engineer building complete systems — from trading bots to cross-platform readers to AI-powered tools. Strong in TypeScript, React, Next.js, Node.js, and PostgreSQL with experience across Flutter, Rust, Tauri, and AWS.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "Rust",
      "Tauri",
      "Docker",
      "AWS Lambda",
      "Firebase",
      "Prisma",
      "Drizzle ORM",
      "OpenAI API",
      "Effect.js",
      "Git",
      "REST APIs",
      "TDD",
    ],
    experienceJson: [
      {
        company: "Dabble Lab",
        position: "Full Stack Developer",
        period: "Oct 2022 — Present",
        description:
          "Built platforms like DialogCast (podcasting from group chat conversations) and Coverage in a Click (automotive warranty services) with integrations like OpenAI, Telegram, Discord, CRMs, and Stripe.",
        bullets: [
          "Built DialogCast — a podcasting platform that converts group chat conversations into publishable audio content",
          "Developed Coverage in a Click — automotive warranty services platform with CRM and Stripe integrations",
          "Integrated OpenAI, Telegram, and Discord APIs for automated conversational workflows",
          "Implemented payment processing with Stripe for subscription and one-time purchases",
        ],
      },
      {
        company: "Microverse",
        position: "Frontend Engineer",
        period: "2022",
        description:
          "Collaborated internationally to build full-stack applications, focusing on React, Node.js, and PostgreSQL while emphasizing test-driven development and modular architectures.",
        bullets: [
          "Built full-stack applications with React, Node.js, and PostgreSQL in international teams",
          "Practiced test-driven development and modular architecture patterns",
          "Participated in code reviews and pair programming across time zones",
        ],
      },
      {
        company: "Sustainable and Greener World",
        position: "Developer",
        period: "Jan 2020 — Jan 2021",
        description:
          "Contributed to the Kula-Safi Project, integrating AI to predict crop shelf life, connecting farmers to markets, and improving food supply chain resilience.",
        bullets: [
          "Integrated AI models to predict crop shelf life for the Kula-Safi Project",
          "Built features connecting farmers to markets to improve food supply chain resilience",
          "Collaborated with cross-functional team on agricultural technology solutions",
        ],
      },
    ],
    educationJson: [] as { institution: string; degree: string; year: string }[],
  };

  await db.insert(profile).values(seed);
  return seed;
}
```

- [ ] **Step 3: Create `apps/launchpad/src/app/profile/page.tsx`**

```typescript
import { getProfile, seedProfileFromPortfolio, upsertProfile } from "@/actions/profile-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const existing = await getProfile();
  const profileData = existing ?? (await seedProfileFromPortfolio());

  async function saveProfile(formData: FormData) {
    "use server";

    const skillsRaw = formData.get("skills") as string;
    const experienceRaw = formData.get("experienceJson") as string;
    const educationRaw = formData.get("educationJson") as string;

    await upsertProfile({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      summary: formData.get("summary") as string,
      skills: skillsRaw.split(",").map((s) => s.trim()).filter(Boolean),
      experienceJson: JSON.parse(experienceRaw || "[]"),
      educationJson: JSON.parse(educationRaw || "[]"),
    });

    redirect("/profile");
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Your master profile — AI uses this to generate tailored resumes</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <form action={saveProfile}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={profileData.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={profileData.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={profileData.phone ?? ""} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={profileData.location ?? ""} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                name="summary"
                rows={4}
                defaultValue={profileData.summary ?? ""}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <p className="text-sm text-muted-foreground">Comma-separated list</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="skills"
                rows={3}
                defaultValue={(profileData.skills ?? []).join(", ")}
              />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(profileData.skills ?? []).map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <p className="text-sm text-muted-foreground">JSON array — each entry: company, position, period, description, bullets[]</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="experienceJson"
                rows={12}
                className="font-mono text-sm"
                defaultValue={JSON.stringify(profileData.experienceJson ?? [], null, 2)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <p className="text-sm text-muted-foreground">JSON array — each entry: institution, degree, year</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="educationJson"
                rows={6}
                className="font-mono text-sm"
                defaultValue={JSON.stringify(profileData.educationJson ?? [], null, 2)}
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            Save Profile
          </Button>
        </div>
      </form>
    </main>
  );
}
```

- [ ] **Step 4: Update `apps/launchpad/src/app/page.tsx` with navigation**

```typescript
import Link from "next/link";
import { db } from "@/lib/db";
import { jobs, companies } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function Dashboard() {
  const allJobs = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      companyName: companies.name,
      status: jobs.status,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .orderBy(desc(jobs.createdAt));

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Launchpad</h1>
          <p className="text-muted-foreground">AI-powered career admin</p>
        </div>
        <div className="flex gap-3">
          <Link href="/profile">
            <button className="px-4 py-2 rounded-md border border-border text-sm hover:bg-accent">
              Profile
            </button>
          </Link>
          <Link href="/jobs/new">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
              + New Job
            </button>
          </Link>
        </div>
      </div>

      {allJobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg mb-2">No jobs tracked yet</p>
          <p>Paste a job description to get started</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Title</th>
                <th className="text-left p-3 text-sm font-medium">Company</th>
                <th className="text-left p-3 text-sm font-medium">Status</th>
                <th className="text-left p-3 text-sm font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {allJobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-muted/30">
                  <td className="p-3">
                    <Link href={`/jobs/${job.id}`} className="text-primary hover:underline">
                      {job.title}
                    </Link>
                  </td>
                  <td className="p-3 text-muted-foreground">{job.companyName ?? "—"}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "saved" ? "bg-muted text-muted-foreground" :
                      job.status === "applied" ? "bg-blue-500/20 text-blue-400" :
                      job.status === "interviewing" ? "bg-yellow-500/20 text-yellow-400" :
                      job.status === "rejected" ? "bg-red-500/20 text-red-400" :
                      job.status === "offered" ? "bg-green-500/20 text-green-400" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-sm">
                    {job.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 5: Verify profile page works**

```bash
pnpm dev:launchpad
```

Visit `localhost:3001/profile`. Expected: Profile form pre-filled with seeded portfolio data.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add profile management with portfolio data seeding"
```

---

### Task 5: AI Pipeline — Job Parsing & Match Score

**Files:**
- Create: `apps/launchpad/src/lib/ai/openai.ts`
- Create: `apps/launchpad/src/lib/ai/parse-job.ts`
- Create: `apps/launchpad/src/lib/ai/match-score.ts`

- [ ] **Step 1: Create `apps/launchpad/src/lib/ai/openai.ts`**

```typescript
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

- [ ] **Step 2: Create `apps/launchpad/src/lib/ai/parse-job.ts`**

```typescript
import { openai } from "./openai";

export interface ParsedJob {
  title: string;
  company: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  companyDescription: string;
}

export async function parseJobDescription(rawText: string): Promise<ParsedJob> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a job description parser. Extract structured data from job descriptions.
Return JSON with these fields:
- title: string (job title)
- company: string (company name)
- location: string (job location or "Not specified")
- type: "remote" | "hybrid" | "onsite" (infer from description)
- skills: string[] (required technical skills and technologies)
- requirements: string[] (qualifications, years of experience, education)
- responsibilities: string[] (key job responsibilities)
- companyDescription: string (brief company description if mentioned, otherwise empty string)`,
      },
      {
        role: "user",
        content: rawText,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as ParsedJob;
}
```

- [ ] **Step 3: Create `apps/launchpad/src/lib/ai/match-score.ts`**

```typescript
import { openai } from "./openai";

export interface MatchAnalysis {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  notes: string;
}

export async function calculateMatchScore(
  profileSkills: string[],
  profileExperience: { company: string; position: string; description: string; bullets: string[] }[],
  jobSkills: string[],
  jobRequirements: string[]
): Promise<MatchAnalysis> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a job match analyzer. Compare a candidate's profile against job requirements.
Return JSON with:
- score: number (0-100, how well the candidate matches)
- matchedSkills: string[] (skills the candidate has that the job wants)
- missingSkills: string[] (skills the job wants that the candidate lacks)
- notes: string (brief assessment of fit, strengths, and gaps)`,
      },
      {
        role: "user",
        content: JSON.stringify({
          candidateSkills: profileSkills,
          candidateExperience: profileExperience,
          jobSkills,
          jobRequirements,
        }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as MatchAnalysis;
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add OpenAI-powered job parsing and match score analysis"
```

---

### Task 6: AI Pipeline — Resume & Cover Letter Generation

**Files:**
- Create: `apps/launchpad/src/lib/ai/generate-resume.ts`
- Create: `apps/launchpad/src/lib/ai/generate-cover-letter.ts`

- [ ] **Step 1: Create `apps/launchpad/src/lib/ai/generate-resume.ts`**

```typescript
import { openai } from "./openai";
import type { ResumeContent } from "@/lib/db/schema/resumes";

export async function generateResume(
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    skills: string[];
    experienceJson: {
      company: string;
      position: string;
      period: string;
      description: string;
      bullets: string[];
    }[];
    educationJson: { institution: string; degree: string; year: string }[];
  },
  parsedJob: {
    title: string;
    company: string;
    skills: string[];
    requirements: string[];
    responsibilities: string[];
  },
  matchAnalysis: {
    matchedSkills: string[];
    missingSkills: string[];
    notes: string;
  }
): Promise<ResumeContent> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert resume writer. Create an ATS-optimized resume tailored to a specific job.

Rules:
- Write a professional summary (2-3 sentences) that connects the candidate's experience to this specific role
- Select and reorder the most relevant experiences for this job
- Rewrite bullet points to naturally incorporate keywords from the job description
- Each bullet should start with a strong action verb and include measurable impact where possible
- Order skills by relevance to the job (matched skills first)
- Keep it concise — max 4 bullets per experience
- Do NOT fabricate experience or skills the candidate doesn't have

Return JSON with:
- summary: string (tailored professional summary)
- experiences: { company: string, position: string, period: string, bullets: string[] }[]
- skills: string[] (ordered by relevance to job)
- education: { institution: string, degree: string, year: string }[]`,
      },
      {
        role: "user",
        content: JSON.stringify({ profile, job: parsedJob, matchAnalysis }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as ResumeContent;
}
```

- [ ] **Step 2: Create `apps/launchpad/src/lib/ai/generate-cover-letter.ts`**

```typescript
import { openai } from "./openai";

export interface CoverLetterContent {
  date: string;
  addressee: string;
  greeting: string;
  paragraphs: string[];
  signoff: string;
}

export async function generateCoverLetter(
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experienceJson: {
      company: string;
      position: string;
      period: string;
      description: string;
      bullets: string[];
    }[];
  },
  parsedJob: {
    title: string;
    company: string;
    skills: string[];
    requirements: string[];
    responsibilities: string[];
  },
  companyDescription: string,
  matchAnalysis: {
    matchedSkills: string[];
    notes: string;
  }
): Promise<CoverLetterContent> {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert cover letter writer. Write a compelling, personalized cover letter.

Rules:
- 3-4 paragraphs: hook connecting to company mission, experience alignment with specific examples, enthusiasm and cultural fit, professional closing
- Reference specific company details (products, mission, culture) if provided
- Connect specific past experiences to job requirements with concrete examples
- Professional but personable tone — not generic or robotic
- Every sentence must add value — no filler
- Do NOT fabricate experiences

Return JSON with:
- date: string (use "${today}")
- addressee: string (e.g., "Hiring Manager" or company name + "Hiring Team")
- greeting: string (e.g., "Dear Hiring Manager,")
- paragraphs: string[] (3-4 paragraphs)
- signoff: string (e.g., "Sincerely,")`,
      },
      {
        role: "user",
        content: JSON.stringify({
          candidate: profile,
          job: parsedJob,
          companyDescription,
          matchAnalysis,
        }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as CoverLetterContent;
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add AI resume and cover letter generation with GPT-4o"
```

---

### Task 7: React-PDF Resume & Cover Letter Templates

**Files:**
- Create: `apps/launchpad/src/lib/pdf/resume-template.tsx`
- Create: `apps/launchpad/src/lib/pdf/cover-letter-template.tsx`
- Create: `apps/launchpad/src/lib/pdf/render-pdf.ts`
- Create: `apps/launchpad/src/lib/pdf/register-fonts.ts`

- [ ] **Step 1: Create `apps/launchpad/src/lib/pdf/register-fonts.ts`**

```typescript
import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerFonts() {
  if (registered) return;

  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
        fontWeight: 600,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2",
        fontWeight: 700,
      },
    ],
  });

  registered = true;
}
```

- [ ] **Step 2: Create `apps/launchpad/src/lib/pdf/resume-template.tsx`**

ATS-optimized single-column resume:

```tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeContent } from "@/lib/db/schema/resumes";
import { registerFonts } from "./register-fonts";

registerFonts();

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    color: "#1a1a1a",
    lineHeight: 1.4,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
    textAlign: "center",
  },
  contactRow: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 14,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  companyPosition: {
    fontSize: 10,
    fontWeight: 600,
  },
  period: {
    fontSize: 9,
    color: "#555",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
});

interface ResumeDocumentProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  content: ResumeContent;
}

export function ResumeDocument({
  name,
  email,
  phone,
  location,
  content,
}: ResumeDocumentProps) {
  const contactParts = [email, phone, location].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Contact */}
        <Text style={styles.contactRow}>{contactParts.join("  |  ")}</Text>

        {/* Professional Summary */}
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{content.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {content.experiences.map((exp, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View style={styles.experienceHeader}>
              <Text style={styles.companyPosition}>
                {exp.position} — {exp.company}
              </Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            {exp.bullets.map((bullet, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillsText}>{content.skills.join("  •  ")}</Text>

        {/* Education */}
        {content.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {content.education.map((edu, i) => (
              <View key={i} style={styles.educationRow}>
                <Text style={styles.companyPosition}>
                  {edu.degree} — {edu.institution}
                </Text>
                <Text style={styles.period}>{edu.year}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
```

- [ ] **Step 3: Create `apps/launchpad/src/lib/pdf/cover-letter-template.tsx`**

```tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CoverLetterContent } from "@/lib/ai/generate-cover-letter";
import { registerFonts } from "./register-fonts";

registerFonts();

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 11,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 60,
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  date: {
    fontSize: 10,
    color: "#555",
    marginBottom: 24,
  },
  addressee: {
    fontSize: 11,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  signoff: {
    fontSize: 11,
    marginTop: 20,
    marginBottom: 4,
  },
  name: {
    fontSize: 11,
    fontWeight: 600,
  },
  contact: {
    fontSize: 9,
    color: "#555",
    marginTop: 2,
  },
});

interface CoverLetterDocumentProps {
  name: string;
  email: string;
  phone: string;
  content: CoverLetterContent;
}

export function CoverLetterDocument({
  name,
  email,
  phone,
  content,
}: CoverLetterDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.date}>{content.date}</Text>
        <Text style={styles.addressee}>{content.addressee}</Text>
        <Text style={styles.greeting}>{content.greeting}</Text>

        {content.paragraphs.map((para, i) => (
          <Text key={i} style={styles.paragraph}>
            {para}
          </Text>
        ))}

        <Text style={styles.signoff}>{content.signoff}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.contact}>
          {[email, phone].filter(Boolean).join(" | ")}
        </Text>
      </Page>
    </Document>
  );
}
```

- [ ] **Step 4: Create `apps/launchpad/src/lib/pdf/render-pdf.ts`**

```typescript
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ResumeDocument } from "./resume-template";
import { CoverLetterDocument } from "./cover-letter-template";
import type { ResumeContent } from "@/lib/db/schema/resumes";
import type { CoverLetterContent } from "@/lib/ai/generate-cover-letter";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const GENERATED_DIR = path.join(process.cwd(), "generated");

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function renderResumePdf(
  profile: { name: string; email: string; phone: string; location: string },
  content: ResumeContent,
  jobId: number,
  companyName: string,
  version: number
): Promise<string> {
  const buffer = await renderToBuffer(
    React.createElement(ResumeDocument, { ...profile, content })
  );

  const dir = path.join(GENERATED_DIR, String(jobId));
  await ensureDir(dir);

  const sanitizedCompany = companyName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `Farid_Matovu_Resume_${sanitizedCompany}_v${version}.pdf`;
  const filePath = path.join(dir, filename);

  await writeFile(filePath, buffer);
  return filePath;
}

export async function renderCoverLetterPdf(
  profile: { name: string; email: string; phone: string },
  content: CoverLetterContent,
  jobId: number,
  companyName: string,
  version: number
): Promise<string> {
  const buffer = await renderToBuffer(
    React.createElement(CoverLetterDocument, { ...profile, content })
  );

  const dir = path.join(GENERATED_DIR, String(jobId));
  await ensureDir(dir);

  const sanitizedCompany = companyName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `Farid_Matovu_CoverLetter_${sanitizedCompany}_v${version}.pdf`;
  const filePath = path.join(dir, filename);

  await writeFile(filePath, buffer);
  return filePath;
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add React-PDF resume and cover letter templates with ATS-optimized layout"
```

---

### Task 8: Email Service

**Files:**
- Create: `apps/launchpad/src/lib/email/send-documents.ts`

- [ ] **Step 1: Create `apps/launchpad/src/lib/email/send-documents.ts`**

```typescript
import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDocumentsEmail(params: {
  jobTitle: string;
  companyName: string;
  matchScore: number;
  sourceUrl?: string;
  resumePath?: string;
  coverLetterPath?: string;
}) {
  const attachments: { filename: string; content: Buffer }[] = [];

  if (params.resumePath) {
    const content = await readFile(params.resumePath);
    attachments.push({
      filename: path.basename(params.resumePath),
      content: Buffer.from(content),
    });
  }

  if (params.coverLetterPath) {
    const content = await readFile(params.coverLetterPath);
    attachments.push({
      filename: path.basename(params.coverLetterPath),
      content: Buffer.from(content),
    });
  }

  const body = [
    `Job: ${params.jobTitle} at ${params.companyName}`,
    `Match Score: ${params.matchScore}%`,
    params.sourceUrl ? `Posting: ${params.sourceUrl}` : null,
    "",
    `Generated ${attachments.length} document(s) attached.`,
  ]
    .filter(Boolean)
    .join("\n");

  const { data, error } = await resend.emails.send({
    from: "Launchpad <onboarding@resend.dev>",
    to: process.env.EMAIL_ADDRESS!,
    subject: `[Launchpad] Resume & Cover Letter — ${params.jobTitle} at ${params.companyName}`,
    text: body,
    attachments,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Resend email service for sending generated documents"
```

---

### Task 9: Job Actions — Paste & Generate Flow

**Files:**
- Create: `apps/launchpad/src/actions/job-actions.ts`
- Create: `apps/launchpad/src/actions/document-actions.ts`

- [ ] **Step 1: Create `apps/launchpad/src/actions/job-actions.ts`**

```typescript
"use server";

import { db } from "@/lib/db";
import { jobs, companies, jobDescriptions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { parseJobDescription } from "@/lib/ai/parse-job";
import { calculateMatchScore } from "@/lib/ai/match-score";
import { getProfile } from "./profile-actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJobFromDescription(rawText: string, sourceUrl?: string) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up. Go to /profile first.");

  // 1. Parse job description with AI
  const parsed = await parseJobDescription(rawText);

  // 2. Create or find company
  let companyId: number;
  const existingCompany = await db
    .select()
    .from(companies)
    .where(eq(companies.name, parsed.company))
    .limit(1);

  if (existingCompany.length > 0) {
    companyId = existingCompany[0].id;
  } else {
    const [newCompany] = await db
      .insert(companies)
      .values({
        name: parsed.company,
        description: parsed.companyDescription,
      })
      .returning();
    companyId = newCompany.id;
  }

  // 3. Create job
  const [job] = await db
    .insert(jobs)
    .values({
      title: parsed.title,
      companyId,
      location: parsed.location,
      type: parsed.type,
      source: "manual_paste",
      sourceUrl: sourceUrl || null,
    })
    .returning();

  // 4. Calculate match score
  const matchAnalysis = await calculateMatchScore(
    profile.skills as string[],
    (profile.experienceJson as { company: string; position: string; description: string; bullets: string[] }[]),
    parsed.skills,
    parsed.requirements
  );

  // 5. Store job description with parsed data
  await db.insert(jobDescriptions).values({
    jobId: job.id,
    rawText,
    parsedSkills: parsed.skills,
    parsedRequirements: parsed.requirements,
    matchScore: matchAnalysis.score,
  });

  revalidatePath("/");
  redirect(`/jobs/${job.id}`);
}

export async function updateJobStatus(jobId: number, status: "saved" | "applied" | "interviewing" | "rejected" | "offered") {
  await db
    .update(jobs)
    .set({ status, updatedAt: new Date() })
    .where(eq(jobs.id, jobId));

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/");
}

export async function getJobWithDetails(jobId: number) {
  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, jobId));

  if (!job) return null;

  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  const [description] = await db
    .select()
    .from(jobDescriptions)
    .where(eq(jobDescriptions.jobId, jobId));

  return { job, company, description };
}
```

- [ ] **Step 2: Create `apps/launchpad/src/actions/document-actions.ts`**

```typescript
"use server";

import { db } from "@/lib/db";
import { resumes, coverLetters, jobDescriptions, companies, jobs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getProfile } from "./profile-actions";
import { generateResume } from "@/lib/ai/generate-resume";
import { generateCoverLetter } from "@/lib/ai/generate-cover-letter";
import { renderResumePdf, renderCoverLetterPdf } from "@/lib/pdf/render-pdf";
import { sendDocumentsEmail } from "@/lib/email/send-documents";
import { revalidatePath } from "next/cache";
import type { ResumeContent } from "@/lib/db/schema/resumes";

export async function generateAndSaveResume(jobId: number) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up");

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [description] = await db.select().from(jobDescriptions).where(eq(jobDescriptions.jobId, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  if (!description) throw new Error("No job description found");

  // Get current version count
  const existingResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version));

  const nextVersion = existingResumes.length > 0 ? existingResumes[0].version + 1 : 1;

  // Generate resume content with AI
  const content = await generateResume(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      summary: profile.summary ?? "",
      skills: profile.skills as string[],
      experienceJson: profile.experienceJson as {
        company: string;
        position: string;
        period: string;
        description: string;
        bullets: string[];
      }[],
      educationJson: profile.educationJson as {
        institution: string;
        degree: string;
        year: string;
      }[],
    },
    {
      title: job.title,
      company: company?.name ?? "Unknown",
      skills: description.parsedSkills as string[],
      requirements: description.parsedRequirements as string[],
      responsibilities: [],
    },
    {
      matchedSkills: [],
      missingSkills: [],
      notes: "",
    }
  );

  // Render PDF
  const pdfPath = await renderResumePdf(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
    },
    content,
    jobId,
    company?.name ?? "Unknown",
    nextVersion
  );

  // Save to DB
  const [saved] = await db
    .insert(resumes)
    .values({
      jobId,
      contentJson: content,
      pdfPath,
      version: nextVersion,
    })
    .returning();

  revalidatePath(`/jobs/${jobId}`);
  return saved;
}

export async function generateAndSaveCoverLetter(jobId: number) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up");

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [description] = await db.select().from(jobDescriptions).where(eq(jobDescriptions.jobId, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  if (!description) throw new Error("No job description found");

  const existingLetters = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  const nextVersion = existingLetters.length > 0 ? existingLetters[0].version + 1 : 1;

  const content = await generateCoverLetter(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      summary: profile.summary ?? "",
      experienceJson: profile.experienceJson as {
        company: string;
        position: string;
        period: string;
        description: string;
        bullets: string[];
      }[],
    },
    {
      title: job.title,
      company: company?.name ?? "Unknown",
      skills: description.parsedSkills as string[],
      requirements: description.parsedRequirements as string[],
      responsibilities: [],
    },
    company?.description ?? "",
    {
      matchedSkills: [],
      notes: "",
    }
  );

  const pdfPath = await renderCoverLetterPdf(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
    },
    content,
    jobId,
    company?.name ?? "Unknown",
    nextVersion
  );

  const [saved] = await db
    .insert(coverLetters)
    .values({
      jobId,
      contentText: content.paragraphs.join("\n\n"),
      pdfPath,
      version: nextVersion,
    })
    .returning();

  revalidatePath(`/jobs/${jobId}`);
  return saved;
}

export async function emailDocuments(jobId: number) {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];
  const [description] = await db
    .select()
    .from(jobDescriptions)
    .where(eq(jobDescriptions.jobId, jobId));

  const [latestResume] = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version))
    .limit(1);

  const [latestLetter] = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version))
    .limit(1);

  await sendDocumentsEmail({
    jobTitle: job.title,
    companyName: company?.name ?? "Unknown",
    matchScore: description?.matchScore ?? 0,
    sourceUrl: job.sourceUrl ?? undefined,
    resumePath: latestResume?.pdfPath ?? undefined,
    coverLetterPath: latestLetter?.pdfPath ?? undefined,
  });

  return { success: true };
}

export async function getJobDocuments(jobId: number) {
  const resumeList = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version));

  const letterList = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  return { resumes: resumeList, coverLetters: letterList };
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add server actions for job creation, document generation, and email"
```

---

### Task 10: Job Pages — New Job, Job Detail, PDF Preview

**Files:**
- Create: `apps/launchpad/src/app/jobs/new/page.tsx`
- Create: `apps/launchpad/src/app/jobs/[id]/page.tsx`
- Create: `apps/launchpad/src/app/jobs/[id]/resume/page.tsx`
- Create: `apps/launchpad/src/app/jobs/[id]/cover-letter/page.tsx`
- Create: `apps/launchpad/src/app/api/pdf/[...path]/route.ts`

- [ ] **Step 1: Install additional shadcn/ui components**

```bash
cd apps/launchpad
pnpm dlx shadcn@latest add select
```

- [ ] **Step 2: Create `apps/launchpad/src/app/jobs/new/page.tsx`**

```typescript
import { createJobFromDescription } from "@/actions/job-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function NewJobPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const rawText = formData.get("rawText") as string;
    const sourceUrl = formData.get("sourceUrl") as string;
    await createJobFromDescription(rawText, sourceUrl || undefined);
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">New Job</h1>
          <p className="text-muted-foreground">Paste a job description — AI will parse and analyze it</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sourceUrl">Job Posting URL (optional)</Label>
              <Input
                id="sourceUrl"
                name="sourceUrl"
                placeholder="https://linkedin.com/jobs/..."
              />
            </div>
            <div>
              <Label htmlFor="rawText">Job Description Text</Label>
              <Textarea
                id="rawText"
                name="rawText"
                rows={20}
                placeholder="Paste the full job description here..."
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Parse & Analyze
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
```

- [ ] **Step 3: Create `apps/launchpad/src/app/jobs/[id]/page.tsx`**

```typescript
import { getJobWithDetails } from "@/actions/job-actions";
import { getJobDocuments, generateAndSaveResume, generateAndSaveCoverLetter, emailDocuments } from "@/actions/document-actions";
import { updateJobStatus } from "@/actions/job-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobId = parseInt(id, 10);
  const data = await getJobWithDetails(jobId);

  if (!data) notFound();

  const { job, company, description } = data;
  const docs = await getJobDocuments(jobId);

  const statusColors: Record<string, string> = {
    saved: "bg-muted text-muted-foreground",
    applied: "bg-blue-500/20 text-blue-400",
    interviewing: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400",
    offered: "bg-green-500/20 text-green-400",
  };

  async function handleGenerateResume() {
    "use server";
    await generateAndSaveResume(jobId);
  }

  async function handleGenerateCoverLetter() {
    "use server";
    await generateAndSaveCoverLetter(jobId);
  }

  async function handleEmail() {
    "use server";
    await emailDocuments(jobId);
    revalidatePath(`/jobs/${jobId}`);
  }

  async function handleStatusChange(formData: FormData) {
    "use server";
    const status = formData.get("status") as "saved" | "applied" | "interviewing" | "rejected" | "offered";
    await updateJobStatus(jobId, status);
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground text-lg">{company?.name ?? "Unknown Company"}</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      {/* Status & Meta */}
      <div className="flex gap-4 mb-6 items-center">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
        {description?.matchScore != null && (
          <Badge variant={description.matchScore >= 70 ? "default" : "secondary"}>
            {description.matchScore}% match
          </Badge>
        )}
        {job.location && <span className="text-sm text-muted-foreground">{job.location}</span>}
        {job.type && <span className="text-sm text-muted-foreground capitalize">{job.type}</span>}

        <form action={handleStatusChange} className="ml-auto flex gap-2">
          <select name="status" defaultValue={job.status} className="bg-muted border border-border rounded px-2 py-1 text-sm">
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="offered">Offered</option>
          </select>
          <Button type="submit" size="sm" variant="outline">Update</Button>
        </form>
      </div>

      {/* Skills */}
      {description && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(description.parsedSkills as string[]).map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Documents</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <form action={handleGenerateResume}>
            <Button type="submit">Generate Resume</Button>
          </form>
          <form action={handleGenerateCoverLetter}>
            <Button type="submit" variant="secondary">Generate Cover Letter</Button>
          </form>
          {(docs.resumes.length > 0 || docs.coverLetters.length > 0) && (
            <form action={handleEmail}>
              <Button type="submit" variant="outline">Email Documents</Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Generated Documents */}
      {docs.resumes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {docs.resumes.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">Version {r.version} — {r.createdAt.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${jobId}/resume?version=${r.version}`}>
                      <Button size="sm" variant="outline">Preview</Button>
                    </Link>
                    {r.pdfPath && (
                      <a href={`/api/pdf/${jobId}/${encodeURIComponent(r.pdfPath.split("/").pop()!)}`}>
                        <Button size="sm" variant="outline">Download</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {docs.coverLetters.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cover Letters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {docs.coverLetters.map((cl) => (
                <div key={cl.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">Version {cl.version} — {cl.createdAt.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${jobId}/cover-letter?version=${cl.version}`}>
                      <Button size="sm" variant="outline">Preview</Button>
                    </Link>
                    {cl.pdfPath && (
                      <a href={`/api/pdf/${jobId}/${encodeURIComponent(cl.pdfPath.split("/").pop()!)}`}>
                        <Button size="sm" variant="outline">Download</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Raw Job Description */}
      {description && (
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
              {description.rawText}
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Create `apps/launchpad/src/app/api/pdf/[...path]/route.ts`**

API route to serve generated PDFs for download:

```typescript
import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const GENERATED_DIR = path.join(process.cwd(), "generated");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const filePath = path.join(GENERATED_DIR, ...pathSegments);

  // Prevent directory traversal
  if (!filePath.startsWith(GENERATED_DIR)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const buffer = await readFile(filePath);
    const filename = path.basename(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
```

- [ ] **Step 5: Create `apps/launchpad/src/app/jobs/[id]/resume/page.tsx`**

Preview page that shows resume content from the database:

```typescript
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ResumeContent } from "@/lib/db/schema/resumes";

export default async function ResumePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { id } = await params;
  const { version } = await searchParams;
  const jobId = parseInt(id, 10);

  let query = db.select().from(resumes).where(eq(resumes.jobId, jobId));

  const allResumes = await query.orderBy(desc(resumes.version));
  const resume = version
    ? allResumes.find((r) => r.version === parseInt(version, 10))
    : allResumes[0];

  if (!resume) notFound();

  const content = resume.contentJson as ResumeContent;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Resume Preview (v{resume.version})</h1>
        <div className="flex gap-2">
          {resume.pdfPath && (
            <a href={`/api/pdf/${jobId}/${encodeURIComponent(resume.pdfPath.split("/").pop()!)}`}>
              <Button variant="outline">Download PDF</Button>
            </a>
          )}
          <Link href={`/jobs/${jobId}`}>
            <Button variant="outline">Back to Job</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className="text-muted-foreground">{content.summary}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            {content.experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{exp.position} — {exp.company}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <p className="text-sm text-muted-foreground">{content.skills.join(" • ")}</p>
          </div>

          {content.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {content.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
```

- [ ] **Step 6: Create `apps/launchpad/src/app/jobs/[id]/cover-letter/page.tsx`**

```typescript
import { db } from "@/lib/db";
import { coverLetters } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CoverLetterPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { id } = await params;
  const { version } = await searchParams;
  const jobId = parseInt(id, 10);

  const allLetters = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  const letter = version
    ? allLetters.find((l) => l.version === parseInt(version, 10))
    : allLetters[0];

  if (!letter) notFound();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Cover Letter Preview (v{letter.version})</h1>
        <div className="flex gap-2">
          {letter.pdfPath && (
            <a href={`/api/pdf/${jobId}/${encodeURIComponent(letter.pdfPath.split("/").pop()!)}`}>
              <Button variant="outline">Download PDF</Button>
            </a>
          )}
          <Link href={`/jobs/${jobId}`}>
            <Button variant="outline">Back to Job</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {letter.contentText}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
```

- [ ] **Step 7: Verify full flow works end-to-end**

```bash
pnpm dev:launchpad
```

1. Visit `localhost:3001` — should see empty dashboard
2. Click "Profile" — should see seeded profile
3. Click "+ New Job" — paste a job description, submit
4. Should redirect to job detail with parsed skills and match score
5. Click "Generate Resume" — should create PDF and show in documents list
6. Click "Generate Cover Letter" — should create PDF
7. Click "Preview" — should show resume/cover letter content
8. Click "Download" — should download PDF
9. Click "Email Documents" — should send email to matovu90@gmail.com

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add job pages — new job form, job detail, document preview, PDF download"
```

---

### Task 11: Final Polish & Verification

**Files:**
- Verify all pages render correctly
- Verify PDF generation produces ATS-parseable output
- Verify email delivery works

- [ ] **Step 1: Verify Turborepo runs both apps**

```bash
pnpm dev
```

Expected: Both `@portfolio/web` on `:3000` and `@portfolio/launchpad` on `:3001` start.

- [ ] **Step 2: Test ATS compatibility of generated resume PDF**

Open a generated resume PDF, select all text (Cmd+A), copy (Cmd+C), paste into a text editor. Expected: All text is selectable and copies in correct reading order.

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "chore: verify full launchpad flow — monorepo, AI pipeline, PDF generation, email"
```
