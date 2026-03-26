import PainCardBase from "./PainCardBase";
import { painCard4Data } from "@/data/painRows";

export default function PainCard_4() {
  return (
    <PainCardBase
      header={
        <>
          <p className="m-0 text-[13px] font-medium text-text">
            {painCard4Data.headerTitle}
          </p>
          <p className="mt-[2px] text-[11px] text-muted">
            {painCard4Data.headerSubtitle}
          </p>
        </>
      }
      footer={
        <p className="m-0 text-[13px] leading-[1.6] text-orange">
          {painCard4Data.footerText}{" "}
          <span className="font-medium">{painCard4Data.footerAccent}</span>
        </p>
      }
    >
      <div className="flex flex-col gap-2 p-[14px]">
        <div className="rounded-[10px] border border-border2 bg-card px-3 py-2.5">
          <div className="flex flex-col gap-1.5">
            {painCard4Data.notes.map((n) => (
              <div key={n.name} className="flex items-center justify-between">
                <p
                  className={`m-0 text-[13px] ${n.faded ? "text-muted" : "text-text"}`}
                >
                  {n.name}
                </p>
                <p
                  className={`m-0 text-[11px] ${n.faded ? "text-muted" : "text-[#dc2626]"}`}
                >
                  {n.lastContact}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[90%] rounded-[10px] rounded-tr-none bg-[#60a5fa33] px-2.5 py-[7px]">
            <p className="m-0 text-xs leading-normal text-[#205a94]">
              {painCard4Data.outgoingText}
            </p>
            <p className="mt-[3px] mb-0 text-right text-[10px] text-[#205a94]/70">
              {painCard4Data.outgoingTime}
            </p>
          </div>
        </div>

        <div className="py-0.5 text-center">
          <p className="m-0 text-[11px] italic text-muted">
            {painCard4Data.trailingNote}
          </p>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-[10px] rounded-tl-none border border-border2 bg-card px-2.5 py-[7px]">
            <p className="m-0 text-xs leading-normal text-muted">
              {painCard4Data.incomingText}
            </p>
            <p className="mt-[3px] mb-0 text-right text-[10px] text-muted">
              {painCard4Data.incomingTime}
            </p>
          </div>
        </div>
      </div>
    </PainCardBase>
  );
}
