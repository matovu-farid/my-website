"use client";

import { motion } from "motion/react";

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string;
  index?: number;
}

export default function ExperienceCard({
  company,
  position,
  period,
  description,
  index = 0,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">{position}</h3>
          <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
            {period}
          </span>
        </div>
        <h4 className="text-sm text-primary font-medium mb-3">{company}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
