import Link from "next/link";
import { getDict, type Lang } from "@/lib/i18n";
import SiteNav from "./site-nav";

export default function SiteHeader({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const links = (["experience", "projects", "skills"] as const).map((k) => ({ href: `/${lang}/${k}`, label: dict.nav[k] }));
  return (
    <header className="border-b border-border bg-bg lg:sticky lg:top-0 lg:z-40">
      <SiteNav
        lang={lang}
        links={links}
        labels={{ nav: dict.nav.label, menu: dict.menu, theme: dict.theme }}
        wordmark={
          <Link href={`/${lang}`} className="flex min-h-11 items-center text-lg font-bold">
            Jan Zámostný
          </Link>
        }
      />
    </header>
  );
}
