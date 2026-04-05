"use client";

import { motion } from "motion/react";
import type { Category } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

interface CategoryFilterProps {
  selected: Category | "all";
  onCategoryChangeAction: (category: Category | "all") => void;
}

const categories: (Category | "all")[] = [
  "all",
  "ai-automation",
  "cross-platform",
  "web-apps",
  "dev-tools",
];

export default function CategoryFilter({
  selected,
  onCategoryChangeAction,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChangeAction(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
        </motion.button>
      ))}
    </div>
  );
}
