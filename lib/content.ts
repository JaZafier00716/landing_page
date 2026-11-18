import "server-only";
import { person } from "@/content/person";
import { projects as projectContent } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import type { Lang } from "@/lib/i18n";
import { nbsp } from "@/lib/typography";

export type Person = { name: string; email: string; phone: string; linkedin: string; github: string };

export type Project = {
  slug: string;
  kind: "work" | "school" | "hidden";
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
  decision: string | null;
  result: string | null;
  next: string | null;
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

export type SkillGroup = { key: string; title: string; skills: { name: string; detail: string | null; usedIn: UsedIn[] }[] };
export type UsedIn = { name: string; href: string };

// Content lives in content/*.ts and is read at build time. The functions stay async so callers don't change.
const month = (ym: string) => new Date(`${ym}-01T00:00:00Z`);

export async function getPerson(_lang: Lang): Promise<Person> {
  return person;
}

export async function getProjects(lang: Lang): Promise<Project[]> {
  return projectContent
    .filter((p) => p.kind === "work" || p.kind === "school")
    .map((p) => {
      const t = p.t[lang];
      const platform = (lang === "cs" ? p.platformCs : undefined) ?? p.platform;
      const libraries = (lang === "cs" ? p.librariesCs : undefined) ?? p.libraries;
      return {
        slug: p.slug,
        kind: p.kind,
        featured: p.featured ?? false,
        thumbnail: p.thumbnail ?? null,
        sourceUrl: p.sourceUrl ?? null,
        liveUrl: p.liveUrl ?? null,
        stack: p.stack,
        language: p.language ?? null,
        client: p.client ?? null,
        name: nbsp(t.name, lang),
        summary: nbsp(t.summary, lang),
        description: t.description.map((d) => nbsp(d, lang)),
        role: t.role ? nbsp(t.role, lang) : null,
        decision: t.decision ? nbsp(t.decision, lang) : null,
        result: t.result ? nbsp(t.result, lang) : null,
        next: t.next ? nbsp(t.next, lang) : null,
        thumbnailAlt: nbsp(t.thumbnailAlt ?? "", lang),
        platform: nbsp(platform ?? "", lang) || null,
        libraries: nbsp(libraries ?? "", lang) || null,
      };
    });
}

export async function getProject(lang: Lang, slug: string) {
  return (await getProjects(lang)).find((p) => p.slug === slug) ?? null;
}

export async function getExperience(lang: Lang): Promise<ExperienceEntry[]> {
  const projects = await getProjects(lang);
  return experiences.map((e) => ({
    slug: e.slug,
    kind: e.kind,
    company: nbsp((lang === "cs" ? e.companyCs : undefined) ?? e.company, lang),
    url: e.url ?? null,
    start: month(e.start),
    end: e.end ? month(e.end) : null,
    stack: (lang === "cs" ? e.stackCs : undefined) ?? e.stack ?? "",
    position: nbsp(e.position[lang], lang),
    bullets: e.bullets[lang].map((b) => nbsp(b, lang)),
    related: (e.related ?? []).flatMap((s) => projects.filter((p) => p.slug === s).map((p) => ({ slug: s, name: p.name }))),
  }));
}

export async function getSkills(lang: Lang): Promise<SkillGroup[]> {
  const [projects, experience] = await Promise.all([getProjects(lang), getExperience(lang)]);
  // usedIn holds project or experience slugs; unknown slugs are dropped.
  const targets = new Map<string, UsedIn>([
    ...experience.map((e) => [e.slug, { name: e.company, href: `/${lang}/experience#${e.slug}` }] as const),
    ...projects.map((p) => [p.slug, { name: p.name, href: `/${lang}/projects/${p.slug}` }] as const),
  ]);
  return skillGroups.map((g) => ({
    key: g.key,
    title: nbsp(g.title[lang], lang),
    skills: g.skills.map((s) => {
      const detail = s.detail?.[lang];
      return {
        name: nbsp(lang === "cs" ? (s.cs ?? s.en) : s.en, lang),
        detail: detail ? nbsp(detail, lang) : null,
        usedIn: (s.usedIn ?? []).flatMap((slug) => targets.get(slug) ?? []),
      };
    }),
  }));
}
