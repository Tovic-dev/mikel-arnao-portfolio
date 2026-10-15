import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/content";

// Only slugs from generateStaticParams exist; everything else is a 404 (08 §2).
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

// Case-study shell (05 B). The full template arrives in slice 8.2.
export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="container-page py-(--section-space)">
      <p className="label text-ink-3">
        {String(project.order).padStart(2, "0")}
      </p>
      <h1 className="mt-4 text-h1">{project.title}</h1>
      <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
        {project.summary}
      </p>
    </article>
  );
}
