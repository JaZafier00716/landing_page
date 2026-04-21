import ProjectsGrid from "./projects-grid";
import { type ProjectCardData } from "./project-card";

type ProjectSectionProps = {
  title: string;
  projects: ProjectCardData[];
};

export default function ProjectSection({ title, projects }: Readonly<ProjectSectionProps>) {
  return (
    <section className="flex w-full flex-col gap-6">
      <h2 className="text-2xl sm:text-3xl xxl:text-4xl text-white">{title}</h2>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
