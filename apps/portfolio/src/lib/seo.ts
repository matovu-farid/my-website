import type { Metadata } from "next";
import { site } from "../data/site";
import { allProjectsSorted, CATEGORY_LABELS, type Project } from "../data/projects";
import { catalogHref, projectRecordHref, ITEMS_PER_PAGE, type CatalogSelection } from "./catalog";

type Page = { path: string; title: string; description: string };
type Entity = { "@type": string; "@id": string; [key: string]: unknown };
const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const studioId = `${site.studio.url}/#organization`;

export function pageMetadata(page: Page): Metadata {
  const url = new URL(page.path, site.url).href;
  const image = { url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: `${site.name} — ${site.role}` };
  return {
    title: page.title, description: page.description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_UG", siteName: site.name, url, title: page.title, description: page.description, images: [image] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

function identity(): Entity[] {
  return [
    { "@type": "Person", "@id": personId, name: site.name, url: `${site.url}/`, jobTitle: site.role, description: site.description, sameAs: [...site.sameAs], worksFor: { "@id": studioId }, homeLocation: { "@type": "Place", name: site.location } },
    { "@type": "Organization", "@id": studioId, name: site.studio.name, url: `${site.studio.url}/`, founder: { "@id": personId } },
    { "@type": "WebSite", "@id": websiteId, name: site.name, url: `${site.url}/`, inLanguage: "en", publisher: { "@id": personId } },
  ];
}
const graph = (entities: Entity[]) => ({ "@context": "https://schema.org", "@graph": [...identity(), ...entities] });
function webpage(page: Page, type = "WebPage"): Entity {
  const url = new URL(page.path, site.url).href;
  return { "@type": type, "@id": `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: "en", isPartOf: { "@id": websiteId }, about: { "@id": personId } };
}
export function pageStructuredData(page: Page, type = "WebPage") {
  return graph([{ ...webpage(page, type), ...(type === "ProfilePage" ? { mainEntity: { "@id": personId } } : {}) }]);
}
export function catalogStructuredData(selection: CatalogSelection, projects: Project[], title: string, totalItems: number) {
  const path = catalogHref(selection);
  const listId = `${new URL(catalogHref({ ...selection, page: 1 }), site.url).href}#catalog`;
  const listName = `${selection.category === "all" ? "Projects" : CATEGORY_LABELS[selection.category]}${selection.query ? ` — Search: ${selection.query}` : ""} — Farid Matovu`;
  return graph([
    { ...webpage({ ...site.pages.projects, path, title }, "CollectionPage"), mainEntity: { "@id": listId } },
    { "@type": "ItemList", "@id": listId, name: listName, numberOfItems: totalItems,
      itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: (selection.page - 1) * ITEMS_PER_PAGE + index + 1, item: projectEntity(project) })) },
  ]);
}
function projectEntity(project: Project): Entity {
  const url = new URL(projectRecordHref(project), site.url).href;
  return {
    "@type": "CreativeWork", "@id": project.narrative ? `${url}#work` : url,
    name: project.title, description: project.description,
    url,
    creator: { "@id": personId }, keywords: project.technologies.join(", "),
    ...(project.imageUrl ? { image: new URL(project.imageUrl, site.url).href } : {}),
    ...(project.narrative ? { subjectOf: { "@id": `${url}#webpage` } } : {}),
  };
}
export function projectMetadata(project: Project) {
  return pageMetadata({ path: `/projects/${project.id}`, title: `${project.title} — Farid Matovu`, description: project.description });
}
export function projectStructuredData(project: Project) {
  const page = { path: `/projects/${project.id}`, title: `${project.title} — Farid Matovu`, description: project.description };
  return graph([{ ...webpage(page), mainEntity: { "@id": projectEntity(project)["@id"] } }, projectEntity(project)]);
}
export function publicPaths(): string[] {
  return [...Object.values(site.pages).map((page) => page.path), ...allProjectsSorted.filter((project) => project.narrative).map((project) => `/projects/${project.id}`)];
}
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
