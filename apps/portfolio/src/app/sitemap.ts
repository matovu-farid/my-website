import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { publicPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths().map((path) => ({ url: new URL(path, site.url).href }));
}
