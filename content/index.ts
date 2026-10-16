import config from "@payload-config";
import type { StaticImageData } from "next/image";
import { getPayload, type Where } from "payload";
import { cache } from "react";
import type {
  About as AboutDoc,
  Homepage as HomepageDoc,
  LabEntry as LabEntryDoc,
  LabPage as LabPageDoc,
  Media as MediaDoc,
  Project as ProjectDoc,
  Site as SiteDoc,
} from "@/payload-types";
import type {
  Annotation,
  CaseStudy,
  Field,
  ImageAsset,
  Interest,
  LabEntry,
  Media,
  Project,
  ProjectContext,
} from "./types";
import { siteUrl } from "./site";

// Content comes from Payload's Local API (docs/portfolio/16 §3): a direct
// database query on the server. Documents are mapped to the types in
// ./types.ts, so components don't depend on the CMS schema.

const payload = cache(() => getPayload({ config }));

/** Drafts are visible in development; production shows published documents only. */
const showDrafts = process.env.NODE_ENV !== "production";
const published: Where = showDrafts ? {} : { _status: { equals: "published" } };

type Upload = number | MediaDoc | null | undefined;

const opt = <T>(value: T | null | undefined): T | undefined =>
  value ?? undefined;

function image(media: Upload): ImageAsset {
  if (!media || typeof media === "number" || !media.url) {
    throw new Error("Missing image: an upload was deleted or not populated.");
  }
  // Local uploads come back as absolute URLs on SITE_URL; next/image treats
  // those as remote, so keep them relative. Blob URLs stay absolute.
  const url = new URL(media.url, siteUrl);
  const src: StaticImageData = {
    src: url.origin === siteUrl.origin ? url.pathname + url.search : url.href,
    width: media.width ?? 1,
    height: media.height ?? 1,
    blurDataURL: opt(media.blurDataURL),
  };
  return {
    src,
    // "decorative" in the dashboard means an empty alt (repeated images only).
    alt: media.alt.trim().toLowerCase() === "decorative" ? "" : media.alt,
    placeholder: opt(media.placeholder),
  };
}

const annotation = (a: Annotation): Annotation => ({
  text: a.text,
  x: a.x,
  y: a.y,
  labelX: a.labelX,
  labelY: a.labelY,
});

type Block = NonNullable<ProjectDoc["media"]>[number];

function mediaBlock(b: Block): Media {
  const base = { caption: opt(b.caption), credit: opt(b.credit) };
  switch (b.blockType) {
    case "image":
      return { type: "image", ...base, width: opt(b.width), ...image(b.image) };
    case "grid":
      return { type: "grid", ...base, images: b.images.map(image) };
    case "compare":
      return {
        type: "compare",
        ...base,
        width: opt(b.width),
        before: { ...image(b.before), label: b.beforeLabel },
        after: { ...image(b.after), label: b.afterLabel },
      };
    case "annotated":
      return {
        type: "annotated",
        ...base,
        width: opt(b.width),
        ...image(b.image),
        annotations: (b.annotations ?? []).map(annotation),
      };
    case "table":
      return {
        type: "table",
        ...base,
        columns: b.columns,
        rows: (b.rows ?? []).map((r) => r.cells),
      };
    case "chart":
      return {
        type: "chart",
        ...base,
        unit: b.unit,
        summary: b.summary,
        series: (b.series ?? []).map((s) => ({
          label: s.label,
          value: s.value,
          highlight: opt(s.highlight),
        })),
      };
    case "sequence":
      return {
        type: "sequence",
        ...base,
        steps: (b.steps ?? []).map((s) => ({
          ...image(s.image),
          title: s.title,
        })),
      };
  }
}

const texts = (list: { text: string }[] | null | undefined) =>
  (list ?? []).map((p) => p.text);

function project(d: ProjectDoc): Project {
  const base = {
    slug: d.slug,
    order: d.order,
    title: d.title,
    productName: opt(d.productName),
    summary: d.summary,
    year: d.year,
    date: d.date,
    course: d.course,
    institution: d.institution,
    collaboration: opt(d.collaboration),
    context: d.context as ProjectContext,
    company: opt(d.company),
    featured: Boolean(d.featured),
    team: d.team ?? [],
    myRole: d.myRole as [string, ...string[]],
    tools: d.tools ?? [],
    fields: d.fields as [Field, ...Field[]],
    recognition: opt(d.recognition),
    hero: image(d.hero),
    cardImage: image(d.cardImage),
    status: d._status === "published" ? "published" : "draft",
  } as const;

  if (d.kind === "case-study") {
    return {
      ...base,
      kind: "case-study",
      processTiles: (d.processTiles ?? []).map(
        image,
      ) as CaseStudy["processTiles"],
      sections: (d.sections ?? []).map((s) => ({
        id: s.sectionId,
        title: s.title,
        body: texts(s.body),
        media: (s.media ?? []).map(mediaBlock),
      })) as CaseStudy["sections"],
    };
  }
  return {
    ...base,
    kind: "short",
    body: texts(d.body) as [string, ...string[]],
    media: (d.media ?? []).map(mediaBlock),
  };
}

/** Every published project in Work-page order (05 Part D2). */
export const getProjects = cache(async (): Promise<Project[]> => {
  const { docs } = await (
    await payload()
  ).find({
    collection: "projects",
    where: published,
    draft: showDrafts,
    sort: "order",
    limit: 100,
    depth: 1,
  });
  return docs.map(project);
});

/** Homepage flagships: featured case studies. */
export async function getFeatured(): Promise<CaseStudy[]> {
  return (await getProjects()).filter(
    (p): p is CaseStudy => p.kind === "case-study" && p.featured,
  );
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

/** Previous and next project across all projects, wrapping around. */
export async function getAdjacent(
  slug: string,
): Promise<{ prev: Project; next: Project } | undefined> {
  const list = await getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return undefined;
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  return prev && next ? { prev, next } : undefined;
}

function labEntry(d: LabEntryDoc): LabEntry {
  const related = d.relatedProject;
  return {
    id: d.entryId,
    title: d.title,
    type: d.type,
    date: d.date,
    images: d.images.map(image) as LabEntry["images"],
    note: d.note,
    relatedProject:
      related && typeof related === "object" ? related.slug : undefined,
    link:
      d.linkLabel && d.linkHref
        ? { label: d.linkLabel, href: d.linkHref }
        : undefined,
  };
}

/** Lab entries, newest first (05 Part G). */
export const getLabEntries = cache(async (): Promise<LabEntry[]> => {
  const { docs } = await (
    await payload()
  ).find({
    collection: "lab-entries",
    where: published,
    draft: showDrafts,
    sort: "-entryId",
    limit: 200,
    depth: 1,
  });
  return docs.map(labEntry);
});

/** Site-wide facts (Site global). */
export const getSite = cache(async (): Promise<SiteDoc> =>
  (await payload()).findGlobal({ slug: "site", depth: 0 }),
);

export interface Homepage {
  heroImage: ImageAsset;
  callouts: Annotation[];
  processGrid: HomepageDoc["processGrid"];
  approachTitle: string;
  approach: { title: string; text: string; proof: string; href: string }[];
}

export const getHomepage = cache(async (): Promise<Homepage> => {
  const d = await (await payload()).findGlobal({ slug: "homepage", depth: 1 });
  return {
    heroImage: image(d.hero.image),
    callouts: (d.hero.callouts ?? []).map(annotation),
    processGrid: d.processGrid,
    approachTitle: d.approachTitle,
    approach: (d.approach ?? []).map(({ title, text, proof, href }) => ({
      title,
      text,
      proof,
      href,
    })),
  };
});

export interface About {
  title: string;
  intro: string;
  portrait?: ImageAsset;
  howIWork: string[];
  tools: { tool: string; where: string }[];
}

export const getAbout = cache(async (): Promise<About> => {
  const d: AboutDoc = await (
    await payload()
  ).findGlobal({ slug: "about", depth: 1 });
  return {
    title: d.title,
    intro: d.intro,
    portrait: d.portrait ? image(d.portrait) : undefined,
    howIWork: texts(d.howIWork),
    tools: (d.tools ?? []).map(({ tool, where }) => ({ tool, where })),
  };
});

export const getLabPage = cache(
  async (): Promise<{ intro: string; interests: Interest[] }> => {
    const d: LabPageDoc = await (
      await payload()
    ).findGlobal({ slug: "lab-page", depth: 0 });
    return {
      intro: d.intro,
      interests: (d.interests ?? []).map(({ title, note }) => ({
        title,
        note,
      })),
    };
  },
);
