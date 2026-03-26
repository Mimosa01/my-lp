import PainCard_1 from "./cards/PainCard_1";
import PainCard_2 from "./cards/PainCard_2";
import PainCard_3 from "./cards/PainCard_3";
import PainCard_4 from "./cards/PainCard_4";
import CardCTA from "./cards/CardCTA";

export default function PainComparisonTable() {
  return (
    <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-6">
      <div className="md:col-start-1 md:row-start-1 md:row-span-2">
        <PainCard_1 />
      </div>
      <div className="md:col-start-2 md:row-start-1 md:row-span-3">
        <PainCard_2 />
      </div>
      <div className="md:col-start-1 md:row-start-3 md:row-span-3">
        <PainCard_3 />
      </div>
      <div className="md:col-start-2 md:row-start-4 md:row-span-3">
        <PainCard_4 />
      </div>
      <div className="md:col-start-1 md:row-start-6 md:row-span-1">
        <CardCTA />
      </div>
    </div>
  );
}
