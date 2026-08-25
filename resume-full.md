# Farid Matovu

**Senior Full-Stack Product Engineer · React · Next.js · TypeScript · Node.js**

Kampala, Uganda (Remote, GMT+3) · [matovu90@gmail.com](mailto:matovu90@gmail.com) · [matovu-farid.com](https://matovu-farid.com) · [linkedin.com/in/matovu-farid](https://www.linkedin.com/in/matovu-farid/) · [github.com/matovu-farid](https://github.com/matovu-farid)

---

## Summary

Senior full-stack/product engineer with 5+ years building and shipping web, mobile, desktop, and AI products. I work mainly in React, Next.js, TypeScript, Node.js, and serverless systems, with production experience in AWS, Cloudflare Workers, Vercel, Postgres, and native Apple development. In 2026 I shipped Rishi Reader to the App Store and deployed production accounting platforms for lending and inventory businesses. I run Fidexa, where I take products from domain modeling to deployment and support.

---

## Core Skills

- **Frontend:** HTML5, CSS3, JavaScript (ES2024), TypeScript, React 19, Next.js 16 (App Router, RSC, Server Actions), Redux, Tailwind CSS v4, Radix UI, shadcn/ui, Framer Motion, responsive design, accessibility
- **Backend:** Node.js, Next.js server actions, AWS Lambda, Cloudflare Workers, REST APIs, tRPC, Ruby on Rails, Python (scripting)
- **Data:** PostgreSQL, Prisma, Drizzle ORM, SQLite, Redis, Neon, ElectricSQL
- **Native and cross-platform:** Swift, SwiftUI, Mac Catalyst, native Apple development, CarPlay, Apple Watch, React Native (Expo), Flutter
- **Tooling:** pnpm, Turborepo, Docker, Docker Swarm, nginx, GitHub Actions, Vercel, Heroku, Netlify, Playwright, Vitest, Cypress
- **AI and integrations:** Vercel AI SDK, OpenAI (Chat, TTS, Agents SDK), Resend, Clerk, Better Auth, NextAuth, Stripe, Sentry

---

## Experience

### Founder / Lead Developer, **Fidexa LLC**
*Apr 2025 to Present · Remote*

Software studio I founded to ship client platforms and in-house products.

- Run the studio solo across technical strategy, domain modeling, client intake, product design, implementation, deployment, and support.
- Shipped Rishi Reader to the App Store as a native Apple product spanning iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences, with Android expansion planned.
- Deployed two production client platforms: a ledger-backed money-lending system and a multi-module inventory and trade system used by real businesses.
- Designed and built the studio site on **Next.js 16, React 19, and Tailwind v4**, deployed on Vercel with per-branch previews.
- Built an AI client-intake assistant with the Vercel AI SDK and OpenAI that turns free-form discovery into a structured, Zod-validated project brief and emails it through Resend and React Email.

### Full-Stack Developer, **Dabble Lab**
*Oct 2022 to Present · Remote, US team*

- Develop and maintain web applications and conversational AI products for US-based clients on a distributed team.
- Implement features end to end: interfaces in React and Next.js, server endpoints in Node.js, third-party API integrations, and LLM workflows.
- Troubleshoot production issues, ship fixes quickly, and collaborate asynchronously over GitHub and Slack across time zones.

### Frontend Engineer, **Microverse**
*2022 · Remote*

- Completed Microverse's 1,300+ hour full-stack program built around pair programming, daily code review, and project delivery.
- Built and deployed 10+ React, Redux, and JavaScript projects consuming live third-party APIs.
- Worked with international partners through async standups, Git/GitHub flow, and peer review.

### Web Developer, **Sustainable and Greener World**
*Jan 2020 to Jan 2021*

- Built and maintained the organization's web presence, implemented new features, and resolved site issues on tight single-developer timelines.
- Worked directly with non-technical stakeholders to translate requirements into shipped deliverables.

---

## Selected Projects

### Rishi Reader, Apple Reading Platform
*2026 · Swift · SwiftUI · Mac Catalyst · EPUB/PDF · OpenAI · native Apple development*

Rishi Reader is a production Apple ecosystem reading platform for people who want to read, listen, and understand books across their Apple devices. It shipped to the App Store with support for iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences. Android expansion is planned, not available today.

The product supports EPUB and PDF reading, read-aloud, highlights, synchronized library state, sharing, and AI chat grounded in the current book instead of generic model knowledge. Native Apple clients share product concepts and data contracts while adapting reading, audio, and companion experiences to each device category.

[App Store](https://apps.apple.com/us/app/rishi-reader/id6763041630) · [rishi.fidexa.org](https://rishi.fidexa.org) · [repository](https://github.com/matovu-farid/rishi-monorepo)

### Money Lending Management System
*2026 · Next.js · React · TypeScript · Postgres (Neon) · Drizzle · TanStack DB · ElectricSQL · Better Auth · BigNumber.js*

Production client platform for a real money-lending business. The core problem is operational and accounting accuracy: staff need to issue loans, collect repayments, account for investor capital, monitor risk, and produce reliable statements without relying on spreadsheets or floating-point arithmetic.

The platform is built around an accounting ledger with exact decimal money math through BigNumber.js. It models daily reducing-balance interest and payment allocation, tracks investor capital, surfaces borrower risk through watchlists, and produces P&L and Balance Sheet exports. Rate changes, fund transfers, and large payments use review-then-confirm approvals. Super Admin, Admin, Loan Officer, and Viewer roles separate sensitive actions. Vitest unit and integration suites, Cypress E2E coverage, and Sentry monitoring support production operation.

[Production platform](https://money-lending.fidexa.org/home) · [repository](https://github.com/matovu-farid/money-lending)

### Inventory and Trade Management System
*2026 · TanStack Start · React · TypeScript · Cloudflare Workers · Postgres · double-entry accounting*

Production client platform used by a real clothing import and retail business. It follows goods from international procurement through warehousing and retail sale while giving different teams focused workflows for each stage.

Supply, Store, and Shop modules share a double-entry ledger and accounting engine. The platform covers RMB/USD/UGX costing, procurement, stock control, point of sale, multi-shop operations, loss detection, and audit trails. The shared ledger makes it possible to trace value and inventory changes across the supply chain rather than treating purchasing, storage, and sales as disconnected tools.

[Production platform](https://inventory.fidexa.org/home) · [repository](https://github.com/matovu-farid/inventory)

### AI Scraping Ecosystem
*2024 to 2025 · Next.js · TypeScript · AWS Lambda · Serverless Framework · API Gateway · S3 · Zod · npm*

Commercial SaaS scraping product decomposed into three independently deployed services:

1. **Next.js dashboard:** signup, API key issuance and rotation, webhook configuration, usage metrics, and run history with replay.
2. **`scrap-ai` npm package:** a published library for type-safe AI extraction. Users supply a URL and Zod schema; the package returns parsed, typed data with async callbacks, custom prompts, and timing-safe HMAC verification for webhooks.
3. **AWS serverless backend:** Lambda functions behind API Gateway accept scrape requests, enqueue work, crawl and extract with an LLM, convert pages to PDF, and sign and post results to client webhooks.

The async callback architecture avoids long-held HTTP connections. Request IDs and webhooks let clients receive results when processing completes, while independent functions keep crawling, extraction, PDF conversion, and delivery isolated.

[dashboard repository](https://github.com/matovu-farid/scrap-platform) · [package repository](https://github.com/matovu-farid/scrap-npm-package) · [backend repository](https://github.com/matovu-farid/sls-scrap)

### Apartment Manager, Property Management SaaS
*2025 · Next.js · TypeScript · PostgreSQL · Prisma · Better Auth · Tailwind*

Multi-tenant SaaS where users manage property blocks, residents, billing cycles, and expense ledgers. A scheduled job materializes monthly rent invoices, status transitions through pending, partial, paid, and overdue, and payments and expenditures can be exported to CSV or Excel.

Role-based access uses signed invitation keys for admin and viewer scopes. Email-verified auth, revocable Postgres sessions, cached React Server Components, and Zod-validated server actions support a production-style business workflow.

[repository](https://github.com/matovu-farid/apartment_manager_next)

---

## Earlier Projects

### Fidexa Studio Site and AI Client Intake
*2025 to Present · Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel AI SDK · OpenAI · Resend · React Email · Vercel*

- Designed and shipped the site solo across information architecture, design system, copy, build, deployment, analytics, and case-study content.
- Built a streaming AI discovery assistant that emits a structured brief, validates it with Zod, and sends it through Resend using React Email templates.
- Used React Server Components with selective client islands for the chat surface, keeping marketing routes lightweight and fast.
[repository](https://github.com/matovu-farid/fidexa)

### Sophie Website, Abia Cleaning Services LLC
*Live client site · Next.js · tRPC · Prisma · NextAuth · Tailwind · PostgreSQL*

- Built and shipped a production website for a US-based cleaning services company.
- Added a type-safe tRPC admin surface for service listings and booking inquiries, with public routes optimized for SEO and Core Web Vitals.
- Designed, deployed, and maintained the site for the client.
[repository](https://github.com/matovu-farid/sophie-website)

### Pearl of Africa Tour, Tourism Marketing Site
*Live on GitHub Pages · HTML5 · CSS3 · JavaScript*

- Built a mobile-first marketing site for an annual Uganda game-park tour event using semantic HTML, modern CSS, responsive layout, lazy-loaded imagery, and client-side form validation.
[site](https://matovu-farid.github.io/Pearl-of-Africa-tour)

### Realtime Analytics, Rails Search Dashboard
*Live on Heroku · Ruby on Rails · PostgreSQL · RSpec · Action Cable · Bootstrap*

- Built a real-time search analytics dashboard with debounced article searches and WebSocket updates to connected admins.
- Added sliding-window trend tracking, IP-based user analytics, model and request specs, and a Heroku deployment with Postgres.
[site](https://realtime-analytics-ae1974cb754c.herokuapp.com)

### Space Travellers and Stocks Apps
*React · Redux Toolkit · JavaScript · REST APIs · Netlify*

- Built two production SPAs consuming SpaceX and stock-market APIs with normalized Redux stores, route-based code splitting, filtering, detail views, optimistic UI, and API error handling.

### Maria, Automated Trading Bot
*2025 · TypeScript · Effect-TS · Docker Swarm · Prisma · PostgreSQL · Binance Futures API · Vitest*

- Built a 24/7 automated trading system with typed errors, structured concurrency, half-Kelly position sizing, Spearman-noise validation, full order lifecycle handling, startup reconciliation, and Docker Swarm health checks.

### Proxy Service, Hardened TTS Gateway
*TypeScript · Bun · Docker · nginx · Docker secrets*

- Built a browser-safe proxy for OpenAI TTS with token-bucket rate limiting, a CORS allow-list, gzip compression, health checks, TLS termination, static caching, and Docker-managed secrets.
[repository](https://github.com/matovu-farid/proxy-service)

### CaseMedInsurance, Insurance Mobile App
*Live on Google Play Store · Flutter · Dart · Firebase · Cloud Functions*

- Shipped a production insurance app for quotations and service requests, with Firebase Cloud Functions dispatching emails to the appropriate insurance staff and a companion admin dashboard.
[repository](https://github.com/matovu-farid/case_medinsurance)

### Painter, Creative Drawing App
*Live on Google Play Store · Flutter · Dart · Custom Canvas*

- Built a drawing app with finger painting, shape tools, color palettes, and screenshot export using custom canvas rendering and direct touch-input mapping.
[repository](https://github.com/matovu-farid/painter)

### Published Libraries

**`rc-textfield`, React Component Library on npm**

- Published an accessible React text field with a validation state machine, prefix slots, custom validators, Tailwind styling, ESM, CJS, and TypeScript outputs.
[repository](https://github.com/matovu-farid/rc-textfield) · [npm](https://www.npmjs.com/package/rc-textfield)

**`scrap-ai`, AI extraction client on npm**

- Published the type-safe extraction client described in the AI Scraping Ecosystem project above.

---

## Product Engineering Strengths

- **End-to-end ownership:** take products from domain modeling and user workflows through implementation, deployment, monitoring, and support.
- **Business-critical systems:** model accounting, inventory, permissions, approvals, and audit trails as first-class product behavior.
- **Modern full stack:** React and Next.js on the frontend, TypeScript and Node.js on the backend, with AWS, Cloudflare Workers, Vercel, Postgres, and native Apple development in production.
- **Independent delivery:** work remotely across time zones, communicate clearly, review code, and ship without hand-holding.

*Available for senior full-time or product-engineering roles. References, live demos, and code walkthroughs available on request.*
