import assert from "node:assert/strict";
import { test } from "node:test";
import { createEngagementTracker, notifyContactFormResult } from "../src/lib/engagement-analytics.ts";

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

test("only a confirmed form success signals a submission, with no form or provider data", () => {
  const { tracker, sent } = fixture();
  const notify = () => tracker.contactSubmitted();
  notifyContactFormResult({ success: false, message: "Provider rejected the message" }, notify);
  assert.equal(sent.length, 0);
  notifyContactFormResult({ success: true, name: "Private name", email: "private@example.com", message: "Private message", id: "provider-id" }, notify);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].payload.event, "contact_form_submitted");
  assert.deepEqual(sent[0].payload.properties, {
    page: "/contact", channel: "form", environment: "production", site: "portfolio",
    $process_person_profile: false, $geoip_disable: true, $ip: "0.0.0.0",
  });
  assert.ok(!JSON.stringify(sent).includes("Private"));
  assert.ok(!JSON.stringify(sent).includes("private@example.com"));
  assert.ok(!JSON.stringify(sent).includes("provider-id"));
});

test("submission tracking preserves privacy controls and never breaks the success flow", () => {
  for (const overrides of [{ enabled: false }, { token: "" }]) {
    const { tracker, sent } = fixture(overrides);
    tracker.contactSubmitted();
    assert.equal(sent.length, 0);
  }
  const { tracker, sent } = fixture({}, { optedOut: () => true });
  tracker.contactSubmitted();
  assert.equal(sent.length, 0);
  assert.doesNotThrow(() => notifyContactFormResult({ success: true }, () => { throw new Error("analytics unavailable"); }));
});

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

function sharedBrowser() {
  const values = new Map();
  let now = Date.parse("2026-10-17T09:00:00Z");
  let sequence = 0;
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const dependencies = {
    storage: () => storage,
    now: () => now,
    uuid: () => `00000000-0000-4000-8000-${String(++sequence).padStart(12, "0")}`,
  };
  return { values, storage, dependencies, advance: (ms) => { now += ms; } };
}

test("one anonymous browser connects the funnel across reloads and new tabs", () => {
  const browser = sharedBrowser();
  const study = fixture({}, browser.dependencies);
  study.tracker.view("/projects/rishi");
  const reload = fixture({}, browser.dependencies);
  reload.tracker.click("/contact", "/projects/rishi", "case_study");
  const newTab = fixture({}, browser.dependencies);
  newTab.tracker.contactSubmitted();
  const events = [...study.sent, ...reload.sent, ...newTab.sent];
  assert.equal(new Set(events.map(({ payload }) => payload.distinct_id)).size, 1);
  assert.equal(browser.values.size, 1);
  const record = JSON.parse([...browser.values.values()][0]);
  assert.deepEqual(Object.keys(record).sort(), ["expiresAt", "id"]);
  assert.equal(record.id, events[0].payload.distinct_id);
  assert.equal(record.expiresAt, Date.parse("2026-11-16T09:00:00Z"));
  // Separate browsers use their own random generator; inject a distinct UUID here.
  const independent = fixture({}, { ...sharedBrowser().dependencies, uuid: () => "11111111-1111-4111-8111-111111111111" });
  independent.tracker.contactSubmitted();
  assert.notEqual(independent.sent[0].payload.distinct_id, events[0].payload.distinct_id);
});

test("the browser ID expires after 30 days without extending on activity, even in an open tab", () => {
  const browser = sharedBrowser();
  const { tracker, sent } = fixture({}, browser.dependencies);
  tracker.view("/projects/rishi");
  const original = [...browser.values.values()][0];
  browser.advance(29 * 24 * 60 * 60 * 1000);
  tracker.click("/contact", "/projects/rishi", "main");
  assert.equal([...browser.values.values()][0], original);
  browser.advance(24 * 60 * 60 * 1000);
  tracker.contactSubmitted();
  assert.equal(sent[0].payload.distinct_id, sent[1].payload.distinct_id);
  assert.notEqual(sent[0].payload.distinct_id, sent[2].payload.distinct_id);
  const reload = fixture({}, browser.dependencies);
  reload.tracker.contactSubmitted();
  assert.equal(reload.sent[0].payload.distinct_id, sent[2].payload.distinct_id);
});

test("clearing storage resets the ID, including in an already open tab", () => {
  const browser = sharedBrowser();
  const { tracker, sent } = fixture({}, browser.dependencies);
  tracker.view("/projects/rishi");
  browser.values.clear();
  tracker.contactSubmitted();
  assert.notEqual(sent[0].payload.distinct_id, sent[1].payload.distinct_id);
});

test("malformed, expired and non-random stored identities never enter payloads", () => {
  const invalidRecords = [
    "broken-json", "null",
    JSON.stringify({ id: "private@example.com", expiresAt: 1794823200000 }),
    JSON.stringify({ id: "00000000-0000-4000-8000-000000000001", expiresAt: 0 }),
    JSON.stringify({ id: "00000000-0000-4000-8000-000000000001", expiresAt: 9999999999999 }),
    JSON.stringify({ id: "00000000-0000-4000-8000-000000000001", expiresAt: "1794823200000" }),
  ];
  for (const raw of invalidRecords) {
    const browser = sharedBrowser();
    const initial = fixture({}, browser.dependencies);
    initial.tracker.contactSubmitted();
    const key = [...browser.values.keys()][0];
    browser.values.set(key, raw);
    const next = fixture({}, browser.dependencies);
    next.tracker.contactSubmitted();
    assert.equal(next.sent.length, 1);
    assert.match(next.sent[0].payload.distinct_id, /^[0-9a-f-]{36}$/);
    assert.notEqual(next.sent[0].payload.distinct_id, initial.sent[0].payload.distinct_id);
    assert.ok(!JSON.stringify(next.sent).includes("private@example.com"));
    assert.equal(browser.values.size, 1);
  }
});

test("opt-out removes the browser ID and never reads or writes identity storage", () => {
  const browser = sharedBrowser();
  let optedOut = false;
  const { tracker, sent } = fixture({}, { ...browser.dependencies, optedOut: () => optedOut });
  tracker.view("/projects/rishi");
  optedOut = true;
  tracker.contactSubmitted();
  assert.equal(browser.values.size, 0);
  assert.equal(sent.length, 1);
  let identityAccesses = 0;
  let removals = 0;
  const optedOutReload = fixture({}, {
    ...browser.dependencies, optedOut: () => true,
    storage: () => ({
      getItem: () => { identityAccesses++; return null; },
      setItem: () => { identityAccesses++; },
      removeItem: () => { removals++; },
    }),
  });
  optedOutReload.tracker.contactSubmitted();
  assert.equal(optedOutReload.sent.length, 0);
  assert.equal(identityAccesses, 0);
  assert.ok(removals > 0);
  optedOut = false;
  tracker.contactSubmitted();
  assert.notEqual(sent[0].payload.distinct_id, sent[1].payload.distinct_id);
});

test("disabled configuration never touches storage", () => {
  for (const overrides of [{ enabled: false }, { token: "" }, { host: "https://example.com" }]) {
    let touched = false;
    const { tracker, sent } = fixture(overrides, { storage: () => { touched = true; throw new Error("unavailable"); } });
    tracker.contactSubmitted();
    assert.equal(touched, false);
    assert.equal(sent.length, 0);
  }
});

test("unavailable or read-only storage falls back to a stable temporary ID", () => {
  for (const storage of [
    () => { throw new Error("storage denied"); },
    () => ({ getItem: () => null, setItem: () => { throw new Error("quota"); }, removeItem: () => { throw new Error("denied"); } }),
  ]) {
    const browser = sharedBrowser();
    const { tracker, sent } = fixture({}, { ...browser.dependencies, storage });
    tracker.view("/projects/rishi");
    tracker.click("/contact", "/projects/rishi", "main");
    tracker.contactSubmitted();
    assert.equal(sent.length, 3);
    assert.equal(new Set(sent.map(({ payload }) => payload.distinct_id)).size, 1);
    assert.equal(browser.values.size, 0);
  }
});
