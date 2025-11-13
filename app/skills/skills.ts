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
): Promise<SkillCategoryWithTitle[]> {
  const rows = await prisma.skillCategory.findMany({
    orderBy: { id: "asc" },
    include: { translations: true },
  });
  return rows.map((row) => {
    return {
      name: row.name as SkillCategoryWithTitle["name"],
      colNum: (row.colNum as 1 | 2 | 3 | 4 | 5 | 6 | undefined) ?? 2,
      items: row.items ? (JSON.parse(row.items) as SkillItem[]) : [],
      title: row.translations?.find((t) => t.lang === lang)?.title ?? row.name,
    };
  });
}
