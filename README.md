# jan-zamostny.vercel.app

Personal portfolio of Jan Zámostný: projects, experience, skills and downloadable CV, in English and Czech. Live at [jan-zamostny.vercel.app](https://jan-zamostny.vercel.app).

The site is a small, content-driven Next.js app with no database: everything it shows lives in typed modules in this repository.

## Features

- English and Czech versions of every page (`/en`, `/cs`), with language-aware typography for Czech
- Pages for home, experience (work, education, courses), projects with case-study detail pages, and skills linked to the projects that use them
- Light and dark theme that follows the OS and can be overridden
- Mostly server components; client components are limited to the navigation, theme toggle, language link, copy button and contact form
- Contact form that sends email through [Resend](https://resend.com)
- CV as PDF in both languages, with the LaTeX sources in [`cv/`](cv)
- Self-hosted font subsets, generated sitemap and robots file, Open Graph image

The design system (tokens, spacing, components, accessibility rules) is documented in [`DESIGN.md`](DESIGN.md).

## Tech stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 (CSS-first configuration), lucide-react, Resend, Vercel (hosting, Speed Insights). Tests use the Node.js built-in test runner; the CV buttons are checked with Playwright.

## Getting started

Requires Node.js (`engines` in `package.json` asks for 26.x) and npm.

```bash
npm ci
npm run dev                # http://localhost:3000 redirects to /en or /cs
```

The contact form needs two environment variables; everything else works without them:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key used to send the message |
| `CONTACT_TO_EMAIL` | Address that receives it |

Pull them from the linked Vercel project with `npx vercel env pull .env`.

### Checks

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
npm run check:cv -- http://localhost:3000   # CV buttons, against a running build (needs Playwright's Chromium)
```

## Security

Small, independent mechanisms; each can be rolled back on its own.

- **Headers** (`next.config.mjs`, `headers()`): `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`, HSTS (2 years, no subdomains/preload) and a **report-only** CSP (`Content-Security-Policy-Report-Only`: nothing is blocked; violations show in the browser console). Roll back: delete the `headers()` block. To enforce the CSP later, rename the header to `Content-Security-Policy` after checking the console on every page. `productionBrowserSourceMaps` is explicitly `false`; `npm run build` runs `scripts/check-no-sourcemaps.mjs` (postbuild) and fails if a `.map` file exists in `.next/static`.
- **robots.txt** (`app/robots.ts`, list in `lib/crawlers.ts`): everyone is allowed, AI-training and LLM crawlers are disallowed (the Vercel firewall rules are separate and managed in the dashboard). Roll back: revert those two files.
- **Honeypot** (`app/api/hp/[...p]/route.ts`, `lib/honeypot.ts`, `rewrites()` in `next.config.mjs`): off by default. A few scanner paths that do not exist here (`/wp-login.php`, `/.env`, ...) answer a plain 404; with `HONEYPOT_ENABLED=1` each hit also logs one JSON line (`path`, `method`, `ua` cut to 200 characters, `x-vercel-ip-country`, `time`) to the runtime logs. No IP, body or cookie is read or stored, and the paths are not in robots.txt or the sitemap. Vercel Hobby keeps runtime logs only briefly, so check them soon after events. Roll back: unset the variable (or remove the rewrites and the route).
- **Canary tokens**: unique random strings that appear only in metadata, never in visible text, titles, descriptions or structured data. They show where a copy came from if the same string turns up elsewhere. Two places: the PDF keywords of the CV (`CV_CANARY=<token> make -C cv install`; without the variable no token is added) and an `X-Site-Id` response header (set the `SITE_ID` env var in Vercel before the build; unset sends no header). The token values are not in this repository. Both are harmless metadata; remove them by building without the variables.
- **Authorship**: `authors`, `creator` and `publisher` in the `[lang]` layout metadata; the CV PDFs carry author, title and a copyright line in their metadata (`cv/cv.sty`, `cv/cv_*.tex`).

Tests for these: `npm test` (robots rules, honeypot behaviour) and the source map check above.

## License

The source code is MIT, see `LICENSE`. The site content (texts, photos, CV, project screenshots and the visual design) is © 2026 Jan Zámostný, all rights reserved, and is not covered by the MIT licence.

## Layout

- `app/[lang]/`: pages; `proxy.ts` sends un-prefixed URLs to `/en` or `/cs` (it runs only for those)
- `lib/content.ts`: content access; `lib/i18n.ts`: languages, dictionary, date formatting
- `components/`: server components, except `site-nav`, `theme-toggle`, `lang-link`, `copy-button` and `contact-form`
- `app/fonts/`: self-hosted font subsets (`build.sh` rebuilds them)
- `DESIGN.md`: the design system (tokens, components, accessibility checklist)

## Content

Edit the typed modules in `content/` and redeploy; there is no seed step. Every text has an `en` and a `cs` version.

| File | Content |
|---|---|
| `content/projects.ts` | Project pages in site order (`kind` is `work`, `school` or `hidden`; `featured` puts a project on the home page) |
| `content/experience.ts` | Work, education (`kind: "education"`) and courses (`kind: "course"`) |
| `content/skills.ts` | Skills tables; `usedIn` lists project or experience slugs |
| `content/person.ts` | Name, email, phone, LinkedIn, GitHub |
| `content/types.ts` | The shapes of the above |

UI strings (navigation, buttons, headings, home intro) are in `lib/i18n.ts`. Project screenshots go to `public/images/projects/` (16:10, WebP).

### CV

The PDFs in `public/cv/` are built from `cv/` with XeLaTeX:

```bash
cd cv
make            # build/cv_en.pdf and build/cv_cz.pdf
make install    # also copies them into ../public/cv/
```

## Project structure

```
app/[lang]/    pages, layout, contact server action, Open Graph image
app/fonts/     self-hosted font subsets (build.sh rebuilds them)
components/    UI components (server components by default)
content/       typed site content
lib/           content access, i18n, typography, contact helper (+ tests)
cv/            LaTeX sources of the CV
docs/          design decisions and UI quality checklist
proxy.ts       sends un-prefixed URLs to /en or /cs
```

## Deployment

Hosted on Vercel (region `fra1`, see `vercel.json`); a push to `main` deploys to production.
