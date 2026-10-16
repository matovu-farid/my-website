# Portfolio search and agent accessibility

Implemented locally on 16 October 2026. This pass implements the five approved priorities; it does not deploy, submit indexing requests, alter CDN security, or activate analytics.

## Public identity and sources

The established canonical domain is `https://matovu-farid.com`, matching the founder portfolio linked from Fidexa. Local review intentionally emits production canonicals and social URLs.

- `src/data/site.ts`: public identity, role, location, remote availability, verified profile destinations, studio affiliation, and route descriptions.
- `src/data/experience.ts`: the same professional history and education shown on the site and in the full guide.
- `src/data/projects.ts`: existing public project facts and evidence. The existing excluded-project policy is preserved.
- `src/lib/seo.ts`: metadata, identity graph, case-study records, safe JSON serialization, and sitemap route inventory.
- `src/lib/agent-guide.ts`: UTF-8 reading guides generated exclusively from the public data above.
- `src/lib/catalog.ts`: normalized selection, server filtering, page bounds, URL construction, and stable catalog-only record destinations.

The portfolio remains about Farid Matovu. Its Person entity has stable identity and verified GitHub/LinkedIn references; Fidexa is a separate Organization connected through founder and worksFor relationships. No new client outcomes, platform releases, pricing, ratings, or quantitative results are asserted.

## Routes and metadata

Home, catalog, experience, contact, and seven public case studies have distinct appropriate metadata, production canonicals, complete share metadata, and server-rendered route-owned JSON-LD. A generated 1200×630 PNG is served at `/opengraph-image`.

`/robots.txt` explicitly allows public reads, excludes `/api/` from crawling, and advertises `/sitemap.xml`. Robots rules are crawler guidance, not access control. The sitemap lists four top-level pages and seven actual case-study pages; it excludes retired entries and free-text search states. No invented modification timestamps are emitted.

`/llms.txt` links to authoritative pages, the résumé, and selected work. `/llms-full.txt` adds the public experience/education, all 13 visible catalog entries, existing narratives, decisions, media provenance, and public evidence links. Catalog-only links include the page containing the card and its stable anchor. Rishi release boundaries and Apartment Manager provisional accounting status remain explicit. These guides are reading aids, not guarantees of indexing, ranking, or citation.

## Catalog and progressive behavior

`/projects` is server-rendered from `category`, `q`, and `page`. Search is a native GET form. Category and pagination navigation uses real anchor links, preserves applicable selection, and resets page when a new category or search is selected. Invalid categories fall back to All; page values are clamped; queries are trimmed and limited to 200 characters. Empty results provide a reset link.

Category and pagination canonicals retain normalized URL state. Free-text result pages specify noindex/follow. JSON-LD follows the current result state and uses one stable ItemList identity per category/search selection. Per Schema.org pagination guidance, numberOfItems reports the whole matching list while itemListElement describes the current page with global positions.

Meaningful content is visible in initial HTML. The old opacity-zero page transition has been removed. Search, category navigation, pagination, and case-study links work through ordinary HTTP requests without requiring JavaScript. Existing contact delivery is preserved and was not submitted during verification.

## Local verification

From `apps/portfolio` with the dev server on port 3917:

```sh
node --test scripts/audit-discovery.mjs
node scripts/verify-design.mjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next lint
```

For a production preview, set `PORTFOLIO_AUDIT_URL` to that local server URL. Build in a separate copy or stop the dev server first; a build and dev process must not write the same `.next` directory concurrently.

Verified for the final source:

- All 24 read-only HTTP integration tests pass against both development and isolated production servers. They cover every public route, metadata and schema, sitemap membership, real PNG dimensions, UTF-8 guides, catalog/query/invalid-input behavior, valid catalog-only anchors, 404/noindex behavior, and paginated list count/identity/positions.
- TypeScript, the existing design contract, and production build pass. Lint passes with the existing three raw-image optimization warnings; no rule is suppressed.
- An independent reviewer returned PASS after the pagination-schema correction.
- Browser checks cover category and search submission, reset, back/forward, pagination, case-study navigation, unique route schema, and removal of search noindex metadata when leaving search results. No browser errors were recorded.
- Desktop inspection at 1280×720 and real responsive frames at 393×852 and 834×1194 found no horizontal overflow. Search controls, category wrapping, single-column phone cards, tablet cards, and pagination targets were inspected.
- The temporary responsive harness was removed; the original dev URL remains `http://localhost:3917`.

Local evidence is recorded in `/private/tmp/portfolio-discovery-green.log`, `/private/tmp/portfolio-discovery-production.log`, `/private/tmp/portfolio-discovery-build.log`, and `/private/tmp/portfolio-discovery-lint.log`. These are temporary verification outputs, not deployed assets.

## Later production work

Once deployed, inspect real responses on the production hostname, then verify its own Google Search Console and Bing Webmaster Tools properties and submit the sitemap. CDN crawler access, completed indexing, referral attribution, and acquisition outcomes are outside this local pass. No previous Fidexa account or security approval is implicitly reused for the portfolio.
