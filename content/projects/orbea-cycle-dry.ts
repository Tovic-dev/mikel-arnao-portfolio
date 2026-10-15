import type { Project } from "../types";
import { placeholders } from "./_placeholders";

const img = placeholders.orbea;

// DRAFT copy from "Memoria_Hito3_PBL03_05" (EN abstract). Facts: 09 §3.4. To be checked at Checkpoint B.
export const orbeaCycleDry: Project = {
  slug: "orbea-cycle-dry",
  order: 4,
  title: "Orbea Cycle Dry",
  productName: "Bikepacking rear rack",
  summary:
    "A simpler, cheaper rear rack developed with Orbea, with a mechanism for drying clothes while riding.",
  year: 2025,
  date: "2025-01-28",
  course: "PBL3 · 2nd year",
  institution: "Mondragon Unibertsitatea",
  collaboration: "Academic project in collaboration with Orbea",
  team: ["Ekain Ardanza", "Leire Arias", "Laura Cuesta", "Naroa Galdos"],
  myRole: [
    "Led the market and usage analysis",
    "Led the ideation sketches with a teammate",
    "Wrote the specifications document",
    "Defined the manufacturing process",
    "Led the final renders",
  ],
  tools: ["SolidWorks", "KeyShot", "Blender"],
  disciplines: ["product-design", "engineering", "cad"],
  hero: img.hero,
  cardImage: img.card,
  processTiles: [img.sketch, img.cad, img.render],
  status: "published",
  sections: [
    {
      id: "context",
      title: "Context and brief",
      body: [
        "Redesign Orbea's rear rack for a mountain bike used on bikepacking routes, making it simpler and cheaper than the reference product.",
      ],
    },
    {
      id: "research",
      title: "Research",
      body: [
        "We took the reference rack apart (14 parts, MIG-welded and laser-cut) and tested its materials for density and Vickers hardness. I led the market and usage analysis.",
      ],
      media: [
        {
          type: "table",
          columns: ["Test", "Method"],
          rows: [
            ["Density", "Volume by displacement, mass"],
            ["Hardness", "Vickers indenter, matched in CES"],
          ],
          caption: "Material tests on the reference rack",
          credit: "team",
        },
      ],
    },
    {
      id: "concepts",
      title: "Concepts",
      body: [
        "I developed the ideation sketches together with a teammate, using 4-step sketching and secret voting to select directions.",
      ],
      media: [
        {
          type: "grid",
          images: [img.sketch, img.portrait],
          caption: "Ideation sketches",
          credit: "Mikel and a teammate",
          placeholder: true,
        },
      ],
    },
    {
      id: "development",
      title: "Development",
      body: [
        "The final rack integrates a lift-and-rotate hanger so clothes can dry while the bike is moving.",
      ],
      media: [
        {
          type: "sequence",
          steps: [
            { ...img.figure, title: "Folded" },
            { ...img.cad, title: "Lift" },
            { ...img.render, title: "Rotate and hang" },
          ],
          caption: "Hanger mechanism",
          credit: "team",
          placeholder: true,
        },
      ],
    },
    {
      id: "specification",
      title: "Specification",
      body: [
        "I wrote the specifications document and defined the manufacturing process for the proposal.",
      ],
      media: [
        {
          type: "image",
          ...img.wide,
          caption: "Manufacturing process",
          credit: "mikel",
          width: "wide",
        },
      ],
    },
    {
      id: "result",
      title: "Result",
      body: ["Final renders and the project poster."],
      media: [
        {
          type: "image",
          ...img.hero,
          caption: "Final render",
          credit: "mikel",
          width: "full-bleed",
        },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      body: ["Draft: to be written with Mikel."],
    },
  ],
};
