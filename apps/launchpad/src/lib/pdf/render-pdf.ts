import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ResumeDocument } from "./resume-template";
import { CoverLetterDocument } from "./cover-letter-template";
import type { ResumeContent } from "@/lib/db/schema/resumes";
import type { CoverLetterContent } from "@/lib/ai/generate-cover-letter";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const GENERATED_DIR = path.join(process.cwd(), "generated");

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function renderResumePdf(
  profile: { name: string; email: string; phone: string; location: string },
  content: ResumeContent,
  jobId: number,
  companyName: string,
  version: number
): Promise<string> {
  const buffer = await renderToBuffer(
    React.createElement(ResumeDocument, { ...profile, content })
  );

  const dir = path.join(GENERATED_DIR, String(jobId));
  await ensureDir(dir);

  const sanitizedCompany = companyName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `Farid_Matovu_Resume_${sanitizedCompany}_v${version}.pdf`;
  const filePath = path.join(dir, filename);

  await writeFile(filePath, buffer);
  return filePath;
}

export async function renderCoverLetterPdf(
  profile: { name: string; email: string; phone: string },
  content: CoverLetterContent,
  jobId: number,
  companyName: string,
  version: number
): Promise<string> {
  const buffer = await renderToBuffer(
    React.createElement(CoverLetterDocument, { ...profile, content })
  );

  const dir = path.join(GENERATED_DIR, String(jobId));
  await ensureDir(dir);

  const sanitizedCompany = companyName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `Farid_Matovu_CoverLetter_${sanitizedCompany}_v${version}.pdf`;
  const filePath = path.join(dir, filename);

  await writeFile(filePath, buffer);
  return filePath;
}
