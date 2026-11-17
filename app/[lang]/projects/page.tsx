import { getDict, type Lang } from "@/lib/i18n";
import { getProjects } from "@/lib/content";
import { ProjectArticle } from "@/components/projects";
import { pageMeta } from "../meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).projects;
  return pageMeta(lang, "/projects", d.title, d.description);
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).projects;
  const projects = await getProjects(lang);
  const groups = [
    { kind: "work", title: d.work },
    { kind: "school", title: d.school },
    { kind: "other", title: d.other },
  ] as const;

  return (
    <div className="container-page py-12 lg:py-20">
      <h1 className="h1-inner">{d.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{d.intro}</p>
      {groups.map((g) => (
        <section key={g.kind} aria-labelledby={`h-${g.kind}`} className="mt-12 lg:mt-16">
          <h2 id={`h-${g.kind}`} className="h2 mb-2">
            {g.title}
          </h2>
          {projects
            .filter((p) => p.kind === g.kind)
            .map((p) => (
              <ProjectArticle key={p.slug} project={p} lang={lang} />
            ))}
        </section>
      ))}
    </div>
  );
}
