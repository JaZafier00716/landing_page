import { Moon, Sun } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import ThemeToggle from "./theme-toggle";
import LangLink from "./lang-link";

/** Language + theme rows: inside the preferences popover (lg+) and the mobile menu panel. */
export function PrefRows({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div>
      <div className="pref-row pref-lang">
        <span className="mono-meta text-muted">{d.prefs.language}</span>
        <span className="flex gap-2">
          <span lang={lang} aria-current="true">
            {d.langName}
          </span>
          <LangLink lang={lang} />
        </span>
      </div>
      <div className="pref-row">
        <span className="mono-meta text-muted">{d.prefs.theme}</span>
        <ThemeToggle labels={d.theme} />
      </div>
    </div>
  );
}

/** Trigger shows the current state (language code + theme glyph), so a visitor always sees which language is active. */
export function PrefsTrigger({ lang }: { lang: Lang }) {
  return (
    <button
      type="button"
      popoverTarget="prefs"
      aria-label={`${lang.toUpperCase()}, ${getDict(lang).prefs.trigger}`}
      className="prefs-trigger icon-btn mono-meta max-lg:hidden"
    >
      <span className="flex items-center gap-1.5">
        {lang.toUpperCase()}
        <span className="grid">
          <Sun aria-hidden className="theme-sun size-4" style={{ gridArea: "1/1" }} />
          <Moon aria-hidden className="theme-moon size-4" style={{ gridArea: "1/1" }} />
        </span>
      </span>
    </button>
  );
}

export function PrefsPopover({ lang }: { lang: Lang }) {
  return (
    <div id="prefs" popover="auto" aria-label={getDict(lang).prefs.name} className="prefs-pop max-lg:hidden">
      <PrefRows lang={lang} />
    </div>
  );
}
