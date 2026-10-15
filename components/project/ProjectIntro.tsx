import type { Project } from "@/content/types";
import type { IndexItem } from "./SectionIndex";
import { SectionIndex } from "./SectionIndex";

// Case-study intro (05 B1): number, title, summary and the role block, all above
// the fold on desktop and mobile.
export function ProjectIntro({
  project,
  index,
}: {
  project: Project;
  index: IndexItem[];
}) {
  const number = String(project.order).padStart(2, "0");
  return (
    <header className="container-page page-grid gap-y-8 pt-10 pb-12 sm:pt-14 lg:pt-16">
      <div className="col-span-full lg:col-span-6">
        <p data-enter="label" className="label text-ink-3">
          {number} / 04 · {project.productName}
        </p>
        <h1 data-enter="title" className="mt-4 text-h1">
          {project.title}
        </h1>
        <p
          data-enter="intro"
          className="mt-6 max-w-[40ch] text-lead text-ink-2"
        >
          {project.summary}
        </p>
      </div>

      <dl
        data-enter="intro"
        className="col-span-full self-end border-b border-rule text-small lg:col-span-5 lg:col-start-8"
      >
        <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-rule-strong py-3">
          <dt className="pt-0.5 label text-ink-3">My role</dt>
          <dd>
            <ul className="flex flex-col gap-1.5">
              {project.myRole.map((r) => (
                <li key={r} className="flex gap-2.5 text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] size-1 shrink-0 bg-accent"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <Row label="Year" value={`${project.year} · ${project.course}`} />
        {project.collaboration && (
          <Row label="With" value={project.collaboration} />
        )}
        <Row label="Team" value={project.team.join(", ")} />
        <Row label="Tools" value={project.tools.join(" · ")} />
      </dl>

      <div data-enter="intro" className="col-span-full lg:hidden">
        <SectionIndex items={index} variant="details" />
      </div>
    </header>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-rule py-3">
      <dt className="pt-0.5 label text-ink-3">{label}</dt>
      <dd className="text-ink-2">{value}</dd>
    </div>
  );
}
