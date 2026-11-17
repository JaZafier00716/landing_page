import type { Metadata } from "next";
import { langs, type Lang } from "@/lib/i18n";

/** Canonical + hreflang alternates for a path below /{lang}. Home passes `absolute` to skip the title template. */
export const pageMeta = (lang: Lang, path: string, title: string, description: string, absolute = false): Metadata => ({
  title: absolute ? { absolute: title } : title,
  description,
  alternates: {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(langs.map((l) => [l, `/${l}${path}`])),
  },
  openGraph: { title: absolute ? title : `${title} | Jan Zámostný`, description, url: `/${lang}${path}`, images: [`/${lang}/opengraph-image`] },
});
