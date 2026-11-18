# jan-zamostny.vercel.app

Personal site of Jan Zámostný: projects, experience, skills and CV, in English and Czech.
Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, deployed on Vercel. No database: all content is in the repo.

## Setup

```bash
npm ci
npm run dev                # http://localhost:3000 redirects to /en or /cs
```

The contact form needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (`npx vercel env pull .env`); everything else works without env vars.

## Content

Edit the typed modules in `content/` and redeploy; there is no seed step:

- `content/projects.ts`: project pages, in site order (`kind` is `work`, `school` or `hidden`; `featured` puts it on the home page)
- `content/experience.ts`: work, education (`kind: "education"`) and courses (`kind: "course"`), in site order
- `content/skills.ts`: the skills tables; `usedIn` lists project or experience slugs
- `content/person.ts`: name, email, phone, LinkedIn, GitHub
- `content/types.ts`: the shapes; every text has `en` and `cs`

`lib/content.ts` turns them into page data (Czech typography via `lib/typography.ts`).
UI strings (nav, buttons, headings, the home intro) are in `lib/i18n.ts`.
Screenshots go to `public/images/projects/` (16:10, WebP). The CV PDFs are built from `cv/` (`make install`).

## Checks

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
npm run check:cv -- http://localhost:3000   # CV buttons, against a running build (needs Playwright's Chromium)
```

## Layout

- `app/[lang]/`: pages; `proxy.ts` sends un-prefixed URLs to `/en` or `/cs` (it runs only for those)
- `lib/content.ts`: content access; `lib/i18n.ts`: languages, dictionary, date formatting
- `components/`: server components, except `site-nav`, `theme-toggle`, `lang-link`, `copy-button` and `contact-form`
- `app/fonts/`: self-hosted font subsets (`build.sh` rebuilds them)
- `DESIGN.md`: the design system (tokens, components, accessibility checklist)
