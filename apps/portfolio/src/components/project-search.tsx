"use client";


interface ProjectSearchProps {
  value: string;
  onSearchChangeAction: (value: string) => void;
}

export default function ProjectSearch({
  value,
  onSearchChangeAction,
}: ProjectSearchProps) {
  return (
    <div>
      <input
        type="text"
        aria-label="Search projects"
        placeholder="Search the catalog..."
        value={value}
        onChange={(e) => onSearchChangeAction(e.target.value)}
        className=""
      />
    </div>
  );
}
