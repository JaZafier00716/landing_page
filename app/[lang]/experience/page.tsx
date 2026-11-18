import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPeriod, getDict, isLang, type Lang } from "@/lib/i18n";
import { getExperience, type ExperienceEntry } from "@/lib/content";
import StackChips from "@/components/stack-chips";
import { pageMeta } from "../meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).experience;
  return pageMeta(lang, "/experience", d.title, d.description);
}

function Entry({ e, lang }: { e: ExperienceEntry; lang: Lang }) {
  const dict = getDict(lang);
  return (
    <li id={e.slug} data-current={e.end ? undefined : ""} className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6">
        <h3 className="h3">{e.position}</h3>
        <p className="mono-meta tabular text-muted">{formatPeriod(lang, e.start, e.end, e.kind === "course")}</p>
        <p className="font-semibold" translate="no">
          {e.url ? (
            <a href={e.url} target="_blank" rel="noopener" className="link hit link-row">
              {e.company}
              <span className="sr-only"> {dict.newTab}</span>
            </a>
          ) : (
            e.company
          )}
        </p>
      </div>
      {e.bullets.length > 0 && (
        <ul className="max-w-prose list-disc space-y-1 pl-5 marker:text-muted">
          {e.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {e.stack && <StackChips stack={e.stack.split(", ")} lang={lang} className="mono-meta" />}
      {e.related.length > 0 && (
        <p>
          <span className="mono-meta text-muted">{dict.experience.related}: </span>
          {e.related.map((r, i) => (
            // Phones: one full-width 44px row per link; from sm: inline comma list.
            <span key={r.slug} className="max-sm:block">
              {i > 0 && <span className="max-sm:hidden">, </span>}
              <Link href={`/${lang}/projects/${r.slug}`} className="link hit link-row max-sm:flex max-sm:min-h-11 max-sm:w-full max-sm:items-center">
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
  if (!isLang(lang)) notFound(); // non-language first segment, e.g. /images
  const d = getDict(lang).experience;
  const entries = await getExperience(lang);
  const sections = [
    { kind: "work", title: d.work },
    { kind: "education", title: d.education },
    { kind: "course", title: d.courses },
  ] as const;

  return (
    <div className="container-page section">
      <h1 className="h1-inner">{d.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{d.intro}</p>
      {sections.map((s) => (
        <section key={s.kind} aria-labelledby={`h-${s.kind}`} className="mt-12 lg:mt-16">
          <h2 id={`h-${s.kind}`} className="h2 mb-6">{s.title}</h2>
          <ol className="tl">
            {entries
              .filter((e) => e.kind === s.kind)
              .map((e) => (
                <Entry key={e.slug} e={e} lang={lang} />
              ))}
          </ol>
        </section>
      ))}
      <p className="mt-12">
        <Link href={`/${lang}#contact`} className="link inline-flex min-h-11 items-center">{d.contact}</Link>
      </p>
    </div>
  );
}
