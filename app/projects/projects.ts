import "server-only";

export type ProjectStackItem = {
  name: string;
  iconClass: string;
};

export type ProjectItem = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  stack: ProjectStackItem[];
};

const projectContent: Record<"en" | "cs", Omit<ProjectItem, "id">[]> = {
  en: [
    {
      name: "Portfolio Rebuild",
      description:
        "Modern portfolio made with reusable components, smooth animations, and strong accessibility defaults.",
      thumbnail: "/images/picture.png",
      stack: [
        { name: "Next.js", iconClass: "devicon-nextjs-original" },
        { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
        { name: "Vercel", iconClass: "devicon-vercel-original" },
      ],
    },
    {
      name: "Design System Lab",
      description:
        "Component playground for validating design tokens, responsive states, and visual consistency.",
      thumbnail: "/images/picture_unedited.jpg",
      stack: [
        { name: "Storybook", iconClass: "devicon-storybook-plain" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain" },
        { name: "Figma", iconClass: "devicon-figma-plain" },
      ],
    },
    {
      name: "Headless Content Site",
      description:
        "Marketing pages powered by structured content, live preview, and fast editorial workflows.",
      thumbnail: "/images/picture.png",
      stack: [
        { name: "Sanity", iconClass: "devicon-sanity-plain" },
        { name: "Next.js", iconClass: "devicon-nextjs-original" },
        { name: "Vercel", iconClass: "devicon-vercel-original" },
      ],
    },
    {
      name: "UI QA Toolkit",
      description:
        "Visual regression checks and pixel-accurate review flow for rapid front-end quality control.",
      thumbnail: "/images/picture_unedited.jpg",
      stack: [
        { name: "PerfectPixel", iconClass: "devicon-chrome-plain" },
        { name: "JavaScript", iconClass: "devicon-javascript-plain" },
        { name: "GitHub", iconClass: "devicon-github-original" },
      ],
    },
  ],
  cs: [
    {
      name: "Redesign portfolia",
      description:
        "Moderni portfolio s pouzitelnymi komponentami, plynulymi animacemi a dobrou pristupnosti.",
      thumbnail: "/images/picture.png",
      stack: [
        { name: "Next.js", iconClass: "devicon-nextjs-original" },
        { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
        { name: "Vercel", iconClass: "devicon-vercel-original" },
      ],
    },
    {
      name: "Laborator design systemu",
      description:
        "Prostor pro testovani komponent, design tokenu, responsivnich stavu a vizualni konzistence.",
      thumbnail: "/images/picture_unedited.jpg",
      stack: [
        { name: "Storybook", iconClass: "devicon-storybook-plain" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain" },
        { name: "Figma", iconClass: "devicon-figma-plain" },
      ],
    },
    {
      name: "Web s headless obsahem",
      description:
        "Marketingove stranky napojene na strukturovany obsah, live preview a rychle editacni workflow.",
      thumbnail: "/images/picture.png",
      stack: [
        { name: "Sanity", iconClass: "devicon-sanity-plain" },
        { name: "Next.js", iconClass: "devicon-nextjs-original" },
        { name: "Vercel", iconClass: "devicon-vercel-original" },
      ],
    },
    {
      name: "UI QA toolkit",
      description:
        "Kontrola vizualnich regresi a pixel-perfect revize pro rychlejsi kontrolu kvality frontendu.",
      thumbnail: "/images/picture_unedited.jpg",
      stack: [
        { name: "PerfectPixel", iconClass: "devicon-chrome-plain" },
        { name: "JavaScript", iconClass: "devicon-javascript-plain" },
        { name: "GitHub", iconClass: "devicon-github-original" },
      ],
    },
  ],
};

export async function getProjects(lang: "en" | "cs" = "en"): Promise<ProjectItem[]> {
  return projectContent[lang].map((project, index) => ({
    id: index + 1,
    ...project,
  }));
}

