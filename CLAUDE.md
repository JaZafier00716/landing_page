# CLAUDE.md

Personal site: Next.js 16 App Router with `cacheComponents`, React 19, Tailwind 4 (CSS-first, no config file), Prisma 7.

- **Design is binding**: follow `DESIGN.md` for any UI change (tokens in `app/globals.css`, no new colors, no animations beyond what section 7 allows).
- **Server components by default.** Client components are only `components/site-nav.tsx`, `theme-toggle.tsx`, `lang-link.tsx`, `copy-button.tsx`. Keep it that way.
- **All DB reads go through `lib/content.ts`** (`"use cache"` + `cacheLife`). Pages never import `lib/db.ts` directly. Uncached DB reads break the build under `cacheComponents`.
- **Every user-visible string exists in both languages**: UI strings in `lib/i18n.ts`, content in `data/seed.ts`. The Czech text is proofread by Jan; flag new Czech for review.
- **`DATABASE_URL` in `.env` is the production database.** Do not run `migrate dev`, `migrate reset` or `db push` against it. Schema changes: write an additive migration (`prisma migrate diff --from-schema <old> --to-schema prisma/schema.prisma --script`), apply with `migrate deploy` only after Jan agrees. Never delete DB rows without asking.
- Private repositories are never linked on the site. The `raynet-` README contains a Wi-Fi credential; never copy from it.
- Checks before committing: `npm run lint` and `npm run build`.
- Work on a branch, never push to `main` (pushes to `main` deploy to production).
