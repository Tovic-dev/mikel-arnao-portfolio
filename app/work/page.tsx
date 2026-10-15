import type { Metadata } from "next";
import { getProjects } from "@/content";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { WorkIndex, type WorkItem } from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work — All projects",
  description:
    "Every project by Mikel Arnao: product design, engineering, sustainability and research, filterable by field, context and year.",
  alternates: { canonical: "/work" },
};

// Work page, layout A "Spec index" (05 Part D).
export default function WorkPage() {
  const items: WorkItem[] = getProjects().map((p) => ({
    slug: p.slug,
    order: p.order,
    title: p.title,
    productName: p.productName,
    fields: p.fields,
    context: p.context,
    company: p.company,
    year: p.year,
    featured: p.featured,
    image: p.cardImage,
  }));

  return (
    <section className="container-page pt-10 pb-(--section-space) sm:pt-14 lg:pt-16">
      <p className="label text-ink-3">Work</p>
      <RevealHeading as="h1" className="mt-4 text-h1">
        All projects
      </RevealHeading>
      <p className="mt-6 max-w-[52ch] text-lead text-ink-2">
        Product design, engineering and research projects, from first-year PBL
        to company collaborations.
      </p>
      <div className="mt-12">
        <WorkIndex items={items} />
      </div>
    </section>
  );
}
