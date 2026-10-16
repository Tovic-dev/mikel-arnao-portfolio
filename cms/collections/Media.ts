import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import sharp from "sharp";
import { anyone, isAdmin } from "../access";
import { revalidate, SITE_PATHS } from "../revalidate";

// Tiny blurred preview for next/image's placeholder="blur", made on upload.
const addBlur: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file?.data;
  if (!file) return data;
  const preview = await sharp(file).resize(10).webp({ quality: 40 }).toBuffer();
  return {
    ...data,
    blurDataURL: `data:image/webp;base64,${preview.toString("base64")}`,
  };
};

// Uploaded images (16 §5). Upload web masters (pnpm images:export), not raw renders.
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    group: "Content",
    defaultColumns: ["filename", "alt", "placeholder"],
  },
  access: { read: anyone, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    // Locally files go to /media-uploads (git-ignored); on Vercel the Blob adapter takes over.
    staticDir: "media-uploads",
  },
  hooks: {
    beforeChange: [addBlur],
    afterChange: [() => revalidate(SITE_PATHS)],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          'Describe what the image shows for screen readers. Use "decorative" only for tiles that repeat an image shown elsewhere.',
      },
    },
    {
      name: "placeholder",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description:
          "Stand-in image. Launch requires none (pnpm check:placeholders).",
      },
    },
    {
      name: "blurDataURL",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
