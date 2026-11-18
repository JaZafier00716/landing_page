# DESIGN.md — Jan Zámostný portfolio ("Bench", UX pass 3)

Binding spec for every page (home, experience, projects, project detail, skills, 404), header and footer, in `en` and `cs` and in both themes. Stack: Next 16, React 19, Tailwind 4 (CSS-first), routes under `app/[lang]/`. Also binding: `docs/ui-quality-checklist.md` (cited as §Section) and `CLAUDE.md`. The visual reference is `/lab/b` (`app/lab/b`, `app/lab/components`, `app/lab/lab.css`), and the rationale is `docs/redesign/directions.md` §0 and §2. Where the lab and this doc differ, this doc wins.
Not in scope: chip/IC imagery, fake part numbers, skill bars or levels, icon fonts, motion libraries, iframes, flags, WebGL, cursor-tracking effects.

## 1. Principles
1. **A spec readout, not a costume.** Facts are shown as key/value rows (now, study, based, stack, before, want), as chips and as a timeline. Structure carries information; there are no decorative icons on headings or in the nav.
2. **Recruiter first** (§Recruiter-first content). At 375×812, within 10 s and above the fold: name, role, current position, location, stack, what Jan is looking for, and Download CV. Projects read as case studies (Decision, Result), and skills are shown through projects.
3. **One of everything.** One CV download visible at a time, one contact block (home only), one hover language for text links and one for containers (§5.2). Each piece of content appears once per page.
4. **Rich but cheap motion.** At most three ambient loops, all on home: the backdrop grid drift (the grid itself is on every page, static off home), the status dot and the marquee. They use transform/opacity only, pause off-screen, in hidden tabs and on request, and are off under reduced motion. Everything else moves only when the user acts.
5. **Content works with no JS and no animation.** Server components by default. The client components are `site-nav.tsx`, `theme-toggle.tsx`, `lang-link.tsx`, `copy-button.tsx` and `contact-form.tsx` (§5.9).

## 2. Color (OKLCH)
The tokens in `app/globals.css` are unchanged: light "paper" ramp h155 and dark "solder mask" ramp h162, with semantic tokens only in components (never ramp steps or literals) and `@theme` (not `inline`), so dark overrides flip the utilities. Light is the default; dark applies when the OS prefers it unless the user forced a theme (`data-theme` on `<html>`, set from `localStorage` by the inline head script before paint). Gradients interpolate `in oklch`. **No new hues.** Pass 3 adds three derived values and one radius:

```css
:root {
  --color-grid: color-mix(in oklch, var(--color-text) 9%, transparent); /* hero dots */
  --hover-mix: 6%;                       /* container hover tint, light */
  --underline-offset: 0.3em;             /* clears g/y/p in Archivo and Red Hat Mono */
  --underline-thickness: 1px;
  --underline-thickness-hover: 2px;
}
/* in both dark blocks (OS-dark and [data-theme=dark]), kept in sync: */
  --hover-mix: 5%;                       /* dark: 6% drops muted below Lc 59 on panels */
@theme {
  --radius-md: 8px;                      /* replaces --radius-sm (4px) */
}
```
Container hover background: `color-mix(in oklch, var(--color-text) var(--hover-mix), var(--box-bg, transparent))`. With `--box-bg: transparent` (rows) it is a translucent tint over anything; with `--box-bg: var(--color-surface)` (panels) it is a solid one. One formula gives one visible step on `bg` and on `surface` in both themes. A surface-2 hover was rejected because light `surface-2` = `surface`, so panel hovers would be invisible in light.

**Theme plumbing** (unchanged): `color-scheme` per theme; `::selection` uses `selection` + `text`; `accent-color` and `caret-color` are accent; `viewport.themeColor` is light `#f1f4f2` and dark `#101d16`, and a forced theme rewrites both metas.

**Elevation.** Level 0 is the page (`bg`). Level 1 panels (readout, project cards, timeline nodes, contact panel, mobile menu) use `surface` + 1px `border` + `radius-md`, with `shadow-1` in light; dark has no shadow (lighter surface). Level 2 (preferences popover, skip link) uses `surface-2` + `shadow-2` in light; dark uses `surface-2` with no shadow. Structure (dividers, table rules, header bottom, timeline axis) stays as hairlines, never shadows. Images get an inner outline: `outline: 1px solid var(--color-image-outline); outline-offset: -1px`, with the same radius as the image.

**Contrast.** Values are computed by script: OKLCH→sRGB, WCAG 2.x ratio, APCA 0.0.98G-4g Lc, alpha composited over the surface. The script reproduces the existing rows exactly (text on bg 16.18 / Lc 97.8 light, 14.88 / −95.0 dark).

| Pair | Light WCAG / Lc | Dark WCAG / Lc |
|---|---|---|
| text on bg / surface / press (dark: s2 / s3) | 16.18 / 97.8 · 17.63 / 103.7 · 14.81 / 92.0 | 14.88 / −95.0 · 11.52 / −91.5 · 9.90 / −88.7 |
| muted on bg / surface / press (dark: s1 / s2) | 5.75 / 74.7 · 6.26 / 80.6 · 5.26 / 68.9 | 8.77 / −62.8 · 7.74 / −61.2 · 6.79 / −59.3 |
| accent on bg / surface (links, focus ring, status dot) | 5.91 / 75.0 · 6.45 / 80.9 | 8.74 / −62.7 · 7.71 / −61.2 |
| accent-contrast on accent / hover / active | 6.45 · 8.18 · 10.19 | 9.23 · 10.95 · 12.37 |
| border-strong (composited) on bg / surface | 3.87 · 3.96 | 3.99 · 3.82 |
| **new** hover tint vs its base (bg · surface) | 1.13 · 1.13 (6%) | 1.13 · 1.14 (5%); old row step was 1.13 |
| **new** text on hovered row · panel | 14.36 / 90.0 · 15.63 / 95.5 | 13.19 / −93.5 · 11.48 / −91.4 |
| **new** muted on hovered row · panel | 5.10 / 67.0 · 5.55 / 72.4 | 7.77 / −61.3 · 6.77 / −59.2 ¹ |
| **new** accent on hovered panel | 5.71 / 72.7 | 6.75 / −59.2 ¹ |
| **new** grid dot vs bg (decorative, exempt) | 1.20 | 1.26 |
| **new** text · muted over a grid dot (worst pixel) | 13.50 / 86.2 · 4.79 / 63.2 | 11.79 / −91.9 · 6.95 / −59.7 |
| border-strong on dark surface-2 (chips on hovered panels) | — | 3.60 |

¹ This matches the dark muted-on-surface-2 value that pass 2 already accepted (−59.3). It is transient (hover only) and WCAG stays ≥ 6.7:1.

Rules: body text uses `text`. `muted` is for metadata only (readout keys, dates, sizes, summaries), never on `press` in light. `border` is never the only cue for something the user must see; use `border-strong`. Accent covers about 10% of a screen: the CV button/pill, the current nav underline, the status dot, the current-role timeline dot, link hover and the focus ring. There are no semantic colors: errors use text, an icon and `aria-invalid`, never red.

## 3. Typography
Fonts come from `next/font/google` (`app/fonts.ts`): Archivo (variable wght + `wdth`) and Red Hat Mono, both `latin` + `latin-ext`. **Weights 400 and 600 only** (800 is dropped). Mono is 400. Root: `antialiased`, `text-size-adjust: 100%`.

| Role | Token | Family / width | Weight | Wrap |
|---|---|---|---|---|
| Name (h1 on `/`), inner h1 | `text-h1` | Archivo `font-stretch:125%` | 600 | balance |
| h2 (section titles, plain words) | `text-h2` | Archivo 125% | 600 | balance |
| h3, card titles, timeline roles | `text-lead` (cards/nodes `text-body`) | Archivo 100% | 600 | balance |
| Hero statement | `text-lead` | Archivo 100% | 400, `max-width: 28ch` | balance |
| Body, UI, buttons | `text-body` | Archivo 100% | 400 (strong/buttons/current nav 600) | pretty |
| Readout, chips, dates, labels, sizes, footer | `text-meta` | Red Hat Mono | 400 (keys `muted`, values `text`) | pretty |

- `--text-display`, the `.eyebrow` class and all uppercase text are removed. Readout keys are lowercase words, not labels in caps. Section titles carry no numbering; only the timeline shows years, because it is a sequence.
- No off-scale sizes, no `px` line-heights, letter-spacing in `em` only. Prose `max-width: 65ch`. The name must not clip at 320 px (`overflow-wrap: normal`; below `sm` drop to `font-stretch: 112.5%` if needed).
- **Small caps:** not used (the served fonts have no `smcp`).
- **Numbers:** `.tabular` on dates, ranges, years, sizes and phone numbers. `sub, sup { line-height: 0 }`.
- **Underlines (links only, never emphasis), §Typography details:** `text-decoration-line: underline; text-underline-offset: var(--underline-offset); text-decoration-thickness: var(--underline-thickness); text-decoration-skip-ink: none`. Hover (inside `@media (hover:hover)`): thickness `var(--underline-thickness-hover)` + `color: var(--color-accent)`. The offset is measured from the baseline and the thickness grows downward, so descenders are never cut, at rest or on hover. Verify with "g y p" links at `text-meta` (13.3 px) and `text-body` (17 px) in both fonts. The current nav item uses `underline-offset: 0.5em` with 2 px accent.
- **Buttons, chips, the CV pill:** `text-box: trim-both cap alphabetic` as an enhancement; padding must look centred without it.
- `hyphens: auto` only in narrow columns ("Where used", readout values below `sm`), never in headings.
- `translate="no"` on "Jan Zámostný", project names, tech names (chips, marquee, readout `stack`), email and URLs.
- **Language-aware text** (§Language-aware typography): en “ ” ’; cs „ “ ’; `…`. Ranges are en `2023–2024` / `Jun–Oct 2024` and cs `2023 – 2024` / `čvn – říj 2024`. Dates via `Intl`. All cs prose goes through `nbsp(text, lang)` (`lib/typography.ts`). **Every new string in this doc needs a cs version in `lib/i18n.ts` or `data/seed.ts`, flagged for Jan's proofreading.**

## 4. Spacing, grid, shape
- **Spacing:** 4 px base (Tailwind `--spacing: 0.25rem`), steps 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20 only. Space inside a group is smaller than space between groups. Section rhythm `.section { padding-block: clamp(3rem, 2.2174rem + 3.4783vw, 5rem) }` (48→80 px).
- **Proximity levels.** Each level is one scale step, about 1.5–2× the level below it. Measure text to text: between two body-text blocks the line-height already adds about 7 px, so a box gap of `3` (12 px) reads as about 19 px, which is L2.

  | Level | Step | rem / class | What sits at this level |
  |---|---|---|---|
  | **L0 bound pair** | 1 | 0.25rem · `gap-1` `pt-1` `mb-1` `space-y-1` | label → input, field → its error, role → date → company (experience header), bullet → bullet, card title → summary, Decision → Result |
  | **L1 inside an element** | 2 | 0.5rem · `gap-2` | icon ↔ label (chips use 0.4em), chip ↔ chip, title line ↔ status line, button ↔ its note, CV button ↔ "PDF, n KB" (`gap-2`, `sm:gap-3`) |
  | **L2 between items / blocks** | 3–4 | 0.75rem between body-text blocks, 1rem otherwise · `gap-3` / `gap-4` | form field ↔ field, card groups (title+summary · Decision+Result · stack · links), blocks inside an experience entry (header · bullets · stack · related), hero left-column blocks (`gap-4`, `lg:gap-5`), pref rows and readout rows (min-height 48 px or `py-2`, plus a hairline) |
  | **L3 component edge / between components** | 6 | 1.5rem · `p-6` `gap-6` `mb-6` | card ↔ card, h2 → its content (`mb-6`; `mb-4` only when an intro paragraph follows), panel padding (contact `p-6`; cards and nodes `p-5`, because their borders separate them), footer `py-6`, entry ↔ entry on /experience (`py-6` each side, 48 px between entries), project detail blocks (`mt-8`) |
  | **L4 between subsections** | 12 / 16 | 3rem · `mt-12 lg:mt-16` | h1 intro → first h2 section, h2 ↔ h2 on inner pages (Work/Education/Courses, Work/School projects, skill groups, the project detail "About"), last block → closing link (`mt-12`) |
  | **L5 sections and page edges** | `.section` / 10+10 | `.section` (3rem → 5rem); home sections `py-10` (2.5rem + 2.5rem = 80 px) | header → h1, last content → footer, home section ↔ home section, hero → first section (`pb-10`), contact → footer (`container-page pb-10`) |

  Headings: the space above a heading is at least 2× the space below it (h2 = L4 or L5 above, L3 below; h3 in an entry = L3 above, L0 below). Button groups: the gap inside the group is one level below the space around it. Forms: label → input (L0) < field → field (L2) < form → panel edge (L3).
- **Container:** `.container-page` stays the same: max 72rem, gutters 1rem (+ safe area), 1.5rem from `sm`, 2rem from `lg`. Detail-page content max 64rem.
- **Grid:** 4 columns below `lg`, 12 from `lg`, `gap-x-6` (hero `gap-x-8`). Every element aligns to a column edge, a baseline or its optical centre.
- **Corners:** `radius-xs` (2 px) for buttons, the CV pill, chips, inputs and focus outlines. `radius-md` (8 px) for level-1/2 panels, cards, the popover and standalone images (project detail). Header, tables, rows inside panels and the full-width menu use `0`. Nested radii are concentric: a card's full-bleed screenshot is clipped by the card (`overflow: clip`), so its top corners follow 8 px; children inside padded panels use `radius-xs`. A child is never rounder than its parent, and there are no cards inside cards.
- **Portrait:** a small squircle beside the name, 4rem below `sm` and 6rem from `sm`. `aspect-ratio: 1; border-radius: 28%`, plus `@supports (corner-shape: squircle) { corner-shape: squircle; border-radius: 40% }`. `object-fit: cover; object-position: 50% 30%`, on the `--color-tile` background, with the inner outline. Source `public/images/portrait-face.webp`, `alt=""` (the name is adjacent), `sizes="96px"`, explicit dimensions, `loading="eager"`.
- **Layout safety:** `scrollbar-gutter: stable`; `scroll-padding-top: calc(var(--header-h) + env(safe-area-inset-top) + 1rem)` with `--header-h` 3.5rem / 4rem from `lg`. The bottom scroll padding for the FAB is removed. Use `svh` for hero heights and `dvh` for overlays, never `vh`. Use container queries for components that appear at several widths (case card, contact panel).

## 5. Components

### 5.1 Icons
Two sets, two jobs. Never mix them on one element.
- **lucide-react: UI glyphs only.** `Download` (CV), `Menu`·`X`, `Copy`·`Check`, `Sun`·`Moon` (theme state), `Pause`·`Play` (motion control), `ArrowRight` (card/node affordance), `ArrowLeft` (back), `ArrowUpRight` (external link, with sr-only "opens in new tab"), and `Mail` / `UserRound` / `GitBranch` as row markers in the contact list. `stroke-width` is 1.5 beside 400 text and 2 beside 600 text. Size in `em` with `flex: none`.
- **Removed:** every nav icon (`House`, `Briefcase`, `FolderGit2`, `ListChecks`), every heading icon (section, experience groups, project groups, skill groups), `Layers` and `Globe`. The research found that these read as "homework".
- **Devicon (MIT): tech marks only.** These are inline SVGs in the server component `components/tech-icon.tsx` (moved from the lab). Use the monochrome `-plain` variant where devicon has one; otherwise reduce `-original` to one path. The lab's C mark is `c-original`; swap it for `c-plain` if it exists. `fill="currentColor"`, `viewBox="0 0 128 128"`, size `1.1em` in chips and `1.25em` elsewhere, always `aria-hidden` with the name printed next to it. The set is limited to the stacks in the seed: C, C++, OpenGL, Java, Python, Pytest, Next.js, TypeScript, Tailwind CSS, CMake, Linux. An alias map normalises seed names (`Java 21`→Java, `C++23`→C++), and a name without a mark renders as a text-only chip. Keep the devicon copyright and MIT notice in the file header.
- All icons are `aria-hidden`; meaning comes from the adjacent text or the control's `aria-label`. Color is `currentColor` and states change color only. Swaps (Copy→Check, Sun↔Moon, Pause↔Play) keep both SVGs in the DOM and crossfade (§7).

### 5.2 Shared base and the one interaction language
```css
@layer base {
  a, button, summary, label { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  /* Tailwind 4 resets buttons to default: restore the pointer on everything clickable */
  a[href], button:not(:disabled), [role=button], summary, label[for], label:has(> input),
  select, input[type=checkbox], input[type=radio], input[type=submit] { cursor: pointer; }
  :focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; border-radius: var(--radius-xs); }
}
```
Exactly two hover patterns (§Consistency), both defined only here and only inside `@media (hover: hover)`:

| Pattern | Class | Rest | Hover | Press | Used by |
|---|---|---|---|---|---|
| **(a) Text link** | `.link` (also `a:not([class])`) | `text`, 1 px underline (§3) | accent + 2 px underline | — | prose links, "All projects", "All experience", "Get in touch" links, Source / Live links, contact values (email, LinkedIn, GitHub), back / next-project links, skills "Where used", 404 links, footer GitHub, language links in the preferences |
| (a) variant | `.nav-link` | `text`, no underline; current = 600 + 2 px accent underline + `aria-current="page"` | accent color | — | desktop header nav |
| **(b) Clickable container** | `.box` | padding at rest (cards `p-5`, nodes `p-5 pt-4`, menu rows `px-3 py-3`), 1 px border (`transparent` on rows, `border` on panels), `--box-bg` set | hover tint (§2) + `border-strong`; title gets the 1 px underline; `.arrow` `translate: 4px 0` | `background: var(--color-press)`, no scale | project cards (home, `/projects`), home timeline nodes, mobile menu rows |
| Button | `.btn-primary` / `.btn-secondary` | accent fill / `border-strong` outline | accent-hover / hover tint + `text` border | accent-active / `press` + `scale(.97)` | CV (hero, pill), Send, project detail actions |
| Icon button | `.icon-btn` | transparent, 44×44 | hover tint | `press` + `scale(.97)` | menu, theme, copy, preferences trigger, motion pause |

Rules: a container with no padding at rest gets no background on hover. Neighbours of the same role never mix patterns (all cards are `.box`, all list links are `.link`). Chips, readout rows, experience entries on `/experience` and table rows are **not** interactive and have no hover. Inside a `.box`, the stretched title link (`after:absolute after:inset-0`) is the only target, except for explicitly labelled links (Source, Live), which sit above it (`relative z-10`) and use pattern (a). The focus ring goes around the whole box (`.box:has(:focus-visible)`).

Buttons: `<a>`/`<Link>` for navigation and downloads, `<button>` for actions. A button shows icon + label; only the menu, theme, copy, preferences and pause controls are icon-only, and they have an `aria-label`. Targets are ≥ 44×44 on touch and ≥ 24 on fine pointers; extend small ones with `.hit`, never overlapping a neighbour. Disabled state is not used. **Only the CV is ever `.btn-primary`**; Send and the project-detail actions are `.btn-secondary`.

### 5.3 Header (server `SiteHeader`, client `SiteNav`)
`position: sticky; top: 0` at every width, `z-40`, `bg`, bottom hairline, `padding-top: env(safe-area-inset-top)`, height `--header-h`. No shadow, no blur.
- **`lg`+:** wordmark "Jan Zámostný" (`translate="no"`, 600, `text-lead`, links to `/{lang}`, 44 px hit) | `<nav aria-label>` with Home, Experience, Projects, Skills, **text only** (`<span data-text>` width reserve kept, `px-3`, 44 px tall; Home is current only on exactly `/{lang}`) | utility group outside `<nav>`, at the end: **CV pill**, then **preferences trigger**.
- **Below `lg`:** wordmark | CV pill | menu button. Preferences are rows inside the menu panel, not a second popover.
- **Header CV:** `<a href={cvHref(lang)} download class="btn btn-primary cv-pill">` with `Download` + visible "CV" below `lg` and "Download CV" / "Stáhnout CV" from `lg`, `aria-label` "Download CV (PDF, n KB)" / "Stáhnout CV (PDF, n KB)". It sits in flow in `.cv-slot`, so its slot is always reserved (no layout shift); below `lg` it is left of the menu button. On pages without a hero CV it is always visible. On home it follows §5.4. When hidden the slot has `data-off`, `inert` and `aria-hidden` (not focusable, not in the a11y tree).
- **Width budget:** verify at 1024 px in cs ("Domů", "Zkušenosti", "Projekty", "Dovednosti", "CS ☀", "CV") and at 320 px (wordmark + pill + menu button). With the icons gone it should fit; if not, the nav moves inline only from `xl`.

**Preferences (language + theme), one native `popover`.** Why: the inspiration research (Josh W Comeau) found that settings are utilities, not navigation. Hick's law keeps the header to name, 4 links and one CTA, and the one-line footer has no room. A trigger that **shows the current state** (`EN ☾`) keeps a visible language cue for a Czech recruiter, unlike a bare gear. Native `popover` gives light dismiss, Esc and focus return with no JS.
- Trigger: `<button popovertarget="prefs" class="icon-btn prefs-trigger">`, auto width, `px-2`, mono `text-meta`: the current language code (`EN`/`CS`) + the current theme glyph (Moon in dark, Sun in light; the swap is CSS-only from `--is-dark`). `aria-label` "Preferences: language and theme" / "Předvolby: jazyk a motiv". `lg`+ only.
- Panel `#prefs` `popover="auto"`, level 2, `radius-md`, `width: min(18rem, 100vw - 2rem)`, `padding: .25rem 1rem` (text sits about 19 px from the top and bottom edge, 16 px from the sides). Position: `position-anchor` + `position-area: block-end span-inline-start` as an enhancement; fallback `position: fixed; top: var(--header-h); right: 1rem`. Rows (`.pref-row`, 48 px, label in mono muted, control at the end, a 1 px `border` hairline between the two rows, the same divider as the readout and the contact list; the label and the control are far apart, so the hairline is what groups each row):
  - **Language:** the current language as text with `aria-current="true"` (600 + 2 px accent underline), and the other as `LangLink` (client, unchanged: keeps the path, sets the cookie, has `lang`/`hrefLang`). The names are written in their own language: "English", "Čeština".
  - **Theme:** `ThemeToggle` (client). It shows the **current** state glyph like the trigger, so one convention holds everywhere (this flips the pass-2 `.theme-sun`/`.theme-moon` mapping). Its `aria-label` names the action ("Switch to dark theme").
- Motion: entry `@starting-style { opacity: 0; transform: scale(.95) }`, `transform-origin: top right`, `--duration-2 var(--ease-out)`; exit 150 ms with `transition-behavior: allow-discrete` on `display, overlay`.

**Mobile menu** (below `lg`, inside `SiteNav`, unchanged behaviour): toggle `<button aria-expanded aria-controls="site-menu">` 44×44 with a `Menu`↔`X` swap. Panel `#site-menu` uses `hidden`, is level 1 and full width under the bar, `max-height: calc(100dvh - var(--header-h)); overflow-y: auto; overscroll-behavior: contain`. Contents: 4 text nav rows (`.box` rows, 48 px, current = 600 + accent underline + `aria-current`), a hairline, then the same two preference rows (Language, Theme), indented `px-3` so their labels line up with the nav text above. Focus moves in, is trapped, and returns to the toggle on Esc, link click, route change or outside click. Entry via `@starting-style`, rows staggered (§7); close is instant.

### 5.4 One CV download (home)
**Rule:** exactly one CV control is visible at any time on every page and at every width. There is no floating button anywhere: `components/cv-fab.tsx`, `.cv-fab`, `fab-reveal*` and the `main` bottom padding are deleted.
- Home hero: `<div data-hero-cv>` holds the primary "Download CV" (`Download` icon) + mono muted `PDF, n KB` (`tabular`, nbsp before KB). It is **static content**: it never moves, transforms or changes layer; it scrolls away with the page.
- **Header CV (Apple-style sticky CTA), driven by `site-nav.tsx`:** one `IntersectionObserver` on the hero CV button with `rootMargin` = `-{header height in px} 0 0 0` (rebuilt when the header height changes at 64rem), so "behind the header" counts as out of view. While any part of the hero button is in view, the header CV slot is off (`data-off`, `inert`, `aria-hidden`); otherwise it is on. The state lives in React (per path, like the menu), so a navigation never carries a stale value. Server render on home starts with the slot off; on other pages it is on. Without JS on home the header CV stays off and the hero CV is the one.
- **Motion:** a CSS transition on `.cv-slot[data-off]`, never scroll-linked and no JS animation. Show: `opacity` 0 → 1 and `translate: 0 4px` → `0`, `--duration-1` (150 ms) `--ease-out`, `visibility` immediately. Hide: 120 ms, `visibility` delayed to the end. It is interruptible: a fast scroll just toggles the attribute, nothing queues. **Reduced motion:** `transition: none` (instant toggle).
- `npm run check:cv -- <baseUrl>` guards it: at every scroll stop (slow stops around the hand-off, a fast fling, rapid reversals) exactly one CV button is visible and usable, the header one is never shown while the hero one is fully visible, and the hero one never moves; on pages without a hero CV the header one is usable.
- CV file: `public/cv/jan-zamostny-cv-{lang}.pdf`, `download` attribute, never `target=_blank`. The size comes from `fs.stat`. The download icon never animates.

### 5.5 Home hero ("spec readout")
`<section data-hero>` (the dot grid is no longer part of the hero, see **Page backdrop** below):
- **Page backdrop / dot grid** (ambient 1), identical on every page: `<div class="page-grid -z-10" aria-hidden><div class="ambient"/></div>` is the first child of `<body class="relative isolate">` in `app/[lang]/layout.tsx`, `position: absolute; inset: var(--header-h) 0 auto; height: 40rem; overflow: clip; pointer-events: none; mask-image: radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)`. Inner: `width/height: calc(100% + 24px); background: radial-gradient(var(--color-grid) 1px, transparent 1.5px) 0 0 / 24px 24px; animation: grid-drift 12s linear infinite` (`translate: -24px -24px`, one cell, seamless).
- **Left column** (`lg`: cols 1–7): row of portrait (§4) + `<h1 translate="no">` name; title line (mono muted, wording **[open: Jan]**); **status line**: `.status-dot` + "Open to opportunities" / "Otevřený novým příležitostem" (text, so the state is not color-only); statement `text-lead` "I write software from C and OpenGL up to Next.js." (seed/i18n); `CvHero` (§5.4).
- **Readout** (`lg`: cols 8–12; below `lg` full width after the CV): `<dl class="panel mono-meta">`, rows `grid-template-columns: 4.5rem minmax(0,1fr)`, `py-2`, hairline dividers, `px-4`. Keys (muted) and values (text), from seed facts only:
  `now` QA Automation Engineer (internship), FUTTEC a.s., remote, since Sep 2026 · `study` Bachelor's, Computer Science, VŠB – Technical University of Ostrava · `based` Ostrava · `stack` C, C++, OpenGL, Java, Python, Next.js · `before` Frontend Web Developer, SHOWMORE (Jul–Oct 2024); Blackfish (contract, Jun–Dec 2023) · `want` **[open: Jan's "Looking for" line]**. cs keys: `teď`, `studium`, `místo`, `stack`, `dříve`, `hledám` (flag for review). Dates go through `formatPeriod`.
- **Chip marquee** (ambient 2, cols 1–12): devicon chip list (§5.6), duplicated once, with the copy `aria-hidden`. The whole marquee is `aria-hidden`, because the readout `stack` row carries the same facts as text (each fact once for assistive tech). `mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`, track `translate: 0 → -50%` over 45 s linear, paused on `:hover`. It ends with the **motion control**: `<label class="icon-btn">` around a visually hidden `<input type="checkbox" id="motion-pause">`, `Pause`↔`Play`, sr-only "Pause animations" / "Pozastavit animace". `:root:has(#motion-pause:checked) .ambient { animation-play-state: paused }`. It is CSS only and not persisted. WCAG 2.2.2 needs a pause control for motion longer than 5 s, and hover is not one. It is hidden under reduced motion.
- Mobile order (375×812): name row, title, status, statement, CV, readout, marquee, and the next section's heading peeks. Desktop: two columns top-aligned, marquee below. No hero `min-height`.

### 5.6 Chip
`.chip`: `inline-flex; gap: .4em; min-height: 1.75rem; padding-inline: .5rem; border: 1px solid var(--color-border-strong); border-radius: var(--radius-xs); white-space: nowrap`, mono `text-meta`, icon + name (Simple Icons / devicon / lucide, see ICONS.md), `translate="no"`. Not interactive (no hover, no cursor). Used in the marquee, cards, the project detail and experience entries (stack). Lists use `<ul aria-label="Stack">`.

### 5.7 Project case-study card (`components/case-card.tsx`, server)
Home "Selected projects" (featured, 2×2 from `md`, 1 column below) and `/projects` (all visible projects, same grid, grouped). `<article class="box card">` is a level-1 panel (`--box-bg: var(--color-surface)`, `radius-md`, `overflow: clip`, `container-type: inline-size`). It is a flex column (subgrid was dropped: every card now has an image row, so subgrid is not needed), with the footer pushed down by `mt-auto`:
1. Screenshot, full bleed, 16:10, `object-cover object-left-top`, inner outline, `next/image` `sizes="(min-width:768px) 35vw, 100vw"`, real alt. Always present: `<ProjectImage>` (`components/project-image.tsx`, server) renders the `next/image` when the project has a thumbnail, otherwise a generated placeholder in the same 16:10 slot, radius and inner outline: `surface-2` fill, the `.dot-grid` pattern (the hero's 24 px dots, static), the project name (Archivo 125%, 600, `translate="no"`) and 2–4 stack marks (`TechIcon`, muted), sized with container units so it scales with the card. The placeholder is `aria-hidden` with no alt (the card title names the project), is static, and uses tokens only.
2. Title h3 (`text-lead` 600, `translate="no"`, `line-clamp-2`), stretched link to `/{lang}/projects/{slug}`.
3. Summary (muted, `line-clamp-2`, full text on the detail page).
4. **Decision**: label in mono muted + text from seed.
5. **Result**: real, explainable numbers only, never invented. Omit the row when empty.
6. Stack chips.
7. Footer: `Source` / `Live` (`.link`, `ArrowUpRight`, sr-only new tab; only for public repos, since private repositories are never linked) and the `.arrow` `ArrowRight` at the end.
Text rows have `px-5` and the first text row `pt-4`. Hover and press follow `.box` (§5.2); the card never scales or lifts. Decision/Result come from the `decision`/`result`/`next` columns on the project translation.

### 5.8 Experience
- **Home timeline preview** (`ExperiencePreview`): an `<ol>` with 3 nodes (FUTTEC, SHOWMORE, Blackfish). Each node is a `.box` panel link to `/{lang}/experience#{slug}` with `p-5 pt-4`, containing: year (mono `tabular`, with the full range as sr-only) with a 0.5rem dot (accent for the current role, `muted` for past roles), then role (600) and company (muted, `translate="no"`), plus `.arrow`. From `lg`: 3 columns on a horizontal hairline axis (`border-strong`) through the dots. Below `lg`: a vertical list with the axis on the inline start through the dots. Followed by an "All experience" `.link`.
- **`/experience` entries** (not clickable): the same vertical axis and dots, with one `<li id={slug}>` (`scroll-margin-top` from scroll-padding) per entry. First line `grid-template-columns: 1fr auto; align-items: baseline`: h3 role (`text-lead` 600) and `<time>` range (mono muted `tabular`); dates drop under the title below `sm`. Company (link if public) sits in the header block, row 2 under the role, so role, date and company are one `gap-1` group. Then 2–3 bullets (`max-w-prose`), stack chips, and "Related projects" `.link`s. Work, Education and Courses each get a text-only h2.

### 5.9 Contact ("Get in touch", home only, `id="contact"`)
h2 "Get in touch" / "Napište mi". A level-1 panel (`p-6` at every width: at 375 it must exceed the 16 px field gap; at 320 the email still wraps to two lines, as it did with `p-3`, and nothing overflows) with 12 columns from `lg`: form in cols 1–7, contact list in 8–12; one column below `lg`.
- **Form:** `<form action={sendMessage}>` (server action, progressive enhancement). Fields: Name (`autocomplete="name"`, `required`, `maxlength=100`), Email (`type=email`, `autocomplete="email"`, `required`, `maxlength=254`), Message (`textarea`, `required`, `maxlength=2000`, 5 rows), plus a hidden honeypot. Labels sit visible above the fields (mono muted); there are no placeholders. Fields: `.field` = `surface`, 1 px `border-strong`, `radius-xs`, min 44 px, `outline-offset: 1px` on focus. Under the button: a one-line privacy note (muted `text-meta`): "Only emailed to me, never stored." / "Pošle se jen mně e-mailem, nikam se neukládá." Submit: `.btn-secondary` "Send" / "Odeslat", pending label "Sending…" when JS is on.
- **Server action** (`app/[lang]/actions.ts`): validates again (trust boundary: lengths, email shape, honeypot means bots get "success" and nothing is sent) and delivers by email only (provider **[open, stackfit]**, recipient from an env var). No database row.
- **Feedback:** an always-rendered `<div id="contact-status" aria-live="polite" tabindex="-1">` above the form (`empty:absolute`, so while empty it stays in the a11y tree but takes no flex gap and the form top lines up with the contact list). Success: "Thanks, your message was sent. I'll reply by email." / cs. Failure (delivery): `role="alert"` text "The message couldn't be sent. Email me directly:" + the email with `CopyButton`. Field errors: text under each invalid field (icon-free, `text`, prefixed "Error:" sr-only), linked by `aria-describedby`, with `aria-invalid="true"` and a 2 px `text` border (not color-only). Focus moves to the first invalid field, or to the status on success.
- **Client component (decided by Jan):** `components/contact-form.tsx` is the fifth client component. It renders the `<form>` with `useActionState(sendMessage, initial, "/{lang}")`, so the Server Action also works without JS (the permalink posts to the page). With JS, the returned `{ status, errors, values }` shows field errors inline and keeps what the visitor typed (`defaultValue` from state). Native constraint validation (`required`, `type`, `maxlength`) still runs first. The contact list stays a server component. The old "redirect variant that loses the message" is gone.
- **Contact list** (cols 8–12): `<ul>` rows `grid-template-columns: 1.25em minmax(0,1fr) 2.75rem`, min 48 px, hairlines. Email (`mailto:` `.link` + `CopyButton`, unchanged: icon swap, `aria-live` "Copied", failure text), phone (`tel:` `.link` + `CopyButton`, `.tabular`; kept per Jan's pass-2 request), LinkedIn and GitHub (`.link`, new tab, sr-only note). This is the **only** contact block on the site.

### 5.10 Footer
One line on every page: `<footer>` with a hairline top, `py-6`, mono `text-meta` muted: `© 2026 Jan Zámostný · Built with Next.js, source on GitHub` (cs: "© 2026 Jan Zámostný · Postaveno na Next.js, zdrojový kód na GitHubu"). "GitHub" links to `https://github.com/JaZafier00716/landing_page` (`.link`, new tab, sr-only note). The year comes from the build date. Removed: `ContactList`, `LangLink`, "Last updated" and its dictionary strings.

### 5.11 Other pages
- **`/projects`:** h1 + intro; "Work projects" and "School projects" h2 (text only), each a grid of case cards (§5.7). Hidden projects are filtered in `lib/content.ts`.
- **`/projects/[slug]`:** back `.link` (`ArrowLeft`) → h1 (125%) → lead summary → stack chips → `<ProjectImage>` 16:10 (screenshot or the placeholder of §5.7; `radius-md`, inner outline, `priority`) → `<dl>` Decision / Result (/ Quality) in the card's label style → characteristics table (`th scope="row"`, mono muted 8rem column, hairline rows, empty rows omitted; Source only for public repos) → description prose (65ch) → actions: "View source" / "Open live site" (`.btn-secondary`, only when public) → "Next project" `.link` (`ArrowRight`). Unknown slug returns 404; a hidden slug redirects to `/{lang}/projects`.
- **`/skills`:** h1, then one `<section>` per group with a text-only h2 and a hairline `<table>`: Skill (icon + name, 600, `translate="no"`; every skill has an icon, see ICONS.md) | Where used (project `.link`s, `hyphens: auto`, "—" when none). No chips, bars or levels. "Where used" drops under the skill below `sm`.
- **404:** h1 "Page not found" / cs, one sentence naming what was missing, then "All projects" and "Home" as `.link`s. No icons.

## 6. Page layouts
Order: skip link (first focusable, level 2 + accent border, 44 px, fixed top-left on focus) → sticky `<header>` → `<main id="main" tabindex="-1">` → one-line `<footer>`. One `<h1>` per page. Every page ends with a next step: home → contact form; experience → "Get in touch" (`/{lang}#contact`); project → source / next project; skills → projects.

**Home `/{lang}`**
```
375                                  1366 (12 cols)
Jan Zámostný             [CV] [☰]   Jan Zámostný  Home Experience Projects Skills  [CV] [EN ☾]
░ · · dot grid · · ░                 · · · · · · · dot grid, radial mask · · · · · · · · · · ·
[◩] Jan Zámostný                     [◩] Jan Zámostný (h1 125%)      ┌ readout (cols 8–12) ┐
title line (mono)                    title line                      │ now    …            │
● Open to opportunities              ● Open to opportunities         │ study  …            │
I write software from C …            I write software from C …       │ based  Ostrava      │
[↓ Download CV]  PDF, n KB           [↓ Download CV] PDF, n KB       │ stack  C, C++, …    │
┌ readout ──────────────┐                                            │ before …            │
│ now / study / … / want│                                            │ want   …            │
└───────────────────────┘                                            └─────────────────────┘
‹ chip marquee › [❚❚]               ‹fade [C] [C++] [OpenGL] [Java] [Python] … fade›  [❚❚]
Selected projects (peeks)            Selected projects   [card][card] / [card][card]
                                     Experience          ●2026 ──── ●2024 ──── ●2023
                                     Get in touch        [form 7 cols] [email/LinkedIn/GitHub 5]
```
The header CV on home stays hidden while the hero CV is in view (§5.4). Section order: hero → Selected projects (+ "All projects") → Experience timeline (+ "All experience") → Get in touch. The `Contact` hero button, the eyebrow, the large portrait and the featured-row list are removed.

**`/{lang}/experience`:** h1 + intro → Work, Education, Courses timelines (§5.8) → "Get in touch" `.link`. No CV button (the header pill is the one CV).
**`/{lang}/projects`, `/projects/[slug]`, `/skills`, 404:** §5.11.

## 7. Motion
All motion is CSS. Content is correct and visible with no JS and if no animation runs: **never server-render `opacity: 0`, `visibility: hidden` or an offset transform**, except as `@starting-style` values, view-transition pseudo-elements, or the hidden header CV slot on home (§5.4).

| Token | Value | Use |
|---|---|---|
| `--duration-1` | 150 ms | color/background/border hover, press, reduced-motion crossfades, popover exit |
| `--duration-2` | 200 ms | icon swaps, menu/popover entry, hero entry items |
| `--duration-3` | 250 ms | page crossfade |
| `--duration-4` | 300 ms | ceiling for any UI transition |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | enter, exit, header CV show/hide |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | movement on screen |
| `ease` / `linear` | — | color and hover / ambient loops only |
| `--stagger` | 40 ms | hero entry and menu rows (30–60 ms) |

- **Properties:** motion only on `transform` (`translate`, `scale`), `opacity` and `filter`. State colors (`color`, `background-color`, `border-color`, `text-decoration-color`) may transition at `--duration-1 ease`. Layout properties never animate. Never `transition: all`, never `ease-in`. Use transitions, not keyframes, for anything interactive. Hover effects only inside `@media (hover: hover)`.
- **Press:** `:active { transform: scale(.97) }` on `.btn`, `.icon-btn` and the CV pill. Containers (`.box`) press to `press` without scaling.
- **Hero entry** (replaces the original site's 2.3 s slide-ins): the left-column items (name row, title + status, statement, CV) and the readout use `@starting-style { opacity: 0; translate: 0 8px }` → rest over `--duration-2 var(--ease-out)`, with `transition-delay: calc(var(--i) * var(--stagger))` for `--i` 0–2 (readout = 2). The last item finishes at 280 ms, under 300 ms. Nothing else on the page has an entry animation.
- **Popover / menu entry:** `@starting-style { opacity: 0; transform: scale(.95) }`, `transform-origin: top right` (the trigger), `--duration-2`. Menu rows stagger by `--stagger`. Exits are 150 ms (popover) or instant (menu). Never animate from `scale(0)`.
- **Icon swap** (copy, theme, menu, pause): both icons in one grid cell. The outgoing one goes to `opacity 0; scale(.8); blur(4px)` and the incoming one to rest, over `--duration-2 var(--ease-out)`.
- **Container arrow:** `.arrow` `translate: 4px 0` on `.box` hover, `--duration-1 var(--ease-out)`.
- **Header CV:** §5.4 (opacity + 4px translate, 150 ms show / 120 ms hide, CSS transition on `data-off`).
- **Page transitions:** React `<ViewTransition>` around the page content plus `@view-transition { navigation: auto }`. Root old/new crossfade at `--duration-3 var(--ease-out)`. The header (`view-transition-name: site-header`) has `animation: none`, so the chrome never fades. Crossfade only.
- **Ambient loops: max 3 (the grid in the shared layout, the chip marquee and status dot in the home hero), all with class `.ambient`:** (1) dot-grid drift, 12 s; (2) chip marquee, 45 s, mask-faded edges; (3) status-dot ring (`::after` `scale 1 → 2.4`, `opacity .5 → 0`, 2.4 s `--ease-out` infinite; the dot itself is static). They use transform/opacity only. They are **paused** (`animation-play-state: paused`) when `html[data-hero-off]` (off-screen) or `html[data-hidden]` (tab hidden; `data-hero-off` is only ever set on home, so on inner pages the cheap, masked, transform-only grid keeps running while scrolled out of view) is set, or when the motion checkbox is on (§5.5). Both attributes are set by `site-nav.tsx`: the same `IntersectionObserver` also watches `[data-hero]`, and a `visibilitychange` listener handles the tab. No inline script is needed, and without JS the loops simply run. No other infinite animation exists anywhere: no pulsing rules, no bouncing download icons, no spinning rings.
- **No** scroll-triggered reveals, no load-time animation outside the hero entry, and no animation on keyboard-initiated actions beyond the state change.
- **Reduced motion:**
```css
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after { transition-property: color, background-color, border-color, text-decoration-color, opacity !important; animation: none !important; }
  ::view-transition-group(*) { animation: none !important; }
  ::view-transition-old(*), ::view-transition-new(*) { animation-duration: var(--duration-1) !important; } /* crossfade only */
  .marquee { mask-image: none; } .marquee-track { width: auto; flex-wrap: wrap; } .marquee-track > [aria-hidden] { display: none; }
  .motion-toggle { display: none; }
}
```
  Under reduced motion all three loops are off, the marquee becomes a static wrapped row, the hero entry is an opacity-only fade, the CV swap is a 150 ms crossfade, and the CSS-flag `body` animation is re-declared with `!important` so the flag still works.

## 8. Accessibility checklist
- [ ] Skip link is the first focusable element, visible on focus, and targets `#main`.
- [ ] Landmarks: one `<header>`; one `<nav aria-label>` in the a11y tree at any width (menu panel `hidden` when closed); utilities (CV pill, preferences) outside `<nav>`; one `<main>`; one `<footer>`.
- [ ] One `<h1>` per page, no skipped levels; on `/` the name is the h1. The readout is a `<dl>`; timelines and lists use `<ol>`/`<ul>`.
- [ ] `<html lang>` = `en`/`cs`; the language link has `lang` + `hrefLang` and keeps the path; the preferences trigger shows the current language.
- [ ] Exactly one CV control is visible and focusable at any scroll position and width (check while scrolling slowly across the dock point); the hidden one is `visibility: hidden`.
- [ ] Focus ring 2 px accent, offset 3 px; never under the sticky header (scroll-padding, `scroll-margin-top` on `#contact` and experience anchors); visible around whole `.box` cards.
- [ ] Targets ≥ 44×44 on touch, ≥ 24 on fine pointers; no overlapping hit areas; `cursor: pointer` on everything clickable.
- [ ] Contrast per §2 in both themes, including hover tints and text over the dot grid.
- [ ] State is never color-only: current nav = underline + weight + `aria-current`; status = dot + text; field errors = text + `aria-invalid` + thicker border; copy = icon + live text.
- [ ] Underlines clear g/y/p at rest and on hover (both fonts, both sizes).
- [ ] Icon-only controls (menu, theme, copy, preferences, pause, CV pill full name) have an `aria-label`; all icons and technology marks are `aria-hidden`; external links announce "opens in new tab".
- [ ] Popover: Esc and light dismiss close it and focus returns to the trigger. Mobile menu: focus moves in, is trapped, Esc closes it, focus returns; `overscroll-behavior: contain`.
- [ ] Contact form: visible labels, `autocomplete`, errors linked by `aria-describedby`, `aria-live` status, focus to the first error; works with JS disabled.
- [ ] Moving content: a pause control exists (WCAG 2.2.2); loops stop off-screen, in hidden tabs and under reduced motion; the marquee is `aria-hidden` (its facts are in the readout).
- [ ] Images: alt in the page language; portrait `alt=""`; explicit dimensions; CLS 0 (header, CV slot always reserved, fonts, hydration).
- [ ] Tables use `<th scope>`.
- [ ] No theme flash; theme persists; `theme-color` and `color-scheme` follow the active theme.
- [ ] `forced-colors: active`: buttons, chips, fields, cards and icon buttons keep a 1 px border; focus uses `outline`; the dot grid is hidden.
- [ ] Test at 320, 375, 768, 1024, 1366 and 1920 px, at 200% zoom, in both themes, both languages, keyboard only, with JS off, in Firefox/Safari (no scroll timelines, View Transitions types), and with axe. No horizontal scroll at 320; cs strings (~25% longer) still fit.

## 9. Open for Jan, and history
**Open:** (1) the hero title line (copy.md default in use); (2) a screenshot for skj-projekt: its repo has no images yet, so the card shows no image row (ZPG uses the classroom lighting render); (3) the migration `project_case_study` is applied, but `data/seed.ts` must be run by Jan to load the case-study text; (4) Resend needs the env vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`; (6) proofreading every new cs string listed in §3/§5 (readout keys, status, contact, privacy note, preferences, pause, footer, Decision/Result labels).
**Removed in pass 3:** CV FAB, header CV at the top of home, nav and heading icons, `Layers`/`Globe`, the eyebrow, the 800-weight display name, the hero "Contact" button, the experience-page CV button, footer contacts, the footer language link and "Last updated", `--radius-sm`, `--text-display`, and the "no infinite animations" rule (replaced by the three-loop rule in §7).
Pass 2 findings (F#/V#) stay resolved as recorded in git history (`DESIGN.md` at `154080f`).
