import PainCardBase from "./PainCardBase";
import { painCard3Data, type PainBubble } from "@/data/painRows";

function Bubble({ side, text, time, muted }: PainBubble) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isRight
            ? "max-w-[85%] rounded-[10px] rounded-tr-none bg-[#60a5fa33] px-2.5 py-[7px]"
            : `rounded-[10px] rounded-tl-none border border-border2 bg-card px-2.5 py-[7px] ${muted ? "max-w-[75%]" : "max-w-[85%]"}`
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

export default function PainCard_3() {
  return (
    <PainCardBase
      header={
        <div className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#60a5fa33] text-xs font-medium text-[#205a94]">
            {painCard3Data.headerAvatar}
          </div>
          <div>
            <p className="m-0 text-[13px] font-medium text-text">
              {painCard3Data.headerTitle}
            </p>
            <p className="m-0 text-[11px] text-muted">
              {painCard3Data.headerSubtitle}
            </p>
          </div>
        </div>
      }
      footer={
        <p className="m-0 text-[13px] leading-[1.6] text-orange">
          {painCard3Data.footerText}{" "}
          <span className="font-medium">{painCard3Data.footerAccent}</span>
        </p>
      }
    >
      <div className="flex flex-col gap-2 p-[14px]">
        <Bubble {...painCard3Data.chat[0]} />

        <div className="my-1 rounded-[10px] border border-border2 bg-card p-[10px]">
          <p className="m-0 mb-1.5 text-[11px] text-muted">
            {painCard3Data.galleryTitle}
          </p>
          <div className="grid grid-cols-4 gap-[3px]">
            {painCard3Data.galleryCellOpacities.map((opacity, index) => (
              <div
                key={`gallery-cell-${index}`}
                className="aspect-square rounded-[3px] bg-border2"
                style={{ opacity }}
              />
            ))}
          </div>
          <p className="mt-1.5 mb-0 text-center text-[11px] text-muted">
            {painCard3Data.galleryCaption}
          </p>
        </div>

        <Bubble {...painCard3Data.chat[1]} />
        <Bubble {...painCard3Data.chat[2]} />
      </div>
    </PainCardBase>
  );
}
