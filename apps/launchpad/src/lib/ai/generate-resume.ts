import { openai } from "./openai";
import type { ResumeContent } from "@/lib/db/schema/resumes";

export async function generateResume(
  profile: {
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
    educationJson: { institution: string; degree: string; year: string }[];
  },
  parsedJob: {
    title: string;
    company: string;
    skills: string[];
    requirements: string[];
    responsibilities: string[];
  },
  matchAnalysis: {
    matchedSkills: string[];
    missingSkills: string[];
    notes: string;
  }
): Promise<ResumeContent> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert resume writer. Create an ATS-optimized resume tailored to a specific job.

Rules:
- Write a professional summary (2-3 sentences) that connects the candidate's experience to this specific role
- Select and reorder the most relevant experiences for this job
- Rewrite bullet points to naturally incorporate keywords from the job description
- Each bullet should start with a strong action verb and include measurable impact where possible
- Order skills by relevance to the job (matched skills first)
- Keep it concise — max 4 bullets per experience
- Do NOT fabricate experience or skills the candidate doesn't have

Return JSON with:
- summary: string (tailored professional summary)
- experiences: { company: string, position: string, period: string, bullets: string[] }[]
- skills: string[] (ordered by relevance to job)
- education: { institution: string, degree: string, year: string }[]`,
      },
      {
        role: "user",
        content: JSON.stringify({ profile, job: parsedJob, matchAnalysis }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as ResumeContent;
}
