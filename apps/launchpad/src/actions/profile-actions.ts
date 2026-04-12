"use server";

import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}

export async function upsertProfile(data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experienceJson: {
    company: string;
    position: string;
    period: string;
    description: string;
    bullets: string[];
  }[];
  educationJson: {
    institution: string;
    degree: string;
    year: string;
  }[];
}) {
  const existing = await getProfile();

  if (existing) {
    await db
      .update(profile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profile.id, existing.id));
  } else {
    await db.insert(profile).values(data);
  }

  revalidatePath("/profile");
  revalidatePath("/");
}

export async function seedProfileFromPortfolio() {
  const existing = await getProfile();
  if (existing) return existing;

  const seed = {
    name: "Farid Matovu",
    email: "matovu90@gmail.com",
    phone: "",
    location: "Uganda",
    summary:
      "Full-stack polyglot engineer building complete systems — from trading bots to cross-platform readers to AI-powered tools. Strong in TypeScript, React, Next.js, Node.js, and PostgreSQL with experience across Flutter, Rust, Tauri, and AWS.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "Rust",
      "Tauri",
      "Docker",
      "AWS Lambda",
      "Firebase",
      "Prisma",
      "Drizzle ORM",
      "OpenAI API",
      "Effect.js",
      "Git",
      "REST APIs",
      "TDD",
    ],
    experienceJson: [
      {
        company: "Dabble Lab",
        position: "Full Stack Developer",
        period: "Oct 2022 — Present",
        description:
          "Built platforms like DialogCast (podcasting from group chat conversations) and Coverage in a Click (automotive warranty services) with integrations like OpenAI, Telegram, Discord, CRMs, and Stripe.",
        bullets: [
          "Built DialogCast — a podcasting platform that converts group chat conversations into publishable audio content",
          "Developed Coverage in a Click — automotive warranty services platform with CRM and Stripe integrations",
          "Integrated OpenAI, Telegram, and Discord APIs for automated conversational workflows",
          "Implemented payment processing with Stripe for subscription and one-time purchases",
        ],
      },
      {
        company: "Microverse",
        position: "Frontend Engineer",
        period: "2022",
        description:
          "Collaborated internationally to build full-stack applications, focusing on React, Node.js, and PostgreSQL while emphasizing test-driven development and modular architectures.",
        bullets: [
          "Built full-stack applications with React, Node.js, and PostgreSQL in international teams",
          "Practiced test-driven development and modular architecture patterns",
          "Participated in code reviews and pair programming across time zones",
        ],
      },
      {
        company: "Sustainable and Greener World",
        position: "Developer",
        period: "Jan 2020 — Jan 2021",
        description:
          "Contributed to the Kula-Safi Project, integrating AI to predict crop shelf life, connecting farmers to markets, and improving food supply chain resilience.",
        bullets: [
          "Integrated AI models to predict crop shelf life for the Kula-Safi Project",
          "Built features connecting farmers to markets to improve food supply chain resilience",
          "Collaborated with cross-functional team on agricultural technology solutions",
        ],
      },
    ],
    educationJson: [] as { institution: string; degree: string; year: string }[],
  };

  await db.insert(profile).values(seed);
  return seed;
}
