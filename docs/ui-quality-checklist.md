# UI quality checklist

The bar every component and page must meet. Where a feature is not supported in every browser, use it as progressive enhancement with an acceptable fallback. The sources are listed at the end; when a case isn't covered here, consult them before improvising.

## UX principles (apply first, before any detail)
- Don't make me think (Krug): every page is self-evident at a glance. Follow web conventions (Jakob's law): logo/name links home, nav at the top, current page marked, links look like links.
- One primary action per view (Download CV). Everything else is visually quieter. Few choices per decision (Hick's law); big, close targets for frequent actions (Fitts's law).
- Visual hierarchy by weight and color first, size second. De-emphasize secondary info (muted color, lighter weight) instead of enlarging the important thing. Labels are a last resort; the data should speak (Refactoring UI).
- Group by proximity: more space between groups than inside them. Chunk long lists into scannable groups (Miller's law).
- Feedback within 100ms for any action, and under 400ms for anything that keeps flow (Doherty threshold). Every state is designed: hover, focus, active, empty, error, loading.
- Start with generous whitespace and remove it, rather than adding space to a cramped layout.
- Every page offers a clear next step (a project → its source / the next project; experience → contact).

## Consistency (one interaction language)
- Every interactive element of the same kind behaves the same everywhere. Define exactly two hover patterns: (a) text links change underline or colour; (b) clickable containers (cards, rows, menu items) get a surface background. Never mix the two on neighbouring elements of the same role.
- Clickable containers always have inner padding at rest, so a hover background never puts text against its edge. If a row has no padding at rest, it gets no background on hover.
- Every clickable element shows `cursor: pointer`. Tailwind 4 resets buttons to `cursor: default`, so restore it globally for `button:not(:disabled)`, `[role=button]`, `summary` and `label[for]`.
- Each piece of content appears once per page. No contacts in both a section and the footer, and no two download buttons visible at the same time.
- Spacing, radius, border and icon size come only from tokens. The same component looks identical on every page.

## Recruiter-first content
- Within 10 seconds the hero answers: name, role and stack, location or remote, current position, and what Jan is looking for next. No vague labels like "passionate developer".
- Projects read as short case studies: problem, Jan's role, stack, one hard decision and its trade-off, the result (real, explainable numbers only, never invented), and what he'd do next. 3–5 featured, each with a screenshot, a one-line outcome, and code and live links where public.
- Show skills through projects, never as skill bars or percentages.
- Site, CV and LinkedIn agree on names, dates and titles.
- One primary call to action (the CV) and one clear way to get in touch.

## Type system
- Two families maximum (Archivo for UI and headings, Red Hat Mono for metadata), and at most three weights.
- A modular type scale (e.g. ratio 1.2–1.25) defined as tokens, with no off-scale sizes.
- Body text 16–20px. Line height about 1.4–1.6 for body (Butterick: 120–145%), tighter (1.05–1.2) for large headings.
- Line length 45–90 characters (Butterick); cap prose at about 65ch.
- Tighten letter-spacing slightly on large display text, and add about 5–10% tracking to all-caps and small-caps text.
- Never underline for emphasis; use weight or italic. Underlines are only for links.

## Typography details
- Size headlines fluidly with `clamp()`, so text never jumps at breakpoints.
- Headings use `text-wrap: balance`; body text uses `text-wrap: pretty` (no widows or orphans).
- Center text truly in buttons, pills and badges with `text-box: trim-both cap alphabetic`. The fallback is padding that looks right without it.
- Reserve bold width wherever weight changes on hover or active (nav, tabs, filters): render a hidden bold copy (`::after { content: attr(data-text); font-weight: 700; visibility: hidden; height: 0; overflow: hidden }`) so the width never shifts.
- `sub, sup { line-height: 0 }` so they don't push rows apart.
- Use `font-variant-numeric: tabular-nums` for dates, numbers and anything aligned in columns.
- Use small caps for loud acronyms (QA, CV, VŠB, CSS): `font-variant-caps: all-small-caps` plus slight letter-spacing, but only if the font has real small caps. Fake ones look worse than capitals.
- Underlines are never broken by descenders: set `text-underline-offset` large enough to clear g, y and p (about 0.25–0.3em, tuned per font), `text-decoration-skip-ink: none`, and an explicit `text-decoration-thickness`. Or draw the underline as an animated background line under the text box. Check it on hover too.
- Allow `hyphens: auto` in narrow columns (needs a correct `lang` on the element), never in headings.
- Use `line-clamp` for titles and summaries in repeated containers so cards keep equal heights. Keep the full text reachable through a `title` attribute or the detail page. Prefer `subgrid` so title, meta and body rows align across cards.
- Truncate long filenames in the middle, keeping the extension: `jan-zamos…-cs.pdf`.
- Mark names, brands and code tokens with `translate="no"`.
- Set `-webkit-font-smoothing: antialiased` on the root. Load only the font weights and axes actually used.

## Language-aware typography
- English uses curly quotes “ ” and the apostrophe ’; Czech uses „ “ and ’. Never straight quotes in prose or headings.
- Use … not three dots. Ranges use an en dash: "2023 – 2024" in Czech, "2023–2024" in English.
- Czech rule: a non-breaking space after one-letter prepositions and conjunctions (v, k, s, z, o, u, a, i) so they never end a line. Automate it in a text helper for cs content.
- Non-breaking space between a number and its unit, and inside "Jan Zámostný".
- Format dates and numbers with `Intl` for the page locale.

## Color palette (minimal)
- Design in grayscale first; add color last.
- Neutrals do most of the work: one neutral ramp of about 8–10 steps, slightly tinted toward the brand hue (never pure #000 or #fff; use near-black and near-white).
- One accent hue with a few shades (rest, hover, active, subtle tint). The accent is scarce, roughly 10% of the surface: CTAs, the active state, key links. Its power comes from rarity.
- Semantic colors (success, error, warning) only where a state actually needs them, never as decoration.
- Define every shade up front as a token. No ad-hoc lighten() or darken() and no one-off hex values in components.
- Each theme gets its own tuned ramp; dark mode isn't an inverted light mode.
- Never rely on color alone for meaning; pair it with an icon or text.

## Color, surfaces, depth
- Write all tokens in OKLCH, and interpolate gradients `in oklch`.
- Borders use alpha (`oklch(L C H / 0.12)`), not solid hex, so they blend over any surface. Tint borders and shadows toward the background hue.
- Dark mode: show depth with lighter surfaces (lighter = closer to the user), one step per elevation level, not with shadows. Light mode: layered shadows with at least an ambient and a direct layer.
- Nested radii are concentric: inner radius = outer radius − padding. A child is never rounder than its parent.
- Images get a subtle alpha 1px inner outline for edge definition.
- Images with white backgrounds use `mix-blend-mode: multiply` in the light theme. In dark mode, multiply makes them vanish, so put them on a light surface tile instead.
- Hover, active and focus states have more contrast than the rest state.
- Set `color-scheme` on `<html>` per theme, `<meta name="theme-color">` per theme, and brand-colored `::selection`, `accent-color` and `caret-color`.
- Check contrast with APCA as well as WCAG 2.
- Fade edges of horizontal scrollers and carousels with `mask-image`. For fades into dark colors, use a background gradient instead to avoid banding.

## Images
- Each context uses one aspect ratio (all project thumbnails 16:10, the portrait 1:1) with one treatment: same radius, outline and background.
- Screenshots are cropped to the meaningful region, at the same zoom level and in the same theme. Remove cookie banners and personal data, and never bake text into images.
- Portrait: a real, recent photo, cropped so the eyes sit around the upper third, with a neutral background that works in both themes.
- Alt text describes the purpose, not "image of". Purely decorative images use `alt=""`.
- Serve modern formats (AVIF/WebP) at the right sizes, with explicit dimensions. No image weighs more than it needs to.
- No generic stock imagery.

## Icons
- Use one icon set across the site. Stroke width matches the adjacent text weight: about 1.5px beside 400, 2px beside 600.
- Size icons in `em` so they follow the text, and align them optically (±1px), not just geometrically.
- Decorative icons get `aria-hidden`; icon-only buttons get an `aria-label`.
- Icon swaps (copy → check, sun → moon) crossfade with opacity plus a small scale (0.8 → 1) and a blur (4px → 0), over about 200ms.

## Layout
- Proximity ("internal ≤ external"): space inside a group < space between groups < space to the container edge, each level about 1.5–2× the one below, all from the spacing scale. Near-equal gaps are a bug: the eye can't tell what belongs together.
- A heading has more space above it than below it, so it belongs to the content it introduces.
- On mobile, use `svh` for hero min-heights (no jump when the URL bar moves) and `dvh` for full-height overlays. Never plain `vh`.
- Fixed and sticky elements respect `env(safe-area-inset-*)`.
- `scrollbar-gutter: stable`, so pages with and without a scrollbar don't shift.
- `scroll-margin-top` on anchor targets, so the sticky header never covers them or the focused element.
- Every element aligns to the grid, a baseline, an edge or its optical center. No floating elements, and no empty space that reads as "something didn't load".
- Images have explicit `width` and `height` or `aspect-ratio`, and portraits use `object-position` to crop on the face.
- Use container queries for components that appear at different widths.
- Test at 320, 375, 768, 1024, 1366 and 1920 px, at 200% zoom (reflow), and with long content. Czech strings run about 20–30% longer.
- On mobile, the next section peeks above the fold so the page reads as scrollable.

## Motion
- Durations 150–300ms. Use ease-out for enter and exit, `cubic-bezier(0.23, 1, 0.32, 1)`; ease-in-out for movement on screen; `ease` for color and hover. Never ease-in on UI.
- Animate only `transform`, `opacity` and `filter`. Never `transition: all`; list the properties.
- Nothing appears from nothing: enter from `scale(0.95)` with `opacity: 0`, never `scale(0)`. Set `transform-origin` where the motion starts (menus from their trigger).
- Press feedback: `:active { transform: scale(0.97) }`.
- Interactive animations must be interruptible (transitions, not keyframes).
- Use `@starting-style` for entry and View Transitions for page changes. Stagger lists by 30–60ms; exits are faster and subtler than entries.
- Content is visible without JavaScript. Never server-render `opacity: 0`.
- Under `prefers-reduced-motion`, remove movement (keep at most opacity), and use `scroll-behavior: smooth` only when motion is allowed.
- The first tooltip in a group shows after a delay; neighbouring tooltips show instantly.

## Interaction
- Navigation uses `<a>`/`<Link>` (Cmd/Ctrl-click works); actions use `<button>`. Every element that looks interactive is interactive.
- Hit targets are at least 44px on touch and 24px on fine pointers. Extend small icons with a pseudo-element.
- Focus uses `:focus-visible` rings that are never covered by sticky or fixed elements.
- Put hover styles inside `@media (hover: hover)`. Set `touch-action: manipulation` and a designed pressed state instead of the tap highlight.
- Copy buttons announce the result through `aria-live="polite"`, swap the icon, and revert after about 2s.
- No theme flash on load, no layout shift on hydration, scroll is restored on Back, and the theme choice persists.
- Overlays and the mobile menu use `overscroll-behavior: contain` and trap and restore focus.

## Performance
- Mobile targets: CLS 0, LCP under 2.5s, INP under 200ms.
- Preload the LCP image (the portrait) and lazy-load the rest. Use `next/image` with correct `sizes`, serving AVIF or WebP.
- No layout shift from fonts (`next/font` size-adjust), the sticky header or the bottom bar.

## Sources to learn from
- Books: *Refactoring UI* (Wathan & Schoger); *Practical Typography* (Butterick, free at practicaltypography.com); *The Elements of Typographic Style* (Bringhurst); *Don't Make Me Think* (Krug); *Laws of UX* (Yablonski, lawsofux.com); *The Design of Everyday Things* (Norman).
- Design engineers: Rauno Freiberg, "Invisible Details of Interaction Design" (rauno.me); Emil Kowalski (emilkowal.ski, animations.dev); Josh W. Comeau (joshwcomeau.com); Ahmad Shadeed (ishadeed.com); Adam Argyle (nerdy.dev).
- Guidelines: Vercel Web Interface Guidelines (vercel.com/design/guidelines); jakubkrehel/make-interfaces-feel-better; web.dev (Core Web Vitals, accessibility); Apple Human Interface Guidelines (typography, motion).
