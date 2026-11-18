import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLang, langs } from "@/lib/i18n";
import NotFoundView from "@/components/not-found-view";

// Unknown paths under /en or /cs: proxy.ts rewrites them to /{lang}/404 with status 404.
// The page renders the 404 itself instead of calling notFound(): under cacheComponents a
// notFound() response is an empty error shell filled in by the client, without <html lang> or an h1.
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
  return <NotFoundView lang={lang} />;
}
