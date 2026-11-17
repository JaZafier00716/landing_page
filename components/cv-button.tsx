import { statSync } from "node:fs";
import { join } from "node:path";
import { Download } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";

export const cvHref = (lang: Lang) => `/cv/jan-zamostny-cv-${lang}.pdf`;

export default function CvButton({ lang, variant = "primary" }: { lang: Lang; variant?: "primary" | "secondary" }) {
  const dict = getDict(lang);
  const kb = Math.round(statSync(join(process.cwd(), "public", cvHref(lang))).size / 1024);
  return (
    <span className="flex flex-col gap-1 sm:inline-flex sm:flex-row sm:items-center sm:gap-3">
      <a href={cvHref(lang)} download className={`btn btn-${variant}`}>
        <Download aria-hidden />
        {dict.cv.download}
      </a>
      <span className="mono-meta text-muted">
        {dict.cv.meta}, {kb} KB
      </span>
    </span>
  );
}
