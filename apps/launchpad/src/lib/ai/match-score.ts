import { openai } from "./openai";

export interface MatchAnalysis {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  notes: string;
}

export async function calculateMatchScore(
  profileSkills: string[],
  profileExperience: { company: string; position: string; description: string; bullets: string[] }[],
  jobSkills: string[],
  jobRequirements: string[]
): Promise<MatchAnalysis> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a job match analyzer. Compare a candidate's profile against job requirements.
Return JSON with:
- score: number (0-100, how well the candidate matches)
- matchedSkills: string[] (skills the candidate has that the job wants)
- missingSkills: string[] (skills the job wants that the candidate lacks)
- notes: string (brief assessment of fit, strengths, and gaps)`,
      },
      {
        role: "user",
        content: JSON.stringify({
          candidateSkills: profileSkills,
          candidateExperience: profileExperience,
          jobSkills,
          jobRequirements,
        }),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!) as MatchAnalysis;
}
