import Image from "next/image";
import Link from "next/link";
import { FolderGit2, Mail } from "lucide-react";
import { getDict, type Lang } from "@/lib/i18n";
import { getPerson, getProjects } from "@/lib/content";
import CvButton from "@/components/cv-button";
import ContactList from "@/components/contact-list";
import { ProjectRow } from "@/components/projects";
import { pageMeta } from "./meta";
import portrait from "@/public/images/portrait.webp";

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
      <section className="grid grid-cols-4 items-start gap-x-6 gap-y-6 py-6 max-lg:min-h-[calc(100svh-var(--header-h)-6rem)] max-lg:content-center lg:grid-cols-12 lg:py-20">
        <div className="col-span-4 flex flex-col items-center gap-4 text-center lg:col-span-8 lg:row-start-1 lg:items-start lg:gap-5 lg:text-left">
          <p className="eyebrow">{dict.home.eyebrow}</p>
          <h1 translate="no" className="text-display font-extrabold [font-stretch:112.5%] [overflow-wrap:normal] sm:[font-stretch:125%]">
            {person.name}
          </h1>
          <p className="text-lead max-w-[40ch] text-muted lg:max-w-[52ch]">{dict.home.role}</p>
          <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start sm:gap-4">
            <CvButton lang={lang} />
            <a href="#contact" className="btn btn-secondary">
              <Mail aria-hidden strokeWidth={2} />
              {dict.home.contact}
            </a>
          </div>
        </div>
        <div className="portrait col-span-4 max-lg:order-first lg:row-start-1 w-[clamp(10.5rem,48vw,12rem)] justify-self-center lg:col-span-4 lg:col-start-9 lg:w-full lg:max-w-80 lg:justify-self-end">
          <Image
            src={portrait}
            alt=""
            priority
            sizes="(min-width:1024px) 320px, 192px"
            className="size-full object-cover object-[50%_30%]"
          />
        </div>
      </section>

      <section aria-labelledby="featured" className="section">
        <h2 id="featured" className="h2 mb-6">
          <FolderGit2 aria-hidden />
          {dict.home.featured}
        </h2>
        <ul>
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} lang={lang} />
          ))}
        </ul>
        <p className="mt-6">
          <Link href={`/${lang}/projects`} className="link inline-flex min-h-11 items-center">
            {dict.home.allProjects}
          </Link>
        </p>
      </section>

      <section aria-labelledby="contact" className="section">
        <h2 id="contact" className="h2 mb-6">
          <Mail aria-hidden />
          {dict.contact.title}
        </h2>
        <ContactList lang={lang} person={person} />
      </section>
    </div>
  );
}
