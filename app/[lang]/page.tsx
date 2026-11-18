import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDict, isLang, type Lang } from "@/lib/i18n";
import { getExperience, getPerson, getProjects } from "@/lib/content";
import CaseCard from "@/components/case-card";
import ContactForm from "@/components/contact-form";
import ContactList from "@/components/contact-list";
import CvHero from "@/components/cv-hero";
import ExperiencePreview from "@/components/experience-preview";
import TechMarquee from "@/components/tech-marquee";
import { pageMeta } from "./meta";
import portrait from "@/public/images/portrait-face.webp";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).home;
  return pageMeta(lang, "", d.title, d.description, true);
}

const item = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Kv({ k, children, translate }: { k: string; children: React.ReactNode; translate?: "no" }) {
  return (
    <div className="grid grid-cols-[var(--k)_minmax(0,1fr)] gap-x-4 py-2">
      <dt className="text-muted">{k}</dt>
      <dd translate={translate} className="max-sm:hyphens-auto">{children}</dd>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  if (!isLang(lang)) notFound(); // non-language first segment, e.g. /images
  const dict = getDict(lang);
  const h = dict.home;
  const [person, projects, experience] = await Promise.all([getPerson(lang), getProjects(lang), getExperience(lang)]);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="w-full">
      <section data-hero>
        <div className="container-page grid grid-cols-1 gap-x-8 gap-y-8 pt-10 pb-10 lg:grid-cols-12 lg:pt-16">
          <div className="flex flex-col gap-4 lg:col-span-7 lg:gap-5">
            <div className="hero-item flex items-center gap-4" style={item(0)}>
              <div className="portrait w-16 flex-none sm:w-24">
                <Image src={portrait} alt="" priority sizes="96px" className="size-full object-cover object-[50%_30%]" />
              </div>
              <h1 translate="no" className="h1-name">{person.name}</h1>
            </div>
            <div className="hero-item flex flex-col gap-2" style={item(1)}>
              <p className="mono-meta text-muted">{h.titleLine}</p>
              <p className="mono-meta flex items-center gap-2">
                <span className="status-dot ambient" aria-hidden />
                {h.status}
              </p>
            </div>
            <p className="hero-item text-lead max-w-[28ch]" style={item(1)}>{h.statement}</p>
            <div className="hero-item" style={item(2)}>
              <CvHero lang={lang} />
            </div>
          </div>
          <dl
            className="hero-item panel mono-meta divide-y divide-border px-4 py-2 lg:col-span-5"
            style={{ ...item(2), "--k": lang === "cs" ? "6.5rem" : "4.5rem" } as React.CSSProperties}
          >
            {/* "want" first: at 375×812 the last rows fall below the fold (recruiter-first). */}
            <Kv k={h.readout.want}>{h.readout.wantValue}</Kv>
            <Kv k={h.readout.now}>{h.readout.nowValue}</Kv>
            <Kv k={h.readout.study}>{h.readout.studyValue}</Kv>
            <Kv k={h.readout.based}>{h.readout.basedValue}</Kv>
            <Kv k={h.readout.stack} translate="no">{h.readout.stackValue}</Kv>
            <Kv k={h.readout.before}>{h.readout.beforeValue}</Kv>
          </dl>
          <div className="lg:col-span-12">
            <TechMarquee lang={lang} />
          </div>
        </div>
      </section>

      <div className="container-page pb-10">
        <section aria-labelledby="featured" className="py-10">
          <h2 id="featured" className="h2 mb-6">{h.featured}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <CaseCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
          <p className="mt-6">
            <Link href={`/${lang}/projects`} className="link inline-flex min-h-11 items-center">{h.allProjects}</Link>
          </p>
        </section>

        <section aria-labelledby="exp" className="py-10">
          <h2 id="exp" className="h2 mb-6">{h.experience}</h2>
          <ExperiencePreview entries={experience} lang={lang} />
          <p className="mt-6">
            <Link href={`/${lang}/experience`} className="link inline-flex min-h-11 items-center">{h.allExperience}</Link>
          </p>
        </section>

        <section id="contact" aria-labelledby="contact-h" className="py-10">
          <h2 id="contact-h" className="h2 mb-4">{dict.contact.title}</h2>
          <p className="mb-6 max-w-prose">{dict.contact.intro}</p>
          <div className="panel grid grid-cols-1 gap-8 p-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm lang={lang} email={person.email} />
            </div>
            <div className="self-start lg:col-span-5">
              <ContactList lang={lang} person={person} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
