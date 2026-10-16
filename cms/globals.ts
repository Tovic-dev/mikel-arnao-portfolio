import type { GlobalConfig } from "payload";
import { anyone, isAdmin } from "./access";
import { paragraphs } from "./fields";
import { revalidate, SITE_PATHS } from "./revalidate";

// Single documents for site-wide text (16 §6). Defaults mirror content/site.ts.
const access = { read: anyone, update: isAdmin };
const afterChange = [() => revalidate(SITE_PATHS)];

export const Site: GlobalConfig = {
  slug: "site",
  admin: { group: "Pages" },
  access,
  hooks: { afterChange },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "headline", type: "text", required: true },
    { name: "supporting", type: "textarea", required: true },
    { name: "availability", type: "text", required: true },
    { name: "signOff", type: "text" },
    { name: "location", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "linkedin", type: "text", required: true },
    {
      name: "education",
      type: "group",
      fields: [
        { name: "institution", type: "text", required: true },
        { name: "faculty", type: "text" },
        { name: "degree", type: "text", required: true },
        { name: "years", type: "text", required: true },
        { name: "current", type: "text" },
      ],
    },
    {
      name: "languages",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "level", type: "text", required: true },
      ],
    },
  ],
};

export const Homepage: GlobalConfig = {
  slug: "homepage",
  admin: { group: "Pages" },
  access,
  hooks: { afterChange },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        {
          name: "callouts",
          type: "array",
          maxRows: 3,
          admin: {
            description:
              "Labels on the hero render. Positions in % of the image: point (x, y) and label (labelX, labelY).",
          },
          fields: [
            { name: "text", type: "text", required: true },
            {
              type: "row",
              fields: ["x", "y", "labelX", "labelY"].map((name) => ({
                name,
                type: "number" as const,
                min: 0,
                max: 100,
                required: true,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "processGrid",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "lead", type: "textarea", required: true },
        { name: "ctaLabel", type: "text", required: true },
      ],
    },
    { name: "approachTitle", type: "text", required: true },
    {
      name: "approach",
      type: "array",
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
        { name: "proof", type: "text", required: true },
        {
          name: "href",
          type: "text",
          required: true,
          admin: { description: "e.g. /work/ardura#development" },
        },
      ],
    },
  ],
};

export const About: GlobalConfig = {
  slug: "about",
  admin: { group: "Pages" },
  access,
  hooks: { afterChange: [() => revalidate(["/about"])] },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "portrait", type: "upload", relationTo: "media" },
    paragraphs("howIWork", "How I work"),
    {
      name: "tools",
      type: "array",
      fields: [
        { name: "tool", type: "text", required: true },
        { name: "where", type: "text", required: true },
      ],
    },
  ],
};

export const LabPage: GlobalConfig = {
  slug: "lab-page",
  label: "Lab page",
  admin: { group: "Pages" },
  access,
  hooks: { afterChange: [() => revalidate(["/lab"])] },
  fields: [
    { name: "intro", type: "text", required: true },
    {
      name: "interests",
      label: "Currently exploring",
      type: "array",
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "note", type: "textarea", required: true },
      ],
    },
  ],
};
