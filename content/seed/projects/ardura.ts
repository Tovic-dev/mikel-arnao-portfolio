import type { CaseStudy } from "../../types";
import { placeholders } from "./_placeholders";

const img = placeholders.ardura;

// DRAFT copy from "PBL05 Group06 Final Report" (EN). Facts: 09 §3.1. To be checked at Checkpoint B.
export const ardura: CaseStudy = {
  kind: "case-study",
  slug: "ardura",
  order: 1,
  title: "Ardura",
  productName: "Smart self-sufficient plant pot",
  summary:
    "A smart plant pot designed to water itself from indoor light, for people who want plants at home but lack the time to look after them.",
  year: 2026,
  date: "2026-01",
  course: "PBL5 · 3rd year",
  institution: "Mondragon Unibertsitatea",
  team: ["Danel Iturbe", "Egoitz Fernandez", "Mikel Martin", "Maria Martinez"],
  myRole: ["Led the development phase, including CAD", "Led the final renders"],
  tools: ["SolidWorks", "KeyShot", "Blender"],
  fields: ["product-design", "engineering", "sustainability"],
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
        "The project started from what the team called the biophilic paradox: people want nature at home but don't have the time to care for it.",
        "The brief was a plant pot that looks after the plant on its own, without depending on the electrical grid, and built on circular materials.",
      ],
    },
    {
      id: "research",
      title: "Research",
      body: [
        "We ran a DEPEST analysis, mapped existing smart planters and looked for a gap in the market. A customer journey map and personas defined who the product is for.",
      ],
      media: [
        {
          type: "grid",
          images: [img.figure, img.portrait],
          caption: "Customer journey and personas",
          credit: "team",
          placeholder: true,
        },
      ],
    },
    {
      id: "concepts",
      title: "Concepts",
      body: [
        "Brainstorming and sketching explored how water, light and energy could flow through one object. The selected concept combines organic photovoltaic cells that capture indoor light with a hydraulic pressure system for watering.",
      ],
      media: [
        {
          type: "image",
          ...img.sketch,
          caption: "Concept sketches",
          credit: "team",
          width: "text",
        },
      ],
    },
    {
      id: "development",
      title: "Development",
      body: [
        "I led the development phase: the CAD model, the internal layout of reservoir, pump and cells, and the material choices. The body is recycled polypropylene with a mineral filler; the reservoir is a retractable rPET part.",
      ],
      media: [
        {
          type: "annotated",
          ...img.wide,
          caption: "Product architecture",
          credit: "mikel",
          width: "wide",
          annotations: [
            {
              x: 46,
              y: 34,
              labelX: 8,
              labelY: 18,
              text: "OPV cells · indoor light",
            },
            {
              x: 52,
              y: 58,
              labelX: 70,
              labelY: 46,
              text: "Hydraulic watering",
            },
            {
              x: 50,
              y: 78,
              labelX: 12,
              labelY: 82,
              text: "Retractable rPET reservoir",
            },
          ],
        },
        {
          type: "compare",
          before: { ...img.cad, label: "CAD" },
          after: { ...img.render, label: "Render" },
          caption: "From CAD model to final render",
          credit: "mikel",
          width: "wide",
          placeholder: true,
        },
      ],
    },
    {
      id: "specification",
      title: "Specification",
      body: [
        "The specification fixes materials and components so the product can be built and recycled at end of life.",
      ],
      media: [
        {
          type: "table",
          columns: ["Part", "Material", "Why"],
          rows: [
            [
              "Body",
              "Recycled PP + mineral filler",
              "Circular material, stiffness",
            ],
            ["Reservoir", "rPET, retractable", "Recycled, compact when empty"],
            ["Energy", "Organic photovoltaic cells", "Works with indoor light"],
          ],
          caption: "Main parts and materials (from the report)",
          credit: "team",
        },
      ],
    },
    {
      id: "result",
      title: "Result",
      body: [
        "Ardura is a calm, low-attention product: the plant is watered without the user having to think about it. I produced the final renders.",
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
      body: [
        "Draft: what worked, what I would test next (real energy measurements of the OPV cells indoors), and what I learned leading a development phase. To be written with Mikel.",
      ],
    },
  ],
};
