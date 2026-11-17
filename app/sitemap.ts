import type { MetadataRoute } from "next";
import { langs, siteUrl } from "@/lib/i18n";
import { getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("en");
  const paths = ["", "/experience", "/projects", "/skills", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl}/en${path}`,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l, `${siteUrl}/${l}${path}`])) },
  }));
}
