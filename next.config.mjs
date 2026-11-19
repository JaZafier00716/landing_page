// Security headers (README "Security"). To roll back, delete the headers() block below.
// The CSP is report-only: browsers log violations to the console but block nothing. 'unsafe-inline' scripts are
// needed for the static prerender and the inline theme script; Vercel Speed Insights loads /_vercel/speed-insights/*
// from the same origin, so 'self' covers it. frame-ancestors is ignored in report-only mode (X-Frame-Options covers it).
// Add "upgrade-insecure-requests" when switching to an enforced header: Chrome logs a console error for it in report-only mode.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
  // Optional storage-free canary (README "Security"): set SITE_ID in the Vercel env to emit it; unset sends nothing.
  ...(process.env.SITE_ID ? [{ key: "X-Site-Id", value: process.env.SITE_ID }] : []),
];

// Common scanner paths that do not exist on this site; handled by app/api/hp only when HONEYPOT_ENABLED=1.
// Keep in sync with honeypotPaths in lib/honeypot.ts (a test checks this).
const honeypotPaths = ["wp-login.php", "xmlrpc.php", ".env", "wp-admin", "phpmyadmin", ".git/config"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  productionBrowserSourceMaps: false,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return { beforeFiles: honeypotPaths.map((p) => ({ source: `/${p}`, destination: `/api/hp/${p}` })), afterFiles: [], fallback: [] };
  },
  async redirects() {
    return [
      { source: "/cv_en.pdf", destination: "/cv/jan-zamostny-cv-en.pdf", permanent: true },
      { source: "/cv_cz.pdf", destination: "/cv/jan-zamostny-cv-cs.pdf", permanent: true },
      // Old site slugs that only existed for Czech project names. Slugs shared with English
      // (tetris, csg-website, ...) still exist and go through proxy.ts language detection.
      { source: "/projects/modalni-textovy-editor", destination: "/cs/projects/modal-text-editor", permanent: true },
      { source: "/projects/csg-web", destination: "/cs/projects/csg-website", permanent: true },
      { source: "/projects/skladon-web", destination: "/cs/projects", permanent: true },
    ];
  },
};

export default nextConfig;
