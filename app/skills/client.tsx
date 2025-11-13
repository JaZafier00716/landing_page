"use client";
import SkillsGrid from "@/components/ui/SkillsGrid";
import { Category } from "./skills";

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