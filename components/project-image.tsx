import Image from "next/image";
import type { Project } from "@/lib/content";
import TechIcon, { techKey } from "./tech-icon";

/** The 16:10 image slot of a case study: the real screenshot, or a generated placeholder (DESIGN.md §5.7). */
export default function ProjectImage({ project: p, sizes, priority, className = "" }: { project: Project; sizes: string; priority?: boolean; className?: string }) {
  if (p.thumbnail)
    return (
      <div className={`img-frame ${className}`}>
        <Image src={p.thumbnail} alt={p.thumbnailAlt} width={1600} height={1000} sizes={sizes} {...(priority && { loading: "eager", fetchPriority: "high" })} className="aspect-[16/10] w-full object-cover object-left-top" />
      </div>
    );
  const icons = p.stack.filter((s) => techKey(s)).slice(0, 4);
  return (
    <div aria-hidden className={`img-frame bg-surface-2 [container-type:inline-size] ${className}`}>
      <div className="dot-grid absolute inset-0" />
      <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-[4cqi] px-[8cqi] text-center">
        <span translate="no" className="text-[clamp(1.25rem,7cqi,2.5rem)] leading-tight font-semibold font-[family-name:var(--font-display)] text-balance">
          {p.name}
        </span>
        <span className="flex gap-[3cqi] text-[clamp(1.25rem,6cqi,2rem)] text-muted">
          {icons.map((s) => (
            <TechIcon key={s} name={s} className="size-[1em] flex-none" />
          ))}
        </span>
      </div>
    </div>
  );
}
