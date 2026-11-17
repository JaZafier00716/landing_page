import { NextResponse, type NextRequest } from "next/server";
import { isLang, type Lang } from "@/lib/i18n";

// Redirect un-prefixed paths to /en or /cs: remembered choice first, then Accept-Language.
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (/^\/(en|cs)(\/|$)/.test(pathname)) return;
  const cookie = req.cookies.get("lang")?.value ?? "";
  const accepted = (req.headers.get("accept-language") ?? "").toLowerCase().split(",").map((s) => s.trim().slice(0, 2));
  const first = accepted.find((l) => l === "en" || l === "cs" || l === "sk");
  const lang: Lang = isLang(cookie) ? cookie : first === "cs" || first === "sk" ? "cs" : "en";
  return NextResponse.redirect(new URL(`/${lang}${pathname === "/" ? "" : pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|images|cv/|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};
