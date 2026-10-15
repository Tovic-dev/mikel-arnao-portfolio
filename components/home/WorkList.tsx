import type { Project } from "@/content/types";
import { ProjectCard } from "./ProjectCard";

// Selected work (05 A3). The process grid introduces it, so the heading is visually hidden.
export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-1 scroll-mt-4 bg-paper"
    >
      <div className="container-page py-(--section-space)">
        <h2 id="work-title" className="sr-only">
          Selected work
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
