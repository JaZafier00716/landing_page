import "server-only";
import type { LucideIcon } from "lucide-react";
import { prisma } from "../db";

export type SkillItem = {
  id: number;
  title: string;
  subTitle?: string;
  iconClass?: string;
  Flag?: LucideIcon;
};

export type SkillCategory = {
  name: "web" | "programming" | "languages" | "os";
  colNum?: 1 | 2 | 3 | 4 | 5 | 6;
  items: SkillItem[];
};

export type SkillCategoryWithTitle = SkillCategory & { title: string };

export async function getSkillsCategories(
  lang: "en" | "cs" = "en"
): Promise<SkillCategory[]> {
  const rows = await prisma.skillCategory.findMany({
    orderBy: { id: "asc" },
    include: { translations: true },
  });
  return rows.map((row: any) => {
    const title =
      row.translations?.find((t: any) => t.lang === lang)?.title ?? row.name;
    return {
      name: row.name as SkillCategory["name"],
      colNum: row.colNum ?? undefined,
      items: row.items ? (JSON.parse(row.items) as SkillItem[]) : [],
      title,
    };
  });
}
