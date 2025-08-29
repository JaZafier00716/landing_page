"use client";

import { createContext, useState, useContext } from "react";
import { Lang } from "@/app/types";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang(prev => (prev === "en" ? "cs" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <html lang={lang}>
        <body>{children}</body>
      </html>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
