"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChangeAction,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChangeAction(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-secondary transition-colors text-foreground"
      >
        <ChevronLeft size={20} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChangeAction(page)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChangeAction(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-30 hover:bg-secondary transition-colors text-foreground"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
