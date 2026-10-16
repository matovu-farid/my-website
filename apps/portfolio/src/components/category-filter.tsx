import Link from "next/link";
import { CATEGORY_LABELS, type Category } from "@/data/projects";
import { catalogHref, type CatalogSelection } from "@/lib/catalog";

export default function CategoryFilter({ selection }: { selection: CatalogSelection }) {
  const categories: (Category | "all")[] = ["all", ...Object.keys(CATEGORY_LABELS) as Category[]];
  return (
    <nav className="filter-pills" aria-label="Project categories">
      {categories.map((category) => (
        <Link key={category} href={catalogHref({ category, query: selection.query })} className="filter-pill" data-active={selection.category === category} aria-current={selection.category === category ? "true" : undefined}>
          {category === "all" ? "All" : CATEGORY_LABELS[category]}
        </Link>
      ))}
    </nav>
  );
}
