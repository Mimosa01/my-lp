import Button from "@/components/ui/Button";

export default function CardCTA() {
  return (
    <div className="h-full rounded-2xl bg-orange p-4 text-white">
      <p className="m-0 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/85">
        Без сайта вы теряете заявки
      </p>
      <p className="mt-2 mb-0 text-2xl font-extrabold leading-tight">
        Ваш сайт продает и принимает заявки, пока вы заняты делом.
      </p>
      <p className="mt-2 mb-0 text-[13px] leading-normal text-white/95">
        Клиент не ждет ответа в директе: сразу видит цены, примеры работ и
        оставляет заявку в 2 клика.
      </p>
      <Button
        href="#order"
        size="sm"
        variant="custom"
        className="mt-3 w-full bg-white text-orange hover:opacity-90"
      >
        Хочу так же
      </Button>
    </div>
  );
}