import Link from "next/link";
import { getDict } from "@/lib/i18n";

// not-found has no params; English with a Czech line covers both audiences.
export default function NotFound() {
  const en = getDict("en"), cs = getDict("cs");
  return (
    <div className="container-page section">
      <h1 className="h1-inner">{en.notFound.title}</h1>
      <p className="mt-4 max-w-prose">{en.notFound.text}</p>
      <p lang="cs" className="mt-2 max-w-prose text-muted">
        {cs.notFound.title}. {cs.notFound.text}
      </p>
      <p className="mt-8 flex flex-wrap gap-x-6">
        <Link href="/en/projects" className="link inline-flex min-h-11 items-center">
          {en.projects.all}
        </Link>
        <Link href="/en" className="link inline-flex min-h-11 items-center">
          {en.notFound.home}
        </Link>
      </p>
    </div>
  );
}
