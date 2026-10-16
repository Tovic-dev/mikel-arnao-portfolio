import type { Metadata } from "next";
import { getLabEntries, getLabPage, getProjects } from "@/content";
import { LabSheet } from "@/components/lab/LabSheet";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";

export const metadata: Metadata = {
  title: "Lab — Explorations",
  description:
    "Sketches, render studies and experiments by Mikel Arnao, and the technology he's exploring: AI, robotics and automation, connected products and circular design.",
  alternates: { canonical: "/lab" },
};

// Lab page, "contact sheet" (05 Part G).
export default async function LabPage() {
  const [page, labEntries, projects] = await Promise.all([
    getLabPage(),
    getLabEntries(),
    getProjects(),
  ]);
  const projectTitles = Object.fromEntries(
    projects.map((p) => [p.slug, p.title]),
  );

  return (
    <section className="container-page pt-10 pb-(--section-space) sm:pt-14 lg:pt-16">
      <p className="label text-ink-3">Lab</p>
      <RevealHeading as="h1" className="mt-4 text-h1">
        Explorations
      </RevealHeading>
      <p className="mt-6 max-w-[52ch] text-lead text-ink-2">{page.intro}</p>

      <section aria-labelledby="exploring" className="mt-14">
        <h2 id="exploring" className="label text-ink-3">
          Currently exploring
        </h2>
        <ul className="mt-4 grid gap-x-(--grid-gutter) gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {page.interests.map((i, n) => (
            <li key={i.title}>
              <Reveal delay={n * 0.07} className="border-t border-ink pt-4">
                <h3 className="text-h3">{i.title}</h3>
                <p className="mt-2 text-small text-ink-2">{i.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Lab entries" className="mt-16">
        <LabSheet entries={labEntries} projectTitles={projectTitles} />
      </section>
    </section>
  );
}
