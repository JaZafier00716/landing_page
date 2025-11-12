import type { LucideIcon } from "lucide-react";

export type SkillItem = {
  id: number;
  title: string;          // main text
  subTitle?: string;      // optional second line (for languages etc.)
  iconClass?: string;     // devicon class for icons
  category: "web" | "programming" | "languages" | "os"; // extended category
  Flag?: LucideIcon;      // optional flag icon
};

export const ICONS: SkillItem[] = [
  // Web
  { id: 0, title: "NextJS", iconClass: "devicon-nextjs-original-wordmark", category: "web" },
  { id: 1, title: "ReactJS", iconClass: "devicon-react-original", category: "web" },
  { id: 2, title: "Tailwindcss", iconClass: "devicon-tailwindcss-original", category: "web" },
  { id: 3, title: "TypeScript", iconClass: "devicon-typescript-plain", category: "web" },
  { id: 4, title: "CSS3", iconClass: "devicon-css3-plain", category: "web" },
  { id: 5, title: "HTML5", iconClass: "devicon-html5-plain", category: "web" },
  { id: 6, title: "JavaScript", iconClass: "devicon-javascript-plain", category: "web" },
  { id: 7, title: "PHP", iconClass: "devicon-php-plain", category: "web" },
  { id: 8, title: "MySQL", iconClass: "devicon-mysql-plain-wordmark", category: "web" },

  // Programming
  { id: 9, title: "C", iconClass: "devicon-c-plain", category: "programming" },
  { id: 10, title: "C++", iconClass: "devicon-cplusplus-plain", category: "programming" },
  { id: 11, title: "JAVA", iconClass: "devicon-java-plain", category: "programming" },
  { id: 12, title: "Haskell", iconClass: "devicon-haskell-plain", category: "programming" },
  { id: 13, title: "VHDL", category: "programming" },  // text-only
  { id: 14, title: "NASM", category: "programming" },  // text-only

  // Example Languages (with optional flags)
  { id: 15, title: "Czech", category: "languages" },
  { id: 16, title: "English", subTitle: "C2", category: "languages" },

  // Operating systems
  { id: 17, title: "Arch Linux", iconClass: "devicon-archlinux-plain", category: "os" },
  { id: 18, title: "Debian Linux", iconClass: "devicon-debian-plain", category: "os" },
  { id: 19, title: "Fedora Linux", iconClass: "devicon-fedora-plain", category: "os" },
  { id: 20, title: "Linux Mint", iconClass: "devicon-linuxmint-plain", category: "os" },
  { id: 21, title: "Ubuntu Linux", iconClass: "devicon-ubuntu-plain", category: "os" },
  { id: 22, title: "Kali Linux", iconClass: "devicon-kalilinux-plain", category: "os" },
];
