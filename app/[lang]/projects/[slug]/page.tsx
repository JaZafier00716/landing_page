import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getDict, langs, type Lang } from "@/lib/i18n";
import { getProject, getProjects } from "@/lib/content";
import { Characteristics } from "@/components/projects";
import StackChips from "@/components/stack-chips";
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
      <StackChips stack={p.stack} lang={lang} className="mono-meta mt-4" />
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
      {(p.decision || p.result || p.next) && (
        <dl className="mt-8 grid max-w-prose gap-x-6 gap-y-3 sm:grid-cols-[6rem_minmax(0,1fr)]">
          {([[d.projects.decision, p.decision], [d.projects.result, p.result], [d.projects.nextStep, p.next]] as const).map(
            ([k, v]) =>
              v && (
                <div key={k} className="contents">
                  <dt className="mono-meta text-muted sm:pt-[0.15em]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ),
          )}
        </dl>
      )}
      <div className="mt-8">
        <Characteristics project={p} lang={lang} omitStack />
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
      {(p.sourceUrl || p.liveUrl) && (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {p.sourceUrl && (
            <a href={p.sourceUrl} target="_blank" rel="noopener" className="btn btn-secondary">
              {d.projects.viewSource}
              <ArrowUpRight aria-hidden strokeWidth={2} />
              <span className="sr-only"> {d.newTab}</span>
            </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" className="btn btn-secondary">
              {d.projects.openLive}
              <ArrowUpRight aria-hidden strokeWidth={2} />
              <span className="sr-only"> {d.newTab}</span>
            </a>
          )}
        </div>
      )}
      {next.slug !== slug && (
        <p className="mt-12">
          <Link href={`/${lang}/projects/${next.slug}`} className="link inline-flex min-h-11 items-center gap-2">
            <span className="mono-meta text-muted no-underline">{d.projects.next}:</span>
            <span translate="no">{next.name}</span>
            <ArrowRight aria-hidden className="size-[1em] flex-none" />
          </Link>
        </p>
      )}
    </article>
  );
}
