"use server";

import { db } from "@/lib/db";
import { jobs, companies, jobDescriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { parseJobDescription } from "@/lib/ai/parse-job";
import { calculateMatchScore } from "@/lib/ai/match-score";
import { getProfile } from "./profile-actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJobFromDescription(rawText: string, sourceUrl?: string) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up. Go to /profile first.");

  // 1. Parse job description with AI
  const parsed = await parseJobDescription(rawText);

  // 2. Create or find company
  let companyId: number;
  const existingCompany = await db
    .select()
    .from(companies)
    .where(eq(companies.name, parsed.company))
    .limit(1);

  if (existingCompany.length > 0) {
    companyId = existingCompany[0].id;
  } else {
    const [newCompany] = await db
      .insert(companies)
      .values({
        name: parsed.company,
        description: parsed.companyDescription,
      })
      .returning();
    companyId = newCompany.id;
  }

  // 3. Create job
  const [job] = await db
    .insert(jobs)
    .values({
      title: parsed.title,
      companyId,
      location: parsed.location,
      type: parsed.type,
      source: "manual_paste",
      sourceUrl: sourceUrl || null,
    })
    .returning();

  // 4. Calculate match score
  const matchAnalysis = await calculateMatchScore(
    profile.skills as string[],
    (profile.experienceJson as { company: string; position: string; description: string; bullets: string[] }[]),
    parsed.skills,
    parsed.requirements
  );

  // 5. Store job description with parsed data
  await db.insert(jobDescriptions).values({
    jobId: job.id,
    rawText,
    parsedSkills: parsed.skills,
    parsedRequirements: parsed.requirements,
    matchScore: matchAnalysis.score,
  });

  revalidatePath("/");
  redirect(`/jobs/${job.id}`);
}

export async function updateJobStatus(jobId: number, status: "saved" | "applied" | "interviewing" | "rejected" | "offered") {
  await db
    .update(jobs)
    .set({ status, updatedAt: new Date() })
    .where(eq(jobs.id, jobId));

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/");
}

export async function getJobWithDetails(jobId: number) {
  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, jobId));

  if (!job) return null;

  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  const [description] = await db
    .select()
    .from(jobDescriptions)
    .where(eq(jobDescriptions.jobId, jobId));

  return { job, company, description };
}
