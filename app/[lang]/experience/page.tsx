import Link from "next/link";
import { BookOpen, Briefcase, GraduationCap, Mail } from "lucide-react";
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
    <li id={e.slug} className="flex flex-col gap-2 border-b border-border py-6 first:border-t">
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6">
        <h3 className="h3">{e.position}</h3>
        <p className="mono-meta tabular text-muted">{formatPeriod(lang, e.start, e.end, e.kind === "course")}</p>
      </div>
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
    </li>
  );
}

export default async function ExperiencePage({ params }: PageProps<"/[lang]/experience">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).experience;
  const entries = await getExperience(lang);
  const sections = [
    { kind: "work", title: d.work, icon: Briefcase },
    { kind: "education", title: d.education, icon: GraduationCap },
    { kind: "course", title: d.courses, icon: BookOpen },
  ] as const;

  return (
    <div className="container-page section">
      <h1 className="h1-inner">{d.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{d.intro}</p>
      {sections.map((s) => (
        <section key={s.kind} aria-labelledby={`h-${s.kind}`} className="mt-12 lg:mt-16">
          <h2 id={`h-${s.kind}`} className="h2 mb-6">
            <s.icon aria-hidden />
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
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CvButton lang={lang} variant="secondary" />
        <Link href={`/${lang}#contact`} className="btn btn-secondary">
          <Mail aria-hidden strokeWidth={2} />
          {d.contact}
        </Link>
      </div>
    </div>
  );
}
