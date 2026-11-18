import Link from "next/link";
import { getDict, type Lang } from "@/lib/i18n";
import { getSkills } from "@/lib/content";
import TechIcon, { techKey } from "@/components/tech-icon";
import { pageMeta } from "../meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/skills">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).skills;
  return pageMeta(lang, "/skills", d.title, d.description);
}

export default async function SkillsPage({ params }: PageProps<"/[lang]/skills">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).skills;
  const groups = await getSkills(lang);

  return (
    <div className="container-page section">
      <h1 className="h1-inner">{d.title}</h1>
      <p className="mt-4 max-w-prose text-muted">{d.intro}</p>
      {groups.map((g) => (
        <section key={g.key} id={g.key} aria-labelledby={`h-${g.key}`} className="mt-12 lg:mt-16">
          <h2 id={`h-${g.key}`} className="h2 mb-4">{g.title}</h2>
          <table className="w-full border-collapse text-left">
            <thead className="sr-only sm:not-sr-only">
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-6 font-semibold text-muted sm:w-2/5">
                  {d.skill}
                </th>
                <th scope="col" className="py-2 font-semibold text-muted">
                  {d.usedIn}
                </th>
              </tr>
            </thead>
            <tbody>
              {g.skills.map((s) => (
                <tr key={s.name} className="flex flex-col border-b border-border py-3 sm:table-row">
                  <th scope="row" translate="no" className="pr-6 font-semibold sm:py-3 sm:align-top">
                    <span className="inline-flex items-center gap-2">
                      {techKey(s.name) && <TechIcon name={s.name} className="size-[1.25em] flex-none" />}
                      {s.name}
                    </span>
                  </th>
                  <td lang={lang} className="text-muted narrow hit-list sm:py-3">
                    {s.detail && s.detail}
                    {!s.detail && s.usedIn.length === 0 && (
                      <>
                        <span aria-hidden>–</span>
                        <span className="sr-only">{d.none}</span>
                      </>
                    )}
                    {!s.detail && s.usedIn.map((u, i) => (
                      <span key={u.href} className="max-sm:block">
                        {i > 0 && <span className="max-sm:hidden">, </span>}
                        <Link href={u.href} className="link hit link-row">
                          {u.name}
                        </Link>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
