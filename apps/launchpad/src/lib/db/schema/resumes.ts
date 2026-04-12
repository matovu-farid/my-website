import { pgTable, serial, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export interface ResumeContent {
  summary: string;
  experiences: {
    company: string;
    position: string;
    period: string;
    bullets: string[];
  }[];
  skills: string[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  contentJson: jsonb("content_json").$type<ResumeContent>().notNull(),
  pdfPath: text("pdf_path"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
