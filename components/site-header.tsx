import Link from "next/link";
import { getDict, type Lang } from "@/lib/i18n";
import SiteNav from "./site-nav";
import CvPill from "./cv-pill";
import { PrefRows, PrefsPopover, PrefsTrigger } from "./prefs";

export default function SiteHeader({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const links = [
    { href: `/${lang}`, exact: true, label: dict.nav.home },
    { href: `/${lang}/experience`, label: dict.nav.experience },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/skills`, label: dict.nav.skills },
  ];
  return (
    <header className="site-header">
      <SiteNav
        links={links}
        labels={{ nav: dict.nav.label, menu: dict.menu }}
        cv={<CvPill lang={lang} />}
        trigger={<PrefsTrigger lang={lang} />}
        prefs={<PrefRows lang={lang} />}
        wordmark={
          <Link href={`/${lang}`} translate="no" className="text-lead flex min-h-11 items-center font-semibold whitespace-nowrap">
            Jan&nbsp;Zámostný
          </Link>
        }
      />
      <PrefsPopover lang={lang} />
    </header>
  );
}
