# Portfolio engagement analytics

Production destination configured on 16 October 2026: the existing US PostHog
**Default project** (623765), also used by Fidexa. Every event carries
`site=portfolio` so portfolio reporting can be filtered independently.
The public ingestion token cannot read analytics
or administer the project. No additional paid plan was enabled.

| Event | Meaning | Breakdown properties |
| --- | --- | --- |
| `resume_download` | Visitor activates an authored résumé PDF link | `page`, `placement` |
| `case_study_view` | An existing case-study route renders, on arrival or client navigation | `page`, `project_id` |
| `contact_click` | Visitor activates a contact-page, email, or LinkedIn link | `page`, `placement`, `channel` |
| `contact_form_submitted` | The form's server action confirms email-service acceptance | `page`, `channel`, `environment` |

`channel` is `contact_page`, `email`, or `linkedin`. Placement distinguishes the
header, footer, home hero, home contact banner, case-study CTA, and contact page.
The download event measures initiation, not completion. A contact click does not
mean a message was sent. `contact_form_submitted` fires once in the submit handler
after the server action returns `success: true`; Resend must return a message ID
without an error. This means service acceptance, not guaranteed inbox delivery.
Failures, exceptions, initial renders, and dialog interactions emit no submission
event. The event uses fixed values `/contact`, `form`, and `production`; no form
fields or provider message IDs reach analytics. Case-study views exclude Next.js prefetch requests and
duplicate React effect executions; returning after another route counts again.

## Reporting

Open the saved [Portfolio engagement dashboard](https://us.posthog.com/project/623765/dashboard/2219363).
Its five Trends charts use **Total count**. A sixth chart shows the conversion
funnel. All charts cover the last 30 days and filter **`site` equals `portfolio`**:

- Daily engagement across all four events.
- Case-study views by `project_id`.
- Résumé download clicks by `placement`.
- Contact clicks by `channel`.
- Successful contact form submissions, also included in the daily overview.
- [Case study to contact funnel](https://us.posthog.com/project/623765/insights/jvNs2L29):
  case-study view → contact-page click → successful form submission, in order,
  within one hour. Other events may occur between the required steps.

The submission series excludes `environment=verification`. The isolated form
fixture sends its QA event with that value, so testing cannot inflate genuine
submission totals. Existing release checks for the original click/view events
remain included as documented below.

The funnel's middle step requires `channel=contact_page`; email and LinkedIn
clicks stay in the separate contact-channel chart. Its final step excludes
`environment=verification`. Funnel counts represent anonymous document visits,
not identified people: the same ID persists through Next.js client navigation,
but full reloads, new tabs, and returning visits start a new ID and cannot be
connected. No persistent storage or identity collection was added for the funnel.

The original charts use native Trends queries; the funnel uses a native
FunnelsQuery with all three steps required. Dates follow the project's UTC timezone.
Use the same site filter when adding portfolio reports to this shared project.

The setup verification event `portfolio_analytics_smoke_test` has
`environment=verification`; it is separate from the engagement events. Browser
checks after deployment produce a small number of real engagement events.

## Collection boundaries

- Only the four explicit engagement events are collected. Form analytics records
  the confirmed outcome only. No automatic general page views, field tracking,
  session replay, identification, or error recording.
- No cookies or local/session storage. A random ID lives only in the current
  document's memory; it changes on a full reload. Event totals and the funnel's
  anonymous visits do not measure unique people or long-term user journeys.
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

Verified in the authenticated PostHog project on 16 October 2026: all three event
names and their expected properties are present. The saved dashboard's four
queries return data without warnings. Initial release verification recorded one
`case_study_view` for `rishi`, one `resume_download` from the contact page, and one
`contact_click` with channel `contact_page`. These are QA actions, not evidence of
organic visitor engagement. The separate smoke-test event is excluded from all
original charts by their event-name selections.

The form-success extension was checked in an isolated production build with
email sending stubbed. Provider rejection and exceptions each emitted zero
events; confirmed success emitted one `contact_form_submitted` event. Closing
the success dialog did not emit another event, and focus returned to Send message.
PostHog accepted the browser's QA event with HTTP 200. Its schema includes
`page`, `channel`, `environment`, and `site`; all five saved dashboard queries
run without warnings. The genuine submission total is zero at setup because the
QA event is excluded. No real test email was sent.

The funnel was verified against recorded events and again from its saved dashboard
tile. At setup it returned 7 anonymous visits at the case-study step, 1 reaching
the contact page, and 0 successful form submissions, with no query warnings.
These early counts include release checks and are not an organic conversion
baseline. The existing tracking already links the in-site steps; this addition
changes reporting only.
