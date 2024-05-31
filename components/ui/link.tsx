import Link from "next/link";
import { Button } from "./button";

type LinkType = {
  href: string;
  title: string;
  path: () => string;
};

const link = ({ href, title, path }: LinkType) => {
  return (
    <Link
      href={href}
      className={`rounded-xl text-2xl transition-colors duration-300 ${
        path() === href
          ? "font-extrabold text-emerald-400 hover:text-emerald-600 "
          : "text-white hover:text-emerald-400"
      }`}
    >
      {title}
    </Link>
  );
};

export default link;
