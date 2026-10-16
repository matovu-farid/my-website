import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.PORTFOLIO_AUDIT_URL ?? "http://localhost:3917";
const paths = ["/", "/projects", "/experience", "/contact", ...["rishi", "money-lending", "inventory-trade", "maria", "scrap-platform", "case-medinsurance", "apartment-manager"].map((id) => `/projects/${id}`)];
const cache = new Map();
async function read(path) {
  if (!cache.has(path)) cache.set(path, fetch(new URL(path, base), { signal: AbortSignal.timeout(45000) }).then(async (response) => {
    assert.equal(response.status, 200, path);
    return response.text();
  }));
  return cache.get(path);
}
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]?.replaceAll("&amp;", "&") ?? "";

test("every public page provides a focusable main-content bypass", async () => {
  for (const path of paths) {
    const html = await read(path);
    const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
    assert.equal(attr(anchors[0], "href"), "#main-content", `first link must bypass navigation: ${path}`);
    const mains = [...html.matchAll(/<main\b[^>]*>/g)].map((match) => match[0]);
    assert.equal(mains.length, 1, path);
    assert.equal(attr(mains[0], "id"), "main-content", path);
    assert.equal(attr(mains[0], "tabindex"), "-1", `skip target must accept focus: ${path}`);
  }
});

test("product images have responsive candidates and explicit display sizing", async () => {
  for (const path of ["/", "/projects", "/projects?page=2", "/projects/rishi", "/projects/money-lending", "/projects/apartment-manager"]) {
    const html = await read(path);
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]).filter((tag) => !attr(tag, "src").includes("fidexa-app-icon"));
    assert.ok(images.length, `missing product media: ${path}`);
    for (const tag of images) {
      assert.ok(attr(tag, "alt"), `product evidence needs an accessible description: ${path}`);
      assert.ok(attr(tag, "srcSet") || attr(tag, "srcset"), `missing responsive candidates: ${path}`);
      assert.ok(attr(tag, "sizes"), `missing display sizing: ${path}`);
      assert.ok(attr(tag, "width") && attr(tag, "height") || attr(tag, "data-nimg") === "fill", `media must reserve space: ${path}`);
    }
  }
});

test("project case-study links identify their destination", async () => {
  const html = await read("/projects");
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].filter((match) => match[2].includes("Case study"));
  assert.ok(links.length > 1);
  const names = links.map((match) => attr(match[1], "aria-label"));
  assert.ok(names.every((name) => name.startsWith("Case study:")), "case-study links need project-specific accessible names");
  assert.equal(new Set(names).size, names.length, "different projects must have distinct link names");
});

test("contact form protects messages before JavaScript is ready", async () => {
  const html = await read("/contact");
  const form = html.match(/<form\b[^>]*>/)?.[0] ?? "";
  assert.equal(attr(form, "method"), "post", "a message must never fall back to a GET query string");
  assert.match(html, /<button\b[^>]*type="submit"[^>]*disabled/, "submission must wait for the client handler");
  assert.match(html, /<noscript>[\s\S]*email link[\s\S]*<\/noscript>/, "readers without JavaScript need a direct contact alternative");
});

test("responsive image endpoint serves a smaller modern-format lending preview", async () => {
  const response = await fetch(new URL("/_next/image?url=%2Fprojects%2Fmoney-lending-showcase.png&w=384&q=75", base), { headers: { Accept: "image/webp" }, signal: AbortSignal.timeout(45000) });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/webp/);
  const optimized = await response.arrayBuffer();
  const originalResponse = await fetch(new URL("/projects/money-lending-showcase.png", base));
  assert.equal(originalResponse.status, 200);
  const original = await originalResponse.arrayBuffer();
  assert.ok(optimized.byteLength < original.byteLength / 2, `optimized preview ${optimized.byteLength} must be less than half of original ${original.byteLength}`);
});
