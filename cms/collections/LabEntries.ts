import type { CollectionConfig } from "payload";
import { isAdmin, publishedOrAdmin } from "../access";
import { revalidate } from "../revalidate";

// Lab entries (16 §6, 05 Part G).
export const LabEntries: CollectionConfig = {
  slug: "lab-entries",
  labels: { singular: "Lab entry", plural: "Lab entries" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["entryId", "title", "type", "date", "_status"],
  },
  defaultSort: "-date",
  versions: { drafts: true, maxPerDoc: 10 },
  access: {
    read: publishedOrAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [() => revalidate(["/lab"])],
    afterDelete: [() => revalidate(["/lab"])],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "entryId",
          label: "Entry ID",
          type: "text",
          required: true,
          unique: true,
          admin: { description: "L-###, stable" },
          validate: (v: string | null | undefined) =>
            /^L-\d{3}$/.test(v ?? "") || 'Use the format "L-001".',
        },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Sketch", value: "sketch" },
            { label: "Render study", value: "render" },
            { label: "Experiment", value: "experiment" },
            { label: "Code", value: "code" },
            { label: "Early work", value: "early" },
            { label: "Note", value: "note" },
          ],
        },
        {
          name: "date",
          type: "text",
          required: true,
          admin: { description: "ISO, e.g. 2026-02" },
        },
      ],
    },
    { name: "title", type: "text", required: true },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 4,
      admin: { description: "The first image is the frame." },
    },
    {
      name: "note",
      type: "textarea",
      required: true,
      admin: { description: "1–3 sentences." },
    },
    { name: "relatedProject", type: "relationship", relationTo: "projects" },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text" },
        { name: "linkHref", type: "text" },
      ],
    },
  ],
};
