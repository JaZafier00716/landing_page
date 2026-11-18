import { getDict, type Lang } from "@/lib/i18n";
import { TechLabel } from "./tech-icon";

/** Stack as non-interactive chips with a mark where one exists; the name is always printed. */
export default function StackChips({ stack, lang, className = "" }: { stack: string[]; lang: Lang; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={getDict(lang).stackLabel}>
      {stack.map((s) => (
        <li key={s} translate="no" className="chip mono-meta">
          <TechLabel name={s} />
        </li>
      ))}
    </ul>
  );
}
