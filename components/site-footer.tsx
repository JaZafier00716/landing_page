import { getDict, type Lang } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";

// Build time stands in for "this year" on a statically rendered site.
const year = new Date().getFullYear();

export default function SiteFooter({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <footer className="border-t border-border py-6">
      <p className="container-page mono-meta text-muted">
        © {year} <span translate="no">Jan&nbsp;Zámostný</span> · <span className="max-sm:hidden">{d.footer.built} </span>
        <a href="https://github.com/JaZafier00716/landing_page" target="_blank" rel="noopener" translate="no" className="link hit max-sm:inline-flex max-sm:min-h-11 max-sm:items-center">
          {/* Phones: just "GitHub" keeps the footer on one line (the nominative also reads right in Czech). */}
          <span className="max-sm:hidden">{d.footer.github}</span>
          <span className="sm:hidden">{d.footer.short}</span>
          <ArrowUpRight aria-hidden className="inline size-[1em] align-[-0.1em]" />
          <span className="sr-only"> {d.newTab}</span>
        </a>
      </p>
    </footer>
  );
}
