# Launchpad + Portfolio Turborepo Monorepo Design

## Overview

Create a Turborepo monorepo containing the existing portfolio site and a new local-only admin tool called **Launchpad** (`@portfolio/launchpad`). Launchpad is an AI-powered career management tool that generates ATS-optimized resumes and cover letters tailored to specific job descriptions.

## Monorepo Structure

```
apps/
  portfolio/              ← existing portfolio site (moved in)
  launchpad/              ← new Next.js admin tool
turbo.json
pnpm-workspace.yaml
.env                      ← shared root .env
package.json              ← root workspace config
```

No shared packages. Portfolio is a static site with no DB. Launchpad owns all new functionality. Code can be extracted into shared packages later if a second consumer appears.

## Launchpad — Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, server actions) |
| Styling | Tailwind CSS + shadcn/ui (own dashboard theme) |
| ORM | Drizzle ORM |
| Database | PostgreSQL (local: `postgres://faridmatovu:alphanew90@localhost:5432/launchpad`) |
| AI | OpenAI GPT-4o |
| PDF | React-PDF (@react-pdf/renderer) |
| Email | Resend (matovu90@gmail.com) |
| Auth | None — local-only tool |

### Ports

- Portfolio: `localhost:3000`
- Launchpad: `localhost:3001`

### Environment Variables (root .env)

```
# Shared
RESEND_API_KEY=<from money-lending .env>
EMAIL_ADDRESS=matovu90@gmail.com

# Launchpad
DATABASE_URL=postgres://faridmatovu:alphanew90@localhost:5432/launchpad
OPENAI_API_KEY=<user provides>

# Portfolio (existing)
ZEROSTEP_TOKEN=<existing>
```

## Database Schema

### `profile` — Master profile (single row)

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| name | text | Full name |
| email | text | Contact email |
| phone | text | Phone number |
| location | text | City/country |
| summary | text | Professional summary |
| skills | jsonb | Array of skill strings |
| experience_json | jsonb | Array of experience objects (company, position, period, description, bullets) |
| education_json | jsonb | Array of education objects (institution, degree, year) |
| updated_at | timestamp | |

Seeded on first run from existing portfolio experience data.

### `companies` — Company research data

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| name | text | Company name |
| description | text | AI-researched company description |
| website | text | Company URL |
| industry | text | Industry sector |
| size | text | Company size (startup/mid/enterprise) |
| notes | text | Free-form notes |
| created_at | timestamp | |

### `jobs` — Job tracking

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| title | text | Job title |
| company_id | integer FK → companies | |
| location | text | Job location |
| type | enum | remote / hybrid / onsite |
| source | enum | manual_paste / linkedin / indeed / other |
| source_url | text | Original job posting URL |
| status | enum | saved / applied / interviewing / rejected / offered |
| created_at | timestamp | |
| updated_at | timestamp | |

### `job_descriptions` — Parsed job description data

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| job_id | integer FK → jobs | |
| raw_text | text | Original pasted/scraped job description |
| parsed_skills | jsonb | AI-extracted required skills |
| parsed_requirements | jsonb | AI-extracted requirements |
| match_score | integer | AI-calculated fit percentage (0-100) |
| created_at | timestamp | |

### `resumes` — Generated resumes

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| job_id | integer FK → jobs | |
| content_json | jsonb | Structured resume data for React-PDF rendering |
| pdf_path | text | File path to generated PDF |
| version | integer | Version number per job |
| created_at | timestamp | |

### `cover_letters` — Generated cover letters

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| job_id | integer FK → jobs | |
| content_text | text | Cover letter body text |
| pdf_path | text | File path to generated PDF |
| version | integer | Version number per job |
| created_at | timestamp | |

## Phase 1 Features

### 1. Profile Management

Edit master profile data (experience, skills, education, summary). This is the source material AI draws from when generating tailored documents. Single-page form with JSON editors for structured data (experience, education) and text fields for the rest.

### 2. Job Tracking Dashboard

- List all jobs with columns: title, company, status, match score, date added
- Filter by status
- Status badge colors (saved=gray, applied=blue, interviewing=yellow, rejected=red, offered=green)
- Click a job to view full details, generated documents, and actions

### 3. Paste & Generate Flow

1. User pastes a job description (raw text or URL)
2. AI parses the description → extracts:
   - Job title, company name, location, type
   - Required skills, qualifications, responsibilities
   - Company info (if URL provided, research the company)
3. AI calculates match score against user's profile
4. Creates job + company + job_description records
5. User clicks "Generate Resume" or "Generate Cover Letter" (or both)
6. AI tailors documents to the specific job
7. Preview in-browser, download as PDF, or email to self

### 4. Resume Generation (React-PDF)

**ATS optimization rules:**
- Single-column layout (no tables, no columns, no graphics)
- Standard section headings: "Professional Summary", "Experience", "Skills", "Education"
- H1 for name, H2 for section headings — proper heading hierarchy
- Plain text throughout — no icons, no images
- Contact info as plain text (not in header/footer — some ATS skip those)
- Job-relevant keywords naturally woven into bullet points
- Clean font: Inter or similar sans-serif
- Consistent date formatting (MMM YYYY)
- File named: `Farid_Matovu_Resume_CompanyName.pdf`

**AI tailoring:**
- Selects most relevant experiences from profile
- Rewrites bullet points to emphasize skills matching the job description
- Adjusts professional summary to align with role requirements
- Orders skills by relevance to the position

### 5. Cover Letter Generation (React-PDF)

**Format:**
- Professional business letter layout
- Date, company address block, greeting
- 3-4 paragraphs: hook, experience alignment, enthusiasm/culture fit, closing
- Professional sign-off with name and contact

**AI approach:**
- Connects specific experiences to job requirements
- References company research (mission, products, culture)
- Maintains professional but personable tone
- Avoids generic filler — every sentence adds value

### 6. Email via Resend

- Send generated PDFs as attachments to matovu90@gmail.com
- Subject: `[Launchpad] Resume & Cover Letter — {Job Title} at {Company}`
- Body: brief summary with match score and link to job posting
- Triggered from job detail page with one click

## Phase 2 (Future): Job Board Search

Integration with LinkedIn, Indeed, and developer-focused job boards (GitHub Jobs, Remotive, etc.) to search for jobs matching the user's profile. Results would feed into the same paste & generate pipeline.

## AI Pipeline Detail (OpenAI GPT-4o)

Four server actions, each calling GPT-4o with structured output:

1. **parseJobDescription(rawText)** → `{ title, company, location, type, skills[], requirements[], responsibilities[] }`
2. **calculateMatchScore(profile, parsedJob)** → `{ score: number, matchedSkills[], missingSkills[], notes: string }`
3. **generateResume(profile, parsedJob, matchAnalysis)** → `{ summary, experiences[], skills[], education[] }` (structured JSON for React-PDF)
4. **generateCoverLetter(profile, parsedJob, companyInfo, matchAnalysis)** → `{ date, addressee, greeting, paragraphs[], signoff }`

All use JSON mode / structured outputs for reliable parsing.

## Local Setup Prerequisites

- PostgreSQL running locally on port 5432
- Create the database: `createdb launchpad` (uses existing local postgres user `faridmatovu`)
- `OPENAI_API_KEY` must be set in root `.env`

## PDF Storage

Generated PDFs stored at `apps/launchpad/generated/{job_id}/`:
- `Farid_Matovu_Resume_CompanyName_v1.pdf`
- `Farid_Matovu_CoverLetter_CompanyName_v1.pdf`

Path stored in DB. Directory gitignored.

## Launchpad Page Structure

```
apps/launchpad/src/app/
  page.tsx                    ← dashboard (job list + stats)
  profile/page.tsx            ← edit master profile
  jobs/
    new/page.tsx              ← paste job description
    [id]/page.tsx             ← job detail + generated docs
    [id]/resume/page.tsx      ← resume preview
    [id]/cover-letter/page.tsx ← cover letter preview
```
