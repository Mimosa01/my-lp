"use client";

import { scrollToHashId } from "@/utils/helpers";
import clsx from "clsx";
import Link from "next/link";

const baseClass =
  "flex items-center justify-center rounded-full font-mulish text-sm font-bold whitespace-nowrap transition-all duration-200";

const variantClass = {
  primary:
    "bg-orange text-white hover:opacity-80 focus-visible:bg-orange-hover active:scale-95",
  outline:
    "border border-orange bg-transparent text-orange hover:bg-orange/12 hover:border-orange focus-visible:border-orange-glow active:scale-95",
} as const;

const sizeClass = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-sm",
} as const;

type LinkButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variantClass;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: LinkButtonProps) {
  const mergedClass = clsx(
    baseClass,
    variantClass[variant],
    sizeClass[size],
    className,
  );

  const isSamePageHash = href != null && href.startsWith("#") && href.length > 1;

  if (href && isSamePageHash) {
    return (
      <a
        href={href}
        className={mergedClass}
        onClick={(e) => {
          e.preventDefault();
          scrollToHashId(href);
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={mergedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={mergedClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
