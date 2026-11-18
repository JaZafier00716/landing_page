import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { getDict } from "@/lib/i18n";
import ThemeToggle from "@/components/theme-toggle";

const dict = getDict("en");

/** Language + theme rows; used in the popover (desktop) and the mobile menu dialog. Lab pages exist in EN only. */
export function PrefRows() {
  return (
    <div>
      <div className="pref-row pref-lang">
        <span id="pref-lang" className="mono-meta text-muted">Language</span>
        <span className="flex gap-2" role="group" aria-labelledby="pref-lang">
          <Link href="/en" lang="en" hrefLang="en" aria-current="true" className="link">English</Link>
          <Link href="/cs" lang="cs" hrefLang="cs" className="link">Čeština</Link>
        </span>
      </div>
      <div className="pref-row">
        <span className="mono-meta text-muted">Theme</span>
        <ThemeToggle labels={dict.theme} />
      </div>
    </div>
  );
}

/** Trigger shows the current state (EN + sun/moon), so a Czech visitor still sees a language cue. */
export function PrefsTrigger() {
  return (
    <button
      type="button"
      popoverTarget="prefs"
      aria-label="Preferences: language and theme"
      className="prefs-trigger icon-btn mono-meta !w-auto px-2 max-md:hidden"
    >
      <span className="flex items-center gap-1.5">
        EN
        <span className="grid">
          <Sun aria-hidden className="theme-sun size-4" style={{ gridArea: "1/1" }} />
          <Moon aria-hidden className="theme-moon size-4" style={{ gridArea: "1/1" }} />
        </span>
      </span>
    </button>
  );
}

export function PrefsPopover() {
  return (
    <div id="prefs" popover="auto" aria-label="Preferences" className="prefs-pop">
      <PrefRows />
    </div>
  );
}
