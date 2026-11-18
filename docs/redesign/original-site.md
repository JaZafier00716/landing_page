# Original site (commit 5a06379): what comes back, what doesn't

Read with `git show 5a06379:<path>`. Stack then: Next 16, React 19, Tailwind 4 (+ `tailwind.config.ts`), `framer-motion` ^12, `devicon` ^2.17 (icon font), `react-icons` ^5, JetBrains Mono everywhere, dark indigo gradient background, emerald accent. None of `devicon`, `framer-motion` or `react-icons` is in today's `package.json`.

## 1. The "one-line footer": it did not exist at 5a06379

- `git grep footer 5a06379` finds nothing. `docs/redesign/visual_audit.md` #20 and `audit.md` F25 both record "No footer at all".
- The first footer arrived in the rebuild `88dca4c` (`components/site-footer.tsx`): a two-column block with contacts, CV, language, "updated" and ©. It was never one line.
- The only one-line element in the original is the **1px rule under the header**, in `components/Header.tsx`:
  `<div className="h-[1px] w-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse">`. It was a pulsing gradient hairline. Jan may be remembering this, or the deployed site differed from the repo; **ask him**.
- **Recommendation:** build the one-line footer new (see `inspiration.md` adopt #7) as `email · LinkedIn · GitHub · CS/EN · theme · © 2026`, mono, muted, one hairline above. If Jan wants the header rule back, use a static `border-border` hairline: the infinite `animate-pulse` breaks DESIGN.md §7 ("no infinite animations").

## 2. Interactive tech icons

**Where**
- Skills page: `components/ui/SkillsGrid.tsx`, rendered by `app/skills/client.tsx` with data from `app/skills/skills.ts` and `data/databaseSeeders/seed-skills.ts` (`iconClass` per item; items without an icon showed `title`/`subTitle` as large text, e.g. VHDL, NASM).
- Project cards: `components/ui/project-stack-icons.tsx`, used by `components/ui/project-card.tsx`. Data comes from `app/projects/projects.ts` (`stack: {name, iconClass}[]`). There is a special case for `"lucide-database"`, which renders Lucide `Database`.

**Icon set:** Devicon **icon font**, imported globally in `app/layout.tsx` (`import "devicon/devicon.min.css"`) and used as `<i className="devicon-react-original">`. The classes used across the seeds and projects include `devicon-{nextjs-original-wordmark, react-original, tailwindcss-original, typescript-plain, css3-plain, html5-plain, javascript-plain, php-plain, mysql-plain-wordmark, prisma-original, c-plain, cplusplus-plain, java-plain, haskell-plain, archlinux-plain, debian-plain, fedora-plain, linuxmint-plain, ubuntu-plain, kalilinux-plain, sdl-plain, hibernate-plain, maven-plain-wordmark, nextjs-plain, sanity-plain, storybook-plain, vercel-original, github-original, linux-plain}`.

**Behaviour (SkillsGrid)**
- Each skill is a `<Button>` tile (100–160px square, `rounded-2xl`, 2px emerald border, `bg-gray-900`) with the glyph at 3–6rem.
- Hover: the glyph turns `text-emerald-400`.
- Click toggles the tile "active" (`activeIds` state). Active tiles turn the glyph `text-emerald-600` and show a floating name pill above the tile (`absolute -top-1/3 … rounded-full bg-gray-800`, opacity 0→1, 300ms).
- On load, tiles slide in from `translateX(-100%)` with a delay based on `item.id` (`0.2 + (id − 10·catId)/4` s).
- Project stack icons were static: a 2xl emerald row with `title` and `aria-label` = name, and no interaction.

**How to port (if wanted):** use inline SVG only, never the font (audit F14: the font CSS ships the whole set, reads as text to screen readers, fails forced-colors). Copy the needed SVGs from `devicon/icons/<name>/<name>-<variant>.svg` (devicon on npm/GitHub, MIT) into a server `TechIcon` component, monochrome via `fill="currentColor"`, sized in `em`. The one interaction worth keeping is **name-on-hover/focus** (a tooltip or visible label next to each icon in the stack line), not click-to-toggle. Use one icon set: DESIGN.md requires Lucide for UI and nothing else, so adding devicon brand marks needs Jan's approval and a DESIGN.md §5 note.

## 3. Hero motion (exact technique)

All in `app/client.tsx` and `components/ui/picture.tsx`, with `framer-motion` `motion.div` `initial`/`animate` (client component):
- `h1` title, `h3` subtitle (with the name in `text-emerald-400`) and `p` content each go from `{opacity: 0, translateX: "-100%"}` to `{opacity: 1, translateX: 0}`, `duration 0.5`, `ease "easeOut"`, at delays **0.2 / 0.8 / 1.4 s**.
- Phone, Mail, LinkedIn and GitHub round buttons: `{opacity: 0, rotateZ: 360}` → `{opacity: 1, rotateZ: 0}`, 0.5 s easeOut, delays **1.4 / 1.7 / 2.0 / 2.3 s**.
- CV link: `translateY: "200%"` → 0 at 2.3 s; its `Download` icon has an infinite `animate-bounce`.
- Portrait (`picture.tsx`): wrapper fades in at 1.0 s and the image at 1.4 s (`mix-blend-lighten`, radial white mask class `.radial` in `app/globals.css`). Around it is an SVG `motion.circle` (r=250, 4px `#059669` stroke) whose `strokeDasharray` cycles `["15 120 25", "16 25 92 72", "4 250 22 22"]` while `rotate: [120, 360]`, `duration: 20, repeat: Infinity, repeatType: "reverse"`. That is the "drawing ring" effect.
- The header's language button spins in the same way (`rotateZ 360→0`).

**What to restore:** at most one restrained entry. Use CSS `@starting-style` on the hero text block (`opacity 0; translateY(8px)` → none, 250ms `--ease-out`, ≤40ms stagger per line, total under 300ms) and remove it under reduced motion. The animated ring is the memorable part. A **static** dashed ring around the portrait (the same `stroke-dasharray` idea, accent colour token, no rotation) keeps the identity without breaking DESIGN.md §7 (no infinite animation, no load-time name animation). It conflicts with today's spec, so Jan has to decide.

## 4. Also worth keeping

- **Click-to-copy phone and email** (`app/client.tsx` `navigator.clipboard.writeText`). This already lives on as `copy-button.tsx`. Keep it.
- **Hover reveals the value** (phone and email pill above the icon button): the idea of showing the address on hover/focus is good. The current contact rows already show it in full.
- **Tech stack shown per project** (`project-stack-icons.tsx`): the recruiter sees the stack without reading. It lives on as the `Layers` stack line in `components/projects.tsx`.
- **"JZ" monogram** (`components/ui/logo.tsx`, "J" + accent "Z"): a usable favicon or OG mark, but not a header logo (the wordmark is better per Jakob's law).

## 5. Must NOT come back

- **Load sequence up to 2.3 s + `rotateZ 360` spins**: content is invisible on first paint (SSR `opacity: 0`), and it breaks DESIGN.md §7 and checklist §Motion.
- **Infinite motion** (`animate-pulse` rule, `animate-bounce` download icon, 20 s ring loop): distracting, and ignores reduced motion.
- **Devicon icon font + `react-icons` + Lucide mixed**: three icon sources; audit F14.
- **Full-screen "Zkopírováno" modal** (`components/ui/clipboard.tsx`): blocks the page, is Czech-only, and has to be dismissed. An inline `aria-live` "Copied" is better (already done).
- **Iframe live previews** in project cards (`project-card.tsx`, scaled 1600×900 `<iframe>`): heavy, may be blocked by the framed site, not keyboard-safe. Use screenshots.
- **Cookie language switch + `window.location.reload()`** (`components/Header.tsx`): replaced by `/[lang]` routes; reloading loses scroll and breaks links.
- **Skill tiles as the skills page**: a logo wall with no evidence. Skills belong in projects (checklist §Recruiter-first).
- **Indigo gradient background + JetBrains Mono for body text + `leading-loose`**: low contrast and reads as a code-themed template. The current Archivo/Red Hat Mono split is better.
