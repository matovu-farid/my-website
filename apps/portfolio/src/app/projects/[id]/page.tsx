import { notFound } from "next/navigation";
import { allProjectsSorted } from "@/data/projects";
import CaseStudyContent from "./case-study-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allProjectsSorted
    .filter((p) => p.narrative)
    .map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = allProjectsSorted.find((p) => p.id === id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Farid Matovu`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = allProjectsSorted.find((p) => p.id === id);

  if (!project || !project.narrative) {
    notFound();
  }

  const projectIndex = allProjectsSorted.filter((p) => p.narrative).findIndex((p) => p.id === id);
  const narrativeProjects = allProjectsSorted.filter((p) => p.narrative);
  const prevProject = projectIndex > 0 ? narrativeProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < narrativeProjects.length - 1
      ? narrativeProjects[projectIndex + 1]
      : null;

  return (
    <CaseStudyContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
