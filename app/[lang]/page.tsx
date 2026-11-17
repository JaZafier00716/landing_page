import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { getPerson, getProjects } from "@/lib/content";
import CvButton from "@/components/cv-button";
import ContactList from "@/components/contact-list";
import { ProjectRow } from "@/components/projects";
import { pageMeta } from "./meta";
import portrait from "@/public/images/picture.png";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const d = getDict(lang).home;
  return pageMeta(lang, "", d.title, d.description, true);
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const dict = getDict(lang);
  const [person, projects] = await Promise.all([getPerson(lang), getProjects(lang)]);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="container-page">
      <section className="grid grid-cols-4 gap-x-6 py-12 lg:grid-cols-12 lg:py-20">
        <div className="col-span-4 flex flex-col gap-5 lg:col-span-8">
          <Image
            src={portrait}
            alt=""
            priority
            sizes="88px"
            className="aspect-[3/4] w-[66px] rounded-sm border border-border bg-surface object-cover object-top lg:hidden"
          />
          <p className="mono-meta tracking-[0.06em] text-muted uppercase">{dict.home.eyebrow}</p>
          <h1 className="name-in text-[clamp(2.25rem,12vw,3.25rem)] leading-none font-extrabold tracking-[-0.02em] [font-stretch:112.5%] sm:[font-stretch:125%] lg:text-[5.5rem]">
            {person.name}
          </h1>
          <p className="max-w-[40ch] text-[1.0625rem] leading-normal text-muted lg:max-w-[52ch] lg:text-[1.375rem]">
            {dict.home.role}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <CvButton lang={lang} />
            <a href="#contact" className="btn btn-secondary">
              <Mail aria-hidden />
              {dict.home.contact}
            </a>
          </div>
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <Image
            src={portrait}
            alt=""
            priority
            sizes="320px"
            className="aspect-[3/4] w-full max-w-80 rounded-sm border border-border bg-surface object-cover object-top"
          />
        </div>
      </section>

      <section aria-labelledby="featured" className="py-12 lg:py-20">
        <h2 id="featured" className="h2 mb-6">
          {dict.home.featured}
        </h2>
        <ul>
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} lang={lang} />
          ))}
        </ul>
        <p className="mt-6">
          <Link href={`/${lang}/projects`} className="link">
            {dict.home.allProjects}
          </Link>
        </p>
      </section>

      <section aria-labelledby="contact" className="scroll-mt-20 py-12 lg:py-20">
        <h2 id="contact" className="h2 mb-6 scroll-mt-20">
          {dict.contact.title}
        </h2>
        <ContactList lang={lang} person={person} copy />
      </section>
    </div>
  );
}
