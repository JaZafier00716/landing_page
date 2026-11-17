import type { Metadata } from "next";
import { langs, type Lang } from "@/lib/i18n";

/** Canonical + hreflang alternates for a path below /{lang}. */
export const pageMeta = (lang: Lang, path: string, title: string | undefined, description: string): Metadata => ({
  title,
  description,
  alternates: {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(langs.map((l) => [l, `/${l}${path}`])),
  },
  openGraph: { title, description, url: `/${lang}${path}` },
});
