"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  links: { href: string; label: string; exact?: boolean }[];
  labels: { nav: string; menu: string };
  wordmark: ReactNode;
  cv: ReactNode; // header CV pill (server)
  trigger: ReactNode; // preferences popover trigger (server)
  prefs: ReactNode; // language + theme rows for the mobile menu (server)
};

export default function SiteNav({ links, labels, wordmark, cv, trigger, prefs }: Props) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // CV morph (hero button <-> header pill) and the pause flags for the ambient loops. Without JS the CSS fallback in globals.css applies.
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("[data-hero-cv] .btn"); // the button itself: its size line must not hold the pill back
    const section = document.querySelector<HTMLElement>("[data-hero]");
    const onVisibility = () => root.toggleAttribute("data-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    const observers: IntersectionObserver[] = [];
    if (section) {
      const io = new IntersectionObserver(([e]) => root.toggleAttribute("data-hero-off", !e.isIntersecting));
      io.observe(section);
      observers.push(io);
    }
    let cvIo: IntersectionObserver | undefined;
    const mq = matchMedia("(min-width: 64rem)");
    const watchCv = () => {
      if (!hero) return;
      cvIo?.disconnect();
      // The header is taller from 64rem, so the hand-off line moves: rebuild the observer when it crosses.
      const headerH = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 64;
      cvIo = new IntersectionObserver(
        (entries) => {
          const e = entries[entries.length - 1]; // newest: a fast scroll can queue several
          // Hysteresis: dock only when fully under the header, undock only when fully clear of it; in between keep the state.
          const was = root.hasAttribute("data-cv-docked");
          const above = e.boundingClientRect.top < headerH;
          const docked = e.intersectionRatio === 0 ? above : e.intersectionRatio >= 0.98 ? false : first ? above : was;
          const initial = first;
          first = false;
          const update = () => root.toggleAttribute("data-cv-docked", docked);
          if (was === docked) return;
          if (initial || !("startViewTransition" in document)) update();
          else {
            running?.skipTransition();
            running = document.startViewTransition({ update, types: ["cv"] });
          }
        },
        { rootMargin: `-${headerH}px 0px 0px 0px`, threshold: [0, 0.98] },
      );
      cvIo.observe(hero);
    };
    let running: ViewTransition | undefined;
    let first = true;
    if (hero) {
      root.setAttribute("data-cv-js", "");
      if ("startViewTransition" in document) root.setAttribute("data-cv-vt", "");
      watchCv();
      mq.addEventListener("change", watchCv);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observers.forEach((o) => o.disconnect());
      cvIo?.disconnect();
      mq.removeEventListener("change", watchCv);
      ["data-cv-js", "data-cv-vt", "data-cv-docked", "data-hero-off"].forEach((a) => root.removeAttribute(a));
    };
  }, [pathname]);

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
            <span data-text={l.label}>{l.label}</span>
          </Link>
        </li>
      );
    });

  return (
    <>
      <div className="container-page flex h-(--header-h) items-center gap-4">
        {wordmark}
        <nav aria-label={labels.nav} className="ms-4 hidden lg:block">
          <ul className="flex items-center">{items(false)}</ul>
        </nav>
        {/* CV pill sits out of flow just left of the utilities, so there is no empty slot before it docks. */}
        <div className="relative ms-auto flex items-center gap-1">
          {cv}
          {trigger}
          <button
            ref={button}
            type="button"
            className="icon-btn swap -me-2 lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={labels.menu}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <X aria-hidden className="size-6" {...(open ? {} : { "data-off": "" })} />
            <Menu aria-hidden className="size-6" {...(open ? { "data-off": "" } : {})} />
          </button>
        </div>
      </div>
      <div id="site-menu" ref={panel} hidden={!open} className="menu-panel lg:hidden">
        <nav aria-label={labels.nav} className="container-page py-2">
          <ul>{items(true)}</ul>
          <div className="menu-item mt-2 border-t border-border px-3 pt-1" style={{ "--i": links.length } as React.CSSProperties}>
            {prefs}
          </div>
        </nav>
      </div>
    </>
  );
}
