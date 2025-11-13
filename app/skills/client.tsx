"use client";
import SkillsGrid from "@/components/ui/SkillsGrid";

type SkillItem = {
  id: number;
  title: string;
  subTitle?: string;
  iconClass?: string;
};

type Category = {
  name: "web" | "programming" | "languages" | "os";
  colNum?: 1 | 2 | 3 | 4 | 5 | 6;
  items: SkillItem[];
  title: string; // Fetched from db
};

export default function SkillsClient({ data, loadingMessage = "Loading skills..." }: Readonly<{ data: Category[]; loadingMessage?: string }>) {

  return (
    <div className="flex flex-wrap xl:flex-wrap flex-col gap-8 lg:flex-row justify-evenly items-start py-8 xl:pt-32 xl:px-8">
      {data.length > 0 ? (
        data.map((cat) => (
          <SkillsGrid
            key={cat.name}
            items={[...cat.items].sort((a, b) => a.id - b.id)}
            colAmount={cat.colNum || 2}
            title={cat.title}
          />
        ))
      ) : (
        <h1 className="text-white">{loadingMessage}</h1>
      )}
    </div>
  );
}