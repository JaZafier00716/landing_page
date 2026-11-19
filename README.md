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
