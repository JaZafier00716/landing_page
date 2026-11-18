import { Pause, Play } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { TechLabel, techNames } from "./tech-icon";

/**
 * Ambient chip marquee. Decorative: the readout `stack` row carries the same facts as text, so the whole thing is aria-hidden.
 * The list is duplicated once for a seamless loop. Reduced motion turns it into a static wrapped row (CSS).
 */
export default function TechMarquee({ lang }: { lang: Lang }) {
  const items = techNames.map((n) => (
    <li key={n} translate="no" className="chip mono-meta">
      <TechLabel name={n} />
    </li>
  ));
  return (
    <div className="flex items-center gap-2">
      <div className="marquee min-w-0 flex-1" aria-hidden>
        <div className="marquee-track ambient">
          <ul>{items}</ul>
          <ul aria-hidden>{items}</ul>
        </div>
      </div>
      <label className="icon-btn swap motion-toggle">
        <input id="motion-pause" type="checkbox" className="peer sr-only" />
        <Pause aria-hidden className="size-[1.125em] peer-checked:scale-80 peer-checked:opacity-0 peer-checked:blur-[4px]" strokeWidth={1.5} />
        <Play aria-hidden className="size-[1.125em] scale-80 opacity-0 blur-[4px] peer-checked:scale-100 peer-checked:opacity-100 peer-checked:blur-none" strokeWidth={1.5} />
        <span className="sr-only">{getDict(lang).motion.pause}</span>
      </label>
    </div>
  );
}
