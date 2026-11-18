import { getDict, type Lang } from "@/lib/i18n";
import TechIcon, { techKey } from "./tech-icon";

/** Stack as non-interactive chips with a devicon mark where one exists; the name is always printed. */
export default function StackChips({ stack, lang, className = "" }: { stack: string[]; lang: Lang; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={getDict(lang).stackLabel}>
      {stack.map((s) => (
        <li key={s} translate="no" className="chip mono-meta">
          {techKey(s) && <TechIcon name={s} className="size-[1.1em] flex-none" />}
          {s}
        </li>
      ))}
    </ul>
  );
}
