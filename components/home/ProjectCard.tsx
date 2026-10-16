import { blur } from "@/lib/image";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fieldLabels, type Project } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

// Project card (10 §5): whole card is one link; image left, schedule-like metadata right.
export function ProjectCard({ project }: { project: Project }) {
  const number = String(project.order).padStart(2, "0");
  return (
    <article className="border-t border-rule-strong pt-4">
      <p className="label text-ink-3" aria-hidden="true">
        {number}
      </p>
      <Link
        href={`/work/${project.slug}` as Route}
        className="group mt-4 page-grid gap-y-6"
      >
        <Reveal variant="clip" className="col-span-full lg:col-span-7">
          <div className="relative aspect-3/2 overflow-hidden bg-raised">
            <Image
              src={project.cardImage.src}
              alt={project.cardImage.alt}
              placeholder={blur(project.cardImage.src)}
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="size-full object-cover transition-transform duration-600 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {project.cardImage.placeholder && <PlaceholderTag />}
          </div>
        </Reveal>

        <Reveal className="col-span-full flex flex-col sm:col-span-8 lg:col-span-5">
          <h3 className="text-h3 transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[44ch] text-lead text-ink-2">
            {project.summary}
          </p>
          <dl className="mt-8 border-b border-rule text-small">
            <Row label="Year" value={String(project.year)} />
            <Row label="Role" value={project.myRole.join(" · ")} />
            <Row
              label="Field"
              value={project.fields.map((f) => fieldLabels[f]).join(" · ")}
            />
          </dl>
          <span className="mt-8 inline-flex items-center gap-2 label text-ink group-hover:text-accent-text">
            View case study
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </span>
        </Reveal>
      </Link>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-rule py-2.5">
      <dt className="pt-0.5 label text-ink-3">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
