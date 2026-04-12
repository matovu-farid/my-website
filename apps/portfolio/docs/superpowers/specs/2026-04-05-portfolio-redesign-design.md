# Portfolio Redesign — Design Spec

**Date:** 2026-04-05
**Aesthetic:** Refined & Polished — warm neutrals, emerald accent, elegant typography, generous whitespace
**Structure:** Hub & Spoke — homepage hub with deep-dive case study pages

---

## Developer Profile (informs all copy)

Farid Matovu Nkoba — Full-stack polyglot engineer based in Uganda, working at Dabble Lab.

**Brand identity:**
- Systems thinker who decomposes problems into composable services
- Ships to production (2 Play Store apps, published npm package, Docker Swarm infra)
- Polyglot by necessity — TypeScript, Rust, Dart/Flutter, Ruby, Python
- Quantitative depth (algorithmic trading with Kelly criterion, Spearman validation)
- Effect.js practitioner (functional programming, tagged errors, Layer DI)
- AI-native builder (OpenAI TTS, AI-powered scraping)

**Stats for hero:** 15+ Projects, 6 Languages, 5+ Years, 2 Play Store Apps

---

## Color Palette

### Light Mode
- Background: stone-50 `#fafaf9`
- Surface/Card: white `#ffffff` with `border: stone-200 #e7e5e4`
- Text primary: stone-900 `#1c1917`
- Text secondary: stone-500 `#78716c`
- Text muted: stone-400 `#a8a29e`
- Accent: emerald-600 `#059669`
- Accent hover: emerald-700 `#047857`

### Dark Mode
- Background: stone-950 `#0c0a09`
- Surface/Card: stone-900 `#1c1917` with `border: stone-800 #292524`
- Text primary: stone-50 `#fafaf9`
- Text secondary: stone-400 `#a8a29e`
- Text muted: stone-500 `#78716c`
- Accent: emerald-500 `#10b981`
- Accent hover: emerald-400 `#34d399`

---

## Typography

- **Font:** Inter (already installed)
- **Headings:** font-weight 700, letter-spacing -1px to -2px, stone-900/stone-50
- **Labels:** uppercase, letter-spacing 2-3px, font-size 11px, stone-400/stone-500
- **Body:** 14-16px, line-height 1.6-1.8, stone-500/stone-400
- **Tech tags:** 11-12px, pill-shaped, stone-100 bg in light / stone-800 bg in dark

---

## Site Structure

### Navigation (Header)
- Fixed top, backdrop blur, semi-transparent background
- Links: Home, Projects, Experience, Contact
- Active link: emerald accent underline or color
- Restyle existing header component with new palette

### Pages

1. **`/` — Homepage**
2. **`/projects` — Projects Grid** (existing, restyled)
3. **`/projects/[id]` — Case Study Page** (new)
4. **`/experience` — Experience Timeline** (existing, restyled)
5. **`/contact` — Contact Form** (existing, restyled)

---

## Homepage (`/`)

### Section 1: Centered Hero
- Small circular photo placeholder (80px, stone gradient, "FM" initials until real photo added)
- Label row: "Full-Stack · Polyglot · Systems Thinker" — uppercase, letter-spaced, muted
- Bold statement: "I build complete systems that ship." — 36px, weight 700, tight tracking
- One-liner: "From algorithmic trading bots to cross-platform book readers — picking the right tool for every job." — 13-14px, secondary color
- Stat counters (animated count-up on viewport entry):
  - 15+ Projects
  - 6 Languages
  - 5+ Years
  - 2 Play Store Apps
- Two CTAs: "View Projects" (primary, filled emerald) and "Get in Touch" (secondary, outlined)

### Section 2: Capability Cards
- Section heading: "What I Build"
- 4 cards in a 2x2 grid (stacks to 1 column on mobile):

**Card 1 — Cross-Platform**
- Description: "Tauri, Flutter, Electron — desktop, mobile, and web from shared codebases"
- Tags: Tauri, Flutter, Electron, Rust

**Card 2 — Backend & APIs**
- Description: "Full-stack services with type-safe APIs, serverless, and real-time data"
- Tags: Next.js, Rails, tRPC, AWS Lambda

**Card 3 — AI & Automation**
- Description: "AI-powered scraping, TTS narration, algorithmic trading strategies"
- Tags: OpenAI, Effect.js, Binance API

**Card 4 — DevOps & Infra**
- Description: "Docker Swarm, reverse proxies, CI/CD, database orchestration"
- Tags: Docker, Nginx, PostgreSQL, Prisma

Each card: white/stone-900 surface, subtle border, Lucide icon (Smartphone for Cross-Platform, Server for Backend, Sparkles for AI, Cloud for DevOps), title, description, tech tag pills. Hover: lift with shadow depth change.

### Section 3: Featured Projects
- Section heading: "Selected Work"
- Top 4 featured projects by rank: Rishi, Maria, AI Scraping Ecosystem, CaseMedInsurance
- Each card shows: title, category badge, one-liner description, tech tags, gradient/image
- Click → shared layout animation → case study page (`/projects/[id]`)
- "View All Projects →" link to `/projects`

### Section 4: Experience Preview
- Section heading: "Experience"
- Compact display of work history (company, role, period — no full descriptions)
- "View Full Experience →" link to `/experience`

### Section 5: CTA
- "Interested in working together?"
- "Get in Touch" button → `/contact`
- Clean, centered, generous padding

---

## Projects Page (`/projects`)

Existing functionality preserved, restyled:
- Search input restyled with new palette
- Category filter pills restyled (selected = emerald accent)
- Project cards restyled to match refined aesthetic
- Pagination restyled
- Featured projects section at top
- Cards are clickable → case study page for featured projects, or external links for non-featured

---

## Case Study Pages (`/projects/[id]`)

Dynamic route. One page per project (at minimum for the 6 featured projects).

### Layout:
1. **Header area:**
   - Back link: "← Back to Projects"
   - Category badge + year
   - Project title (28-32px, bold)
   - One-liner description (secondary text)

2. **Hero image/screenshot area:**
   - If `imageUrl` exists: display screenshot with rounded corners, subtle shadow
   - If no image: gradient placeholder with project initials

3. **Narrative section:**
   - Left border accent (emerald, 2px)
   - First-person narrative explaining WHY the project was built
   - Written from the developer's perspective, showing motivation and thinking

4. **Tech stack:**
   - Pill tags for all technologies used

5. **Key Decisions section:**
   - Heading: "Key Decisions"
   - Bullet list of 3-5 notable engineering decisions with brief explanations
   - Each reveals technical judgment (e.g., "Chose Tauri over Electron for 10x smaller binaries")

6. **Links:**
   - GitHub button (if `githubUrl` exists)
   - Live Demo button (if `liveUrl` exists)

7. **Navigation:**
   - Previous/Next project links at bottom

### Data Extension

The `Project` type needs new fields:
```typescript
interface Project {
  // ...existing fields...
  narrative?: string;       // First-person "why I built this" story
  keyDecisions?: string[];  // Engineering decision bullets
  year?: string;            // Year built/started
}
```

Narrative and key decisions content for each featured project (derived from GitHub research):

**Rishi:**
- Narrative: Wanted a book reader that worked everywhere with offline TTS. Built as a monorepo with Tauri for native performance and Rust workers for background audio generation.
- Key Decisions: Tauri over Electron for smaller binaries + Rust backend; monorepo to share core logic across platforms; background TTS queue prevents UI blocking; dual-page PDF viewing for desktop.

**Maria:**
- Narrative: Manual crypto trading is emotional and inconsistent. Built an algorithmic trading system with statistical validation to remove human bias from trading decisions.
- Key Decisions: Effect.js for type-safe functional composition with tagged errors; Kelly criterion for mathematically optimal position sizing; Spearman noise validation to ensure strategies aren't curve-fitted; Docker Swarm for 24/7 production reliability with health monitoring.

**AI Scraping Ecosystem:**
- Narrative: Needed an AI-powered scraping tool and realized it should be three composable pieces — a dashboard for managing operations, an npm library others could use, and a serverless backend for processing.
- Key Decisions: Decomposed into 3 independent services (dashboard, npm package, Lambda backend); async callback architecture instead of polling for long-running scrapes; published scrap-ai to npm with Zod schema validation; webhook verification with timing-safe signature comparison.

**CaseMedInsurance:**
- Narrative: Built for a real insurance company to let clients communicate with personnel and request quotations directly from their phones.
- Key Decisions: Flutter for cross-platform from a single codebase; Firebase Cloud Functions for serverless email automation; published to Google Play Store; companion admin dashboard for hospital data management.

**Painter:**
- Narrative: A creative drawing app — wanted to explore Flutter's canvas APIs and ship something fun to the Play Store.
- Key Decisions: Custom canvas rendering instead of third-party drawing libraries; direct touch input mapping for natural drawing feel; screenshot-based export for simplicity.

**Apartment Manager:**
- Narrative: Property management tool for tracking tenants, payments, and maintenance. Built to learn modern Rails patterns with Vite and Tailwind.
- Key Decisions: Modern Rails stack with Vite over Webpacker; RSpec + Rubocop for testing and code quality; full CRUD with authentication and authorization.

---

## Experience Page (`/experience`)

Existing content, restyled:
- Clean timeline layout with new color palette
- Cards with company, role, period, description
- Warm neutral card backgrounds, emerald accent on timeline connector
- Stagger animations on scroll

---

## Contact Page (`/contact`)

Existing functionality preserved, restyled:
- Input fields with stone borders, emerald focus ring
- Submit button in emerald accent
- Success/error toasts restyled
- Server action unchanged (Resend email)

---

## Animations (Expressive & Crafted)

### Page Transitions
- Content slides in from the direction of navigation (left→right when going deeper, right→left when going back)
- 300-400ms duration with ease-out curve

### Shared Layout Animation
- When clicking a project card on the homepage → case study page, the card morphs/expands into the full page
- Uses Motion's `layoutId` for seamless transition
- Card image, title, and category badge all participate in the shared animation
- Note: `layoutId` works across routes when `AnimatePresence` wraps the router outlet in `layout.tsx`. Both the homepage project cards and the case study page must use matching `layoutId` values (e.g., `project-image-${id}`, `project-title-${id}`)

### Element Animations
- **Page enter:** opacity 0→1, y: 12→0, 300ms ease-out
- **Stagger:** 80ms between sibling elements
- **Spring physics:** for interactive elements (cards, buttons)
- **Scroll reveals:** elements fade + slide up as they enter viewport (IntersectionObserver or Motion's whileInView)

### Hero Animations
- Stat counters: animated count-up (0 → target) over 1.5s with easing
- Parallax-lite: hero content moves at slightly different rate on scroll (subtle, 0.95x)
- Labels and tagline stagger in on load

### Micro-interactions
- Card hover: translateY(-4px) + shadow depth increase + 200ms transition
- Button hover: slight scale (1.02) + color shift
- Link hover: emerald underline slides in from left
- Nav link: scale on hover (existing, keep)

---

## Responsive Behavior

- **Desktop (≥1024px):** Full layouts as described, 2x2 capability grid, 3-column project grid
- **Tablet (768-1023px):** 2-column grids, hero stats in 2x2 grid
- **Mobile (<768px):** Single column throughout, stacked capability cards, full-width project cards. Navigation: keep horizontal links but reduce to icon-only or abbreviate on very small screens (no hamburger — 4 links fit inline)

---

## Files to Create/Modify

### New Files
- `src/app/projects/[id]/page.tsx` — Case study dynamic page
- `src/components/stat-counter.tsx` — Animated count-up component
- `src/components/capability-card.tsx` — Capability card for homepage
- `src/components/scroll-reveal.tsx` — Scroll-triggered animation wrapper
- `src/components/page-transition.tsx` — Page transition wrapper

### Modified Files
- `src/data/projects.ts` — Add narrative, keyDecisions, year fields + content
- `src/app/page.tsx` — Complete homepage redesign
- `src/app/globals.css` — New color system CSS variables
- `tailwind.config.ts` — Updated color tokens (stone + emerald)
- `src/components/header.tsx` — Restyle with new palette + active state
- `src/components/footer.tsx` — Restyle with new palette
- `src/components/project-card.tsx` — Restyle + add layoutId for shared animation + click-through to case study
- `src/components/experience-card.tsx` — Restyle with new palette
- `src/app/projects/page.tsx` — Restyle search, filters, pagination with new palette
- `src/app/experience/page.tsx` — Restyle with new palette
- `src/app/contact/page.tsx` — Restyle inputs, button with new palette
- `src/app/layout.tsx` — Add page transition wrapper

### No Changes
- `src/actions/send-email.ts` — server action unchanged
- `src/lib/utils.ts` — utility unchanged
- `src/components/project-search.tsx` — restyle only (palette)
- `src/components/category-filter.tsx` — restyle only (palette)
- `src/components/pagination.tsx` — restyle only (palette)
