# DESIGN.md — Jan Zámostný portfolio (direction A "Datasheet", revised)

Single source of truth. Stack: Next 16.4, React 19.3, Tailwind 4.3 (CSS-first). Routes live under `app/[lang]/` (`en`, `cs`). Finding IDs: `F#` = audit.md section 2, `V#` = visual_audit.md.
Not in scope: chip/IC imagery, pin-labelled skills, fake part numbers, icon fonts, framer-motion, iframes.

## 1. Principles
1. Read like a datasheet first page, with no hardware costume: hairline rules, mono metadata, tabular rows. Structure carries information, not decoration.
2. The name is the one loud element (Archivo Expanded 800). Everything else is quiet, left-aligned, ruled.
3. Who / what / how-to-contact is answerable in 5 s at 375x812: name, role, CV, Contact above the fold.
4. Every action is visibly an action: filled or outlined buttons with icon + label, underlined text links, designed focus ring.
5. Content is visible with no JS and no animation. Server components by default; client JS only for the menu toggle, theme toggle and copy button.

## 2. Color tokens
Ready to paste into `app/globals.css`. Default is light "paper"; dark "solder mask" applies when the OS prefers dark, unless the user forced a theme with the header toggle (`data-theme` on `<html>`, set by a tiny inline script in `<head>` from `localStorage` before paint).

```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  /* light "paper" (default) */
  --color-bg: #F3F4F0;
  --color-surface: #FFFFFF;
  --color-text: #14171A;
  --color-muted: #596067;
  --color-border: #C5CBC4;          /* hairlines, decorative only */
  --color-border-strong: #7A827B;   /* outlines of buttons/inputs, >=3:1 */
  --color-accent: #0A6B47;
  --color-accent-contrast: #FFFFFF;
  --color-accent-hover: #085A3B;    /* 8.28:1 vs #FFFFFF */
  --color-accent-active: #064A31;   /* 10.34:1 vs #FFFFFF */
  --color-focus: var(--color-accent);

  --font-sans: var(--font-archivo), system-ui, sans-serif;
  --font-mono: var(--font-redhatmono), ui-monospace, monospace;

  --breakpoint-sm: 40rem;   /* 640 */
  --breakpoint-md: 48rem;   /* 768 */
  --breakpoint-lg: 64rem;   /* 1024: inline nav starts here */
  --breakpoint-xl: 80rem;   /* 1280 */
  --breakpoint-2xl: 96rem;  /* 1536 (remove v3 xs / xxl) */
}

@layer base {
  :root { color-scheme: light; }
}
/* dark: OS preference unless the user forced light */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme=light]) {
    color-scheme: dark;
    --color-bg:#0F1D17; --color-surface:#16291F; --color-text:#E9EFE9; --color-muted:#9DB2A6;
    --color-border:#2E4A3B; --color-border-strong:#5F8572;
    --color-accent:#D9B44A; --color-accent-contrast:#1A1405;
    --color-accent-hover:#E6C566; --color-accent-active:#C29F38;
  }
}
/* dark: explicit user choice (identical values, keep in sync) */
:root[data-theme=dark] {
  color-scheme: dark;
  --color-bg:#0F1D17; --color-surface:#16291F; --color-text:#E9EFE9; --color-muted:#9DB2A6;
  --color-border:#2E4A3B; --color-border-strong:#5F8572;
  --color-accent:#D9B44A; --color-accent-contrast:#1A1405;
  --color-accent-hover:#E6C566; --color-accent-active:#C29F38;
}
```
Tokens are plain CSS variables, so utilities (`bg-bg`, `text-muted`, `border-border-strong`, `bg-accent`) flip with no `dark:` prefixes. Use `@theme` (not `@theme inline`) so the overrides take effect. Hover/active label contrast (measured): `#085A3B` 8.28:1 and `#064A31` 10.34:1 with white; `#E6C566` 10.94:1 and `#C29F38` 7.25:1 with `#1A1405`.

Measured contrast (WCAG 2.x, from audit.md section 4A):
| Pair | Light | Dark |
|---|---|---|
| text on bg / surface | 16.29 / 17.99 | 14.89 / 13.12 |
| muted on bg / surface | 5.77 / 6.38 | 7.74 / 6.82 |
| accent on bg / surface (links, focus ring, small text) | 5.93 / 6.55 | 8.75 / 7.71 |
| accent-contrast on accent (primary button label) | 6.55 | 9.23 |
| border-strong on bg (button outline, input) | 3.58 | 4.21 |
| border on bg (hairlines, decorative, exempt) | 1.50 | 1.79 |
Rules: never put muted text on border-colored fills; never use `border` color for anything a user must perceive (use `border-strong`). Hover/active states keep label contrast >= the base state. Gold in dark is the accent for links, buttons and ring only; no gradients, no shadows besides none.

## 3. Typography
```ts
// app/fonts.ts
import { Archivo, Red_Hat_Mono } from "next/font/google";
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],   // Czech: ě š č ř ž ý á í é ú ů ď ť ň
  axes: ["wdth"],                    // variable width; weight omitted => variable wght
  variable: "--font-archivo",
  display: "swap",
});
export const redHatMono = Red_Hat_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-redhatmono",
  display: "swap",
});
// <html lang={lang} className={`${archivo.variable} ${redHatMono.variable}`}>
```
Build fails on an unsupported subset, which verifies latin-ext. Verify no fallback glyphs for "řůěčšž" in both fonts at build (F13). Do not request explicit weights.

Usage (Tailwind 4 `font-stretch-*`; keep `font-variation-settings` out):
| Role | Family | Width | Weight |
|---|---|---|---|
| Name (h1 on `/` only) | Archivo | expanded `font-stretch:125%` | 800 |
| Page h1 (inner pages), h2 | Archivo | semi-expanded 112% | 700 |
| h3, project names | Archivo | normal 100% | 650 |
| Body, UI | Archivo | normal 100% | 400 (strong 600) |
| Table column headers | Archivo | semi-condensed 87.5% | 600 |
| Eyebrow, stack lines, dates, characteristics labels, footer meta | Red Hat Mono | n/a | 400 (values 500) |

Scale (rem; line-height; tracking). Mobile = base, desktop = from `lg`.
| Token | Mobile | Desktop | LH | Tracking |
|---|---|---|---|---|
| name (display) | clamp(2.25rem, 12vw, 3.25rem) | 5.5rem | 1.0 | -0.02em |
| h1 inner | 2rem | 3rem | 1.1 | -0.015em |
| h2 | 1.5rem | 2rem | 1.2 | -0.01em |
| h3 | 1.125rem | 1.25rem | 1.3 | 0 |
| lead (role line) | 1.0625rem | 1.375rem | 1.5 | 0 |
| body | 1rem | 1.0625rem | 1.6 | 0 |
| mono label/meta | 0.8125rem | 0.875rem | 1.5 | 0.04em (eyebrow 0.06em) |
Prose max-width `65ch`; never exceed 75ch. The eyebrow is uppercase mono (approved); all other labels are sentence case. No single-word accent color or italic inside headlines. Verify the name does not overflow at 320 px ("Zámostný" is the widest word; allow `overflow-wrap:normal`, reduce `font-stretch` to 112% below `sm` if it clips).

## 4. Spacing, layout, grid
- Base unit 4 px (Tailwind default). Section rhythm: `py-12` mobile, `py-20` from `lg`. Row padding in tables: `py-4` mobile, `py-5` desktop (row min height 56 px).
- Container: `mx-auto w-full max-w-[72rem] px-4 sm:px-6 lg:px-8` (1152 px). Prose column 65ch. Detail-page content grid max `64rem`.
- Grid: 4 columns mobile, 12 columns from `lg`, gap `gap-x-6`. Home hero: text spans 8 cols, portrait 4 cols (desktop). Project list rows span all 12: name 4 | stack 6 | arrow 2 (right-aligned).
- Corners: `rounded-sm` (2px) on buttons and images; `rounded-none` on tables/rows. No shadows. No cards-in-cards. Hairlines are `1px solid var(--color-border)`.
- Alignment: everything left-aligned; no centered text blocks.
- Breakpoints: see tokens. Mobile-first only; no custom breakpoints below `sm`.

## 5. Components
Shared interaction tokens (put in `@layer components`):
```css
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; border-radius: 2px; } /* accent >=5.9:1 on bg, F5, V10 */
a:not([class]), .link { color: var(--color-text); text-decoration: underline; text-underline-offset: .2em; text-decoration-thickness: 1px; }
.link:hover { color: var(--color-accent); text-decoration-thickness: 2px; }
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; min-height:2.75rem; padding:.625rem 1.125rem; border-radius:2px; font-weight:600; transition: background-color .12s, color .12s, border-color .12s; }
.btn svg { width:1.125rem; height:1.125rem; flex:none; }
.btn-primary { background:var(--color-accent); color:var(--color-accent-contrast); border:1px solid var(--color-accent); }
.btn-primary:hover { background:var(--color-accent-hover); border-color:var(--color-accent-hover); }
.btn-primary:active { background:var(--color-accent-active); transform: translateY(1px); }
.btn-secondary { background:transparent; color:var(--color-text); border:1px solid var(--color-border-strong); }
.btn-secondary:hover { border-color:var(--color-text); background:var(--color-surface); }
.btn-secondary:active { background:var(--color-border); transform: translateY(1px); }
```
Buttons: <a> for navigation/download, <button> for actions. Icon (lucide, `aria-hidden`) + visible label always; >=44 px tall; stacked full width below `sm`, inline row from `sm`. Disabled is not used.

**Header / nav** (server `SiteHeader`; only `MenuToggle` and `ThemeToggle` are client leaves).
- Bar: height 56 px mobile / 64 px desktop, bottom hairline, `bg-bg`, not sticky on mobile (saves viewport), sticky from `lg`.
- Left: wordmark "Jan Zámostný" (Archivo 700, link to `/{lang}`, 44 px high hit area). No logo graphic.
- Below `lg` (this includes 768 px, V6): a `<button type="button" aria-expanded aria-controls="site-menu" aria-label="Menu">` (44x44) toggles `#site-menu`; panel is full-width under the bar, `bg-bg`, hairline top, rows 48 px tall (links), lang switch and theme toggle as the last row; closes on Esc, on route change and on link click; focus returns to the button. Panel is hidden with the `hidden` attribute (not just visually), so there is one nav in the accessibility tree (V9). No scroll lock needed (panel in flow, pushes content).
- From `lg`: single inline `<nav aria-label="Main">` to the right: Experience, Projects, Skills (links 44 px tall, `px-3`), then lang switch, theme toggle. No overlap is guaranteed because the toggle shows below 1024 and items are `shrink-0` with a `gap-1` flex.
- Current page: `aria-current="page"` + 2px accent underline `underline-offset-8`; not color-only.
- Language switch: `<Link href={altPath} hrefLang="cs" lang="cs">Čeština</Link>` (label is the target language in its own language, `aria-label` not needed), 44 px high, a real link; preserves the current path.
- Theme toggle: `<button aria-pressed>` with sun/moon icon and sr-only label ("Dark theme" / "Tmavý režim").

**Featured-project row** (home and anywhere a short list is needed): `<li>` containing one `<a>` (whole row clickable, stretched).
```
Name (h3, Archivo 650)  |  mono stack line (muted)  |  arrow icon
```
Hairline below each row (top hairline on first). Mobile: name on line 1, stack line below (wraps), arrow right. Hover: arrow shifts 4 px, name underlined, row bg `surface`; active: bg `border`. Focus: ring around the row. Arrow is `aria-hidden`; link text is the name; stack text is inside the link so it is read. Arrow means "opens detail page" (external links use an "opens in new tab" suffix icon + sr-only text).

**Project card** (`/projects` list): not a card grid with shadows. Each project is a ruled `<article>` block:
- Left (desktop 5 cols): screenshot 16:10, `rounded-sm`, 1px `border`, `next/image` with `sizes="(min-width:1024px) 40vw, 100vw"`, real alt (what the screenshot shows). If no screenshot, omit the image (no placeholder). No iframes (F1).
- Right (7 cols): h2 name (link to detail page), one-sentence summary, the characteristics table (see detail), then text link "Source" / "Live site" (underlined).
- Group headings: "Work projects" and "School projects" (`kind: "work" | "school"` from data, F19). Work block shows `Client` and `Role` rows instead of Language/Libraries/Platform where those are not applicable.

**Characteristics table** (project detail, project card): `<table>` with `<th scope="row">` labels, hairline between rows, no zebra, no outer border.
| Row | Label (Red Hat Mono, muted, 8rem col) | Value (Red Hat Mono 500 / link) |
|---|---|---|
| Language | Language / Jazyk | `C++17` |
| Libraries | Libraries / Knihovny | comma-separated text |
| Platform | Platform / Platforma | `Linux, OpenGL 4.6` |
| Source | Source / Zdroj | underlined link "github.com/…" |
Work projects: replace with Client / Klient, Role / Role (+ Stack, Live site). Omit empty rows. Mobile: label above value (stacked), desktop: side by side.

**Experience entry** (`<ol>` > `<li>`, valid list markup): grid 4+8. Left: mono date range, localized with `Intl.DateTimeFormat` ("Jun–Oct 2024" / "čvn–říj 2024"; one format everywhere, V15). Right: h3 role, company (link if public), 2–3 bullets (`max-w-prose`), mono stack line, "Related projects" text links. Hairline between entries; no dots or vertical line. Courses ("Udemy React, 70 h") go to a separate "Courses" `<h2>` section below Education/Work.

**Skills** (`/skills`): no chips, no icons, no tiles. One `<section>` per group with h2 (Languages, Graphics, Web & backend, Data & ML, Tools, Spoken languages). Each is a hairline-ruled `<table>`: Skill (Archivo 600) | Where used (text links to the projects/experience; plain text if none). No proficiency bars or invented levels (F17, V14). Spoken languages show full terms ("English, Cambridge C2 Advanced"). Include Python, C++, OpenGL, CMake, Git. Distros collapse into one row "Linux (Debian)".

**Contact block** (`<section aria-labelledby>` on home and in footer): rows of label + value, each a real link:
`Email` -> `<a href="mailto:…">address</a>`; `Phone` -> `<a href="tel:+420…">+420 …</a>`; `LinkedIn` -> text link "linkedin.com/in/…" (`target=_blank rel="noopener"` + sr-only "opens in new tab"); `GitHub` -> "github.com/JaZafier00716". Address and number are visible text, never hover-only (F9, V3). Optional `CopyButton` (client leaf) next to email: secondary small button 44 px, label "Copy" / "Kopírovat", feedback in an `aria-live="polite"` span ("Copied" / "Zkopírováno" from dictionary); handle `writeText` rejection by showing "Copy failed".

**Footer** (`<footer>`, hairline top, `py-10`): left: contact rows (email, phone, LinkedIn, GitHub) and the CV link; right: language switch + "Last updated {Month YYYY}" in mono. Copyright line in mono muted. Present on every page (F25, V20).

**CV download**: files `public/cv/jan-zamostny-cv-en.pdf`, `jan-zamostny-cv-cs.pdf` (must differ, F10); URL chosen by `lang`. `<a class="btn btn-primary" href download>` with Download icon and label "Download CV" / "Stáhnout CV", with mono meta "PDF, 131 KB" (size from `fs.stat` at build). No `target=_blank` together with `download`. Also linked from footer and the experience page header. The download icon never animates.

**404/empty**: `not-found.tsx` and unknown slugs return real 404 (V4); text says what was not found and links to Projects and Home.

## 6. Page layouts
Order inside every page: skip link, `<header>`, `<main id="main">`, `<footer>`. One `<h1>` per page.

**`/{lang}` (home)**
```
mono eyebrow: STUDENT · VŠB-TUO · OSTRAVA            [photo 88px mobile]
Jan Zámostný   (h1, name, Expanded 800, 2 lines on mobile)
One-sentence role line (muted, max 40ch mobile / 52ch desktop)
[ Download CV ]  [ Contact ]
-----------------------------------------------
Featured projects  (h2)
Name | stack line | ->      x3-4 rows, hairline-ruled
View all projects (text link, underlined)
-----------------------------------------------
Contact (h2, id="contact")  rows as in 5.
```
- `Contact` button is an in-page link to `#contact` with Mail icon; `Download CV` is the primary.
- 375x812 budget: header 56 + eyebrow 24 + name 90 + role ~77 + two stacked buttons 108 + gaps ~96 = ~450 px, so buttons end by y~520 even with the 88 px photo above the eyebrow (~610 worst case). The photo must never exceed 96 px on mobile; on `lg` it sits in the right 4 columns, 320 px wide, `aspect-[3/4]`, cropped head and shoulders (F16), `priority`, AVIF, `alt="Jan Zámostný"` (or `alt=""` if the name is adjacent and redundant).
- Desktop: text left (8 cols), photo right top-aligned; buttons in a row; featured rows below at full width.

**`/{lang}/experience`**: h1 "Experience"/"Zkušenosti", one-line intro, work `<ol>` entries, then "Education" and "Courses" h2 sections (same entry component), then CV button (secondary) at the end.

**`/{lang}/projects`**: h1, intro line, "Work projects" h2 + articles, "School projects" h2 + articles. Every project links to its detail page (internal); external links live on the detail page and as "Source" in the card.

**`/{lang}/projects/[slug]`**: `generateStaticParams`, `generateMetadata`, `notFound()` for unknown slugs. Layout: breadcrumb text link "Back to projects" (top, underlined, ArrowLeft icon); h1 project name (inner scale); lead summary; screenshot (full width, 16:10, `alt`); characteristics table; "Description" prose (65ch) with problem, what I built, role; buttons: primary "View source" / "Open live site" (Github/ExternalLink icon), secondary "All projects". Work projects: Client and Role rows are first in the table.

**`/{lang}/skills`**: h1, grouped tables (5). Single column; tables span the container, "Where used" column hidden into a second line below `sm`.

## 7. Motion
- All content is rendered visible in HTML and CSS. **No `opacity:0`, `translate` or `visibility:hidden` initial states anywhere** (F8, V1). No JS-gated reveals, no scroll-triggered effects, no infinite animations (F7, V11).
- Allowed: color/background/border transitions (<= 150 ms), 4 px arrow shift on row hover, `active` 1 px press. Optionally one page-load nudge: the name fades `opacity .6 -> 1` over 300 ms via `@keyframes`, wrapped in `@media (prefers-reduced-motion: no-preference)`, with the final state as the default (content correct if the animation never runs).
- Global safety: `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }`.
- Menu open/close is instant (no height animation).

## 8. Accessibility checklist
- [ ] Skip link: first focusable element, `<a href="#main">`, visible on focus (surface bg, accent border, 44 px).
- [ ] Landmarks: one `<header>`, one `<nav aria-label>`, one `<main id="main" tabindex="-1">`, one `<footer>` on every page; only one nav in the a11y tree at any width.
- [ ] One `<h1>` per page, no skipped levels. On `/` the name is the h1.
- [ ] `<html lang>` = `en` / `cs`; language-switch link has `lang` and `hrefLang`.
- [ ] Focus ring `2px solid var(--color-focus)`, offset 3 px; ratio 5.93:1 (light), 8.75:1 (dark), >= 3:1 required. Never `outline:none` without replacement.
- [ ] Targets >= 44x44 px: nav links, menu toggle, theme toggle, lang switch, buttons, copy button, footer links (padding, not just glyph size).
- [ ] Text contrast >= 4.5:1 everywhere (see table); UI boundaries use `border-strong` (>= 3:1).
- [ ] Links in running text underlined; state never color-only (`aria-current` plus underline).
- [ ] Icon-only controls have names (the menu and theme toggles); all other icons `aria-hidden`; external links announce "opens in new tab".
- [ ] Images: meaningful `alt` in the page language (no "My Picture"); decorative `alt=""`.
- [ ] Tables use `<th scope>`; lists use `<ul>/<ol>` with `<li>` as direct children.
- [ ] Keyboard-only pass and axe run on both themes and both languages at 375, 768, 1280; no horizontal scroll at 320.
- [ ] `forced-colors`: borders use `currentColor`-safe system colors (no reliance on background-only cues).

## 9. Audit findings resolved
| Section | Resolves |
|---|---|
| 2 Color, global base rules | F3 (default text color), F5 and V10 (focus ring), F2 (no `bg-opacity` / `flex-shrink`; use `/20` and `shrink-0`) |
| 3 Typography | F13 (latin-ext, variable font), F14 (no icon font), F15 (one h1, hierarchy) |
| 4 Layout | F21 (no `xs`, mobile-first), V2 and V6 (hero fold budget, 768 overlap) |
| 5 Header / nav, language switch | F6, F22, V6, V7, V9, V12, V13 |
| 5 Buttons, CV, contact | F4, F9, F10, V3, V16, V2 |
| 5 Project card/detail/rows | F1, V5 (no iframes, screenshots), F19, F24, F25, V4, V19 |
| 5 Experience, skills | F17, F18, V14, V15 |
| 5 Footer, 404 | F25, V20, V4 |
| 6 Pages | F15, F16, V1, V2, V9, V8 (per-page `generateMetadata`; also needs `[lang]` routes, sitemap, robots, OG image per audit step 11) |
| 7 Motion | F7, F8, V1, V11 |
| 8 Checklist | F4, F5, F6, F15, F16, V7, V9, V10, V13 |
Open items outside this doc: real project screenshots (replace `editor.png`, F20), distinct regenerated CV PDFs, `lang` validation (F11), Czech typo fixes (V17), investigate the 403/404 console errors (V18).
