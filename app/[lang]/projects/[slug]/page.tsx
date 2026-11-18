import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code } from "lucide-react";
import { getDict, langs, type Lang } from "@/lib/i18n";
import { getProject, getProjects } from "@/lib/content";
import { Characteristics } from "@/components/projects";
import { pageMeta } from "../../meta";

// Projects removed from the site; their old URLs send visitors to the list.
const retiredSlugs = ["raynet-leaderboard", "dev-events"];

// First request for an unlisted slug waits for the full render, so notFound() sends a real 404.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const projects = await getProjects("en");
  return langs.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const p = await getProject(lang, slug);
  return p ? pageMeta(lang, `/projects/${slug}`, p.name, p.summary) : {};
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = (await params) as { lang: Lang; slug: string };
  const p = await getProject(lang, slug);
  if (!p) {
    if (retiredSlugs.includes(slug)) permanentRedirect(`/${lang}/projects`);
    notFound();
  }
  const d = getDict(lang);
  const all = await getProjects(lang);
  const next = all[(all.findIndex((x) => x.slug === slug) + 1) % all.length];

  return (
    <article className="container-page section max-w-[64rem]">
      <Link href={`/${lang}/projects`} className="link inline-flex min-h-11 items-center gap-2">
        <ArrowLeft aria-hidden className="size-[1em]" />
        {d.projects.back}
      </Link>
      <h1 translate="no" className="h1-inner mt-6">{p.name}</h1>
      <p className="text-lead mt-4 max-w-prose text-muted">{p.summary}</p>
      {p.thumbnail && (
        <div className="img-frame mt-8">
          <Image
            src={p.thumbnail}
            alt={p.thumbnailAlt}
            width={1600}
            height={1000}
            priority
            sizes="(min-width:1024px) 64rem, 100vw"
            className="aspect-[16/10] w-full object-cover object-left-top"
          />
        </div>
      )}
      <div className="mt-8">
        <Characteristics project={p} lang={lang} />
      </div>
      <section aria-labelledby="about" className="mt-10">
        <h2 id="about" className="h2 mb-4">
          {d.projects.about}
        </h2>
        <div className="max-w-prose space-y-4">
          {p.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </section>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {p.sourceUrl && (
          <a href={p.sourceUrl} target="_blank" rel="noopener" className="btn btn-primary">
            <Code aria-hidden strokeWidth={2} />
            {d.projects.viewSource}
            <span className="sr-only"> {d.newTab}</span>
          </a>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener" className="btn btn-primary">
            <ArrowUpRight aria-hidden strokeWidth={2} />
            {d.projects.openLive}
            <span className="sr-only"> {d.newTab}</span>
          </a>
        )}
        <Link href={`/${lang}/projects`} className="btn btn-secondary">
          {d.projects.all}
        </Link>
      </div>
      {next.slug !== slug && (
        <Link
          href={`/${lang}/projects/${next.slug}`}
          className="group mt-12 flex items-center justify-between gap-6 border-y border-border py-4 hover:bg-surface hover:shadow-1 active:bg-press"
        >
          <span className="flex min-w-0 flex-col">
            <span className="mono-meta text-muted">{d.projects.next}</span>
            <span translate="no" className="h3 group-hover:underline">
              {next.name}
            </span>
          </span>
          <ArrowRight aria-hidden className="size-5 flex-none transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
        </Link>
      )}
    </article>
  );
}
