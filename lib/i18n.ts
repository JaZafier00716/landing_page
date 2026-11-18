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
    titleLine: "Software developer\u00A0· QA automation\u00A0· Ostrava",
    status: "Open to opportunities",
    statement: "I build and test software, from C and OpenGL up to Next.js.",
    readout: {
      now: "now",
      study: "study",
      based: "based",
      stack: "stack",
      before: "before",
      want: "want",
      nowValue: "QA Automation Engineer (internship), FUTTEC a.s. · remote · since Sep 2026",
      studyValue: "Bachelor’s, Computer Science, VŠB – Technical University of Ostrava · GPA 94.42/100 · master’s planned from Sep 2027",
      basedValue: "Ostrava, Czech Republic",
      stackValue: "C · C++ · OpenGL · Java · Python · TypeScript / Next.js",
      beforeValue: "Frontend developer at SHOWMORE (2024) and Blackfish (2023, contract)",
      wantValue: "Open to opportunities: part-time or near full-time, on-site or hybrid in Ostrava, or remote",
    },
    featured: "Selected projects",
    experience: "Experience",
    allProjects: "All projects",
    allExperience: "All experience",
    description: "Computer science student at VŠB-TUO and QA automation intern. Projects in C, C++, OpenGL, Java and Next.js.",
  },
  cv: { download: "Download CV", pill: "CV", meta: "PDF", kb: "KB" },
  prefs: { name: "Preferences", trigger: "Preferences: language and theme", language: "Language", theme: "Theme" },
  motion: { pause: "Pause animations" },
  stackLabel: "Stack",
  contact: {
    title: "Get in touch",
    intro: "Open to part-time or near full-time work as a software developer, in QA or full-stack, on-site or hybrid in Ostrava, or remote. Send a message here or email me directly.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    name: "Name",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    privacy: "I use your name and email only to reply. Your message is delivered to me by email via Resend and isn’t stored on this site.",
    errorPrefix: "Error:",
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email address, like name@example.com.",
      empty: "Write a message.",
      tooLong: "The message is too long (2,000 characters at most).",
      summary: "Please check the fields marked below.",
    },
    failed: "The message couldn’t be sent. Please email me at",
    success: "Thanks, your message was sent. I’ll reply to the email address you entered.",
  },
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
    problem: "Problem",
    decision: "Decision",
    result: "Result",
    nextStep: "Next",
    caseStudy: "Read the case study",
    private: "Private university repository",
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
  footer: { built: "Built with Next.js, source on", github: "GitHub", short: "GitHub" },
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
    titleLine: "Softwarový vývojář\u00A0· automatizace testů\u00A0· Ostrava",
    status: "Otevřený nabídkám",
    statement: "Vyvíjím a testuji software, od C a OpenGL až po Next.js.",
    readout: {
      now: "nyní",
      study: "studium",
      based: "místo",
      stack: "technologie",
      before: "dříve",
      want: "hledám",
      nowValue: "QA Automation Engineer (stáž), FUTTEC a.s. · na dálku · od září 2026",
      studyValue: "Informatika (Bc.), VŠB – Technická univerzita Ostrava · GPA 94,42/100 · od září 2027 navazující magisterské studium",
      basedValue: "Ostrava",
      stackValue: "C · C++ · OpenGL · Java · Python · TypeScript / Next.js",
      beforeValue: "Frontend vývojář ve firmách SHOWMORE (2024) a Blackfish (2023, externě)",
      wantValue: "částečný nebo téměř plný úvazek: prezenčně či hybridně v Ostravě, nebo na dálku",
    },
    featured: "Vybrané projekty",
    experience: "Zkušenosti",
    allProjects: "Všechny projekty",
    allExperience: "Všechny zkušenosti",
    description: "Student informatiky na VŠB-TUO a stážista v QA automatizaci. Projekty v C, C++, OpenGL, Javě a Next.js.",
  },
  cv: { download: "Stáhnout CV", pill: "CV", meta: "PDF", kb: "kB" },
  prefs: { name: "Předvolby", trigger: "Předvolby: jazyk a vzhled", language: "Jazyk", theme: "Vzhled" },
  motion: { pause: "Pozastavit animace" },
  stackLabel: "Technologie",
  contact: {
    title: "Napište mi",
    intro: "Hledám pozici softwarového vývojáře, v QA nebo full-stack, na částečný či téměř plný úvazek: prezenčně nebo hybridně v Ostravě, případně na dálku. Napište mi přes formulář, nebo rovnou e-mailem.",
    email: "E-mail",
    phone: "Telefon",
    linkedin: "LinkedIn",
    github: "GitHub",
    name: "Jméno",
    message: "Zpráva",
    send: "Odeslat zprávu",
    sending: "Odesílám…",
    privacy: "Jméno a e-mail použiji jen k odpovědi. Zprávu mi doručí e-mailem služba Resend, na tomto webu se neukládá.",
    errorPrefix: "Chyba:",
    errors: {
      name: "Vyplňte své jméno.",
      email: "Zadejte platný e-mail, například jmeno@example.com.",
      empty: "Napište zprávu.",
      tooLong: "Zpráva je příliš dlouhá (nejvýše 2\u00A0000 znaků).",
      summary: "Zkontrolujte prosím označená pole.",
    },
    failed: "Zprávu se nepodařilo odeslat. Napište mi prosím přímo na",
    success: "Děkuji, zpráva byla odeslána. Odpovím na zadaný e-mail.",
  },
  copy: { email: "Kopírovat e-mail", phone: "Kopírovat telefonní číslo", done: "Zkopírováno", failed: "Kopírování selhalo" },
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
    problem: "Problém",
    decision: "Rozhodnutí",
    result: "Výsledek",
    nextStep: "Dál",
    caseStudy: "Přečíst případovou studii",
    private: "Soukromý univerzitní repozitář",
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
  footer: { built: "Vytvořeno v Next.js, zdrojový kód na", github: "GitHubu", short: "GitHub" },
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
