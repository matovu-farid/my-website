import { openai } from "./openai";

export interface CoverLetterContent {
  date: string;
  addressee: string;
  greeting: string;
  paragraphs: string[];
  signoff: string;
}

export async function generateCoverLetter(
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experienceJson: {
      company: string;
      position: string;
      period: string;
      description: string;
      bullets: string[];
    }[];
  },
  parsedJob: {
    title: string;
    company: string;
    skills: string[];
    requirements: string[];
    responsibilities: string[];
  },
  companyDescription: string,
  matchAnalysis: {
    matchedSkills: string[];
    notes: string;
  }
): Promise<CoverLetterContent> {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert cover letter writer. Write a compelling, personalized cover letter.

Rules:
- 3-4 paragraphs: hook connecting to company mission, experience alignment with specific examples, enthusiasm and cultural fit, professional closing
- Reference specific company details (products, mission, culture) if provided
- Connect specific past experiences to job requirements with concrete examples
- Professional but personable tone — not generic or robotic
- Every sentence must add value — no filler
- Do NOT fabricate experiences

Return JSON with:
- date: string (use "${today}")
- addressee: string (e.g., "Hiring Manager" or company name + "Hiring Team")
- greeting: string (e.g., "Dear Hiring Manager,")
- paragraphs: string[] (3-4 paragraphs)
- signoff: string (e.g., "Sincerely,")`,
      },
      {
        role: "user",
        content: JSON.stringify({
          candidate: profile,
          job: parsedJob,
          companyDescription,
          matchAnalysis,
        }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as CoverLetterContent;
}
