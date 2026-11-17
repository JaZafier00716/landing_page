import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import type { Project } from "@/lib/content";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ExternalLink({ href, lang }: { href: string; lang: Lang }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="link [overflow-wrap:anywhere]">
      {bare(href)}
      <span className="sr-only"> {getDict(lang).newTab}</span>
    </a>
  );
}

/** Datasheet "characteristics" table; work projects lead with Client and Role. Empty rows are omitted. */
export function Characteristics({ project: p, lang }: { project: Project; lang: Lang }) {
  const t = getDict(lang).table;
  const all: [string, React.ReactNode][] =
    p.kind === "work"
      ? [
          [t.client, p.client],
          [t.role, p.role],
          [t.stack, p.stack.join(", ")],
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
            <th scope="row" className="font-normal text-muted sm:w-32 sm:py-2 sm:pr-4 sm:align-top">
              {label}
            </th>
            <td className="font-medium break-words sm:py-2">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Hairline-ruled list row; the whole row is one link to the detail page. */
export function ProjectRow({ project: p, lang }: { project: Project; lang: Lang }) {
  return (
    <li className="border-b border-border first:border-t">
      <Link
        href={`/${lang}/projects/${p.slug}`}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 hover:bg-surface active:bg-border lg:grid-cols-12 lg:py-5"
      >
        <span className="h3 group-hover:underline lg:col-span-4">{p.name}</span>
        <span className="mono-meta col-start-1 text-muted lg:col-span-6 lg:col-start-5 lg:row-start-1">
          {p.stack.join(" · ")}
        </span>
        <ArrowRight
          aria-hidden
          className="col-start-2 row-span-2 row-start-1 size-5 justify-self-end transition-transform group-hover:translate-x-1 lg:col-span-2 lg:col-start-11 lg:row-span-1"
        />
      </Link>
    </li>
  );
}

/** Ruled project block for /projects: screenshot left, name + summary + table right. */
export function ProjectArticle({ project: p, lang }: { project: Project; lang: Lang }) {
  return (
    <article className="grid gap-6 border-b border-border py-8 first:border-t lg:grid-cols-12 lg:gap-x-6">
      {p.thumbnail && (
        <Image
          src={p.thumbnail}
          alt={p.thumbnailAlt}
          width={1600}
          height={1000}
          sizes="(min-width:1024px) 40vw, 100vw"
          className="aspect-[16/10] w-full rounded-sm border border-border object-cover object-left-top lg:col-span-5"
        />
      )}
      <div className={`flex min-w-0 flex-col gap-4 ${p.thumbnail ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6"}`}>
        <h3 className="h2">
          <Link href={`/${lang}/projects/${p.slug}`} className="link">
            {p.name}
          </Link>
        </h3>
        <p className="max-w-prose">{p.summary}</p>
        <Characteristics project={p} lang={lang} />
      </div>
    </article>
  );
}
