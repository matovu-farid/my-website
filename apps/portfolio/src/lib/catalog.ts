import { allProjectsSorted, CATEGORY_LABELS, type Category, type Project } from "../data/projects";

export type CatalogParams = Record<string, string | string[] | undefined>;
export type CatalogSelection = { category: Category | "all"; query: string; page: number };
export const ITEMS_PER_PAGE = 6;
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export function readCatalog(params: CatalogParams) {
  const candidate = first(params.category);
  const category: Category | "all" = Object.hasOwn(CATEGORY_LABELS, candidate) ? candidate as Category : "all";
  const query = first(params.q).trim().slice(0, 200);
  const needle = query.toLowerCase();
  const projects = allProjectsSorted.filter((project) =>
    (category === "all" || project.category === category) &&
    (!needle || [project.title, project.description, ...project.technologies].some((text) => text.toLowerCase().includes(needle)))
  );
  const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const rawPage = first(params.page);
  const requestedPage = /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const page = Math.max(1, Math.min(requestedPage, totalPages));
  return { category, query, page, projects, totalPages, visibleProjects: projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) };
}

export function catalogHref(selection: Partial<CatalogSelection> = {}): string {
  const params = new URLSearchParams();
  if (selection.category && selection.category !== "all") params.set("category", selection.category);
  if (selection.query) params.set("q", selection.query);
  if (selection.page && selection.page > 1) params.set("page", String(selection.page));
  const query = params.toString();
  return `/projects${query ? `?${query}` : ""}`;
}

// Catalog-only entries need a URL that contains their card, including pagination.
export function projectRecordHref(project: Project): string {
  if (project.narrative) return `/projects/${project.id}`;
  const index = allProjectsSorted.findIndex((entry) => entry.id === project.id);
  return `${catalogHref({ page: Math.floor(index / ITEMS_PER_PAGE) + 1 })}#project-${project.id}`;
}
