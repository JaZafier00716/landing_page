import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import TechIcon, { techNames } from "./tech-icon";

// Facts come from data/seed.ts descriptions; anything not in the seed stays a visible [placeholder].
const PH_RESULT = "[placeholder: result and next step]";
const extra: Record<string, { decision: string; result: string; also?: [string, string] }> = {
  "catering-is": {
    decision: "Hand-written JDBC data mappers, without frameworks or an ORM, as the assignment requires.",
    result: "330 automated tests (mvn clean test), 0 failures. Next: [placeholder].",
  },
  "modal-text-editor": {
    decision: "Key bindings live in a motions file, and the screen is drawn with ANSI escape sequences.",
    result: PH_RESULT,
    also: ["Quality", "CMake with optional AddressSanitizer and a Valgrind target."],
  },
  tetris: {
    decision: "Game loop, rendering, controls and collision logic written in C on SDL2.",
    result: PH_RESULT,
  },
  zpg: {
    decision: "Modern OpenGL: GLSL shaders and GLM transforms, window and loader through GLFW and GLAD. The source is private, so there is no link.",
    result: PH_RESULT,
  },
};
const alias: Record<string, string> = { "Java 21": "Java", "C++23": "C++" };

function Shot({ p, sizes }: { p: Project; sizes: string }) {
  if (!p.thumbnail)
    return (
      <div className="mono-meta grid aspect-[16/10] place-items-center bg-press p-4 text-center text-muted">
        [placeholder image: no screenshot of this project yet]
      </div>
    );
  return (
    <Image src={p.thumbnail} alt={p.thumbnailAlt} width={1600} height={1000} sizes={sizes} className="aspect-[16/10] w-full object-cover object-left-top" />
  );
}

function Source({ p }: { p: Project }) {
  if (!p.sourceUrl) return null;
  return (
    <a href={p.sourceUrl} target="_blank" rel="noopener" className="link hit relative z-10 mono-meta inline-flex min-h-11 items-center gap-1">
      Source
      <ArrowUpRight aria-hidden className="size-[1em]" />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

const Title = ({ p, className }: { p: Project; className: string }) => (
  <h3 translate="no" className={className}>
    <Link href={`/en/projects/${p.slug}`} className="box-title after:absolute after:inset-0">
      {p.name}
    </Link>
  </h3>
);

export default function CaseCard({ project: p, variant, flip = false }: { project: Project; variant: "a" | "b"; flip?: boolean }) {
  const x = extra[p.slug] ?? { decision: "[placeholder: decision]", result: PH_RESULT };
  if (variant === "a") {
    return (
      <article className="hover-box relative grid grid-cols-1 gap-x-8 gap-y-5 p-4 sm:p-6 lg:grid-cols-12">
        <div className={`img-frame self-start lg:col-span-5 ${flip ? "lg:order-last" : ""}`}>
          <Shot p={p} sizes="(min-width:1024px) 40vw, 100vw" />
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-7">
          <Title p={p} className="h2" />
          <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-[6rem_minmax(0,1fr)]">
            <Row k="Problem">{p.summary}</Row>
            <Row k="Decision">{x.decision}</Row>
            {x.also && <Row k={x.also[0]}>{x.also[1]}</Row>}
            <Row k="Stack" mono>{p.stack.join(" · ")}</Row>
            <Row k="Result">{x.result}</Row>
          </dl>
          <div className="flex items-center justify-between gap-4">
            <Source p={p} />
            <ArrowRight aria-hidden className="arrow ms-auto size-5" />
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="box-b card-b gap-y-0">
      <div className="img-frame !rounded-none">
        <Shot p={p} sizes="(min-width:1024px) 35vw, 100vw" />
      </div>
      <Title p={p} className="h3 line-clamp-2 px-5 pt-4" />
      <p className="line-clamp-2 px-5 pt-1 text-muted">{p.summary}</p>
      <p className="px-5 pt-3 text-pretty">
        <span className="mono-meta text-muted">Decision </span>
        {x.decision}
      </p>
      <p className="px-5 pt-2">
        <span className="mono-meta text-muted">Result </span>
        {x.result}
      </p>
      <ul className="flex flex-wrap gap-2 px-5 pt-3" aria-label="Stack">
        {p.stack.map((s) => (
          <li key={s} translate="no" className="chip mono-meta">
            {techNames.includes(alias[s] ?? s) && <TechIcon name={alias[s] ?? s} className="size-[1.1em] flex-none" />}
            {s}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between px-5 pb-2">
        <Source p={p} />
        <ArrowRight aria-hidden className="arrow ms-auto size-5" />
      </div>
    </article>
  );
}

function Row({ k, children, mono }: { k: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <>
      <dt className="mono-meta text-muted sm:pt-[0.15em]">{k}</dt>
      <dd translate={mono ? "no" : undefined} className={mono ? "mono-meta" : "text-pretty"}>{children}</dd>
    </>
  );
}
