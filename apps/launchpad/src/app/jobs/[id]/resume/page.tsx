import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ResumeContent } from "@/lib/db/schema/resumes";

export const dynamic = "force-dynamic";

export default async function ResumePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { id } = await params;
  const { version } = await searchParams;
  const jobId = parseInt(id, 10);

  const allResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.jobId, jobId))
    .orderBy(desc(resumes.version));

  const resume = version
    ? allResumes.find((r) => r.version === parseInt(version, 10))
    : allResumes[0];

  if (!resume) notFound();

  const content = resume.contentJson as ResumeContent;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Resume Preview (v{resume.version})</h1>
        <div className="flex gap-2">
          {resume.pdfPath && (
            <a href={`/api/pdf/${jobId}/${encodeURIComponent(resume.pdfPath.split("/").pop()!)}`}>
              <Button variant="outline">Download PDF</Button>
            </a>
          )}
          <Link href={`/jobs/${jobId}`}>
            <Button variant="outline">Back to Job</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className="text-muted-foreground">{content.summary}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            {content.experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{exp.position} — {exp.company}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <p className="text-sm text-muted-foreground">{content.skills.join(" • ")}</p>
          </div>

          {content.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {content.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
