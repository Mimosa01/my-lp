import SectionHeader from "@/components/ui/SectionHeader";
import { HOW_STEPS } from "@/data/howSteps";

export default function How() {
  return (
    <section className="bg-bg py-[72px] md:py-24" id="how">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionHeader
            eyebrow="Как это работает"
            title={
              <>
                Сайт + телефон = <span>заявки</span>
              </>
            }
            subtitle="Клиент нашёл вас — оставил заявку — она у вас на сайте. Без пропущенных."
          />
        </div>

        <div className="reveal relative mt-9 flex flex-col gap-0 before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-[18px] before:z-0 before:w-px before:bg-[linear-gradient(180deg,transparent_0%,var(--border2)_10%,var(--border2)_90%,transparent_100%)] md:grid md:grid-cols-2 md:before:hidden">
          {HOW_STEPS.map(({ n, title, body, tag }) => (
            <div
              key={n}
              className="group relative flex gap-5 py-5 md:-mt-px md:-ml-px md:border md:border-border md:px-7 md:py-8"
            >
              <div className="z-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border2 bg-bg text-sm font-unbounded font-semibold transition-all duration-300 group-hover:border-orange group-hover:text-orange">
                {n}
              </div>
              <div>
                <h3 className="mb-[5px] pt-1.5 font-syne text-base font-bold tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-muted">{body}</p>
                <span className="mt-2 inline-block rounded-full border border-orange text-orange px-2.5 py-0.5 text-[11px]">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
