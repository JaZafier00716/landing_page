"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { altLang, getDict, switchLangPath, type Lang } from "@/lib/i18n";

/** Link to the current page in the other language, named in that language; remembers the choice for the proxy. */
export default function LangLink({ lang, className = "link" }: { lang: Lang; className?: string }) {
  const to = altLang(lang);
  return (
    <Link
      href={switchLangPath(usePathname(), to)}
      hrefLang={to}
      lang={to}
      className={className}
      onClick={() => {
        document.cookie = `lang=${to}; path=/; max-age=31536000; samesite=lax`;
      }}
    >
      {getDict(to).langName}
    </Link>
  );
}
