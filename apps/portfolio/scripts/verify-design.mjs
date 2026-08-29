import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [css, home, projects, data, card, caseStudy, experience] = await Promise.all([
  read("src/app/globals.css"),
  read("src/app/page.tsx"),
  read("src/app/projects/page.tsx"),
  read("src/data/projects.ts"),
  read("src/components/project-card.tsx"),
  read("src/app/projects/[id]/case-study-content.tsx"),
  read("src/app/experience/page.tsx"),
]);

assert.match(css, /--ink:\s*#151821/i, "portfolio ink token is missing");
assert.match(css, /--paper:\s*#f7f4ee/i, "portfolio paper token is missing");
assert.match(css, /object-fit:\s*contain/i, "product media must preserve its native ratio");
assert.match(css, /aspect-ratio:\s*16\s*\/\s*10/i, "media needs a bounded responsive frame");
assert.match(home, /systems<\/em> that ship/i, "hero proposition is missing");
assert.match(home, /Client Solutions|What I build/i, "capability section is missing");
assert.match(home, /project-proof/i, "homepage needs evidence-first project proof");
assert.match(projects, /current projects|Work with a[\s\S]*point of view/i, "project index proposition is missing");
assert.match(card, /project-card-media/i, "project cards need a dedicated media frame");
assert.match(caseStudy, /case-study-media/i, "case studies need a dedicated media frame");
assert.match(experience, /Fidexa LLC/i, "experience page must include Fidexa");
assert.match(experience, /Founder.*Lead Developer/i, "Fidexa experience role is missing");
assert.match(experience, /https:\/\/www\.fidexa\.org\//i, "Fidexa experience link is missing");
assert.match(experience, /https:\/\/dabblelab\.com\//i, "Dabble Lab experience link is missing");
assert.match(experience, /https:\/\/www\.microverse\.org\//i, "Microverse experience link is missing");
assert.match(css, /@media \(max-width:\s*620px\)[\s\S]*\.detail-layout\s*\{\s*grid-template-columns:\s*1fr;/i, "experience cards must stack on mobile");
assert.match(
  css,
  /\.project-card-links\s+a\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center[^}]*white-space:\s*nowrap/i,
  "project card actions must keep icons and labels aligned as atomic links",
);
assert.match(data, /PORTFOLIO_EXCLUDED_IDS/i, "portfolio visibility policy is missing");
assert.doesNotMatch(data, /allProjectsSorted\s*=\s*\[\.\.\.projects\]/, "catalog must not expose retired toy projects by default");

console.log("Portfolio design contract passed");
