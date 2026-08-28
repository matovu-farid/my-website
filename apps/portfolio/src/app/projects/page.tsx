"use client";

import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import ProjectCard from "@/components/project-card";
import ProjectSearch from "@/components/project-search";
import CategoryFilter from "@/components/category-filter";
import Pagination from "@/components/pagination";
import { featuredProjects, allProjectsSorted } from "@/data/projects";
import type { Category } from "@/data/projects";

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase();
    return allProjectsSorted.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch = !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const isFiltering = search !== "" || category !== "all";

  const handleCategoryChange = (cat: Category | "all") => { setCategory(cat); setPage(1); };
  const handleSearchChange = (value: string) => { setSearch(value); setPage(1); };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageTransition>
          <section className="page-hero">
            <div className="site-shell">
              <p className="eyebrow eyebrow-light">02 / Project index</p>
              <h1>Work with a<br />point of view.</h1>
              <p>Products, platforms, and the systems between them. Start with selected work, then search the wider catalog.</p>
            </div>
          </section>
          <section className="site-shell page-content">
            {!isFiltering && <div className="project-proof-grid" style={{ marginBottom: "5rem" }}>
              {featuredProjects.slice(0, 3).map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </div>}
            <div className="filter-bar">
              <ProjectSearch value={search} onSearchChangeAction={handleSearchChange} />
              <span className="catalog-note" style={{ margin: 0 }}>{filteredProjects.length} projects in view</span>
            </div>
            <CategoryFilter selected={category} onCategoryChangeAction={handleCategoryChange} />
            <div style={{ marginTop: "1.5rem" }}>
              {paginatedProjects.length > 0 ? (
                <div className="index-grid">
                  {paginatedProjects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
                </div>
              ) : <div className="empty-state">No projects found matching your search.</div>}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChangeAction={setPage} />
          </section>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
