import PfCard from "@/components/ui/PfCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { PF_CARDS } from "@/data/pfCards";

export default function Portfolio() {
  return (
    <section className="bg-bg py-[72px] md:py-24" id="portfolio">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionTitle
            eyebrow="Примеры"
            title={
              <>
                Последние <span>работы</span>
              </>
            }
          />
        </div>
        <div className="reveal mt-9 flex flex-col gap-3.5 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-4">
          {PF_CARDS.map((card) => (
            <PfCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
