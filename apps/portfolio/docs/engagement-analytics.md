# Portfolio engagement analytics

Production destination configured on 16 October 2026: the existing US PostHog
project used by Fidexa. Every event carries `site=portfolio` so portfolio reporting
can be filtered independently. The public ingestion token cannot read analytics
or administer the project. No additional paid plan was enabled.

| Event | Meaning | Breakdown properties |
| --- | --- | --- |
| `resume_download` | Visitor activates an authored résumé PDF link | `page`, `placement` |
| `case_study_view` | An existing case-study route renders, on arrival or client navigation | `page`, `project_id` |
| `contact_click` | Visitor activates a contact-page, email, or LinkedIn link | `page`, `placement`, `channel` |

`channel` is `contact_page`, `email`, or `linkedin`. Placement distinguishes the
header, footer, home hero, home contact banner, case-study CTA, and contact page.
The download event measures initiation, not completion. A contact click does not
mean a message was sent. Case-study views exclude Next.js prefetch requests and
duplicate React effect executions; returning after another route counts again.

## Reporting

Sign in to [PostHog US](https://us.posthog.com/) and select the existing Fidexa
project. In Product analytics, create a Trends insight with the three event names
above, **Total count**, and an event-property filter **`site` equals `portfolio`**.
For individual views, break down `case_study_view` by `project_id`,
`contact_click` by `channel`, and `resume_download` by `page` or `placement`.
Use the same site filter in all portfolio reports.

The setup verification event `portfolio_analytics_smoke_test` has
`environment=verification`; it is separate from the engagement events. Browser
checks after deployment produce a small number of real engagement events.

## Collection boundaries

- Only the three explicit engagement events are collected. No automatic general
  page views, form tracking, session replay, identification, or error recording.
- No cookies or local/session storage. A random ID lives only in the current
  document's memory; it changes on a full reload. Use total events for reporting,
  not unique visitors or long-term user journeys.
- Person-profile processing and GeoIP enrichment are disabled on every event.
  The payload supplies `0.0.0.0` as the IP property. As with any HTTP service,
  PostHog receives the network connection; this is not a claim about provider logs.
- Query strings, fragments, referrers, link destinations, email addresses, and
  form contents are excluded. Pages, channels, and placements use allowlists.
- Do Not Track and Global Privacy Control suppress collection. Ad blockers and
  network failures may also prevent delivery. These are best-effort browser counts.
- Only Vercel's production environment at `https://matovu-farid.com` sends events.
  Development, preview deployments, and unknown hosts send nothing.

## Configuration and verification

The portfolio Vercel project has these **Production-only** environment variables:

- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`: existing public ingestion token.
- `NEXT_PUBLIC_POSTHOG_HOST`: `https://us.i.posthog.com`.

A dedicated portfolio PostHog project can replace this destination by changing
these variables and redeploying. No application code changes are necessary.
Never substitute a private PostHog personal API key for the public project token.

The implementation calls PostHog's documented
[anonymous capture API](https://posthog.com/docs/api/capture#anonymous-event-capture)
directly. It adds no SDK dependency and preserves server-rendered case studies.
Requests use `fetch` with `keepalive`, omit credentials and referrers, and never
cancel or delay navigation. No email is sent during analytics checks.

Run event-contract tests with Node 22.6 or later:

```sh
node --experimental-strip-types --test apps/portfolio/scripts/test-analytics.mjs
```

Also run TypeScript, lint, the design contract, and the discovery/quality HTTP
regression suites. The latter accept `PORTFOLIO_AUDIT_URL` for production checks.
To check browser delivery, navigate directly to a case study, follow a Contact
link, and activate a résumé download; inspect PostHog Activity with the site filter.
Dashboard verification requires signing into PostHog; ingestion acceptance alone
does not prove that an insight has been saved or that every event is stored.
