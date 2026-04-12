"use client";

import { Search } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onSearchChangeAction: (value: string) => void;
}

export default function ProjectSearch({
  value,
  onSearchChangeAction,
}: ProjectSearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onSearchChangeAction(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
      />
    </div>
  );
}
