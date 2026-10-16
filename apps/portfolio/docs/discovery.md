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


## Production audit — 16 October 2026

Release `5de13f01ac159e4ac66030dea42a7a567a128094` is deployed through Vercel. The production discovery audit passes all 24 HTTP checks after the Cloudflare change. Those assertions cover page metadata/schema, sitemap membership, image output, reading guides, server-rendered catalog states, stable record anchors, and 404/noindex behavior. They do not assert that the final redirect hostname equals the canonical hostname or that verified crawler traffic is permitted.

### Cloudflare access correction

Before the change, ordinary Python urllib requests to the public homepage, robots, sitemap, and guides returned HTTP 403 with Cloudflare error 1010. The captured homepage Ray ID was `a4b550a81949f4f0-JNB`. Node fetch could already read the site and passed the baseline 24 checks, so the rejection was client-specific.

After explicit action-time approval, deployed Configuration Rule `734c3c0d974d4ff6b215053f8af8b866`, named **Portfolio public reads — Browser Integrity Check exception**. The dashboard confirms it is Active. It disables only Browser Integrity Check for GET/HEAD on `matovu-farid.com` and `www.matovu-farid.com`, limited to:

- `/`, `/projects`, `/experience`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, and `/opengraph-image`.
- Public icon/SVG paths, the two already-public résumé PDFs, and `/_next/image`.
- Paths beginning `/projects/`, `/screenshots/`, and `/_next/static/`.

The rule does not change WAF, DDoS protection, authentication, API policy, or write methods. Python GETs now return 200 for nine representative resources on each hostname (18 checks), including the résumé, real project image, and case study. Public HEAD reads also return 200. The excluded `/api/nonexistent-audit` and `/__clerk` HEAD probes still return 403 for this client. No contact form or other write operation was submitted.

### Initial production findings

1. **Canonical hostname disagrees with redirects.** `https://matovu-farid.com/` responds 308 to `https://www.matovu-farid.com/`, while HTML canonicals, sitemap entries, structured identity, and reading-guide links use the apex hostname. HTTP apex first redirects to HTTPS apex. Align the Vercel primary-domain redirect and the shared canonical origin; do not add an opposing Cloudflare redirect, which could create a loop. Recommended correction: serve the established apex canonical directly and redirect www to apex at the deployment provider.
2. **The dashboard reports a separate Claude-User crawler block.** In Cloudflare AI Crawl Control → Security, the Claude-User row shows Block Crawler enabled and disabled for editing (inherited or otherwise controlled elsewhere). Googlebot, BingBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, and Claude-SearchBot show the block switch off. The dashboard also blocks GPTBot and ClaudeBot. No AI Crawl Control setting was changed. Investigate the source of the Claude-User policy and allow public user-requested retrieval without broadly changing training-crawler policy or other applications on the zone.

Requests from this audit environment with OAI-SearchBot, ChatGPT-User, PerplexityBot, Googlebot, Bingbot, Claude-SearchBot, and Claude-User strings returned 200 for `/llms.txt`; GPTBot and ClaudeBot strings returned 403. These are **user-agent compatibility probes**, not verified crawler requests. In particular, the successful Claude-User string probe does not override the dashboard's verified-crawler block signal. No indexing or citation outcome is claimed.

Production browser checks confirmed project navigation, Rishi search (one result), noindex/follow on the search state, reset to all 13 projects with search noindex removed, loaded visible project images, no desktop horizontal overflow, and no captured browser errors.

Evidence (temporary local outputs):

- `/private/tmp/portfolio-discovery-live-baseline.log` and `/private/tmp/portfolio-discovery-live.log`: 24/24 before and after the scoped rule.
- `/private/tmp/portfolio-cloudflare-after.json`: both-host resource checks.
- `/private/tmp/portfolio-production-client-checks.json` and `/private/tmp/portfolio-production-extra-clients.json`: redirects, HEAD boundaries, and client probes.
- `/private/tmp/portfolio-cloudflare-active.jpg`, `/private/tmp/portfolio-cloudflare-crawler-policy.jpg`, and `/private/tmp/portfolio-production-catalog.jpg`: dashboard and browser evidence.

Search Console/Bing property verification, sitemap submission, real crawler follow-up, indexing outcomes, and a measured Lighthouse/Core Web Vitals audit remain outside these discovery checks.


### Follow-up: both findings resolved

Vercel Domains now connects `matovu-farid.com` directly to Production and permanently redirects `www.matovu-farid.com` to it with status 308. All 14 audited route/query states serve 200 directly at the apex; their www equivalents return 308 preserving the path and query (28 HTTP assertions). Browser category navigation stays on the apex with a matching canonical, no horizontal overflow, and no captured errors. A production-only redirect regression test now covers these 14 states. The final production discovery run passes **25/25 checks**, with no skips.

The Claude-User controls initially disagreed: AI Crawl Control labeled Claude-User as AI Crawler and locked its Block Crawler switch on, while the global policy allowed Search and Agent and set Training to Disallow. Reapplying the same settings did not clear the locked switch. Cloudflare's [official bot reference](https://developers.cloudflare.com/ai-crawl-control/reference/bots/) lists Claude-User as AI Assistant. Three tested Claude-User header variants already returned 200; this environment cannot impersonate a verified Anthropic source. The initial dashboard finding was a policy conflict, not independent proof that every real Claude-User request was rejected.

After explicit action-time approval, activated WAF custom rule `5f8579736d0544df964f88bdeb52a56d` (**Training crawlers — allow public Claude-User reads**), then changed the inherited Training preset to Allow. The replacement rule blocks the verified AI Crawler category and known GPTBot, ClaudeBot, Bytespider, CCBot, Meta-ExternalAgent, FacebookBot, Google-CloudVertexBot, Amazonbot, PetalBot, Timpibot, and Claude-User signatures. Its sole exception is Claude-User GET/HEAD on the same two public portfolio hosts and path allowlist as the Browser Integrity Check exception. The rule uses Block; it does not skip WAF, DDoS, rate limiting, or authentication. The managed category follows Cloudflare classification; the unverified signature list requires maintenance as new crawlers appear.

The dashboard now shows Claude-User's Block Crawler switch **off and editable**. Training enforcement is owned by the replacement WAF rule; AI Crawl Control's individual switches do not reflect this custom rule. Do not interpret their off state as evidence that the WAF permits training crawlers.

All 14 final client-policy assertions pass: Claude-User public reads return 200; its excluded API and `/__clerk` probes return 403; GPTBot, ClaudeBot, Bytespider, and CCBot return 403; search/user agents and ordinary Python clients return 200 for public discovery resources. These are compatibility probes from this audit environment, not requests from verified crawler infrastructure. Real provider fetching and indexing outcomes remain separate observations.

Final evidence (temporary local outputs):

- `/private/tmp/portfolio-discovery-final-live.log`: 25/25 production discovery checks.
- `/private/tmp/portfolio-apex-redirect-audit.json`: 28 redirect assertions.
- `/private/tmp/portfolio-crawler-policy-final-audit.json`: 14 client-policy assertions.
- `/private/tmp/portfolio-apex-domain-alignment.jpg`: Vercel apex Production / www 308 configuration.
- `/private/tmp/portfolio-claude-user-rule-active.jpg` and `/private/tmp/portfolio-claude-user-unblocked.jpg`: active replacement rule and cleared inherited block.
