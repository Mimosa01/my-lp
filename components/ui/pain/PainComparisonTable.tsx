import { PAIN_ROWS } from "@/data/painRows";
import PainComparisonHeader from "./PainComparisonHeader";
import PainComparisonRow from "./PainComparisonRow";

export default function PainComparisonTable() {
  return (
    <div className="mt-9 flex flex-col gap-0 overflow-hidden rounded-2xl border border-border">
      <PainComparisonHeader />
      {PAIN_ROWS.map((row) => (
        <PainComparisonRow key={row.bad} {...row} />
      ))}
    </div>
  );
}
