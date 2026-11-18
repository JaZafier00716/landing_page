import { ArrowUpRight } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import type { Project } from "@/lib/content";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ExternalLink({ href, lang }: { href: string; lang: Lang }) {
  return (
    <a href={href} target="_blank" rel="noopener" translate="no" className="link hit link-row [overflow-wrap:anywhere]">
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
