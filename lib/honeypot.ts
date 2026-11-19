// Log-only honeypot (README "Security"). Disabled unless HONEYPOT_ENABLED=1. It answers a few scanner paths that do
// not exist on this site with a plain 404 and, when enabled, logs one JSON line. It never records IPs, bodies or cookies.
// Keep in sync with honeypotPaths in next.config.mjs.
export const honeypotPaths = ["wp-login.php", "xmlrpc.php", ".env", "wp-admin", "phpmyadmin", ".git/config"];

export type HoneypotDeps = { enabled: boolean; log: (line: string) => void; now?: () => Date };

export function honeypotResponse(req: Request, segments: string[], deps: HoneypotDeps): Response {
  const notFound = () => new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  const path = `/${segments.join("/")}`;
  // Only the known paths are logged, so /api/hp/<anything> reached directly cannot be used to fill the log.
  if (!deps.enabled || !honeypotPaths.includes(path.slice(1))) return notFound();
  deps.log(
    JSON.stringify({
      event: "honeypot",
      path,
      method: req.method,
      ua: (req.headers.get("user-agent") ?? "").slice(0, 200),
      country: req.headers.get("x-vercel-ip-country"),
      time: (deps.now ?? (() => new Date()))().toISOString(),
    }),
  );
  return notFound();
}
