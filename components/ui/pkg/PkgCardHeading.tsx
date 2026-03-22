type PkgCardHeadingProps = {
  name: string;
  price: string;
  period: string;
  description: string;
};

export default function PkgCardHeading({
  name,
  price,
  period,
  description,
}: PkgCardHeadingProps) {
  return (
    <>
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="font-syne text-xl font-extrabold tracking-[-0.02em]">
          {name}
        </div>
        <div className="shrink-0 text-right">
          <div className="font-syne text-[22px] font-extrabold tracking-[-0.03em] text-orange leading-none">
            {price}
          </div>
          <div className="mt-0.5 text-[11px] text-muted">{period}</div>
        </div>
      </div>
      <div className="mb-4 text-[13px] leading-[1.6] text-muted">{description}</div>
    </>
  );
}
