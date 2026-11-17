import { getDict, type Lang } from "@/lib/i18n";
import type { Person } from "@/lib/content";
import CopyButton from "./copy-button";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Rows of label + visible, real links. `copy` adds a copy button next to the email. */
export default function ContactList({ lang, person, copy = false }: { lang: Lang; person: Person; copy?: boolean }) {
  const dict = getDict(lang);
  const external = (href: string) => (
    <a href={href} target="_blank" rel="noopener">
      {bare(href)}
      <span className="sr-only"> {dict.newTab}</span>
    </a>
  );
  const rows = [
    {
      label: dict.contact.email,
      value: (
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a href={`mailto:${person.email}`}>{person.email}</a>
          {copy && <CopyButton value={person.email} labels={dict.copy} />}
        </span>
      ),
    },
    { label: dict.contact.phone, value: <a href={`tel:${person.phone.replace(/\s/g, "")}`}>{person.phone}</a> },
    { label: dict.contact.linkedin, value: external(person.linkedin) },
    { label: dict.contact.github, value: external(person.github) },
  ];
  return (
    <dl className="divide-y divide-border border-y border-border">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-x-6 py-3 sm:grid-cols-[8rem_1fr] sm:items-center">
          <dt className="mono-meta text-muted">{r.label}</dt>
          <dd className="break-words">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
