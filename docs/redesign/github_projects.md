# GitHub projects of JaZafier00716: inventory

Source: public repos shallow-cloned with `git clone --depth 1` into `/tmp/lp/repos/<name>` on 2026-11-17 and read directly (README, build files, top-level structure). `raynet-` was cloned with full history to count commits. The profile listing (`?tab=repositories`) is blocked by robots.txt, so the list of repos comes from the brief, not from a full listing. Pushed dates come from the brief.

## Coverage

- **VIS: found.** `JaZafier00716/VIS` is public and was cloned. It was not found by the earlier web search.
- **ZPG: found.** `JaZafier00716/ZPG` is public (a Visual Studio OpenGL project). The earlier `VSB-ZPG` URL is still not checked. Memory describes a `VSB-ZPG` repo with `docs/cvN.md` and `Images/cvN`, and this `ZPG` repo has neither folder, so they may be different repos.
- Private repos listed below were not accessed.
- One `gh api` pushed-date lookup and one read of a VIS config example file were denied by the permission system in this pass, so the pushed dates of `tetris_clone` and `school` remain unverified, and `projekt/app/config/db.properties.example` was not opened.

## NEW projects (ordered by pushed date, newest first)

### 1. VIS (catering IS, semester project + cv3 lab)
- URL: https://github.com/JaZafier00716/VIS
- Last pushed: 2026-11-17
- Stack (verified from the build files): Java 21, JavaFX (`javafx-controls`), JDK `HttpServer`, Oracle JDBC (`ojdbc11`), Apache PDFBox (`pdfbox`), Maven, JUnit 5. No frameworks or ORM, as the assignment requires. The separate `cv3/` lab uses Java 21, Maven, H2, Jackson, Lombok and JUnit 5. The app README states 330 tests.
- Fork: not checked
- Description (EN): Semester project for a VŠB course: a catering information system for staff. It covers project folders and documents, menus with revisions, sharing a menu with a customer through a link, customer comments, PDF export and user administration. The desktop client is in JavaFX, the customer page and manager overview are served by a JDK HttpServer, the data are in Oracle through hand-written JDBC data mappers, and documents are kept on disk. The repo also contains `cv3/`, a separate Maven lab about furniture orders with H2 and JSON storage.
- Popis (CS): Semestrální projekt pro předmět na VŠB: informační systém pro cateringové firmy. Obsahuje složky projektů a dokumenty, jídelníčky s revizemi, sdílení jídelníčku se zákazníkem odkazem, komentáře zákazníků, export do PDF a správu uživatelů. Desktopový klient je v JavaFX, zákaznická stránka a přehled pro manažery běží na JDK HttpServer, data jsou v Oracle přes vlastní JDBC mappery a dokumenty na disku. Repozitář obsahuje i `cv3/`, samostatné laboratorní cvičení v Maven o objednávkách nábytku s úložištěm v H2 a JSON.
- Thumbnail candidates: `projekt/app/screenshots/desktop-main.png`, `projekt/app/screenshots/web-manager-menu.png`, `projekt/app/screenshots/sample-menu-pdf.png`, `projekt/app/docs/diagrams/class-diagram.png`
- Status: NEW
- Suggested category: School projects
- Notes: the repo contains internal working notes (`CLAUDE.md`, `projekt/notes/`, `presentations/hours_report.csv`) that are public now. Ask Jan whether he wants to keep them. The top-level README is only a title. No secrets were found by a filename scan. The `db.properties.example` file was not opened.

### 2. TDS-I (Oracle database for the catering IS)
- URL: https://github.com/JaZafier00716/TDS-I
- Last pushed: 2026-11-17
- Stack: Oracle SQL (the scripts state they need Oracle 19c or newer), Oracle SQL Developer Data Modeler (`.dmd` model), Docker with the `gvenzl/oracle-free` image for local development.
- Fork: not checked
- Description (EN): The database part of the same VŠB semester project, for a database course. It holds a re-runnable DDL schema with constraints, triggers and indexes, test data, integrity checks and a query catalogue, plus design notes that map the work to the course checklist. The logical and relational models are in Data Modeler, with PDF exports. The VIS application connects to this database over JDBC.
- Popis (CS): Databázová část stejného semestrálního projektu z VŠB, pro předmět o databázích. Obsahuje znovu spustitelné DDL schéma s omezeními, triggery a indexy, testovací data, kontroly integrity a katalog dotazů, plus návrhové poznámky mapované na checklist předmětu. Logický a relační model je v Data Modeleru, s exporty do PDF. Aplikace VIS se k této databázi připojuje přes JDBC.
- Thumbnail candidates: no PNG or JPG in the repo. `model/Logical.pdf` and `model/relational.pdf` are PDFs, so convert a page to PNG first.
- Status: NEW
- Suggested category: School projects

### 3. OSY (Operating Systems coursework)
- URL: https://github.com/JaZafier00716/OSY
- Last pushed: 2026-11-16
- Stack: C (28 `.c` files) and C++ (52 `.cpp` files), with 21 headers. POSIX APIs on Linux, GNU Makefiles and one CMake example. Repo has a `.clang-format`.
- Fork: not checked
- Description (EN): Coursework for an operating systems course. It has homework tasks `hw1` to `hw8`, lab exercises `cv1` to `cv8` in `prac/`, lecture programs in `prednasky/`, and a demo collection `osy-prog-demo/` for system programming. The demos cover processes and `exec`, pipes, threads, POSIX semaphores, shared memory, message queues, sockets, asynchronous I/O, static and shared libraries, and `stat`. The README contains only a title, so this description comes from folder names and the demo README.
- Popis (CS): Studijní repozitář k předmětu Operační systémy. Obsahuje domácí úkoly `hw1` až `hw8`, cvičení `cv1` až `cv8` ve složce `prac/`, programy k přednáškám v `prednasky/` a demo sbírku `osy-prog-demo/` k systémovému programování. Dema pokrývají procesy a `exec`, roury, vlákna, POSIX semafory, sdílenou paměť, fronty zpráv, sockety, asynchronní I/O, statické a sdílené knihovny a `stat`. README obsahuje pouze nadpis, popis vychází z názvů složek a README dema.
- Thumbnail candidates: none (no images in the repo)
- Status: NEW
- Suggested category: School projects
- Notes: the repo commits compiled binaries (`prednasky/main`, `pr8`, `pr9`, several `.so` and `.a` files) and a zip (`homeworks/hw6-ai.zip`). Consider whether those should stay in a public repo.

### 4. ZPG (OpenGL graphics coursework)
- URL: https://github.com/JaZafier00716/ZPG
- Last pushed: 2026-09-22
- Stack (verified from the sources and project file): C++ with OpenGL 3.3 core (the GLFW context hints request major 3, minor 3, core profile), GLSL 330 shaders, GLFW 3.5.1, GLAD loader, GLM for math. The project is a Visual Studio solution (`ZPG.slnx` and `ZPG.vcxproj`) with Win32 and x64 configurations.
- Fork: not checked
- Description (EN): OpenGL coursework in C++ for Windows. The main program opens a GLFW window, loads OpenGL through GLAD, and draws 3D models with GLM transforms through simple vertex and fragment shaders. Models are bundled as C++ headers: Suzanne with flat and smooth shading, a tree, bushes, a sphere, a plain and a gift box. The repo holds the cv2 lab state (one commit).
- Popis (CS): Grafický úkol v C++ pro Windows s OpenGL. Hlavní program otevře okno přes GLFW, načte OpenGL přes GLAD a vykresluje 3D modely s transformacemi z GLM přes jednoduché vertex a fragment shadery. Modely jsou v C++ hlavičkách: Suzanne s plochým a hladkým stínováním, strom, keře, koule, rovina a dárek. Repozitář obsahuje stav z cvičení cv2 (jeden commit).
- Thumbnail candidates: none (no images in the repo). A screenshot would need to be rendered first.
- Status: NEW
- Suggested category: School projects
- Notes: the header of `ZPG/main.cpp` carries a copyright line for another person ("Martin Němec, 2026"), which looks like a course template. Check before crediting the code as Jan's. The `.vcxproj` contains a local Windows user path. It is not copied here.

### 5. raynet- (internship selection task, team repo)
- URL: https://github.com/JanMarianek/raynet- (owner is not Jan's account; Jan contributes)
- Last pushed: 2026-05-22
- Stack: TypeScript, React 18, Vite, CSS Modules, Storybook, MSW (mock service worker), Express (backend), npm workspaces, `concurrently`. Data come from a JSON file.
- Fork: not checked
- Jan's share: `git log` over 12 commits gives 7 under the `JaZafier00716` login (componentization, Storybook, filter section, updates, image). Two more commits are under "Jan Mariánek" (leaderboard frontend, custom podium section). Those two commits use a different email, so it is unclear whether they are Jan's. Counting them, Jan made 7 to 9 of 12 commits. The other three are by Martin Porubský (under two names, `porubsky` and `Martin Porubský`).
- Description (EN): A scaffold for an internship selection task at Raynet, organised as npm workspaces. The frontend is a React and TypeScript dashboard built with Vite and CSS Modules. It shows a leaderboard with a podium, ranking table, filters, search and a trend chart, using a JSON data file. Components have Storybook stories and MSW mocks. The backend is an Express and TypeScript server; the README lists one endpoint, `/api/hello`.
- Popis (CS): Scaffold pro výběrové řízení stážistů ve firmě Raynet, uspořádaný jako npm workspaces. Frontend je dashboard v Reactu a TypeScriptu postavený přes Vite a CSS Moduly. Zobrazuje žebříček s pódiem, tabulku pořadí, filtry, vyhledávání a graf vývoje, data jsou v JSON souboru. Komponenty mají Storybook příběhy a MSW mocky. Backend je server v Express a TypeScriptu; README uvádí jediný endpoint `/api/hello`.
- Thumbnail candidates: `frontend/public/Raynet.jpg` (a banner image in the README, which may be the company's image, so ask before use)
- Status: NEW
- Suggested category: Work (an internship selection assignment for a company, and Jan is a contributor, not the owner). Ask Jan before listing it.
- Notes: the README contains a guest Wi-Fi credential. It is not copied here. Do not publish that part.

### 6. dev-events-nextjs16-course (Next.js course project)
- URL: https://github.com/JaZafier00716/dev-events-nextjs16-course
- Last pushed: 2026-02-09
- Stack (verified from `package.json`): TypeScript, Next.js 16, React 19, Tailwind CSS v4, Radix UI, shadcn CLI, lucide-react, `ogl` (WebGL) for the background effect.
- Fork: not checked
- Description (EN): A Next.js 16 and React 19 course project that lists developer events such as hackathons, meetups and conferences. The home page shows a grid of featured events from sample data in `lib/constants.ts`, with a WebGL light-ray background (`ogl`). The README is still the default `create-next-app` text, and the repo has a single commit.
- Popis (CS): Projekt z kurzu Next.js 16 a React 19 pro výpis vývojářských akcí, jako jsou hackathony, meetupy a konference. Úvodní stránka ukazuje mřížku doporučených akcí z ukázkových dat v `lib/constants.ts` a na pozadí WebGL efekt světelných paprsků (`ogl`). README je stále výchozí text z `create-next-app` a repozitář má jeden commit.
- Thumbnail candidates: `public/images/event1.png`, `public/images/event-full.png`
- Status: NEW
- Suggested category: Personal projects. It is a follow-along course tutorial with sample data, so ask Jan before featuring it.

## ALREADY_ON_SITE

### 7. ModalEditor (Modal Text Editor)
- URL: https://github.com/JaZafier00716/ModalEditor
- Last pushed: 2026-06-01
- Stack (verified): C++23 with `std::print`, CMake (minimum 4.1), POSIX terminal control through `termios` and `ioctl`, ANSI escape sequences for cursor and rendering. Optional AddressSanitizer and a Valgrind target.
- Fork: not checked
- Description (EN): A Vim-inspired modal text editor for the terminal, written in C++23. Its normal-mode key bindings are configurable through `motions.conf` and `motions.default.conf`, and it renders with ANSI escape sequences. The site text matches the source. The repo has no README, so the description comes from the source.
- Popis (CS): Modální textový editor pro terminál inspirovaný Vimem, napsaný v C++23. Klávesové zkratky v normálním režimu lze nastavit v `motions.conf` a `motions.default.conf` a vykreslování běží přes ANSI escape sekvence. Text na webu odpovídá zdrojovému kódu. Repozitář nemá README, popis vychází ze zdrojového kódu.
- Thumbnail candidates: `/images/editor.png` (already used on the site). The repo has no images.
- Status: ALREADY_ON_SITE (site entry "Modal Text Editor", description verified)
- Suggested category: School projects

### 8. tetris_clone (Tetris)
- URL: https://github.com/JaZafier00716/tetris_clone
- Last pushed: not verified in this pass (from the earlier read: 68 commits, master branch)
- Stack (from the earlier read): C, SDL2 with SDL2_image and SDL2_ttf, CMake
- Description (EN): A Tetris clone in C using SDL2. The README lists the SDL2 prerequisites and the CMake build steps. Not re-read in this pass.
- Popis (CS): Klon Tetrisu v C s knihovnou SDL2. README uvádí závislosti SDL2 a postup sestavení přes CMake. V tomto průchodu znovu nečteno.
- Status: ALREADY_ON_SITE (site entry "Tetris")
- Suggested category: School projects

### 9. school (multi-project coursework repo)
- URL: https://github.com/JaZafier00716/school
- Last pushed: not verified in this pass (from the earlier read: 278 commits, `main` branch)
- Stack (from the earlier read): C is the main language; Donkey Kong is in Java (`druhak/JAVA/DonkeyKongFX-moduless`, JavaFX, Hibernate, H2, Maven, per the site entry)
- Description (EN): A coursework repo with top-level folders `druhak` and `prvak`, plus course notes and project files. Not re-read in this pass.
- Popis (CS): Repozitář se studijními úlohami se složkami `druhak` a `prvak`, s poznámkami a projektovými soubory. V tomto průchodu znovu nečteno.
- Status: ALREADY_ON_SITE (site entry "Donkey Kong" links to `druhak/JAVA/DonkeyKongFX-moduless`)
- Suggested category: School projects

## Private: ask Jan whether to show

These repos were not accessed. Name and pushed date come from the brief only.

- ZSU-projekt, pushed 2026-10-26 (memory mentions a zsu project with a LaTeX presentation)
- fastapi-issue-tracker, pushed 2026-10-04
- skj_projekt, pushed 2026-05-18
- MobileMovieAppDemo, pushed 2026-02-27
- graph_center, pushed 2025-11-12. **Already linked on the site** (`https://github.com/JaZafier00716/graph_center`). If this repo is private, the link is broken for visitors. Check the visibility.
- csg.cz, pushed 2023-08-28. Possibly related to the CSG Website entry on the site. Check.
- End2End, pushed 2023-08-15

## Skipped

- `Arch-Hyprland` (pushed 2025-01-30): a setup guide and config files for Hyprland on Arch (`hypr/`, `kitty/`, `rofi/`, `waybar/`, `wlogout/`, `script.sh`). It is dotfiles-style config, not a project, so it is skipped.
- `landing_page`: the portfolio site itself.
- `JaZafier00716` (profile README), `dotfiles`, `code-profiles`, `claude-skills`, `Books`, `GitHub_Books`, `AwesomeWM`: config or fork repos, skipped per the brief.

## Items for the user to check

- The `school` repo contains a file named `harica_full_rsa.pem`. The name suggests a certificate or private key. It was not opened in any pass, and this run did not check whether the file is still in the repo. Check it on GitHub.
- The `raynet-` README contains a guest Wi-Fi credential. Do not publish it.
- `graph_center` is listed as private in the brief but linked publicly on the site. Check which is correct.
- VIS and TDS-I are school projects with internal notes and an hours report in the public repo. Decide whether those should be visible.
- For thumbnails: ZPG, OSY, dev-events and `raynet-` have no usable screenshot in the repo. VIS has 14 app screenshots. TDS-I has PDF models only.
