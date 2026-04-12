export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";
import { jobs, companies } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function Dashboard() {
  const allJobs = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      companyName: companies.name,
      status: jobs.status,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .orderBy(desc(jobs.createdAt));

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Launchpad</h1>
          <p className="text-muted-foreground">AI-powered career admin</p>
        </div>
        <div className="flex gap-3">
          <Link href="/profile">
            <button className="px-4 py-2 rounded-md border border-border text-sm hover:bg-accent">
              Profile
            </button>
          </Link>
          <Link href="/jobs/new">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
              + New Job
            </button>
          </Link>
        </div>
      </div>

      {allJobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg mb-2">No jobs tracked yet</p>
          <p>Paste a job description to get started</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Title</th>
                <th className="text-left p-3 text-sm font-medium">Company</th>
                <th className="text-left p-3 text-sm font-medium">Status</th>
                <th className="text-left p-3 text-sm font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {allJobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-muted/30">
                  <td className="p-3">
                    <Link href={`/jobs/${job.id}`} className="text-primary hover:underline">
                      {job.title}
                    </Link>
                  </td>
                  <td className="p-3 text-muted-foreground">{job.companyName ?? "—"}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "saved" ? "bg-muted text-muted-foreground" :
                      job.status === "applied" ? "bg-blue-500/20 text-blue-400" :
                      job.status === "interviewing" ? "bg-yellow-500/20 text-yellow-400" :
                      job.status === "rejected" ? "bg-red-500/20 text-red-400" :
                      job.status === "offered" ? "bg-green-500/20 text-green-400" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-sm">
                    {job.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
