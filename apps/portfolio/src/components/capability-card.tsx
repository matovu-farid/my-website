"use client";

import { motion } from "motion/react";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-lg"
    >
      <Icon size={24} className="text-primary mb-4" />
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
