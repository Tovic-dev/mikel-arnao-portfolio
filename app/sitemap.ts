import type { MetadataRoute } from "next";
import { getProjects } from "@/content";
import { siteUrl } from "@/content/site";

// 11 §3: home, about and the case studies.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    ...getProjects().map((p) => ({
      url: url(`/work/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
