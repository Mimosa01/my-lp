import { orderFormCardClass } from "./styles/orderFormStyles";

export default function OrderFormSuccess() {
  return (
    <div className={orderFormCardClass}>
      <div className="px-2 py-8 text-center">
        <div className="mb-3 text-5xl">🚀</div>
        <div className="mb-2 font-syne text-[22px] font-extrabold tracking-[-0.02em]">
          Отправлено!
        </div>
        <p className="text-sm leading-relaxed text-muted">
          Отвечу в ближайшее время — обсудим проект и назову точную цену.
        </p>
      </div>
    </div>
  );
}
