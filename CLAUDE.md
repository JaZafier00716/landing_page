# CLAUDE.md

Personal site: Next.js 16 App Router with `cacheComponents`, React 19, Tailwind 4 (CSS-first, no config file). Content is in the repo (`content/*.ts`), no database.

- **Design is binding**: follow `DESIGN.md` for any UI change (tokens in `app/globals.css`, no new colors, no animations beyond what section 7 allows).
- **Server components by default.** Client components are only `components/site-nav.tsx`, `theme-toggle.tsx`, `lang-link.tsx`, `copy-button.tsx`, `contact-form.tsx` (approved by Jan 2026-11-18 for inline form errors). Keep it that way.
- **All content comes from `content/*.ts` through `lib/content.ts`.** Pages never import `content/` directly. There is no database.
- **Every user-visible string exists in both languages**: UI strings in `lib/i18n.ts`, content in `content/*.ts`. The Czech text is proofread by Jan; flag new Czech for review.
- Private repositories are never linked on the site. The `raynet-` README contains a Wi-Fi credential; never copy from it.
- Checks before committing: `npm run lint` and `npm run build`.
- Work on a branch, never push to `main` (pushes to `main` deploy to production).
