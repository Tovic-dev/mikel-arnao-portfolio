// Lab entries and interests (05 Part G). Newest first. Every entry is labelled
// by what it is; nothing here is presented as client work or a finished product.
// Placeholder frames are replaced as Mikel's sketches and studies arrive.
// Not shown by decision: Caira, PBL02 (Mikel, 2026-10-16), Ibili "Jario" (D-15).
import type { ImageAsset, Interest, LabEntry } from "./types";

import siteProcessGrid from "./media/lab/site-process-grid.jpg";
import experiment1 from "./media/_placeholder/lab-experiment-1.jpg";
import render1 from "./media/_placeholder/lab-render-1.jpg";
import render2 from "./media/_placeholder/lab-render-2.jpg";
import sketch1 from "./media/_placeholder/lab-sketch-1.jpg";
import sketch2 from "./media/_placeholder/lab-sketch-2.jpg";

const ph = (src: ImageAsset["src"], alt: string): ImageAsset => ({
  src,
  alt: `Placeholder: ${alt}`,
  placeholder: true,
});

export const labEntries: LabEntry[] = [
  {
    id: "L-006",
    title: "Building this portfolio",
    type: "code",
    date: "2026-10-16",
    images: [
      {
        src: siteProcessGrid,
        alt: "The portfolio homepage's process grid: sketch, CAD and render tiles spread around the heading 'Featured projects, from first sketch to final specification.'",
      },
    ],
    note: "I designed and built this site with Next.js, TypeScript, GSAP and Lenis. The sticky process grid adapts Theo Plawinski's 'Sticky Grid Scroll' demo (Codrops, MIT) to show each project's sketch, CAD and render.",
  },
  {
    id: "L-005",
    title: "Material study",
    type: "render",
    date: "2026-05",
    images: [ph(render1, "material and lighting study render")],
    note: "Placeholder: a render study exploring materials and lighting. To be replaced with Mikel's KeyShot or Blender studies.",
  },
  {
    id: "L-004",
    title: "Form sketches",
    type: "sketch",
    date: "2026-02",
    images: [ph(sketch1, "page of form sketches")],
    note: "Placeholder: a page of form sketches not used in the case studies.",
  },
  {
    id: "L-003",
    title: "Mechanism test",
    type: "experiment",
    date: "2025-11",
    images: [ph(experiment1, "mechanism test drawing")],
    note: "Placeholder: a quick experiment or prototype test.",
  },
  {
    id: "L-002",
    title: "Lighting study",
    type: "render",
    date: "2025-06",
    images: [ph(render2, "lighting study render")],
    note: "Placeholder: an alternate render from one of the projects.",
  },
  {
    id: "L-001",
    title: "Ideation sketches",
    type: "sketch",
    date: "2025-01",
    images: [ph(sketch2, "ideation sketches")],
    note: "Placeholder: early ideation sketches.",
  },
];

/** "Currently exploring" (moved from /about; 05 G1). Draft copy, to confirm. */
export const interests: Interest[] = [
  {
    title: "AI in design",
    note: "How AI changes both the products we design and the way we design them.",
  },
  {
    title: "Robotics and automation",
    note: "Products that have to work inside larger systems, not on their own.",
  },
  {
    title: "Connected products",
    note: "Objects like Ardura, where sensing and energy shape the form.",
  },
  {
    title: "Circular design",
    note: "Measuring impact properly, as in the Mercedes vent LCA, before redesigning.",
  },
];
