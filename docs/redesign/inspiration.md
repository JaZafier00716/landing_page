# Inspiration: developer portfolios that pass the recruiter test

Fetched 2026-11-18 with WebFetch. WebFetch returns the page **as text/markdown, without CSS or JS**, so layout, hover, sticky and motion can't be verified from a fetch. Each claim is tagged:

- **[V]** verified in the fetched page text (structure, wording, order).
- **[M]** from memory of the site's visual design; check in a browser before copying.

No site refused the fetch. The Awwwards "portfolio" listing loaded, but it shows no profession labels; an Awwwards detail page (`/sites/brittany-chiang-v4`) returned 404.

---

## brittanychiang.com (Frontend Engineer, Klaviyo)

The closest model for this site: same goal (get hired), same content (experience, projects, CV).

- **Hero = name + role + one-sentence value.** [V] "Brittany Chiang" / "Frontend Engineer" / "I build accessible, pixel-perfect experiences for the web." Three lines, no eyebrow, no adjectives, and a recruiter knows what she does after reading them. [M] On desktop this block sits in a **sticky left column** with the nav and socials, and the right column scrolls, so name, role and nav never leave the screen.
- **Experience as a scannable list.** [V] Each entry has a date range ("2024 — Present"), "Role · Company" as one linked heading, one paragraph, and a row of tech tags. Six entries come before any project. [M] Each entry is a card with a padded surface on hover, and hovering one card dims the others, so there is one hover pattern for the whole list.
- **The CV link comes right after the evidence.** [V] "View Full Résumé" (→ /resume.pdf) sits after the experience list, not in the hero. You read the proof first, then get the document. The same applies to projects: [V] four featured projects (title, description, tags, screenshot, one quantified badge, "100k+ Installs"), then "View Full Project Archive".
- **Footer as a colophon.** [V] "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface." It's one line, it shows taste, and it doesn't repeat any content.
- Nav: [V] three anchors (About, Experience, Projects), plus social icons in a separate list. No theme or language toggle.

## leerob.com (Lee Robinson)

- **The bio is the hero.** [V] "I'm an engineer and writer." then "My life's work is to make technology easy to understand…". Current and past roles (SpaceX/Cursor, Vercel/Next.js) are woven into 3–4 sentences, with no separate experience section. This works when the employer names carry the weight; for Jan, a one-sentence version of it ("QA automation intern at FUTTEC") belongs in the hero.
- **Plain headed lists.** [V] Each section is a short word ("Bio", "Notes", "Blogs") over a list of plain links. There are no cards and no icons. The typography does the hierarchy.
- [V] Contact is a single mailto inline in the prose, with no form and no contact section.

## paco.me (Paco Coursey, Linear)

- **"Name — one-line description" lists.** [V] "⌘K: Composable command menu React component.", "Next Themes: Perfect dark mode in Next.js apps." Each project gets one line that says what it does. This is the format Jan's featured rows are missing (they show only name + stack).
- **Few, short sections.** [V] Building / Projects / Writing / Now / Connect, three items each at most. Restraint reads as confidence.
- **A one-line footer.** [V] "Pray at the altar of hard work." then "2025". [M] The type is small and muted, and nothing else is there.

## rauno.me (Rauno Freiberg, Vercel)

- **Identity in one sentence.** [V] "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details." It gives name, nationality, role and employer.
- **Click-to-copy email with feedback.** [V] The "Email" control shows a "Copied" state. Jan already has this pattern (`copy-button.tsx`). Keep it.
- [M] The craft pages show that small interaction details (focus, press, easing) are the "taste" signal. Nothing moves unless the user acts. [V] The footer is three icon links with no text.

## emilkowal.ski (Emil Kowalski, ex-Linear/Vercel)

- **Status first.** [V] Under the heading "Today": "Currently taking a break from work." then past employers. A "what am I doing now" line answers the recruiter's first question directly.
- **Name + description lists**, same as Paco. [V] Projects (Sonner, Vaul, animations.dev…) each get a one-line description. Writing is a list of titles with teasers.
- **Nav = name only.** [V] "Emil Kowalski" → `/`, subtitle "Design Engineer", and no menu. [M] The motion is restrained: a short fade or blur on load, and hover feedback that is fast and interruptible (the same rules as checklist §Motion).

## joshwcomeau.com (Josh W Comeau)

- **Settings are utilities, not navigation.** [V] "Disable sounds", "Activate dark mode" and "Search" are labelled controls kept apart from the content links (categories, courses, goodies, About). In the fetched text they come in the closing block. [M] Visually they are small icon buttons at the top right, after the nav.
- **A structured footer is fine when there is a lot of content.** [V] Categories, courses, general links, social, legal. Jan has 4 pages, so this does **not** apply. It's listed here as the counter-example.
- [M] Whimsy (springy hover, sounds) fits a teaching brand. It's not for a QA engineer's CV site.

## delba.dev (Delba de Oliveira)

- **The first sentence says what she wants.** [V] "I'm looking for my next role in developer education or technical video production. If you're hiring:" then "Let's talk" (→ LinkedIn). This is the best recruiter hook in the set: what she wants, in which field, and the next step, in one line. It covers the checklist item "what Jan is looking for next".
- **Section headings link to themselves.** [V] Work, Personal and About me link to `#work`, `#personal` and `#about-me`, so the headings double as navigation.
- [V] Social links come after the bio as one row separated by middle dots. There is no footer block.

## taniarascia.com (Tania Rascia)

- **Name + title + personality.** [V] "Hey, I'm Tania!" / "Principal software engineer, writer, all-around nerd."
- **A brief timeline instead of a CV dump.** [V] Four year ranges (1998–2006 … 2021–now), one line each, ending with a number ("177 posts and 20,000+ GitHub stars"). It compresses a career into something you read in 5 s.
- **Projects with year + action links.** [V] Each has a year, a name, a short description, and links labelled "Article / Demo / Source". The labelled links tell you what each one opens. Jan's project rows could use explicit "Source" / "Live" links the same way.
- [V] "Resume" sits in the sidebar utility links rather than the main nav. [V] The footer is one credit line plus a few links.

## Awwwards: romainavalle.dev (Romain Avalle, Interactive Developer)

From the fetched Awwwards portfolio listing (Nov 2026; no award badge shown on that listing entry).

- **The work index is a data table.** [V] Projects are numbered 01–39, with columns for name, affiliation, role ("Developer", "Tech lead"), award count, year and link. This matches Jan's "Datasheet" direction: a dense, aligned, mono-numbered index looks engineered, not decorated.
- **A "Let's talk" mailto in the top bar** [V] keeps contact one click away without a contact section.
- **Avoid the gimmick.** [V] "Type to play · 1-0 instrument · ↑↓ pitch · ←→ echo". This suits an award-hunting creative developer. For a QA/SWE recruiter it costs attention and proves nothing.
- [V] The footer is a colophon listing the fonts used plus a design credit (same idea as Brittany's).

---

## The classics applied to this site

Based on `app/[lang]/page.tsx`, `components/*` and `app/globals.css` on `ux-pass-3`.

**Refactoring UI: hierarchy is the problem, not the colour.**
- The biggest thing on the home page is the name (`h1.text-display font-extrabold`, stretched 112.5–125%). A name isn't information, so its size is borrowed from content that matters. Make the name medium and let the **role + current position + what he's looking for** sentence carry the weight (Brittany, Delba).
- Decorative icons sit on every `h2` (`FolderGit2`, `Mail`, skills `Code/Shapes/Server…`) and every nav item (`House`, `Briefcase`…). Refactoring UI: icons are for scanning repeated items, not for decorating headings. A Lucide icon beside every heading is the strongest "template/homework" signal on the page. None of the reference sites do it. Remove the heading and nav icons and keep icons only where they carry meaning (external-link arrow, copy, download).
- The eyebrow "Student · VŠB-TUO · Ostrava" leads with "Student". De-emphasise or reorder it to job, then location, then school.

**Practical Typography (Butterick)**
- Archivo at extrabold with 125% width for the name, plus 112.5% for every `h2`/`h1-inner`, makes three loud headline styles. Use one width for headings and only two weights in practice (400/600).
- Body copy and line length are already within range. Keep them.

**Don't Make Me Think (Krug)**
- The home page has no experience section. The FUTTEC internship, the strongest hiring signal, appears only inside the role sentence. A recruiter has to click "Experience" to confirm it. Put 2–3 experience rows on home (Brittany).
- The featured project rows show only `name · stack · →`. They don't answer "what is it, and is it good?". Add a one-line outcome (Paco/Emil) and, per the checklist, a thumbnail.
- Self-evident labels: "Skills" as a top-level nav item invites a list-of-buzzwords reading. Consider folding it into Projects/Experience (the checklist already says skills are shown through projects) to get to 3 nav items.

**Laws of UX**
- *Hick*: the header currently holds wordmark + 4 nav links + CV + theme + language (language is in the footer). Move theme and language into the footer line (Josh's utility idea, placed where Paco and Brittany put their footer). The header keeps name, 3 links and CV.
- *Von Restorff / one primary action*: on desktop the hero `CvButton` and the header CV (compact) can both be visible at the top of the page. That is two primary CTAs at once, which the checklist forbids; verify at 1366px. Choose one: either the hero CTA, with the header CV appearing after the hero scrolls out (as `cv-fab` already does on mobile), or the header only.
- *Proximity / "each piece of content once"*: the home page has a `#contact` section **and** the footer renders the same `ContactList`, so contact appears twice on one page. That breaks checklist §Consistency. Keep one: a one-line footer with email · LinkedIn · GitHub, or a contact section and a footer without contacts.
- *Jakob*: the conventions are already right (wordmark → home, marked current page). Keep them.

---

## Patterns to adopt (max 10)

1. Hero sentence = current role + what he's looking for + since when (Delba "I'm looking for…", Emil "Today").
2. Name at medium size; the value sentence is the visual anchor (Brittany, Rauno).
3. 2–3 experience rows on home: mono date range · "Role · Company" · one line · tech tags (Brittany).
4. Project rows as "Name: one-line outcome" plus a thumbnail, then "All projects →" (Paco, Emil, Brittany).
5. Explicit labelled actions per project: "Source", "Live" (Tania).
6. Datasheet-style numbered index for the full project archive: №, name, role, year, link (Romain).
7. One-line footer: email · LinkedIn · GitHub · CS/EN · theme · © year (Paco, Delba). Optional colophon (Brittany).
8. Theme and language as quiet utilities, outside the primary nav (Josh).
9. CV link right after the evidence (experience), plus a single primary CV CTA visible at a time (Brittany).
10. Text-only section headings and nav, no decorative icons (leerob, Paco, Emil).

## Patterns to avoid (max 5)

1. Decorative icons on headings and nav items (current site): reads as a template.
2. Load-time staggered slide-ins that delay content (old site, up to 2.3 s): recruiters see an empty page.
3. Gimmick interactions such as type-to-play, cursor spotlights or WebGL (Romain, Awwwards): attention cost, no hiring signal.
4. Skill grids, logo walls or skill levels: skills belong inside projects (checklist).
5. Empty or thin sections (a "Writing" or newsletter block with nothing to fill it, as on Josh/leerob): absence beats filler.
