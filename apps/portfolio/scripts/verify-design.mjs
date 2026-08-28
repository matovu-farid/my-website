import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [css, home, projects, data, card, caseStudy] = await Promise.all([
  read("src/app/globals.css"),
  read("src/app/page.tsx"),
  read("src/app/projects/page.tsx"),
  read("src/data/projects.ts"),
  read("src/components/project-card.tsx"),
  read("src/app/projects/[id]/case-study-content.tsx"),
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
assert.match(data, /PORTFOLIO_EXCLUDED_IDS/i, "portfolio visibility policy is missing");
assert.doesNotMatch(data, /allProjectsSorted\s*=\s*\[\.\.\.projects\]/, "catalog must not expose retired toy projects by default");

console.log("Portfolio design contract passed");
