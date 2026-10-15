import type { ShortEntry } from "../types";
import { shortPlaceholders } from "./_placeholders";

const img = shortPlaceholders.bira;

// DRAFT short entry from "PBL06_T04" (EU/ES/EN abstract). Facts: 09 §4.
// Role and collaboration wording to be confirmed at Checkpoint B.
export const bira: ShortEntry = {
  kind: "short",
  slug: "bira",
  order: 5,
  title: "BIRA",
  productName: "Energy bar from surplus Basque harvest",
  summary:
    "A brand and a natural functional bar for the Ereindajan cooperative, made from surplus Basque cherries, legumes, oats and nuts.",
  year: 2026,
  date: "2026-06-09",
  course: "PBL6 · 3rd year",
  institution: "Mondragon Unibertsitatea",
  collaboration:
    "Carried out with Ereindajan; the BIRA brand was created by the team (wording to confirm)",
  context: "company",
  company: "Ereindajan",
  featured: false,
  team: ["Aimar Arauzo", "Jon Azpitarte", "Ibai Esquivel", "Manex Gonzalez"],
  myRole: ["Role to be confirmed (Checkpoint B)"],
  tools: [],
  fields: ["brand", "product-design", "sustainability"],
  hero: img.hero,
  cardImage: img.card,
  status: "published",
  body: [
    "The Ereindajan cooperative needed an outlet for the surplus of the Basque summer harvest. Our answer was BIRA: a brand and a natural functional bar made from surplus cherries, legumes, oats and nuts.",
    "The project covered the strategic search, product and user analysis, the brief, CMF and the brand. Draft: details and my role to be written at Checkpoint B.",
  ],
  media: [
    {
      type: "image",
      ...img.figure,
      caption: "Brand and packaging",
      credit: "team",
      width: "wide",
    },
  ],
};
