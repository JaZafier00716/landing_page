import "server-only";
import { prisma } from "@/app/db";

export type SkillItem = {
  id: number;
  title: string;
  subTitle?: string | null;
  iconClass?: string | null;
};

export type Category = {
  name: "web" | "programming" | "languages" | "os";
  colNum?: number;
  items: SkillItem[];
  title: string;
};

export async function getSkillsCategories(
  lang: "en" | "cs" = "en"
): Promise<Category[]> {
  try {
    const rows = await prisma.skillCategory.findMany({
      orderBy: { id: "asc" },
      include: {
        items: { orderBy: { id: "asc" } }, // <- relation, not JSON
        translations: true,
      },
    });

    interface SkillCategoryRow {
      name: string;
      colNum?: number;
      items: {
      id: number;
      title: string;
      subTitle?: string | null;
      iconClass?: string | null;
      }[];
      translations: {
      lang: string;
      title: string;
      }[];
    }

    return rows.map((row: SkillCategoryRow) => ({
      name: row.name as Category["name"],
      colNum: row.colNum,
      items: row.items.map((it: SkillItem) => ({
      id: it.id,
      title: it.title,
      subTitle: it.subTitle ?? null,
      iconClass: it.iconClass ?? null,
      })),
      title: row.translations.find((t) => t.lang === lang)?.title ?? row.name,
    }));
  } catch (e) {
    console.error("getSkillsCategories failed:", e);
    throw e;
  }
}
