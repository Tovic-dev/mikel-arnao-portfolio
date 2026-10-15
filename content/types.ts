import type { StaticImageData } from "next/image";

// Content model — docs/portfolio/05-page-specifications.md §B5.
// Required fields are required here, so a missing hero, alt text or role fails the build.

export type Discipline =
  | "product-design"
  | "cad"
  | "engineering"
  | "sustainability"
  | "research"
  | "ux";

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

export interface Project {
  slug: string;
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
  team: string[];
  myRole: [string, ...string[]];
  tools: string[];
  disciplines: [Discipline, ...Discipline[]];
  /** Only with evidence. */
  recognition?: string;
  hero: ImageAsset;
  cardImage: ImageAsset;
  /** Three square tiles for the homepage process grid: sketch, CAD, render. */
  processTiles: [ImageAsset, ImageAsset, ImageAsset];
  sections: [Section, ...Section[]];
  status: "draft" | "published";
}
