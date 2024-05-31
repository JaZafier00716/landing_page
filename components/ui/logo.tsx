import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Logo = {
  href: string;
  className?: string
};

const logo = ({ href, className }: Logo) => {
  return (
    <Link
      href={href}
      className={twMerge("w-8 h-16 relative text-white text-6xl font-extrabold", className)}
    >
      J<span className="text-emerald-600">Z</span>
    </Link>
  );
};

export default logo;
