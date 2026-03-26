import clsx from "clsx";
import LinkButton from "../ui/Button";
import PreviewHero from "../ui/PreviewHero";

const PROOF_ITEMS = [
  { num: "7", label: "дней срок" },
  { num: "10к", label: "от 10 000 ₽" },
  { num: "0", label: "лишних настроек" },
] as const;

/** Блок секции: сетка, отступы, высота */
const heroLayoutClass =
  "relative mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-30 md:flex-row md:gap-64 md:pt-0";

/** Декоративный radial сзади — мобилка / десктоп */
const heroGlowClass =
  "before:pointer-events-none before:absolute before:top-[-100px] before:right-[-100px] before:h-[400px] before:w-[400px] before:bg-radial-gradient-circle before:bg-orange-05 before:content-[''] md:before:top-[-200px] md:before:right-[-200px] md:before:h-[700px] md:before:w-[700px]";

export default function Hero() {
  return (
    <section className={clsx(heroLayoutClass, heroGlowClass)}>
      <div className="reveal md:flex-1 md:max-w-[560px] md:px-0">
        <h1 className="mb-4 font-unbounded text-4xl font-black tracking-[-0.04em] leading-tight text-text">
          <span className="text-orange">Инстаграм</span> — это не бизнес
        </h1>
        <p className="mb-8 max-w-[480px] text-base font-medium leading-relaxed text-muted">
          Сделаю сайт где клиент сам записывается, сам считает цену и сразу платит. А ты просто приходишь и работаешь.
        </p>
        <div className="animation:fu .6s ease .24s both mb-8 flex gap-0 overflow-hidden rounded-lg border border-border">
          {PROOF_ITEMS.map(({ num, label }) => (
            <div key={label} className="flex-1 border-r border-border p-4 text-center last:border-r-0">
              <div className="font-unbounded text-2xl font-extrabold tracking-[-0.03em] leading-none text-orange">{num}</div>
              <div className="mt-2 font-unbounded text-[0.75rem] font-medium leading-none text-muted">{label}</div>
            </div>
          ))}
        </div>
        <div className="animation:fu .6s ease .32s both flex w-full flex-col gap-2 md:flex-row">
          <LinkButton
            size="lg"
            variant="primary"
            href="#order"
            className="w-full md:flex-1"
          >
            Хочу такой сайт
          </LinkButton>
          <LinkButton
            size="lg"
            variant="outline"
            href="#portfolio"
            className="w-full md:flex-1"
          >
            Примеры работ
          </LinkButton>
        </div>
      </div>
      <div className="reveal w-full md:w-auto">
        <PreviewHero />
      </div>
    </section>
  );
}
