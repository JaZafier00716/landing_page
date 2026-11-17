import "server-only";
import { cacheLife } from "next/cache";
import { prisma } from "@/lib/db";
import type { Lang } from "@/lib/i18n";

export type Person = { name: string; email: string; phone: string; linkedin: string; github: string };

export type Project = {
  slug: string;
  kind: "work" | "school" | "other";
  featured: boolean;
  thumbnail: string | null;
  thumbnailAlt: string;
  sourceUrl: string | null;
  liveUrl: string | null;
  stack: string[];
  language: string | null;
  libraries: string | null;
  platform: string | null;
  client: string | null;
  name: string;
  summary: string;
  description: string[];
  role: string | null;
};

export type ExperienceEntry = {
  slug: string;
  kind: "work" | "education" | "course";
  company: string;
  url: string | null;
  start: Date | null;
  end: Date | null;
  stack: string;
  position: string;
  bullets: string[];
  related: { slug: string; name: string }[];
};

export type SkillGroup = { key: string; title: string; skills: { name: string; usedIn: UsedIn[] }[] };
export type UsedIn = { name: string; href: string };

const pick = <T extends { lang: string }>(rows: T[], lang: Lang) => rows.find((r) => r.lang === lang) ?? rows[0];

export async function getPerson(lang: Lang): Promise<Person> {
  "use cache";
  cacheLife("days");
  const row = await prisma.personDetails.findFirst({ where: { lang }, orderBy: { id: "desc" } });
  if (!row) throw new Error(`PersonDetails missing for ${lang}`);
  const { name, email, phone, linkedin, github } = row;
  return { name, email, phone, linkedin, github };
}

export async function getProjects(lang: Lang): Promise<Project[]> {
  "use cache";
  cacheLife("days");
  const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, include: { translations: true } });
  return rows.map(({ translations, id: _id, sortOrder: _s, ...p }) => {
    const t = pick(translations, lang);
    return {
      ...p,
      kind: p.kind as Project["kind"],
      name: t.name,
      summary: t.summary,
      description: t.description,
      role: t.role,
      thumbnailAlt: t.thumbnailAlt ?? "",
      platform: t.platform ?? p.platform,
      libraries: t.libraries ?? p.libraries,
    };
  });
}

export async function getProject(lang: Lang, slug: string) {
  return (await getProjects(lang)).find((p) => p.slug === slug) ?? null;
}

export async function getExperience(lang: Lang): Promise<ExperienceEntry[]> {
  "use cache";
  cacheLife("days");
  const [rows, projects] = await Promise.all([
    prisma.experience.findMany({ orderBy: { sortOrder: "asc" }, include: { translations: true } }),
    getProjects(lang),
  ]);
  return rows.map((r) => {
    const t = pick(r.translations, lang);
    return {
      slug: r.slug ?? String(r.id),
      kind: r.kind as ExperienceEntry["kind"],
      company: t.company ?? r.company,
      url: r.url,
      start: r.startDate,
      end: r.endDate,
      stack: t.stack ?? r.stack,
      position: t.position,
      bullets: t.bullets,
      related: r.related.flatMap((s) => projects.filter((p) => p.slug === s).map((p) => ({ slug: s, name: p.name }))),
    };
  });
}

export async function getSkills(lang: Lang): Promise<SkillGroup[]> {
  "use cache";
  cacheLife("days");
  const [groups, projects, experience] = await Promise.all([
    prisma.skillGroup.findMany({ orderBy: { sortOrder: "asc" }, include: { skills: { orderBy: { sortOrder: "asc" } } } }),
    getProjects(lang),
    getExperience(lang),
  ]);
  // usedIn holds project or experience slugs; unknown slugs are dropped.
  const targets = new Map<string, UsedIn>([
    ...experience.map((e) => [e.slug, { name: e.company, href: `/${lang}/experience#${e.slug}` }] as const),
    ...projects.map((p) => [p.slug, { name: p.name, href: `/${lang}/projects/${p.slug}` }] as const),
  ]);
  return groups.map((g) => ({
    key: g.key,
    title: lang === "cs" ? g.titleCs : g.titleEn,
    skills: g.skills.map((s) => ({
      name: lang === "cs" ? s.nameCs : s.nameEn,
      usedIn: s.usedIn.flatMap((slug) => targets.get(slug) ?? []),
    })),
  }));
}
