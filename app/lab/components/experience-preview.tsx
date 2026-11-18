import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPeriod } from "@/lib/i18n";
import type { ExperienceEntry } from "@/lib/content";

const shown = ["futtec", "showmore", "blackfish"];
const pick = (all: ExperienceEntry[]) => shown.flatMap((s) => all.filter((e) => e.slug === s));

/** A: dated rows. B (timeline): year nodes on a hairline axis (desktop), vertical list on mobile. */
export default function ExperiencePreview({ entries, variant }: { entries: ExperienceEntry[]; variant: "a" | "b" }) {
  const rows = pick(entries);
  if (variant === "a") {
    return (
      <ol>
        {rows.map((e) => (
          <li key={e.slug}>
            <Link href={`/en/experience#${e.slug}`} className="hover-box group grid gap-x-6 gap-y-1 px-4 py-4 lg:grid-cols-[11rem_minmax(0,1fr)]">
              <span className="mono-meta tabular text-muted">{formatPeriod("en", e.start, e.end)}</span>
              <span className="min-w-0">
                <span className="box-title block font-semibold" translate="no">{e.position}, {e.company}</span>
                {e.bullets[0] && <span className="line-clamp-1 text-muted">{e.bullets[0]}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="axis grid gap-2 lg:grid-cols-3 lg:gap-6">
      {rows.map((e) => (
        <li key={e.slug}>
          <Link href={`/en/experience#${e.slug}`} className="box-b block p-5 pt-4">
            <span className="mono-meta tabular flex items-center gap-2 text-muted">
              <span className="size-2 rounded-full bg-accent" aria-hidden />
              {e.start?.getUTCFullYear()}
              <span className="sr-only"> ({formatPeriod("en", e.start, e.end)})</span>
            </span>
            <span className="box-title mt-2 block font-semibold" translate="no">{e.position}</span>
            <span className="flex items-center justify-between gap-2 text-muted" translate="no">
              {e.company}
              <ArrowRight aria-hidden className="arrow size-4 flex-none text-text" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
