import Image from "next/image";
import Link from "next/link";
import { getExperience, getPerson, getProjects } from "@/lib/content";
import ExperiencePreview from "../components/experience-preview";
import CaseCard from "../components/case-card";
import ContactForm from "../components/contact-form";
import CvHero from "../components/cv-hero";
import TechMarquee from "../components/tech-marquee";
import portrait from "@/public/images/portrait-face.webp";

export const metadata = { robots: { index: false, follow: false } };

// Direction A "Colophon": the sentence is the hero. EN strings are inline until adoption (then lib/i18n.ts + Czech).
export default async function LabA({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const [person, projects, experience] = await Promise.all([getPerson("en"), getProjects("en"), getExperience("en")]);
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="container-page w-full">
      <section className="grid grid-cols-1 gap-x-8 gap-y-6 pt-10 pb-12 lg:grid-cols-12 lg:pt-20 lg:pb-16">
        <div className="flex flex-col gap-5 lg:col-span-9">
          <p translate="no" className="text-lead font-semibold">{person.name}</p>
          <h1 className="statement max-w-[26ch] lg:max-w-[30ch]">
            QA automation intern at FUTTEC and computer science student at VŠB-TUO in Ostrava. I write software from C and OpenGL up to Next.js.
          </h1>
          <p className="flex items-center gap-3">
            <span className="status-dot ambient" aria-hidden />
            [Looking for: …]
          </p>
          <CvHero />
        </div>
        <div className="portrait hidden w-full max-w-60 justify-self-end lg:col-span-3 lg:block">
          <Image src={portrait} alt="" sizes="240px" className="size-full object-cover object-[50%_30%]" />
        </div>
        <div className="lg:col-span-12">
          <TechMarquee variant="a" />
        </div>
      </section>

      <section aria-labelledby="exp" className="py-10">
        <h2 id="exp" className="section-title mb-6">Experience</h2>
        <ExperiencePreview entries={experience} variant="a" />
        <p className="mt-4 px-4">
          <Link href="/en/experience" className="link inline-flex min-h-11 items-center">All experience</Link>
        </p>
      </section>

      <section aria-labelledby="work" className="py-10">
        <h2 id="work" className="section-title mb-6">Selected work</h2>
        <div className="flex flex-col gap-6">
          {featured.map((p, i) => (
            <CaseCard key={p.slug} project={p} variant="a" flip={i % 2 === 1} />
          ))}
        </div>
        <p className="mt-6">
          <Link href="/en/projects" className="link inline-flex min-h-11 items-center">All projects</Link>
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-h" className="py-10">
        <h2 id="contact-h" className="section-title mb-6">Get in touch</h2>
        <ContactForm person={person} from="a" searchParams={searchParams} />
      </section>
    </div>
  );
}
