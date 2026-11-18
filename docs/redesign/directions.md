# Redesign directions: home page and global chrome

Two distinct directions for `/` plus header, footer and preferences. Both must pass `docs/ui-quality-checklist.md` (§Consistency, §Recruiter-first content) and use only facts from `data/seed.ts` and `lib/i18n.ts`. Anything else is marked **[placeholder]**. Where a direction breaks `DESIGN.md`, the needed spec change is named. Jan picks after seeing both at `/lab/a` and `/lab/b`.

## 0. Shared by both directions (fixed requirements)

**Header (1366).** `Jan Zámostný` (wordmark → home) | nav `Home Experience Projects Skills`, text only, current page = 600 weight + 2px accent underline (the `data-text` width reserve stays) | preferences trigger | CV slot. Nav icons go (inspiration "avoid #1"). **Header (375).** Wordmark | CV pill | menu button. Preferences become two rows inside the menu panel (theme, language), not a second popover.

**Preferences control.** One native `popover`. Trigger: `<button popovertarget="prefs">` that **shows the current state** (`EN` + sun/moon glyph, 44px, `aria-label="Preferences: language and theme"`), not a bare gear. That way a Czech recruiter still sees a language cue, and the control stays a utility outside `<nav>` (Josh W Comeau's split, inspiration #8). Panel: "Language: English / Čeština" as two links (`aria-current` on the active one, `lang`/`hrefLang` on the target, path kept) and "Theme" holding the existing `ThemeToggle` (unchanged client component). Why a popover and not the footer (inspiration #7): the fixed one-line footer has no room left, and Hick's law wants the header at name, 4 links and one CTA. The popover gives light dismiss, Esc and focus return with no JS. Position: `position-anchor` + `position-area: block-end span-inline-start` as an enhancement; fallback `position: fixed; top: var(--header-h); right: 1rem`. Entry `@starting-style { opacity:0; transform: scale(.95) }`, `transform-origin: top right`, 200ms `--ease-out`; exit 150ms with `transition-behavior: allow-discrete` on `display, overlay`.

**One CV download.** Home: the hero `Download CV` (with "PDF, n KB") is the only CV button until it scrolls under the header. Then the header slot shows a compact `CV` pill and the reverse happens on scroll up. Other pages: the header pill is always visible, including at 375 (`[CV] [☰]`). `cv-fab.tsx` and the floating button are deleted. The header slot is always in layout (no CLS). When undocked it is `visibility: hidden` (so not focusable), toggled with `transition-behavior: allow-discrete`. Two mechanisms, one per direction (either can be swapped into the other):
- **CSS flag (A, zero JS).** Hero CV wrapper: `view-timeline: --hero-cv; view-timeline-inset: var(--header-h) 0`. `html { timeline-scope: --hero-cv }`. `@property --cv-docked { syntax:"<integer>"; inherits:true; initial-value:0 }`. `body { animation: cv-flag linear both; animation-timeline: --hero-cv; animation-range: exit 50% exit 100% }`, plus keyframes that set `--cv-docked:1` from 0% to 100%, and after the range the fill holds it. Elements then react with `@container style(--cv-docked: 1)`: the hero button goes `opacity 0; translate(12px,-8px) scale(.9)` toward the header corner, and the pill goes from `opacity 0; translateY(6px) scale(.9); blur(2px)` to rest. Both are **time-based transitions** (300ms `--ease-out`), not scroll-scrubbed, because the scroll only flips the flag. Reduced motion: opacity only, 150ms. Unsupported browsers: the flag never sets, so home shows the hero CV only (never two). The CV is still on `/experience`.
- **Shared element (B, true FLIP).** The same flag source, but a View Transition does the swap: `document.startViewTransition(() => root.toggleAttribute('data-cv-docked'))`, with `view-transition-name: cv` on whichever of the two is visible, so the browser morphs position and size. `::view-transition-group(cv) { animation-duration: 300ms; animation-timing-function: var(--ease-out) }`. Root and header get `view-transition-name: none` during this swap so the scrolling page isn't snapshotted. Reduced motion: group animation none, old/new crossfade 150ms. This needs JS (an IntersectionObserver on the hero CV); see §3. Risk to test: scrolling during the 300ms snapshot.

**Contact ("Get in touch").** Shown once, on home only. Form: name, email, message (`<label>`s, `autocomplete="name|email"`, `required`, `maxlength`, hidden honeypot field). It posts to a **server action** (a progressive-enhancement `<form action>`, no client component). Success is a server redirect to `?sent=1#contact`, which renders an inline confirmation (`role="status"`). Next to the form: email with the existing `CopyButton`, LinkedIn and GitHub. Delivery: email only (provider chosen in Phase 2 with stackfit; recipient from an env var), no database storage, per Jan's brief. The lab action only validates and redirects.

**Footer.** One line, mono `text-meta`, muted, hairline above: `© 2026 Jan Zámostný · Built with Next.js, source on GitHub` ("source on GitHub" links to the repo **[placeholder: confirm the site repo is public; private repos are never linked]**). No contacts and no language link. The copy reaches the contact list through the home contact section and `/experience` → "Get in touch".

**Ambient-motion rules (both).** transform/opacity only, `linear` (it is constant motion). Off-screen pause: the same scroll-flag trick (`@property --hero-on`, view timeline on the hero, `@container style(--hero-on: 0) { animation-play-state: paused }`). Tab hidden: a 1-line inline script next to the existing `themeScript` toggles `html[data-hidden]` on `visibilitychange`, and CSS pauses every `.ambient`. That is not a client component. `prefers-reduced-motion: reduce` turns them off (the existing global rule already kills `animation`). **DESIGN.md §7 change needed:** "no infinite animations" becomes "max 3 ambient loops, rules above".

**Tech icons.** Devicon SVGs (MIT), copied as inline paths into `components/tech-icon.tsx` (server), monochrome `fill="currentColor"`, sized in `em`, `aria-hidden` + visible or sr-only name. Set limited to stacks in seed: C, C++, OpenGL, Java, Python, Pytest, Next.js, TypeScript, Tailwind CSS, CMake, Linux. **DESIGN.md §5 change:** "Lucide only" + "devicon marks for tech names only".

**Facts used for the hero** (seed/i18n): QA Automation Engineer (internship) at FUTTEC a.s. since Sep 2026, remote ("Working remotely…"); Bachelor's in Computer Science at VŠB – Technical University of Ostrava; Ostrava; "I write software from C and OpenGL up to Next.js."; earlier Frontend Web Developer at SHOWMORE (Jul–Oct 2024) and Blackfish (contract, Jun–Dec 2023). Looking for: **[Looking for: …]**.

---

## 1. Direction A: "Colophon" (editorial, typographic, calm)

**Rationale**
1. The sentence is the hero: name small, and one large sentence answers role, employer, school, city and stack in about 5 s (Brittany Chiang, Rauno, leerob).
2. "What he wants" sits directly under it with a live status dot, the strongest recruiter hook found (Delba "I'm looking for…", Emil "Today").
3. Restraint reads as taste: one family, two weights, no icons on headings, no cards except where content is a case study (Paco, Refactoring UI).
4. Proof comes before the document: experience rows, then projects as written case studies with real screenshots, then contact (Brittany's order, Krug).
5. Only two quiet loops (status dot, stack marquee). Nothing else moves unless the user acts (Emil, checklist §Motion).

**375**
```
┌───────────────────────────────┐
│Jan Zámostný          [CV] [☰] │ ← CV slot hidden while hero CV visible
├───────────────────────────────┤
│Jan Zámostný                   │ lead 600
│QA automation intern at FUTTEC │ h1-size sentence, 400,
│and computer science student   │ balance, ~6 lines
│at VŠB-TUO in Ostrava. I write │
│software from C and OpenGL up  │
│to Next.js.                    │
│● [Looking for: …]             │ body, dot = accent
│[↓ Download CV ] PDF, n KB     │ full width
│‹ C  C++  OpenGL  Java  Py… ›  │ marquee, masked edges
├ Experience ── peeks ──────────┤
```
**1366**
```
┌──────────────────────────────────────────────────────────────────────┐
│Jan Zámostný     Home  Experience  Projects  Skills        [EN ☾] [  ] │
├──────────────────────────────────────────────────────────────────────┤
│ Jan Zámostný                                          ┌───────────┐  │
│ QA automation intern at FUTTEC and computer           │ portrait  │  │
│ science student at VŠB-TUO in Ostrava. I write        │ 1:1 ≤240  │  │
│ software from C and OpenGL up to Next.js.             └───────────┘  │
│ ● [Looking for: …]          [↓ Download CV] PDF, n KB                │
│ ‹fade  C  C++  OpenGL  Java  Python  Pytest  Next.js  TS  CMake fade›│
│ Experience                                                           │
│ Sep 2026–present  QA Automation Engineer (internship), FUTTEC a.s.   │
│                   Working remotely on test automation using Pytest…  │
│ Jul–Oct 2024      Frontend Web Developer, SHOWMORE s.r.o.            │
│ Jun–Dec 2023      Frontend Web Developer (contract), Blackfish       │
│ All experience                                                       │
│ Selected work  (4 case studies, alternating image left/right)        │
│ Get in touch   [name][email][message][Send]   email ⧉ · LinkedIn ·  │
│ © 2026 Jan Zámostný · Built with Next.js, source on GitHub           │
└──────────────────────────────────────────────────────────────────────┘
```
**Type.** Archivo only on the page (mono only for dates and "PDF, n KB", tabular). Weights 400/600, so 800 is dropped. Hero sentence at `text-h1` → new token `--text-statement: clamp(1.728rem, 1.2rem + 2.2vw, 3rem)`, weight 400, `font-stretch: 100%`, line-height 1.15, max 22ch per line on desktop, balance. Name `text-lead` 600. h2 at 100% width, 600. Uppercase eyebrow removed. **DESIGN.md §3 change:** the name is no longer the loud element; the statement is.
**Color/surfaces.** Existing tokens unchanged. Accent only on: CV button, status dot, link hover, current nav. Surfaces flat (`bg`); the only raised surface is the card hover (`surface` + `shadow-1` light / `surface` dark).
**Ambient (2).** (1) Status dot: `::after` ring `scale(1)→scale(2.4)`, `opacity .5→0`, 2.4s `--ease-out` infinite; the dot itself is static. (2) Stack marquee: `<ul>` of icon + name, duplicated once (`aria-hidden` copy), track `translateX(0 → -50%)` 60s linear infinite, `mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`, paused on `:hover`/`:focus-within`. Reduced motion: static wrapped row, no mask.
**Featured projects (case-study cards).** Full-width `<article>` cards, 12-col subgrid, screenshot 5 cols (16:10, `radius-sm`, inner outline) alternating sides. Text 7 cols with labelled rows from seed:
- Catering information system. *Problem:* information system for catering staff. *Decision:* "hand-written JDBC data mappers, without frameworks or an ORM, as the assignment requires". *Stack:* Java 21, JavaFX, Oracle SQL. *Result/next:* [placeholder].
- Modal text editor. *Decision:* key bindings in a motions file, screen drawn with ANSI escape sequences. *Quality:* CMake with optional AddressSanitizer and a Valgrind target. *Result/next:* [placeholder].
- Tetris (C, SDL2: game loop, rendering, collision) and ZPG (C++23, GLSL, GLFW/GLAD/GLM; **no screenshot in seed: [placeholder image]**; source private, so no link).
Card = one `<Link>` (stretched) to the detail page. Labelled `Source` links sit above the stretch (z-index) so they stay separate targets. Padding `p-6` at rest on a transparent bg with a transparent 1px border. Hover (in `hover:hover`): `bg-surface` + `border-border`, title underline, arrow `translateX(4px)`. The same hover applies to experience rows (`px-4 py-4` at rest). Text links use underline only.
**Experience preview.** `<ol>` of 3 rows: mono date | "Role, Company" 600 | first seed bullet (muted, `line-clamp-1`). Row = link to `/experience#slug`.
**Contact.** Section h2 "Get in touch"; form left (7 cols), email + copy, LinkedIn, GitHub right (5 cols). One column at 375.
**Drops.** 800-weight expanded name, uppercase eyebrow, every heading and nav icon, `Layers` stack-line icon, the second CV (FAB) and header CV at top of home, contacts in the footer, footer language link and "Last updated", hero "Contact" secondary button (the form is one scroll away; the nav covers it).

---

## 2. Direction B: "Bench" (technical, engineered, richer motion)

**Rationale**
1. The hero is a spec readout: key/value rows (Now, Stack, Based in, Looking for) let a recruiter scan facts instead of reading prose. This is the "Datasheet" idea done honestly (Romain's index table, Tania's timeline).
2. A slowly drifting dot grid behind the hero signals "engineer who builds graphics and systems" without a gimmick. It doesn't track the cursor and there's no WebGL (inspiration "avoid #3").
3. Projects look like an engineering log: a 2×2 grid of cards with screenshot, stack chips as devicon marks, and Decision/Result rows. The stack is visible without reading (original-site keepers §4).
4. The CV truly travels: a View Transition morphs the hero button into the header pill, which shows care at the detail level (Rauno, Emil).
5. Three ambient loops (grid drift, marquee, status dot), all paused off-screen and gone under reduced motion. The motion is rich but cheap and never blocks content.

**375**
```
┌───────────────────────────────┐
│Jan Zámostný          [CV] [☰] │
├───────────────────────────────┤
│░·  ·  ·  ·  ·  ·  ·  ·  ·  ·░│ dot grid, radial mask
│ Jan Zámostný                  │ h1 Archivo 125% 600
│ Software engineer in Ostrava  │ [placeholder: title wording]
│ ┌ readout ──────────────────┐ │ surface panel, mono
│ │now   ● QA Automation Eng. │ │
│ │      (internship), FUTTEC │ │
│ │study CS, VŠB-TUO          │ │
│ │stack C C++ OpenGL Java Py │ │
│ │want  [Looking for: …]     │ │
│ └───────────────────────────┘ │
│ [↓ Download CV]  PDF, n KB    │
│ ‹ marquee ›                   │
```
**1366**
```
┌──────────────────────────────────────────────────────────────────────┐
│Jan Zámostný     Home  Experience  Projects  Skills        [EN ☾] [  ] │
├──────────────────────────────────────────────────────────────────────┤
│ · · · · · · · · · · · · · dot grid (cols 1–12, masked) · · · · · · · │
│ Jan Zámostný                       ┌ readout (5 cols) ─────────────┐ │
│ I write software from C and        │ now    ● QA Automation Engineer│ │
│ OpenGL up to Next.js.              │          (internship), FUTTEC, │ │
│ [↓ Download CV] PDF, n KB          │          remote, since Sep 2026│ │
│ [portrait 96px inline w/ name]     │ study  BSc CS, VŠB-TUO Ostrava │ │
│                                    │ before Frontend, SHOWMORE ’24, │ │
│                                    │        Blackfish ’23           │ │
│                                    │ want   [Looking for: …]        │ │
│                                    └────────────────────────────────┘ │
│ ‹fade  [C] [C++] [OpenGL] [Java] [Python] [Pytest] [Next.js]  fade›  │
│ Work log           ┌card────────────┐ ┌card────────────┐             │
│                    │ 16:10 shot     │ │ 16:10 shot     │             │
│                    │ Catering IS    │ │ Modal editor   │             │
│                    │ Decision/Result│ │ Decision/Result│             │
│                    └────────────────┘ └────────────────┘  (+2 more)  │
│ Experience  timeline: 2026 ─● FUTTEC  2024 ─● SHOWMORE  2023 ─● Blackf│
│ Get in touch  [form 7 cols]  [email ⧉ / LinkedIn / GitHub 5 cols]    │
│ © 2026 Jan Zámostný · Built with Next.js, source on GitHub           │
└──────────────────────────────────────────────────────────────────────┘
```
**Type.** Archivo 600 at `font-stretch:125%` for the name (`text-h1` size, not display) and h2s. Red Hat Mono for the readout (keys `muted`, values `text`), dates and chips. Weights 400/600. Section titles are plain words, no numbering (projects aren't a sequence; the timeline is, so only it gets years).
**Color/surfaces.** Existing tokens plus one derived token: `--color-grid: color-mix(in oklch, var(--color-text) 9%, transparent)` (dots, no new hue). Readout and cards are level-1 panels: `surface`, 1px `border`, `radius-sm`, light `shadow-1`, dark lighter surface. Dark mode is the showcase (gold accent on solder-mask green), but the default still follows the OS.
**Ambient (3).** (1) Dot grid: hero `::before` sized `calc(100% + 24px)`, `background: radial-gradient(var(--color-grid) 1px, transparent 1.5px) 0 0/24px 24px`, animated `translate(0,0) → translate(-24px,-24px)` 12s linear infinite (seamless, one cell), `mask-image: radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)`. (2) Marquee: same technique as A, icons as 1px-bordered chips, 45s. (3) Status dot on the "now" row, same as A. All three use `.ambient` and are off-screen/hidden-tab paused (§0).
**Featured projects.** 2×2 grid (1 col at 375), `subgrid` rows so title / summary / Decision / stack align across cards. **Proposed token** `--radius-md: 8px` for cards. The screenshot is full-bleed at the card top, clipped by the card (`overflow: clip`, so the corners stay concentric), and the text below has `p-5` at rest. Rows: summary (seed, `line-clamp-2`), *Decision* (seed facts as in A), *Result* **[placeholder]**, stack as devicon chips, `Source` link where public. Hover = the same container language as A (`surface-2` + `border-border-strong` + arrow nudge). Never scale or lift, so one hover language holds.
**Experience preview.** Horizontal year timeline on desktop (a sequence, so numbering is justified): hairline axis, three nodes (FUTTEC 2026, SHOWMORE 2024, Blackfish 2023), each a padded clickable container with role + company. At 375 it becomes a vertical list with the same nodes.
**Contact.** As §0, inside a panel matching the readout. Inputs `surface`, `border-strong`, focus ring accent.
**Drops.** Everything A drops, plus: the hero statement paragraph (replaced by the readout), the large portrait (an inline 96px squircle next to the name), and the `Characteristics` table on home.

---

## 3. Client-component budget

- **A:** no new client component. CSS flag morph, native `popover`, the existing `ThemeToggle` and `CopyButton`, a server-action form. Mobile menu in the lab: `<dialog>` opened with invoker commands (`<button commandfor="menu" command="show-modal">`), which gives a native focus trap, Esc and focus return. In production it stays in `site-nav.tsx`.
- **B:** needs JS only for the true shared-element morph (IntersectionObserver + `startViewTransition`). Lab: shows A's CSS flag swap instead, so no fifth client component exists even temporarily (CLAUDE.md). Production: fold that logic into the existing `site-nav.tsx` (already client and already owns the header CV slot), so the count stays at 4. Otherwise B falls back to A's CSS flag.

## 4. Implementation notes for /lab

- Routes `app/lab/a/page.tsx` and `app/lab/b/page.tsx`, EN only, `export const metadata = { robots: { index: false, follow: false } }`. They aren't listed in `app/sitemap.ts`.
- `proxy.ts` would redirect `/lab/*` to `/en/lab/*`. Add `lab` to the matcher's negative lookahead: `(?!_next|_vercel|api|lab|…)`. That's the only edit to an existing file.
- `app/lab/layout.tsx`: its own root layout (`<html lang="en">`, fonts, `globals.css`, the same `themeScript` + `visibilitychange` one-liner, skip link). This works because there's no `app/layout.tsx`. It renders neither `SiteHeader`/`SiteFooter` nor `CvFab`, so the existing pages stay untouched.
- Data via `lib/content.ts` (`getPerson("en")`, `getProjects("en")`, experience getter). No direct `lib/db.ts`. Strings live inline in the lab files as EN constants. Before adoption they move to `lib/i18n.ts` with Czech for Jan to proofread.
- Files to create:
  - `app/lab/lab.css`: scroll flags (`@property --cv-docked/--hero-on`, `timeline-scope`), `.ambient` pause rules, marquee, dot grid, popover, card hover. Imported only by the lab layout.
  - `app/lab/components/lab-header.tsx` (server: wordmark, text nav, prefs popover, CV slot, menu dialog), `prefs-popover.tsx` (server, embeds `ThemeToggle`), `lab-footer.tsx`.
  - `app/lab/components/tech-icon.tsx` + `tech-marquee.tsx` (server, devicon paths), `status-dot.tsx`.
  - `app/lab/components/case-card.tsx` (variant `"a" | "b"`), `experience-preview.tsx`, `contact-form.tsx` + `app/lab/actions.ts` (server action: validate, honeypot, `redirect("?sent=1#contact")`).
  - `app/lab/a/page.tsx`, `app/lab/b/page.tsx`.
- Reused unchanged: `ThemeToggle`, `CopyButton`, `CvButton` (`cvHref`, `cvSizeKb`), `lib/content.ts`, `formatPeriod`.
- Verify at 320/375/1024/1366, both themes, reduced motion, keyboard only, JS disabled (A must fully work; B falls back to the CSS flag), and in Firefox/Safari for scroll-driven animation and style-query support. Run `npm run lint` and `npm run build`.
- Open for Jan: [Looking for: …]; B's title line; project results/next steps; a ZPG screenshot; (the site repo is public: JaZafier00716/landing_page); the DESIGN.md §3/§5/§7 changes listed above.
