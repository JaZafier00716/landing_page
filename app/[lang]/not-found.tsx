import { lang as rootLang } from "next/root-params";
import { isLang } from "@/lib/i18n";
import NotFoundView from "@/components/not-found-view";

// Reached by notFound() (unknown project slugs). not-found gets no params; the root param knows the language.
export default async function NotFound() {
  const raw = await rootLang();
  return <NotFoundView lang={isLang(raw) ? raw : "en"} />;
}
