import { NextResponse, type NextRequest } from "next/server";
import { isLang, type Lang } from "@/lib/i18n";

// Rest of a /en or /cs path that has a route (project slugs are checked by their page).
const routes = /^(\/(experience|projects|skills)?|\/projects\/[^/]+|\/opengraph-image[^/]*)?\/?$/;

// Redirect un-prefixed paths to /en or /cs: remembered choice first, then Accept-Language.
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const known = pathname.match(/^\/(en|cs)(\/.*)?$/);
  if (known) {
    // Paths with no route get the static localized 404 page with a real 404 status.
    if (!routes.test(known[2] ?? "")) return NextResponse.rewrite(new URL(`/${known[1]}/404`, req.url), { status: 404 });
    return;
  }
  const cookie = req.cookies.get("lang")?.value ?? "";
  const accepted = (req.headers.get("accept-language") ?? "").toLowerCase().split(",").map((s) => s.trim().slice(0, 2));
  const first = accepted.find((l) => l === "en" || l === "cs" || l === "sk");
  const lang: Lang = isLang(cookie) ? cookie : first === "cs" || first === "sk" ? "cs" : "en";
  return NextResponse.redirect(new URL(`/${lang}${pathname === "/" ? "" : pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|images|cv/|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};
