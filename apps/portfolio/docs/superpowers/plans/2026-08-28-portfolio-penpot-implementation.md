# Portfolio Penpot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `verification-before-completion` before claiming completion.

**Goal:** Implement the approved Penpot `Portfolio Site Redesign` in the portfolio Next.js app, with the corrected case-study media proportions and responsive layouts for MacBook, iPad, and iPhone.

**Architecture:** Preserve the existing data-driven routes and server actions. Replace the generic centered theme with shared portfolio tokens and semantic layout classes, then update the header, homepage, project index/cards, case-study template, experience page, and contact page to use the same visual system.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Motion, Lucide.

---

## Tasks

1. Establish a failing design contract test for approved palette, proposition copy, serious project catalog, real media, and responsive media rules.
2. Implement the shared visual system: paper/ink surfaces, violet and mint accents, typography scale, full-bleed hero, responsive gutters, bounded media frames, and accessible focus states.
3. Implement the homepage anatomy: identity header, systems-that-ship hero, capabilities/two-engine explanation, evidence-first featured work, experience preview, and contact CTA.
4. Implement the projects index and cards: featured proof grid, searchable catalog, category controls, meaningful copy, real image handling, and no stretched media.
5. Implement case-study, experience, and contact routes using the same hierarchy and responsive rules while preserving existing route behavior and actions.
6. Run typecheck, contract test, production build, and browser review at 1512×982, 834×1194, 1194×834, 393×852, and 390×844. Fix any visual or overflow regression before handoff.
