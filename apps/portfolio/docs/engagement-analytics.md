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
`environment=verification`. Since 17 October 2026, funnel counts use random
browser IDs that persist across
client navigation, full reloads, new tabs, and returning visits on the same origin
for up to 30 days. The conversion window remains one hour: persistence connects
steps across documents but does not extend the time allowed between steps. These
are pseudonymous browser counts, not unique people or cross-device identities.
Events recorded before this change keep their old document IDs and are not merged.

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
- No cookies, session storage, fingerprinting, or account identification. One
  first-party localStorage entry, `portfolio:anonymous-visitor:v1`, contains only
  a cryptographically random UUID and its expiry timestamp. It expires 30 days
  after creation; activity never extends it. Expired records are replaced on the
  next tracked event, including in an already open tab. No background cleanup runs
  while the site is closed. Clearing site storage resets the ID. Other browsers,
  devices, origins, and isolated private sessions are not connected.
- Storage is checked at each event so other tabs adopt a replacement ID. Malformed
  IDs, non-UUID values, and invalid expiry timestamps are replaced. If storage is
  denied or full, collection uses a temporary document ID; reload/tab continuity
  is then unavailable. No attempt is made to bypass browser storage restrictions.
- Person-profile processing and GeoIP enrichment are disabled on every event.
  The payload supplies `0.0.0.0` as the IP property. As with any HTTP service,
  PostHog receives the network connection; this is not a claim about provider logs.
- Query strings, fragments, referrers, link destinations, email addresses, and
  form contents are excluded. Pages, channels, and placements use allowlists.
- Do Not Track and Global Privacy Control suppress collection and clear the stored
  ID when the tracker initializes or checks an event (removal is best effort when
  storage is denied). They never read or create an ID while active. Ad blockers and
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
baseline. The 16 October funnel addition changed reporting only; the 17 October
identity extension adds the bounded browser storage described above.


The 17 October identity extension passed 16 event-contract tests covering reloads,
new tabs, fixed expiry, clearing storage, corrupt records, opt-outs, disabled
configuration, and denied/full storage. TypeScript, lint, the design contract,
and an isolated production build passed. Its HTTP suite passed 32 checks with
one production-only redirect check skipped locally. A separate instrumented
production fixture verified matching IDs across a full reload, a contact click,
and a success signal in a second tab; clearing its storage reset the ID and an
existing tab adopted the replacement. The fixture intercepted delivery locally:
no test events reached PostHog and no email was sent. The saved funnel needs no
query change because it already groups the three events by their distinct ID.
