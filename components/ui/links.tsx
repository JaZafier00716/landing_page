"use client";
import Link from "./link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Links = {
  className?: string;
};

const links = ({ className }: Links) => {
  return (
    <nav
    className={className}
    >
        <Link href="/" title="Domů" path={usePathname} />
        <Link href="/skills" title="Dovednosti" path={usePathname} />
        <Link href="/experience" title="Zkušenosti" path={usePathname} />
        {/* <Link href="/contact" title="Kontakt" path={usePathname} /> */}
    </nav>
  );
};

export default links;
