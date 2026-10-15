import type { StaticImageData } from "next/image";

// Content model — docs/portfolio/05-page-specifications.md §B5.
// Required fields are required here, so a missing hero, alt text or role fails the build.

/** Filterable fields on the Work page (05 Part D3). */
export type Field =
  | "product-design"
  | "engineering"
  | "sustainability"
  | "research"
  | "brand"
  | "ux";

export const fieldLabels: Record<Field, string> = {
  "product-design": "Product design",
  engineering: "Engineering & CAD",
  sustainability: "Sustainability",
  research: "Research",
  brand: "Brand & graphic",
  ux: "UX/UI",
};

/** Short labels for dense rows and cards. */
export const fieldShortLabels: Record<Field, string> = {
  "product-design": "Product",
  engineering: "Engineering",
  sustainability: "Sustainability",
  research: "Research",
  brand: "Brand",
  ux: "UX/UI",
};

export type ProjectContext = "company" | "academic" | "competition";

/** Who made the figure, shown in the caption. "team" or a teammate's name. */
export type Credit = "mikel" | "team" | (string & {});

export type MediaWidth = "text" | "wide" | "full-bleed";

interface MediaBase {
  caption?: string;
  credit?: Credit;
  width?: MediaWidth;
  /** True while a stand-in image is used. Launch requires zero placeholders. */
  placeholder?: boolean;
}

export interface ImageAsset {
  src: StaticImageData;
  /** Descriptive alt text. Use "" only for purely decorative tiles. */
  alt: string;
  placeholder?: boolean;
}

export interface ImageMedia extends MediaBase, ImageAsset {
  type: "image";
}

export interface GridMedia extends MediaBase {
  type: "grid";
  images: ImageAsset[];
}

export interface CompareMedia extends MediaBase {
  type: "compare";
  before: ImageAsset & { label: string };
  after: ImageAsset & { label: string };
}

export interface Annotation {
  /** Point on the image, in % of width/height. */
  x: number;
  y: number;
  /** Where the label sits, in % of width/height. */
  labelX: number;
  labelY: number;
  text: string;
}

export interface AnnotatedMedia extends MediaBase, ImageAsset {
  type: "annotated";
  annotations: Annotation[];
}

export interface TableMedia extends MediaBase {
  type: "table";
  columns: string[];
  rows: string[][];
}

export interface ChartMedia extends MediaBase {
  type: "chart";
  unit: string;
  /** Accessible summary of what the chart shows. */
  summary: string;
  series: { label: string; value: number; highlight?: boolean }[];
}

export interface SequenceMedia extends MediaBase {
  type: "sequence";
  steps: (ImageAsset & { title: string })[];
}

export type Media =
  | ImageMedia
  | GridMedia
  | CompareMedia
  | AnnotatedMedia
  | TableMedia
  | ChartMedia
  | SequenceMedia;

export interface Section {
  /** Anchor id, e.g. "research". */
  id: string;
  title: string;
  /** Short paragraphs (2–4 sentences each). */
  body: string[];
  media?: Media[];
}

interface ProjectBase {
  slug: string;
  /** Stable index number on the Work page (01–04 = flagships). */
  order: number;
  title: string;
  productName?: string;
  /** ≤ 160 characters; also the meta description. */
  summary: string;
  year: number;
  /** ISO date from the report. */
  date: string;
  course: string;
  institution: string;
  /** Exact approved wording only (decision log D-13). */
  collaboration?: string;
  context: ProjectContext;
  /** Short name for the Context column when context is "company". */
  company?: string;
  /** Flagships: shown on the homepage. */
  featured: boolean;
  team: string[];
  myRole: [string, ...string[]];
  tools: string[];
  fields: [Field, ...Field[]];
  /** Only with evidence. */
  recognition?: string;
  hero: ImageAsset;
  cardImage: ImageAsset;
  status: "draft" | "published";
}

export interface CaseStudy extends ProjectBase {
  kind: "case-study";
  /** Three square tiles for the homepage process grid: sketch, CAD, render. */
  processTiles: [ImageAsset, ImageAsset, ImageAsset];
  sections: [Section, ...Section[]];
}

/** Lighter project page (05 Part E). */
export interface ShortEntry extends ProjectBase {
  kind: "short";
  /** "About the project": 2–3 short paragraphs. */
  body: [string, ...string[]];
  media?: Media[];
}

export type Project = CaseStudy | ShortEntry;

/** Lab entries (05 Part G): small explorations, labelled by what they are. */
export type LabType =
  "sketch" | "render" | "experiment" | "code" | "early" | "note";

export const labTypeLabels: Record<LabType, string> = {
  sketch: "Sketch",
  render: "Render study",
  experiment: "Experiment",
  code: "Code",
  early: "Early work",
  note: "Note",
};

export interface LabEntry {
  /** Stable id, e.g. "L-004". */
  id: string;
  title: string;
  type: LabType;
  /** ISO date; the year is shown. */
  date: string;
  /** 1–4 images; the first is the frame. */
  images: [ImageAsset, ...ImageAsset[]];
  /** 1–3 sentences. */
  note: string;
  /** Slug of a related project. */
  relatedProject?: string;
  link?: { label: string; href: string };
}

export interface Interest {
  title: string;
  note: string;
}
