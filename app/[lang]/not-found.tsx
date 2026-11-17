import Link from "next/link";
import { getDict } from "@/lib/i18n";

// not-found has no params; English with a Czech line covers both audiences.
export default function NotFound() {
  const en = getDict("en"), cs = getDict("cs");
  return (
    <div className="container-page py-12 lg:py-20">
      <h1 className="h1-inner">{en.notFound.title}</h1>
      <p className="mt-4 max-w-prose">{en.notFound.text}</p>
      <p lang="cs" className="mt-2 max-w-prose text-muted">
        {cs.notFound.title}. {cs.notFound.text}
      </p>
      <p className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/en/projects" className="btn btn-primary">
          {en.nav.projects}
        </Link>
        <Link href="/en" className="btn btn-secondary">
          {en.notFound.home}
        </Link>
      </p>
    </div>
  );
}
