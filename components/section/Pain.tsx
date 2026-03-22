import SectionTitle from "@/components/ui/SectionTitle";
import PainComparisonTable from "../ui/pain/PainComparisonTable";

export default function Pain() {
  return (
    <section
      className="border-y border-border bg-surface py-[72px] md:py-24"
      id="pain"
    >
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionTitle
            eyebrow="Зачем сайт"
            title={
              <>
                Узнаёте <span>себя?</span>
              </>
            }
            subtitle="Типичные проблемы без сайта — и как они решаются."
          />
        </div>
        <div className="reveal">
          <PainComparisonTable />
        </div>
      </div>
    </section>
  );
}
