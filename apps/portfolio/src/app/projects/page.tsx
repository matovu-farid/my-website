import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import ProjectSearch from "@/components/project-search";
import CategoryFilter from "@/components/category-filter";
import Pagination from "@/components/pagination";
import StructuredData from "@/components/structured-data";
import { CATEGORY_LABELS } from "@/data/projects";
import { site } from "@/data/site";
import { readCatalog, catalogHref, type CatalogParams } from "@/lib/catalog";
import { catalogStructuredData, pageMetadata } from "@/lib/seo";

type PageProps = { searchParams: Promise<CatalogParams> };
function catalogTitle(catalog: ReturnType<typeof readCatalog>) {
  const category = catalog.category === "all" ? "Projects" : `${CATEGORY_LABELS[catalog.category]} — Projects`;
  return `${catalog.query ? `Search: ${catalog.query} — ` : ""}${category}${catalog.page > 1 ? ` — Page ${catalog.page}` : ""} — Farid Matovu`;
}
export async function generateMetadata({ searchParams }: PageProps) {
  const catalog = readCatalog(await searchParams);
  return {
    ...pageMetadata({ ...site.pages.projects, title: catalogTitle(catalog), path: catalogHref(catalog) }),
    ...(catalog.query ? { robots: { index: false, follow: true } } : {}),
  };
}
export default async function Projects({ searchParams }: PageProps) {
  const catalog = readCatalog(await searchParams);
  const isFiltering = catalog.query !== "" || catalog.category !== "all";
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StructuredData data={catalogStructuredData(catalog, catalog.visibleProjects, catalogTitle(catalog), catalog.projects.length)} />
        <section className="page-hero"><div className="site-shell">
          <h1>Work with a<br />point of view.</h1>
          <p>Products, platforms, and the systems between them. Explore the catalog by product, technology, or type of work.</p>
        </div></section>
        <section className="site-shell page-content">
          <div className="filter-bar">
            <ProjectSearch selection={catalog} />
            <span className="catalog-note" style={{ margin: 0 }}>{`${catalog.projects.length} project${catalog.projects.length === 1 ? "" : "s"} in view`}</span>
          </div>
          <CategoryFilter selection={catalog} />
          {isFiltering && <Link href="/projects" className="catalog-reset">Clear filters</Link>}
          <div style={{ marginTop: "1.5rem" }}>
            {catalog.visibleProjects.length ? <div className="index-grid">{catalog.visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-state">No projects found matching your search. Try another term or clear the filters.</div>}
          </div>
          <Pagination selection={catalog} totalPages={catalog.totalPages} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
