import { PainComparisonRowData } from "@/data/painRows";


export default function PainComparisonRow({
  badIcon,
  bad,
  good,
}: PainComparisonRowData) {
  return (
    <div className="grid grid-cols-2 border-b border-border last:border-b-0">
      <div className="flex items-start gap-2.5 border-r border-border bg-[#fef5f3] px-[18px] py-4 text-[13px] leading-[1.6] text-muted">
        <span className="mt-px shrink-0 text-sm">{badIcon}</span>
        {bad}
      </div>
      <div className="flex items-start gap-2.5 bg-[#f3fef5] px-[18px] py-4 text-[13px] leading-[1.6] text-text">
        <span className="mt-px shrink-0 text-sm">✓</span>
        {good}
      </div>
    </div>
  );
}
