import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDocumentsEmail(params: {
  jobTitle: string;
  companyName: string;
  matchScore: number;
  sourceUrl?: string;
  resumePath?: string;
  coverLetterPath?: string;
}) {
  const attachments: { filename: string; content: Buffer }[] = [];

  if (params.resumePath) {
    const content = await readFile(params.resumePath);
    attachments.push({
      filename: path.basename(params.resumePath),
      content: Buffer.from(content),
    });
  }

  if (params.coverLetterPath) {
    const content = await readFile(params.coverLetterPath);
    attachments.push({
      filename: path.basename(params.coverLetterPath),
      content: Buffer.from(content),
    });
  }

  const body = [
    `Job: ${params.jobTitle} at ${params.companyName}`,
    `Match Score: ${params.matchScore}%`,
    params.sourceUrl ? `Posting: ${params.sourceUrl}` : null,
    "",
    `Generated ${attachments.length} document(s) attached.`,
  ]
    .filter(Boolean)
    .join("\n");

  const { data, error } = await resend.emails.send({
    from: "Launchpad <onboarding@resend.dev>",
    to: process.env.EMAIL_ADDRESS!,
    subject: `[Launchpad] Resume & Cover Letter — ${params.jobTitle} at ${params.companyName}`,
    text: body,
    attachments,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
