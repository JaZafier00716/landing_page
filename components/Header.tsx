"use client";
import Logo from "./ui/logo";
import Nav from "./ui/nav";
import { useState } from "react";
import Links from "./ui/links";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  return (
    <>
      <header className="box-border py-8 xs:px-8 md:px-16 lg:px-24 xxl:px-52 flex items-center justify-between md:gap-16 lg:gap-32">
        <Logo href="/" />
        <Nav SetShowMobileMenu={setShowMenu} ShowMobileMenu={showMenu} />
      </header>
      <div className="h-[1px] w-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
      <div className={showMenu ? 'opacity-100' : 'opacity-0'}>
        <Links
          className={`xs:flex md:hidden flex-col bg-opacity-20 bg-black justify-end items-center transition-all duration-500 ease-out ${
            showMenu
              ? "h-[var(--radix-accordion-content-height)] gap-4 py-8 box-border"
              : "h-0 min-h-0 gap-0 py-0"
          }`}
        />
      </div>
    </>
  );
};

export default Header;
