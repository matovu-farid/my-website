# Portfolio hiring journey implementation plan

**Goal:** Carry out the approved contact and flagship case-study improvements on main, then commit and push.

**Design:** Keep the existing typography, palette, media, and responsive layouts. Make senior remote hiring the primary contact context while welcoming product inquiries. Offer email, LinkedIn, and the existing résumé without requiring a form. Give Rishi and Money Lending an explicit contribution, reasoned engineering decisions, delivered scope, evidence boundaries, and a route to contact.

**Evidence:** Use the existing public project records and canonical résumé. Keep Rishi's public release limited to iPhone, iPad, and Mac; connected Apple platforms remain codebase integrations and Android planned. Label the lending illustration and authenticated workspace accurately. Add no invented measurements, customer counts, or testimonials.

**Architecture:** Extend the shared project data with optional case-study detail for these two projects. Render that detail in the existing case-study component and full agent guide. Keep the existing email delivery service; improve client recovery, form guidance, and success wording.

## Implementation checklist

- [x] Add HTTP regression checks for direct hiring contact options, flagship contribution/evidence sections, and agent-guide parity; confirm they fail against the current pages.
- [x] Update shared contact facts, contact copy, autocomplete, recovery text, and keyboard focus containment in the existing success dialog.
- [x] Add evidenced flagship details to project data, render semantic sections and contact actions, and include the details in the agent guide.
- [x] Check TypeScript, design contract, discovery suite, lint, and production build. Inspect desktop and phone layouts plus native form validation without sending test messages.
- Release: review the scoped diff, commit only this work on main, push, and check the deployed pages.

## Validation

The three new HTTP checks failed against the previous implementation, then passed with the changes. The complete local discovery suite passed 27 checks with the production redirect check skipped. TypeScript and the design contract passed; lint and the isolated production build passed with three existing image warnings. The isolated build used the repository's node_modules via NODE_PATH to preserve monorepo plugin resolution.

Browser checks covered desktop and 393px phone layouts, native required-field and email validation, the case-study contact link, and browser error logs. No contact message was sent. Email delivery and the resulting success dialog were not exercised against the external mail service.

The first production audit passed 27 of 28 checks: Cloudflare Email Address Obfuscation rewrote the public mailto anchor. Apply the [documented per-address HTML opt-out](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/#prevent-cloudflare-from-obfuscating-email) around that authored contact link so readers without JavaScript can use it. The direct-link assertion remains unchanged and must pass against the final deployment.

Preserve unrelated local changes outside the release commit.
