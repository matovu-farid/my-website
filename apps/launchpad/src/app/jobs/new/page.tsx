import { createJobFromDescription } from "@/actions/job-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function NewJobPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const rawText = formData.get("rawText") as string;
    const sourceUrl = formData.get("sourceUrl") as string;
    await createJobFromDescription(rawText, sourceUrl || undefined);
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">New Job</h1>
          <p className="text-muted-foreground">Paste a job description — AI will parse and analyze it</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sourceUrl">Job Posting URL (optional)</Label>
              <Input
                id="sourceUrl"
                name="sourceUrl"
                placeholder="https://linkedin.com/jobs/..."
              />
            </div>
            <div>
              <Label htmlFor="rawText">Job Description Text</Label>
              <Textarea
                id="rawText"
                name="rawText"
                rows={20}
                placeholder="Paste the full job description here..."
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Parse & Analyze
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
