# Visual / UX audit: https://jan-zamostny.vercel.app/ (2026-11-17)

Method: built-in browser, read-only. Viewports 375x812, 768x1024, 1366x768. Both languages sampled (CS default via cookie, then EN).
Caveat: the browser pane is a background tab, so screenshots often caught the page before entrance reveals and some timing numbers may differ from a foreground browser.

## Prioritized findings

| # | Sev | Page | Viewport | Issue | Evidence | Proposed fix |
|---|-----|------|----------|-------|----------|--------------|
| 1 | high | all | all | Content is invisible on first paint. Wrapper divs have opacity 0 (scroll/entrance reveal) | First screenshots of /, /projects, /experience showed only header (+ "Profesionalni projekty" heading). On mobile `/` h1 and photo ancestors opacity 0.00 at load. On /experience wrapper opacity stayed 0.00 2.5 s after load. | Render above-the-fold content visible by default (SSR opacity 1); use reveal only below fold, with a no-JS and reduced-motion fallback |
| 2 | high | / | 375 | Who/what/contact not clear in 5 s on mobile. Photo (298px) first, h1 at y=493 is the generic "Welcome to my page", name at ~y560, contact icons at y=857-1097 and CV button at y=1188-1285 on an 812px screen | measured tops of h1, contact buttons, CV link | Put name + role as the h1 ("Jan Zamostny, Computer Science student / software engineer"), shrink photo, put CV + contact above fold |
| 3 | high | / | all | Contact is hidden behind 4 unlabeled icon buttons. Phone/email are `<button>` (60x60) showing text only on hover/tooltip; LinkedIn and GitHub `<a>` have no accessible name, no aria-label/title | read_page: links with empty name; buttons have no href (no mailto:/tel:) | Visible email text + mailto:/tel: links; aria-label on icon links |
| 4 | high | /projects, /projects/<slug> | all | Project browsing is broken. Cards (`article` wrapped in `<a target=_blank>`) go straight to external GitHub/company sites; /projects/<slug> detail pages exist only for school projects (tetris etc.) and are unreachable from the UI. Detail page is image + 1 sentence + "Zpet na projekty". /projects/csg-web returns HTTP 200 with a Next shell/soft 404 | links collected: all hrefs external; fetch /projects/tetris 200, /projects/1 404, /projects/csg-web 200 empty | Link cards to detail pages (problem, stack, role, screenshots, repo/live links); add real 404 status |
| 5 | high | /projects | all | 3 "Live preview" iframes of third-party sites (csg.com, skladon.com, solidsun.cz) are lazy-loaded, sandboxed with allow-same-origin+allow-scripts, pointer-events none; Skladon preview renders black/blank | screenshot: Skladon tile black; /projects transfer 813 KB vs 328 KB on home; page 3415 px tall at 375 | Replace with static screenshots (WebP) with alt; keep a "visit site" link |
| 6 | high | header | 768 | Nav overlaps language button. Nav links span x=192-749; language button x=680-740; hamburger not shown until <768 | getBoundingClientRect: Projekty 633-749 vs EN 680-740 | Move hamburger breakpoint to <1024 or reduce gap/size |
| 7 | high | header | 375 | Hamburger is an `svg` with onclick: role none, not focusable, no aria-expanded; opening gives flat pure-black (#000) panel, 32px-high links, EN button floating beside "Home", no backdrop/scroll lock/Esc | read_page "generic Open menu"; link heights 32; screenshot | Real `<button aria-expanded aria-controls>`, 48px rows, dark theme color, language switch as own row, close on route change/Esc |
| 8 | med | all | all | Page titles/metadata identical: title "Jan Zamostny" on every page, description "Landing page", no og:*, no twitter:card, no canonical, no robots.txt (404), lang attr OK (en/cs) | meta read on all 5 URLs | Per-page `<title>` ("Projects | Jan Zamostny"), real description per language, og:image, hreflang |
| 9 | med | all | all | No skip link; no `<main>` on /experience, /skills, /projects (main present only on /); no h1 on those pages (start at h2); desktop and mobile navs are both in the DOM, so every link/EN button is read twice | landmarks count: main 0; nav 2; headings listing | Add skip link, `<main>`, one h1 per page, render one nav (or aria-hidden/inert the hidden one) |
| 10 | med | all | all | Focus indicator is the browser default thin outline (rgb 229,151,0 "auto" ~1px), nothing designed; hard to see on dark gradient, no focus-visible on cards | getComputedStyle after Tab: outline auto 0.9px | Custom :focus-visible ring (2-3px accent, offset) on links, cards, buttons |
| 11 | med | all | all | Animations: no prefers-reduced-motion rules at all; 14 running animations on /, including infinite `pulse` (2s) on a div and infinite `bounce` (3s) on the CV download icon next to the main CTA; dashed ring around photo | 0 reduced-motion media rules in stylesheets; getAnimations() shows infinite iterations | Wrap in `@media (prefers-reduced-motion: no-preference)`; stop infinite bounce on CTA |
| 12 | med | header | all | Language switch: button labelled with target language ("CS" when site is EN, "EN" when CS), 53x40 px (<44), no aria-label/lang. Behaviour: sets cookie lang=cs, full page reload to same URL, html lang updates, persists across pages (works) but no flash-free SSR check, no ?lang or /cs URL so it can't be linked/indexed | cookie lang=cs; navigation type = reload | Keep cookie but add accessible label ("Prepnout do cestiny"), 44px target, consider /cs, /en routes + hreflang |
| 13 | med | nav | all | Nav tap targets 32px high (Home 58x32, Skills 86x32, ...) at all sizes; logo 32x64; CV button 194x72 and contact buttons OK (52-60) | JS measurement | Min 44px hit area (padding) |
| 14 | med | /skills | all | Skills have no proficiency/context; duplicate labels in text (VHDL VHDL, NASM NASM, CZE CZE, ENG ENG); "C2 (CAE)" cryptic; Linux distros take a whole block (6 distros) while key tools (Git, CMake, OpenGL, Python, ML from coursework) are absent | get_page_text | Group by level/usage, drop duplicate text nodes (icon alt+label), add Python/C++/GL, collapse distros, "Cambridge C2 Advanced" |
| 15 | med | /experience | all | Timeline is text-only: no links (CSG/Skladon/SolidSun not linked), inconsistent dates (month-month, "2023 - 2024", "70 hodin - 2023"), Udemy course in same list as jobs; same bullets repeated between jobs | page text | Consistent date format, link to related projects, separate "Education/Courses" |
| 16 | med | / | all | CV findability OK on desktop (button y=657 of 768, label follows language: cv_en.pdf / cv_cz.pdf) but button text color rgb(0,153,102) on #101828 is 5.26:1 only for the dashed border/accent; label is white. Nav has no CV link; no CV on other pages; /cv_cs.pdf 404 (only cv_cz.pdf) | HEAD requests | Add "CV" to nav/footer; filename `cv_cs` or redirect; show size (131 KB PDF) |
| 17 | low | all | all | Czech typos/diacritics: "Zpet na projekty", "Modalni textovy editor" (project name and thumbnail alt) | detail page text | Fix strings |
| 18 | low | all | all | Console: one 403 and one 404 on first load of `/` (not attributed; 403 is the Vercel Security Checkpoint interstitial seen on first visit per session, which may also bite visitors/crawlers) | read_console_messages | Check Vercel firewall/attack-challenge mode; find the 404 asset |
| 19 | low | /projects | all | Tech-stack icons in cards have no text alternative; "Live preview" label top-right of tile with no link affordance | visual | aria-label/title or visible tech labels |
| 20 | low | footer | all | No footer at all (footer: 0); no copyright/last updated/contact repeat at page end | landmarks | Add footer with contact + CV + social |
| 21 | low | / | 1366 | Hero is left-aligned, whole scrollHeight 872 (just over fold); photo uses next/image (34 KB), good | measurements | none |

## What works and should be kept
- Clear, consistent dark navy gradient with green accent; logo "JZ" with accent Z is memorable.
- Contrast is fine: white text on navy 19.2:1; accent #00D492 on navy 9.9:1; #009966 on navy 5.26:1 (AA for normal text).
- No horizontal overflow at 375, 768 or 1366 (scrollWidth equals innerWidth; 1351 on desktop is just the scrollbar).
- Active nav state is shown (accent color/bold on current page) on all pages (no aria-current though).
- Language switch persists via cookie across pages, updates html lang, translates all pages incl. headings and CV link.
- Photo has alt text, uses next/image with responsive sizing (362 px intrinsic, 34 KB).
- Project cards: clear professional vs school split, tech icon row, 156px thumbnails with alt, lazy loading.
- Home is light: 328 KB over 15 requests, largest = JS chunk 72 KB, font woff2 41 KB.
- Mobile menu opens/closes (X toggle) and shows active item.

## Raw measurements
- Home 1366: title "Jan Zamostny"; meta description "Landing page"; og/twitter/canonical none; viewport meta ok; favicon ok; lang en/cs.
- Transfer: / 328,146 B in 15 resources; /projects 812,890 B in 16 resources. Top / resources: JS 72,597; JS 41,569; JS 41,199; font woff2 40,780; photo 34,366.
- Colors: body text/white 255,255,255 on 4,3,64 (19.23:1); nav active rgb(0,212,146) (9.92:1); accent rgb(0,153,102) vs navy 5.26:1; CV button bg rgb(16,24,40) with 1.8px dashed rgb(0,153,102) border; CV label white (20.6:1). (Automated first pass mis-parsed lab() colors; values above are canvas-converted.)
- Tap targets <44px on /: logo 32x64, nav links 58/86/144/115 x 32, language button 53x40; contact buttons 60x60, social links 52x52, CV 194x72.
- Fonts: h1 36px desktop / 24px mobile; hero paragraph 18px desktop.
- Headings: / H1 "Welcome to my personal page", H3 name (skips h2); /skills, /experience, /projects start at H2, no H1; detail page H1 only.
- Images without alt: 0. Icon-only links without name: 2 (LinkedIn, GitHub) plus hamburger svg.
- Skip link: none. Landmarks: header 1, nav 2, main 1 on / and 0 elsewhere, footer 0.
- prefers-reduced-motion CSS rules: 0. Animations on /: 14 (infinite pulse 2s, infinite bounce 3s).
- Focus after Tab: first stop is logo; outline `rgb(229,151,0) auto 0.9px`, no box-shadow.
- Overflow: 375: /, /skills, /experience, /projects, /projects/tetris all scrollWidth 375 (no overflow). 768: all 768/753 (no overflow). Mobile heights: / 1453, /skills 1809, /experience 2355, /projects 3415. 768 heights: / 1025, /skills 1793, /experience 1581, /projects 2065.
- 768 header: nav links x192-749, language button x680-740 (overlap); hamburger hidden.
- 375 header: hamburger svg 64x64, aria "Open menu"/"Close menu" label, onclick, no aria-expanded.
- Routes: /cv_en.pdf 200 (131,449 B); /cv_cs.pdf 404; /cv_cz.pdf linked in CS; /robots.txt 404; /favicon.ico 200; /projects/tetris 200; /projects/1 404; /projects/csg-web 200 (empty shell).
- Language: cookie `lang=cs|en`, localStorage empty, navigation type reload, URL unchanged.
- Experience entries: SHOWMORE s.r.o. (06-10/2024), Blackfish.co (2023-2024), NAM System a.s. (04-05/2023), Udemy React course 70 h (2023).
