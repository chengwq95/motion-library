import type { MetadataRoute } from "next";
import { animations } from "@/lib/animations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...animations.map((a) => ({ url: `${SITE_URL}/effects/${a.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
