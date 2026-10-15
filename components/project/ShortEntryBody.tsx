import type { ShortEntry } from "@/content/types";
import { MediaBlock } from "@/components/media/MediaBlock";
import { RevealHeading } from "@/components/motion/RevealHeading";

// Short entry body (05 Part E): "About the project" paragraphs and optional media,
// in the same content column as case-study sections. No section index.
export function ShortEntryBody({ project }: { project: ShortEntry }) {
  const media = project.media ?? [];
  return (
    <section
      aria-labelledby="about-project"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page page-grid">
        <div className="col-span-full lg:col-span-9 lg:col-start-4">
          <RevealHeading id="about-project" className="text-h2">
            About the project
          </RevealHeading>
          <div className="mt-6 flex max-w-[68ch] flex-col gap-4 text-body text-ink-2">
            {project.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      {media.map((m, i) => {
        const figure = `01.${i + 1}`;
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
