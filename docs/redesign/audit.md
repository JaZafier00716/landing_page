# landing_page: architecture, UI/UX audit, modernization plan

Snapshot: `origin https://github.com/JaZafier00716/landing_page.git`, branch `main`, HEAD `5a06379` (2026-04-21). Observed 2026-11-17, read-only.
Worktree is dirty from concurrent work, not from this audit: `.gitignore` gains LaTeX ignores, and an untracked `cv/` holds LaTeX CV sources and a build. This audit treats `cv/` as out of scope.
No `node_modules`. Nothing was installed, built, or run. Claims marked INFERRED were not runtime-verified.
Evidence labels: OBSERVED (read in code), DOCUMENTED (official docs), INFERRED, UNKNOWN.

---

## 1. Current architecture

### Stack (OBSERVED, `package.json`, `package-lock.json`)
Next 16.2.4 (App Router), React 19.2.5, Tailwind 4.2.4 via `@tailwindcss/postcss`, Prisma 6.19.3 on PostgreSQL, framer-motion 12, TypeScript 6.0.3, ESLint 9. `"type": "module"`. Deployment target is Vercel (INFERRED from `@vercel/speed-insights` and `.gitignore`). There is no CI config, Dockerfile, or `vercel.json`.

### Routes
| Route | Server file | Client file | Data source |
|---|---|---|---|
| `/` | `app/page.tsx` | `app/client.tsx` (whole page `"use client"`) | Prisma `HomePageContent` → `app/home.ts` |
| `/skills` | `app/skills/page.tsx` | `app/skills/client.tsx` → `components/ui/SkillsGrid.tsx` | Prisma `SkillCategory` → `app/skills/skills.ts` |
| `/experience` | `app/experience/page.tsx` | `app/experience/client.tsx` → `components/ui/job.tsx` | Prisma `Experience` → `app/experience/experiences.ts` |
| `/projects` | `app/projects/page.tsx` | `app/projects/client.tsx` (named "client" but has no directive, so it is a Server Component) → `project-section` → `projects-grid` → `project-card` (client) | **Hardcoded TS object** in `app/projects/projects.ts:30-252`, not the DB |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | none | same hardcoded object. **Orphaned**: no internal link points here, because cards link to `project.href` |

Also present: a root layout (`app/layout.tsx`), `app/favicon.ico`, and no `not-found`, `error`, `loading`, `sitemap`, `robots`, or OG files.

### Data flow
```
Postgres ──Prisma 6 (app/db.ts singleton, "server-only")──► app/home.ts | skills/skills.ts | experience/experiences.ts
                                                              │  (map rows → view types, pick translation by lang)
cookie "lang" ──getLang() (app/utils/getLang.ts)──► page.tsx ─┘──► <XClient data={...}/> ("use client") ──► components/ui/*
```
- Every page calls `cookies()`, so every route renders dynamically. Each request hits Postgres, and nothing is cached (INFERRED from the Next 16 rendering model, which has no `use cache` or `revalidate`).
- Translation model: `*Translation` tables keyed `(parentId, lang)`. `ExperienceTranslation.skills` is a JSON **string** that is parsed at read time (`experiences.ts:27`). `PersonDetails` is duplicated per language (`seed-home.ts`).
- Seeds live in `data/databaseSeeders/*.ts`. They are not wired to any npm script or Prisma seed config. `seed-home.ts` is not idempotent: each run creates a new `HomePageContent`, and `upsert where id: 0` always creates. `getHomePageData` uses `findFirst` without `orderBy` (`home.ts:23`), so after a re-seed the row it returns is arbitrary.

### Language handling
- `getLang()` returns `cookies().get("lang")` cast to `"en"|"cs"`, defaulting to `"en"`, with **no validation** (`getLang.ts:4`).
- `Header.toggleLang` (`components/Header.tsx:14-18`) writes `document.cookie = lang=..; path=/`, which is a session cookie with no max-age, and then runs `window.location.reload()`.
- `components/ui/LanguageProvider.tsx` is entirely commented out. It is dead code.
- UI strings are inline ternaries spread across 6 files (`links.tsx`, `lang.tsx`, `projects/page.tsx`, `[slug]/page.tsx`, `Header.tsx`, `clipboard.tsx`, the last being Czech-only). URLs carry no language, so search engines see only EN (the default cookie).

### Component inventory
| Live | Dead (no importer) |
|---|---|
| `Header` (client), `ui/nav` (client), `ui/links` (client, `usePathname`), `ui/LinkComponent`, `ui/logo`, `ui/button` (cva + Slot wrapper; the `default` variant is `""`, so callers restyle everything), `ui/clipboard`, `ui/picture` (client, framer), `ui/SkillsGrid` (client), `ui/job` (client), `ui/project-section`, `ui/projects-grid`, `ui/project-card` (client, iframe + ResizeObserver), `ui/project-stack-icons` | `ui/LanguageProvider`, `ui/lang`, `ui/web`, `ui/input`, `ui/textarea`, `ui/select`, `ui/tabs`, `ui/tooltip`, `ui/scroll-area`; unused images `public/images/donkey_kong.png` and `picture_unedited.jpg` |

### Config drift (OBSERVED)
- `globals.css:1` loads `tailwind.config.ts` via `@config`. That config is a v3-era shadcn file (`require("tailwindcss-animate")`, `content` globs, `container`). Its `accent #00ff99`, `blue-1000`, `cyan-1000`, and `font-primary` tokens are unused by markup.
- `globals.css` declares light shadcn tokens in `:root` plus an unused `.dark` block in HSL triplets. That format is incompatible with the hex tokens beside it.
- Two ESLint configs exist: `.eslintrc.json` (legacy, ignored by ESLint 9) and `eslint.config.mjs` (live).
- `components.json` (shadcn) points at the JS config.
- `.idea/` is committed. `README.md` is the create-next-app default with a stray `# landing_page`.
- `nodemon` and `tsconfig-paths` are dependencies, but nothing references them.
- `server-only` is imported but not declared. Next resolves it internally (INFERRED), but the docs install it explicitly.

---

## 2. UI/UX findings (prioritized)

Severity: **P0** means broken or unusable for some users. **P1** means a significant a11y, UX, or perf problem. **P2** is quality. **P3** is polish.

### Measured contrast (WCAG 2.x, computed; Tailwind v4 OKLCH colors converted to sRGB)
| Pair | Ratio | Verdict |
|---|---|---|
| white `#fff` on bg `#040340` / `#180022` | 19.23 / 19.78 | AAA |
| `#00ff99` (config accent, **unused**) on bg | 14.43 / 14.84 | AAA |
| emerald-400 `#00d492` (headings, active link) on bg | 9.92 / 10.20 | AAA |
| emerald-400 on card gray-900 `#101828` | 9.15 | AAA |
| emerald-600 `#009966` (icons, borders, "Z") on bg | 5.26 / 5.41 | AA |
| emerald-600 on gray-900 card | 4.86 | AA (normal text barely passes) |
| emerald-600 on gray-800 `#1e2939` | 4.02 | **fails AA for normal text** |
| body default `text-foreground #010816` on bg | **1.04 / 1.01** | **fails**: see F3 |
| focus ring `--ring #010816` on bg | **1.04** | **fails 1.4.11**: see F5 |

Color contrast is mostly fine. The real problems are invisible default text, focus visibility, motion, and missing names.

### Findings
| # | Sev | Location | Issue | Fix |
|---|---|---|---|---|
| F1 | P0 | `app/projects/projects.ts:96,112,128,207,218,239` + `project-card.tsx:71-92` | Professional projects use live `<iframe>` previews of csg.com, skladon.com, and solidsun.cz. Their `thumbnail` files (`/images/csg.png`, `skladon.png`, `solidsun.png`) **do not exist** in `public/images`, so `/projects/csg-website` etc. render broken images. Third-party sites can refuse framing (X-Frame-Options/CSP), which leaves blank cards (INFERRED). Each iframe loads a full 1600x900 site with scripts: 3 extra sites on one page. | Commit real screenshots (AVIF/WebP, 1600x900) and drop the iframes. If a live preview is wanted, load it on click only. |
| F2 | P0 | `components/ui/clipboard.tsx:11`, `Header.tsx:43`, `app/client.tsx:102,124`, `SkillsGrid.tsx:41` | `bg-opacity-*` and `flex-shrink-*` (`job.tsx:81`) were **removed in Tailwind v4** (DOCUMENTED, upgrade guide), and v4.2.4 is installed. The copy overlay `bg-black bg-opacity-30` becomes **solid black over the page**, and the mobile menu `bg-opacity-20 bg-black` becomes opaque black (INFERRED from the docs). | Use `bg-black/30`, `bg-black/20`, `bg-gray-800/90`, `shrink-0`. |
| F3 | P0 | `app/globals.css:96-98` (with `:root --foreground #010816`, line 7) | The second `@layer base` sets `body { @apply text-foreground }`, which overrides `text-white` on line 48. Any text without an explicit color (the default 404, future content) renders **#010816 on #040340 = 1.04:1**. Components only look correct because each one hardcodes `text-white`. | Delete the shadcn token block and define one `--color-text` token on `body`. Then remove per-component `text-white`. |
| F4 | P0 | `app/client.tsx:130-151` | LinkedIn and GitHub links contain only an icon: **no accessible name**. | Add an `aria-label` ("LinkedIn profile, opens in new tab") or visible text, and mark the icon `aria-hidden`. |
| F5 | P1 | `components/ui/button.tsx:8`, `globals.css:32`; links in `LinkComponent.tsx`, `logo.tsx`, `client.tsx:187` | The focus ring color is `--ring #010816`, invisible at 1.04:1. Visibility depends on an accidental white `ring-offset`. Nav links, logo, CV and social links have no designed focus style. | Set a global `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px }`. Each proposed accent passes 3:1 (see section 4). |
| F6 | P1 | `components/ui/nav.tsx:18-37` | The mobile menu toggle is a bare lucide `<svg onClick>`: not focusable, no Enter/Space, no `aria-expanded` or `aria-controls`. Keyboard and switch users cannot open the menu. | Use a `<button aria-expanded aria-controls>`, or the native `popover` attribute / `<details>` with no JS. |
| F7 | P1 | `picture.tsx:42-61`, `client.tsx:195`, `Header.tsx:39`, every `motion.*` | Animations run forever: the 20 s SVG ring loop, `animate-bounce` on the download icon, and `animate-pulse` on the header rule. Nothing respects `prefers-reduced-motion`; there is no `MotionConfig reducedMotion="user"` and no media query. This breaks WCAG 2.2.2 (motion over 5 s with no pause) and 2.3.3. | Remove infinite loops. Keep one page-load sequence in CSS inside `@media (prefers-reduced-motion: no-preference)`. |
| F8 | P1 | `app/client.tsx:36-197`, `picture.tsx:9-23`, `job.tsx`, `SkillsGrid.tsx` | All hero content is server-rendered with `opacity:0` and only appears after hydration plus delays of up to 2.8 s. The h1 starts at `translateX(-100%)`. This delays LCP. With JS disabled or failing, the page is blank. | Server-render visible content. If an entrance is kept, use a CSS `@keyframes` that starts visible-safe, or `@starting-style`. |
| F9 | P1 | `app/client.tsx:15-22, 98-128`, `clipboard.tsx` | Phone and email buttons **copy** hardcoded strings (lines 17 and 21 duplicate the DB values) instead of `tel:`/`mailto:` links. The value shows only on mouse hover (`group-hover`, not focus). The "Zkopírováno" overlay is Czech-only, uses an `<h1>`, has no `role="status"`, and covers the viewport as one giant `<button>`. `clipboard.writeText` is not awaited or error-handled. | Render `mailto:`/`tel:` links that show the address as text, and add a small copy button with an `aria-live` "Copied" or "Zkopírováno" message from the dictionary. |
| F10 | P1 | `public/cv_cz.pdf`, `public/cv_en.pdf` | The two PDFs are **byte-identical** (md5 `47068452…`), so one language gets the wrong CV. The link has both `download` and `target=_blank`, and `download` wins, so the user gets no preview. | Regenerate both. There is LaTeX work in an untracked `cv/`. Name the files `jan-zamostny-cv-en.pdf` and `-cs.pdf`. Choose download **or** open, and show the file type and size. |
| F11 | P1 | `app/utils/getLang.ts:4`, `home.ts:39-41` | An unvalidated cookie (`lang=de`) passes into Prisma. `getHomePageData` then throws "Home page data not found", which is a 500 on `/`. | Add an `isLang()` guard, or switch to `[lang]` routing with `notFound()`. |
| F12 | P1 | `app/layout.tsx:16-19` | All pages share title "Jan Zámostný" and description "Landing page". There is no per-route metadata, OpenGraph/Twitter, canonical, `alternates.languages` (hreflang), `sitemap.ts`, or `robots.ts`. Because the language lives in a cookie, the CS content cannot be indexed. | Add `generateMetadata` per route plus `[lang]` URLs with `alternates`, `app/sitemap.ts`, `app/robots.ts`, and `opengraph-image.tsx`. |
| F13 | P1 | `app/layout.tsx:9-13` | JetBrains Mono loads with `subsets:["latin"]` only, so Czech glyphs (ř ů ě č) **fall back to a system font** mid-word. It also requests 8 explicit weights of a variable font. | Use `subsets:["latin","latin-ext"]` and omit `weight` to get one variable file. |
| F14 | P1 | `app/layout.tsx:4` | `devicon/devicon.min.css` is imported globally. It ships the icon-font CSS for the whole devicon set; about 35 icons are used (INFERRED size; not measured offline). Icon fonts also render as text for screen readers and fail under forced-colors. | Use inline SVGs for the used icons, either copied from `devicon/icons/<name>/*.svg` or rendered by a server `<TechIcon>`. |
| F15 | P2 | `app/client.tsx:48,64` | Heading order: the h1 is "Welcome to my personal page", and the **name is in an h3** (it skips h2). `/skills` and `/experience` have **no h1**, and only `/` has a `<main>`. The empty states use `<h1>` (`projects-grid.tsx:11`). | The name is the h1. Make the role or intro a `<p>`. Each route gets one h1 and the layout gets `<main id="main">`. Add a skip link. |
| F16 | P2 | `picture.tsx:26` | `alt="My Picture"`. The photo is a 639x852 portrait cutout (61% transparent) shown `object-contain` in a square circle with `quality={100}`. It needs `images.qualities` to include 100 (`next.config.mjs:4`). | Use `alt="Jan Zámostný"` (or `alt=""` next to the visible name). Crop to the head and shoulders, export AVIF, and drop quality 100. |
| F17 | P2 | `SkillsGrid.tsx:77-102` | Skill tiles are `<button>`s whose only action is to reveal the tile's own name. Icon-only tiles expose the name only through the hidden span. That is a fake affordance. | Use a static list with a visible label under each icon (`<ul>` + `<li>`), and no client JS. |
| F18 | P2 | `SkillsGrid.tsx:73`, `job.tsx:74` | Stagger delays are derived from **DB autoincrement ids** (`item.id - 10*catId`). After a re-seed, ids keep growing (`deleteMany` does not reset SERIAL), so delays become negative or arbitrary. | Use the array index, or drop the stagger. |
| F19 | P2 | `projects/client.tsx:18`, `projects.ts:260-284` | Section order and `isProduction` layout are decided by regex on **localized titles** (`/professional\|profes/`). | Add an explicit `kind: "work" \| "school"` field. |
| F20 | P2 | `public/images/editor.png` | The screenshot text reads "Dummy file … generated by AI, because I am too lazy". It shows on a recruiter-facing page. Thumbnail aspect ratios vary (1.27–1.78), and `object-cover` 16:9 crops Donkey Kong. | Retake the screenshot, normalize to 16:10, and use `next/image` with `sizes`. |
| F21 | P2 | `tailwind.config.ts:17-24` | The custom `xs:360px` breakpoint means base (<360 px) styles lack padding and sizes (`client.tsx:26`, `xs:px-8`). Header language buttons are `absolute top-8 right-8` outside the flow (`Header.tsx:26,49`). The mobile menu uses an undefined `--radix-accordion-content-height` (`Header.tsx:43`). Skill tiles and the portrait use fixed px sizes. | Go mobile-first with no `xs`. Put the switch in the nav flow, and use `clamp()` sizes. |
| F22 | P2 | Header `toggleLang` | The language switch does a full reload. The label "CS"/"EN" names the *other* language with no `lang`/`hreflang` and no `aria-label`. The cookie expires with the session. | Use `<Link href="/cs/…" hrefLang="cs" lang="cs">Čeština</Link>`, which needs no JS. |
| F23 | P2 | client boundaries | `/` ships framer-motion, react-icons, lucide, and the whole page as client JS. `/experience` and the Header are client components only for entrance animations. | Section 3 lists the per-route split. The target is about 2 tiny client leaves site-wide. |
| F24 | P3 | `project-card.tsx:53-59` | The entire card is a link with `aria-label="Open X project link"`, which overrides the visible name and description. External opens are not announced. The `whileHover` translate applies on every card. | Link the title (stretched link pattern) and add "(GitHub)" or "(live site)" text. |
| F25 | P3 | navigation | No footer and no contact on inner pages. The CV is reachable only from `/`. `/projects/[slug]` is unreachable. | Add a persistent contact/CV block in the layout. Delete `[slug]` or link cards to it. |

---

## 3. Upgrade and simplification plan

### Target versions (as of 2026-11-17)
| Package | Now | Target | Source |
|---|---|---|---|
| `next`, `eslint-config-next` | 16.2.4 | **16.4.5** (latest patched 16.x, Active LTS) | nextjs.org/blog/november-2026-security-release (2026-11-03); 16.4 notes at nextjs.org/blog/next-16-4 |
| `react`, `react-dom`, `@types/react*` | 19.2.5 | **19.3.x** (bundled with Next 16.4; exact patch UNVERIFIED offline, take npm `latest`) | nextjs.org/blog/next-16-4 |
| `tailwindcss`, `@tailwindcss/postcss` | 4.2.4 | **4.3.5** (2026-11-06) | releases.sh/tailwind-css |
| `prisma`, `@prisma/client` | 6.19.3 | **7.10.1** + `@prisma/adapter-pg@7`, `dotenv` | prisma.io/docs/orm/release-status; upgrade guide prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 |
| Prisma 8 | n/a | **Do not adopt**. It is a release candidate (rc.34) with no GA date, a contract-based client, no `prisma generate`, and missing nested writes. | prisma.io/docs/orm/release-status, /docs/guides/upgrade-prisma-orm/postgresql |

Urgency: **Prisma 6 receives security patches only until 2026-11-19** (DOCUMENTED, release-status). Next 16.2.4 lacks the Aug–Nov 2026 security releases.

### Breaking changes that affect THIS code
- **Next 16.2 → 16.4**: No API breaks hit this app. Async `cookies()`/`params` are already used (`getLang.ts`, `[slug]/page.tsx:12`). `images.qualities [75,100]` is already set, as Next 16 requires for `quality={100}`. Note that `experimental.appNewScrollHandler` was removed in 16.4 (unused here). There is no middleware, so the `proxy` rename applies only if you add one. `next lint` is gone, and `npm run lint` already calls `eslint .`. 16.4 recommends **Cache Components** (`cacheComponents: true`, `partialPrefetching: true`), which becomes the default in Next 17. With the cookie-based language, every route reads `cookies()`. That works, but nothing is cacheable. The `[lang]` segment below fixes this.
- **Tailwind 4.x** (already on v4, but the code is written for v3): removed `bg-opacity-*` and `flex-shrink-*` (F2). The renamed `shadow-sm`/`rounded-sm`/`outline-none`/`ring` appear only in the dead shadcn files and `button.tsx`. The default border color is now `currentColor`, which `* { @apply border-border }` masks. `hover:` now applies only on hover-capable devices, so the hover-only phone/email reveal never appears on touch. `@config` JS is supported but legacy; `container` config options are gone.
- **Prisma 7** (DOCUMENTED):
  1. `generator client { provider = "prisma-client"; output = "../lib/generated/prisma" }`. `prisma-client-js` is on its way out, and `output` is required.
  2. Remove `url` from `datasource db`. Create `prisma.config.ts` at the root with `defineConfig({ schema: "prisma/schema.prisma", datasource: { url: env("DATABASE_URL") }, migrations: { seed: "tsx data/seed.ts" } })`.
  3. Rewrite `app/db.ts` to `import { PrismaClient } from "@/lib/generated/prisma/client"; import { PrismaPg } from "@prisma/adapter-pg"; new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })`. Keep the globalThis singleton.
  4. `.env` is no longer auto-loaded by the CLI, so add `import "dotenv/config"` in `prisma.config.ts`.
  5. The seed no longer runs on `migrate dev`. Run `prisma db seed` explicitly.
  6. Requires Node ≥20.19 and TS ≥5.4. TS 6.0.3 is fine. Recommend `tsconfig` `target: "ES2023"`, since it is currently ES2017.
  7. The `pg` pool has no connection timeout by default, and SSL defaults changed. If the hosted Postgres uses a self-signed cert, expect `P1010`.
  8. Seeds import `@prisma/client` (3 files), so update them to the generated path. `"type": "module"` is already set.
  9. Add `lib/generated/` to `.gitignore`. Keep `postinstall: prisma generate`, because the generated client is no longer in `node_modules`.

### Target shape (codebase-design: where the seams go)
Two **deep modules** replace the five shallow pass-throughs (`home.ts`, `skills.ts`, `experiences.ts`, `projects.ts`, `getLang.ts`) and the scattered ternaries.

1. **`lib/i18n.ts`**: `type Lang = "en" | "cs"`, `hasLang()`, `getDict()` (dictionary JSON for UI strings: nav, "Copied", "Back", empty states), `altLang()`. The language comes from the `[lang]` root param via `next/root-params` (DOCUMENTED pattern), so callers never pass `lang`.
2. **`lib/content.ts`** (`server-only`): `getHome()`, `getSkills()`, `getExperience()`, `getProjects()`, `getProject(slug)`. Behind this small interface it hides Prisma, translation fallback, JSON parsing, ordering by `sortOrder`/`kind`, and `'use cache'` + `cacheLife('days')`. It returns plain view types, defined once (today `ProjectStackItem` is declared 3 times and `ExperienceItem` twice). Tests or seeds can swap the Prisma adapter at `lib/db.ts`. There is one adapter today, so that seam stays internal, not exported.

Routing: `app/[lang]/layout.tsx` (sets `<html lang>`, `generateStaticParams → en, cs`), plus `proxy.ts` that redirects `/` and other un-prefixed paths to `/cs` or `/en` from the cookie, then Accept-Language (DOCUMENTED i18n guide). Every page becomes statically prerenderable, and the DB is hit at build or revalidate, not per request.

### Server/client split per route
| Route | Today | Target |
|---|---|---|
| layout + header | `Header` client (framer rotate, cookie toggle) | Server `SiteHeader` with `<Link>`s. `NavLink` is a tiny client leaf (`usePathname` → `aria-current`), or it is computed per page. Language switch is a plain `<Link>`. Mobile menu uses a native `popover` with no JS. |
| `/` | entire page client | Server page. One client leaf, `CopyButton` (≈20 lines). Portrait via server `next/image`. Entrance via CSS. |
| `/skills` | client grid with toggle state | Fully server, `<ul>` of labelled icons |
| `/experience` | client wrapper + client `Job` for fades | Fully server. `Job` becomes a server component, and `<ol>` holds `<li>`s directly (today `motion.div` sits between `ol` and `li`, `job.tsx:66-84`, which is invalid list markup). |
| `/projects` | server shell + client card (iframe scaler) | Fully server cards with static screenshots |
| `/projects/[slug]` | orphan | Either delete it, or keep it with `generateStaticParams` + `generateMetadata` and link cards to it (a natural place for a longer write-up and repo link). |

Net client JS: framer-motion, react-icons, cva, Radix Slot, and the page-level client trees are all removed.

### Dependencies
| Package | Actual usage | Action |
|---|---|---|
| `nodemon` | none | remove |
| `tsconfig-paths` | none | remove |
| `@radix-ui/react-scroll-area`, `-select`, `-tabs`, `-tooltip` | only their own dead shadcn files | remove (with the files) |
| `@radix-ui/react-slot`, `class-variance-authority` | `button.tsx` only, and Button is a pass-through | remove; use `<button>`/`<a>` with a `.btn` class |
| `tailwindcss-animate` | only `animate-in`/`out` in dead `select`/`tooltip` | remove (shadcn itself deprecated it for `tw-animate-css`, which is not needed here) |
| `react-icons` | 2 icons (`FaLinkedinIn`, `SiGithub`, `client.tsx:3-4`) | remove; inline 2 SVGs |
| `lucide-react` | Download, Phone, Mail, X, Menu, Database | keep (tree-shaken, server-renderable), or inline those 6 too |
| `devicon` | global icon-font CSS | keep the package only as an SVG source, or vendor the ~35 SVGs; drop the CSS import |
| `framer-motion` | entrance animations only | remove after the CSS migration |
| `clsx`, `tailwind-merge` | `cn()` in dead files; `twMerge` in `job`, `logo`, `nav` | optional; drop both if className overrides go away |
| add | `server-only`, `@prisma/adapter-pg`, `dotenv`, `tsx` (dev, seeds) | |

### Files to delete or merge
- Delete: `.eslintrc.json`, `components.json`, `tailwind.config.ts` (after `@theme`), `.idea/` (and add it to `.gitignore`), `components/ui/{LanguageProvider,lang,web,input,textarea,select,tabs,tooltip,scroll-area,button,clipboard}.tsx`, `public/images/{donkey_kong.png,picture_unedited.jpg}`, `app/*/client.tsx` (folded into pages).
- Merge: `project-section` + `projects-grid` + `project-card` + `project-stack-icons` into `components/project-card.tsx` + `components/tech-icon.tsx`. Fold `Header` + `nav` + `links` + `LinkComponent` + `logo` into `components/site-header.tsx`.
- Move: `app/db.ts` → `lib/db.ts`; `app/utils/getLang.ts` → `lib/i18n.ts`; the three seeders → one `data/seed.ts` (idempotent upserts by natural keys).
- Rewrite `README.md`: setup, env vars, `prisma migrate deploy`, `db seed`, and how to edit content.
- Optional schema cleanups (each is its own migration): add `Project`/`ProjectTranslation`/`ProjectTech` tables so projects live in the DB like other content; change `ExperienceTranslation.skills` from `String` to `Json`, or a child table; collapse per-language `PersonDetails` into one `Person` row plus a per-lang `cvUrl`.

### Tailwind v4 CSS-first (replaces `tailwind.config.ts`)
```css
@import "tailwindcss";
@theme {
  --breakpoint-lg: 60rem;            /* keep 960px; drop xs, rename xxl→2xl: 1500px */
  --breakpoint-2xl: 93.75rem;
  --font-mono: var(--font-mono-next), ui-monospace, monospace;
  --font-sans: var(--font-sans-next), system-ui, sans-serif;
  --color-bg: …; --color-surface: …; --color-text: …; --color-muted: …;
  --color-border: …; --color-border-strong: …; --color-accent: …; --color-accent-contrast: …;
}
@layer base {
  body { background: var(--color-bg); color: var(--color-text); }
  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation: none !important; transition: none !important; } }
}
```
For a light theme, override the same tokens under `@media (prefers-color-scheme: light)` or `[data-theme=light]`.

### Ordered, committable steps
1. **Baseline.** `npm ci && npm run build && npm run lint`. Take screenshots of each route at 375 px and 1440 px, in EN and CS.
2. **Dead code.** Delete the dead components/images, `.eslintrc.json`, `components.json`, and `.idea/`. Remove `nodemon`, `tsconfig-paths`, 4 Radix packages, and `tailwindcss-animate` from `tailwind.config.ts` plugins. Build. No visual change is expected.
3. **Hotfixes.** F2 (opacity utilities), F3 (body color), F4 (link names), F11 (lang guard), F13 (latin-ext font). Small and safe.
4. **Bump** `next`/`eslint-config-next` to 16.4.5, `react`/`react-dom`/types to 19.3.x, and `tailwindcss`/`@tailwindcss/postcss` to 4.3.5. Build and lint.
5. **Prisma 7.** Change the generator and output, add `prisma.config.ts`, the adapter, and dotenv. Update `db.ts` and seed imports. Run `prisma generate`. Smoke-test 3 routes against the real DB. Do this before 2026-11-19 if possible.
6. **Tailwind CSS-first.** Move tokens into `@theme`, delete `tailwind.config.ts` and the shadcn token blocks, and drop `xs:`. This is visual parity with the current palette.
7. **Content module.** Add `lib/content.ts` + `lib/i18n.ts` (dictionary JSON). Pages call it, and the scattered ternaries go away.
8. **`[lang]` routing.** Move pages under `app/[lang]`, add `proxy.ts`, and the language-switch `<Link>`. Keep a cookie only to remember the choice.
9. **Server-ify.** Remove the `client.tsx` files, replace framer-motion with CSS, and remove `framer-motion`, `react-icons`, `cva`, and Slot.
10. **Icons and images.** Add `TechIcon` SVGs and remove the devicon CSS import. Add real project screenshots and remove the iframes. Crop the portrait. Regenerate distinct CVs.
11. **Metadata/SEO.** `generateMetadata` per route, `alternates.languages`, `sitemap.ts`, `robots.ts`, `opengraph-image`, `not-found.tsx`.
12. **A11y pass.** F5–F9, F15–F17, F22, F24. Add a skip link, one `<main>`, and one h1 per page. Check with axe and keyboard only.
13. **Caching.** `cacheComponents: true, partialPrefetching: true`, with `'use cache'` + `cacheLife` inside `lib/content.ts`. Optionally add `ensureStatic = 'navigation'` on `[lang]/layout`.
14. **Optional data model.** Move projects into the DB, use `Json` for experience bullets, and add an idempotent seed.
15. **Redesign.** Apply one direction from section 4 by swapping the `@theme` tokens + fonts first, then the hero and cards.

---

## 4. Redesign directions
All ratios are computed (WCAG 2.x relative luminance). `border` is decorative (under 3:1 by design). `border-strong` is for input outlines and component boundaries, and it is ≥3:1. All fonts are on Google Fonts and loadable with `next/font/google`. **Use `subsets: ["latin","latin-ext"]` for Czech.** `next/font` fails the build on an unknown subset, which verifies support. Martian Mono latin-ext is confirmed. The rest are UNVERIFIED offline.

### A. Datasheet
**Mood:** the site reads like the first page of a chip datasheet, with the person as the part number.
| Token | Light (paper) | ratio | Dark (solder mask) | ratio |
|---|---|---|---|---|
| bg | `#F3F4F0` | | `#0F1D17` | |
| surface | `#FFFFFF` | | `#16291F` | |
| text | `#14171A` | 16.29 bg / 17.99 surf | `#E9EFE9` | 14.89 / 13.12 |
| muted | `#596067` | 5.77 / 6.38 | `#9DB2A6` | 7.74 / 6.82 |
| border | `#C5CBC4` | 1.50 (decorative) | `#2E4A3B` | 1.79 |
| border-strong | `#7A827B` | 3.58 | `#5F8572` | 4.21 |
| accent | `#0A6B47` (mask green) | 5.93 / 6.55 | `#D9B44A` (ENIG gold) | 8.75 / 7.71 |
| accent-contrast | `#FFFFFF` | 6.55 on accent | `#1A1405` | 9.23 on accent |

**Type:** Archivo (variable width axis: expanded for the name, condensed for table headers) + Red Hat Mono for pin names and values.
**Hero:** a large SVG IC package drawing. Pin 1 is marked. Left pins are low-level skills (C, C++, NASM, VHDL, Haskell), right pins are web (Next.js, TypeScript, Prisma). Each pin label links to `/skills#…`. The name sits in Archivo Expanded above the package. A "Features" list (the bio, as short factual bullets) and an "Ordering information" box (email, phone, CV per language) sit beside it.
**Project cards:** typeset as datasheet sections. Each has a block-diagram-like screenshot frame, a two-column "characteristics" table (Language / Libraries / Platform / Source), and a hairline rule between rows. Cards are not uniform: school projects show the table, and work projects show the client and role.
**Why not generic:** it is light-first and subject-specific; the vernacular comes from the hardware he studies. Avoid fake part numbers or sequence numbers. Use real names only.

### B. Scope
**Mood:** an oscilloscope screen: graticule grid, two channels, one trigger.
| Token | Dark only | ratio |
|---|---|---|
| bg | `#0E1420` (graphite blue screen) | |
| surface | `#151D2C` | |
| text | `#E6EBF2` | 15.38 bg / 14.09 surf |
| muted | `#8F9BAE` | 6.55 / 6.00 |
| border (graticule) | `#2A3650` | 1.53 (decorative) |
| border-strong | `#5D6E8C` | 3.58 |
| accent / CH1 (low-level) | `#F5D547` | 12.72 / 11.65 |
| accent-contrast | `#1A1600` | 12.51 on accent |
| CH2 (web) | `#4CC9E0` | 9.42 / 8.63 |

A light theme does not fit, because scope screens are emissive. For print, rely on a `@media print` black-on-white override.
**Type:** Azeret Mono for readouts, labels, and measurements. Instrument Sans for prose and headings.
**Hero:** a full-bleed graticule (CSS `background-image` grid, 10×8 divisions). One CH1 trace draws once on load: a digital signal whose high and low bits are the ASCII of "JZ" (`01001010 01011010`). This is the single orchestrated motion moment; with reduced motion it is static. A measurement panel at the right edge shows real facts as readouts: name, role, languages, and contact.
**Project cards:** each card is a "capture". A left edge strip is colored by channel: CH1 yellow for C/C++/Java, CH2 cyan for web. The screenshot sits in a mini graticule frame, and the stack line is the trigger caption. The channel color encodes the domain split that defines this person, so color carries information rather than decoration.
**Why not generic:** it is dark like today, but blue-graphite with two semantic channel colors instead of a single neon accent. It keeps the "hacker" continuity the owner likes without the acid-green-on-black default.

### C. Memory Map
**Mood:** evolves today's indigo/violet into a `hexdump`/linker-map page, with warm amber replacing green.
| Token | Dark | ratio | Light | ratio |
|---|---|---|---|---|
| bg | `#120B2E` | | `#F4F2FB` | |
| surface | `#1C1442` | | `#FFFFFF` | |
| text | `#EEE9FF` | 15.93 / 14.44 | `#1B1438` | 15.73 / 17.45 |
| muted | `#A79FCC` | 7.61 / 6.90 | `#5E5689` | 5.98 / 6.63 |
| border | `#3A2E72` | 1.63 | `#CFC8EA` | 1.45 |
| border-strong | `#7465C0` | 3.92 | `#7F74B0` | 3.77 |
| accent | `#FFB547` (amber) | 10.74 / 9.73 | `#8A4B00` | 6.14 / 6.80 |
| accent-contrast | `#1F1300` | 10.38 on accent | `#FFFFFF` | 6.80 on accent |

**Type:** Martian Mono only (variable width 75–112.5 and weight 100–800, latin-ext confirmed). Use condensed 800 for the name, normal 400 for body. One family whose width axis does the hierarchy work. If long Czech prose reads poorly in mono, add Atkinson Hyperlegible Next for paragraphs only.
**Hero:** the intro is a real `hexdump -C` layout: offsets, hex bytes, and an ASCII column in which the bio is legible. The name is set huge in condensed Martian Mono across the top. The accent marks only the cursor and the links. Nav items carry their section's offset, which doubles as an in-page anchor map.
**Project cards:** not a card grid. Projects are rows in an `objdump -h`-style section table (name, kind, stack, source). Each row expands in place (`<details>`) to show the screenshot and description. This is dense, keyboard-native, and needs zero JS.
**Why not generic:** it keeps brand continuity (the indigo gradient becomes a flat token), swaps neon green for warm amber, and uses a single-family typographic system. The table-as-portfolio layout avoids the SaaS card kit.

---

## Verification and gaps
- Contrast is computed by `/tmp/lp/scripts/contrast.py` and `pal.py` (WCAG relative luminance; Tailwind v4 OKLCH converted to sRGB).
- Version facts were read from primary pages: nextjs.org/blog, the version-16 upgrade guide, the i18n guide, prisma.io release-status and the v7 guide, the Tailwind upgrade guide, and shadcn's tailwind-v4 page. Tailwind 4.3.5 comes from releases.sh (secondary).
- UNVERIFIED (no install possible): the exact React 19.3 patch; the devicon CSS/font byte size; that `bg-opacity-*` renders opaque in the deployed build (from the docs, not observed); whether the third-party sites block framing; latin-ext coverage for Archivo, Red Hat Mono, Azeret Mono, Instrument Sans, and Atkinson Hyperlegible Next.
- UNKNOWN: production hosting, DB host and SSL mode (relevant to Prisma 7 `P1010`), and live DB contents (seeds may differ from production data).
