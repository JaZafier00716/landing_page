import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLang, langs } from "@/lib/i18n";
import { NotFoundPage } from "@/components/not-found-view";

// Unknown paths under /en or /cs: a real 404 with the localized page (see NotFoundPage).
// Wait for the full render on first request, so the 404 status is decided before anything streams.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang, rest: ["404"] }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[...rest]">): Promise<Metadata> {
  const { lang } = await params;
  // Missing files under /_next, /images, ... land here with a non-language "lang".
  if (!isLang(lang)) return {};
  return { title: getDict(lang).notFound.title, robots: { index: false } };
}

export default async function CatchAll({ params }: PageProps<"/[lang]/[...rest]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <NotFoundPage lang={lang} />;
}
