import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectStackIcons from "@/components/ui/project-stack-icons";
import { getLang } from "@/app/utils/getLang";
import { getProjects } from "../projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const lang = await getLang();
  const sections = await getProjects(lang);
  const project = sections.flatMap((section) => section.projects).find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full box-border px-10 py-8 lg:px-16 lg:py-16 xl:py-32">
      <article className="mx-auto max-w-4xl rounded-2xl border-2 border-emerald-600 bg-gray-900 p-6 md:p-8">
        <img src={project.thumbnail} alt={`${project.name} thumbnail`} className="mb-6 aspect-[16/9] w-full rounded-xl object-cover" />
        <h1 className="text-3xl leading-tight text-emerald-400 md:text-4xl">{project.name}</h1>
        <p className="mt-4 text-base leading-relaxed text-white">{project.description}</p>
        <ProjectStackIcons projectId={project.id} stack={project.stack} />

        <Link href="/projects" className="mt-8 inline-flex text-emerald-400 transition-colors duration-200 hover:text-emerald-300">
          {lang === "cs" ? "Zpet na projekty" : "Back to projects"}
        </Link>
      </article>
    </div>
  );
}

