
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
            "Built a real-time Tetris clone in C using SDL2, implementing game loop logic, rendering, input handling, and collision detection.",
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
            "Developed a JavaFX platformer with modular structure, persistence layer using Hibernate, and embedded H2 database integration.",
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
            "Built a terminal-based modal text editor in C++ inspired by Vim, focusing on input handling, modes, and ANSI-based rendering.",
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
            "Implemented a C++ tool to compute graph centers using BFS-based eccentricity, including support for disconnected graphs and runtime measurement.",
          thumbnail: "/images/graph.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "CLI", iconClass: "devicon-linux-plain" },
          ],
        },
      ],
    },
    {
      title: "Production projects",
      items: [
        {
          name: "CSG Website",
          href: "https://csg.com/",
          previewMode: "website",
          description:
            "Frontend developer on a production corporate website — built reusable components and pages, improved UX, and participated in alpha testing and release preparation.",
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
            "Frontend developer contributing to UI components and page sections, while also handling content migration and pre-release testing.",
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
            "Frontend contributor working on UI components, page sections, and integration tasks within a Next.js application.",
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
      title: "Skolni projekty",
      items: [
        {
          name: "Tetris",
          href: "https://github.com/JaZafier00716/tetris_clone",
          previewMode: "image",
          description:
            "Vytvoril jsem real-time Tetris v C se SDL2, vcetne herni smycky, renderingu, ovladani a kolizni logiky.",
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
            "Vyvinul jsem JavaFX platformovku s modularni architekturou, perzistenci pres Hibernate a H2 databazi.",
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
            "Vyvinul jsem terminalovy modalni editor v C++ inspirovany Vimem se zamerem na vstupni system a ANSI renderovani.",
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
            "Implementoval jsem C++ nastroj pro vypocet stredu grafu pomoci BFS excentricity vcetne podpory nesouvislych grafu.",
          thumbnail: "/images/graph.png",
          stack: [
            { name: "C++", iconClass: "devicon-cplusplus-plain" },
            { name: "CLI", iconClass: "devicon-linux-plain" },
          ],
        },
      ],
    },
    {
      title: "Produkční projekty",
      items: [
        {
          name: "CSG Web",
          href: "https://csg.com/",
          previewMode: "website",
          description:
            "Frontend vyvoj pro produkcni firemni web — tvorba komponent, zlepsovani UX a testovani alpha verze v tymu.",
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
            "Frontend vyvoj pro logistickou platformu vcetne komponent, migrace obsahu a testovani pred vydanim.",
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
            "Frontend prispevek na UI komponentach, sekcich a integracnich ulohach v Next.js aplikaci.",
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
        const normalized = title.toLowerCase();
        if (normalized.includes("production") || normalized.includes("produk")) return 0;
        if (normalized.includes("school") || normalized.includes("skolni")) return 1;
        return 2;
      };

      return rank(a.title) - rank(b.title);
    });
}
