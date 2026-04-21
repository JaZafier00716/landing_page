
export type ProjectStackItem = {
  name: string;
  iconClass: string;
};

export type ProjectItem = {
  id: number;
  slug: string;
  href: string;
  previewMode: "image" | "website";
  name: string;
  description: string;
  thumbnail: string;
  stack: ProjectStackItem[];
};

export type ProjectSection = {
  title: string;
  projects: ProjectItem[];
};

type ProjectSeedItem = Omit<ProjectItem, "id" | "slug">;

type ProjectSectionSeed = {
  title: string;
  items: ProjectSeedItem[];
};

const projectContent: Record<"en" | "cs", ProjectSectionSeed[]> = {
  en: [
    {
      title: "School projects",
      items: [
        {
          name: "Tetris",
          href: "https://github.com/JaZafier00716/tetris_clone",
          previewMode: "image",
          description:
            "I built a real-time Tetris clone in C with SDL2, including the game loop, rendering, controls, and collision logic.",
          thumbnail: "/images/tetris.png",
          stack: [
            { name: "C", iconClass: "devicon-c-plain" },
            { name: "SDL2", iconClass: "devicon-sdl-plain" },
          ],
        },
        {
          name: "Donkey Kong",
          href: "https://github.com/JaZafier00716/school/tree/main/druhak/JAVA/DonkeyKongFX-moduless",
          previewMode: "image",
          description:
            "I developed a JavaFX platformer with modular architecture, persistence via Hibernate, and an H2 database.",
          thumbnail: "/images/donkey_kong_game.png",
          stack: [
            { name: "Java", iconClass: "devicon-java-plain" },
            { name: "Hibernate", iconClass: "devicon-hibernate-plain" },
            { name: "H2", iconClass: "lucide-database" },
            { name: "Maven", iconClass: "devicon-maven-plain-wordmark" },
          ],
        },
        {
          name: "Modal Text Editor",
          href: "https://github.com/JaZafier00716/ModalEditor",
          previewMode: "image",
          description:
            "I developed a terminal-based modal editor in C++ inspired by Vim, focused on the input system and ANSI rendering.",
          thumbnail: "/images/editor.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "Terminal", iconClass: "devicon-linux-plain" },
          ],
        },
        {
          name: "Graph Center",
          href: "https://github.com/JaZafier00716/graph_center",
          previewMode: "image",
          description:
            "I implemented a C++ tool for computing graph centers using BFS eccentricity, including support for disconnected graphs and runtime measurement.",
          thumbnail: "/images/graph.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "CLI", iconClass: "devicon-linux-plain" },
          ],
        },
      ],
    },
    {
      title: "Professional Projects",
      items: [
        {
          name: "CSG Website",
          href: "https://csg.com/",
          previewMode: "website",
          description:
            "I contributed to frontend development of a production corporate website: building components and pages, improving UX, migrating content, and testing before release.",
          thumbnail: "/images/csg.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
        {
          name: "Skladon Website",
          href: "https://www.skladon.com/",
          previewMode: "website",
          description:
            "I contributed to frontend development of a logistics platform, including components, content migration, and pre-release testing.",
          thumbnail: "/images/skladon.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
        {
          name: "SolidSun Platform",
          href: "https://www.solidsun.cz/",
          previewMode: "website",
          description:
            "I contributed to frontend development of UI components, sections, and integration tasks in a Next.js application.",
          thumbnail: "/images/solidsun.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "TypeScript", iconClass: "devicon-typescript-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
      ],
    },
  ],
  cs: [
    {
      title: "Školní projekty",
      items: [
        {
          name: "Tetris",
          href: "https://github.com/JaZafier00716/tetris_clone",
          previewMode: "image",
          description:
            "Vytvořil jsem real-time Tetris v C se SDL2, včetně herní smyčky, renderingu, ovládání a kolizní logiky.",
          thumbnail: "/images/tetris.png",
          stack: [
            { name: "C", iconClass: "devicon-c-plain" },
            { name: "SDL2", iconClass: "devicon-sdl-plain" },
          ],
        },
        {
          name: "Donkey Kong",
          href: "https://github.com/JaZafier00716/school/tree/main/druhak/JAVA/DonkeyKongFX-moduless",
          previewMode: "image",
          description:
            "Vyvinul jsem JavaFX plošinovku s modulární architekturou, perzistencí přes Hibernate a databází H2.",
          thumbnail: "/images/donkey_kong_game.png",
          stack: [
            { name: "Java", iconClass: "devicon-java-plain" },
            { name: "Hibernate", iconClass: "devicon-hibernate-plain" },
            { name: "H2", iconClass: "lucide-database" },
            { name: "Maven", iconClass: "devicon-maven-plain-wordmark" },
          ],
        },
        {
          name: "Modalni textovy editor",
          href: "https://github.com/JaZafier00716/ModalEditor",
          previewMode: "image",
          description:
            "Vyvinul jsem terminálový modální editor v C++ inspirovaný Vimem se zaměřením na vstupní systém a ANSI renderování.",
          thumbnail: "/images/editor.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "Terminal", iconClass: "devicon-linux-plain" },
          ],
        },
        {
          name: "Graph Center",
          href: "https://github.com/JaZafier00716/graph_center",
          previewMode: "image",
          description:
            "Implementoval jsem C++ nástroj pro výpočet středu grafu pomocí BFS excentricity včetně podpory nesouvislých grafů a měření běhu.",
          thumbnail: "/images/graph.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "CLI", iconClass: "devicon-linux-plain" },
          ],
        },
      ],
    },
    {
      title: "Profesionální projekty",
      items: [
        {
          name: "CSG Web",
          href: "https://csg.com/",
          previewMode: "website",
          description:
            "Podílel jsem se na frontendovém vývoji produkčního firemního webu: tvorba komponent a stránek, zlepšování UX, migrace obsahu a testování před vydáním.",
          thumbnail: "/images/csg.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
        {
          name: "Skladon Web",
          href: "https://www.skladon.com/",
          previewMode: "website",
          description:
            "Podílel jsem se na frontendovém vývoji logistické platformy, včetně komponent, migrace obsahu a testování před vydáním.",
          thumbnail: "/images/skladon.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
        {
          name: "SolidSun Platform",
          href: "https://www.solidsun.cz/",
          previewMode: "website",
          description:
            "Podílel jsem se na frontendovém vývoji UI komponent, sekcí a integračních úloh v Next.js aplikaci.",
          thumbnail: "/images/solidsun.png",
          stack: [
            { name: "Next.js", iconClass: "devicon-nextjs-plain" },
            { name: "TypeScript", iconClass: "devicon-typescript-plain" },
            { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
            { name: "Storybook", iconClass: "devicon-storybook-plain" },
            { name: "Sanity", iconClass: "devicon-sanity-plain" },
            { name: "Vercel", iconClass: "devicon-vercel-original" },
            { name: "GitHub", iconClass: "devicon-github-original" },
          ],
        },
      ],
    },
  ],
};

export async function getProjects(lang: "en" | "cs" = "en"): Promise<ProjectSection[]> {
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return projectContent[lang]
    .map((section) => ({
      title: section.title,
      projects: section.items.map((project, index) => ({
        id: index + 1,
        slug: slugify(project.name),
        ...project,
      })),
    }))
    .sort((a, b) => {
      const rank = (title: string) => {
        const normalized = title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (normalized.includes("professional") || normalized.includes("profes")) return 0;
        if (normalized.includes("school") || normalized.includes("skolni")) return 1;
        return 2;
      };

      return rank(a.title) - rank(b.title);
    });
}
