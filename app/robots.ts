import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n";
import { buildRobots } from "@/lib/crawlers";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(siteUrl);
}
