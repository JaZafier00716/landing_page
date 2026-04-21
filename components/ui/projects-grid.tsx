import ProjectCard, { type ProjectCardData } from "./project-card";

type ProjectsGridProps = {
  projects: ProjectCardData[];
  emptyMessage?: string;
  useAutoFill?: boolean;
};

export default function ProjectsGrid({ projects, emptyMessage = "No projects yet.", useAutoFill = false }: Readonly<ProjectsGridProps>) {
  if (projects.length === 0) {
    return <h1 className="text-white">{emptyMessage}</h1>;
  }

  return (
    <div
      className={
        useAutoFill
          ? "grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
          : "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      }
    >
      {projects.map((project, idx) => (
        <div key={project.id} className={useAutoFill ? "h-full min-w-[280px]" : "h-full"}>
          <ProjectCard project={project} delay={0.2 + idx * 0.2} />
        </div>
      ))}
    </div>
  );
}


