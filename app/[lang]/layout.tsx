import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { archivo, redHatMono } from "../fonts";
import { themeColors } from "../theme";
import { getDict, isLang, langs, siteUrl } from "@/lib/i18n";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CvFab from "@/components/cv-fab";

export const generateStaticParams = () => langs.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const name = "Jan Zámostný";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: name, template: `%s | ${name}` },
    description: isLang(lang) ? getDict(lang).home.description : undefined,
    openGraph: { siteName: name, type: "website", locale: lang === "cs" ? "cs_CZ" : "en_US" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

// Applies a forced theme (and its theme-color) before first paint; see ThemeToggle.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t;var c=t==="dark"?"${themeColors.dark}":"${themeColors.light}";document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll('meta[name=theme-color]').forEach(function(m){m.content=c})})}}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  return (
    <html lang={lang} className={`${archivo.variable} ${redHatMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 border-2 border-accent bg-surface-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:flex focus:min-h-11 focus:items-center focus:px-4"
        >
          {dict.skip}
        </a>
        <SiteHeader lang={lang} />
        <main id="main" tabIndex={-1}>
          {children}
          <CvFab lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
