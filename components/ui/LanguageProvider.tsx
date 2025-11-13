// "use client";

// import { createContext, useState, useContext, useMemo } from "react";
// import { Lang } from "@/app/types";

// type LanguageContextType = {
//   lang: Lang;
//   toggleLang: () => void;
// };

// const LanguageContext = createContext<LanguageContextType | null>(null);

// export function LanguageProvider({ children }: { readonly children: React.ReactNode }) {
//   const [lang, setLang] = useState<Lang>("en");

//   const toggleLang = () => setLang(prev => (prev === "en" ? "cs" : "en"));

//   const contextValue = useMemo(() => ({ lang, toggleLang }), [lang]);

//   return (
//     <LanguageContext.Provider value={contextValue}>
//       <html lang={lang}>
//         <body>{children}</body>
//       </html>
//     </LanguageContext.Provider>
//   );
// }

// // export function useLanguage() {
// //   const ctx = useContext(LanguageContext);
// //   if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
// //   return ctx;
// // }
