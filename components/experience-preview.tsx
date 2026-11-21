import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPeriod } from "@/lib/i18n";
import EdgeStubs from "./edge-stubs";
import type { Lang } from "@/lib/i18n";
import type { ExperienceEntry } from "@/lib/content";

const shown = ["futtec", "showmore", "blackfish"];

/** Home timeline preview: year nodes on a hairline axis (columns from lg, vertical list below). Each node is a .box link. */
export default function ExperiencePreview({ entries, lang }: { entries: ExperienceEntry[]; lang: Lang }) {
  const rows = shown.flatMap((s) => entries.filter((e) => e.slug === s));
  return (
    <ol className="axis grid gap-2 lg:grid-cols-3 lg:gap-6">
      {rows.map((e) => (
        <li key={e.slug} className="stub-host">
          <Link
            href={`/${lang}/experience#${e.slug}`}
            className="box block h-full p-5 pt-4 [--box-bg:var(--color-surface)] [--box-border:var(--color-border)] rounded-md shadow-1"
          >
            <span className="mono-meta tabular flex items-center gap-2 text-muted">
              <span className={`size-2 rounded-full ${e.end ? "bg-muted" : "bg-accent"}`} aria-hidden />
              {e.start?.getUTCFullYear()}
              <span className="sr-only"> ({formatPeriod(lang, e.start, e.end)})</span>
            </span>
            <span className="box-title mt-2 block font-semibold" translate="no">{e.position}</span>
            <span className="flex items-center justify-between gap-2 text-muted" translate="no">
              {e.company}
              <ArrowRight aria-hidden className="arrow size-4 flex-none text-text" />
            </span>
          </Link>
          <EdgeStubs count={1} />
        </li>
      ))}
    </ol>
  );
}
