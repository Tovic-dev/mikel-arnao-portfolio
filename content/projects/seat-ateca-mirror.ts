import type { Project } from "../types";
import { placeholders } from "./_placeholders";

const img = placeholders.seat;

// DRAFT copy from "MEMORIA_PBL04" (EN abstract). Facts: 09 §3.2. To be checked at Checkpoint B.
export const seatAtecaMirror: Project = {
  slug: "seat-ateca-mirror",
  order: 2,
  title: "SEAT Ateca side mirror",
  productName: "Side-mirror redesign",
  summary:
    "Side-mirror redesign carried out with Maier: regulations, a redesigned electrical circuit and a full material specification.",
  year: 2025,
  date: "2025-06-16",
  course: "PBL4 · 2nd year",
  institution: "Mondragon Unibertsitatea",
  collaboration: "Carried out with Maier for the SEAT Ateca",
  team: ["Ainhoa Alonso", "Maren Leston", "Ane Pelayo", "Garazi Portillo"],
  myRole: [
    "Led the regulatory analysis",
    "Led the development phase: circuit analysis and redesign, material specifications manual",
    "Justified the material selection",
    "Led the final renders",
  ],
  tools: ["SolidWorks", "Siemens NX", "KeyShot", "Blender"],
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
        "The brief was to redesign the side mirror of the SEAT Ateca, a family vehicle, to improve how it works in its real context of use.",
      ],
    },
    {
      id: "research",
      title: "Research",
      body: [
        "We analysed the original mirror's market, morphology, electrical system and user interaction. I led the regulatory analysis that set the limits for any redesign.",
      ],
      media: [
        {
          type: "table",
          columns: ["Area", "What it constrains"],
          rows: [
            ["Regulation (draft)", "To be filled in from the report"],
            ["Field of view (draft)", "To be filled in from the report"],
          ],
          caption: "Regulatory requirements (draft structure)",
          credit: "mikel",
        },
      ],
    },
    {
      id: "concepts",
      title: "Concepts",
      body: [
        "Sketching led to three preliminary designs, from which the final proposal was selected.",
      ],
      media: [
        {
          type: "image",
          ...img.sketch,
          caption: "Sketches",
          credit: "team",
          width: "text",
        },
      ],
    },
    {
      id: "development",
      title: "Development",
      body: [
        "In the development phase I led the analysis and redesign of the mirror's electrical circuit and wrote the material specifications manual. The 3D model and dimensional checks were done by teammates.",
      ],
      media: [
        {
          type: "image",
          ...img.wide,
          caption: "Circuit redesign",
          credit: "mikel",
          width: "wide",
        },
      ],
    },
    {
      id: "result",
      title: "Result",
      body: [
        "The final proposal was validated through simulations, a mould and manufacturing roadmap were designed, and an aesthetic resin prototype was 3D printed and painted.",
      ],
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
