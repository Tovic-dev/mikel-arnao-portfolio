// Site-wide facts live in the CMS (Site global, read with getSite()).

/** Absolute site URL for canonical links, sitemap and Open Graph (08 §9). */
export const siteUrl = new URL(process.env.SITE_URL ?? "http://localhost:3000");
