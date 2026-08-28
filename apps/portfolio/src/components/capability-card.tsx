"use client";

import type { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  index?: number;
}

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  tags,
  index = 0,
}: CapabilityCardProps) {
  return (
    <article className="capability-card">
      <Icon size={16} aria-hidden="true" />
      <span className="capability-index">0{index + 1} / {title}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tag-row">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}
