import { nbsp } from "@/lib/typography";

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
  theme: { toDark: "Switch to dark theme", toLight: "Switch to light theme", toggle: "Switch theme" },
  newTab: "(opens in new tab)",
  home: {
    title: "Jan Zámostný, computer science student",
    eyebrow: "Student · VŠB-TUO · Ostrava",
    role: "Computer science student and QA automation intern at FUTTEC. I write software from C and OpenGL up to Next.js.",
    contact: "Contact",
    featured: "Featured projects",
    allProjects: "View all projects",
    description: "Computer science student at VŠB-TUO and QA automation intern. Projects in C, C++, OpenGL, Java and Next.js.",
  },
  cv: { download: "Download CV", meta: "PDF" },
  contact: { title: "Contact", email: "Email", phone: "Phone", linkedin: "LinkedIn", github: "GitHub" },
  copy: { email: "Copy email", phone: "Copy phone", done: "Copied", failed: "Copy failed" },
  experience: {
    title: "Experience",
    intro: "Work, school and courses, newest first.",
    work: "Work",
    education: "Education",
    courses: "Courses and certificates",
    present: "present",
    related: "Related projects",
    contact: "Get in touch",
    description: "Work experience, education and courses of Jan Zámostný.",
  },
  projects: {
    title: "Projects",
    intro: "Client work and school projects. Each project has a detail page.",
    work: "Work projects",
    school: "School projects",
    source: "Source",
    live: "Live site",
    viewSource: "View source",
    openLive: "Open live site",
    all: "All projects",
    back: "Back to projects",
    next: "Next project",
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
    none: "none",
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
  nav: { label: "Hlavní navigace", home: "Úvod", experience: "Zkušenosti", projects: "Projekty", skills: "Dovednosti" },
  menu: "Menu",
  theme: { toDark: "Přepnout na tmavý režim", toLight: "Přepnout na světlý režim", toggle: "Přepnout režim" },
  newTab: "(otevře se v novém panelu)",
  home: {
    title: "Jan Zámostný, student informatiky",
    eyebrow: "Student · VŠB-TUO · Ostrava",
    role: "Student informatiky a stážista v QA automatizaci ve společnosti FUTTEC. Programuji od C a OpenGL až po Next.js.",
    contact: "Kontakt",
    featured: "Vybrané projekty",
    allProjects: "Všechny projekty",
    description: "Student informatiky na VŠB-TUO a stážista v QA automatizaci. Projekty v C, C++, OpenGL, Javě a Next.js.",
  },
  cv: { download: "Stáhnout CV", meta: "PDF" },
  contact: { title: "Kontakt", email: "E-mail", phone: "Telefon", linkedin: "LinkedIn", github: "GitHub" },
  copy: { email: "Kopírovat e-mail", phone: "Kopírovat telefon", done: "Zkopírováno", failed: "Kopírování selhalo" },
  experience: {
    title: "Zkušenosti",
    intro: "Práce, škola a kurzy, od nejnovějších.",
    work: "Práce",
    education: "Vzdělání",
    courses: "Kurzy a certifikáty",
    present: "současnost",
    related: "Související projekty",
    contact: "Napište mi",
    description: "Pracovní zkušenosti, vzdělání a kurzy Jana Zámostného.",
  },
  projects: {
    title: "Projekty",
    intro: "Práce pro klienty a školní projekty. Každý projekt má vlastní stránku.",
    work: "Pracovní projekty",
    school: "Školní projekty",
    source: "Zdrojový kód",
    live: "Web",
    viewSource: "Zdrojový kód",
    openLive: "Otevřít web",
    all: "Všechny projekty",
    back: "Zpět na projekty",
    next: "Další projekt",
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
    intro: "Rozdělené podle oblastí, s odkazy na projekty a práci, kde jsem je použil.",
    skill: "Dovednost",
    usedIn: "Použito v",
    none: "nic",
    description: "Programovací jazyky, grafika, web, data a nástroje, se kterými Jan Zámostný pracoval, s odkazy na projekty.",
  },
  footer: { updated: "Naposledy aktualizováno", copyright: "Jan Zámostný" },
  notFound: {
    title: "Stránka nenalezena",
    text: "Tato stránka neexistuje. Mohla se přesunout při přestavbě webu.",
    home: "Úvod",
  },
};

// Typography is applied once here: every dictionary string goes through nbsp(); content text does it in lib/content.ts.
const localize = <T,>(v: T, lang: Lang): T =>
  typeof v === "string"
    ? (nbsp(v, lang) as T)
    : (Object.fromEntries(Object.entries(v as object).map(([k, x]) => [k, localize(x, lang)])) as T);
const dicts = { en: localize(en, "en"), cs: localize(cs, "cs") };

export const getDict = (lang: Lang): Dict => dicts[lang];

/**
 * "Jun – Dec 2023" / "čvn – pro 2023", "Sep 2026 – present" / "zář 2026 – současnost"; courses show the year only.
 * Built from month-only parts because Czech CLDR data spells months out in full whenever a year is included.
 */
export function formatPeriod(lang: Lang, start: Date | null, end: Date | null, yearOnly = false) {
  if (!start) return "";
  const year = (d: Date) => String(d.getUTCFullYear());
  const month = new Intl.DateTimeFormat(lang, { month: "short", timeZone: "UTC" }).format;
  const full = (d: Date) => (yearOnly ? year(d) : `${month(d)} ${year(d)}`);
  // en: closed en dash "2023–2024"; cs: spaced, with a no-break space so the dash never starts a line.
  const sep = lang === "cs" ? "\u00A0– " : "–";
  if (!end) return `${full(start)}${sep}${getDict(lang).experience.present}`;
  if (full(start) === full(end)) return full(end);
  if (!yearOnly && year(start) === year(end)) return `${month(start)}${sep}${full(end)}`;
  return `${full(start)}${sep}${full(end)}`;
}
