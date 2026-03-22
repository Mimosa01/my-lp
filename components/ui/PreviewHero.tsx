type PreviewMessage =
  | {
      kind: "in";
      client: string;
      service: string;
      phone?: string;
      time: string;
    }
  | { kind: "out"; text: string; time: string };

const PREVIEW_MESSAGES: PreviewMessage[] = [
  {
    kind: "in",
    client: "Алексей М.",
    service: "Ремонт ванной",
    phone: "+7 913 ···-··-··",
    time: "09:14",
  },
  { kind: "out", text: "Принял, перезвоню в 11 👍", time: "09:21 ✓✓" },
  {
    kind: "in",
    client: "Марина В.",
    service: "Консультация",
    time: "11:03",
  },
];

const msgBase =
  "max-w-[86%] rounded-[10px] px-3 py-[9px] text-[13px] leading-normal";

function PreviewMessageBubble({ msg }: { msg: PreviewMessage }) {
  if (msg.kind === "out") {
    return (
      <div
        className={`${msgBase} self-end rounded-br-[3px] bg-[#1a6b3a] text-[#d0f5e0]`}
      >
        {msg.text}
        <div className="mt-[3px] text-[10px] opacity-40">{msg.time}</div>
      </div>
    );
  }

  return (
    <div
      className={`${msgBase} self-start rounded-bl-[3px] bg-surface text-text`}
    >
      🔔 <strong>Новая заявка!</strong>
      <br />
      Клиент: {msg.client}
      <br />
      Услуга: {msg.service}
      {msg.phone ? (
        <>
          <br />
          Тел: {msg.phone}
        </>
      ) : null}
      <div className="mt-[3px] text-[10px] opacity-40">{msg.time}</div>
    </div>
  );
}

export default function PreviewHero() {
  return (
    <div
      className="relative mt-8 rounded-[20px] border border-border2 bg-card p-5 animate-[fu_0.7s_ease_0.4s_both] before:pointer-events-none before:absolute before:inset-x-7 before:-top-px before:z-10 before:h-0.5 before:bg-linear-to-r before:from-transparent before:via-orange before:to-transparent before:content-[''] w-full md:mx-auto md:w-[360px] md:self-center"
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
      <div className="flex flex-col gap-2">
        {PREVIEW_MESSAGES.map((msg) => (
          <PreviewMessageBubble key={`${msg.kind}-${msg.time}`} msg={msg} />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[rgba(255,92,26,0.2)] bg-orange-dim px-3 py-[10px] text-xs text-orange">
        ⚡ Сегодня уже 3 заявки с сайта
      </div>
    </div>
  );
}
