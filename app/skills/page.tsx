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
    os: lang === "cs" ? "Linux Distribuce" : "Linux Distributions",
  };

  // Column counts per category
  const categoryCols: Record<string, number> = {
    web: 3,
    programming: 3,
    os: 2,
    languages: 1,
  };

  return (
    <div className="flex flex-wrap xl:flex-wrap flex-col gap-8 lg:flex-row justify-evenly items-start py-8 xl:pt-32">
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
