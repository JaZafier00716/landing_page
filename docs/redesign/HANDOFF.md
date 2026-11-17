# Redesign handoff

Prepared 2026-11-17 in an earlier chat. A new chat with npm registry access picks this up and does the implementation. Run everything from `~/Projects/landing_page`.

## What's already done (in this folder and repo)
- `audit.md`: architecture, code-level UI/UX findings (F#), the upgrade plan with exact target versions and 15 ordered steps, and three design directions.
- `visual_audit.md`: findings (V#) and measurements from the live site https://jan-zamostny.vercel.app/
- `github_projects.md`: inventory of GitHub projects. VIS, TDS-I, OSY, ZPG, dev-events-nextjs16-course and raynet- are new.
- `/DESIGN.md`: the chosen design (direction A "Datasheet", without the chip hero, with solid primary buttons). **It's binding for all UI work.**
- `/cv/`: LaTeX source rebuilt from the old PDFs (`make`, `make install` copies to `public/`). Content is not updated yet. `cv_cz.tex` is still English text, because the old `cv_cz.pdf` was the English CV.

## Status update (2026-11-17, end of the first chat). This overrides anything above.
- DONE, step 1 (LinkedIn): `docs/redesign/linkedin.md`. About, Education and Skills pages loaded blank, but the CV already covers them. Newest role: FUTTEC a.s., QA Automation Engineer intern, 9/2026 to now. Site dates are wrong for Blackfish (6/2023 to 12/2023) and SHOWMORE (from 7/2024); LinkedIn and the CV are correct.
- DONE, step 6 (CV): `cv/` updated in EN and real CZ, built, installed to `public/cv_*.pdf`. Changelog for Jan to proofread: `docs/redesign/cv_changes.md`. Don't redo it.
- DONE: `.env` (DATABASE_URL via `vercel env pull`), `.vercel/` link, `vercel` removed from dependencies.
- DONE: repo https://github.com/JaZafier00716/catering_project (VIS `projekt` branch + TDS-I as submodules). Use it as the link for the catering project on the site.
- DECIDED: private repos are NOT shown on the site. graph_center is private, so remove its public link. Mare Resorts appears on the CV only, not on the site.
- Site content to add: FUTTEC, CVAT (VŠB-TUO), CAE C2 (09/2025), the catering project, ZPG (C++/OpenGL, GitLab `vsb-third_year/VSB-ZPG`, private, no link), OSY, dev-events-nextjs16-course, raynet- (contributor).
- Remaining work: steps 0, 2, 3, 4, 5, 7, 8, 9. All of them need npm registry access, and the DB steps need the Prisma host.

## Prerequisites check (stop and tell Jan if any fail)
`npm ci` works; `.env` has `DATABASE_URL`; `npx prisma migrate status` reaches the DB.

## Execution plan (subagents, model per task)
| # | Task | Model | Notes |
|---|---|---|---|
| 0 | Baseline: `npm ci`, `npm run lint`, `npm run build`, note results | haiku | |
| 1 | LinkedIn extraction to `docs/redesign/linkedin.md` (built-in browser) | sonnet | needs Jan signed in |
| 2 | Upgrade steps 1-6 of audit.md §3: Next 16.4.x, React, Tailwind 4.3 CSS-first, Prisma 7 (prisma.config.ts, adapter-pg), one ESLint flat config, drop unused deps, remove `.idea/` | sonnet | small commits on branch `redesign/2026` |
| 3 | Restructure: `app/[lang]` routing + `proxy.ts`, `lib/i18n.ts`, `lib/content.ts`, Server Components by default, metadata per page, `generateStaticParams` | opus | the riskiest step; follow audit.md §3 seams |
| 4 | Implement DESIGN.md: tokens, fonts (latin-ext), components, all pages, a11y checklist | sonnet | |
| 5 | Content: move projects into Prisma (new model + migration + seeder), add new GitHub projects and LinkedIn data in CZ+EN, fix the missing work-project thumbnails | sonnet | ask before deleting any DB content; Jan proofreads the Czech |
| 6 | CV: update `cv_en.tex` + a real Czech `cv_cz.tex` with the newest experience, VIS/TDS-I and LinkedIn sections; `make install` | sonnet | keep the existing layout |
| 7 | Verify: lint, build, then a browser pass at 375/768/1366 in both languages against V#/F# findings; Lighthouse before/after | sonnet | |
| 8 | Review the full diff + decisions with the council-review skill; fix real issues | opus | |
| 9 | PR (pr skill) with before/after screenshots, a short README rewrite, and CLAUDE.md (writing-for-agents skill) | haiku | open the PR, don't merge |

Steps 1 and 2 can run in parallel; 3 waits for 2; 4 and 5 wait for 3; 6 needs 1.

## Deployment (verified via the Vercel connector, 2026-11-17)
- Vercel project `jan-zamostny` (team `jazafier00716s-projects`), connected to GitHub `JaZafier00716/landing_page`. Pushes to `main` deploy to production (https://jan-zamostny.vercel.app); other branches (e.g. `dev`) get preview deployments.
- Push `redesign/2026` to get a preview URL, and run the browser verification (step 7) against that preview, not just localhost. Merging to `main` is Jan's call.
- Local repo is linked (`.vercel/`), and `.env` holds `DATABASE_URL` from `vercel env pull`.

## Rules
- `vercel` was added to `dependencies` by a local `npm i vercel` on 2026-11-17. Remove it from package.json (use `npx vercel`), then reinstall.
- Branch `redesign/2026`, small commits, never push to main.
- Ask Jan before: removing Prisma or DB data, deleting images or content, changing the deployment, adding paid services.
- The `raynet-` README holds a Wi-Fi credential; never copy it anywhere.
