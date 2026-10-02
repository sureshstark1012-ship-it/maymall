import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { publicRoutes } from "@/data/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable || !siteConfig.origin) return [];
  return publicRoutes.map((path) => ({
    url: new URL(path, siteConfig.origin).href,
  }));
}
