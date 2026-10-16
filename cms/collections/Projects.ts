import type { CollectionConfig } from "payload";
import { isAdmin, publishedOrAdmin } from "../access";
import { mediaBlocks, paragraphs, slugify } from "../fields";
import { revalidate, SITE_PATHS } from "../revalidate";

// Case studies and short entries (16 §6, mirrors 05 B5 / Part F).
export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["order", "title", "kind", "featured", "year", "_status"],
    listSearchableFields: ["title", "summary"],
  },
  defaultSort: "order",
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: publishedOrAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      ({ doc }) => revalidate([...SITE_PATHS, `/work/${doc.slug}`]),
    ],
    afterDelete: [
      ({ doc }) => revalidate([...SITE_PATHS, `/work/${doc.slug}`]),
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "kind",
          type: "select",
          required: true,
          defaultValue: "short",
          options: [
            { label: "Case study", value: "case-study" },
            { label: "Short entry", value: "short" },
          ],
        },
        {
          name: "order",
          type: "number",
          required: true,
          admin: {
            description: "Index number on the Work page (01–04 = flagships).",
          },
        },
      ],
    },
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL: /work/<slug>. Filled from the title if empty.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            value ? slugify(value) : slugify(String(data?.title ?? "")),
        ],
      },
    },
    { name: "productName", type: "text" },
    {
      name: "summary",
      type: "textarea",
      required: true,
      maxLength: 160,
      admin: {
        description: "≤ 160 characters. Also the search-engine description.",
      },
    },
    {
      type: "row",
      fields: [
        { name: "year", type: "number", required: true },
        {
          name: "date",
          type: "text",
          required: true,
          admin: { description: "ISO date from the report, e.g. 2025-06-16" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "course", type: "text", required: true },
        {
          name: "institution",
          type: "text",
          required: true,
          defaultValue: "Mondragon Unibertsitatea",
        },
      ],
    },
    {
      name: "collaboration",
      type: "text",
      admin: {
        description: "Exact approved wording only (decision log D-13).",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "context",
          type: "select",
          required: true,
          defaultValue: "academic",
          options: [
            { label: "With a company", value: "company" },
            { label: "Academic", value: "academic" },
            { label: "Competition", value: "competition" },
          ],
        },
        {
          name: "company",
          type: "text",
          admin: { condition: (_, s) => s?.context === "company" },
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description: "Flagship: shown on the homepage.",
      },
    },
    { name: "team", type: "text", hasMany: true },
    {
      name: "myRole",
      label: "My role",
      type: "text",
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        description:
          'Short lines starting with a verb, e.g. "Led the development phase, including CAD".',
      },
    },
    { name: "tools", type: "text", hasMany: true },
    {
      name: "fields",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Product design", value: "product-design" },
        { label: "Engineering & CAD", value: "engineering" },
        { label: "Sustainability", value: "sustainability" },
        { label: "Research", value: "research" },
        { label: "Brand & graphic", value: "brand" },
        { label: "UX/UI", value: "ux" },
      ],
    },
    {
      name: "recognition",
      type: "text",
      admin: { description: "Only with evidence." },
    },
    {
      type: "row",
      fields: [
        { name: "hero", type: "upload", relationTo: "media", required: true },
        {
          name: "cardImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "processTiles",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      admin: {
        description:
          "Homepage process grid: sketch, CAD, render (featured case studies).",
        condition: (_, s) => s?.kind === "case-study",
      },
    },
    {
      name: "sections",
      type: "array",
      admin: { condition: (_, s) => s?.kind === "case-study" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "sectionId",
              type: "text",
              required: true,
              admin: { description: "Anchor, e.g. research" },
            },
            { name: "title", type: "text", required: true },
          ],
        },
        paragraphs("body"),
        { name: "media", type: "blocks", blocks: mediaBlocks },
      ],
    },
    paragraphs("body", "About the project", {
      condition: (_, s) => s?.kind === "short",
    }),
    {
      name: "media",
      type: "blocks",
      blocks: mediaBlocks,
      admin: { condition: (_, s) => s?.kind === "short" },
    },
  ],
};
