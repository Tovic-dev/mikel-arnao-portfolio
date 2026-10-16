import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// 11 §3. Vercel preview deployments add their own noindex header.
export default function robots(): MetadataRoute.Robots {
  return {
    // The CMS is login-only; keep it out of search results (16 §7).
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
