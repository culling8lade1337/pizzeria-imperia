import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu"].map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly", priority: p ? 0.9 : 1 }));
}
