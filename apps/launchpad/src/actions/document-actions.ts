"use server";

import { db } from "@/lib/db";
import { resumes, coverLetters, jobDescriptions, companies, jobs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getProfile } from "./profile-actions";
import { generateResume } from "@/lib/ai/generate-resume";
import { generateCoverLetter } from "@/lib/ai/generate-cover-letter";
import { renderResumePdf, renderCoverLetterPdf } from "@/lib/pdf/render-pdf";
import { sendDocumentsEmail } from "@/lib/email/send-documents";
import { revalidatePath } from "next/cache";

export async function generateAndSaveResume(jobId: number) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up");

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [description] = await db.select().from(jobDescriptions).where(eq(jobDescriptions.jobId, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  if (!description) throw new Error("No job description found");

  // Get current version count
  const existingResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version));

  const nextVersion = existingResumes.length > 0 ? existingResumes[0].version + 1 : 1;

  // Generate resume content with AI
  const content = await generateResume(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      summary: profile.summary ?? "",
      skills: profile.skills as string[],
      experienceJson: profile.experienceJson as {
        company: string;
        position: string;
        period: string;
        description: string;
        bullets: string[];
      }[],
      educationJson: profile.educationJson as {
        institution: string;
        degree: string;
        year: string;
      }[],
    },
    {
      title: job.title,
      company: company?.name ?? "Unknown",
      skills: description.parsedSkills as string[],
      requirements: description.parsedRequirements as string[],
      responsibilities: [],
    },
    {
      matchedSkills: [],
      missingSkills: [],
      notes: "",
    }
  );

  // Render PDF
  const pdfPath = await renderResumePdf(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
    },
    content,
    jobId,
    company?.name ?? "Unknown",
    nextVersion
  );

  // Save to DB
  const [saved] = await db
    .insert(resumes)
    .values({
      jobId,
      contentJson: content,
      pdfPath,
      version: nextVersion,
    })
    .returning();

  revalidatePath(`/jobs/${jobId}`);
  return saved;
}

export async function generateAndSaveCoverLetter(jobId: number) {
  const profile = await getProfile();
  if (!profile) throw new Error("Profile not set up");

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [description] = await db.select().from(jobDescriptions).where(eq(jobDescriptions.jobId, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];

  if (!description) throw new Error("No job description found");

  const existingLetters = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  const nextVersion = existingLetters.length > 0 ? existingLetters[0].version + 1 : 1;

  const content = await generateCoverLetter(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      summary: profile.summary ?? "",
      experienceJson: profile.experienceJson as {
        company: string;
        position: string;
        period: string;
        description: string;
        bullets: string[];
      }[],
    },
    {
      title: job.title,
      company: company?.name ?? "Unknown",
      skills: description.parsedSkills as string[],
      requirements: description.parsedRequirements as string[],
      responsibilities: [],
    },
    company?.description ?? "",
    {
      matchedSkills: [],
      notes: "",
    }
  );

  const pdfPath = await renderCoverLetterPdf(
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
    },
    content,
    jobId,
    company?.name ?? "Unknown",
    nextVersion
  );

  const [saved] = await db
    .insert(coverLetters)
    .values({
      jobId,
      contentText: content.paragraphs.join("\n\n"),
      pdfPath,
      version: nextVersion,
    })
    .returning();

  revalidatePath(`/jobs/${jobId}`);
  return saved;
}

export async function emailDocuments(jobId: number) {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId));
  const [company] = job.companyId
    ? await db.select().from(companies).where(eq(companies.id, job.companyId))
    : [null];
  const [description] = await db
    .select()
    .from(jobDescriptions)
    .where(eq(jobDescriptions.jobId, jobId));

  const [latestResume] = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version))
    .limit(1);

  const [latestLetter] = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version))
    .limit(1);

  await sendDocumentsEmail({
    jobTitle: job.title,
    companyName: company?.name ?? "Unknown",
    matchScore: description?.matchScore ?? 0,
    sourceUrl: job.sourceUrl ?? undefined,
    resumePath: latestResume?.pdfPath ?? undefined,
    coverLetterPath: latestLetter?.pdfPath ?? undefined,
  });

  return { success: true };
}

export async function getJobDocuments(jobId: number) {
  const resumeList = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version));

  const letterList = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  return { resumes: resumeList, coverLetters: letterList };
}
