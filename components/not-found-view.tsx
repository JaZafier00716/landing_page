import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDict, type Lang } from "@/lib/i18n";

/** Localized 404 body, used by the catch-all page (server-rendered) and not-found.tsx. */
export default function NotFoundView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div className="container-page section">
      <h1 className="h1-inner">{d.notFound.title}</h1>
      <p className="mt-4 max-w-prose">{d.notFound.text}</p>
      <p className="mt-8 flex flex-wrap gap-x-6">
        <Link href={`/${lang}/projects`} className="link inline-flex min-h-11 items-center">
          {d.projects.all}
        </Link>
        <Link href={`/${lang}`} className="link inline-flex min-h-11 items-center">
          {d.notFound.home}
        </Link>
      </p>
    </div>
  );
}

async function Missing(): Promise<never> {
  notFound();
}

/**
 * Real 404 with the localized page in the server HTML. A bare notFound() under cacheComponents sends an
 * empty client-filled shell; thrown inside Suspense it still sets the 404 status, and the fallback (this view) is what the server renders.
 */
export function NotFoundPage({ lang }: { lang: Lang }) {
  return (
    <Suspense fallback={<NotFoundView lang={lang} />}>
      <Missing />
    </Suspense>
  );
}
