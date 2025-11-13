import "server-only";
import { prisma } from "@/app/db";

export type SkillItem = {
  id: number;
  title: string;
  subTitle?: string;
  iconClass?: string;
};

export type SkillCategory = {
  name: "web" | "programming" | "languages" | "os";
  colNum?: number;
  items: SkillItem[];
  title: string;
};

export async function getSkillsCategories(
  lang: "en" | "cs" = "en"
): Promise<SkillCategory[]> {
  const rows = await prisma.skillCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      items: true,
      translations: true,
    },
  });

  return rows.map((row) => ({
    name: row.name as SkillCategory["name"],
    colNum: row.colNum,
    items: row.items.map((it) => ({
      id: it.id,
      title: it.title,
      subTitle: it.subTitle || undefined,
      iconClass: it.iconClass || undefined,
    })),
    title:
      row.translations.find((t) => t.lang === lang)?.title ??
      row.translations[0]?.title ??
      row.name,
  }));
}
