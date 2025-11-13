"use client";
import LinkComponent from "./LinkComponent";
import { usePathname } from "next/navigation";

type Links = {
  className?: string;
  Lang: string;
  ToggleLang: () => void;
};

const Links = ({ className, Lang, ToggleLang }: Links) => {
  const pathname = usePathname();

  return (
    <nav
    className={className}
    >
        <LinkComponent href="/" title={Lang === "cs" ? "Domů" : "Home"} path={() => pathname} />
        <LinkComponent href="/skills" title={Lang === "cs" ? "Dovednosti" : "Skills"} path={() => pathname} />
        <LinkComponent href="/experience" title={Lang === "cs" ? "Zkušenosti" : "Experience"} path={() => pathname} />        
    </nav>
  );
};

export default Links;
