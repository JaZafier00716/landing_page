// Idempotent content seed: `npx prisma db seed`. Upserts by natural keys and never deletes,
// so it is safe to re-run. The legacy columns (time, skills) keep the pre-redesign site rendering.
import "dotenv/config";
import { createPrisma } from "../lib/prisma";

const prisma = createPrisma();

type T<V> = { en: V; cs: V };

type ExperienceSeed = {
  slug: string;
  legacyCompany?: string; // matches a row created by the old seeders
  company: string;
  kind: "work" | "education" | "course";
  start: string; // YYYY-MM
  end: string | null;
  url?: string;
  stack?: string;
  stackCs?: string;
  companyCs?: string;
  related?: string[];
  position: T<string>;
  bullets: T<string[]>;
};

const experiences: ExperienceSeed[] = [
  {
    slug: "futtec",
    company: "FUTTEC a.s.",
    kind: "work",
    start: "2026-09",
    end: null,
    stack: "Python, Pytest",
    position: { en: "QA Automation Engineer (internship)", cs: "QA Automation Engineer (stáž)" },
    bullets: {
      en: [
        "Wrote 1,200+ automated tests in Pytest and filed and tracked bugs, working remotely.",
        "Used Claude as a coding assistant while writing the tests.",
      ],
      cs: [
        "Na dálku jsem napsal přes 1 200 automatizovaných testů v Pytestu a evidoval chyby.",
        "Při psaní testů jsem využíval AI asistenta Claude.",
      ],
    },
  },
  {
    slug: "cvat",
    company: "VŠB-TUO",
    kind: "work",
    start: "2026-05",
    end: "2026-10",
    stack: "CVAT, computer vision",
    stackCs: "CVAT, počítačové vidění",
    position: { en: "CVAT Annotation Specialist", cs: "Specialista anotací v CVAT" },
    bullets: {
      en: [
        "Annotated about 20 minutes of dashcam footage in CVAT: road defects (potholes, cracks), road markings, lanes, guardrails and delineator posts.",
        "Delivered precise, consistent annotations for computer vision and machine learning datasets, in cooperation with FUTTEC.",
      ],
      cs: [
        "V CVAT jsem anotoval zhruba 20 minut záznamu z palubních kamer: poruchy vozovky (výtluky, trhliny), dopravní značení, jízdní pruhy, svodidla a směrové sloupky.",
        "Dodával jsem přesné a konzistentní anotace pro datové sady počítačového vidění a strojového učení, ve spolupráci se společností FUTTEC.",
      ],
    },
  },
  {
    slug: "showmore",
    legacyCompany: "SHOWMORE s.r.o.",
    company: "SHOWMORE s.r.o.",
    kind: "work",
    start: "2024-07",
    end: "2024-10",
    stack: "Next.js, TypeScript, Tailwind CSS, Storybook, Sanity, Vercel",
    related: ["solidsun-platform"],
    position: { en: "Frontend Web Developer", cs: "Frontend vývojář" },
    bullets: {
      en: [
        "Built UI components and page sections for the SolidSun website in Next.js, TypeScript and Tailwind CSS.",
        "Improved user experience and performance on client projects for SolidSun and Sype.to.",
        "Shipped through Storybook, Sanity and Vercel, working from Figma designs in a Git-based team workflow.",
      ],
      cs: [
        "Vytvořil jsem UI komponenty a sekce stránek pro web SolidSun v Next.js, TypeScriptu a Tailwind CSS.",
        "Zlepšil jsem uživatelský zážitek a výkon klientských projektů pro SolidSun a Sype.to.",
        "Pracoval jsem podle návrhů ve Figmě se Storybookem, Sanity a Vercelem; v týmu jsme používali Git.",
      ],
    },
  },
  {
    slug: "blackfish",
    legacyCompany: "Blackfish.co",
    company: "Blackfish",
    kind: "work",
    start: "2023-06",
    end: "2023-12",
    stack: "Next.js, TypeScript, Tailwind CSS, Storybook, Sanity, Vercel",
    related: ["csg-website", "skladon-website"],
    position: { en: "Frontend Web Developer (contract)", cs: "Frontend vývojář (externě)" },
    bullets: {
      en: [
        "Built major components and pages for the Czechoslovak Group and Skladon websites from a Storybook design system, in Next.js, TypeScript and Tailwind CSS.",
        "Migrated all the blog posts into Sanity and tested pages before release.",
      ],
      cs: [
        "Vytvořil jsem hlavní komponenty a stránky webů Czechoslovak Group a Skladon podle design systému ve Storybooku, v Next.js, TypeScriptu a Tailwind CSS.",
        "Migroval jsem do Sanity všechny příspěvky z blogu a testoval stránky před vydáním.",
      ],
    },
  },
  {
    slug: "nam-system",
    legacyCompany: "NAM System a.s.",
    company: "NAM system a.s.",
    kind: "work",
    start: "2023-04",
    end: "2023-05",
    position: { en: "IT & Hardware Intern", cs: "Stážista v oblasti IT a hardwaru" },
    bullets: {
      en: [
        "Diagnosed, repaired and assembled computers and server components.",
        "Tested system stability and troubleshot peripherals and electronics.",
      ],
      cs: [
        "Diagnostikoval, opravoval a sestavoval jsem počítače a serverové komponenty.",
        "Testoval jsem stabilitu systémů a řešil problémy s periferiemi a elektronikou.",
      ],
    },
  },
  {
    slug: "vsb",
    company: "VŠB – Technical University of Ostrava, FEI",
    companyCs: "VŠB – Technická univerzita Ostrava, FEI",
    kind: "education",
    start: "2024-09",
    end: null,
    url: "https://www.fei.vsb.cz/",
    related: ["catering-is", "zpg", "osy", "tetris", "donkey-kong"],
    position: { en: "Bachelor’s degree, Computer Science", cs: "Bakalářské studium, Informatika" },
    bullets: {
      en: [
        "GPA 94.42/100.",
        "Master’s at VŠB planned from September 2027, continuing in Informatics (specialisation not decided yet).",
      ],
      cs: [
        "GPA 94,42/100.",
        "Od září 2027 plánuji navázat magisterským studiem informatiky na VŠB (specializace zatím není určena).",
      ],
    },
  },
  {
    slug: "spse-havirov",
    company: "SPŠE Havířov",
    kind: "education",
    start: "2020-09",
    end: "2024-08",
    position: {
      en: "Secondary School of Electrical Engineering, Information Technology",
      cs: "Střední průmyslová škola elektrotechnická, Informační technologie",
    },
    bullets: {
      en: [
        "Graduated with honors as the top student of my year.",
        "Passed the maturita in Hardware and Networks, a practical IT exam and Czech.",
      ],
      cs: [
        "Maturoval jsem s vyznamenáním jako nejlepší student ročníku.",
        "Maturita: Hardware a sítě, praktická zkouška z IT, český jazyk.",
      ],
    },
  },
  {
    slug: "cae",
    company: "Cambridge English",
    kind: "course",
    start: "2025-09",
    end: "2025-09",
    position: { en: "Cambridge English: Advanced (CAE), level C2", cs: "Cambridge English: Advanced (CAE), úroveň C2" },
    bullets: { en: [], cs: [] },
  },
  {
    slug: "udemy-react",
    legacyCompany: "React - The Complete Guide 2024",
    company: "Udemy",
    kind: "course",
    start: "2023-01",
    end: "2023-12",
    position: { en: "React – The Complete Guide (70 hours)", cs: "React – The Complete Guide (70 hodin)" },
    bullets: { en: [], cs: [] },
  },
];

type ProjectSeed = {
  slug: string;
  kind: "work" | "school" | "hidden";
  featured?: boolean;
  thumbnail?: string;
  sourceUrl?: string;
  liveUrl?: string;
  stack: string[];
  language?: string;
  libraries?: string;
  platform?: string;
  platformCs?: string;
  librariesCs?: string;
  client?: string;
  t: T<{ name: string; summary: string; description: string[]; role?: string; thumbnailAlt?: string; decision?: string; result?: string; next?: string }>;
};

const webStack = ["Next.js", "TypeScript", "Tailwind CSS", "Storybook", "Sanity", "Vercel"];

const projects: ProjectSeed[] = [
  {
    slug: "csg-website",
    kind: "work",
    thumbnail: "/images/projects/csg.webp",
    liveUrl: "https://csg.com/",
    client: "Czechoslovak Group",
    stack: webStack,
    t: {
      en: {
        name: "CSG website",
        summary: "Corporate website for Czechoslovak Group, built at Blackfish.",
        role: "Frontend developer (Blackfish)",
        thumbnailAlt: "Home page of the Czechoslovak Group website",
        description: [
          "Production corporate website for an international industrial group, with content managed in Sanity.",
          "I built components and pages from the design system in Storybook, migrated content, improved UX details and tested pages before release.",
        ],
      },
      cs: {
        name: "Web CSG",
        summary: "Firemní web skupiny Czechoslovak Group, vytvořený ve firmě Blackfish.",
        role: "Frontend vývojář (Blackfish)",
        thumbnailAlt: "Úvodní stránka webu Czechoslovak Group",
        description: [
          "Produkční firemní web mezinárodní průmyslové skupiny s obsahem spravovaným v Sanity.",
          "Tvořil jsem komponenty a stránky podle design systému ve Storybooku, migroval obsah, ladil detaily UX a testoval stránky před vydáním.",
        ],
      },
    },
  },
  {
    slug: "skladon-website",
    kind: "work",
    thumbnail: "/images/projects/skladon.webp",
    liveUrl: "https://www.skladon.com/",
    client: "Skladon",
    stack: webStack,
    t: {
      en: {
        name: "Skladon website",
        summary: "Website of a logistics platform, built at Blackfish.",
        role: "Frontend developer (Blackfish)",
        thumbnailAlt: "Home page of the Skladon website",
        description: [
          "Marketing website for a warehousing and logistics platform.",
          "I built components, migrated content and tested pages before release.",
        ],
      },
      cs: {
        name: "Web Skladon",
        summary: "Web logistické platformy, vytvořený ve firmě Blackfish.",
        role: "Frontend vývojář (Blackfish)",
        thumbnailAlt: "Úvodní stránka webu Skladon",
        description: [
          "Prezentační web platformy pro skladování a logistiku.",
          "Tvořil jsem komponenty, migroval obsah a testoval stránky před vydáním.",
        ],
      },
    },
  },
  {
    slug: "solidsun-platform",
    kind: "work",
    thumbnail: "/images/projects/solidsun.webp",
    liveUrl: "https://www.solidsun.cz/",
    client: "SolidSun",
    stack: webStack,
    t: {
      en: {
        name: "SolidSun website",
        summary: "Next.js website for a solar energy company, built at SHOWMORE.",
        role: "Frontend developer (SHOWMORE)",
        thumbnailAlt: "Home page of the SolidSun website",
        description: [
          "Website for a Czech photovoltaics company.",
          "I built UI components and page sections and worked on integration tasks in the Next.js application.",
        ],
      },
      cs: {
        name: "Web SolidSun",
        summary: "Web v Next.js pro firmu z oboru solární energie, vytvořený ve firmě SHOWMORE.",
        role: "Frontend vývojář (SHOWMORE)",
        thumbnailAlt: "Úvodní stránka webu SolidSun",
        description: [
          "Web české firmy zabývající se fotovoltaikou.",
          "Tvořil jsem UI komponenty a sekce stránek a pracoval na integračních úlohách v aplikaci Next.js.",
        ],
      },
    },
  },
  {
    slug: "catering-is",
    kind: "school",
    featured: true,
    thumbnail: "/images/projects/catering.webp",
    sourceUrl: "https://github.com/JaZafier00716/catering_project",
    stack: ["Java 21", "JavaFX", "JDK HttpServer", "JDBC", "Oracle 19c", "Apache PDFBox", "JUnit 5", "Maven"],
    language: "Java 21, Oracle SQL",
    libraries: "JavaFX, JDK HttpServer, JDBC, Apache PDFBox, JUnit 5",
    platform: "Desktop and web, Oracle 19c",
    platformCs: "Desktop a web, Oracle 19c",
    t: {
      en: {
        role: "Solo project",
        decision: "Hand-written JDBC data mappers, no ORM, as the assignment required. Trade-off: full control over SQL, but more mapping code to write and test.",
        result: "330 automated tests, mvn clean test with 0 failures, plus a re-runnable Oracle schema with constraints and triggers.",
        name: "Catering information system",
        summary: "Information system for catering companies: menus with revisions, sharing with customers, PDF export.",
        thumbnailAlt: "Main window of the desktop client with a project’s menus",
        description: [
          "Semester project for two VŠB courses (VIS and TDS-I): an information system for catering staff. It covers project folders and documents, menus with revisions, sharing a menu with a customer through a link, customer comments, PDF export and user administration.",
          "The desktop client is in JavaFX. The customer page and the manager overview run on the JDK HttpServer. Data are in Oracle through hand-written JDBC data mappers, without frameworks or an ORM, as the assignment requires.",
          "The database part has a re-runnable DDL schema with constraints, triggers and indexes, test data, integrity checks and a query catalogue, modelled in Oracle SQL Developer Data Modeler.",
        ],
      },
      cs: {
        role: "Samostatný projekt",
        decision: "Vlastní JDBC mappery bez frameworku a ORM, jak vyžadovalo zadání. Kompromis: plná kontrola nad každým SQL dotazem za cenu většího množství mapovacího kódu, který je třeba napsat a otestovat.",
        result: "330 automatizovaných testů, mvn clean test bez chyb. Znovu spustitelné schéma v Oracle s omezeními, triggery a kontrolami integrity.",
        name: "Informační systém pro catering",
        summary: "Informační systém pro cateringové firmy: jídelníčky s revizemi, sdílení se zákazníky, export do PDF.",
        thumbnailAlt: "Hlavní okno desktopového klienta s jídelníčky projektu",
        description: [
          "Semestrální projekt pro dva předměty na VŠB (VIS a TDS-I): informační systém pro zaměstnance cateringové firmy. Obsahuje složky projektů a dokumenty, jídelníčky s revizemi, sdílení jídelníčku se zákazníkem pomocí odkazu, komentáře zákazníků, export do PDF a správu uživatelů.",
          "Desktopový klient je v JavaFX. Zákaznická stránka a přehled pro manažery běží na JDK HttpServer. Data jsou v Oracle přes vlastní JDBC mappery, bez frameworků a ORM, jak zadání vyžaduje.",
          "Databázová část má znovu spustitelné DDL schéma s omezeními, triggery a indexy, testovací data, kontroly integrity a katalog dotazů, modelované v Oracle SQL Developer Data Modeler.",
        ],
      },
    },
  },
  {
    slug: "skj-projekt",
    kind: "school",
    featured: true,
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "WebSocket", "Redis", "NumPy", "pytest"],
    language: "Python 3",
    platform: "Linux",
    t: {
      en: {
        role: "One of two developers. My part: the gateway API (file and bucket endpoints, schemas, database and configuration), the image-processing endpoint and worker, and their tests.",
        decision: "We kept JSON as the default message format. In our broker benchmark (5 publishers × 5 subscribers, 25,000 deliveries on localhost) JSON reached 4,015 msg/s and MessagePack 2,476 msg/s. MessagePack stays an option (?fmt=msgpack) for binary payloads.",
        result: "Gateway, broker (durable queue, ACKs), storage node and async image worker run together, with 49 pytest tests.",
        name: "S3-compatible object storage",
        summary: "Part of an S3-compatible object storage in Python: API gateway, message broker, storage node and image worker.",
        description: [
          "Two-person team project for the SKJ course at VŠB-TUO, spring 2026. We implemented part of an S3-compatible object storage service in Python.",
          "The FastAPI gateway manages buckets, object upload and download, and soft delete, and bills storage and ingress and egress traffic per bucket. A WebSocket message broker routes messages by topic, keeps a durable queue and confirms delivery with ACKs, in JSON or MessagePack. A Haystack-style append-only storage node holds the object data, and an async NumPy image-processing worker takes its jobs from a Redis queue.",
          "The source is in a private university repository, so there is no public link.",
        ],
      },
      cs: {
        role: "Jeden ze dvou vývojářů. Moje část: API brány (endpointy pro soubory a buckety, schémata, databáze a konfigurace), endpoint a worker pro zpracování obrazů a jejich testy.",
        decision: "JSON jsme ponechali jako výchozí formát zpráv. V našem benchmarku brokeru (5 publisherů × 5 subscriberů, 25 000 doručení na localhostu) dosáhl JSON 4 015 zpráv/s a MessagePack 2 476 zpráv/s. MessagePack zůstává volitelný (?fmt=msgpack) pro binární data.",
        result: "Brána, broker zpráv s trvalou frontou a potvrzováním ACK, úložný uzel a asynchronní worker pro obrazy fungují dohromady; projekt má 49 testů v pytestu.",
        name: "Objektové úložiště kompatibilní s S3",
        summary: "Část objektového úložiště kompatibilního s S3 v Pythonu: brána API, broker zpráv, úložný uzel a worker pro zpracování obrazů.",
        description: [
          "Dvoučlenný týmový projekt do předmětu SKJ na VŠB-TUO, jaro 2026. Implementovali jsme v Pythonu část objektového úložiště kompatibilního s S3.",
          "Brána FastAPI spravuje buckety, nahrávání a stahování objektů a měkké smazání. Pro každý bucket účtuje úložný prostor a přenos dat dovnitř a ven. WebSocket broker zpráv směruje zprávy podle témat, drží trvalou frontu a potvrzuje doručení zprávami ACK, a to ve formátu JSON nebo MessagePack. Úložný uzel v duchu Haystacku ukládá data objektů pouze k zápisu na konec a asynchronní worker s NumPy zpracovává obrazy s úlohami z fronty v Redisu.",
          "Zdrojový kód je v soukromém univerzitním repozitáři, proto zde není veřejný odkaz.",
        ],
      },
    },
  },
  {
    slug: "zpg",
    kind: "school",
    featured: true,
    stack: ["C++23", "OpenGL", "GLSL", "GLFW", "GLAD", "GLM", "stb_image", "CMake"],
    language: "C++23, GLSL",
    libraries: "OpenGL, GLFW, GLAD, GLM, stb_image",
    platform: "CMake",
    t: {
      en: {
        role: "Solo coursework",
        decision: "The programmable pipeline: GLSL shaders with GLM transforms. Trade-off: more setup before the first frame, in exchange for control over every vertex and pixel.",
        result: "Basic rendering of various scenes, built to learn how rendering works: individual lighting models, shaders and textures.",
        name: "ZPG: OpenGL graphics",
        summary: "3D rendering in modern OpenGL with shaders, transforms and textured models.",
        description: [
          "Coursework for the computer graphics course at VŠB. The program opens a GLFW window, loads OpenGL through GLAD and renders 3D scenes with GLM transforms and GLSL shaders.",
          "The source is in a private university repository, so there is no public link.",
        ],
      },
      cs: {
        role: "Samostatná práce",
        decision: "Programovatelná pipeline: shadery v GLSL a transformace z GLM. Kompromis: víc přípravy před prvním snímkem, zato kontrola nad každým vrcholem a pixelem.",
        result: "Základní vykreslení různých scén, na kterých jsem se učil, jak vykreslování funguje: jednotlivé modely osvětlení, shadery a textury.",
        name: "ZPG: grafika v OpenGL",
        summary: "3D vykreslování v moderním OpenGL se shadery, transformacemi a texturovanými modely.",
        description: [
          "Úlohy z předmětu Základy počítačové grafiky na VŠB. Program otevře okno přes GLFW, načte OpenGL přes GLAD a vykresluje 3D scény s transformacemi z GLM a shadery v GLSL.",
          "Zdrojový kód je v soukromém univerzitním repozitáři, proto zde není veřejný odkaz.",
        ],
      },
    },
  },
  {
    slug: "modal-text-editor",
    kind: "school",
    featured: true,
    thumbnail: "/images/projects/editor.webp",
    sourceUrl: "https://github.com/JaZafier00716/ModalEditor",
    stack: ["C++23", "termios", "ANSI escape sequences", "CMake"],
    language: "C++23",
    libraries: "termios, ANSI escape sequences",
    librariesCs: "termios, ANSI escape sekvence",
    platform: "Linux terminal, CMake",
    platformCs: "Terminál v Linuxu, CMake",
    t: {
      en: {
        role: "Solo project",
        decision: "Raw ANSI escape sequences instead of a library like ncurses. Trade-off: no dependency and full control over rendering, but terminal differences are mine to handle.",
        result: "Normal-mode key bindings are configurable in a motions file. CMake build with optional AddressSanitizer and a Valgrind target.",
        name: "Modal text editor",
        summary: "Vim-inspired modal text editor for the terminal.",
        thumbnailAlt: "The editor open in a terminal, showing a text file",
        description: [
          "A modal text editor for the terminal, written in C++23. Normal-mode key bindings are configurable in a motions file, and the screen is drawn with ANSI escape sequences.",
          "The work focused on the input system and rendering. Builds use CMake with optional AddressSanitizer and a Valgrind target.",
        ],
      },
      cs: {
        role: "Samostatný projekt",
        decision: "Obrazovku kreslím přímo ANSI escape sekvencemi místo knihovny typu ncurses. Kompromis: žádná závislost a plná kontrola nad vykreslováním, ale rozdíly mezi terminály musím řešit sám.",
        result: "Klávesové zkratky normálního režimu se nastavují v konfiguračním souboru. Sestavení přes CMake s volitelným AddressSanitizerem a cílem pro Valgrind.",
        name: "Modální textový editor",
        summary: "Modální textový editor pro terminál inspirovaný Vimem.",
        thumbnailAlt: "Editor otevřený v terminálu s textovým souborem",
        description: [
          "Modální textový editor pro terminál napsaný v C++23. Klávesové zkratky normálního režimu lze nastavit v konfiguračním souboru a obrazovka se vykresluje přes ANSI escape sekvence.",
          "Práce se soustředila na vstupní systém a vykreslování. Sestavení používá CMake s volitelným AddressSanitizerem a cílem pro Valgrind.",
        ],
      },
    },
  },
  {
    slug: "tetris",
    kind: "school",
    thumbnail: "/images/tetris.png",
    sourceUrl: "https://github.com/JaZafier00716/tetris_clone",
    stack: ["C", "SDL2", "CMake"],
    language: "C",
    libraries: "SDL2, SDL2_image, SDL2_ttf",
    platform: "Linux, CMake",
    t: {
      en: {
        role: "Solo project",
        name: "Tetris",
        summary: "Real-time Tetris clone in C with SDL2.",
        thumbnailAlt: "Tetris game board with falling pieces and the score",
        description: [
          "A Tetris clone written in C with SDL2, including the game loop, rendering, controls and collision logic.",
        ],
      },
      cs: {
        role: "Samostatný projekt",
        name: "Tetris",
        summary: "Klon Tetrisu v reálném čase v jazyce C se SDL2.",
        thumbnailAlt: "Herní plocha Tetrisu s padajícími kostkami a skóre",
        description: ["Klon Tetrisu napsaný v C se SDL2, včetně herní smyčky, vykreslování, ovládání a detekce kolizí."],
      },
    },
  },
  {
    slug: "osy",
    kind: "school",
    sourceUrl: "https://github.com/JaZafier00716/OSY",
    stack: ["C", "C++", "POSIX", "Make"],
    language: "C, C++",
    libraries: "POSIX: processes, threads, semaphores, shared memory, message queues, sockets",
    librariesCs: "POSIX: procesy, vlákna, semafory, sdílená paměť, fronty zpráv, sockety",
    platform: "Linux, GNU Make",
    t: {
      en: {
        name: "Operating systems coursework",
        summary: "System programming in C and C++ on Linux: processes, threads, IPC and sockets.",
        description: [
          "Homework, lab exercises and lecture programs for the operating systems course at VŠB.",
          "The programs cover processes and exec, pipes, threads, POSIX semaphores, shared memory, message queues, sockets, asynchronous I/O, and static and shared libraries.",
        ],
      },
      cs: {
        name: "Operační systémy",
        summary: "Systémové programování v C a C++ na Linuxu: procesy, vlákna, IPC a sockety.",
        description: [
          "Domácí úkoly, cvičení a programy k přednáškám z předmětu Operační systémy na VŠB.",
          "Programy pokrývají procesy a exec, roury, vlákna, POSIX semafory, sdílenou paměť, fronty zpráv, sockety, asynchronní I/O a statické a sdílené knihovny.",
        ],
      },
    },
  },
  {
    slug: "donkey-kong",
    kind: "school",
    thumbnail: "/images/donkey_kong_game.png",
    sourceUrl: "https://github.com/JaZafier00716/school/tree/main/druhak/JAVA/DonkeyKongFX-moduless",
    stack: ["Java", "JavaFX", "Hibernate", "H2", "Maven"],
    language: "Java",
    libraries: "JavaFX, Hibernate, H2",
    platform: "Desktop, Maven",
    t: {
      en: {
        name: "Donkey Kong",
        summary: "JavaFX platformer with a modular architecture and an H2 database.",
        thumbnailAlt: "Donkey Kong level with ladders, girders and barrels",
        description: [
          "A platformer in JavaFX with a modular architecture. Game data are stored through Hibernate in an embedded H2 database.",
        ],
      },
      cs: {
        name: "Donkey Kong",
        summary: "Plošinovka v JavaFX s modulární architekturou a databází H2.",
        thumbnailAlt: "Úroveň hry Donkey Kong se žebříky, nosníky a sudy",
        description: ["Plošinovka v JavaFX s modulární architekturou. Herní data se ukládají přes Hibernate do vestavěné databáze H2."],
      },
    },
  },
  {
    slug: "graph-center",
    kind: "school",
    thumbnail: "/images/graph.png",
    stack: ["C++", "CLI"],
    language: "C++",
    platform: "Command line",
    platformCs: "Příkazová řádka",
    t: {
      en: {
        name: "Graph center",
        summary: "C++ tool that finds the center of a graph using BFS eccentricity.",
        thumbnailAlt: "Terminal output of the graph center tool",
        description: [
          "Computes graph centers from BFS eccentricity, handles disconnected graphs and measures run time.",
          "The repository is private, so there is no public link.",
        ],
      },
      cs: {
        name: "Střed grafu",
        summary: "Nástroj v C++, který hledá střed grafu pomocí excentricity z BFS.",
        thumbnailAlt: "Výstup nástroje pro střed grafu v terminálu",
        description: [
          "Počítá středy grafu z excentricity přes BFS, zvládá nesouvislé grafy a měří dobu běhu.",
          "Repozitář je soukromý, proto zde není veřejný odkaz.",
        ],
      },
    },
  },
  {
    slug: "raynet-leaderboard",
    kind: "hidden",
    sourceUrl: "https://github.com/JanMarianek/raynet-",
    stack: ["TypeScript", "React", "Vite", "Storybook", "MSW", "Express"],
    language: "TypeScript",
    libraries: "React, Vite, CSS Modules, Storybook, MSW, Express",
    platform: "Web, npm workspaces",
    t: {
      en: {
        name: "Raynet leaderboard",
        summary: "Team task for an internship selection: a React leaderboard dashboard.",
        role: "Contributor",
        description: [
          "A team repository for an internship selection task at Raynet. The React and TypeScript dashboard shows a leaderboard with a podium, ranking table, filters, search and a trend chart.",
          "I split the UI into components, wrote the Storybook stories and built the filter section.",
        ],
      },
      cs: {
        name: "Žebříček pro Raynet",
        summary: "Týmový úkol z výběrového řízení na stáž: dashboard se žebříčkem v Reactu.",
        role: "Přispěvatel",
        description: [
          "Týmový repozitář pro výběrové řízení na stáž ve firmě Raynet. Dashboard v Reactu a TypeScriptu zobrazuje žebříček s pódiem, tabulku pořadí, filtry, vyhledávání a graf vývoje.",
          "Rozdělil jsem UI do komponent, napsal stories pro Storybook a vytvořil sekci filtrů.",
        ],
      },
    },
  },
  {
    slug: "dev-events",
    kind: "hidden",
    sourceUrl: "https://github.com/JaZafier00716/dev-events-nextjs16-course",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
    language: "TypeScript",
    libraries: "Next.js 16, React 19, Tailwind CSS 4, Radix UI, ogl",
    platform: "Web",
    t: {
      en: {
        name: "Dev events",
        summary: "Course project in Next.js 16 that lists developer events.",
        thumbnailAlt: "Grid of featured developer events on a dark background",
        description: [
          "A follow-along course project in Next.js 16 and React 19. The home page shows featured hackathons, meetups and conferences from sample data, over a WebGL light-ray background.",
        ],
      },
      cs: {
        name: "Dev events",
        summary: "Projekt z kurzu Next.js 16 s výpisem vývojářských akcí.",
        thumbnailAlt: "Mřížka doporučených vývojářských akcí na tmavém pozadí",
        description: [
          "Projekt z kurzu Next.js 16 a React 19. Úvodní stránka ukazuje doporučené hackathony, meetupy a konference z ukázkových dat na pozadí s WebGL efektem světelných paprsků.",
        ],
      },
    },
  },
];

type SkillSeed = { en: string; cs?: string; usedIn?: string[]; detail?: T<string> };
type GroupSeed = { key: string; title: T<string>; skills: SkillSeed[] };

const skillGroups: GroupSeed[] = [
  {
    key: "programming",
    title: { en: "Programming languages", cs: "Programovací jazyky" },
    skills: [
      { en: "C", usedIn: ["tetris", "osy"] },
      { en: "C++", usedIn: ["zpg", "modal-text-editor", "osy", "graph-center"] },
      { en: "Java", usedIn: ["catering-is", "donkey-kong"] },
      { en: "TypeScript", usedIn: ["csg-website", "solidsun-platform"] },
      { en: "Python", usedIn: ["futtec", "skj-projekt"] },
      { en: "SQL, PL/SQL", usedIn: ["catering-is"] },
      { en: "Haskell" },
      { en: "VHDL" },
      { en: "x86 assembly (NASM)", cs: "Assembler x86 (NASM)" },
    ],
  },
  {
    key: "graphics",
    title: { en: "Graphics", cs: "Grafika" },
    skills: [
      { en: "OpenGL, GLSL", usedIn: ["zpg"] },
      { en: "SDL2", usedIn: ["tetris"] },
      { en: "JavaFX", usedIn: ["catering-is", "donkey-kong"] },
    ],
  },
  {
    key: "web",
    title: { en: "Web and backend", cs: "Web a backend" },
    skills: [
      { en: "Next.js, React", usedIn: ["csg-website", "skladon-website", "solidsun-platform"] },
      { en: "Tailwind CSS", usedIn: ["csg-website", "solidsun-platform"] },
      { en: "Storybook", usedIn: ["csg-website"] },
      { en: "Sanity CMS", usedIn: ["csg-website", "skladon-website"] },
      { en: "Prisma, PostgreSQL" },
      { en: "PHP, MySQL" },
    ],
  },
  {
    key: "data",
    title: { en: "Data and ML", cs: "Data a ML" },
    skills: [
      { en: "Oracle Database", usedIn: ["catering-is"] },
      { en: "Hibernate, H2", usedIn: ["donkey-kong"] },
      { en: "Dataset annotation in CVAT", cs: "Anotace datových sad v CVAT", usedIn: ["cvat"] },
    ],
  },
  {
    key: "tools",
    title: { en: "Tools", cs: "Nástroje" },
    skills: [
      { en: "Git", detail: { en: "Used in every project", cs: "Používám ve všech projektech" } },
      { en: "CMake", usedIn: ["zpg", "modal-text-editor", "tetris"] },
      { en: "Maven", usedIn: ["catering-is", "donkey-kong"] },
      { en: "Pytest", usedIn: ["futtec"] },
      { en: "Docker", usedIn: ["catering-is"] },
      { en: "Linux", detail: { en: "Debian (daily driver); also Mint, Arch, Fedora", cs: "Debian (každodenně); dále Mint, Arch, Fedora" } },
    ],
  },
  {
    key: "spoken",
    title: { en: "Spoken languages", cs: "Jazyky" },
    skills: [
      { en: "Czech, native", cs: "Čeština, rodilý mluvčí" },
      { en: "English, Cambridge C2 Advanced (CAE)", cs: "Angličtina, Cambridge C2 Advanced (CAE)", usedIn: ["cae"] },
    ],
  },
];

const month = (ym: string) => new Date(`${ym}-01T00:00:00Z`);

// Legacy `time` column, shown only by the pre-redesign site. CV format: "9/2026 – současnost", "Sep 2026 – present".
const cvDate = (ym: string, lang: "en" | "cs") =>
  lang === "cs"
    ? `${Number(ym.slice(5))}/${ym.slice(0, 4)}`
    : new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(month(ym));

async function seedExperiences() {
  for (const [i, e] of experiences.entries()) {
    const existing = await prisma.experience.findFirst({
      where: { OR: [{ slug: e.slug }, ...(e.legacyCompany ? [{ company: e.legacyCompany }] : [])] },
    });
    const data = {
      slug: e.slug,
      company: e.company,
      kind: e.kind,
      sortOrder: i + 1,
      startDate: month(e.start),
      endDate: e.end ? month(e.end) : null,
      url: e.url ?? null,
      stack: e.stack ?? "",
      related: e.related ?? [],
    };
    const row = existing
      ? await prisma.experience.update({ where: { id: existing.id }, data })
      : await prisma.experience.create({ data });
    for (const lang of ["en", "cs"] as const) {
      const legacy = {
        time: `${cvDate(e.start, lang)} – ${e.end ? cvDate(e.end, lang) : lang === "en" ? "present" : "současnost"}`,
        skills: JSON.stringify(e.bullets[lang].map((title, id) => ({ id, title }))),
      };
      const t = {
        position: e.position[lang],
        bullets: e.bullets[lang],
        company: lang === "cs" ? (e.companyCs ?? null) : null,
        stack: lang === "cs" ? (e.stackCs ?? null) : null,
        ...legacy,
      };
      await prisma.experienceTranslation.upsert({
        where: { experienceId_lang: { experienceId: row.id, lang } },
        update: t,
        create: { experienceId: row.id, lang, ...t },
      });
    }
  }
}

async function seedProjects() {
  for (const [i, p] of projects.entries()) {
    const { t, platformCs, librariesCs, ...rest } = p;
    const data = {
      ...rest,
      sortOrder: i + 1,
      featured: p.featured ?? false,
      thumbnail: p.thumbnail ?? null,
      sourceUrl: p.sourceUrl ?? null,
      liveUrl: p.liveUrl ?? null,
      language: p.language ?? null,
      libraries: p.libraries ?? null,
      platform: p.platform ?? null,
      client: p.client ?? null,
    };
    const row = await prisma.project.upsert({ where: { slug: p.slug }, update: data, create: data });
    for (const lang of ["en", "cs"] as const) {
      const tr = {
        ...t[lang],
        role: t[lang].role ?? null,
        thumbnailAlt: t[lang].thumbnailAlt ?? null,
        decision: t[lang].decision ?? null,
        result: t[lang].result ?? null,
        next: t[lang].next ?? null,
        platform: lang === "cs" ? (platformCs ?? null) : null,
        libraries: lang === "cs" ? (librariesCs ?? null) : null,
      };
      await prisma.projectTranslation.upsert({
        where: { projectId_lang: { projectId: row.id, lang } },
        update: tr,
        create: { projectId: row.id, lang, ...tr },
      });
    }
  }
}

async function seedSkills() {
  for (const [gi, g] of skillGroups.entries()) {
    const group = { sortOrder: gi + 1, titleEn: g.title.en, titleCs: g.title.cs };
    const row = await prisma.skillGroup.upsert({ where: { key: g.key }, update: group, create: { key: g.key, ...group } });
    // Renamed rows are updated in place (no duplicate); runs once, then matches nothing.
    await prisma.skill.updateMany({ where: { groupId: row.id, nameEn: "Linux (Debian)" }, data: { nameEn: "Linux", nameCs: "Linux" } });
    // Express is no longer used in any listed project. Jan approved deleting this one row (2026-11-18).
    await prisma.skill.deleteMany({ where: { groupId: row.id, nameEn: "Express" } });
    for (const [si, s] of g.skills.entries()) {
      const skill = { sortOrder: si + 1, nameCs: s.cs ?? s.en, usedIn: s.usedIn ?? [], detailEn: s.detail?.en ?? null, detailCs: s.detail?.cs ?? null };
      await prisma.skill.upsert({
        where: { groupId_nameEn: { groupId: row.id, nameEn: s.en } },
        update: skill,
        create: { groupId: row.id, nameEn: s.en, ...skill },
      });
    }
  }
}

await seedExperiences();
await seedProjects();
await seedSkills();
await prisma.$disconnect();
console.log("Seeded", experiences.length, "experiences,", projects.length, "projects,", skillGroups.length, "skill groups");
