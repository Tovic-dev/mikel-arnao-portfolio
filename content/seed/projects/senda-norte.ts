import type { ShortEntry } from "../../types";
import { shortPlaceholders } from "./_placeholders";

const img = shortPlaceholders.sendaNorte;

// DRAFT short entry from "SendaNorte_Dossier" (ES). Facts: 09 §4.
// Course and role to be confirmed at Checkpoint B.
export const sendaNorte: ShortEntry = {
  kind: "short",
  slug: "senda-norte",
  order: 6,
  title: "Senda Norte",
  productName: "Low-alcohol vermouth, bottle and brand",
  summary:
    "An artisan 8% vermouth concept that brings back the aperitif ritual in a lighter, everyday form, from bottle ergonomics to brand.",
  year: 2026,
  date: "2026",
  course: "Course to confirm",
  institution: "Mondragon Unibertsitatea",
  context: "academic",
  featured: false,
  team: ["Aimar Arauzo"],
  myRole: ["Role to be confirmed (Checkpoint B)"],
  tools: [],
  fields: ["product-design", "brand"],
  hero: img.hero,
  cardImage: img.card,
  status: "published",
  body: [
    "Senda Norte is a low-alcohol (8% vol.) artisan vermouth designed to recover the ritual of the aperitif with a lighter, everyday approach.",
    "Every design decision translates the concept: a slight narrowing at the middle of the bottle improves grip for hands with less strength without compromising stability. Draft: to be completed at Checkpoint B.",
  ],
  media: [
    {
      type: "image",
      ...img.figure,
      caption: "Bottle form studies",
      credit: "team",
      width: "wide",
    },
  ],
};
