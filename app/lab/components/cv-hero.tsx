import { Download } from "lucide-react";
import { cvHref, cvSizeKb } from "@/components/cv-button";

/** The only CV button until it scrolls under the header; the header pill then takes over (CSS flag, see lab.css). */
export default function CvHero() {
  return (
    <div className="cv-hero flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
      <a href={cvHref("en")} download className="btn btn-primary">
        <Download aria-hidden strokeWidth={2} />
        Download CV
      </a>
      <span className="mono-meta tabular text-muted">PDF, {cvSizeKb("en")}&nbsp;KB</span>
    </div>
  );
}
