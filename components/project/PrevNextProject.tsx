import type { Route } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";

// Previous / next project, wrapping around (04 §3).
export function PrevNextProject({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  return (
    <nav
      aria-label="More projects"
      className="container-page grid gap-px border-t border-rule-strong sm:grid-cols-2"
    >
      <Card project={prev} direction="prev" />
      <Card project={next} direction="next" />
    </nav>
  );
}

function Card({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/work/${project.slug}` as Route}
      className={`group flex min-h-40 flex-col justify-between gap-6 py-8 ${direction === "next" ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-2 label text-ink-3">
        {direction === "prev" && (
          <Icon
            aria-hidden="true"
            className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
        )}
        {direction === "prev" ? "Previous project" : "Next project"}
        {direction === "next" && (
          <Icon
            aria-hidden="true"
            className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        )}
      </span>
      <span>
        <span className="block label text-ink-3">
          {String(project.order).padStart(2, "0")}
        </span>
        <span className="mt-2 block text-h3 transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
          {project.title}
        </span>
      </span>
    </Link>
  );
}
