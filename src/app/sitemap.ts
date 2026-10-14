import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
