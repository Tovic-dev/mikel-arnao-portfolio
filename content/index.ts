import { ardura } from "./projects/ardura";
import { mercedesVentLca } from "./projects/mercedes-vent-lca";
import { orbeaCycleDry } from "./projects/orbea-cycle-dry";
import { seatAtecaMirror } from "./projects/seat-ateca-mirror";
import type { Project } from "./types";

// One typed file per project in content/projects/.
const projects: Project[] = [
  ardura,
  seatAtecaMirror,
  mercedesVentLca,
  orbeaCycleDry,
];

export function getProjects(): Project[] {
  return projects
    .filter(
      (p) => p.status === "published" || process.env.NODE_ENV !== "production",
    )
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Previous and next project, wrapping around (04 §3). */
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
