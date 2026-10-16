import { Approach } from "@/components/home/Approach";
import { Hero } from "@/components/home/Hero";
import { ProcessGrid } from "@/components/home/ProcessGrid";
import { WorkList } from "@/components/home/WorkList";
import type { Metadata } from "next";
import { getFeatured, getHomepage, getSite } from "@/content";
import { siteUrl } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// JSON-LD Person (11 §3): only facts that are true today.
const person = (site: Awaited<ReturnType<typeof getSite>>) => ({
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
});

// Homepage (05 A): curtain hero → process grid → work → approach → about → footer.
export default async function HomePage() {
  const [site, home, projects] = await Promise.all([
    getSite(),
    getHomepage(),
    getFeatured(),
  ]);
  const tiles = projects.flatMap((p) => p.processTiles);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person(site)).replace(/</g, "\\u003c"),
        }}
      />
      <Hero
        headline={site.headline}
        supporting={site.supporting}
        availability={site.availability}
        heroImage={home.heroImage}
        callouts={home.callouts}
      />
      <ProcessGrid
        tiles={tiles}
        label={home.processGrid.label}
        title={home.processGrid.title}
        lead={home.processGrid.lead}
        ctaLabel={home.processGrid.ctaLabel}
        ctaHref="#work"
      />
      <WorkList projects={projects} />
      <Approach title={home.approachTitle} steps={home.approach} />
    </>
  );
}
