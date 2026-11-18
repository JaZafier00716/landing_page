import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { cvHref, cvSizeKb } from "@/lib/cv";

/** The only CV download until it scrolls under the header; the header pill then takes over (site-nav.tsx, DESIGN.md §5.4). */
export default function CvHero({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div data-hero-cv className="cv-hero flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      <a href={cvHref(lang)} download className="btn btn-primary">
        <Download aria-hidden strokeWidth={2} />
        {d.cv.download}
      </a>
      <span className="mono-meta tabular text-muted">
        {d.cv.meta}, {cvSizeKb(lang)}&nbsp;{d.cv.kb}
      </span>
    </div>
  );
}
