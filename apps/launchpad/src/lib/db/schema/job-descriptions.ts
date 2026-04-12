import { pgTable, serial, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const jobDescriptions = pgTable("job_descriptions", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  rawText: text("raw_text").notNull(),
  parsedSkills: jsonb("parsed_skills").$type<string[]>().default([]),
  parsedRequirements: jsonb("parsed_requirements").$type<string[]>().default([]),
  matchScore: integer("match_score"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
