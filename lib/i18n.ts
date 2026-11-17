export const langs = ["en", "cs"] as const;
export type Lang = (typeof langs)[number];

export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);
export const altLang = (lang: Lang): Lang => (lang === "en" ? "cs" : "en");

export const siteUrl = "https://jan-zamostny.vercel.app";

/** Swap the leading /en or /cs of a path. */
export const switchLangPath = (path: string, to: Lang) => path.replace(/^\/(en|cs)(?=\/|$)/, `/${to}`);

const en = {
  langName: "English",
  skip: "Skip to content",
  nav: { label: "Main", home: "Home", experience: "Experience", projects: "Projects", skills: "Skills" },
  menu: "Menu",
  darkTheme: "Dark theme",
  newTab: "(opens in new tab)",
  home: {
    eyebrow: "Student · VŠB-TUO · Ostrava",
    role: "Computer science student and QA automation intern at FUTTEC. I write software from C and OpenGL up to Next.js.",
    contact: "Contact",
    featured: "Featured projects",
    allProjects: "View all projects",
    description: "Computer science student at VŠB-TUO and QA automation intern. Projects in C, C++, OpenGL, Java and Next.js.",
  },
  cv: { download: "Download CV", meta: "PDF" },
  contact: { title: "Contact", email: "Email", phone: "Phone", linkedin: "LinkedIn", github: "GitHub" },
  copy: { label: "Copy", done: "Copied", failed: "Copy failed" },
  experience: {
    title: "Experience",
    intro: "Work, school and courses, newest first.",
    work: "Work",
    education: "Education",
    courses: "Courses and certificates",
    present: "present",
    related: "Related projects",
    description: "Work experience, education and courses of Jan Zámostný.",
  },
  projects: {
    title: "Projects",
    intro: "Client work, school projects and other code. Each project has a detail page.",
    work: "Work projects",
    school: "School projects",
    other: "Other projects",
    source: "Source",
    live: "Live site",
    viewSource: "View source",
    openLive: "Open live site",
    all: "All projects",
    back: "Back to projects",
    about: "Description",
    description: "Work and school projects by Jan Zámostný: C, C++, OpenGL, Java and Next.js.",
  },
  table: {
    language: "Language",
    libraries: "Libraries",
    platform: "Platform",
    source: "Source",
    client: "Client",
    role: "Role",
    stack: "Stack",
    live: "Live site",
  },
  skills: {
    title: "Skills",
    intro: "Grouped by area, with the projects and jobs where each one was used.",
    skill: "Skill",
    usedIn: "Where used",
    description: "Programming languages, graphics, web, data and tools Jan Zámostný has used, with links to projects.",
  },
  footer: { updated: "Last updated", copyright: "Jan Zámostný" },
  notFound: {
    title: "Page not found",
    text: "This page does not exist. It may have moved when the site was rebuilt.",
    home: "Home",
  },
};

export type Dict = typeof en;

const cs: Dict = {
  langName: "Čeština",
  skip: "Přeskočit na obsah",
  nav: { label: "Hlavní", home: "Úvod", experience: "Zkušenosti", projects: "Projekty", skills: "Dovednosti" },
  menu: "Menu",
  darkTheme: "Tmavý režim",
  newTab: "(otevře se v novém panelu)",
  home: {
    eyebrow: "Student · VŠB-TUO · Ostrava",
    role: "Student informatiky a stážista v automatizaci QA ve FUTTEC. Píšu software od C a OpenGL až po Next.js.",
    contact: "Kontakt",
    featured: "Vybrané projekty",
    allProjects: "Všechny projekty",
    description: "Student informatiky na VŠB-TUO a stážista v automatizaci QA. Projekty v C, C++, OpenGL, Javě a Next.js.",
  },
  cv: { download: "Stáhnout CV", meta: "PDF" },
  contact: { title: "Kontakt", email: "E-mail", phone: "Telefon", linkedin: "LinkedIn", github: "GitHub" },
  copy: { label: "Kopírovat", done: "Zkopírováno", failed: "Kopírování selhalo" },
  experience: {
    title: "Zkušenosti",
    intro: "Práce, škola a kurzy, od nejnovějších.",
    work: "Práce",
    education: "Vzdělání",
    courses: "Kurzy a certifikáty",
    present: "současnost",
    related: "Související projekty",
    description: "Pracovní zkušenosti, vzdělání a kurzy Jana Zámostného.",
  },
  projects: {
    title: "Projekty",
    intro: "Práce pro klienty, školní projekty a další kód. Každý projekt má vlastní stránku.",
    work: "Pracovní projekty",
    school: "Školní projekty",
    other: "Další projekty",
    source: "Zdrojový kód",
    live: "Web",
    viewSource: "Zdrojový kód",
    openLive: "Otevřít web",
    all: "Všechny projekty",
    back: "Zpět na projekty",
    about: "Popis",
    description: "Pracovní a školní projekty Jana Zámostného: C, C++, OpenGL, Java a Next.js.",
  },
  table: {
    language: "Jazyk",
    libraries: "Knihovny",
    platform: "Platforma",
    source: "Zdroj",
    client: "Klient",
    role: "Role",
    stack: "Technologie",
    live: "Web",
  },
  skills: {
    title: "Dovednosti",
    intro: "Rozdělené podle oblastí, s projekty a pracemi, kde jsem je použil.",
    skill: "Dovednost",
    usedIn: "Kde použito",
    description: "Programovací jazyky, grafika, web, data a nástroje, se kterými Jan Zámostný pracoval, s odkazy na projekty.",
  },
  footer: { updated: "Naposledy aktualizováno", copyright: "Jan Zámostný" },
  notFound: {
    title: "Stránka nenalezena",
    text: "Tato stránka neexistuje. Mohla se přesunout při přestavbě webu.",
    home: "Úvod",
  },
};

export const getDict = (lang: Lang): Dict => (lang === "cs" ? cs : en);

/** "Jun – Oct 2024", "Sep 2026 – present"; courses show the year only. */
export function formatPeriod(lang: Lang, start: Date | null, end: Date | null, yearOnly = false) {
  if (!start) return "";
  const fmt = new Intl.DateTimeFormat(lang, {
    ...(yearOnly ? {} : { month: "short" }),
    year: "numeric",
    timeZone: "UTC",
  });
  if (!end) return `${fmt.format(start)} – ${getDict(lang).experience.present}`;
  return fmt.formatRange(start, end);
}
