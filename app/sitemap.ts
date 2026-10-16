import type { MetadataRoute } from "next";
import { getProjects } from "@/content";
import { siteUrl } from "@/content/site";

// 11 §3: home, about and the case studies. The dashboard and API are left out.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const url = (path: string) => new URL(path, siteUrl).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/lab"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    ...projects.map((p) => ({
      url: url(`/work/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
