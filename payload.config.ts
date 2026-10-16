import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { LabEntries } from "./cms/collections/LabEntries";
import { Media } from "./cms/collections/Media";
import { Projects } from "./cms/collections/Projects";
import { Users } from "./cms/collections/Users";
import { About, Homepage, LabPage, Site } from "./cms/globals";

// Payload CMS config (docs/portfolio/16-cms-specification.md).
const dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

if (process.env.NODE_ENV === "production" && !process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET must be set in production.");
}

export default buildConfig({
  serverURL: siteUrl,
  secret: process.env.PAYLOAD_SECRET ?? "dev-only-secret-change-me",
  routes: { admin: "/dashboard" },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Portfolio dashboard" },
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(
        dirname,
        "app/(payload)/dashboard/importMap.js",
      ),
    },
  },
  collections: [Projects, LabEntries, Media, Users],
  globals: [Site, Homepage, About, LabPage],
  db: postgresAdapter({
    // DATABASE_URL is what Neon's Vercel integration sets.
    pool: {
      connectionString: process.env.DATABASE_URI ?? process.env.DATABASE_URL,
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    vercelBlobStorage({
      // Only on Vercel (token present); locally uploads stay in /media-uploads.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Media is public: serve files straight from Blob's CDN, not through /api.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  // REST only; the dashboard doesn't need GraphQL (16 §7).
  graphQL: { disable: true },
  csrf: [siteUrl],
  cors: [siteUrl],
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
