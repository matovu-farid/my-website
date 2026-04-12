import { getJobWithDetails, updateJobStatus } from "@/actions/job-actions";
import { getJobDocuments, generateAndSaveResume, generateAndSaveCoverLetter, emailDocuments } from "@/actions/document-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobId = parseInt(id, 10);
  const data = await getJobWithDetails(jobId);

  if (!data) notFound();

  const { job, company, description } = data;
  const docs = await getJobDocuments(jobId);

  const statusColors: Record<string, string> = {
    saved: "bg-muted text-muted-foreground",
    applied: "bg-blue-500/20 text-blue-400",
    interviewing: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400",
    offered: "bg-green-500/20 text-green-400",
  };

  async function handleGenerateResume() {
    "use server";
    await generateAndSaveResume(jobId);
  }

  async function handleGenerateCoverLetter() {
    "use server";
    await generateAndSaveCoverLetter(jobId);
  }

  async function handleEmail() {
    "use server";
    await emailDocuments(jobId);
    revalidatePath(`/jobs/${jobId}`);
  }

  async function handleStatusChange(formData: FormData) {
    "use server";
    const status = formData.get("status") as "saved" | "applied" | "interviewing" | "rejected" | "offered";
    await updateJobStatus(jobId, status);
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground text-lg">{company?.name ?? "Unknown Company"}</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      {/* Status & Meta */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
        {description?.matchScore != null && (
          <Badge variant={description.matchScore >= 70 ? "default" : "secondary"}>
            {description.matchScore}% match
          </Badge>
        )}
        {job.location && <span className="text-sm text-muted-foreground">{job.location}</span>}
        {job.type && <span className="text-sm text-muted-foreground capitalize">{job.type}</span>}

        <form action={handleStatusChange} className="ml-auto flex gap-2">
          <select name="status" defaultValue={job.status} className="bg-muted border border-border rounded px-2 py-1 text-sm">
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="offered">Offered</option>
          </select>
          <Button type="submit" size="sm" variant="outline">Update</Button>
        </form>
      </div>

      {/* Skills */}
      {description && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(description.parsedSkills as string[]).map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Documents</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <form action={handleGenerateResume}>
            <Button type="submit">Generate Resume</Button>
          </form>
          <form action={handleGenerateCoverLetter}>
            <Button type="submit" variant="secondary">Generate Cover Letter</Button>
          </form>
          {(docs.resumes.length > 0 || docs.coverLetters.length > 0) && (
            <form action={handleEmail}>
              <Button type="submit" variant="outline">Email Documents</Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Generated Documents */}
      {docs.resumes.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {docs.resumes.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">Version {r.version} — {r.createdAt.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${jobId}/resume?version=${r.version}`}>
                      <Button size="sm" variant="outline">Preview</Button>
                    </Link>
                    {r.pdfPath && (
                      <a href={`/api/pdf/${jobId}/${encodeURIComponent(r.pdfPath.split("/").pop()!)}`}>
                        <Button size="sm" variant="outline">Download</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {docs.coverLetters.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cover Letters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {docs.coverLetters.map((cl) => (
                <div key={cl.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">Version {cl.version} — {cl.createdAt.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${jobId}/cover-letter?version=${cl.version}`}>
                      <Button size="sm" variant="outline">Preview</Button>
                    </Link>
                    {cl.pdfPath && (
                      <a href={`/api/pdf/${jobId}/${encodeURIComponent(cl.pdfPath.split("/").pop()!)}`}>
                        <Button size="sm" variant="outline">Download</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Raw Job Description */}
      {description && (
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
              {description.rawText}
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
