import type { LucideIcon } from "lucide-react";

export type SkillItem = {
  id: number;
  title: string;          // main text
  subTitle?: string;      // optional second line (for languages etc.)
  iconClass?: string;     // devicon class for icons
  category: "web" | "programming" | "languages"; // extended category
  Flag?: LucideIcon;      // optional flag icon
};

export const ICONS: SkillItem[] = [
  // Web
  { id: 0, title: "NextJS", iconClass: "devicon-nextjs-plain", category: "web" },
  { id: 1, title: "ReactJS", iconClass: "devicon-react-original", category: "web" },
  { id: 2, title: "Tailwindcss", iconClass: "devicon-tailwindcss-original", category: "web" },
  { id: 3, title: "TypeScript", iconClass: "devicon-typescript-plain", category: "web" },
  { id: 4, title: "CSS3", iconClass: "devicon-css3-plain", category: "web" },
  { id: 5, title: "HTML5", iconClass: "devicon-html5-plain", category: "web" },
  { id: 6, title: "JavaScript", iconClass: "devicon-javascript-plain", category: "web" },
  { id: 7, title: "PHP", iconClass: "devicon-php-plain", category: "web" },

  // Programming
  { id: 8, title: "C", iconClass: "devicon-c-plain", category: "programming" },
  { id: 9, title: "C++", iconClass: "devicon-cplusplus-plain", category: "programming" },
  { id: 10, title: "VHDL", category: "programming" },  // text-only
  { id: 11, title: "NASM", category: "programming" },  // text-only

  // Example Languages (with optional flags)
  { id: 12, title: "Czech", category: "languages" },
  { id: 13, title: "English", subTitle: "C1", category: "languages" },
];
