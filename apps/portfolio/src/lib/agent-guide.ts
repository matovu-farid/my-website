import { projectRecordHref } from "./catalog";
import { experiences, education } from "../data/experience";
import { site } from "../data/site";
import { allProjectsSorted, homepageProjects, CATEGORY_LABELS } from "../data/projects";

export function agentGuide(full = false): string {
  const lines = [
    `# ${site.name}`, "", `> ${site.role}`, "", site.description, "",
    `Location: ${site.location}. Timezone: ${site.timezone}.`, `Availability: ${site.availability}.`,
    `Founder and Product Engineer at [Fidexa](${site.studio.url}/).`, "",
    "## Authoritative pages", "",
    ...Object.values(site.pages).map((page) => `- [${page.title}](${new URL(page.path, site.url).href}): ${page.description}`),
    `- [Download résumé PDF](${site.url}/Farid-Matovu-Resume.pdf).`,
    `- [Full profile and project guide](${site.url}/llms-full.txt).`,
    ...site.sameAs.map((url) => `- [Verified public profile](${url}).`), "",
    "## Reading the evidence", "",
    "Project descriptions distinguish shipped products, earlier prototypes, source repositories, and public showcases. Access to operational workspaces may require sign-in.",
    "Rishi is publicly available for iPhone, iPad, and Mac. CarPlay and connected Apple Watch are codebase integrations, not public releases. Android is planned, not released.",
    "Apartment Manager accounting figures remain provisional when source reconciliation is pending.", "",
  ];
  if (!full) {
    lines.push("## Selected work", "", ...homepageProjects.map((project) => `- [${project.title}](${site.url}/projects/${project.id}): ${project.description}`), "");
  } else {
    lines.push("## Professional experience", "");
    for (const experience of experiences) lines.push(`### ${experience.position} — ${experience.company}`, "", experience.period, "", experience.description, "");
    lines.push("## Education", "", `${education.degree} — ${education.institution}. ${education.period}.`, "");
    lines.push(`## Public project catalog (${allProjectsSorted.length} projects)`, "");
    for (const project of allProjectsSorted) {
      lines.push(`### ${project.title}`, "", project.longDescription, "", `Category: ${CATEGORY_LABELS[project.category]}.`, `Technologies: ${project.technologies.join(", ")}.`);
      if (project.narrative) lines.push(`- [Case study](${site.url}/projects/${project.id}).`, "", project.narrative);
      else lines.push(`- [Catalog record](${new URL(projectRecordHref(project), site.url).href}).`);
      if (project.story) lines.push("", `Situation: ${project.story.situation}`, `My approach: ${project.story.decision}`, `Delivered: ${project.story.delivered}`, `Media provenance: ${project.story.caption}`);
      if (project.keyDecisions) lines.push("", "Engineering decisions:", ...project.keyDecisions.map((decision) => `- ${decision}`));
      for (const [label, url] of [["Source repository", project.githubUrl], ["Public product or showcase", project.liveUrl], ["Product website", project.productUrl], ["App Store", project.appStoreUrl], ["Walkthrough", project.videoUrl]]) {
        if (url) lines.push(`- [${label}](${url}).`);
      }
      lines.push("");
    }
  }
  return lines.join("\n");
}
