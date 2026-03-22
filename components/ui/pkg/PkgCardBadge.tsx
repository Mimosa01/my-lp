import type { ReactNode } from "react";

type PkgCardBadgeProps = {
  children?: ReactNode;
};

export default function PkgCardBadge({ children = "Хит" }: PkgCardBadgeProps) {
  return (
    <div className="absolute top-3.5 right-3.5 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold tracking-[0.04em] text-white uppercase">
      {children}
    </div>
  );
}
