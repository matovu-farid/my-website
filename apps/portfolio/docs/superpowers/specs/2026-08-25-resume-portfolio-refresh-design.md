# Resume and Portfolio Refresh Design

**Date:** 2026-08-25  
**Status:** Approved design

## Goal

Refresh Farid Matovu's application resume, personal portfolio, and Fidexa project showcase around senior full-stack and product-engineering work shipped in 2026, with Rishi, Money Lending, and Inventory as the leading production projects.

## Positioning

The updated materials will present Farid as a senior full-stack/product engineer who can take a product from domain discovery and data modeling through implementation, deployment, and production support. The copy will favor concrete shipped systems over generic technology lists.

Rishi will be described accurately as a production Apple ecosystem reading platform. It currently spans iPhone, iPad, Mac, CarPlay, and connected Apple Watch experiences, with Android expansion planned. The App Store listing and product site are public proof points. The resume must not imply that an Android app already exists.

Money Lending will be presented as a production fintech platform built around an accounting ledger. The emphasis is exact financial arithmetic, loan and repayment operations, investor capital, approvals for sensitive postings, roles, risk visibility, and financial reporting.

Inventory will be presented as a production inventory and trade system for a clothing import and retail business. The emphasis is the Supply, Store, and Shop modules; procurement-to-retail traceability; RMB/USD/UGX costing; point of sale; loss detection; audit trails; and a shared double-entry ledger.

## Content hierarchy

The short application resume will use this order:

1. Rishi, cross-platform Apple product and App Store release.
2. Money Lending Management System, production accounting-ledger fintech platform.
3. Inventory and Trade Management System, production supply-chain and retail platform.
4. AI Scraping Ecosystem, AWS/serverless product and published npm package.
5. Apartment Manager or another earlier shipped product when space or role fit requires it.

The long resume dossier will retain richer detail for the above projects and preserve selected older work as supporting evidence of breadth. It will remove stale framing such as describing Rishi as an older Tauri-first project and will not invent customer counts, revenue, performance metrics, or client names.

## Repositories and files

### Personal portfolio repository

- `resume.md`: concise application resume and canonical short-form copy.
- `resume-full.md`: long-form resume dossier with expanded project detail.
- `resume.html`: regenerated from `resume.md`.
- `resume.pdf`: regenerated from the refreshed HTML.
- `apps/portfolio/src/data/projects.ts`: project cards, case-study narratives, technology lists, ranking, and public links.
- `apps/portfolio/src/app/page.tsx` and `apps/portfolio/src/app/experience/page.tsx`: stale summary or experience copy, if present after the data refresh.
- Portfolio project components: only modify when needed to render an App Store or product link cleanly; preserve the current visual system.

### Fidexa repository

- `src/data/projects.ts`: featured and full project copy, categories, technology tags, and production links.
- Existing project-card or page components: only modify if the updated link fields need rendering support.
- The four featured projects will be Rishi, Money Lending, Inventory, and AI Scraping. Apartment Manager remains in the wider project list.

## Public links

Use these exact URLs when rendered:

- Rishi App Store: `https://apps.apple.com/us/app/rishi-reader/id6763041630`
- Rishi product site: `https://rishi.fidexa.org`
- Inventory production site: `https://inventory.fidexa.org`
- Money Lending production site: `https://money-lending.fidexa.org/`
- Existing repository links remain where they are accurate.

The Rishi App Store listing was checked in the in-app browser and resolved to the live “Rishi Reader” listing with “iPhone, iPad, Mac” support. The Inventory URL resolved to `/home`, and the Money Lending URL resolved to the Kaks Credit sign-in page. The Rishi marketing site currently contains launch-soon copy; refreshing that separate product site is explicitly out of scope for this pass unless requested later.

## Copy rules

- Use “production” only for systems supported by the user's statement and local project evidence.
- State Rishi's current Apple platforms; describe Android only as planned expansion.
- Use short, natural sentences with concrete nouns and verbs.
- Avoid invented metrics and private client details.
- Avoid stale technology claims when the current implementation has moved on.
- Keep the existing resume format, contact details, and visual styling unless the content cannot fit cleanly.
- Avoid em dashes and en dashes in resume copy so the output remains consistent with the existing resume process guidance.

## Verification

Before handoff:

1. Scan the changed copy for stale Rishi claims, incorrect Android wording, and broken or missing public URLs.
2. Run the resume process checks, including the em-dash scan.
3. Regenerate the resume HTML and PDF from `resume.md`.
4. Inspect extracted PDF text and page count; keep the application resume within the existing two-page target.
5. Build the personal portfolio.
6. Build the Fidexa site.
7. Run the existing portfolio tests if their dependencies and scripts are available.
8. Review the final diff and confirm unrelated existing worktree changes were not modified.

## Non-goals

- Do not build an Android Rishi app.
- Do not rewrite the visual design of either website.
- Do not refresh the separate Rishi marketing site in this pass.
- Do not publish, deploy, or submit job applications.
- Do not modify unrelated untracked resume-tailoring artifacts or project repositories.
