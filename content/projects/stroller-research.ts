import type { ShortEntry } from "../types";
import { shortPlaceholders } from "./_placeholders";

const img = shortPlaceholders.stroller;

// DRAFT short entry from "User-Centred Design Analysis for a New Urban Stroller" (EN).
// Facts: 09 §4. Participants stay anonymous. Role to be confirmed at Checkpoint B.
export const strollerResearch: ShortEntry = {
  kind: "short",
  slug: "urban-stroller-research",
  order: 7,
  title: "Urban stroller research",
  productName: "User-centred design analysis",
  summary:
    "Interviews and contextual observation with parents, synthesised into insights, a persona and a brief for a new urban stroller.",
  year: 2025,
  date: "2025-11-12",
  course: "Design Methodology · 3rd year",
  institution: "Mondragon Unibertsitatea",
  context: "academic",
  featured: false,
  team: ["Aimar Arauzo"],
  myRole: ["Role to be confirmed (Checkpoint B)"],
  tools: [],
  fields: ["research"],
  hero: img.hero,
  cardImage: img.card,
  status: "published",
  body: [
    "The exploration phase of a human-centred design process: in-depth interviews and contextual observation of how people really use strollers in the city.",
    "We synthesised the findings into five key insights, a persona, an experience flow and a brief with CUT values for a new urban stroller.",
  ],
  media: [
    {
      type: "image",
      ...img.figure,
      caption: "Experience flow",
      credit: "team",
      width: "wide",
    },
  ],
};
