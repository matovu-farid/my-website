import { openai } from "./openai";

export interface ParsedJob {
  title: string;
  company: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  companyDescription: string;
}

export async function parseJobDescription(rawText: string): Promise<ParsedJob> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a job description parser. Extract structured data from job descriptions.
Return JSON with these fields:
- title: string (job title)
- company: string (company name)
- location: string (job location or "Not specified")
- type: "remote" | "hybrid" | "onsite" (infer from description)
- skills: string[] (required technical skills and technologies)
- requirements: string[] (qualifications, years of experience, education)
- responsibilities: string[] (key job responsibilities)
- companyDescription: string (brief company description if mentioned, otherwise empty string)`,
      },
      {
        role: "user",
        content: rawText,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as ParsedJob;
}
