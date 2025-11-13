"use client";
import { twMerge } from "tailwind-merge";
import Links from "./links";
import { Menu, X } from "lucide-react";

type Nav = {
  ShowMobileMenu: boolean
  SetShowMobileMenu: (menu: boolean) => void
  Lang: string;
  ToggleLang: () => void;
  className?: string
}

const nav = ({ShowMobileMenu, SetShowMobileMenu, className, Lang, ToggleLang}: Nav) => {

  return (
    <>
      {!ShowMobileMenu && <Menu size={64} strokeWidth={2} className="block md:hidden text-emerald-600 cursor-pointer" onClick={() => SetShowMobileMenu(!ShowMobileMenu)} />}
      {ShowMobileMenu && <X size={64} strokeWidth={2} className="block md:hidden text-emerald-600 cursor-pointer" onClick={() => SetShowMobileMenu(!ShowMobileMenu)} />}
      <Links Lang={Lang} ToggleLang={ToggleLang} className={twMerge("hidden md:flex gap-8 lg:gap-16", className)} />
    </>
  );
};

export default nav;
