import "server-only";
import { statSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "@/lib/i18n";

export const cvHref = (lang: Lang) => `/cv/jan-zamostny-cv-${lang}.pdf`;
export const cvSizeKb = (lang: Lang) => Math.round(statSync(join(process.cwd(), "public", cvHref(lang))).size / 1024);
