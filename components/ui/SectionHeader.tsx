import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="transition-all duration-600 ease-in-out">
      <p className="mb-2.5 text-[10px] font-bold tracking-[0.18em] text-orange uppercase">
        {eyebrow}
      </p>
      <h2 className="mb-3 font-syne text-[clamp(26px,7vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.08] [&_span]:text-orange">
        {title}
      </h2>
      {subtitle ? (
        <p className="mb-0 text-sm font-light leading-[1.7] text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
