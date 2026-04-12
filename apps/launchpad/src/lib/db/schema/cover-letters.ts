import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const coverLetters = pgTable("cover_letters", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  contentText: text("content_text").notNull(),
  pdfPath: text("pdf_path"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
