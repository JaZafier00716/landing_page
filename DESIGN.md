# DESIGN.md — Jan Zámostný portfolio ("Datasheet", UX pass 2)

Binding spec. Stack: Next 16.4, React 19.3, Tailwind 4.3 (CSS-first). Routes under `app/[lang]/` (`en`, `cs`). Also binding: `docs/ui-quality-checklist.md` (cited as §Section), `docs/ux-pass-2-plan.md`, `CLAUDE.md`. Finding IDs `F#`/`V#` refer to the earlier audits.
Not in scope: chip/IC imagery, pin-labelled skills, fake part numbers, icon fonts, motion libraries (framer-motion/motion), iframes, flags.

## 1. Principles
1. Reads like a datasheet first page without hardware costume: hairline rules, mono metadata, tabular rows. Structure carries information.
2. The name is the one loud element (Archivo Expanded 800). Everything else is quiet and ruled.
3. Who / what / how-to-contact answerable in 5 s at 375x812: portrait, name, role, CTAs above the fold, next section peeking.
4. One primary action per view: Download CV (header on desktop, FAB on mobile, hero CTA). Everything else is quieter. Every action looks like an action.
5. Content is visible with no JS and no animation. Server components by default; the only client components are `site-nav.tsx`, `theme-toggle.tsx`, `lang-link.tsx`, `copy-button.tsx`.

## 2. Color (OKLCH)
Light "paper" is the default; dark "solder mask" applies when the OS prefers dark unless the user forced a theme (`data-theme` on `<html>`, set from `localStorage` by the inline `<head>` script before paint). Each theme has its own 9-step neutral ramp tinted toward the brand hue (light h155, dark h162), no pure black or white. Anchors are the previous hex values converted to OKLCH (bg, text, muted, border-strong, accent states kept to ±0.005 L). Components use semantic tokens only, never ramp steps or literal colors. Gradients (none planned) interpolate `in oklch`.

```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root {
  /* light ramp, 1 = lightest */
  --gray-1: oklch(0.995 0.002 155); /* #fcfefd raised surface */
  --gray-2: oklch(0.965 0.005 155); /* #f1f4f2 page bg (was #F3F4F0) */
  --gray-3: oklch(0.935 0.007 155); /* #e6ebe7 pressed fill */
  --gray-4: oklch(0.885 0.009 155); /* #d5dbd6 */
  --gray-5: oklch(0.835 0.012 155); /* #c3cbc5 solid twin of --color-border */
  --gray-6: oklch(0.700 0.014 155); /* #98a19b */
  --gray-7: oklch(0.598 0.015 155); /* #79827c solid twin of --color-border-strong */
  --gray-8: oklch(0.485 0.015 155); /* #59625b muted (was #596067) */
  --gray-9: oklch(0.205 0.008 155); /* #141816 text (was #14171A) */

  /* durations (no Tailwind namespace, plain vars) */
  --duration-1: 150ms; /* color, hover, press */
  --duration-2: 200ms; /* icon swaps, crossfades, menu entry */
  --duration-3: 250ms; /* page crossfade */
  --duration-4: 300ms; /* hard ceiling */
  --stagger: 40ms;     /* 30–60 ms allowed */
}

@theme {
  --color-bg: var(--gray-2);
  --color-surface: var(--gray-1);        /* level 1: hover row, menu panel */
  --color-surface-2: var(--gray-1);      /* level 2 (light: same fill, deeper shadow) */
  --color-press: var(--gray-3);          /* pressed row / secondary button */
  --color-text: var(--gray-9);
  --color-muted: var(--gray-8);
  --color-border: oklch(0.205 0.008 155 / 0.18);        /* hairlines, decorative */
  --color-border-strong: oklch(0.205 0.008 155 / 0.55); /* control outlines, >= 3:1 */
  --color-accent: oklch(0.468 0.101 161);   /* #0a6b47 rest */
  --color-accent-hover: oklch(0.414 0.089 161);  /* #085a3b */
  --color-accent-active: oklch(0.363 0.077 162); /* #064a31 */
  --color-accent-subtle: oklch(0.93 0.035 161);  /* current-item tint */
  --color-accent-contrast: var(--gray-1);   /* label on accent */
  --color-selection: oklch(0.87 0.06 161);
  --color-focus: var(--color-accent);
  --color-image-outline: oklch(0 0 0 / 0.1);
  --shadow-1: 0 1px 2px oklch(0.205 0.02 155 / 0.06), 0 2px 8px oklch(0.205 0.02 155 / 0.06);   /* direct + ambient */
  --shadow-2: 0 1px 2px oklch(0.205 0.02 155 / 0.12), 0 4px 16px oklch(0.205 0.02 155 / 0.12);

  --font-sans: var(--font-archivo), system-ui, sans-serif;
  --font-mono: var(--font-redhatmono), ui-monospace, monospace;

  /* type scale: mobile 16px x1.2 @360px -> desktop 17px x1.25 @1280px */
  --text-meta: clamp(0.8333rem, 0.8268rem + 0.029vw, 0.85rem);    /* 13.3–13.6 */
  --text-meta--line-height: 1.5;
  --text-meta--letter-spacing: 0.02em;
  --text-body: clamp(1rem, 0.9755rem + 0.1087vw, 1.0625rem);      /* 16–17 */
  --text-body--line-height: 1.55;
  --text-lead: clamp(1.2rem, 1.1499rem + 0.2228vw, 1.3281rem);    /* 19.2–21.3 role line, h3 */
  --text-lead--line-height: 1.4;
  --text-h2: clamp(1.728rem, 1.5921rem + 0.6038vw, 2.0752rem);    /* 27.6–33.2 */
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.01em;
  --text-h1: clamp(2.0736rem, 1.87rem + 0.905vw, 2.594rem);       /* 33.2–41.5 inner pages */
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.015em;
  --text-display: clamp(2.4883rem, 1.4795rem + 4.4836vw, 5.0664rem); /* 39.8–81.1 name */
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.02em;

  --radius-xs: 2px;  /* buttons, inputs, table focus */
  --radius-sm: 4px;  /* thumbnails, FAB */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);     /* enter/exit */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* movement on screen */

  --breakpoint-sm: 40rem; --breakpoint-md: 48rem; --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem; --breakpoint-2xl: 96rem;
}

/* dark: OS preference unless the user forced light */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme=light]) {
    color-scheme: dark;
    --gray-1: oklch(0.216 0.023 162); /* #101d16 page bg (was #0F1D17) */
    --gray-2: oklch(0.261 0.030 162); /* #162920 surface level 1 (was #16291F) */
    --gray-3: oklch(0.300 0.034 162); /* #1e3329 level 2 */
    --gray-4: oklch(0.340 0.037 162); /* #263e32 level 3 / pressed */
    --gray-5: oklch(0.382 0.040 162); /* #2f4a3c solid twin of border */
    --gray-6: oklch(0.583 0.050 162); /* #608572 solid twin of border-strong */
    --gray-7: oklch(0.780 0.026 162); /* #a9bdb2 muted (lifted from #9DB2A6 for APCA) */
    --gray-8: oklch(0.860 0.016 162); /* #c8d4ce */
    --gray-9: oklch(0.946 0.010 162); /* #e8efeb text */
    --color-bg: var(--gray-1);
    --color-surface: var(--gray-2);
    --color-surface-2: var(--gray-3);
    --color-press: var(--gray-4);
    --color-muted: var(--gray-7);
    --color-border: oklch(0.946 0.010 162 / 0.14);
    --color-border-strong: oklch(0.946 0.010 162 / 0.45);
    --color-accent: oklch(0.783 0.130 90);        /* #d9b44a */
    --color-accent-hover: oklch(0.833 0.120 90);  /* #e6c566 */
    --color-accent-active: oklch(0.870 0.105 90); /* lighter = more contrast in dark */
    --color-accent-subtle: oklch(0.33 0.05 90);
    --color-accent-contrast: oklch(0.194 0.029 89); /* #1a1405 */
    --color-selection: oklch(0.42 0.08 90);
    --color-image-outline: oklch(1 0 0 / 0.1);
    --shadow-1: 0 0 #0000;  /* dark: depth = lighter surface, no shadows */
    --shadow-2: 0 0 #0000;
  }
}
/* dark: explicit user choice (identical values, keep in sync) */
:root[data-theme=dark] {
  color-scheme: dark;
  --gray-1: oklch(0.216 0.023 162); /* #101d16 page bg (was #0F1D17) */
  --gray-2: oklch(0.261 0.030 162); /* #162920 surface level 1 (was #16291F) */
  --gray-3: oklch(0.300 0.034 162); /* #1e3329 level 2 */
  --gray-4: oklch(0.340 0.037 162); /* #263e32 level 3 / pressed */
  --gray-5: oklch(0.382 0.040 162); /* #2f4a3c solid twin of border */
  --gray-6: oklch(0.583 0.050 162); /* #608572 solid twin of border-strong */
  --gray-7: oklch(0.780 0.026 162); /* #a9bdb2 muted (lifted from #9DB2A6 for APCA) */
  --gray-8: oklch(0.860 0.016 162); /* #c8d4ce */
  --gray-9: oklch(0.946 0.010 162); /* #e8efeb text */
  --color-bg: var(--gray-1);
  --color-surface: var(--gray-2);
  --color-surface-2: var(--gray-3);
  --color-press: var(--gray-4);
  --color-muted: var(--gray-7);
  --color-border: oklch(0.946 0.010 162 / 0.14);
  --color-border-strong: oklch(0.946 0.010 162 / 0.45);
  --color-accent: oklch(0.783 0.130 90);        /* #d9b44a */
  --color-accent-hover: oklch(0.833 0.120 90);  /* #e6c566 */
  --color-accent-active: oklch(0.870 0.105 90); /* lighter = more contrast in dark */
  --color-accent-subtle: oklch(0.33 0.05 90);
  --color-accent-contrast: oklch(0.194 0.029 89); /* #1a1405 */
  --color-selection: oklch(0.42 0.08 90);
  --color-image-outline: oklch(1 0 0 / 0.1);
  --shadow-1: 0 0 #0000;  /* dark: depth = lighter surface, no shadows */
  --shadow-2: 0 0 #0000;
}
```
Use `@theme` (not `@theme inline`) so the overrides flip utilities (`bg-bg`, `text-muted`, `border-border-strong`, `shadow-2`, `text-h2`) with no `dark:` prefixes.

**Theme plumbing.** `:root { color-scheme: light }` / dark sets `color-scheme: dark`. Base rules: `::selection { background: var(--color-selection); color: var(--color-text) }`, `:root { accent-color: var(--color-accent); caret-color: var(--color-accent) }`. `<meta name="theme-color">` via `viewport.themeColor` in `app/[lang]/layout.tsx`: light `#f1f4f2` with `(prefers-color-scheme: light)`, dark `#101d16` with `(prefers-color-scheme: dark)`. When a theme is forced, the head script and `ThemeToggle` set both metas' `content` to the forced theme's bg.

**Elevation.** Level 0 page `bg`. Level 1 (hover row, mobile menu panel): light `surface` + `shadow-1`; dark `surface` (one step lighter). Level 2 (CV FAB, skip link): light `shadow-2`; dark `surface-2` or the accent fill, no shadow. Structure (dividers, table rules, header bottom) stays as hairline borders, never shadows. Images get `outline: 1px solid var(--color-image-outline); outline-offset: -1px` (inner outline, same radius). White-background images: `mix-blend-mode: multiply` in light only; in dark put them on a `gray-8` tile.

**Contrast** (computed: OKLCH→sRGB, WCAG 2.x ratio, APCA 0.0.98G-4g Lc; alpha borders composited over the surface; negative Lc = light on dark).

| Pair | Light WCAG / Lc | Dark WCAG / Lc |
|---|---|---|
| text on bg / surface / press (dark: s2 / s3) | 16.18 / 97.8 · 17.63 / 103.7 · 14.81 / 92.0 | 14.88 / −95.0 · 11.52 / −91.5 · 9.90 / −88.7 |
| muted on bg / surface / press (dark: s1 / s2) | 5.75 / 74.7 · 6.26 / 80.6 · 5.26 / 68.9 | 8.77 / −62.8 · 7.74 / −61.2 · 6.79 / −59.3 |
| accent on bg / surface (links, focus ring) | 5.91 / 75.0 · 6.45 / 80.9 | 8.74 / −62.7 · 7.71 / −61.2 |
| accent-contrast on accent / hover / active | 6.45 · 8.18 · 10.19 (Lc −86 / −92 / −97) | 9.23 · 10.95 · 12.37 (Lc 65 / 73 / 80) |
| accent-hover / active vs bg (state > rest) | 7.51 / 9.35 | 10.37 / 11.71 |
| border-strong (composited) on bg / surface | 3.87 · 3.96 (Lc 63) | 3.99 · 3.82 (Lc −30) |
| border on bg (decorative, exempt) | 1.46 | 1.47 |
| text on ::selection / accent-subtle | 12.35 · 14.74 | 7.27 · 10.48 |

Rules: body and labels use `text` (Lc ≥ 88). `muted` is for metadata and secondary lines only, never on `press` in light or `surface-3` in dark (dark muted on surface-3 drops to Lc −56). `border` is never the only cue for something the user must perceive; use `border-strong`. Hover/active/focus always raise contrast over rest. Accent is ≈10% of any screen: primary CTA, current nav item, focus ring, link hover. No semantic colors (success/error); the copy-failure state uses text + icon.

## 3. Typography
Fonts via `next/font/google` (`app/fonts.ts`, unchanged): Archivo (variable wght + `wdth`, `latin` + `latin-ext`), Red Hat Mono (`latin` + `latin-ext`). Two families, **three weights: 400, 600, 800**. Mono is 400 only (values in `text`, labels in `muted`). Root: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` (Tailwind `antialiased` on `<html>`), `text-size-adjust: 100%`.

| Role | Token | Family / width | Weight | Wrap |
|---|---|---|---|---|
| Name (h1 on `/`) | `text-display` | Archivo `font-stretch:125%` | 800 | balance |
| Inner h1 | `text-h1` | Archivo 112.5% | 600 | balance |
| h2 | `text-h2` | Archivo 112.5% | 600 | balance |
| h3, project names, role line | `text-lead` | Archivo 100% | 600 (role line 400, muted) | balance |
| Body, UI, buttons | `text-body` | Archivo 100% | 400 (strong/buttons/active nav 600) | pretty |
| Table column headers | `text-body` | Archivo 87.5% | 600 | — |
| Eyebrow, stack lines, dates, labels, footer meta | `text-meta` | Red Hat Mono | 400 | pretty |

- No off-scale sizes; no `px` line-heights; letter-spacing only in `em`. Eyebrow is the one uppercase text (`text-transform: uppercase`, stored in natural case), tracking `0.08em`. Prose `max-width: 65ch`.
- Name at 320 px must not clip: `overflow-wrap: normal`; below `sm` drop to `font-stretch: 112.5%` if "Zámostný" overflows.
- **Small caps: not used.** The served Archivo and Red Hat Mono files have no `smcp`/`c2sc` (GSUB checked), so CV, VŠB, QA stay as capitals with no faux small caps.
- **Numbers:** `.tabular` = `font-variant-numeric: tabular-nums` on dates, date ranges, sizes ("131 KB"), phone numbers. Prose figures stay proportional. `sub, sup { line-height: 0 }`.
- **Underlines** (links only, never emphasis): `text-decoration-line: underline; text-underline-offset: 0.2em; text-decoration-thickness: 1px; text-decoration-skip-ink: auto`; hover (in `@media (hover:hover)`) thickness 2px + `color: var(--color-accent)`. Nav uses the active underline only (§5).
- **Buttons/badges:** `text-box: trim-both cap alphabetic` as enhancement; padding must look centred without it.
- `hyphens: auto` only in narrow columns (skills "Where used", characteristics values), never headings; requires correct `lang`.
- `translate="no"` on "Jan Zámostný" (wordmark, name, footer), project names, tech names in stack lines and tables, email, phone and URLs.
- **Language-aware text** (§Language-aware typography): en quotes “ ” and ’; cs „ “ and ’; `…` not `...`. Ranges: en `2023–2024`, `Jun–Oct 2024`; cs `2023 – 2024`, `čvn – říj 2024` (non-breaking space before the en dash). Dates and numbers via `Intl` for the page locale. All cs prose (seed and dictionary) goes through `nbsp(text, lang)` from `lib/typography.ts`: nbsp after one-letter v k s z o u a i (cs), between number and unit (both langs), inside "Jan Zámostný". Tested by `lib/typography.test.ts` (`node --test`). New Czech strings are flagged for Jan's proofreading.

## 4. Spacing, grid, shape
- **Spacing:** 4 px base = Tailwind's default `--spacing: 0.25rem`; use only steps 1, 2, 3, 4, 6, 8, 12, 16, 20 (4–80 px). Proximity: space inside a group < space between groups. Section rhythm: `.section { padding-block: clamp(3rem, 2.2174rem + 3.4783vw, 5rem) }` (48→80 px). Table rows `py-4` / `lg:py-5` (min 56 px).
- **Container:** `.container-page`: `max-width: 72rem; margin-inline: auto; padding-inline: max(1rem, env(safe-area-inset-left))` → `1.5rem` from `sm`, `2rem` from `lg`. Prose 65ch. Detail-page content max `64rem`.
- **Grid:** 4 columns below `lg`, 12 from `lg`, `gap-x-6`. Every element aligns to a column edge, a baseline or its optical centre; no orphaned columns.
- **Corners:** `radius-xs` (2 px) buttons and focus outlines; `radius-sm` (4 px) thumbnails and FAB; tables/rows/header `0`. Nested radii are concentric: inner = outer − padding, a child is never rounder than its parent (focus outline at 3 px offset around a 2 px button follows to 5 px automatically). No cards-in-cards.
- **Portrait:** 1:1 soft squircle, `border-radius: 28%` plus `@supports (corner-shape: squircle) { corner-shape: squircle; border-radius: 40% }` (squircle needs the larger radius to read the same), `object-fit: cover; object-position: 50% 30%` (eyes on the upper third; verify the crop at 168 px and 320 px), image outline as in §2. Source `public/images/portrait.webp`.
- **Layout safety:** `html { scrollbar-gutter: stable; scroll-padding-top: calc(var(--header-h) + 1rem) }` with `--header-h: 3.5rem` / `4rem` from `lg`; below `lg` also `scroll-padding-bottom: calc(5rem + env(safe-area-inset-bottom))` so focus and anchors clear the FAB. Heights: `svh` for the hero, `dvh` for overlays, never `vh`. Container queries for components used at several widths (contact rows, project article).

## 5. Components

### Icons
lucide-react only (no brand icons exist in lucide 1.x; none are drawn by hand). `stroke-width` 1.5 beside 400 text, 2 beside 600 (buttons, active nav, headings). Size in `em` (`size-[1.125em]` beside body, `0.9em` in headings) with `flex: none`; nudge optically (±1 px). Always `aria-hidden`; meaning comes from adjacent text or the control's `aria-label`. Color is `currentColor`; states via color only. Swaps (Copy→Check, Sun→Moon) keep both SVGs in the DOM and crossfade (§7).

| Place | Icon |
|---|---|
| Nav: Home / Experience / Projects / Skills | `House` / `Briefcase` / `FolderGit2` / `ListChecks` |
| Utility: language / theme / CV / menu | `Globe` / `Sun`·`Moon` / `Download` / `Menu`·`X` |
| Contact rows: email / phone / LinkedIn / GitHub | `Mail` / `Phone` / `UserRound` / `GitBranch`; external values end with `ArrowUpRight` |
| Copy button | `Copy` → `Check` |
| Section headings: Featured projects / Contact | `FolderGit2` / `Mail` |
| Experience: Work / Education / Courses | `Briefcase` / `GraduationCap` / `BookOpen` |
| Projects: Work projects / School projects | `Briefcase` / `GraduationCap` |
| Skill groups: Languages / Graphics / Web & backend / Data & ML / Tools / Spoken languages | `Code` / `Shapes` / `Server` / `ChartScatter` / `Wrench` / `Languages` |
| Stack line (project row/article) | `Layers` |
| Project row / back link / external | `ArrowRight` / `ArrowLeft` / `ArrowUpRight` + sr-only "opens in new tab" |

Heading icons sit before the text in `muted`, inside the heading element, `aria-hidden`.

### Shared base
In `@layer base` / `components`:
```css
a, button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.5em; min-height:2.75rem;
  padding:.625rem 1.125rem; border-radius:var(--radius-xs); font-weight:600; text-box: trim-both cap alphabetic;
  transition: background-color var(--duration-1) ease, border-color var(--duration-1) ease, color var(--duration-1) ease,
              transform var(--duration-1) var(--ease-out); }
.btn:active { transform: scale(.97); }
.btn-primary { background:var(--color-accent); color:var(--color-accent-contrast); border:1px solid var(--color-accent); }
.btn-secondary { background:transparent; color:var(--color-text); border:1px solid var(--color-border-strong); }
@media (hover:hover) {
  .btn-primary:hover { background:var(--color-accent-hover); border-color:var(--color-accent-hover); }
  .btn-secondary:hover { background:var(--color-surface); border-color:var(--color-text); }
}
.btn-primary:active { background:var(--color-accent-active); }
.btn-secondary:active { background:var(--color-press); }
```
`<a>`/`<Link>` for navigation and downloads, `<button>` for actions. Buttons always show icon + label (only exceptions: menu, theme and copy buttons, which have `aria-label`). Targets ≥ 44×44 px (touch); small icons extend the hit area with a `::before` inset, never overlapping a neighbour. Disabled is not used.

**Header** (server `SiteHeader`, client `SiteNav`). `position: sticky; top: 0` at every width, `z-40`, `bg-bg`, bottom hairline, `padding-top: env(safe-area-inset-top)`, height `--header-h`. No shadow, no blur. Layout: wordmark "Jan Zámostný" (`translate="no"`, 600, `text-lead`, link to `/{lang}`, 44 px hit) | `<nav aria-label>` | utility area. The utility area is a separate group outside `<nav>`: language link, theme toggle, Download CV (primary `.btn`, from `lg` only).
- **Nav items:** Home, Experience, Projects, Skills; each `icon + <span data-text="Label">Label</span>`, 44 px tall, `px-3`. Current page: `aria-current="page"`, weight 600, icon stroke 2, 2 px accent underline at `underline-offset: .5em`; never color-only. Width never shifts: `[data-text] { display:inline-flex; flex-direction:column }` `[data-text]::after { content: attr(data-text); font-weight:600; height:0; visibility:hidden; overflow:hidden; user-select:none }`. Home is current only on exactly `/{lang}`.
- **Language link** (`LangLink`): `Globe` + the target language named in itself ("English" on cs pages, "Čeština" on en pages), `lang` and `hrefLang` = target, keeps the current path, sets the `lang` cookie. No flags.
- **Theme toggle:** 44×44 icon button; `aria-label` names the action ("Dark theme"/"Light theme" from the dictionary, "Toggle theme" before hydration). Icon crossfade (§7).
- **Width budget:** inline nav from `lg`. Verify at 1024 px in cs ("Zkušenosti", "Dovednosti", "Čeština", "Stáhnout CV"); if it does not fit, nav icons hide between `lg` and `xl` (labels stay).

**Mobile menu** (below `lg`). Toggle `<button aria-expanded aria-controls="site-menu" aria-label>` 44×44, `Menu`↔`X`. Panel `#site-menu` uses the `hidden` attribute (one nav in the a11y tree), sits under the sticky bar, full width, level 1 surface, `max-height: calc(100dvh - var(--header-h)); overflow-y: auto; overscroll-behavior: contain`. Contents: the four nav items (48 px rows, icon + label), then a hairline and the utility row (language, theme). No CV item (the FAB covers it). Focus: opening moves focus to the first link; Tab/Shift+Tab cycle inside toggle + panel (trap); Esc, link click, route change and outside click close it and return focus to the toggle. Entry via `@starting-style` (§7); close is instant.

**CV FAB** (server `CvFab`, below `lg` only, CSS-only). Last child of `<main>`: `<a href={cvHref(lang)} download class="cv-fab">` with `Download` icon + visible "CV" and `aria-label` = full "Download CV" / "Stáhnout CV" (PDF, size). 48 px tall, `padding-inline: 1rem`, `radius-sm`, accent fill and label, light `shadow-2` / dark no shadow. `position: sticky; bottom: calc(1rem + env(safe-area-inset-bottom)); align-self: flex-end; margin-inline-end: max(1rem, env(safe-area-inset-right)); margin-top: -3rem` inside a `flex-col` main, so it rides the viewport bottom-right and stops at main's end, never over the footer. `main` gets `padding-bottom: calc(3rem + 1rem + env(safe-area-inset-bottom))` below `lg`, so the last content never sits under it; `scroll-padding-bottom` (§4) keeps focused elements clear. Press `scale(.97)`; no entry animation; z-index below the header and menu.

**Contact row** (`ContactList`, home `#contact` and footer). `<ul>` of rows; each row is a 3-column grid `grid-template-columns: 1.25em minmax(0,1fr) 2.75rem; align-items: center; column-gap: .75rem`, hairline between rows, row min height 48 px.
- Col 1 icon (`muted`, stroke 1.5) + sr-only label ("Email", "Phone"…). Col 2 value as a real link: `mailto:`, `tel:` (`tabular`), `linkedin.com/in/…` and `github.com/JaZafier00716` (`target=_blank rel="noopener"`, `ArrowUpRight`, sr-only "opens in new tab"); `translate="no"`, `overflow-wrap: anywhere`. Col 3 actions: `CopyButton` for email **and** phone, so both buttons align in one column; LinkedIn/GitHub rows leave it empty (column width stays).
- **CopyButton:** icon-only 44×44 ghost button (`bg` transparent, hover `surface`, press `press` + scale .97), `aria-label` "Copy email" / "Copy phone" (cs: "Kopírovat e-mail" / "Kopírovat telefon", flag for review). On success `Copy`→`Check` (accent) crossfade, sr-only `aria-live="polite"` region says "Copied"/"Zkopírováno", reverts after 2 s. On rejection the icon stays `Copy` and visible `text-meta` muted text "Copy failed" appears in the live region (not color-only), cleared after 2 s.

**Experience entry** (`<ol>` > `<li>`, hairline between). Desktop (`sm`+): first line is a grid `grid-template-columns: 1fr auto; align-items: baseline`: h3 role (`text-lead` 600) left, `<time>` range right in `text-meta` `tabular` muted on the same baseline. Below, full width: company (link if public), 2–3 bullets (`max-w-prose`), stack line, "Related projects" links. Mobile: dates on the line under the title. No left date column, no empty column. Courses use the same component under their own h2.

**Featured project row** (home). `<li>` with one stretched `<Link>`: name (h3 `text-lead` 600, `translate="no"`, `line-clamp-2`) | `Layers` + mono stack line (muted, `line-clamp-1`, full text in `title`) | `ArrowRight`. Desktop 12 cols: 4 | 6 | 2; mobile name, stack under it, arrow right. Hover (`hover:hover`): row `surface`, name underline, arrow `translateX(4px)`; active: `press` + scale none (rows don't scale). Focus ring around the row.

**Project article** (`/projects`). Ruled `<article>`; list is a grid whose articles use `grid-template-columns: subgrid` over the 12 columns so image and text columns align across articles. Image 5 cols, text 7. Thumbnail: `next/image`, `aspect-ratio: 16/10`, `object-cover object-left-top`, `radius-sm`, inner outline (§2), `sizes="(min-width:1024px) 40vw, 100vw"`, real alt. No screenshot → no image, text keeps cols 6–12. Text: h3 `text-h2` name link (`line-clamp-2`), summary `line-clamp-3` (full text on the detail page), characteristics table, `Layers` stack line. Groups: "Work projects" and "School projects" only; the "Other projects" group and its strings are removed (hidden projects are filtered in `lib/content.ts`).

**Characteristics table**: `<table>`, `<th scope="row">` mono muted 8rem column, value mono 400 `text`, hairline rows, no outer border, empty rows omitted. Work: Client, Role, Stack, Live site. School: Role, Language, Libraries, Platform, Source (private repo → no Source row). Mobile stacked, `sm`+ side by side.

**Skills** (`/skills`): layout unchanged: one `<section>` per group, h2 with its group icon (§5), hairline `<table>` Skill (Archivo 600, `translate="no"`) | Where used (links, `hyphens: auto`; "—" when none). No chips, bars or levels. "Where used" drops under the skill below `sm`.

**Footer** (`<footer>`, hairline top, `py-10`): Contact rows (same component, with copy buttons) | language link + "Last updated {Month YYYY}" + © line in mono muted. No CV link. Every page.

**CV file**: `public/cv/jan-zamostny-cv-{lang}.pdf`, chosen by `lang`, `download` attribute, never `target=_blank`. Meta "PDF, {n} KB" from `fs.stat` (`tabular`, nbsp before KB). Appears as: header primary (desktop), FAB (mobile), home hero primary CTA, experience page end (secondary). The download icon never animates.

**404**: real 404 for unknown routes and slugs; says what was not found, links to Projects and Home. Hidden project slugs redirect to `/{lang}/projects`.

## 6. Page layouts
Order: skip link (first focusable, `surface-2` + accent border, 44 px, fixed top-left on focus) → sticky `<header>` → `<main id="main" tabindex="-1">` (flex column; contains page content + `CvFab`) → `<footer>`. One `<h1>` per page. Every page ends with a next step (project → source / next project; experience → contact).

**Home `/{lang}`**
```
mobile (<lg), centred hero               desktop (lg+), 8 | 4
      [ squircle portrait 168–192 ]      EYEBROW                         [ portrait ]
      EYEBROW                            Jan Zámostný (display)          [ 4 cols,  ]
      Jan / Zámostný                     role line (lead, muted, 52ch)   [ ≤320px   ]
      role line                          [Download CV] [Contact]
      [ Download CV ] [ Contact ]
--- Featured projects (h2, FolderGit2) peeks above the fold ---
rows ×3–4, "View all projects" link
--- Contact (h2, id="contact", Mail) contact rows ---
```
- Mobile hero: `min-height: calc(100svh - var(--header-h) - 4rem)` so the next section's heading peeks; portrait `width: clamp(10.5rem, 48vw, 12rem)`, centred; eyebrow, name, role and CTAs centred (the only centred text on the site; short lines, not blocks). Buttons full width stacked below `sm`, inline from `sm`. 375×812 budget: header 56 + 24 + portrait 180 + 16 + eyebrow 20 + 8 + name 84 + 12 + role ~84 + 24 + CTAs 100 ≈ 608 px, ending ≤ 620 px and above the FAB (top at ~748).
- Desktop: 12-col grid, text cols 1–8 left-aligned, portrait cols 9–12 (`max-width: 20rem`, `justify-self: end`), top-aligned with the eyebrow/name block. No min-height.
- Portrait: `next/image` with `priority` (preloaded LCP), `sizes="(min-width:1024px) 320px, 192px"`, AVIF/WebP, explicit width/height, `alt=""` (the name is adjacent).
- `Contact` CTA = secondary in-page link to `#contact` with `Mail`; `Download CV` = primary.

**`/{lang}/experience`**: h1 + intro; Work `<ol>` (h2 `Briefcase`), Education (`GraduationCap`), Courses (`BookOpen`); then secondary CV button and a link to Contact.

**`/{lang}/projects`**: h1 + intro; "Work projects" h2 + articles; "School projects" h2 + articles.

**`/{lang}/projects/[slug]`**: back link (`ArrowLeft`), h1 (`text-h1`), lead summary, 16:10 screenshot, characteristics table, description prose (65ch), primary "View source"/"Open live site" when public, secondary "All projects", then "Next project" link (`ArrowRight`). Unknown slug → 404, hidden slug → redirect.

**`/{lang}/skills`**: h1, six grouped tables, single column.

## 7. Motion
All motion is CSS (no libraries). Content is correct and visible with no JS and if no animation runs: **never server-render `opacity: 0`, `visibility: hidden` or an offset transform** except as `@starting-style` values or view-transition pseudo-elements.

| Token | Value | Use |
|---|---|---|
| `--duration-1` | 150 ms | color/background/border hover, press |
| `--duration-2` | 200 ms | icon swaps, menu entry, stagger items |
| `--duration-3` | 250 ms | page crossfade |
| `--duration-4` | 300 ms | ceiling; nothing longer |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | enter and exit |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | movement on screen (arrow nudge) |
| `ease` | — | color and hover |
| `--stagger` | 40 ms | list stagger (30–60 ms) |

- **Properties:** motion only on `transform`, `opacity`, `filter`. State colors (`color`, `background-color`, `border-color`, `text-decoration-color`) may transition at `--duration-1 ease`. Layout properties never animate. Never `transition: all`; list properties. Never `ease-in`. Transitions, not keyframes, for anything interactive (interruptible). Hover effects only inside `@media (hover: hover)`.
- **Press:** `:active { transform: scale(.97) }` on buttons, toggles, FAB, copy button (not on rows or text links).
- **Entry:** `@starting-style { opacity: 0; transform: scale(.95) }` → `opacity 1; transform none` over `--duration-2 var(--ease-out)`. Mobile menu panel: `transform-origin: top right` (its trigger); its links stagger with `transition-delay: calc(var(--i) * var(--stagger))` (`--i` set inline server-side). Close is instant (exits faster than entries). Never from `scale(0)`.
- **Icon swap** (copy, theme): both icons stacked in one grid cell; outgoing → `opacity 0; scale(.8); filter: blur(4px)`, incoming → `opacity 1; scale(1); blur(0)`, `--duration-2 var(--ease-out)`.
- **Row arrow:** `translateX(4px)` on row hover, `--duration-1 var(--ease-in-out)`.
- **Page transitions:** wrap the page content in `main` with React `<ViewTransition>` (default crossfade) and add `@view-transition { navigation: auto }` for cross-document loads. `::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--duration-3); animation-timing-function: var(--ease-out) }`. Header and FAB get `view-transition-name: site-header` / `cv-fab` with `animation: none` so chrome never fades. Crossfade only, no slides.
- **No** scroll-triggered reveals, infinite animations, load-time name animation (the old `name-in` keyframes are removed), or animation on keyboard-initiated actions beyond the state change.
- **Reduced motion:**
```css
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after { transition-property: color, background-color, border-color, text-decoration-color, opacity !important; animation: none !important; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```
  Movement (scale, translate, blur) is removed; at most opacity and color fades remain; view transitions are off.

## 8. Accessibility checklist
- [ ] Skip link first focusable, visible on focus, targets `#main`.
- [ ] Landmarks: one `<header>`, one `<nav aria-label>` in the a11y tree at any width (menu panel `hidden` when closed), one `<main id="main" tabindex="-1">`, one `<footer>`. Utility controls are outside `<nav>`.
- [ ] One `<h1>` per page, no skipped levels; on `/` the name is the h1. Heading icons `aria-hidden`.
- [ ] `<html lang>` = `en`/`cs`; language link has `lang` + `hrefLang`, keeps the path.
- [ ] Focus ring 2 px accent, offset 3 px (5.91:1 light, 8.74:1 dark); never hidden under the sticky header or FAB (`scroll-padding-top/bottom`, `scroll-margin-top` on anchors).
- [ ] Targets ≥ 44×44 on touch (nav, toggles, language, buttons, copy, FAB 48), ≥ 24 on fine pointers; no overlapping hit areas.
- [ ] Contrast per §2: text ≥ 4.5:1 and APCA Lc ≥ 60 (body ≥ 75 in light, ≥ 88 for `text`); control boundaries ≥ 3:1. Checked in both themes.
- [ ] State never color-only: current nav = underline + weight + `aria-current`; copy result = icon + live text; links underlined.
- [ ] Icon-only controls (menu, theme, copy, FAB's full name) have `aria-label`; all icons `aria-hidden`; external links announce "opens in new tab".
- [ ] Mobile menu: focus moves in, is trapped, Esc closes, focus returns to the toggle; `overscroll-behavior: contain`.
- [ ] Copy: `aria-live="polite"` result, reverts after ~2 s, failure announced and visible.
- [ ] Images: purposeful alt in the page language; portrait `alt=""` next to the name; explicit dimensions; no CLS (header, FAB, fonts, hydration).
- [ ] Tables use `<th scope>`; lists use `<ul>/<ol>` with `<li>` children.
- [ ] Reduced motion honoured (§7); content visible with JS disabled.
- [ ] No theme flash; theme persists; `theme-color` and `color-scheme` follow the active theme.
- [ ] `forced-colors: active`: buttons, FAB and copy keep a 1 px border (transparent in normal mode) so they stay visible; focus uses `outline`.
- [ ] Test at 320, 375, 768, 1024, 1366, 1920, at 200% zoom, both themes, both languages, keyboard only and axe; no horizontal scroll at 320; cs strings ~25% longer still fit.

## 9. Audit findings resolved (history)
| Section | Resolves |
|---|---|
| 2 Color | F3, F5, V10, F2 |
| 3 Typography | F13, F14, F15 |
| 4 Layout | F21, V2, V6 |
| 5 Header, language, buttons, CV, contact | F4, F6, F9, F10, F22, V3, V6, V7, V9, V12, V13, V16 |
| 5 Projects, experience, skills, footer, 404 | F1, F17, F18, F19, F24, F25, V4, V5, V14, V15, V19, V20 |
| 6 Pages | F15, F16, V1, V2, V8, V9 |
| 7 Motion | F7, F8, V1, V11 |
Open outside this doc: real project screenshots (F20), distinct CV PDFs, Czech proofreading of new strings.
