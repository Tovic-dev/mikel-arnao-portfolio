import type { CaseStudy } from "../types";
import { placeholders } from "./_placeholders";

const img = placeholders.mercedes;

// DRAFT copy from "ECODISEÑO DEL DIFUSOR…" (ES). Facts: 09 §3.3.
// Figures are the report's own modelled results (IHOBE calculator), quoted as reported.
export const mercedesVentLca: CaseStudy = {
  kind: "case-study",
  slug: "mercedes-vent-lca",
  order: 3,
  title: "Mercedes V-Class air vent",
  productName: "Life-cycle assessment and eco-design",
  summary:
    "Life-cycle assessment of a car air vent, from impact hotspots to three redesign actions ranked by environmental gain.",
  year: 2025,
  date: "2025-11-18",
  course: "Environmental Aspects · 3rd year",
  institution: "Mondragon Unibertsitatea",
  team: ["Aimar Arauzo", "Ander Martín"],
  myRole: [
    "Led the life-cycle assessment (LCA)",
    "Led the improvement goals and idea generation",
    "Led the evaluation of environmental improvements",
  ],
  tools: ["IHOBE Climate and circularity calculator"],
  fields: ["sustainability", "engineering", "research"],
  context: "academic",
  featured: true,
  hero: img.hero,
  cardImage: img.card,
  processTiles: [img.sketch, img.cad, img.render],
  status: "published",
  sections: [
    {
      id: "context",
      title: "Context and brief",
      body: [
        "An analysis-only brief: assess the environmental impact of the 2025 Mercedes V-Class air vent across its life cycle and propose redesign actions. No development phase was required.",
      ],
    },
    {
      id: "research",
      title: "Life-cycle assessment",
      body: [
        "We built a life-cycle inventory for every stage, from materials to end of life, and a MET matrix. I led the LCA in IHOBE's Climate and circularity calculator to find the hotspots.",
      ],
      media: [
        {
          type: "image",
          ...img.wide,
          caption:
            "Impact by life-cycle stage (chart to be redrawn from Mikel's LCA)",
          credit: "mikel",
          width: "wide",
        },
      ],
    },
    {
      id: "concepts",
      title: "Improvement concepts",
      body: [
        "Three actions targeted the hotspots: optimising the LED system, removing the chrome plating, and rationalising materials. Ideas were scored in a weighted matrix.",
      ],
    },
    {
      id: "evaluation",
      title: "Evaluation",
      body: [
        "The final concept combines a single-material polypropylene vent, efficient LEDs with road logistics, and no chrome. These are the report's modelled results against the original product.",
      ],
      media: [
        {
          type: "chart",
          unit: "% vs original (modelled)",
          summary:
            "Modelled improvements of the final concept: about 85% lower carbon footprint, about 65% lower ReCiPe endpoint damage, and 84% of the vent's plastic suitable for single-stream recycling.",
          series: [
            { label: "Carbon footprint reduction", value: 85, highlight: true },
            { label: "ReCiPe endpoint reduction", value: 65 },
            { label: "Plastic recyclable (single stream)", value: 84 },
          ],
          caption:
            "Modelled results of the final concept (report, IHOBE calculator)",
          credit: "mikel",
        },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      body: [
        "Draft: limits of the study (inventory assumptions, modelled not measured) and what I learned leading an LCA. To be written with Mikel.",
      ],
    },
  ],
};
