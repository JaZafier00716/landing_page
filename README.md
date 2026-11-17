# jan-zamostny.vercel.app

Personal site of Jan Zámostný: projects, experience, skills and CV, in English and Czech.
Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, Prisma 7 on Postgres, deployed on Vercel.

## Setup

```bash
npm ci                     # also runs `prisma generate` into lib/generated/prisma
npx vercel env pull .env   # DATABASE_URL (prisma+postgres:// or postgres://)
npm run dev                # http://localhost:3000 redirects to /en or /cs
```

`npm run build` prerenders every page, so it needs a reachable database.

## Content

Content lives in the database and is written by `data/seed.ts`:

- `Project` + `ProjectTranslation`: project pages (`kind` is `work`, `school` or `other`; `featured` puts it on the home page)
- `Experience` + `ExperienceTranslation`: work, education (`kind: education`) and courses (`kind: course`)
- `SkillGroup` + `Skill`: the skills tables; `usedIn` lists project or experience slugs
- `PersonDetails`: name, email, phone, LinkedIn, GitHub

To change content, edit `data/seed.ts` and run:

```bash
npx prisma migrate deploy   # apply pending migrations
npx prisma db seed          # upserts by slug/key, never deletes rows
```

Pages cache database reads for a day (`cacheLife("days")`); redeploy to publish changes immediately.
UI strings (nav, buttons, headings, the home intro) are in `lib/i18n.ts`.
Screenshots go to `public/images/projects/` (16:10, WebP). The CV PDFs are built from `cv/` (`make install`).

## Layout

- `app/[lang]/`: pages; `proxy.ts` sends un-prefixed URLs to `/en` or `/cs`
- `lib/content.ts`: all database reads; `lib/i18n.ts`: languages, dictionary, date formatting
- `components/`: server components, except `site-nav`, `theme-toggle`, `lang-link` and `copy-button`
- `DESIGN.md`: the design system (tokens, components, accessibility checklist)
