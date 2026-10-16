// One-off import of the typed content in content/seed/ into the CMS
// (docs/portfolio/16 §8). Safe to re-run: documents are matched by slug, entry
// id and image file, and updated instead of duplicated.
//
//   pnpm seed                 local database (.env.local)
//   SEED_IF_EMPTY=1 pnpm seed  only if the Site global was never filled in. The
//                             Vercel build runs this, so a new production
//                             database gets the content once and is never
//                             overwritten afterwards (vercel.json).
import { register } from "node:module";
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Project as ProjectDoc } from "../payload-types";
import type { ImageAsset, Media, Project } from "../content/types";

// Lets the seed files' image imports load outside Next (see the loader).
register("./image-loader.mjs", import.meta.url);

const { site } = await import("../content/seed/site");
const { homepage, about, labPage } = await import("../content/seed/pages");
const { labEntries, interests } = await import("../content/seed/lab");
const projects: Project[] = await Promise.all(
  [
    "ardura",
    "seat-ateca-mirror",
    "mercedes-vent-lca",
    "orbea-cycle-dry",
    "bira",
    "senda-norte",
    "stroller-research",
  ].map(async (file) => {
    const mod = await import(`../content/seed/projects/${file}`);
    return Object.values(mod)[0] as Project;
  }),
);

const payload = await getPayload({ config });
const log = (msg: string) => payload.logger.info(`seed: ${msg}`);

// An environment variable, not a flag: `payload run` drops unknown flags.
if (process.env.SEED_IF_EMPTY === "1") {
  const existing = await payload.findGlobal({ slug: "site", depth: 0 });
  if (existing.name) {
    log("database already has content, skipping");
    process.exit(0);
  }
}

// Images: one Media document per file + alt text.
const uploaded = new Map<string, number>();

async function upload(asset: ImageAsset): Promise<number> {
  const file = asset.src.src;
  const alt = asset.alt === "" ? "decorative" : asset.alt;
  const key = `${file}|${alt}`;
  const known = uploaded.get(key);
  if (known) return known;

  const name = path.parse(file).name;
  const existing = await payload.find({
    collection: "media",
    where: { and: [{ alt: { equals: alt } }, { filename: { like: name } }] },
    limit: 1,
    depth: 0,
  });
  const id =
    existing.docs[0]?.id ??
    (
      await payload.create({
        collection: "media",
        data: { alt, placeholder: Boolean(asset.placeholder) },
        filePath: file,
        depth: 0,
      })
    ).id;
  uploaded.set(key, id);
  return id;
}

type Block = NonNullable<ProjectDoc["media"]>[number];

async function block(m: Media): Promise<Block> {
  const base = { caption: m.caption, credit: m.credit };
  switch (m.type) {
    case "image":
      return {
        blockType: "image",
        ...base,
        width: m.width,
        image: await upload(m),
      };
    case "grid":
      return {
        blockType: "grid",
        ...base,
        images: await Promise.all(m.images.map(upload)),
      };
    case "compare":
      return {
        blockType: "compare",
        ...base,
        width: m.width,
        before: await upload(m.before),
        beforeLabel: m.before.label,
        after: await upload(m.after),
        afterLabel: m.after.label,
      };
    case "annotated":
      return {
        blockType: "annotated",
        ...base,
        width: m.width,
        image: await upload(m),
        annotations: m.annotations,
      };
    case "table":
      return {
        blockType: "table",
        ...base,
        columns: m.columns,
        rows: m.rows.map((cells) => ({ cells })),
      };
    case "chart":
      return {
        blockType: "chart",
        ...base,
        unit: m.unit,
        summary: m.summary,
        series: m.series,
      };
    case "sequence":
      return {
        blockType: "sequence",
        ...base,
        steps: await Promise.all(
          m.steps.map(async (s) => ({
            image: await upload(s),
            title: s.title,
          })),
        ),
      };
  }
}

const blocks = (list: Media[] | undefined) =>
  Promise.all((list ?? []).map(block));

// Sequential on purpose: uploads are deduplicated as they happen.
async function serial<T, R>(items: T[], fn: (item: T) => Promise<R>) {
  const out: R[] = [];
  for (const item of items) out.push(await fn(item));
  return out;
}

// Projects
const projectIds = new Map<string, number>();
for (const p of projects) {
  const data = {
    kind: p.kind,
    order: p.order,
    title: p.title,
    slug: p.slug,
    productName: p.productName,
    summary: p.summary,
    year: p.year,
    date: p.date,
    course: p.course,
    institution: p.institution,
    collaboration: p.collaboration,
    context: p.context,
    company: p.company,
    featured: p.featured,
    team: p.team,
    myRole: p.myRole,
    tools: p.tools,
    fields: p.fields,
    recognition: p.recognition,
    hero: await upload(p.hero),
    cardImage: await upload(p.cardImage),
    ...(p.kind === "case-study"
      ? {
          processTiles: await serial(p.processTiles, upload),
          sections: await serial(p.sections, async (s) => ({
            sectionId: s.id,
            title: s.title,
            body: s.body.map((text) => ({ text })),
            media: await blocks(s.media),
          })),
        }
      : {
          body: p.body.map((text) => ({ text })),
          media: await blocks(p.media),
        }),
    _status: p.status,
  } satisfies Partial<ProjectDoc>;

  const existing = await payload.find({
    collection: "projects",
    where: { slug: { equals: p.slug } },
    draft: true,
    limit: 1,
    depth: 0,
  });
  const id = existing.docs[0]?.id;
  const doc = id
    ? await payload.update({ collection: "projects", id, data, depth: 0 })
    : await payload.create({ collection: "projects", data, depth: 0 });
  projectIds.set(p.slug, doc.id);
  log(`project ${p.slug}`);
}

// Lab entries
for (const e of labEntries) {
  const data = {
    entryId: e.id,
    type: e.type,
    date: e.date,
    title: e.title,
    images: await serial(e.images, upload),
    note: e.note,
    relatedProject: e.relatedProject
      ? projectIds.get(e.relatedProject)
      : undefined,
    linkLabel: e.link?.label,
    linkHref: e.link?.href,
    _status: "published" as const,
  };
  const existing = await payload.find({
    collection: "lab-entries",
    where: { entryId: { equals: e.id } },
    draft: true,
    limit: 1,
    depth: 0,
  });
  const id = existing.docs[0]?.id;
  if (id) await payload.update({ collection: "lab-entries", id, data });
  else await payload.create({ collection: "lab-entries", data });
  log(`lab entry ${e.id}`);
}

// Globals
await payload.updateGlobal({
  slug: "site",
  data: {
    ...site,
    education: { ...site.education },
    languages: site.languages.map((l) => ({ ...l })),
  },
});
await payload.updateGlobal({
  slug: "homepage",
  data: {
    hero: {
      image: await upload(homepage.hero.image),
      callouts: homepage.hero.callouts,
    },
    processGrid: homepage.processGrid,
    approachTitle: homepage.approachTitle,
    approach: homepage.approach,
  },
});
await payload.updateGlobal({
  slug: "about",
  data: {
    title: about.title,
    intro: about.intro,
    portrait: await upload(about.portrait),
    howIWork: about.howIWork.map((text) => ({ text })),
    tools: about.tools,
  },
});
await payload.updateGlobal({
  slug: "lab-page",
  data: { intro: labPage.intro, interests },
});
log("globals");

log(
  `done: ${projects.length} projects, ${labEntries.length} lab entries, ${uploaded.size} images`,
);
process.exit(0);
