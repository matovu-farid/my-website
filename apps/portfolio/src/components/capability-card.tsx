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
}: CapabilityCardProps) {
  return (
    <article className="capability-card">
      <Icon size={16} aria-hidden="true" />
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
