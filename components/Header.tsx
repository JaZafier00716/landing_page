"use client";
import Logo from "./ui/logo";
import Nav from "./ui/nav";
import { useState } from "react";
import Links from "./ui/links";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Props = { lang: "en" | "cs" };

const Header = ({ lang }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleLang = () => {
    const newLang = lang === "en" ? "cs" : "en";
    document.cookie = `lang=${newLang}; path=/`;
    window.location.reload();
  };

  return (
    <>
      <header className="box-border py-8 px-8 md:px-24 xxl:px-52 flex items-center justify-between md:gap-16 lg:gap-32">
        <Logo href="/" />
        <Nav SetShowMobileMenu={setShowMenu} ShowMobileMenu={showMenu} Lang={lang} ToggleLang={toggleLang} />
        <motion.div
          className="absolute top-8 right-8 hidden md:block"
          initial={{ opacity: 0, rotateZ: 360 }}
          animate={{ opacity: 1, rotateZ: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        >
          <Button
            className="relative group w-min h-full border-2 border-emerald-600 hover:border-emerald-400 rounded-2xl px-4 py-2 bg-gray-900 text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
            onClick={toggleLang}
          >
            {lang === "en" ? "CS" : "EN"}
          </Button>
        </motion.div>
      </header>

      <div className="h-[1px] w-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>

      <div className={`relative ${showMenu ? "opacity-100 block" : "opacity-0 hidden"}`}>
        <Links
          className={`flex md:hidden flex-col bg-opacity-20 bg-black justify-end items-center transition-all duration-500 ease-out ${showMenu ? "h-[var(--radix-accordion-content-height)] gap-4 py-8 box-border" : "h-0 min-h-0 gap-0 py-0"
            }`}
          Lang={lang}
          ToggleLang={toggleLang}
        />
        <motion.div
          className="absolute top-8 right-8 block md:hidden"
          initial={{ opacity: 0, rotateZ: 360 }}
          animate={{ opacity: 1, rotateZ: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        >
          <Button
            className="relative group w-min h-full border-2 border-emerald-600 hover:border-emerald-400 rounded-2xl px-4 py-2 bg-gray-900 text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
            onClick={toggleLang}
          >
            {lang === "en" ? "CS" : "EN"}
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Header;
