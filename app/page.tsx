import { Approach } from "@/components/home/Approach";
import { Hero } from "@/components/home/Hero";
import { ProcessGrid } from "@/components/home/ProcessGrid";
import { WorkList } from "@/components/home/WorkList";
import type { Metadata } from "next";
import { getFeatured } from "@/content";
import { site, siteUrl } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// JSON-LD Person (11 §3): only facts that are true today.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: siteUrl.toString(),
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: site.education.institution,
  },
  knowsLanguage: ["eu", "es", "en"],
  sameAs: [site.linkedin],
};

// Homepage (05 A): curtain hero → process grid → work → approach → about → footer.
export default function HomePage() {
  const projects = getFeatured();
  const tiles = projects.flatMap((p) => p.processTiles);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <ProcessGrid
        tiles={tiles}
        label="Featured projects"
        title="Featured projects, from first sketch to final specification."
        lead="Team projects with Orbea, Maier and Mondragon Unibertsitatea. In each one I led the stage where a concept becomes a specification."
        ctaLabel="View featured projects"
        ctaHref="#work"
      />
      <WorkList projects={projects} />
      <Approach />
    </>
  );
}
