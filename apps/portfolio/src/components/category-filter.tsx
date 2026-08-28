"use client";

import type { Category } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CategoryFilterProps {
  selected: Category | "all";
  onCategoryChangeAction: (category: Category | "all") => void;
}

const categories: (Category | "all")[] = [
  "all",
  "ai-automation",
  "native-apps",
  "cross-platform",
  "web-apps",
  "dev-tools",
];

export default function CategoryFilter({
  selected,
  onCategoryChangeAction,
}: CategoryFilterProps) {
  return (
    <div className="filter-pills">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChangeAction(cat)}
          className="filter-pill"
          data-active={selected === cat}
        >
          {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
