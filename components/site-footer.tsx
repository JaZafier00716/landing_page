import { getDict, type Lang } from "@/lib/i18n";
import { getPerson } from "@/lib/content";
import ContactList from "./contact-list";
import LangLink from "./lang-link";

// Build time = last content update for a statically rendered site.
const builtAt = new Date();

export default async function SiteFooter({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const person = await getPerson(lang);
  const updated = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(builtAt);
  return (
    <footer className="mt-12 border-t border-border py-10 lg:mt-20">
      <div className="container-page grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <ContactList lang={lang} person={person} />
        </div>
        <div className="mono-meta flex flex-col items-start gap-2 text-muted lg:col-span-4 lg:items-end">
          <LangLink lang={lang} className="nav-link px-0" />
          <p>
            {dict.footer.updated} {updated}
          </p>
          <p>
            © {builtAt.getFullYear()} {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
