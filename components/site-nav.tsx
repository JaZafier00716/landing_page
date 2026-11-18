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
  links: { href: string; label: string; icon: ReactNode; exact?: boolean }[];
  labels: { nav: string; menu: string; theme: { toDark: string; toLight: string; toggle: string } };
  wordmark: ReactNode;
  cv: ReactNode;
};

export default function SiteNav({ lang, links, labels, wordmark, cv }: Props) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const close = (restoreFocus: boolean) => {
      setOpenOn(null);
      if (restoreFocus) button.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close(true);
      if (e.key !== "Tab") return;
      // Trap focus in toggle + panel; hidden elements (panel at lg+) have no offsetParent.
      const items = [button.current, ...(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter(
        (el): el is HTMLElement => !!el && el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !items.includes(active as HTMLElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !items.includes(active as HTMLElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const items = (stagger: boolean) =>
    links.map((l, i) => {
      const current = l.exact ? pathname === l.href : pathname.startsWith(l.href);
      return (
        <li key={l.href} className={stagger ? "menu-item" : undefined} style={stagger ? ({ "--i": i } as React.CSSProperties) : undefined}>
          <Link
            href={l.href}
            aria-current={current ? "page" : undefined}
            className="nav-link"
            onClick={() => {
              if (open) {
                setOpenOn(null);
                button.current?.focus();
              }
            }}
          >
            {l.icon}
            <span data-text={l.label}>{l.label}</span>
          </Link>
        </li>
      );
    });

  return (
    <>
      <div className="container-page flex h-(--header-h) items-center gap-4">
        {wordmark}
        <nav aria-label={labels.nav} className="ml-auto hidden lg:block">
          <ul className="flex items-center">{items(false)}</ul>
        </nav>
        <div className="hidden items-center gap-1 lg:flex">
          <LangLink lang={lang} />
          <ThemeToggle labels={labels.theme} />
          {cv}
        </div>
        <button
          ref={button}
          type="button"
          className="icon-btn swap -mr-2 ml-auto lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={labels.menu}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <X aria-hidden className="size-6" {...(open ? {} : { "data-off": "" })} />
          <Menu aria-hidden className="size-6" {...(open ? { "data-off": "" } : {})} />
        </button>
      </div>
      <div id="site-menu" ref={panel} hidden={!open} className="menu-panel lg:hidden">
        <nav aria-label={labels.nav} className="container-page py-2">
          <ul>{items(true)}</ul>
          <div className="menu-item mt-2 flex items-center justify-between border-t border-border pt-2" style={{ "--i": links.length } as React.CSSProperties}>
            <LangLink lang={lang} />
            <ThemeToggle labels={labels.theme} />
          </div>
        </nav>
      </div>
    </>
  );
}
