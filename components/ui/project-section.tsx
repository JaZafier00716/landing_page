import ProjectsGrid from "./projects-grid";
import { type ProjectCardData } from "./project-card";

type ProjectSectionProps = {
  title: string;
  projects: ProjectCardData[];
  isProduction?: boolean;
};

export default function ProjectSection({ title, projects, isProduction = false }: Readonly<ProjectSectionProps>) {
  return (
    <section className="flex w-full flex-col gap-6">
      <h2 className="text-2xl sm:text-3xl xxl:text-4xl text-white">{title}</h2>
      <ProjectsGrid projects={projects} useAutoFill={isProduction} />
    </section>
  );
}
