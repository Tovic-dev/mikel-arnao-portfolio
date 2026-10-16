// Seed for the Homepage, About and Lab page globals (scripts/seed.ts).
// Text copied from the components it replaced.
import type { Annotation } from "../types";
import { placeholders } from "./projects/_placeholders";

export const homepage = {
  hero: {
    image: placeholders.homeHero,
    // Positions are local values for this image (05 A2).
    callouts: [
      {
        x: 40,
        y: 30,
        labelX: 4,
        labelY: 12,
        text: "CAD + development · led by me",
      },
      {
        x: 62,
        y: 58,
        labelX: 64,
        labelY: 80,
        text: "Final render · led by me",
      },
    ] satisfies Annotation[],
  },
  processGrid: {
    label: "Featured projects",
    title: "Featured projects, from first sketch to final specification.",
    lead: "Team projects with Orbea, Maier and Mondragon Unibertsitatea. In each one I led the stage where a concept becomes a specification.",
    ctaLabel: "View featured projects",
  },
  approachTitle: "How I take a product from idea to specification",
  // Each step points to the case-study section that proves it (05 A4).
  approach: [
    {
      title: "Understand",
      text: "Research the product, its users, its market and the regulations it has to meet.",
      proof: "Regulatory analysis, SEAT mirror",
      href: "/work/seat-ateca-mirror#research",
    },
    {
      title: "Explore",
      text: "Sketch widely, then narrow down to the concept that answers the brief best.",
      proof: "Ideation sketches, Orbea rack",
      href: "/work/orbea-cycle-dry#concepts",
    },
    {
      title: "Develop",
      text: "Turn the concept into something buildable: CAD, mechanisms, circuits and materials.",
      proof: "Development and CAD, Ardura",
      href: "/work/ardura#development",
    },
    {
      title: "Specify and present",
      text: "Fix materials, manufacturing and environmental impact, then present the result.",
      proof: "Life-cycle assessment, Mercedes vent",
      href: "/work/mercedes-vent-lca#evaluation",
    },
  ],
};

export const about = {
  title: "Product designer and design engineer in training.",
  intro:
    "I'm in my fourth year of Industrial Design and Product Development Engineering at Mondragon Unibertsitatea, in the Basque Country. Most of my projects are team projects, several of them with companies such as Orbea and Maier, and in most of them I end up leading the development: CAD, materials, regulations, manufacturing and the final renders.",
  portrait: placeholders.portrait,
  howIWork: [
    "Every project starts with analysis: the product, its users, the market and the rules it has to meet. In the SEAT mirror project that meant leading the regulatory analysis before anyone sketched.",
    "Once a concept is chosen, I like owning the step where it becomes buildable: the CAD model, the materials and how it gets manufactured. That was my part in Ardura and in the Orbea rack.",
    "I document decisions as I go, and I finish by presenting the result properly, which is why I usually take on the final renders.",
  ],
  // Tools by where they were actually used (05 C1, D-20). No self-rated levels.
  tools: [
    { tool: "SolidWorks", where: "Ardura · SEAT mirror · Orbea rack" },
    { tool: "Siemens NX", where: "SEAT mirror" },
    { tool: "KeyShot", where: "Ardura · SEAT mirror · Orbea rack" },
    { tool: "Blender", where: "Ardura · SEAT mirror · Orbea rack" },
    {
      tool: "IHOBE Climate and circularity calculator",
      where: "Mercedes vent LCA",
    },
    { tool: "Adobe Creative Suite", where: "Brand and dossier work" },
    { tool: "React · Next.js · TypeScript", where: "This website" },
  ],
};

export const labPage = {
  intro: "Sketches, studies and experiments outside the main projects.",
};
