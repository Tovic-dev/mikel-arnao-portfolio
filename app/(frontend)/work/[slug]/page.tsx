import { blur } from "@/lib/image";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdjacent, getProject, getProjects } from "@/content";
import { getSite } from "@/content";
import { CaseSection } from "@/components/project/CaseSection";
import { PrevNextProject } from "@/components/project/PrevNextProject";
import { ProjectIntro } from "@/components/project/ProjectIntro";
import { CaseStudyEntrance } from "@/components/project/CaseStudyEntrance";
import { SectionIndex } from "@/components/project/SectionIndex";
import { ShortEntryBody } from "@/components/project/ShortEntryBody";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

// Existing projects are prerendered; a project published later renders on its
// first visit and is then cached. Unknown or unpublished slugs 404 (16 §3).
export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSite()]);
  if (!project) return {};
  const title = `${project.title} — ${project.productName ?? "Case study"}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: project.hero.src.src, alt: project.hero.alt }],
    },
  };
}

// Case-study template (05 B) and short-entry template (05 E).
export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const [adjacent, all] = await Promise.all([getAdjacent(slug), getProjects()]);
  const total = all.length;

  const index =
    project.kind === "case-study"
      ? project.sections.map((s, i) => ({
          id: s.id,
          number: String(i + 1).padStart(2, "0"),
          title: s.title,
        }))
      : [];

  return (
    <article>
      <CaseStudyEntrance />
      <ProjectIntro project={project} index={index} total={total} />

      {/* Hero render: the full-bleed moment (05 B1) */}
      <figure
        data-enter="hero"
        className="load-clip relative z-(--z-raised) bg-raised"
      >
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          loading="eager"
          fetchPriority="high"
          placeholder={blur(project.hero.src)}
          quality={85}
          sizes="100vw"
          className="block h-auto max-h-[85svh] w-full object-cover"
        />
        {project.hero.placeholder && <PlaceholderTag />}
      </figure>

      {project.kind === "short" ? (
        <ShortEntryBody project={project} />
      ) : (
        <div className="relative">
          {/* Desktop section index: sticky in columns 1–3, behind full-bleed media */}
          <aside className="pointer-events-none absolute inset-0 z-5 hidden lg:block">
            <div className="container-page page-grid h-full">
              <div className="col-span-3 pt-16 sm:pt-20 lg:pt-24">
                <div className="pointer-events-auto sticky top-8">
                  <SectionIndex items={index} variant="sticky" />
                </div>
              </div>
            </div>
          </aside>

          {project.sections.map((section, i) => (
            <CaseSection
              key={section.id}
              section={section}
              number={index[i]?.number ?? String(i + 1)}
            />
          ))}
        </div>
      )}

      {adjacent && (
        <PrevNextProject prev={adjacent.prev} next={adjacent.next} />
      )}
    </article>
  );
}
