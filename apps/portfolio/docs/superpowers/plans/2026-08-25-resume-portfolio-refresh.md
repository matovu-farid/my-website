# Resume and Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax (- [ ]) for tracking.

**Goal:** Update the application resume, personal portfolio, and Fidexa project showcase for senior full-stack/product-engineering roles, centered on Rishi, Money Lending, and Inventory as shipped 2026 products.

**Architecture:** Keep the current visual systems. Use resume.md as the concise source, resume-full.md as the expanded dossier, and synchronize project metadata separately in the two websites. Add optional link and screenshot support only where existing components need it.

**Tech Stack:** Markdown, Pandoc, HTML/CSS, Next.js 15, React 19, TypeScript, Tailwind CSS, Motion, Bun, pnpm, Playwright, Chromium, in-app browser screenshots.

---

### Task 1: Capture safe production evidence

**Files:**
- Create: apps/portfolio/public/screenshots/inventory/production-overview.png only if safe.
- Create: apps/portfolio/public/screenshots/money-lending/production-overview.png only if safe.
- Create: apps/portfolio/public/screenshots/rishi/app-store-listing.png only if useful.

- [ ] **Step 1: Inspect the authenticated inventory screen**

Use the signed-in in-app browser at https://inventory.fidexa.org/home. Read the visible DOM first. Capture only a viewport that contains product UI without names, phone numbers, email addresses, borrower records, account balances, or customer transactions.

- [ ] **Step 2: Inspect the authenticated lending screen**

Use https://money-lending.fidexa.org/home and apply the same privacy gate. Prefer an app shell, navigation, empty state, or settings view over real customer data. If no safe view exists, omit the screenshot and keep the production URL.

- [ ] **Step 3: Capture the App Store proof point**

Use https://apps.apple.com/us/app/rishi-reader/id6763041630 and capture a viewport showing the Rishi Reader title and platform metadata. Omit it if the page is unavailable.

- [ ] **Step 4: Save and review approved assets**

Save approved images under apps/portfolio/public/screenshots/. Check that each is legible, cropped to the product surface, and free of private data before adding it to project metadata.

- [ ] **Step 5: Commit safe assets**

~~~bash
git add apps/portfolio/public/screenshots
git commit -m "feat: add safe production portfolio evidence"
~~~

Expected result: only privacy-safe screenshots are added; unsafe screenshots are omitted.

### Task 2: Refresh the resume sources

**Files:**
- Modify: resume.md
- Modify: resume-full.md

- [ ] **Step 1: Replace the short-form summary**

Use this exact summary in resume.md:

> Senior full-stack/product engineer with 5+ years building and shipping web, mobile, desktop, and AI products. I work mainly in React, Next.js, TypeScript, Node.js, and serverless systems, with production experience in AWS, Cloudflare Workers, Vercel, Postgres, and native Apple development. In 2026 I shipped Rishi Reader to the App Store and deployed production accounting platforms for lending and inventory businesses. I run Fidexa, where I take products from domain modeling to deployment and support.

- [ ] **Step 2: Update skills and Fidexa experience**

Keep the current categories, add Swift, SwiftUI, and Mac Catalyst to the native/cross-platform skills, and keep Python described as scripting. In the Fidexa entry add these bullets:

> - Shipped Rishi Reader to the App Store as a native Apple product spanning iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences, with Android expansion planned.
> - Deployed two production client platforms: a ledger-backed money-lending system and a multi-module inventory and trade system used by real businesses.

- [ ] **Step 3: Replace the short-form selected-project order and copy**

Use this order: Rishi Reader, Money Lending Management System, Inventory and Trade Management System, AI Scraping Ecosystem, and Apartment Manager if the two-page layout still fits.

Rishi copy must say it is a production Apple ecosystem reading platform, not an Android app. Mention App Store delivery, EPUB/PDF reading, read-aloud, AI book chat grounded in the current book, highlights, sync, and sharing. Link to the App Store, https://rishi.fidexa.org, and the repository.

Money Lending copy must say it is a production platform built around an accounting ledger. Mention daily reducing-balance interest, payment allocation, investor capital, risk watchlists, review-then-confirm approvals, roles, P&L, and Balance Sheet exports. Link to https://money-lending.fidexa.org/home and the repository.

Inventory copy must say Supply, Store, and Shop share a double-entry ledger covering procurement through retail. Mention RMB/USD/UGX costing, POS, stock control, loss detection, and audit trails. Link to https://inventory.fidexa.org/home and the repository.

- [ ] **Step 4: Expand the long dossier**

Mirror the same three lead projects in resume-full.md with a product problem paragraph and an architecture/production decisions paragraph. Remove the older Tauri-first Rishi description and every claim that Android support already exists. Keep older shipped work after the 2026 projects.

- [ ] **Step 5: Run copy checks and commit**

~~~bash
rg -n -i "Rishi|Android|App Store|inventory\.fidexa\.org/home|money-lending\.fidexa\.org/home" resume.md resume-full.md
rg -n "[—–]" resume.md resume-full.md
git add resume.md resume-full.md
git commit -m "feat: refresh resume for shipped product work"
~~~

Expected result: Rishi is Apple-only today with Android planned, all supplied production URLs are present, and the dash scan returns no matches.

### Task 3: Update the personal portfolio

**Files:**
- Modify: apps/portfolio/src/data/projects.ts
- Modify: apps/portfolio/src/components/project-card.tsx
- Modify: apps/portfolio/src/app/projects/[id]/case-study-content.tsx
- Modify: apps/portfolio/src/app/page.tsx
- Modify: apps/portfolio/src/app/experience/page.tsx only if stale copy remains.

- [ ] **Step 1: Extend link metadata**

Add optional appStoreUrl?: string and productUrl?: string fields to Project. Keep existing IDs, ranking, pagination, githubUrl, and liveUrl behavior unchanged.

- [ ] **Step 2: Replace the Rishi record**

Set year 2026, replace the Tauri-first description and technologies with the current Apple/shared stack, and add:

~~~ts
appStoreUrl: "https://apps.apple.com/us/app/rishi-reader/id6763041630",
productUrl: "https://rishi.fidexa.org",
githubUrl: "https://github.com/matovu-farid/rishi-monorepo",
~~~

Use any approved Rishi screenshot from Task 1; otherwise keep the existing image until a current safe asset exists.

- [ ] **Step 3: Add production URLs and screenshots**

Set liveUrl on the Money Lending record to https://money-lending.fidexa.org/home and on the Inventory record to https://inventory.fidexa.org/home. Add only matching approved screenshots.

- [ ] **Step 4: Render optional links accessibly**

Add visible App Store, Product Site, and Production App anchors to the project card and case-study link group. Use target="_blank" and rel="noopener noreferrer"; render nothing for absent optional fields.

- [ ] **Step 5: Refresh homepage positioning**

Update the hero and capability copy so the current story is native Apple delivery plus production full-stack systems, not only Tauri, Flutter, and Electron. Replace any stale counter only with a fact supported by the project data.

- [ ] **Step 6: Build and commit the personal portfolio changes**

~~~bash
pnpm --filter @portfolio/web build
git add apps/portfolio/src/data/projects.ts apps/portfolio/src/components/project-card.tsx apps/portfolio/src/app/projects/[id]/case-study-content.tsx apps/portfolio/src/app/page.tsx apps/portfolio/src/app/experience/page.tsx
git commit -m "feat: update portfolio with production projects"
~~~

Expected result: the Next.js build exits 0 and the three lead projects expose accurate descriptions and links.

### Task 4: Update the Fidexa project showcase

**Files:**
- Modify: /Users/faridmatovu/projects/fidexa/src/data/projects.ts
- Modify: /Users/faridmatovu/projects/fidexa/src/components/project-card.tsx only if App Store labeling needs it.

- [ ] **Step 1: Extend Fidexa link metadata**

Add optional appStore?: string to the links object. Keep existing github, live, and video fields.

- [ ] **Step 2: Set the four featured projects**

Use featured order Rishi, Money Lending, Inventory, and AI Scraping. Rishi must say Apple ecosystem with Android expansion planned, never current Android support. Use these links:

~~~ts
Rishi: {
  appStore: "https://apps.apple.com/us/app/rishi-reader/id6763041630",
  live: "https://rishi.fidexa.org",
  github: "https://github.com/matovu-farid/rishi-monorepo",
}
MoneyLending: {
  live: "https://money-lending.fidexa.org/home",
  github: "https://github.com/matovu-farid/money-lending",
}
Inventory: {
  live: "https://inventory.fidexa.org/home",
  github: "https://github.com/matovu-farid/inventory",
}
~~~

Update descriptions and stacks to match the approved resume copy. Leave Apartment Manager and older projects available on /projects.

- [ ] **Step 3: Render the App Store link accessibly and build**

Add an App Store icon link with aria-label="Open Rishi on the App Store", then run:

~~~bash
cd /Users/faridmatovu/projects/fidexa
bun run build
git add src/data/projects.ts src/components/project-card.tsx
git commit -m "feat: update Fidexa project showcase"
~~~

Expected result: the Fidexa build exits 0 and the featured grid shows the four current lead projects.

### Task 5: Regenerate resume artifacts

**Files:**
- Modify: resume.html
- Modify: resume.pdf

- [ ] **Step 1: Generate HTML and PDF**

~~~bash
cd /Users/faridmatovu/projects/portfolio
pandoc resume.md -o resume.html --standalone --self-contained --css=resume.css -M title="Farid Matovu - Resume"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=resume.pdf "file:///Users/faridmatovu/projects/portfolio/resume.html"
~~~

- [ ] **Step 2: Inspect PDF text and page count**

~~~bash
pdfinfo resume.pdf | rg "Pages|Page size"
pdftotext resume.pdf - | sed -n '1,260p'
~~~

Expected result: Rishi, Money Lending, and Inventory appear in order, supplied URLs are present, no current Android claim appears, and the short resume is at most two pages.

- [ ] **Step 3: Commit generated artifacts**

~~~bash
git add resume.html resume.pdf
git commit -m "build: regenerate resume artifacts"
~~~

### Task 6: Final verification and link check

**Files:**
- No additional files.

- [ ] **Step 1: Run portfolio tests**

~~~bash
cd /Users/faridmatovu/projects/portfolio
pnpm exec playwright test tests/navbar.spec.ts tests/projects.spec.ts
~~~

Expected result: navigation and project tests pass.

- [ ] **Step 2: Verify exact public links in the in-app browser**

Confirm the App Store URL shows Rishi Reader, the Rishi product site loads, and the Inventory and Money Lending URLs remain the exact /home URLs. Do not replace supplied URLs with guessed alternatives.

- [ ] **Step 3: Review worktree boundaries**

~~~bash
cd /Users/faridmatovu/projects/portfolio
git diff --check
git status --short
cd /Users/faridmatovu/projects/fidexa
git diff --check
git status --short
~~~

Expected result: no whitespace errors and no edits outside the planned resume, portfolio, screenshot, and Fidexa files. Existing unrelated work remains untouched.

