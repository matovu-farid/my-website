import { db } from "@/lib/db";
import { coverLetters } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CoverLetterPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { id } = await params;
  const { version } = await searchParams;
  const jobId = parseInt(id, 10);

  const allLetters = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.jobId, jobId))
    .orderBy(desc(coverLetters.version));

  const letter = version
    ? allLetters.find((l) => l.version === parseInt(version, 10))
    : allLetters[0];

  if (!letter) notFound();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Cover Letter Preview (v{letter.version})</h1>
        <div className="flex gap-2">
          {letter.pdfPath && (
            <a href={`/api/pdf/${jobId}/${encodeURIComponent(letter.pdfPath.split("/").pop()!)}`}>
              <Button variant="outline">Download PDF</Button>
            </a>
          )}
          <Link href={`/jobs/${jobId}`}>
            <Button variant="outline">Back to Job</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {letter.contentText}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
