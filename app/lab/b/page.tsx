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

const Kv = ({ k, children, className = "" }: { k: string; children: React.ReactNode; className?: string }) => (
  <div className={`grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 py-2 ${className}`}>
    <dt className="text-muted">{k}</dt>
    <dd>{children}</dd>
  </div>
);

// Direction B "Bench": a spec readout hero over a drifting dot grid. Here the CV swap is A's CSS flag (no client component).
export default async function LabB({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const [person, projects, experience] = await Promise.all([getPerson("en"), getProjects("en"), getExperience("en")]);
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="w-full">
      <section className="relative isolate">
        <div className="hero-grid -z-10" aria-hidden>
          <div className="ambient" />
        </div>
        <div className="container-page grid grid-cols-1 gap-x-8 gap-y-8 pt-10 pb-8 lg:grid-cols-12 lg:pt-16">
          <div className="flex flex-col gap-4 lg:col-span-7 lg:gap-5">
            <div className="flex items-center gap-4">
              <div className="portrait w-16 flex-none sm:w-24">
                <Image src={portrait} alt="" sizes="96px" className="size-full object-cover object-[50%_30%]" />
              </div>
              <h1 translate="no" className="lab-h1">{person.name}</h1>
            </div>
            <p className="mono-meta text-muted">[placeholder: title line, e.g. “Software engineer in Ostrava”]</p>
            <p className="text-lead max-w-[28ch]">I write software from C and OpenGL up to Next.js.</p>
            <CvHero />
          </div>
          <dl className="panel mono-meta divide-y divide-border px-4 py-2 lg:col-span-5">
            <Kv k="now">
              <span className="flex items-start gap-2">
                <span className="status-dot ambient mt-[0.55em]" aria-hidden />
                QA Automation Engineer (internship), FUTTEC a.s., remote, since Sep 2026
              </span>
            </Kv>
            <Kv k="study">Bachelor’s, Computer Science, VŠB – Technical University of Ostrava</Kv>
            <Kv k="based">Ostrava</Kv>
            <Kv k="stack" className="md:hidden">C, C++, OpenGL, Java, Python</Kv>
            <Kv k="before">Frontend Web Developer, SHOWMORE (Jul–Oct 2024); Blackfish (contract, Jun–Dec 2023)</Kv>
            <Kv k="want">[Looking for: …]</Kv>
          </dl>
          <div className="lg:col-span-12">
            <TechMarquee variant="b" />
          </div>
        </div>
      </section>

      <div className="container-page">
        <section aria-labelledby="work" className="py-10">
          <h2 id="work" className="section-title mb-6">Work log</h2>
          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
            {featured.map((p) => (
              <CaseCard key={p.slug} project={p} variant="b" />
            ))}
          </div>
          <p className="mt-6">
            <Link href="/en/projects" className="link inline-flex min-h-11 items-center">All projects</Link>
          </p>
        </section>

        <section aria-labelledby="exp" className="py-10">
          <h2 id="exp" className="section-title mb-6">Experience</h2>
          <ExperiencePreview entries={experience} variant="b" />
          <p className="mt-4">
            <Link href="/en/experience" className="link inline-flex min-h-11 items-center">All experience</Link>
          </p>
        </section>

        <section id="contact" aria-labelledby="contact-h" className="py-10">
          <h2 id="contact-h" className="section-title mb-6">Get in touch</h2>
          <ContactForm person={person} from="b" searchParams={searchParams} panel />
        </section>
      </div>
    </div>
  );
}
