# Portfolio adaptation from Fidexa — 2026-10-16

## Direction

The user approved adapting Fidexa’s calmer typography, real product previews, and clearer project stories while preserving Farid Matovu’s personal identity and senior-role positioning.

## Implementation

- Keep the portfolio’s dark ink, paper, violet, and mint palette; relax compressed tracking, line heights, weights, and headline scale across the existing routes.
- Make Farid Matovu the primary header identity, retaining the Fidexa mark and founder affiliation.
- Replace repeated hero credentials with a real Rishi product capture linked to its case study. Preserve the experience claim, location, remote positioning, and résumé download.
- Present selected work immediately after the hero, in the order Rishi, Kaks Credit, Inventory, Apartment Manager. Each story describes the situation, personal approach, and delivered product.
- Use copied, existing Fidexa media with provenance captions and descriptive alternative text. Do not imply that public showcase illustrations are authenticated operational captures.
- Update Apartment Manager’s description, story, public showcase link, year, and privacy-safe workflow captures from Fidexa’s current implementation. Keep provisional accounting status explicit.
- Preserve catalog breadth, search, categories, pagination, existing routes, and contact delivery. Remove the duplicate featured cards from the catalog; expose category selection with aria-pressed and use h2 for index entries.
- Keep motion modest and respect reduced-motion settings. Use visible focus, comfortable controls, and stacked phone layouts.

## Asset provenance

All new assets were copied from `/Users/faridmatovu/projects/fidexa/public/projects/`. The Rishi poster is an existing iPhone walkthrough frame. Lending is a public product showcase with a dashboard illustration; Inventory is an existing dashboard capture. Apartment Manager’s public overview has identifying values blurred by its product site. Its daily-rent and monthly-report captures exclude private records and financial totals.

## Verification

- Existing portfolio design contract passed.
- TypeScript check passed; local Next lint passed with existing raw-image optimization advisories.
- An isolated production copy compiled and generated all 17 pages successfully. Its build-time ESLint integration reported plugin resolution outside the monorepo; lint was therefore also run successfully in the actual application directory.
- Browser inspection: desktop 1280×720 and an 855px-wide view; real responsive frames at 393×852 and 834×1194. No horizontal overflow on the tested home, catalog, case-study, contact, and experience surfaces.
- Verified all four homepage stories, native-category filtering, empty search state, search reset, pagination, updated Apartment Manager media, contact field requirements, and résumé link.
- Contact delivery was not submitted during UI checks.
- The temporary responsive harness was removed. The original development URL remains http://localhost:3917; no deployment was requested or performed.
