# Recruiter-first copy, EN and CS (direction B "Bench")

Draft copy for the redesigned home page and shared chrome. Sources: `data/seed.ts`, `lib/i18n.ts`, the catering_project README, and facts Jan gave directly. Nothing else is assumed.

- `[NUMBER? …]` and `[FACT? …]` mark gaps. They are collected under "Questions for Jan" at the end.
- Czech typography: „ “ quotes, ’ apostrophe, spaced en dash in ranges ("2023 – 2024"), decimal comma (94,42), space as thousands separator (2 000). Non-breaking spaces after one-letter prepositions and conjunctions (v, k, s, z, o, u, a, i) and inside "Jan Zámostný" are added by `nbsp()` in `lib/typography.ts`, so they aren't typed here.
- Czech addresses visitors with formal "vy". Where gender would show in a past participle ("uvedl/a jste"), the sentence is rephrased to avoid it.
- English follows the seed's US spelling ("honors").

---

## 1. Hero

### EN

| Slot | Copy |
|---|---|
| Name (h1) | Jan Zámostný |
| Title line | Software developer · QA automation · Ostrava |
| `now` | QA Automation Engineer (internship), FUTTEC a.s. · remote · since Sep 2026 |
| `study` | Bachelor’s, Computer Science, VŠB – Technical University of Ostrava · GPA 94.42/100 · master’s planned from Sep 2027 |
| `based` | Ostrava, Czech Republic |
| `stack` | C · C++ · OpenGL · Java · Python · TypeScript / Next.js |
| `before` | Frontend developer at SHOWMORE (2024) and Blackfish (2023, contract) |
| `want` | Open to opportunities: part-time or near full-time, on-site or hybrid in Ostrava, or remote |
| Status-dot label | Open to opportunities |

Notes:
- The title line says what Jan does, not what he studies. The `now` and `study` rows carry the student and intern facts, so the line doesn’t need to repeat them. Alternative if "Software developer" feels like too much: "CS student · QA automation intern · Ostrava".
- The status dot sits on the `now` row. If it should mean "available", use the label above as its `title`/sr-only text. If it only marks the current job, use "Current position" instead.
- `[FACT? expected bachelor’s graduation date]`: if known, the `study` row could show "graduating [month year]" in place of, or next to, the master’s plan.

### CS (CS — for Jan to proofread)

Readout keys translated: `nyní`, `studium`, `místo`, `stack` → `technologie`, `dříve`, `zájem`.

| Slot | Copy |
|---|---|
| Jméno (h1) | Jan Zámostný |
| Titulek | Softwarový vývojář · automatizace testů · Ostrava |
| `nyní` | QA Automation Engineer (stáž), FUTTEC a.s. · na dálku · od září 2026 |
| `studium` | Informatika (Bc.), VŠB – Technická univerzita Ostrava · GPA 94,42/100 · od září 2027 navazující magisterské studium |
| `místo` | Ostrava |
| `technologie` | C · C++ · OpenGL · Java · Python · TypeScript / Next.js |
| `dříve` | Frontend vývojář ve firmách SHOWMORE (2024) a Blackfish (2023, externě) |
| `zájem` | částečný nebo téměř plný úvazek: prezenčně či hybridně v Ostravě, nebo na dálku |
| Popisek stavové tečky | Otevřený nabídkám |

Alternative title line: „Student informatiky · stážista v QA automatizaci · Ostrava“.

---

## 2. About

### EN (113 words)

I study computer science at VŠB – Technical University of Ostrava (GPA 94.42/100) and work remotely as a QA automation intern at FUTTEC, where I write Pytest tests and track bugs. Before that I built Next.js frontends at Blackfish and SHOWMORE, including major components for the Czechoslovak Group and Skladon websites. At school I like going lower in the stack: a modal text editor in C++23, Tetris in C with SDL2, 3D rendering in OpenGL. I also wrote a catering information system in Java with 330 automated tests. I plan to start a master’s in September 2027. Until then I’m open to part-time or near full-time work, on-site or hybrid in Ostrava, or remote.

### CS (108 slov) (CS — for Jan to proofread)

Studuji informatiku na VŠB – Technické univerzitě Ostrava (GPA 94,42/100) a na dálku pracuji jako stážista v QA automatizaci ve společnosti FUTTEC: píšu testy v Pytestu a eviduji chyby. Předtím jsem ve firmách Blackfish a SHOWMORE vyvíjel frontend v Next.js, mimo jiné hlavní komponenty pro weby Czechoslovak Group a Skladon. Ve škole mě baví nízkoúrovňové programování: modální textový editor v C++23, Tetris v C se SDL2, 3D vykreslování v OpenGL. V Javě jsem napsal také informační systém pro catering s 330 automatizovanými testy. Od září 2027 plánuji magisterské studium. Do té doby jsem otevřený nabídkám na částečný nebo téměř plný úvazek, prezenčně či hybridně v Ostravě, nebo na dálku.

---

## 3. Featured case studies

### Which four

Feature: **Catering information system**, **S3-compatible object storage (skj-projekt)**, **Modal text editor**, **ZPG: OpenGL graphics**. Move **Tetris** to the full project list.

Why:
- **Catering IS** is the strongest card. It has the only confirmed numbers (330 tests, 0 failures), a public repo, a screenshot, and it shows databases and testing, which matter for QA roles.
- **skj-projekt** is Python, FastAPI and pytest, the same language family as the FUTTEC job. It’s the only backend and distributed-systems project, and the only team project among the four. Gaps: it has no screenshot and no public link (private university repo). A simple architecture diagram (gateway → broker → storage node, worker on Redis) drawn from the seed facts would work as its image.
- **Modal text editor** is public, has a screenshot, and shows C++ systems work with memory checking (ASan, Valgrind).
- **ZPG** backs the "C and OpenGL" claim in the hero. Gaps: no screenshot yet (already an open item in `directions.md`) and no public link.
- **Tetris** has only one sentence of description and tells the same "low-level C/C++" story as the editor. If Jan wants every featured card to have a public link, swap Tetris back in for ZPG.

Row keys on each card: Problem · My role · Stack · Decision · Result · Next.
CS: Problém · Moje role · Technologie · Rozhodnutí · Výsledek · Dál.

### 3.1 Catering information system

**EN** (≤ 90 words)

- **Problem:** Catering staff manage menus with revisions, share them with customers through a link for comments, and export PDFs.
- **My role:** Solo project.
- **Stack:** Java 21, JavaFX, JDK HttpServer, JDBC, Oracle 19c, Apache PDFBox, JUnit 5, Maven
- **Decision:** Hand-written JDBC data mappers, no ORM, as the assignment required. Trade-off: full control over SQL, but more mapping code to write and test.
- **Result:** 330 automated tests, `mvn clean test` with 0 failures, plus a re-runnable Oracle schema with constraints and triggers.
- **Next:** (none given, row omitted)

**CS** (CS — for Jan to proofread)

- **Problém:** Zaměstnanci cateringové firmy potřebují spravovat dokumenty projektů a jídelníčky s revizemi, sdílet jídelníček se zákazníkem přes odkaz, sbírat komentáře a exportovat PDF.
- **Moje role:** Samostatný projekt.
- **Technologie:** Java 21, JavaFX, JDK HttpServer, JDBC, Oracle 19c, Apache PDFBox, JUnit 5, Maven
- **Rozhodnutí:** Vlastní JDBC mappery bez frameworku a ORM, jak vyžadovalo zadání. Kompromis: plná kontrola nad každým SQL dotazem za cenu většího množství mapovacího kódu, který je třeba napsat a otestovat.
- **Výsledek:** 330 automatizovaných testů, `mvn clean test` bez chyb. Znovu spustitelné schéma v Oracle s omezeními, triggery a kontrolami integrity.
- **Dál:** (nezadáno, řádek se vynechá)

### 3.2 S3-compatible object storage (skj-projekt)

**EN** (≤ 90 words)

- **Problem:** Part of an S3-compatible object storage service: buckets, object upload and download, soft delete, and per-bucket billing for storage and traffic.
- **My role:** One of two developers. My part: the gateway API (file and bucket endpoints, schemas, database and configuration), the image-processing endpoint and worker, and their tests.
- **Stack:** Python, FastAPI, SQLAlchemy, Alembic, WebSocket, Redis, NumPy, pytest
- **Decision:** We kept JSON as the default message format. In our broker benchmark (5 publishers × 5 subscribers, 25,000 deliveries on localhost) JSON reached 4,015 msg/s and MessagePack 2,476 msg/s. MessagePack stays an option (?fmt=msgpack) for binary payloads. (The broker was built and benchmarked by Jan’s teammate, hence “we”.)
- **Result:** Gateway, broker (durable queue, ACKs), storage node and async image worker run together, with 49 pytest tests.
- **Next:** (none given, row omitted)

No source link: private university repository.

**CS** (CS — for Jan to proofread)

- **Problém:** Část objektového úložiště kompatibilního s S3: buckety, nahrávání a stahování objektů, měkké smazání a účtování úložiště a přenosů pro každý bucket.
- **Moje role:** Jeden ze dvou vývojářů. Moje část: API brány (endpointy pro soubory a buckety, schémata, databáze a konfigurace), endpoint a worker pro zpracování obrazů a jejich testy. (CS — for Jan to proofread)
- **Technologie:** Python, FastAPI, SQLAlchemy, Alembic, WebSocket, Redis, NumPy, pytest
- **Rozhodnutí:** JSON jsme ponechali jako výchozí formát zpráv. V našem benchmarku brokeru (5 publisherů × 5 subscriberů, 25 000 doručení na localhostu) dosáhl JSON 4 015 zpráv/s a MessagePack 2 476 zpráv/s. MessagePack zůstává volitelný (?fmt=msgpack) pro binární data. (CS — for Jan to proofread)
- **Výsledek:** Brána, broker zpráv s trvalou frontou a potvrzováním ACK, úložný uzel a asynchronní worker pro obrazy fungují dohromady; projekt má 49 testů v pytestu.
- **Dál:** (nezadáno, řádek se vynechá)

Bez odkazu na zdrojový kód: soukromý univerzitní repozitář.

### 3.3 Modal text editor

**EN** (≤ 90 words)

- **Problem:** A Vim-style modal text editor for the Linux terminal, without a UI library.
- **My role:** Solo project.
- **Stack:** C++23, termios, ANSI escape sequences, CMake
- **Decision:** Raw ANSI escape sequences instead of a library like ncurses. Trade-off: no dependency and full control over rendering, but terminal differences are mine to handle.
- **Result:** Normal-mode key bindings are configurable in a motions file. CMake build with optional AddressSanitizer and a Valgrind target. (No claim of being clean under Valgrind/ASan: not confirmed.)
- **Next:** (none given, row omitted)

**CS** (CS — for Jan to proofread)

- **Problém:** Modální textový editor pro terminál v Linuxu inspirovaný Vimem, bez knihovny pro uživatelské rozhraní.
- **Moje role:** Samostatný projekt.
- **Technologie:** C++23, termios, ANSI escape sekvence, CMake
- **Rozhodnutí:** Obrazovku kreslím přímo ANSI escape sekvencemi místo knihovny typu ncurses. Kompromis: žádná závislost a plná kontrola nad vykreslováním, ale rozdíly mezi terminály musím řešit sám.
- **Výsledek:** Klávesové zkratky normálního režimu se nastavují v konfiguračním souboru. Sestavení přes CMake s volitelným AddressSanitizerem a cílem pro Valgrind.
- **Dál:** (nezadáno, řádek se vynechá)

### 3.4 ZPG: OpenGL graphics

**EN** (≤ 90 words)

- **Problem:** Course work for computer graphics at VŠB: render 3D scenes with textured models in modern OpenGL.
- **My role:** [FACT? solo coursework?]
- **Stack:** C++23, OpenGL, GLSL, GLFW, GLAD, GLM, stb_image, CMake
- **Decision:** The programmable pipeline: GLSL shaders with GLM transforms. Trade-off: more setup before the first frame, in exchange for control over every vertex and pixel.
- **Result:** Basic rendering of various scenes, built to learn how rendering works: individual lighting models, shaders and textures.
- **Next:** (none given, row omitted)

No source link: private university repository. No screenshot yet: the card shows no image row.

**CS** (CS — for Jan to proofread)

- **Problém:** Úlohy z předmětu Základy počítačové grafiky na VŠB: vykreslit 3D scény s texturovanými modely v moderním OpenGL.
- **Moje role:** [FACT? samostatná práce?]
- **Technologie:** C++23, OpenGL, GLSL, GLFW, GLAD, GLM, stb_image, CMake
- **Rozhodnutí:** Programovatelná pipeline: shadery v GLSL a transformace z GLM. Kompromis: víc přípravy před prvním snímkem, zato kontrola nad každým vrcholem a pixelem.
- **Výsledek:** Základní vykreslení různých scén, na kterých jsem se učil, jak vykreslování funguje: jednotlivé modely osvětlení, shadery a textury. (CS — for Jan to proofread)
- **Dál:** (nezadáno, řádek se vynechá)

Bez odkazu na zdrojový kód: soukromý univerzitní repozitář. Chybí snímek obrazovky.

---

## 4. Experience bullets

Courses (CAE, Udemy) keep their title line only. One bullet each is given below in case the layout needs one.

### EN

**FUTTEC a.s.**, QA Automation Engineer (internship), Sep 2026–present
- Wrote 1,200+ automated tests in Pytest and filed and tracked bugs, working remotely.
- Used Claude as a coding assistant while writing the tests.

**VŠB-TUO**, CVAT Annotation Specialist, May–Oct 2026
- Annotated about 20 minutes of dashcam footage in CVAT: road defects (potholes, cracks), road markings, lanes, guardrails and delineator posts. 
- Delivered precise, consistent annotations for computer vision and machine learning datasets, in cooperation with FUTTEC.

**SHOWMORE s.r.o.**, Frontend Web Developer, Jul–Oct 2024
- Built UI components and page sections for the SolidSun website in Next.js, TypeScript and Tailwind CSS.
- Improved user experience and performance on client projects for SolidSun and Sype.to.
- Shipped through Storybook, Sanity and Vercel, working from Figma designs in a Git-based team workflow.

**Blackfish**, Frontend Web Developer (contract), Jun–Dec 2023
- Built major components and pages for the Czechoslovak Group and Skladon websites from a Storybook design system, in Next.js, TypeScript and Tailwind CSS.
- Migrated all the blog posts into Sanity and tested pages before release.

**NAM system a.s.**, IT & Hardware Intern, Apr–May 2023
- Diagnosed, repaired and assembled computers and server components.
- Tested system stability and troubleshot peripherals and electronics.

**VŠB – Technical University of Ostrava, FEI**, Bachelor’s, Computer Science, Sep 2024–present
- GPA 94.42/100.
- Master’s at VŠB planned from September 2027, continuing in Informatics (specialisation not decided yet).

**SPŠE Havířov**, Information Technology, 2020–2024
- Graduated with honors as the top student of my year.
- Passed the maturita in Hardware and Networks, a practical IT exam and Czech.

**Cambridge English**, Advanced (CAE), level C2, 2025
- Certified at C2, the highest CEFR level.

**Udemy**, React – The Complete Guide, 2023
- Completed the 70-hour course.

Note: "Migrated content into Sanity" combines two seed facts (CSG content is managed in Sanity; Jan migrated content). `[FACT? confirm the migration target was Sanity]`. The old SHOWMORE bullet "Solved complex problems in the team through research and analysis" is dropped as too vague to read as impact.

### CS (CS — for Jan to proofread)

**FUTTEC a.s.**, QA Automation Engineer (stáž), září 2026 – současnost
- Na dálku jsem napsal přes 1 200 automatizovaných testů v Pytestu a evidoval chyby.
- Při psaní testů jsem využíval AI asistenta Claude. (new CS)

**VŠB-TUO**, Specialista anotací v CVAT, kvě – říj 2026
- V CVAT jsem anotoval zhruba 20 minut záznamu z palubních kamer: poruchy vozovky (výtluky, trhliny), dopravní značení, jízdní pruhy, svodidla a směrové sloupky. (new CS)
- Dodával jsem přesné a konzistentní anotace pro datové sady počítačového vidění a strojového učení, ve spolupráci se společností FUTTEC.

**SHOWMORE s.r.o.**, Frontend vývojář, čvc – říj 2024
- Vytvořil jsem UI komponenty a sekce stránek pro web SolidSun v Next.js, TypeScriptu a Tailwind CSS.
- Zlepšil jsem uživatelský zážitek a výkon klientských projektů pro SolidSun a Sype.to.
- Pracoval jsem podle návrhů ve Figmě se Storybookem, Sanity a Vercelem; v týmu jsme používali Git.

**Blackfish**, Frontend vývojář (externě), čvn – pro 2023
- Vytvořil jsem hlavní komponenty a stránky webů Czechoslovak Group a Skladon podle design systému ve Storybooku, v Next.js, TypeScriptu a Tailwind CSS.
- Migroval jsem do Sanity všechny příspěvky z blogu a testoval stránky před vydáním. (new CS)

**NAM system a.s.**, Stážista v oblasti IT a hardwaru, dub – kvě 2023
- Diagnostikoval, opravoval a sestavoval jsem počítače a serverové komponenty.
- Testoval jsem stabilitu systémů a řešil problémy s periferiemi a elektronikou.

**VŠB – Technická univerzita Ostrava, FEI**, Bakalářské studium, Informatika, září 2024 – současnost
- GPA 94,42/100.
- Od září 2027 plánuji navázat magisterským studiem informatiky na VŠB (specializace zatím není určena). (new CS)

**SPŠE Havířov**, Informační technologie, 2020 – 2024
- Maturoval jsem s vyznamenáním jako nejlepší student ročníku.
- Maturita: Hardware a sítě, praktická zkouška z IT, český jazyk.

**Cambridge English**, Advanced (CAE), úroveň C2, 2025
- Certifikát na úrovni C2, nejvyšší úrovni SERR.

**Udemy**, React – The Complete Guide, 2023
- Absolvoval jsem 70hodinový kurz.

Dates on the site come from `formatPeriod` (e.g. "čvn – pro 2023"); the ones above only orient the reader.

---

## 5. Headings, CTAs, contact, footer, chrome

### Section headings

| Key | EN | CS (CS — for Jan to proofread) |
|---|---|---|
| About | About | O mně |
| Projects (home) | Selected projects | Vybrané projekty |
| Experience | Experience | Zkušenosti |
| Skills | Skills | Dovednosti |
| Contact | Get in touch | Napište mi |

"Selected projects" replaces B’s "Work log": a recruiter scans for the word "projects". It matches the existing CS `home.featured`.

### CTAs and links

| Key | EN | CS (CS — for Jan to proofread) |
|---|---|---|
| Primary CTA | Download CV | Stáhnout CV |
| CV meta | PDF, n KB | PDF, n kB |
| All projects | All projects | Všechny projekty |
| All experience | All experience | Všechny zkušenosti |
| Project detail | Read the case study | Přečíst případovou studii |
| Source | View source | Zdrojový kód |
| Live | Open live site | Otevřít web |
| No public source | Private university repository | Soukromý univerzitní repozitář |

Czech writes the unit as "kB" (lowercase k), with a no-break space after the number.

### Contact section intro

**EN:** Open to part-time or near full-time work as a software developer, in QA or full-stack, on-site or hybrid in Ostrava, or remote. Send a message here or email me directly.

**CS** (CS — for Jan to proofread): Hledám pozici softwarového vývojáře, v QA nebo full-stack, na částečný či téměř plný úvazek: prezenčně nebo hybridně v Ostravě, případně na dálku. Napište mi přes formulář, nebo rovnou e-mailem. (proofread by Jan)

### Contact form

| Key | EN | CS (CS — for Jan to proofread) |
|---|---|---|
| Name label | Name | Jméno |
| Email label | Email | E-mail |
| Message label | Message | Zpráva |
| Submit | Send message | Odeslat zprávu |
| Submitting | Sending… | Odesílám… |
| Error: name | Enter your name. | Vyplňte své jméno. |
| Error: email | Enter a valid email address, like name@example.com. | Zadejte platný e-mail, například jmeno@example.com. |
| Error: message empty | Write a message. | Napište zprávu. |
| Error: message too long | The message is too long (2,000 characters at most). | Zpráva je příliš dlouhá (nejvýše 2 000 znaků). |
| Error: summary | Please check the fields marked below. | Zkontrolujte prosím označená pole. |
| Error: send failed | The message couldn’t be sent. Please email me at [email] instead. | Zprávu se nepodařilo odeslat. Napište mi prosím přímo na [e-mail]. |
| Success | Thanks, your message was sent. I’ll reply to the email address you entered. | Děkuji, zpráva byla odeslána. Odpovím na zadaný e-mail. |
| Privacy line | I use your name and email only to reply to your message. | Jméno a e-mail použiji jen k odpovědi na vaši zprávu. |

The lab form sends nothing yet, so the success line goes live only when delivery is wired. The privacy line needs `[FACT? where messages are stored and for how long, once a mail provider is chosen]`.

### Footer

- **EN:** © 2026 Jan Zámostný · Built with Next.js, source on GitHub
- **CS** (CS — for Jan to proofread): © 2026 Jan Zámostný · Vytvořeno v Next.js, zdrojový kód na GitHubu

### Preferences popover

| Key | EN | CS (CS — for Jan to proofread) |
|---|---|---|
| Popover name | Preferences | Předvolby |
| Trigger aria-label | Preferences: language and theme | Předvolby: jazyk a vzhled |
| Language row | Language | Jazyk |
| Language options | English · Čeština | English · Čeština |
| Theme row | Theme | Vzhled |
| Toggle labels | reuse `dict.theme` | reuse `dict.theme` („Přepnout na tmavý režim“) |

The language names stay in their own language in both versions.

### CV pill (header)

| Key | EN | CS (CS — for Jan to proofread) |
|---|---|---|
| Visible | CV | CV |
| aria-label | Download CV (PDF) | Stáhnout CV (PDF) |

Answered by Jan on 2026-11-18: FUTTEC 1,200+ tests with Claude as coding assistant; CVAT about 20 minutes; no measured SHOWMORE change; Blackfish migrated all blog posts into Sanity; master’s at VŠB in Informatics from Sep 2027 (no bachelor’s graduation date stated); roles: software developer, QA, full-stack; no reply time; catering, editor and Tetris solo; skj-projekt, ZPG featured instead of Tetris; skj benchmark and 49 tests as above. Still open: questions 13 (done), 14, 15, 16 and the ZPG role and screenshots.

---

## Questions for Jan (original list)

Facts and numbers:
1. FUTTEC: how many tests have you written, or which product area do you test? Any number you can share (tests, bugs filed, runtime saved)?
2. FUTTEC: which AI-assisted tools do you use in QA, and for what?
3. CVAT: how much footage did you annotate (frames, hours, sequences)?
4. SHOWMORE: is there a measurable UX or performance change for SolidSun or Sype.to (Lighthouse, load time)?
5. Blackfish: which existing systems did the integration involve? Was the content migration into Sanity?
6. VŠB: expected bachelor’s graduation date? Is the master’s planned at VŠB, and in which programme?
7. Which roles should the site name as what you’re open to (QA automation, backend, frontend, any software role)?
8. Typical reply time to put in the contact intro?

Projects:
9. Catering IS: solo or team? What would you do next?
10. skj-projekt: which parts did you build? Does the storage node compact deleted data? How many pytest tests? (Benchmark numbers stay out unless you OK them.)
11. Modal editor: solo? Does it run clean under Valgrind or ASan? What next?
12. ZPG: solo? What do the scenes show (lighting, camera, number of scenes)? What next? A screenshot is needed.
13. Featured four: OK to feature skj-projekt and ZPG (both without public links) instead of Tetris?

Copy decisions:
14. Title line: "Software developer · QA automation · Ostrava" or the more cautious "CS student · QA automation intern · Ostrava"?
15. Czech: "Vzhled" for the theme row (the toggles say "režim"), and „zájem“ as the key for the open-to-opportunities row.
16. Privacy line: where will messages be stored, and for how long, once delivery is connected?
