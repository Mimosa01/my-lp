import SectionTitle from "@/components/ui/SectionHeader";
import Accardeon from "@/components/ui/accardeon/Accardion";

export const FAQ = () => {
  return (
    <section id="faq" className="bg-bg py-[72px] md:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionTitle
            eyebrow="Частые вопросы"
            title={
              <>
                Отвечаю <span>честно</span>
              </>
            }
            subtitle="Если не нашли ответ — просто напишите, разберёмся."
          />
        </div>
        <Accardeon />
      </div>
    </section>
  );
};