import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const readBuffer = (url) => readFile(url);
const exists = async (path) => access(new URL(path, root)).then(() => true).catch(() => false);

const [css, home, projects, data, card, caseStudy, experience, layout, header, contact, sendEmail, vercelAsset, faviconFile, appIcon, appleIcon, rootResume, publicResume] = await Promise.all([
  read("src/app/globals.css"),
  read("src/app/page.tsx"),
  read("src/app/projects/page.tsx"),
  read("src/data/projects.ts"),
  read("src/components/project-card.tsx"),
  read("src/app/projects/[id]/case-study-content.tsx"),
  read("src/app/experience/page.tsx"),
  read("src/app/layout.tsx"),
  read("src/components/header.tsx"),
  read("src/app/contact/page.tsx"),
  read("src/actions/send-email.ts"),
  exists("public/vercel.svg"),
  exists("src/app/favicon.ico"),
  exists("src/app/icon.svg"),
  exists("src/app/apple-icon.png"),
  readBuffer(new URL("../../resume.pdf", root)),
  readBuffer(new URL("public/Farid-Matovu-Resume.pdf", root)),
]);

assert.match(css, /--ink:\s*#151821/i, "portfolio ink token is missing");
assert.match(css, /--paper:\s*#f7f4ee/i, "portfolio paper token is missing");
assert.match(css, /object-fit:\s*contain/i, "product media must preserve its native ratio");
assert.match(css, /aspect-ratio:\s*16\s*\/\s*10/i, "media needs a bounded responsive frame");
assert.match(home, /systems<\/em> that ship/i, "hero proposition is missing");
assert.match(home, /Client Solutions|What I build/i, "capability section is missing");
assert.match(home, /project-proof/i, "homepage needs evidence-first project proof");
assert.match(home, /7\+ years of non-overlapping professional software delivery/i, "hero introduction must state the canonical experience claim");
assert.match(home, /<a\s+href="\/Farid-Matovu-Resume\.pdf"[^>]*download/i, "homepage must provide a resume download anchor");
assert.match(projects, /current projects|Work with a[\s\S]*point of view/i, "project index proposition is missing");
assert.match(card, /project-card-media/i, "project cards need a dedicated media frame");
assert.match(caseStudy, /case-study-media/i, "case studies need a dedicated media frame");
assert.match(experience, /Fidexa LLC/i, "experience page must include Fidexa");
assert.match(experience, /Founder and Product Engineer/i, "Fidexa experience role must use the canonical title");
assert.match(experience, /FEMME Agencies/i, "experience page must include FEMME Agencies");
assert.match(experience, /Bachelor of Engineering \(BE\), Civil Engineering/i, "experience page must include the Civil Engineering degree");
assert.match(experience, /https:\/\/www\.fidexa\.org\//i, "Fidexa experience link is missing");
assert.match(experience, /https:\/\/dabblelab\.com\//i, "Dabble Lab experience link is missing");
assert.match(experience, /https:\/\/www\.microverse\.org\//i, "Microverse experience link is missing");
assert.match(layout, /export const metadata(?:\s*:\s*Metadata)?\s*=\s*\{[\s\S]*Farid Matovu/i, "portfolio metadata must be defined in the root layout");
assert.match(header, /src="\/fidexa-app-icon\.svg"/i, "portfolio header must use the Fidexa mark");
assert.match(contact, /role="dialog"/i, "contact success must use an accessible dialog");
assert.match(contact, /Thanks for reaching out\./i, "contact success copy is missing");
assert.match(contact, /aria-modal="true"/i, "contact success dialog must be modal");
assert.match(contact, /Escape|keydown/i, "contact success dialog must support keyboard dismissal");
assert.match(sendEmail, /from:\s*["']Fidexa Contact <contact@fidexa\.org>["']/i, "contact form must send from the verified Fidexa domain");
assert.match(sendEmail, /replyTo:\s*email/i, "contact form must preserve the sender as reply-to");
assert.match(sendEmail, /const\s*\{\s*data,\s*error\s*\}\s*=\s*await resend\.emails\.send/i, "contact form must inspect Resend's response");
assert.match(sendEmail, /if\s*\(error\s*\|\|/i, "contact form must report Resend delivery errors");
assert.equal(vercelAsset, false, "unused Vercel logo asset must be removed");
assert.equal(faviconFile, true, "canonical Next.js Fidexa favicon must be available in app/");
assert.equal(appIcon, true, "canonical Next.js Fidexa app icon must be available in app/");
assert.equal(appleIcon, true, "canonical Next.js Fidexa Apple icon must be available in app/");
assert.equal(rootResume.equals(publicResume), true, "public resume PDF must match the verified root resume PDF");
assert.match(css, /@media \(max-width:\s*620px\)[\s\S]*\.detail-layout\s*\{\s*grid-template-columns:\s*1fr;/i, "experience cards must stack on mobile");
assert.match(
  css,
  /\.project-card-links\s+a\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center[^}]*white-space:\s*nowrap/i,
  "project card actions must keep icons and labels aligned as atomic links",
);
assert.match(data, /PORTFOLIO_EXCLUDED_IDS/i, "portfolio visibility policy is missing");
assert.doesNotMatch(data, /allProjectsSorted\s*=\s*\[\.\.\.projects\]/, "catalog must not expose retired toy projects by default");

const rishiStart = data.indexOf('id: "rishi"');
const rishiEnd = data.indexOf('id: "money-lending"');
assert.notEqual(rishiStart, -1, "Rishi project data is missing");
assert.notEqual(rishiEnd, -1, "money-lending project data is missing");
const rishi = data.slice(rishiStart, rishiEnd);

assert.match(rishi, /App Store for iPhone, iPad, and Mac/i, "Rishi public release must be limited to iPhone, iPad, and Mac");
assert.match(rishi, /CarPlay and connected Apple Watch.*codebase integrations/i, "Rishi connected-platform work must be described as codebase integrations");
assert.match(rishi, /Android is planned, not released/i, "Rishi Android status must remain planned, not released");
assert.doesNotMatch(rishi, /(?:public|production) (?:release|app)[^.!?]*Android|Android[^.!?]*(?:public|production) (?:release|app)/i, "Rishi must not claim an Android public release");
assert.doesNotMatch(rishi, /Electron|React Native|Windows|Linux/i, "Rishi must not inherit earlier cross-platform prototype claims");

console.log("Portfolio design contract passed");
