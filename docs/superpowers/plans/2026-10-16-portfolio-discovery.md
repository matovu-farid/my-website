# Portfolio SEO and agent accessibility implementation plan

**Goal:** Implement the five approved priorities and verify them locally, without publishing.

**Architecture:** Keep public identity in `apps/portfolio/src/data/site.ts`, project truth in the existing project catalog, and pure catalog/SEO/guide helpers under `src/lib/`. Server route components own metadata, JSON-LD, and query results; native GET search forms and anchor links work without JavaScript. Shared identity and canonical URLs always use the established production domain, including during local review.

**Tech stack:** Existing Next.js 15 App Router, React 19, TypeScript; Node's built-in test runner for read-only HTTP integration tests. No new runtime dependencies.

## Execution checklist

- [x] Write `apps/portfolio/scripts/audit-discovery.mjs` first. Check actual responses for canonical metadata, social image PNG dimensions, stable identity/schema, all public sitemap routes, crawler access, generated guide coverage, server category/search/pagination, invalid input, and visible initial HTML. Run against localhost:3917 and record expected failures before implementation.
- [x] Add `src/data/site.ts`, `src/lib/catalog.ts`, `src/lib/seo.ts`, `src/lib/agent-guide.ts`, and `src/components/structured-data.tsx`. Use existing project facts and verified public profile links. Exclude retired projects, unsupported platforms, and private repository documents from guides/schema.
- [x] Implement `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`, and UTF-8 `/llms.txt` and `/llms-full.txt` routes. Use real public case-study paths and no fabricated modification dates.
- [x] Add distinct metadata and route-owned JSON-LD to home, projects, experience, contact, and case studies. Move contact/experience presentation into content components so server pages can export metadata. Preserve forms and visible content.
- [x] Replace hidden initial page transitions with visible markup. Render `/projects` from awaited searchParams, preserve category/search across real pagination links, reset page on filter/search, clamp invalid pages, and support native GET search. Free-text result pages get noindex/follow; category and pagination canonicals preserve normalized query state.
- [x] Run the HTTP audit, design contract, TypeScript, lint, and isolated production build. Inspect desktop and phone/tablet layouts and browser back/forward behavior, including category/search reset, empty results, and case-study navigation.
- [x] Save local verification evidence and documentation. Remove temporary review files; leave the original dev URL serving and preserve all pre-existing user edits. Do not commit, push, change crawler security, submit indexing, or activate analytics in this local-only pass.

## Verification commands

From `apps/portfolio`:

```sh
node --test scripts/audit-discovery.mjs
node scripts/verify-design.mjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next lint
```

The HTTP audit defaults to `http://localhost:3917`; set `PORTFOLIO_AUDIT_URL` to the isolated production preview URL for final checks. Build in a separate temporary copy using the installed Next binary to avoid modifying the live dev server cache. Record the real exit codes and inspect emitted responses rather than inferring completion from source files.
