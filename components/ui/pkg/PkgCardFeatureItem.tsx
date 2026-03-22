import clsx from "clsx";
import type { ReactNode } from "react";

const rowClass =
  "flex items-start gap-2 border-b border-border py-2 text-[13px] before:shrink-0 before:content-['→'] before:text-orange last:border-b-0";

type PkgCardFeatureItemProps = {
  emphasized?: boolean;
  children: ReactNode;
};

export default function PkgCardFeatureItem({
  emphasized,
  children,
}: PkgCardFeatureItemProps) {
  return (
    <li className={clsx(rowClass, emphasized ? "text-text" : "text-muted")}>
      {children}
    </li>
  );
}
