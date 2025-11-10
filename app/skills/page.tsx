"use client";
import SkillsGrid from "@/components/ui/SkillsGrid";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { ICONS } from "@/app/icons";

const Page = () => {
  const { lang } = useLanguage();

  // Extract unique categories
  const categories = Array.from(new Set(ICONS.map((i) => i.category)));

  // Map category to user-friendly title
  const categoryTitles: Record<string, string> = {
    web: lang === "cs" ? "Webový Vývoj" : "Web Development",
    programming: lang === "cs" ? "Programovací Jazyky" : "Programming Languages",
    languages: lang === "cs" ? "Jazyky" : "Languages",
  };

  // Column counts per category
  const categoryCols: Record<string, number> = {
    web: 3,
    programming: 3,
    languages: 2,
  };

  return (
    <div className="flex flex-wrap xl:flex-nowrap flex-col gap-8 lg:flex-row justify-evenly items-start py-8 xl:py-32">
      {categories.map((cat) => (
        <SkillsGrid
          key={cat}
          items={ICONS.filter((i) => i.category === cat)}
          colAmount={categoryCols[cat] || 2}
          title={categoryTitles[cat] || cat}
        />
      ))}
    </div>
  );
};

export default Page;
