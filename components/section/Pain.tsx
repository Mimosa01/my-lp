import SectionHeader from "@/components/ui/SectionHeader";
import PainComparison from "../ui/pain/PainComparison";

export default function Pain() {
  return (
    <section
      className="bg-surface py-[72px] md:py-24"
      id="pain"
    >
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionHeader
            eyebrow="Зачем сайт"
            title={
              <>
                Узнаёте <span>себя?</span>
              </>
            }
            subtitle="Обычный вторник самозанятого — и как он выглядит."
          />
        </div>
        <div className="reveal">
          <PainComparison />
        </div>
      </div>
    </section>
  );
}
