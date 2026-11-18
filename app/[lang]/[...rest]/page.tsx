import { notFound } from "next/navigation";
import { langs } from "@/lib/i18n";

// Unknown paths under /en or /cs render the localized not-found page with the site chrome.
// Same pattern as projects/[slug]: wait for the full render so notFound() sends a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang, rest: ["404"] }));
}

export default function CatchAll() {
  notFound();
}
