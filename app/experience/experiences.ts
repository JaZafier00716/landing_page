import "server-only";
import { prisma } from "../db";

export type ExperienceSkill = { id: number; title: string };
export type ExperienceItem = {
  company: string;
  time: string;
  position: string;
  skills: ExperienceSkill[];
};

export async function getExperience(
  lang: "en" | "cs" = "en"
): Promise<ExperienceItem[]> {
  const rows = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });

  return rows.map((row) => {
    const t =
      row.translations.find((x) => x.lang === lang) ?? row.translations[0];
    return {
      company: row.company,
      time: t?.time ?? "",
      position: t?.position ?? "",
      skills: t?.skills ? (JSON.parse(t.skills) as ExperienceSkill[]) : [],
    };
  });
}
