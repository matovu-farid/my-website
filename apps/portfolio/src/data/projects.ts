export type Category =
  | "ai-automation"
  | "native-apps"
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
  liveLabel?: string;
  appStoreUrl?: string;
  productUrl?: string;
  imageUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
  rank: number;
  featured: boolean;
  narrative?: string;
  keyDecisions?: string[];
  year?: string;
  archived?: boolean;
  rebuiltFrom?: {
    title: string;
    tech: string;
    reason: string;
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "ai-automation": "AI & Automation",
  "native-apps": "Native Apple Apps",
  "cross-platform": "Cross-Platform Apps",
  "web-apps": "Web Applications",
  "dev-tools": "Developer Tools",
};

export const projects: Project[] = [
  {
    id: "rishi",
    title: "Rishi",
    description:
      "Production Apple reading platform for EPUB and PDF books, with read-aloud, highlights, sync, sharing, and AI chat grounded in the book you are reading.",
    longDescription:
      "Rishi is an Apple-only reading platform across iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences. It supports EPUB and PDF reading, read-aloud, highlights, synchronized progress, sharing, and AI chat grounded in the current book. Android support is planned, but there is no Android app today.",
    category: "native-apps",
    technologies: [
      "Swift",
      "SwiftUI",
      "Apple Platforms",
      "EPUB/PDF",
      "Text-to-Speech",
      "AI",
      "Cloud Sync",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/rishi-reader/id6763041630",
    productUrl: "https://rishi.fidexa.org",
    githubUrl: "https://github.com/matovu-farid/rishi-monorepo",
    imageUrl: "/screenshots/rishi/app-store-listing.png",
    rank: 1,
    featured: true,
    year: "2026",
    narrative:
      "I built Rishi around the way people actually read across Apple devices: open an EPUB or PDF, listen with read-aloud, save highlights, sync progress, share passages, and ask questions in an AI chat grounded in the current book. The production release now spans iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences. Android is planned for a later phase.",
    keyDecisions: [
      "Native Apple delivery keeps reading, audio, sharing, and device handoff aligned across iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences",
      "EPUB and PDF support share one reading model for progress, highlights, and synchronized state",
      "Read-aloud runs as a first-class reading mode, with audio controls available while the user continues through the book",
      "AI chat is grounded in the current book so answers stay tied to the reader's source material",
      "Android remains planned expansion rather than a current platform commitment",
    ],
  },
  {
    id: "money-lending",
    title: "Money Lending Management System",
    description:
      "Production fintech platform for running a money-lending business end to end: loans, daily interest, investor capital, watchlists, P&L, and Balance Sheet.",
    longDescription:
      "A full-stack lending operations product. Issues loans with daily reducing-balance interest, collects repayments with printable receipts, tracks investor (creditor) capital, auto-flags borrowers at risk, records expenses and income, and generates dashboards plus P&L and Balance Sheet exports. Sensitive actions go through a review-then-confirm approvals workflow before posting.",
    category: "web-apps",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "TanStack DB",
      "ElectricSQL",
      "Better Auth",
      "BigNumber.js",
      "Sentry",
      "Cypress",
      "Vitest",
    ],
    githubUrl: "https://github.com/matovu-farid/money-lending",
    liveUrl: "https://money-lending.fidexa.org/home",
    liveLabel: "Production App",
    rank: 1.5,
    featured: true,
    year: "2026",
    narrative:
      "Built for a real lending business that needed to move off spreadsheets without sacrificing the trust their existing process gave them. The core constraint was money math: daily reducing-balance interest, payment allocation (interest first, then principal), 30-day minimums, all calculated with BigNumber.js so a rounding error never costs the operator a customer. Everything sensitive goes through a review-then-confirm step before it posts.",
    keyDecisions: [
      "BigNumber.js for all money math: no floating-point arithmetic touches a balance",
      "TanStack DB collections with ElectricSQL for reactive, real-time UI state across roles",
      "Role-based access (Super Admin, Admin, Loan Officer, Viewer) implemented through Better Auth plus a permission middleware",
      "Review-then-confirm approvals before sensitive postings (rate changes, fund transfers, large payments) so a misclick never silently changes the books",
      "Custom 'Quantitative Minimalist' design system with tabular Geist Mono for numbers, so columns of figures scan cleanly",
    ],
  },
  {
    id: "inventory-trade",
    title: "Inventory and Trade Management System",
    description:
      "Multi-module inventory platform for a clothing import / retail business. Supply, Store, and Shop apps share one ledger with double-entry bookkeeping for loss detection at every stage.",
    longDescription:
      "An end-to-end inventory and trade management system that tracks goods from international procurement (China buying trips) through warehousing to retail sale across multiple shops. Built as one TanStack Start codebase serving three role-based front ends (Supply, Store, Shop) on top of a shared database and accounting engine. Double-entry bookkeeping with a shared ledger surfaces loss at any stage of the supply chain.",
    category: "web-apps",
    technologies: [
      "TanStack Start",
      "TanStack Router",
      "TanStack DB",
      "React",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Cloudflare Workers",
      "Better Auth",
      "Resend",
      "Sentry",
      "Cypress",
    ],
    githubUrl: "https://github.com/matovu-farid/inventory",
    liveUrl: "https://inventory.fidexa.org/home",
    liveLabel: "Production App",
    rank: 1.7,
    featured: true,
    year: "2026",
    narrative:
      "The business had 15 years of buying trips tracked in a single Excel sheet (gross_profit.xlsx, 47 routes from 2011 to 2026). The brief was to move that operation into a system without losing the institutional knowledge baked into the spreadsheet. I derived the schema and accounting rules directly from the Excel, then split the UI into three role-based modules sharing a single ledger so loss could be detected at any stage of the supply chain.",
    keyDecisions: [
      "One codebase, three role-based modules (Supply, Store, Shop) sharing a single accounting engine, so loss is visible at every transition",
      "Double-entry bookkeeping enforced at the server function layer, not the UI, so the ledger stays sound regardless of client",
      "TanStack Start on Cloudflare Workers for global edge deploy and a scheduled worker that runs hourly cron jobs (notifications, digests)",
      "Multi-currency procurement records actual RMB to USD to UGX rates per trip, not an averaged guess, so cost of goods reflects reality",
      "Full audit trail with a viewer in Settings, every mutation routed through validated server functions",
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
      "Full-stack property management app with block management, rent billing cycles, expenditure tracking, and data export — built with Next.js 15 and PostgreSQL.",
    longDescription:
      "A full-stack property management application for managing apartment blocks, residents, rent payments, and expenditures. Features role-based access with invitation keys, automatic monthly billing cycles, payment status tracking, CSV/Excel export, and a dashboard with key metrics. Built with Next.js 15, Prisma 6, Better Auth, and Tailwind CSS 4.",
    category: "web-apps",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Better Auth",
      "Tailwind CSS",
      "Radix UI",
      "Zod",
    ],
    githubUrl: "https://github.com/matovu-farid/apartment_manager_next",
    imageUrl:
      "/screenshots/apartment-manager/apartments.png",
    screenshots: [
      "/screenshots/apartment-manager/apartments.png",
      "/screenshots/apartment-manager/payments.png",
    ],
    rank: 6,
    featured: true,
    year: "2025",
    rebuiltFrom: {
      title: "Apartment Manager (Rails)",
      tech: "Ruby on Rails",
      reason:
        "The original Rails version was a learning project — it taught me the property management domain. The Next.js rebuild is the real product: proper auth with email verification, automatic billing cycles, role-based access via invitation keys, and CSV/Excel export.",
    },
    narrative:
      "I rebuilt the apartment manager from scratch in Next.js to create a production-grade property management tool. The original Rails version taught me the domain — this version is the real product, with proper auth, billing cycles, role-based access, and data export.",
    keyDecisions: [
      "Next.js 15 App Router with server actions for mutations and cached queries for reads",
      "Better Auth for email/password auth with verification and password reset flows",
      "Automatic monthly rent billing cycles with paid/partial/overdue status tracking",
      "Role-based block access with admin and viewer roles via invitation keys",
      "CSV and Excel export for residents, payments, and expenditures",
    ],
  },
  {
    id: "book-reader",
    title: "Book Reader",
    description:
      "Earlier desktop EPUB reading prototype with AI-powered narration, smart audio caching, and paragraph highlighting. It preceded the current Apple Rishi product.",
    longDescription:
      "An Electron desktop application with React and TypeScript for reading EPUB books. Features text-to-speech narration powered by OpenAI's TTS API with smart audio caching, paragraph highlighting during narration, and auto page navigation.",
    category: "cross-platform",
    technologies: ["Electron", "React", "TypeScript", "OpenAI TTS"],
    githubUrl: "https://github.com/matovu-farid/book-reader",
    rank: 7,
    featured: false,
    archived: true,
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
  {
    id: "apartment-manager-rails",
    title: "Apartment Manager (Rails)",
    description:
      "Original property management app built with Ruby on Rails. Archived — rebuilt as a full-stack Next.js application.",
    longDescription:
      "A Ruby on Rails application for managing apartment properties, tenants, rent payments, and maintenance requests. Features a full CRUD interface with authentication and authorization. This was the first version that taught the domain — later rebuilt with Next.js 15.",
    category: "web-apps",
    technologies: ["Ruby on Rails", "PostgreSQL", "Ruby"],
    githubUrl: "https://github.com/matovu-farid/apartment_manager",
    rank: 16,
    featured: false,
    archived: true,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.rank - b.rank);

export const allProjectsSorted = [...projects].sort(
  (a, b) => a.rank - b.rank
);
