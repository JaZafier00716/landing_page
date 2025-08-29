"use client";
import Link from "./link";
import { usePathname } from "next/navigation";
import { Lang } from "@/app/types";

type Links = {
  className?: string;
  Lang: Lang;
  ToggleLang: () => void;
};

const links = ({ className, Lang, ToggleLang }: Links) => {
  return (
    <nav
    className={className}
    >
        <Link href="/" title={Lang === "cs" ? "Domů" : "Home"} path={usePathname} />
        <Link href="/skills" title={Lang === "cs" ? "Dovednosti" : "Skills"} path={usePathname} />
        <Link href="/experience" title={Lang === "cs" ? "Zkušenosti" : "Experience"} path={usePathname} />
        
    </nav>
  );
};

export default links;
