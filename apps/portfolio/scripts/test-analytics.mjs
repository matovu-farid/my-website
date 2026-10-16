import assert from "node:assert/strict";
import { test } from "node:test";
import { createEngagementTracker } from "../src/lib/engagement-analytics.ts";

const config = {
  enabled: true,
  token: "phc_test_project",
  host: "https://us.i.posthog.com",
  caseStudyIds: ["rishi", "money-lending"],
};

function fixture(overrides = {}, dependencies = {}) {
  const sent = [];
  const tracker = createEngagementTracker({ ...config, ...overrides }, {
    send: (url, options) => sent.push({ url, options, payload: JSON.parse(options.body) }),
    uuid: () => "anonymous-visit-id",
    optedOut: () => false,
    ...dependencies,
  });
  return { tracker, sent };
}

test("case study views count rendered visits, including returning after another route", () => {
  const { tracker, sent } = fixture();
  tracker.view("/projects/rishi");
  tracker.view("/projects/rishi"); // React effect replay must not double count.
  tracker.view("/contact");
  tracker.view("/projects/rishi");
  tracker.view("/projects/money-lending");
  tracker.view("/projects/unknown");
  assert.deepEqual(sent.map(({ payload }) => [payload.event, payload.properties.project_id]), [
    ["case_study_view", "rishi"], ["case_study_view", "rishi"], ["case_study_view", "money-lending"],
  ]);
});

test("résumé and contact activations record their channel and source without destination details", () => {
  const { tracker, sent } = fixture();
  tracker.click("/Farid-Matovu-Resume.pdf", "/", "home_hero");
  tracker.click("/contact", "/projects/rishi", "case_study");
  tracker.click("mailto:matovu90@gmail.com?body=private", "/contact", "contact");
  tracker.click("https://www.linkedin.com/in/matovu-farid/", "/contact", "contact");
  assert.deepEqual(sent.map(({ payload }) => [payload.event, payload.properties.channel, payload.properties.placement]), [
    ["resume_download", undefined, "home_hero"],
    ["contact_click", "contact_page", "case_study"],
    ["contact_click", "email", "contact"],
    ["contact_click", "linkedin", "contact"],
  ]);
  assert.ok(!JSON.stringify(sent).includes("matovu90"));
  assert.ok(!JSON.stringify(sent).includes("private"));
});

test("only authored destinations are tracked; external lookalikes and arbitrary mail are ignored", () => {
  const { tracker, sent } = fixture();
  for (const href of ["https://example.com/contact", "https://example.com/Farid-Matovu-Resume.pdf", "mailto:someone@example.com", "https://www.linkedin.com.evil.test/in/matovu-farid/", "https://www.linkedin.com/in/someone-else/", "#main-content", "/projects/rishi"]) {
    tracker.click(href, "/", "main");
  }
  assert.equal(sent.length, 0);
});

test("query strings, fragments, arbitrary route text and placement text never leave the browser", () => {
  const { tracker, sent } = fixture();
  tracker.view("/projects/rishi?email=private#secret");
  tracker.click("/contact?email=private#secret", "/projects?q=private#secret", "private");
  tracker.click("/Farid-Matovu-Resume.pdf", "/unexpected-private-value", "main");
  const wire = JSON.stringify(sent);
  assert.ok(!wire.includes("private"));
  assert.ok(!wire.includes("secret"));
  assert.deepEqual(sent.map(({ payload }) => payload.properties.page), ["/projects/rishi", "/projects", "other"]);
  assert.equal(sent[1].payload.properties.placement, "main");
});

test("transport is anonymous, does not send cookies/referrer, and survives navigation", () => {
  const { tracker, sent } = fixture();
  tracker.view("/projects/rishi");
  tracker.click("/contact", "/projects/rishi", "header");
  for (const { url, options, payload } of sent) {
    assert.equal(url, "https://us.i.posthog.com/i/v0/e/");
    assert.equal(options.method, "POST");
    assert.equal(options.keepalive, true);
    assert.equal(options.credentials, "omit");
    assert.equal(options.referrerPolicy, "no-referrer");
    assert.equal(payload.distinct_id, "anonymous-visit-id");
    assert.equal(payload.properties.$process_person_profile, false);
    assert.equal(payload.properties.$geoip_disable, true);
    assert.equal(payload.properties.$ip, "0.0.0.0");
    assert.equal(payload.properties.site, "portfolio");
  }
});

test("preview/dev, missing configuration, invalid host and privacy opt-outs send nothing", () => {
  for (const overrides of [{ enabled: false }, { token: "" }, { host: "https://example.com" }]) {
    const { tracker, sent } = fixture(overrides);
    tracker.view("/projects/rishi");
    tracker.click("/contact", "/", "header");
    assert.equal(sent.length, 0);
  }
  let optedOut = false;
  const { tracker, sent } = fixture({}, { optedOut: () => optedOut });
  tracker.view("/projects/rishi");
  optedOut = true;
  tracker.click("/contact", "/projects/rishi", "main");
  assert.equal(sent.length, 1);
});

test("failed or blocked analytics never throws into navigation", async () => {
  for (const send of [() => { throw new Error("blocked"); }, () => Promise.reject(new Error("offline"))]) {
    const { tracker } = fixture({}, { send });
    assert.doesNotThrow(() => tracker.view("/projects/rishi"));
    assert.doesNotThrow(() => tracker.click("/contact", "/", "header"));
    await new Promise((resolve) => setImmediate(resolve));
  }
});
