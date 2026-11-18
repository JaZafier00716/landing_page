import { getDict, type Lang } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";

// Build time stands in for "this year" on a statically rendered site.
const year = new Date().getFullYear();

export default function SiteFooter({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <footer className="border-t border-border py-6">
      <p className="container-page mono-meta text-muted">
        © {year} <span translate="no">Jan&nbsp;Zámostný</span> · {d.footer.built}{" "}
        <a href="https://github.com/JaZafier00716/landing_page" target="_blank" rel="noopener" translate="no" className="link hit">
          {d.footer.github}
          <ArrowUpRight aria-hidden className="inline size-[1em] align-[-0.1em]" />
          <span className="sr-only"> {d.newTab}</span>
        </a>
      </p>
    </footer>
  );
}
