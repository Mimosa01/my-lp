import clsx from "clsx";
import type { ReactNode } from "react";

type PkgCardShellProps = {
  featured: boolean;
  children: ReactNode;
};

export default function PkgCardShell({ featured, children }: PkgCardShellProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-card px-5 py-6 transition-[border-color] duration-300",
        featured
          ? "border border-orange before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-orange before:content-[''] hover:border-orange"
          : "border border-border hover:border-border2",
      )}
    >
      {children}
    </div>
  );
}
