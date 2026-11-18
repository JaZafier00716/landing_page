import { Suspense } from "react";
import { GitBranch, Mail, UserRound } from "lucide-react";
import type { Person } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import CopyButton from "@/components/copy-button";
import { sendMessage } from "../actions";

const dict = getDict("en");
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

async function Notice({ params }: { params: Promise<{ sent?: string; error?: string }> }) {
  const q = await params;
  if (q.sent)
    return (
      <p role="status" className="border-l-2 border-accent pl-3">
        Thanks, the form is valid. [placeholder: nothing was sent, delivery is not connected yet]
      </p>
    );
  if (q.error)
    return (
      <p role="alert" className="border-l-2 border-border-strong pl-3">
        Please fill in your name, a valid email and a message.
      </p>
    );
  return null;
}

const linkClass = "link inline-flex min-h-11 items-center [overflow-wrap:anywhere]";

function Row({ icon, label, children, action }: { icon: React.ReactNode; label: string; children: React.ReactNode; action?: React.ReactNode }) {
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

export default function ContactForm({
  person,
  from,
  searchParams,
  panel = false,
}: {
  person: Person;
  from: "a" | "b";
  searchParams: Promise<{ sent?: string; error?: string }>;
  panel?: boolean;
}) {
  const icon = { "aria-hidden": true, strokeWidth: 1.5 } as const;
  const label = "mono-meta mb-1 block text-muted";
  return (
    <div className={`grid grid-cols-1 gap-8 lg:grid-cols-12 ${panel ? "panel p-3 sm:p-6" : ""}`}>
      <form action={sendMessage} className="flex flex-col gap-4 lg:col-span-7">
        <Suspense>
          <Notice params={searchParams} />
        </Suspense>
        <input type="hidden" name="from" value={from} />
        <div>
          <label htmlFor={`name-${from}`} className={label}>Name</label>
          <input id={`name-${from}`} name="name" required maxLength={100} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={`email-${from}`} className={label}>Email</label>
          <input id={`email-${from}`} name="email" type="email" required maxLength={254} autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor={`message-${from}`} className={label}>Message</label>
          <textarea id={`message-${from}`} name="message" required maxLength={2000} rows={5} className="field" />
        </div>
        {/* honeypot: hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
      <ul className="self-start lg:col-span-5">
        <Row icon={<Mail {...icon} />} label="Email" action={<CopyButton value={person.email} label={dict.copy.email} labels={dict.copy} />}>
          <a href={`mailto:${person.email}`} translate="no" className={linkClass}>{person.email}</a>
        </Row>
        <Row icon={<UserRound {...icon} />} label="LinkedIn">
          <a href={person.linkedin} target="_blank" rel="noopener" translate="no" className={linkClass}>
            {bare(person.linkedin)}
            <span className="sr-only"> {dict.newTab}</span>
          </a>
        </Row>
        <Row icon={<GitBranch {...icon} />} label="GitHub">
          <a href={person.github} target="_blank" rel="noopener" translate="no" className={linkClass}>
            {bare(person.github)}
            <span className="sr-only"> {dict.newTab}</span>
          </a>
        </Row>
      </ul>
    </div>
  );
}
