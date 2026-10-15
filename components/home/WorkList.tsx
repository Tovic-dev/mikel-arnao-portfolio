import type { Project } from "@/content/types";
import { ProjectCard } from "./ProjectCard";

// Selected work (05 A3). The process grid introduces it, so the heading is visually hidden.
export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-2 scroll-mt-4 bg-paper"
    >
      <div className="container-page pt-16 pb-(--section-space) lg:pt-24">
        <h2 id="work-title" className="sr-only">
          Featured projects
        </h2>
        <ol className="flex flex-col gap-24 lg:gap-32">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
