import Link from "next/link";
import { formatPeriod, getDict, type Lang } from "@/lib/i18n";
import { getExperience, type ExperienceEntry } from "@/lib/content";
import CvButton from "@/components/cv-button";
import { pageMeta } from "../meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).experience;
  return pageMeta(lang, "/experience", d.title, d.description);
}

function Entry({ e, lang }: { e: ExperienceEntry; lang: Lang }) {
  const dict = getDict(lang);
  return (
    <li id={e.slug} className="grid scroll-mt-20 grid-cols-4 gap-x-6 gap-y-2 border-b border-border py-6 first:border-t lg:grid-cols-12">
      <p className="mono-meta col-span-4 text-muted lg:col-span-3">
        {formatPeriod(lang, e.start, e.end, e.kind === "course")}
      </p>
      <div className="col-span-4 flex flex-col gap-2 lg:col-span-9">
        <h3 className="h3">{e.position}</h3>
        <p className="font-semibold">
          {e.url ? (
            <a href={e.url} target="_blank" rel="noopener">
              {e.company}
              <span className="sr-only"> {dict.newTab}</span>
            </a>
          ) : (
            e.company
          )}
        </p>
        {e.bullets.length > 0 && (
          <ul className="max-w-prose list-disc space-y-1 pl-5 marker:text-muted">
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {e.stack && <p className="mono-meta text-muted">{e.stack}</p>}
        {e.related.length > 0 && (
          <p>
            <span className="mono-meta text-muted">{dict.experience.related}: </span>
            {e.related.map((r, i) => (
              <span key={r.slug}>
                {i > 0 && ", "}
                <Link href={`/${lang}/projects/${r.slug}`} className="link">
                  {r.name}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

export default async function ExperiencePage({ params }: PageProps<"/[lang]/experience">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).experience;
  const entries = await getExperience(lang);
  const sections = [
    { kind: "work", title: d.work },
    { kind: "education", title: d.education },
    { kind: "course", title: d.courses },
  ] as const;

  return (
    <div className="container-page py-12 lg:py-20">
      <h1 className="h1-inner">{d.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{d.intro}</p>
      {sections.map((s) => (
        <section key={s.kind} aria-labelledby={`h-${s.kind}`} className="mt-12 lg:mt-16">
          <h2 id={`h-${s.kind}`} className="h2 mb-6">
            {s.title}
          </h2>
          <ol>
            {entries
              .filter((e) => e.kind === s.kind)
              .map((e) => (
                <Entry key={e.slug} e={e} lang={lang} />
              ))}
          </ol>
        </section>
      ))}
      <div className="mt-12">
        <CvButton lang={lang} variant="secondary" />
      </div>
    </div>
  );
}
