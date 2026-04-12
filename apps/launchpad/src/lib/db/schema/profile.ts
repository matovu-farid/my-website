import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  summary: text("summary"),
  skills: jsonb("skills").$type<string[]>().default([]),
  experienceJson: jsonb("experience_json").$type<{
    company: string;
    position: string;
    period: string;
    description: string;
    bullets: string[];
  }[]>().default([]),
  educationJson: jsonb("education_json").$type<{
    institution: string;
    degree: string;
    year: string;
  }[]>().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
