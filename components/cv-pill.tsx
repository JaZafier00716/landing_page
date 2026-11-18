import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { cvHref, cvSizeKb } from "@/lib/cv";

/** Header CV button: compact "CV" below lg, "Download CV" from lg. On home it shows once the hero CV is out of view (site-nav.tsx). */
export default function CvPill({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <a
      href={cvHref(lang)}
      download
      className="btn btn-primary cv-pill"
      aria-label={`${d.cv.download} (${d.cv.meta}, ${cvSizeKb(lang)} ${d.cv.kb})`}
    >
      <Download aria-hidden strokeWidth={2} />
      <span className="lg:hidden">{d.cv.pill}</span>
      <span className="max-lg:hidden">{d.cv.download}</span>
    </a>
  );
}
