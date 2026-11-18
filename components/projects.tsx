import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import type { Project } from "@/lib/content";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ExternalLink({ href, lang }: { href: string; lang: Lang }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="link [overflow-wrap:anywhere]">
      {bare(href)}
      <ArrowUpRight aria-hidden className="inline size-[1em] align-[-0.1em]" />
      <span className="sr-only"> {getDict(lang).newTab}</span>
    </a>
  );
}

/** Datasheet "characteristics" table; work projects lead with Client and Role. Empty rows are omitted. */
export function Characteristics({ project: p, lang, omitStack = false }: { project: Project; lang: Lang; omitStack?: boolean }) {
  const t = getDict(lang).table;
  const all: [string, React.ReactNode][] =
    p.kind === "work"
      ? [
          [t.client, p.client],
          [t.role, p.role],
          [t.stack, !omitStack && p.stack.join(", ")],
          [t.live, p.liveUrl && <ExternalLink href={p.liveUrl} lang={lang} />],
        ]
      : [
          [t.role, p.role],
          [t.language, p.language],
          [t.libraries, p.libraries],
          [t.platform, p.platform],
          [t.source, p.sourceUrl && <ExternalLink href={p.sourceUrl} lang={lang} />],
        ];
  const rows = all.filter(([, value]) => value);
  return (
    <table className="mono-meta w-full border-collapse text-left">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="flex flex-col border-b border-border py-2 first:border-t sm:table-row">
            <th scope="row" className="w-32 font-normal text-muted sm:py-2 sm:pr-4 sm:align-top">
              {label}
            </th>
            <td className="break-words sm:py-2">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const stackLine = (p: Project) => p.stack.join(" · ");

/** Hairline-ruled list row; the whole row is one link to the detail page. */
export function ProjectRow({ project: p, lang }: { project: Project; lang: Lang }) {
  return (
    <li className="border-b border-border first:border-t">
      <Link
        href={`/${lang}/projects/${p.slug}`}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 hover:bg-surface hover:shadow-1 active:bg-press lg:grid-cols-12 lg:py-5"
      >
        <span translate="no" className="h3 line-clamp-2 group-hover:underline lg:col-span-4">
          {p.name}
        </span>
        <span
          title={stackLine(p)}
          className="mono-meta col-start-1 flex items-start gap-2 text-muted lg:col-span-6 lg:col-start-5 lg:row-start-1"
        >
          <Layers aria-hidden className="mt-[0.2em] size-[1.1em] flex-none" strokeWidth={1.5} />
          <span translate="no" className="line-clamp-1">
            {stackLine(p)}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          className="col-start-2 row-span-2 row-start-1 size-5 justify-self-end transition-transform duration-150 ease-in-out group-hover:translate-x-1 lg:col-span-2 lg:col-start-11 lg:row-span-1"
        />
      </Link>
    </li>
  );
}

/** Ruled project block for /projects, laid on the parent's grid (subgrid): screenshot left, text right. */
export function ProjectArticle({ project: p, lang }: { project: Project; lang: Lang }) {
  return (
    <article className="col-span-full grid grid-cols-subgrid gap-y-6 border-b border-border py-8">
      {p.thumbnail && (
        <div className="img-frame col-span-4 self-start lg:col-span-5">
          <Image
            src={p.thumbnail}
            alt={p.thumbnailAlt}
            width={1600}
            height={1000}
            sizes="(min-width:1024px) 40vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-left-top"
          />
        </div>
      )}
      <div className={`col-span-4 flex min-w-0 flex-col gap-4 ${p.thumbnail ? "lg:col-span-7" : "lg:col-span-8"}`}>
        <h3 translate="no" className="h2 line-clamp-2">
          <Link href={`/${lang}/projects/${p.slug}`} className="link">
            {p.name}
          </Link>
        </h3>
        <p className="line-clamp-3 max-w-prose">{p.summary}</p>
        <Characteristics project={p} lang={lang} omitStack />
        <p title={stackLine(p)} className="mono-meta flex items-start gap-2 text-muted">
          <Layers aria-hidden className="mt-[0.2em] size-[1.1em] flex-none" strokeWidth={1.5} />
          <span translate="no">{stackLine(p)}</span>
        </p>
      </div>
    </article>
  );
}
