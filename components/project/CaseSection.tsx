import type { Section } from "@/content/types";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { MediaBlock } from "@/components/media/MediaBlock";

// One numbered case-study section (05 B2). Content sits in columns 4–12 on desktop
// (the section index owns 1–3). Full-bleed media breaks out of the grid.
export function CaseSection({
  section,
  number,
}: {
  section: Section;
  number: string;
}) {
  const media = section.media ?? [];
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page page-grid">
        <div className="col-span-full lg:col-span-9 lg:col-start-4">
          <p className="label text-accent-text">{number}</p>
          <RevealHeading
            id={`${section.id}-title`}
            className="mt-3 max-w-[24ch] text-h2"
          >
            {section.title}
          </RevealHeading>
          <div className="mt-6 flex max-w-[68ch] flex-col gap-4 text-body text-ink-2">
            {section.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {media.map((m, i) => {
        const figure = `${number}.${i + 1}`;
        return m.width === "full-bleed" ? (
          <div key={i} className="mt-12">
            <MediaBlock media={m} figure={figure} />
          </div>
        ) : (
          <div key={i} className="container-page mt-12 page-grid">
            <div className="col-span-full lg:col-span-9 lg:col-start-4">
              <MediaBlock media={m} figure={figure} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
