import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// 11 §3. Vercel preview deployments add their own noindex header.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
