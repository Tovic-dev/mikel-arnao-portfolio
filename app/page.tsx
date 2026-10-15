import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Approach } from "@/components/home/Approach";
import { Hero } from "@/components/home/Hero";
import { ProcessGrid } from "@/components/home/ProcessGrid";
import { WorkList } from "@/components/home/WorkList";
import { getProjects } from "@/content";

// Homepage (05 A): curtain hero → process grid → work → approach → about → footer.
export default function HomePage() {
  const projects = getProjects();
  const tiles = projects.flatMap((p) => p.processTiles);

  return (
    <>
      <Hero />
      <ProcessGrid
        tiles={tiles}
        label={`Selected work · ${String(projects.length).padStart(2, "0")}`}
        title="Four products, from first sketch to final specification."
        lead="Team projects with Orbea, Maier and Mondragon Unibertsitatea. In each one I led the stage where a concept becomes a specification."
        ctaLabel="View projects"
        ctaHref="#work"
      />
      <WorkList projects={projects} />
      <Approach />
      <AboutTeaser />
    </>
  );
}
