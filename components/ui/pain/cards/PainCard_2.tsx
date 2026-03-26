import PainCardBase from "./PainCardBase";
import { painCard2Data, type PainBubble } from "@/data/painRows";

function Bubble({ side, text, time, muted }: PainBubble) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isRight
            ? "max-w-[85%] rounded-[10px] rounded-tr-none bg-[#60a5fa33] px-2.5 py-[7px]"
            : `rounded-[10px] rounded-tl-none border border-border2 bg-card px-2.5 py-[7px] ${muted ? "max-w-[60%]" : "max-w-[80%]"}`
        }
      >
        <p
          className={`m-0 text-xs leading-normal ${isRight ? "text-[#205a94]" : muted ? "text-muted" : "text-text"}`}
        >
          {text}
        </p>
        <p
          className={`mt-[3px] mb-0 text-right text-[10px] ${isRight ? "text-[#205a94]/70" : "text-muted"}`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

export default function PainCard_2() {
  return (
    <PainCardBase
      header={
        <div className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#60a5fa33] text-xs font-medium text-[#205a94]">
            {painCard2Data.headerAvatar}
          </div>
          <div>
            <p className="m-0 text-[13px] font-medium text-text">
              {painCard2Data.headerTitle}
            </p>
            <p className="m-0 text-[11px] text-muted">
              {painCard2Data.headerSubtitle}
            </p>
          </div>
        </div>
      }
      footer={
        <p className="m-0 text-[13px] leading-[1.6] text-orange">
          {painCard2Data.footerText}{" "}
          <span className="font-medium">{painCard2Data.footerAccent}</span>
        </p>
      }
    >
      <div className="flex flex-col gap-2 p-[14px]">
        {painCard2Data.chat.map((msg, i) => (
          <Bubble key={`${msg.time}-${i}`} {...msg} />
        ))}
        <div className="py-1 text-center">
          <p className="m-0 text-[11px] italic text-muted">
            {painCard2Data.trailingNote}
          </p>
        </div>
      </div>
    </PainCardBase>
  );
}
