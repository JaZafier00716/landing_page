import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { cvHref, cvSizeKb } from "@/lib/cv";

/** Header CV pill, out of flow (no empty slot). Always visible except on home, where it docks in from the hero button. */
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
      {d.cv.pill}
    </a>
  );
}
