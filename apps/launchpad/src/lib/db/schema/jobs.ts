import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const jobTypeEnum = pgEnum("job_type", ["remote", "hybrid", "onsite"]);

export const jobSourceEnum = pgEnum("job_source", [
  "manual_paste",
  "linkedin",
  "indeed",
  "other",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "saved",
  "applied",
  "interviewing",
  "rejected",
  "offered",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyId: integer("company_id").references(() => companies.id),
  location: text("location"),
  type: jobTypeEnum("type"),
  source: jobSourceEnum("source").notNull().default("manual_paste"),
  sourceUrl: text("source_url"),
  status: jobStatusEnum("status").notNull().default("saved"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
