// Content types. Edit the content in content/*.ts; lib/content.ts turns it into page data.
export type T<V> = { en: V; cs: V };

export type ExperienceSeed = {
  slug: string;
  company: string;
  kind: "work" | "education" | "course";
  start: string; // YYYY-MM
  end: string | null;
  url?: string;
  stack?: string;
  stackCs?: string;
  companyCs?: string;
  related?: string[];
  position: T<string>;
  bullets: T<string[]>;
};

export type ProjectSeed = {
  slug: string;
  kind: "work" | "school" | "hidden";
  featured?: boolean;
  thumbnail?: string;
  sourceUrl?: string;
  liveUrl?: string;
  stack: string[];
  language?: string;
  libraries?: string;
  platform?: string;
  platformCs?: string;
  librariesCs?: string;
  client?: string;
  t: T<{ name: string; summary: string; description: string[]; role?: string; thumbnailAlt?: string; decision?: string; result?: string; next?: string }>;
};

export type SkillSeed = { en: string; cs?: string; usedIn?: string[]; detail?: T<string> };
export type GroupSeed = { key: string; title: T<string>; skills: SkillSeed[] };
