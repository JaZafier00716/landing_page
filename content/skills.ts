import type { GroupSeed } from "./types";

// usedIn: project or experience slugs; detail replaces the links when set.
export const skillGroups: GroupSeed[] = [
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
      { en: "Next.js, React", usedIn: ["csg-website", "solidsun-platform"] },
      { en: "Tailwind CSS", usedIn: ["csg-website", "solidsun-platform"] },
      { en: "Storybook", usedIn: ["csg-website"] },
      { en: "Sanity CMS", usedIn: ["csg-website"] },
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
