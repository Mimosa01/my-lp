"use client";

import { scrollToHashId } from "@/utils/helpers";
import Link from "next/link";

const linkClass =
  "font-mulish text-sm font-medium text-muted no-underline transition-all duration-200 hover:text-orange";

type NavItemProps = {
  children: React.ReactNode;
  href: string;
};

export default function NavItem({ children, href }: NavItemProps) {
  const isSamePageHash = href.startsWith("#") && href.length > 1;

  if (isSamePageHash) {
    return (
      <a
        href={href}
        className={linkClass}
        onClick={(e) => {
          e.preventDefault();
          scrollToHashId(href);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}
