import ProjectSection from "@/components/ui/project-section";
import { ProjectSection as ProjectSectionType } from "./projects";

type ProjectsClientProps = {
  data: ProjectSectionType[];
  emptyMessage?: string;
};

export default function ProjectsClient({ data, emptyMessage }: Readonly<ProjectsClientProps>) {
  return (
    <div className="flex w-full box-border flex-col gap-14 px-10 py-8 lg:px-16 lg:py-16 xl:py-32">
      {data.length > 0 ? (
        data.map((section) => (
          <div key={section.title}>
            <ProjectSection
              title={section.title}
              projects={section.projects}
              isProduction={/professional|profes/i.test(section.title)}
            />
          </div>
        ))
      ) : (
        <h1 className="text-white">{emptyMessage}</h1>
      )}
    </div>
  );
}
