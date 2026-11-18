import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { cvHref } from "@/components/cv-button";
import { PrefRows, PrefsPopover, PrefsTrigger } from "./prefs-popover";

const links = [
  { href: "/en", label: "Home" },
  { href: "/en/experience", label: "Experience" },
  { href: "/en/projects", label: "Projects" },
  { href: "/en/skills", label: "Skills" },
];

export default function LabHeader() {
  return (
    <header className="lab-header">
      <div className="container-page flex h-(--header-h) items-center gap-4">
        <Link href="/en" translate="no" className="text-lead flex min-h-11 items-center font-semibold whitespace-nowrap">
          Jan&nbsp;Zámostný
        </Link>
        {/* The lab pages stand in for Home, so Home is the current item. */}
        <nav aria-label="Main" className="ms-4 flex gap-1 max-md:hidden">
          <ul className="flex">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link" aria-current={i === 0 ? "page" : undefined}>
                  <span data-text={l.label}>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <PrefsTrigger />
          {/* Always in layout (no CLS); hidden + unfocusable until the hero CV scrolls under the header. */}
          <a href={cvHref("en")} download className="btn btn-primary cv-pill" aria-label="Download CV">
            <Download aria-hidden strokeWidth={2} />
            CV
          </a>
          <button type="button" {...{ commandfor: "menu", command: "show-modal" }} aria-label="Menu" className="icon-btn md:hidden">
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>
      <PrefsPopover />
      <dialog id="menu" aria-label="Menu" className="menu-dialog md:hidden" {...{ closedby: "any" }}>
        <div className="flex h-(--header-h) items-center justify-between">
          <span className="text-lead font-semibold">Menu</span>
          <button type="button" {...{ commandfor: "menu", command: "close" }} aria-label="Close menu" className="icon-btn">
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <nav aria-label="Main">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-border">
                <Link href={l.href} className="nav-link !min-h-12 !px-0" aria-current={i === 0 ? "page" : undefined}>
                  <span data-text={l.label}>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <PrefRows />
      </dialog>
    </header>
  );
}
