export default function PreviewHero() {
  return (
    <div
      className="relative mt-8 w-full rounded-[20px] border border-border2 bg-surface p-5 animate-[fu_0.7s_ease_0.4s_both] before:pointer-events-none before:absolute before:inset-x-7 before:-top-px before:z-10 before:h-0.5 before:bg-linear-to-r before:from-transparent before:via-orange before:to-transparent before:content-[''] md:mx-auto md:w-[360px] md:self-center"
    >
      <div className="mb-[14px] flex items-center gap-[10px] border-b border-border pb-[14px]">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange to-[#ff8040] text-sm">
          ⚡
        </div>
        <div>
          <div className="text-[13px] font-semibold">Мой сайт — заявки</div>
          <div className="text-[11px] text-[#22c55e]">● онлайн</div>
        </div>
      </div>
      <div className="rounded-[16px] border border-border2 bg-card p-4">
        <p className="mb-2 text-[11px] text-muted">Новая заявка</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="m-0 text-[14px] font-medium text-text">
              Анна К. — маникюр
            </p>
            <p className="mt-[2px] text-[12px] text-muted">завтра, 14:00</p>
          </div>
          <div className="rounded-md bg-[#22c55e1a] px-2 py-[3px] text-[11px] font-medium text-[#22c55e]">
            новая
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-[16px] border border-border2 bg-card p-4">
        <p className="mb-2 text-[11px] text-muted">Расписание на неделю</p>

        <div className="grid grid-cols-7 gap-1">
          {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
            <div
              key={d}
              className="py-1 text-center text-[10px] text-muted"
            >
              {d}
            </div>
          ))}

          {/* Нижняя сетка (7 слотов) */}
          <div className="h-6 rounded-[4px] bg-[#60a5fa33]" />
          <div className="h-6 rounded-[4px] bg-[#60a5fa33]" />
          <div className="h-6 rounded-[4px] bg-surface" />
          <div className="h-6 rounded-[4px] bg-[#60a5fa33]" />
          <div className="h-6 rounded-[4px] bg-[#60a5fa33]" />
          <div className="h-6 rounded-[4px] bg-surface" />
          <div className="h-6 rounded-[4px] bg-surface" />
        </div>
      </div>

      <div className="mt-3 rounded-[16px] border border-border2 bg-card p-4">
        <p className="m-0 text-[11px] text-muted">Выручка этой недели</p>
        <p className="m-0 text-[22px] font-medium text-text">14 500 ₽</p>
        <p className="mt-1 text-[11px] text-[#16a34a]">+23% к прошлой неделе</p>
      </div>
    </div>
  );
}
