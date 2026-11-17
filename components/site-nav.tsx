"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import LangLink from "./lang-link";
import type { Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
  links: { href: string; label: string }[];
  labels: { nav: string; menu: string; theme: { toDark: string; toLight: string; toggle: string } };
  wordmark: ReactNode;
};

const linkClass =
  "flex min-h-11 shrink-0 items-center px-3 hover:text-accent aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

export default function SiteNav({ lang, links, labels, wordmark }: Props) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      button.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = links.map((l) => (
    <li key={l.href}>
      <Link
        href={l.href}
        aria-current={pathname.startsWith(l.href) ? "page" : undefined}
        className={linkClass}
        onClick={() => setOpenOn(null)}
      >
        {l.label}
      </Link>
    </li>
  ));
  const tools = (
    <>
      <LangLink lang={lang} className={linkClass} />
      <ThemeToggle labels={labels.theme} />
    </>
  );

  return (
    <>
      <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-16">
        {wordmark}
        <nav aria-label={labels.nav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items}
            <li className="flex items-center gap-1">{tools}</li>
          </ul>
        </nav>
        <button
          ref={button}
          type="button"
          className="-mr-2 flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={labels.menu}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>
      <div id="site-menu" hidden={!open} className="border-t border-border lg:hidden">
        <nav aria-label={labels.nav} className="container-page py-2">
          <ul className="[&_a]:min-h-12 [&_a]:px-0">{items}</ul>
          <div className="flex items-center justify-between border-t border-border pt-2">{tools}</div>
        </nav>
      </div>
    </>
  );
}
