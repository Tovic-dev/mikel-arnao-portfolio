import type { ArrayField, Block, Field } from "payload";

// Shared fields and the section media blocks (16 §6). One block per media
// module the site already renders (components/media/MediaBlock.tsx).

const caption: Field = { name: "caption", type: "text" };
const credit: Field = {
  name: "credit",
  type: "text",
  admin: { description: '"mikel", "team" or a teammate\'s name' },
};
const width: Field = {
  name: "width",
  type: "select",
  defaultValue: "wide",
  options: [
    { label: "Text column", value: "text" },
    { label: "Wide", value: "wide" },
    { label: "Full-bleed", value: "full-bleed" },
  ],
};
const image = (name: string, label?: string): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  required: true,
});

export const mediaBlocks: Block[] = [
  {
    slug: "image",
    labels: { singular: "Image", plural: "Images" },
    fields: [image("image"), caption, credit, width],
  },
  {
    slug: "grid",
    labels: { singular: "Image grid", plural: "Image grids" },
    fields: [
      {
        name: "images",
        type: "upload",
        relationTo: "media",
        hasMany: true,
        minRows: 2,
        maxRows: 4,
        required: true,
      },
      caption,
      credit,
    ],
  },
  {
    slug: "compare",
    labels: { singular: "CAD / render compare", plural: "Compares" },
    fields: [
      image("before", "Before (e.g. CAD)"),
      {
        name: "beforeLabel",
        type: "text",
        defaultValue: "CAD",
        required: true,
      },
      image("after", "After (e.g. render)"),
      {
        name: "afterLabel",
        type: "text",
        defaultValue: "Render",
        required: true,
      },
      caption,
      credit,
      width,
    ],
  },
  {
    slug: "annotated",
    labels: { singular: "Annotated image", plural: "Annotated images" },
    fields: [
      image("image"),
      {
        name: "annotations",
        type: "array",
        minRows: 1,
        admin: {
          description:
            "Positions in % of the image: point (x, y) and label (labelX, labelY).",
        },
        fields: [
          { name: "text", type: "text", required: true },
          {
            type: "row",
            fields: [
              { name: "x", type: "number", min: 0, max: 100, required: true },
              { name: "y", type: "number", min: 0, max: 100, required: true },
              {
                name: "labelX",
                type: "number",
                min: 0,
                max: 100,
                required: true,
              },
              {
                name: "labelY",
                type: "number",
                min: 0,
                max: 100,
                required: true,
              },
            ],
          },
        ],
      },
      caption,
      credit,
      width,
    ],
  },
  {
    slug: "table",
    labels: { singular: "Spec table", plural: "Spec tables" },
    fields: [
      { name: "columns", type: "text", hasMany: true, required: true },
      {
        name: "rows",
        type: "array",
        minRows: 1,
        fields: [
          { name: "cells", type: "text", hasMany: true, required: true },
        ],
      },
      caption,
      credit,
    ],
  },
  {
    slug: "chart",
    labels: { singular: "Bar chart", plural: "Bar charts" },
    fields: [
      { name: "unit", type: "text", required: true },
      {
        name: "summary",
        type: "textarea",
        required: true,
        admin: {
          description: "Read out to screen readers: what the chart shows.",
        },
      },
      {
        name: "series",
        type: "array",
        minRows: 1,
        fields: [
          { name: "label", type: "text", required: true },
          { name: "value", type: "number", required: true },
          { name: "highlight", type: "checkbox" },
        ],
      },
      caption,
      credit,
    ],
  },
  {
    slug: "sequence",
    labels: { singular: "Step sequence", plural: "Step sequences" },
    fields: [
      {
        name: "steps",
        type: "array",
        minRows: 2,
        fields: [
          image("image"),
          { name: "title", type: "text", required: true },
        ],
      },
      caption,
      credit,
    ],
  },
];

/** URL-safe slug from a title, used when the slug field is left empty. */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Paragraph list (2–4 sentences each). */
export const paragraphs = (
  name: string,
  label?: string,
  admin?: ArrayField["admin"],
): ArrayField => ({
  name,
  label,
  admin,
  type: "array",
  minRows: 1,
  fields: [{ name: "text", type: "textarea", required: true }],
});
