import { statSync } from "node:fs";
import { join } from "node:path";
import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";

export const cvHref = (lang: Lang) => `/cv/jan-zamostny-cv-${lang}.pdf`;
export const cvSizeKb = (lang: Lang) => Math.round(statSync(join(process.cwd(), "public", cvHref(lang))).size / 1024);

/** `compact` is the bare button (header); otherwise it carries the "PDF, n KB" meta line. */
export default function CvButton({
  lang,
  variant = "primary",
  compact = false,
}: {
  lang: Lang;
  variant?: "primary" | "secondary";
  compact?: boolean;
}) {
  const dict = getDict(lang);
  const button = (
    <a href={cvHref(lang)} download className={`btn btn-${variant}`}>
      <Download aria-hidden strokeWidth={2} />
      {dict.cv.download}
    </a>
  );
  if (compact) return button;
  return (
    <span className="flex flex-col gap-1 sm:inline-flex sm:flex-row sm:items-center sm:gap-3">
      {button}
      <span className="mono-meta tabular text-muted">
        {dict.cv.meta}, {cvSizeKb(lang)}&nbsp;KB
      </span>
    </span>
  );
}
