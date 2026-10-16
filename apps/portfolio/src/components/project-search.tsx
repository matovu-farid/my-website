import type { CatalogSelection } from "@/lib/catalog";

export default function ProjectSearch({ selection }: { selection: CatalogSelection }) {
  return (
    <form action="/projects" method="get" role="search" className="project-search">
      {selection.category !== "all" && <input type="hidden" name="category" value={selection.category} />}
      <label htmlFor="project-query" className="sr-only">Search projects</label>
      <input key={selection.query} id="project-query" name="q" type="search" placeholder="Search the catalog..." defaultValue={selection.query} maxLength={200} />
      <button type="submit" className="button-primary">Search</button>
    </form>
  );
}
