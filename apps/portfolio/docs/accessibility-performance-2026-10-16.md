# Accessibility and performance audit — 16 October 2026

Production site: https://matovu-farid.com. Baseline: `cb96058`. Remediation release: `d2e98a9`.

## Measurement scope

Hosted PageSpeed Insights / Lighthouse 13.5.0 covered seven representative pages on mobile (emulated Moto G Power, Slow 4G) and desktop. DOM and accessibility-tree checks covered all eleven public pages. Reflow checks covered 393px and 320px widths, plus the catalog’s second page. No browser tracing connector was available. The direct PageSpeed API returned a quota error; its browser interface completed the audits.

These are individual lab runs, not controlled repeated benchmarks. PageSpeed reported no real-user data, so field INP and a real-world Core Web Vitals pass are unverified. Lighthouse accessibility scores cover a subset of accessibility; the manual checks below supplement them and do not constitute full assistive-technology certification.

## Mobile comparison

| Route | Performance before → after | LCP before → after | After TBT | After CLS | After report |
| --- | --- | --- | --- | --- | --- |
| `/` | 99 → 97 | 2.1 s → 2.3 s | 0 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com/b97znx4cwd?form_factor=mobile) |
| `/projects` | 100 → 97 | 1.9 s → 2.2 s | 70 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects/eu0ym8r8dd?form_factor=mobile) |
| `/contact` | 100 → 100 | 1.8 s → 1.7 s | 0 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-contact/3hu5iwzz1b?form_factor=mobile) |
| `/experience` | 99 → 99 | 1.8 s → 2.0 s | 10 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-experience/q7bc8lz57r?form_factor=mobile) |
| `/projects/rishi` | 97 → 99 | 2.3 s → 1.9 s | 0 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-rishi/0foqbw5bqz?form_factor=mobile) |
| `/projects/money-lending` | 97 → 100 | 2.6 s → 1.5 s | 10 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-money-lending/dq59ldj8hs?form_factor=mobile) |
| `/projects/apartment-manager` | 90 → 99 | 3.6 s → 2.0 s | 40 ms | 0 | [PageSpeed](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-apartment-manager/k7tgzlaaaw?form_factor=mobile) |

Automated accessibility was 100/100 before and after on all seven pages, on both devices. All seven post-release desktop performance scores were 100/100; desktop LCP ranged from 0.5 to 0.6 seconds. All recorded post-release CLS values were zero.

The homepage and catalog mobile scores were lower in the first post-release sample; their LCP values remained below 2.5 seconds. The case-study loading improvements are the strongest observed timing changes. Timing and score differences should not be interpreted as a controlled causal experiment.

A single bounded confirmation run was taken for the homepage and catalog because their first post-release samples had lower scores. No source changes were made between these runs:

- [`/` confirmation](https://pagespeed.web.dev/analysis/https-matovu-farid-com/jyfk1k6qq5?form_factor=mobile): performance 99, accessibility 100, LCP 1.8 s.
- [`/projects` confirmation](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects/06e0bwzkip?form_factor=mobile): performance 99, accessibility 100, LCP 2.0 s.

The first-sample table is retained above. These repeat results illustrate lab variation; they are not substituted for lower scores.

## Findings fixed

- **P1 — Contact form fallback exposed a message in a GET URL.** Reproduced in an isolated local fixture during reload before client readiness. The form now uses POST, keeps submission disabled until its handler is ready, and provides a no-JavaScript email alternative. No real message was sent.
- **P1 — Form boundaries were too faint.** The previous border contrast was approximately 1.39–1.40:1 on the actual input backgrounds. The shared control-border token now gives 3.63:1 on paper and 3.95:1 on white. Sidebar hover text also keeps its high-contrast ink colour instead of dropping to 3.88:1 violet on sand.
- **P2 — Delivery state changes lost keyboard position.** In the fixture, closing success returned focus to the body after the submit button had been disabled. Success now restores focus to the submit button; delivery errors focus an announced, focusable recovery message and retain the inputs.
- **P2 — No ordinary keyboard bypass.** Added a first-focusable skip link and a focusable main target on every public page. Enter on the skip link was verified to focus main content, locally and in production. Existing main landmarks were preserved.
- **P2 — Repeated project-link names.** Case-study, showcase, store, and walkthrough links now identify their project. Decorative action icons are hidden from the accessibility tree. Footer and case-study navigation links have 44px-high targets.
- **P2 — Oversized product images.** Replaced raw images with responsive optimized images, reserved frames, realistic sizes for contained phone screenshots, lazy loading below the fold, and priority for the case-study lead image. Remote optimization is restricted to the two existing public GitHub screenshot paths. Media placeholders retain their frame geometry.
- **P2 — Static content shipped as client code.** Case studies and experience now render on the server. The build reports case-study first-load JavaScript falling from 126 kB to 115 kB. Reduced-motion CSS targets the actual transitions and modal animation instead of a global duration override.

## Media measurements

The first mobile homepage report estimated 595 KiB of image-delivery savings; the first post-release report estimated 23 KiB. This is an audit estimate, not measured total-byte savings. A direct production request measured the lending PNG at **315,173 bytes** and its 384px WebP variant at **7,114 bytes** (about **97.7% smaller** for that variant). Both returned 200. Actual chosen variants depend on viewport and device pixel ratio.

## Verification

- Production: all **33** discovery and quality regression checks passed.
- Local: all 32 applicable checks passed, with the production-only redirect check skipped.
- TypeScript, design contract, ESLint, and an isolated production build passed; the final lint/build checks had no warnings. Vercel marked the remediation deployment Ready on the production domain.
- Browser checks: one h1 and main per public route, named controls, skip-link focus transfer, visible focus, link naming, desktop/phone layouts, 320px reflow, stable image and placeholder frames, and no application browser errors in the inspected pages.
- Isolated contact fixture: pending controls, success initial focus and Escape dismissal, explicit focus restoration, returned failure and thrown interruption, focused error recovery, retained message, and retry availability. The temporary server was stopped and its mail action restored. The fixture was never committed.
- Contact email delivery through the real provider was not exercised. Reduced-motion behaviour was checked in source; an OS-level screen-reader/reduced-motion device run was not available.

Re-run production regression checks:

```sh
PORTFOLIO_AUDIT_URL=https://matovu-farid.com node --test apps/portfolio/scripts/audit-discovery.mjs apps/portfolio/scripts/audit-quality.mjs
```

## Remaining observations

Hosted reports still flag small framework-level unused/legacy JavaScript and render-blocking CSS estimates (roughly 120–140 ms). These were left as measured follow-up observations rather than disabling framework compatibility or redesigning the stylesheet for pages already scoring 97–100. Field INP requires real-user data.

## References

- [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [WCAG bypass blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Next.js responsive image sizing](https://nextjs.org/docs/app/api-reference/components/image#sizes)
- [Core Web Vitals and field measurement](https://web.dev/articles/vitals)
- [Lighthouse performance scoring and variability](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

Baseline report URLs:

- [Homepage](https://pagespeed.web.dev/analysis/https-matovu-farid-com/64yx8suf1c?form_factor=mobile)
- [/projects](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects/lbyw2f23ga?form_factor=mobile)
- [/contact](https://pagespeed.web.dev/analysis/https-matovu-farid-com-contact/aavmtvjv1g?form_factor=mobile)
- [/experience](https://pagespeed.web.dev/analysis/https-matovu-farid-com-experience/fwgqoeui2l?form_factor=mobile)
- [/projects/rishi](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-rishi/pq1redevl1?form_factor=mobile)
- [/projects/money-lending](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-money-lending/zu1pgq707s?form_factor=mobile)
- [/projects/apartment-manager](https://pagespeed.web.dev/analysis/https-matovu-farid-com-projects-apartment-manager/e19v4m97cx?form_factor=mobile)
