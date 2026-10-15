import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { ProjectCard } from "./ProjectCard";

// Selected work (05 A3). The process grid introduces it, so the heading is visually hidden.
export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-2 bg-paper"
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
        <div className="mt-24 border-t border-rule-strong pt-6 lg:mt-32">
          <Link
            href="/work"
            className="group inline-flex min-h-12 items-center gap-2 border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
          >
            See all projects
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
