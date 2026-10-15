import { ardura } from "./projects/ardura";
import { bira } from "./projects/bira";
import { mercedesVentLca } from "./projects/mercedes-vent-lca";
import { orbeaCycleDry } from "./projects/orbea-cycle-dry";
import { seatAtecaMirror } from "./projects/seat-ateca-mirror";
import { sendaNorte } from "./projects/senda-norte";
import { strollerResearch } from "./projects/stroller-research";
import type { CaseStudy, Project } from "./types";

// One typed file per project in content/projects/.
const projects: Project[] = [
  ardura,
  seatAtecaMirror,
  mercedesVentLca,
  orbeaCycleDry,
  bira,
  sendaNorte,
  strollerResearch,
];

/** Every published project in Work-page order (05 Part D2). */
export function getProjects(): Project[] {
  return projects
    .filter(
      (p) => p.status === "published" || process.env.NODE_ENV !== "production",
    )
    .sort((a, b) => a.order - b.order);
}

/** Homepage flagships: featured case studies. */
export function getFeatured(): CaseStudy[] {
  return getProjects().filter(
    (p): p is CaseStudy => p.kind === "case-study" && p.featured,
  );
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Previous and next project across all projects, wrapping around. */
export function getAdjacent(
  slug: string,
): { prev: Project; next: Project } | undefined {
  const list = getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return undefined;
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  return prev && next ? { prev, next } : undefined;
}
