import type { ReactNode } from "react";
import { ArrowUpRight, GitBranch, Mail, Phone, UserRound } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import type { Person } from "@/lib/content";
import CopyButton from "./copy-button";

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const linkClass = "link inline-flex min-h-11 items-center gap-1 [overflow-wrap:anywhere]";

/** One row: icon | value (a real link) | actions column (copy button, empty for external profiles). */
function Row({ icon, label, children, action }: { icon: ReactNode; label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <li className="grid min-h-12 grid-cols-[1.25em_minmax(0,1fr)_2.75rem] items-center gap-x-3 border-b border-border first:border-t">
      <span className="text-muted [&>svg]:size-[1.25em]">
        {icon}
        <span className="sr-only">{label}</span>
      </span>
      <span className="min-w-0">{children}</span>
      {action}
    </li>
  );
}

/** Contact rows for the home page and the footer. Email and phone get copy buttons. */
export default function ContactList({ lang, person }: { lang: Lang; person: Person }) {
  const dict = getDict(lang);
  const icon = { "aria-hidden": true, strokeWidth: 1.5 } as const;
  const external = (href: string) => (
    <a href={href} target="_blank" rel="noopener" translate="no" className={linkClass}>
      {bare(href)}
      <ArrowUpRight aria-hidden className="size-[1em] flex-none" />
      <span className="sr-only"> {dict.newTab}</span>
    </a>
  );
  return (
    <ul>
      <Row
        icon={<Mail {...icon} />}
        label={dict.contact.email}
        action={<CopyButton value={person.email} label={dict.copy.email} labels={dict.copy} />}
      >
        <a href={`mailto:${person.email}`} translate="no" className={linkClass}>
          {person.email}
        </a>
      </Row>
      <Row
        icon={<Phone {...icon} />}
        label={dict.contact.phone}
        action={<CopyButton value={person.phone} label={dict.copy.phone} labels={dict.copy} />}
      >
        <a href={`tel:${person.phone.replace(/\s/g, "")}`} translate="no" className={`${linkClass} tabular`}>
          {person.phone.replaceAll(" ", " ")}
        </a>
      </Row>
      <Row icon={<UserRound {...icon} />} label={dict.contact.linkedin}>
        {external(person.linkedin)}
      </Row>
      <Row icon={<GitBranch {...icon} />} label={dict.contact.github}>
        {external(person.github)}
      </Row>
    </ul>
  );
}
