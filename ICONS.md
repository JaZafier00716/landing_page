# Icons

One inline-SVG icon per technology, rendered by `components/tech-icon.tsx` (`TechIcon`, `TechLabel`, `techKey`), fill/stroke `currentColor`, 1.1em, `aria-hidden`, the name always printed beside it. Paths live in `components/tech-icons-data.ts` (copied from the upstream files below, no runtime dependency on any icon package). Lucide icons are imported by name from `lucide-react` (already a dependency) and drawn at `strokeWidth` 1.5 so they sit evenly beside the filled marks.

Logos are trademarks of their owners; they identify the technology and imply no endorsement.

Sources: Simple Icons 16.38.0 (CC0-1.0), devicon 2.18.0 (MIT, (c) Konpa), lucide-react (ISC). No modification except dropping the `<svg>` wrapper (path `d` copied verbatim).

## Simple Icons (CC0-1.0), slug = file `icons/<slug>.svg`

| Used for | Slug |
|---|---|
| C | c |
| C++ | cplusplus |
| TypeScript | typescript |
| Python | python |
| Haskell | haskell |
| OpenGL, GLSL | opengl |
| Next.js | nextdotjs |
| React | react |
| Tailwind CSS | tailwindcss |
| Storybook | storybook |
| Sanity CMS | sanity |
| Prisma | prisma |
| PostgreSQL | postgresql |
| PHP | php |
| Vite | vite |
| Express | express |
| Vercel | vercel |
| Hibernate | hibernate |
| H2 | h2database |
| CMake | cmake |
| Maven | apachemaven |
| Pytest | pytest |
| Docker | docker |
| Linux | linux |
| JUnit 5 | junit5 |
| FastAPI | fastapi |
| SQLAlchemy | sqlalchemy |
| Redis | redis |
| NumPy | numpy |
| JDK HttpServer | openjdk |
| Radix UI | radixui |
| CSS Modules | cssmodules |
| Git | git |
| npm workspaces | npm |

## devicon (MIT), file `icons/<name>/<name>-<variant>.svg`

| Used for | File | Why |
|---|---|---|
| Java | java/java-plain.svg | Java is not in Simple Icons: it was removed at Oracle's request under its trademark policy. devicon's MIT licence covers the drawing, not the trademark; it is used here only to name the language next to the word "Java" (nominative use). Multi-colour original not used; the plain variant is monochrome. |

## lucide (ISC)

| Used for | Lucide icon | Reason |
|---|---|---|
| SQL, PL/SQL, Oracle (Database, SQL, 19c), MySQL, JDBC, Alembic | database | Oracle is not in Simple Icons; the devicon Oracle mark is a red wordmark that is unreadable at 1em. MySQL's Simple Icons mark is a wordmark that renders tiny. Alembic has no mark in either set. |
| VHDL | cpu | hardware description language, no logo |
| x86 assembly (NASM) | binary | no logo |
| SDL2 | gamepad-2 | no mark in Simple Icons/devicon |
| SDL2_image, stb_image | image | image loading |
| SDL2_ttf | type | fonts |
| JavaFX | app-window | no mark |
| GLFW | monitor | windowing library |
| GLAD | cable | loader |
| GLM | sigma | maths library |
| MSW | replace | request mocking |
| WebSocket | arrow-left-right | protocol |
| ogl | box | 3D library |
| CVAT, Dataset annotation in CVAT | tags | annotation tool (no mark) |
| computer vision | scan-eye | concept |
| termios, ANSI escape sequences, CLI, command line | terminal | concept |
| POSIX | workflow | standard |
| Apache PDFBox | file-text | no mark |
| Make, GNU Make | hammer | the GNU mark is 14 KB of path; not worth it |
| Czech / English (spoken) | languages | concept |

## Unmatched
None: every skill on /skills has an icon. Weakest matches: PHP and OpenGL are wide marks that read small at 1em; VHDL, NASM, JavaFX, SDL2, Alembic and the Oracle/MySQL entries use generic lucide icons.
