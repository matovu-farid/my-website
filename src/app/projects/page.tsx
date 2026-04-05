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
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const isFiltering = search !== "" || category !== "all";

  const handleCategoryChange = (cat: Category | "all") => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12">
        <PageTransition>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-center">
            Projects
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            A curated selection of my work across different domains
          </p>

          {!isFiltering && (
            <section className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Featured
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured
                    index={i}
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            {!isFiltering && (
              <h2 className="text-xl font-semibold text-foreground mb-6">
                All Projects
              </h2>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <ProjectSearch
                  value={search}
                  onSearchChangeAction={handleSearchChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <CategoryFilter
                selected={category}
                onCategoryChangeAction={handleCategoryChange}
              />
            </div>

            {paginatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No projects found matching your search.
              </div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChangeAction={setPage}
            />
          </section>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
