import type { Metadata, Viewport } from "next";
import "../globals.css";
import "./lab.css";
import { archivo, redHatMono } from "../fonts";
import { themeColors } from "../theme";
import LabHeader from "./components/lab-header";
import LabFooter from "./components/lab-footer";

// Prototype routes for the redesign directions (docs/redesign/directions.md). Own root layout, EN only, never indexed.
export const metadata: Metadata = { title: "Lab | Jan Zámostný", robots: { index: false, follow: false } };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

// Same pattern as app/[lang]/layout.tsx: apply a forced theme before first paint.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t;var c=t==="dark"?"${themeColors.dark}":"${themeColors.light}";var f=function(){document.querySelectorAll('meta[name=theme-color]').forEach(function(m){m.content=c})};document.addEventListener("DOMContentLoaded",f);addEventListener("load",f)}}catch(e){}`;
// Pauses the ambient loops (CSS) while the tab is hidden.
const hiddenScript = `document.addEventListener("visibilitychange",function(){document.documentElement.toggleAttribute("data-hidden",document.hidden)})`;

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${redHatMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: hiddenScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 border-2 border-accent bg-surface-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:flex focus:min-h-11 focus:items-center focus:px-4"
        >
          Skip to content
        </a>
        <LabHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <LabFooter />
      </body>
    </html>
  );
}
