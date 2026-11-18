# UX pass 2 — implementation plan (approved by Jan)

Binding: `docs/ui-quality-checklist.md` (cited below as §Section), `DESIGN.md` (rewritten first), `CLAUDE.md`.

## Decisions already made
- Portrait: soft squircle (`border-radius` ~28% + `corner-shape: squircle` as progressive enhancement), 1:1, `object-position` on the face. Mobile: centred, 168–192px. Desktop: in the hero grid, top-aligned with the name block. Crop must work at both sizes. Source: `public/images/portrait.webp`.
- Page transitions: React 19.3 `<ViewTransition>` (stable, no flag in Next 16.4) plus CSS `@view-transition { navigation: auto }` fallback. Crossfade only; reduced motion → none.
- Hidden projects: `dev-events` and `raynet-leaderboard` get `kind: "hidden"` in the seed (no delete, no migration: `kind` is a String column). `lib/content.ts` filters them out of every reader (lists, skills usedIn, sitemap); `/[lang]/projects/<hidden-slug>` redirects to `/[lang]/projects`. "Other projects" group and its dictionary strings removed.
- Add `skj-projekt` (school, private repo → no source link, like ZPG). Two-person team project; don't name the teammate. Python skill links to it.
- Skills: Express removed. Git: "used in every project" (both langs). Linux row: "Debian (daily driver); also Mint, Arch, Fedora" / "Debian (každodenně); dále Mint, Arch, Fedora".
- Czech nbsp: one function `nbsp(text, lang)` in `lib/typography.ts`, used for all cs prose (seed-sourced and dictionary), with `lib/typography.test.ts` run by `node --test`.
- Client components stay the four in CLAUDE.md. Mobile CV FAB is CSS-only: `position: sticky` at the bottom of the `<main>` wrapper, so it stops before the footer; `main` gets bottom padding equal to its height + safe-area.
- No DB migration expected. Running the seed writes to the production DB: ask Jan first.

## Components (→ checklist sections)
| Component | Change | Checklist |
|---|---|---|
| `globals.css` | OKLCH tokens (tinted neutral ramp, accent rest/hover/active/subtle, alpha borders), type-scale tokens with `clamp()`, motion tokens (durations/easings), `scrollbar-gutter`, `scroll-padding-top`, `::selection`, `accent-color`, `caret-color`, antialiased, hover in `@media (hover:hover)`, `:active scale(.97)`, `touch-action`, reduced-motion rules, `text-wrap` balance/pretty, underline rules, `sub/sup`, tabular-nums utility | Type system, Typography details, Color palette, Surfaces, Motion, Layout, Interaction |
| `layout.tsx` | `theme-color` meta per theme, `color-scheme`, ViewTransition wrapper, main bottom padding on mobile | Surfaces, Motion, Layout |
| `SiteHeader` / `SiteNav` | Sticky at all widths (safe-area top). Nav: Home, Experience, Projects, Skills, each with lucide icon + label; active = accent underline + 600 weight with reserved bold width (`data-text` ::after). Utility area separate from nav: language (Globe + "English"/"Čeština"), theme toggle, Download CV (desktop, primary). Mobile menu: panel with `overscroll-behavior: contain`, focus trap/restore, entry from `scale(.95)/opacity 0` via `@starting-style` | UX principles, Typography details, Icons, Layout, Interaction, Motion |
| `LangLink` | Globe icon + target language named in itself, no flags, keeps path | UX principles, Icons |
| `ThemeToggle` | Icon swap crossfade (opacity + scale .8→1 + blur 4px→0, 200ms) | Icons, Motion |
| `CvButton` / new `CvFab` (server) | Header primary on desktop; mobile FAB (Download icon + "CV", 48px, bottom-right, safe-area, accent, depth per theme); removed from footer | UX principles, Surfaces, Layout |
| `ContactList` | One row component: icon \| value \| actions column; email + phone copy buttons aligned in a column; LinkedIn/GitHub external | Icons, Interaction, Layout |
| `CopyButton` | Icon-only (Copy→Check) with aria-label, blur crossfade, `aria-live` status, revert ~2s, failure state | Icons, Interaction, Motion |
| Home hero | Mobile: centred squircle portrait 168–192px, name, role, CTAs, `min-height` in `svh` so featured section peeks. Desktop: 8/4 grid, portrait aligned to name block | Images, Layout, Performance (preload LCP) |
| `ProjectRow` / `ProjectArticle` | Subgrid/line-clamp for equal rows, 16:10 thumbnails with inner alpha outline, stack line with icon | Typography details, Images, Icons |
| Projects list + detail | Remove "Other" group; detail "next project" link; hidden slugs redirect | UX principles, content |
| Experience entry | Desktop: title left, dates right on same baseline (tabular-nums); mobile: dates under title; no empty column; section-heading icons | Typography details, Layout |
| Skills | Section-heading icons, Git/Linux text, Express removed | Icons, content |
| `SiteFooter` | Contact list (same component), language, updated; no CV | UX principles |
| `lib/typography.ts` | Czech nbsp + number/unit nbsp + "Jan Zámostný" nbsp; curly quotes/ellipsis/en-dash rules applied in content | Language-aware typography |
| `DESIGN.md` | Rewritten first: OKLCH tokens, type scale, motion tokens, icon rules, header/CTA/language/contact components, new §7 | all |

## Order (small commits on `ux-pass-2`)
1. DESIGN.md update. 2. Content: seed (skj, hidden kinds, skills), content filters, redirect, sitemap, nbsp helper + test. 3. Tokens + base CSS. 4. Header/nav/lang/theme/CV. 5. Contact + copy. 6. Home hero + portrait. 7. Experience, projects, skills, footer. 8. Motion/view transitions. 9. Lint, build, local screenshots, audits. 10. Push, PR with checklist table.
