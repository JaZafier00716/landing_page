import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import type { Project } from "@/lib/content";
import StackChips from "./stack-chips";

/** Case-study card (DESIGN.md §5.7): screenshot (only if there is one), title, summary, Decision, Result, stack, links. */
export default function CaseCard({ project: p, lang }: { project: Project; lang: Lang }) {
  const d = getDict(lang);
  return (
    <article className="box card flex flex-col">
      {p.thumbnail && (
        <div className="img-frame !rounded-none">
          <Image
            src={p.thumbnail}
            alt={p.thumbnailAlt}
            width={1600}
            height={1000}
            sizes="(min-width:768px) 35vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-left-top"
          />
        </div>
      )}
      <h3 translate="no" className="h3 line-clamp-2 px-5 pt-4">
        <Link href={`/${lang}/projects/${p.slug}`} className="box-title after:absolute after:inset-0">
          {p.name}
        </Link>
      </h3>
      <p className="line-clamp-2 px-5 pt-1 text-muted">{p.summary}</p>
      {p.decision && (
        <p className="line-clamp-5 px-5 pt-3">
          <span className="mono-meta text-muted">{d.projects.decision} </span>
          {p.decision}
        </p>
      )}
      {p.result && (
        <p className="line-clamp-4 px-5 pt-2">
          <span className="mono-meta text-muted">{d.projects.result} </span>
          {p.result}
        </p>
      )}
      <StackChips stack={p.stack} lang={lang} className="px-5 pt-3" />
      <div className="mt-auto flex items-center justify-between gap-4 px-5 pt-2 pb-2">
        <div className="mono-meta flex flex-wrap items-center gap-x-4">
          {p.sourceUrl && (
            <a href={p.sourceUrl} target="_blank" rel="noopener" className="link hit relative z-10 inline-flex min-h-11 items-center gap-1">
              {d.projects.source}
              <ArrowUpRight aria-hidden className="size-[1em]" />
              <span className="sr-only"> {d.newTab}</span>
            </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" className="link hit relative z-10 inline-flex min-h-11 items-center gap-1">
              {d.projects.live}
              <ArrowUpRight aria-hidden className="size-[1em]" />
              <span className="sr-only"> {d.newTab}</span>
            </a>
          )}
          {!p.sourceUrl && !p.liveUrl && p.kind === "school" && <span className="py-3 text-muted">{d.projects.private}</span>}
        </div>
        <ArrowRight aria-hidden className="arrow ms-auto size-5 flex-none" />
      </div>
    </article>
  );
}
