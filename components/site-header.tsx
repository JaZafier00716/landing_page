import Link from "next/link";
import { Briefcase, FolderGit2, House, ListChecks } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import SiteNav from "./site-nav";
import CvButton from "./cv-button";

export default function SiteHeader({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const icon = { "aria-hidden": true, className: "nav-icon" } as const;
  const links = [
    { href: `/${lang}`, exact: true, label: dict.nav.home, icon: <House {...icon} /> },
    { href: `/${lang}/experience`, label: dict.nav.experience, icon: <Briefcase {...icon} /> },
    { href: `/${lang}/projects`, label: dict.nav.projects, icon: <FolderGit2 {...icon} /> },
    { href: `/${lang}/skills`, label: dict.nav.skills, icon: <ListChecks {...icon} /> },
  ];
  return (
    <header className="site-header">
      <SiteNav
        lang={lang}
        links={links}
        labels={{ nav: dict.nav.label, menu: dict.menu, theme: dict.theme }}
        cv={<CvButton lang={lang} compact />}
        wordmark={
          <Link href={`/${lang}`} translate="no" className="text-lead flex min-h-11 items-center font-semibold whitespace-nowrap">
            Jan&nbsp;Zámostný
          </Link>
        }
      />
    </header>
  );
}
