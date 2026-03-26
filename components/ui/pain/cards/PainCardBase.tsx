import type { ReactNode } from "react";

type Props = {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

export default function PainCardBase({ header, children, footer }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border2 bg-surface">
      <div className="border-b border-border2 bg-card px-[14px] py-2.5">
        {header}
      </div>
      <div className="flex flex-1 flex-col bg-bg">{children}</div>
      <div className="border-t border-border2 bg-card px-[14px] py-3">
        {footer}
      </div>
    </div>
  );
}
