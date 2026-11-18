import type { ExperienceSeed } from "./types";

// Order here is the order on the site (newest first within each kind).
export const experiences: ExperienceSeed[] = [
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
        "Annotated over 500 dashcam frames in CVAT: road defects (potholes, cracks), road markings, lanes, guardrails and delineator posts.",
        "Delivered precise, consistent annotations for computer vision and machine learning datasets, in cooperation with FUTTEC.",
      ],
      cs: [
        "V CVAT jsem anotoval přes 500 snímků z palubních kamer: poruchy vozovky (výtluky, trhliny), dopravní značení, jízdní pruhy, svodidla a směrové sloupky.",
        "Dodával jsem přesné a konzistentní anotace pro datové sady počítačového vidění a strojového učení, ve spolupráci se společností FUTTEC.",
      ],
    },
  },
  {
    slug: "showmore",
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
        "GPA 90+/100.",
        "Master’s at VŠB planned from September 2027, continuing in Informatics (specialisation not decided yet).",
      ],
      cs: [
        "GPA 90+/100.",
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
    company: "Udemy",
    kind: "course",
    start: "2023-01",
    end: "2023-12",
    position: { en: "React – The Complete Guide (70 hours)", cs: "React – The Complete Guide (70 hodin)" },
    bullets: { en: [], cs: [] },
  },
];
