import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.PORTFOLIO_AUDIT_URL ?? "http://localhost:3917";
const origin = "https://matovu-farid.com";
const caseIds = ["rishi", "money-lending", "inventory-trade", "maria", "scrap-platform", "case-medinsurance", "apartment-manager"];
const cache = new Map();

test("production redirects resolve directly to the apex canonical host", {
  skip: new URL(base).hostname !== new URL(origin).hostname,
}, async () => {
  const paths = ["/", "/projects", "/experience", "/contact", ...caseIds.map((id) => `/projects/${id}`), "/projects?category=web-apps&page=2", "/llms.txt", "/sitemap.xml"];
  for (const path of paths) {
    const apex = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(45000) });
    assert.equal(apex.status, 200, `canonical destination must serve directly: ${path}`);
    await apex.arrayBuffer();
    const alternate = new URL(path, origin);
    alternate.hostname = `www.${alternate.hostname}`;
    const redirect = await fetch(alternate, { redirect: "manual", signal: AbortSignal.timeout(45000) });
    assert.equal(redirect.status, 308, `www must permanently redirect: ${path}`);
    assert.equal(redirect.headers.get("location"), new URL(path, origin).href, "redirect must preserve path and query");
    await redirect.arrayBuffer();
  }
});
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
function attr(tag, name) {
  return decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "");
}
function metadata(html, key) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0]).find((tag) => attr(tag, "name") === key || attr(tag, "property") === key);
  return tag ? attr(tag, "content") : "";
}
function canonical(html) {
  return attr([...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).find((tag) => attr(tag, "rel") === "canonical") ?? "", "href");
}
function schema(html) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter((m) => attr(m[1], "type") === "application/ld+json");
  assert.equal(scripts.length, 1, "each route owns exactly one JSON-LD script");
  return JSON.parse(scripts[0][2]);
}
async function read(path) {
  if (!cache.has(path)) cache.set(path, (async () => {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(45000) });
    return { response, body: await response.text() };
  })());
  return cache.get(path);
}

for (const path of ["/", "/projects", "/experience", "/contact", ...caseIds.map((id) => `/projects/${id}`)]) {
  test(`canonical metadata and server-rendered schema: ${path}`, async () => {
    const { response, body } = await read(path);
    assert.equal(response.status, 200);
    assert.equal(new URL(canonical(body)).href, new URL(path, origin).href);
    assert.match(metadata(body, "description"), /\S.{30}/);
    assert.equal(metadata(body, "og:url"), canonical(body));
    assert.match(metadata(body, "og:image"), /^https:\/\/matovu-farid\.com\/opengraph-image/);
    assert.equal(metadata(body, "twitter:card"), "summary_large_image");
    const graph = schema(body)["@graph"];
    assert.ok(Array.isArray(graph));
    const person = graph.find((item) => item["@type"] === "Person");
    assert.equal(person["@id"], origin + "/#person");
    assert.equal(person.name, "Farid Matovu");
    assert.ok(person.sameAs.includes("https://github.com/matovu-farid"));
    assert.ok(graph.some((item) => item["@id"] === person.worksFor["@id"] && item.name === "Fidexa"));
    assert.doesNotMatch(body, /<div[^>]*style="[^"]*opacity:\s*0(?:;|")/, "content must be visible before JavaScript");
  });
}

test("top-level pages have distinct titles and descriptions", async () => {
  const pages = await Promise.all(["/", "/projects", "/experience", "/contact"].map(read));
  assert.equal(new Set(pages.map(({ body }) => body.match(/<title>(.*?)<\/title>/)?.[1])).size, 4);
  assert.equal(new Set(pages.map(({ body }) => metadata(body, "description"))).size, 4);
});

test("robots advertises the production sitemap and allows public reads", async () => {
  const { response, body } = await read("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(body, /User-Agent: \*/i);
  assert.match(body, /Allow: \//i);
  assert.match(body, /Sitemap: https:\/\/matovu-farid\.com\/sitemap.xml/);
});

test("sitemap lists exactly the public routes and published case studies", async () => {
  const { response, body } = await read("/sitemap.xml");
  assert.equal(response.status, 200);
  const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
  assert.deepEqual(new Set(urls), new Set(["/", "/projects", "/experience", "/contact", ...caseIds.map((id) => `/projects/${id}`)].map((p) => origin + p)));
  assert.equal(urls.length, new Set(urls).size);
});

test("share image is a real 1200 by 630 PNG", async () => {
  const response = await fetch(new URL("/opengraph-image", base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
});

for (const path of ["/llms.txt", "/llms-full.txt"]) {
  test(`public reading guide: ${path}`, async () => {
    const { response, body } = await read(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/plain;\s*charset=utf-8/i);
    for (const url of ["/projects", "/experience", "/contact", "/Farid-Matovu-Resume.pdf"]) assert.ok(body.includes(origin + url));
    assert.match(body, /7\+ years/);
    assert.match(body, /GMT\+3/);
    assert.match(body, /senior remote/i);
    assert.doesNotMatch(body, /\/Users\/|job-applications|campaign|RESEND_API_KEY|BEGIN PRIVATE KEY/i);
    if (path === "/llms-full.txt") {
      for (const id of caseIds) assert.ok(body.includes(`${origin}/projects/${id}`), `missing ${id}`);
      assert.match(body, /Android is planned, not released/);
      assert.match(body, /provisional/);
      for (const name of ["Dabble Lab", "FEMME Agencies", "Microverse", "Kyambogo University"]) assert.ok(body.includes(name));
      assert.doesNotMatch(body, /### (Painter|Stocks App|Space Travellers|Apartment Manager \(Rails\))/);
      assert.match(body, /https:\/\/youtu.be\/vcWcpEGsof8/);
    }
  });
}

test("category selection returns filtered HTML and real navigation links", async () => {
  const { body } = await read("/projects?category=native-apps");
  assert.match(body, /1 project(?:s)? in view/);
  assert.match(body, /<h2[^>]*>Rishi<\/h2>/);
  assert.doesNotMatch(body, /<h2[^>]*>Maria<\/h2>/);
  assert.equal(canonical(body), origin + "/projects?category=native-apps");
  assert.match(body, /<a[^>]*href="\/projects\?category=web-apps"/);
  const list = schema(body)["@graph"].find((item) => item["@type"] === "ItemList");
  assert.equal(list.numberOfItems, 1);
  assert.equal(list.itemListElement[0].item.name, "Rishi");
});

test("pagination serves distinct HTML, canonical URLs, and usable links", async () => {
  const first = (await read("/projects")).body;
  const second = (await read("/projects?page=2")).body;
  assert.equal(canonical(second), origin + "/projects?page=2");
  assert.match(first, /<a[^>]*href="\/projects\?page=2"/);
  assert.doesNotMatch(first, /<h2[^>]*>Apartment Manager<\/h2>/);
  assert.match(second, /<h2[^>]*>Apartment Manager<\/h2>/);
  assert.match(second, /aria-current="page"/);
});

test("native GET search preserves category and renders results without JavaScript", async () => {
  const { body } = await read("/projects?category=web-apps&q=rent");
  assert.match(body, /<form[^>]*action="\/projects"[^>]*method="get"/i);
  assert.match(body, /<input[^>]*name="q"/);
  assert.match(body, /<input[^>]*name="category"[^>]*value="web-apps"/);
  assert.match(body, /<h2[^>]*>Apartment Manager<\/h2>/);
  assert.doesNotMatch(body, /<h2[^>]*>Rishi<\/h2>/);
  assert.match(metadata(body, "robots"), /noindex/);
  assert.match(body, /Clear filters/);
});

test("empty searches and invalid page/category inputs recover predictably", async () => {
  const empty = (await read("/projects?q=no-matching-project&page=999")).body;
  assert.match(empty, /No projects found/);
  const invalid = (await read("/projects?category=unknown&page=-1")).body;
  assert.equal(canonical(invalid), origin + "/projects");
  assert.match(invalid, /13 projects in view/);
  const huge = (await read("/projects?page=99999999999999999999999")).body;
  assert.equal(canonical(huge), origin + "/projects?page=3");
  const xss = (await read("/projects?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E")).body;
  assert.doesNotMatch(xss, /<script>alert\(1\)<\/script>/);
});

test("retired or unknown case studies remain 404 and noindex", async () => {
  for (const id of ["painter", "does-not-exist"]) {
    const { response, body } = await read(`/projects/${id}`);
    assert.equal(response.status, 404);
    assert.match(metadata(body, "robots"), /noindex/);
  }
});


test("catalog-only records link to the page containing their stable anchor", async () => {
  const { body: guide } = await read("/llms-full.txt");
  const links = [...guide.matchAll(/\[Catalog record\]\((https:\/\/matovu-farid\.com[^)]+)\)/g)].map((match) => new URL(match[1]));
  assert.equal(links.length, 6);
  for (const url of links) {
    const { body } = await read(url.pathname + url.search);
    assert.ok(body.includes(`id="${url.hash.slice(1)}"`), `missing anchor ${url.href}`);
  }
});

test("paginated schema reports the whole list with globally ordered visible entries", async () => {
  const first = schema((await read("/projects")).body)["@graph"].find((item) => item["@type"] === "ItemList");
  const second = schema((await read("/projects?page=2")).body)["@graph"].find((item) => item["@type"] === "ItemList");
  assert.equal(first["@id"], second["@id"]);
  assert.equal(second.numberOfItems, 13);
  assert.deepEqual(second.itemListElement.map((item) => item.position), [7, 8, 9, 10, 11, 12]);
});
