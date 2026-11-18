import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { cvHref, cvSizeKb } from "./cv-button";

/** Mobile download button; CSS-only (sticky at the end of <main>, see .cv-fab). */
export default function CvFab({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  return (
    <a
      href={cvHref(lang)}
      download
      className="cv-fab lg:hidden"
      aria-label={`${dict.cv.download} (${dict.cv.meta}, ${cvSizeKb(lang)} KB)`}
    >
      <Download aria-hidden strokeWidth={2} />
      <span aria-hidden>CV</span>
    </a>
  );
}
