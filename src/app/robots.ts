import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

// Genera /robots.txt: permite indexar toda la web y apunta al sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
