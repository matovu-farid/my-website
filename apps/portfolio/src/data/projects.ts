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
  imageAlt?: string;
  story?: {
    name: string;
    intro: string;
    situation: string;
    decision: string;
    delivered: string;
    caption: string;
  };
  screenshots?: string[];
  screenshotDescriptions?: string[];
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
      "Apple reading platform for EPUB and PDF books, publicly available on the App Store for iPhone, iPad, and Mac, with read-aloud, highlights, sync, sharing, and AI chat grounded in the book you are reading.",
    longDescription:
      "Rishi is an Apple reading platform for EPUB and PDF books, publicly available on the App Store for iPhone, iPad, and Mac. The codebase also includes CarPlay and connected Apple Watch integrations; they are codebase integrations, not public releases. It supports read-aloud, highlights, synchronized progress, sharing, and AI chat grounded in the current book. Android is planned, not released.",
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
    imageUrl: "/projects/rishi-showcase-poster.jpg",
    imageAlt: "Rishi iPhone library showing books in progress, search, and reading navigation",
    story: {
      name: "Rishi",
      intro: "One reading experience, across Apple devices.",
      situation: "Readers move between books, listening, and questions about what they are reading.",
      decision: "Keep reading, read-aloud, and AI questions together, with answers grounded in the current book.",
      delivered: "An EPUB and PDF reading app with highlights, sync, and sharing. Available on the App Store for iPhone, iPad, and Mac.",
      caption: "Actual Rishi iPhone library, captured from the product walkthrough."
    },
    videoUrl: "https://youtu.be/vcWcpEGsof8",
    rank: 1,
    featured: true,
    year: "2026",
    narrative:
      "I built Rishi around the way people actually read across Apple devices: open an EPUB or PDF, listen with read-aloud, save highlights, sync progress, share passages, and ask questions in an AI chat grounded in the current book. Rishi is publicly available on the App Store for iPhone, iPad, and Mac. CarPlay and connected Apple Watch are codebase integrations, not public releases. Android is planned, not released.",
    keyDecisions: [
      "Native Apple delivery keeps reading, audio, sharing, and device handoff aligned across public iPhone, iPad, and Mac releases; CarPlay and connected Apple Watch are codebase integrations",
      "EPUB and PDF support share one reading model for progress, highlights, and synchronized state",
      "Read-aloud runs as a first-class reading mode, with audio controls available while the user continues through the book",
      "AI chat is grounded in the current book so answers stay tied to the reader's source material",
      "Android is planned, not released",
    ],
  },
  {
    id: "money-lending",
    title: "Money Lending Management System",
    description:
      "Production fintech platform for running a money-lending business end to end: loans, daily interest, investor capital, watchlists, P&L, and Balance Sheet.",
    longDescription:
      "A production lending operations system for a customer business, built around a ledger-based model and exact decimal money math for reducing-balance interest, payment allocation, investor capital, approvals, role-based access, audit trails, and financial exports.",
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
    liveLabel: "Public showcase",
    imageUrl: "/projects/money-lending-showcase.png",
    imageAlt: "Kaks Credit public product showcase with a lending dashboard illustration",
    story: {
      name: "Kaks Credit",
      intro: "Lending decisions connected to the ledger.",
      situation: "A lending business needed loan calculations, investor capital, approvals, and reporting to work together.",
      decision: "Build around an accounting ledger, with exact decimal arithmetic for reducing-balance interest and payment allocation.",
      delivered: "A production lending platform with investor capital, risk watchlists, role-based access, approvals, and financial reports.",
      caption: "Public Kaks Credit showcase with a dashboard illustration. The operational workspace requires sign-in."
    },
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
      "A production inventory and trade system for an import and retail business. It models procurement through retail in Supply, Store, and Shop modules sharing a double-entry ledger, with multi-currency costing, stock control, point of sale, loss detection, and audit trails.",
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
    liveLabel: "Public showcase",
    imageUrl: "/projects/inventory-dashboard.png",
    imageAlt: "Inventory operational dashboard showing supply routes and stock transfers",
    story: {
      name: "Inventory",
      intro: "From procurement to the shop floor.",
      situation: "An import and retail business needed to connect buying trips, stock movements, and retail sales.",
      decision: "Connect Supply, Store, and Shop through one double-entry ledger, with RMB, USD, and UGX support.",
      delivered: "A production trade platform combining point of sale, stock control, loss detection, and audit trails.",
      caption: "Existing Inventory dashboard capture. The operational workspace requires sign-in."
    },
    rank: 1.7,
    featured: true,
    year: "2026",
    narrative:
      "The business had records from 2011 to 2026 tracked in a single Excel sheet (gross_profit.xlsx, 47 routes). The brief was to move that operation into a system without losing the institutional knowledge baked into the spreadsheet. I derived the schema and accounting rules directly from the Excel, then split the UI into three role-based modules sharing a single ledger so loss could be detected at any stage of the supply chain.",
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
      "Full AI-powered scraping product: interactive Next.js dashboard, TypeScript client package (scrap-ai), and serverless AWS Lambda backend.",
    longDescription:
      "A complete AI scraping ecosystem comprising three projects: a Next.js dashboard for managing scraping operations with API key management, a TypeScript client package (scrap-ai) providing AI-powered data extraction with webhook support and Zod schema validation, and a serverless backend using AWS Lambda for processing webhooks and PDF conversion.",
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
      "I needed an AI-powered scraping tool and realized it should be three composable pieces — a dashboard for managing operations, a TypeScript client package others could use, and a serverless backend for processing. Each piece works independently but they compose into a complete product.",
    keyDecisions: [
      "Decomposed into 3 independent services: dashboard, TypeScript client package (scrap-ai), and Lambda backend",
      "Async callback architecture instead of polling for long-running scrape operations",
      "Used Zod schema validation in the client package for type-safe extraction",
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
    description: "Rebuilt rental-operations platform connecting properties, residents, rent billing, daily collections, reconciliation, and monthly reporting.",
    longDescription: "A rebuilt property-management workspace with blocks, resident history, monthly rent billing, payment receipts, daily collections, collection destinations, reconciliation batches, expenses, savings, audit history, and CSV/Excel reports. Ledger and statement views flag accounting figures as provisional when source reconciliation is pending. The public showcase is open; operational screens require sign-in.",
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
    imageUrl: "/projects/apartment-manager-showcase.png",
    imageAlt: "Apartment Manager public product showcase with a privacy-blurred apartment overview",
    story: {
      name: "Apartment Manager",
      intro: "Property records meet the daily work of rent.",
      situation: "Running rentals means keeping apartments, resident history, rent due, collections, and expenses in step.",
      decision: "Connect daily rent work to collection destinations, reconciliation, and monthly reporting, with accounting status visible.",
      delivered: "A rebuilt rental workspace with billing, receipts, expenses, savings, exports, and audit history. Unreconciled accounting figures remain explicitly provisional.",
      caption: "Deployed public showcase. Identifying values in the embedded overview are privacy-blurred by the product site."
    },
    screenshots: [
      "/projects/apartment-manager-daily-rent.png",
      "/projects/apartment-manager-reports.png",
    ],
    screenshotDescriptions: [
      "Daily collections with day, block, and destination filters. This privacy-safe capture shows a day with no recorded payments.",
      "Monthly report controls with Kampala month, block filters, and CSV/Excel export. Private records and financial totals are outside this capture.",
    ],
    rank: 6,
    featured: true,
    year: "2026",
    liveUrl: "https://apartment.fidexa.org/home",
    liveLabel: "Public showcase",
    rebuiltFrom: {
      title: "Apartment Manager (Rails)",
      tech: "Ruby on Rails",
      reason:
        "The original Rails version was a learning project — it taught me the property management domain. The Next.js rebuild is the real product: proper auth with email verification, automatic billing cycles, role-based access via invitation keys, and CSV/Excel export.",
    },
    narrative: "I rebuilt Apartment Manager around the daily work of rental operations: keeping apartments and resident history together, billing rent, recording receipts, and following collections through to deposits. Daily collections and rent-due views use Kampala dates. Monthly reports support CSV and Excel export. The accounting workspace makes reconciliation status explicit: figures stay provisional until their source records have been reconciled.",
    keyDecisions: [
      "Next.js 15 App Router with server actions for mutations and cached queries for reads",
      "Better Auth for email/password auth with verification and password reset flows",
      "Automatic monthly rent billing cycles with paid/partial/overdue status tracking",
      "Role-based block access with admin and viewer roles via invitation keys",
      "Daily collection and rent-due views use Kampala dates, with destinations and reconciliation batches connecting payments to deposits",
      "CSV and Excel monthly reports, with provisional accounting figures explicitly identified until source reconciliation is complete",
    ],
  },
  {
    id: "book-reader",
    title: "Book Reader",
    description:
      "Earlier desktop EPUB reading prototype with AI-powered narration, smart audio caching, and paragraph highlighting.",
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

export const PORTFOLIO_EXCLUDED_IDS = new Set([
  "painter",
  "pearl-of-africa-tour",
  "stocks-app",
  "space-travellers",
  "apartment-manager-rails",
]);

export const featuredProjects = projects
  .filter((p) => p.featured && !PORTFOLIO_EXCLUDED_IDS.has(p.id))
  .sort((a, b) => a.rank - b.rank);

export const allProjectsSorted = projects
  .filter((p) => !PORTFOLIO_EXCLUDED_IDS.has(p.id))
  .sort(
  (a, b) => a.rank - b.rank
  );

// Homepage stories are curated independently of the broader featured catalog.
export const homepageProjects = ["rishi", "money-lending", "inventory-trade", "apartment-manager"]
  .map((id) => projects.find((project) => project.id === id)!);
