"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/[lang]/actions";
import { initialContactState, type FieldError } from "@/lib/contact";
import { getDict, type Lang } from "@/lib/i18n";
import CopyButton from "./copy-button";

/**
 * Contact form. The Server Action works without JS (progressive enhancement via the permalink); with JS,
 * useActionState keeps what was typed and renders field errors inline. Status is an always-rendered live region.
 */
export default function ContactForm({ lang, email }: { lang: Lang; email: string }) {
  const d = getDict(lang);
  const [state, action, pending] = useActionState(sendMessage, initialContactState, `/${lang}`);
  const status = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  // Focus: first invalid field, or the status region on success / failure.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "invalid") form.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    else status.current?.focus();
  }, [state]);

  const label = "mono-meta mb-1 block text-muted";
  const err = (id: string, code?: FieldError) =>
    code && (
      <p id={`${id}-err`} className="mono-meta pt-1">
        <span className="sr-only">{d.contact.errorPrefix} </span>
        {d.contact.errors[code]}
      </p>
    );
  const field = (id: "name" | "email" | "message", code?: FieldError) => ({
    id: `contact-${id}`,
    name: id,
    required: true,
    "aria-invalid": code ? (true as const) : undefined,
    "aria-describedby": code ? `${id}-err` : undefined,
    defaultValue: state.values[id],
    className: "field",
  });

  return (
    <form ref={form} action={action} className="flex flex-col gap-4">
      <div id="contact-status" ref={status} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "success" && <p className="border-l-2 border-accent pl-3">{d.contact.success}</p>}
        {state.status === "invalid" && <p className="border-l-2 border-border-strong pl-3">{d.contact.errors.summary}</p>}
        {state.status === "failed" && (
          <div role="alert" className="border-l-2 border-border-strong pl-3">
            <p>{d.contact.failed}</p>
            <div className="grid grid-cols-[minmax(0,1fr)_2.75rem] items-center">
              <a href={`mailto:${email}`} translate="no" className="link inline-flex min-h-11 items-center [overflow-wrap:anywhere]">
                {email}
              </a>
              <CopyButton value={email} label={d.copy.email} labels={d.copy} />
            </div>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="contact-name" className={label}>{d.contact.name}</label>
        <input {...field("name", state.errors.name)} maxLength={100} autoComplete="name" />
        {err("name", state.errors.name)}
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>{d.contact.email}</label>
        <input {...field("email", state.errors.email)} type="email" maxLength={254} autoComplete="email" />
        {err("email", state.errors.email)}
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>{d.contact.message}</label>
        <textarea {...field("message", state.errors.message)} maxLength={2000} rows={5} />
        {err("message", state.errors.message)}
      </div>
      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col items-start gap-2">
        <button type="submit" className="btn btn-secondary">
          {pending ? d.contact.sending : d.contact.send}
        </button>
        <p className="mono-meta text-muted">{d.contact.privacy}</p>
      </div>
    </form>
  );
}
