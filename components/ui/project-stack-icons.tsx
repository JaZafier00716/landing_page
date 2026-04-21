import { Database } from "lucide-react";

type ProjectStackItem = {
  name: string;
  iconClass: string;
};

type ProjectStackIconsProps = {
  projectId: number;
  stack: ProjectStackItem[];
};

export default function ProjectStackIcons({ projectId, stack }: Readonly<ProjectStackIconsProps>) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-start gap-3 text-2xl text-emerald-400">
      {stack.map((item) => (
        <span key={`${projectId}-${item.name}`} title={item.name} aria-label={item.name} className="inline-flex">
          {item.iconClass === "lucide-database" ? (
            <Database className="h-[1em] w-[1em]" aria-hidden="true" suppressHydrationWarning />
          ) : (
            <i className={item.iconClass} />
          )}
        </span>
      ))}
    </div>
  );
}

