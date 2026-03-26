import PainCardBase from "./PainCardBase";
import { painCard1Data } from "@/data/painRows";

export default function PainCard() {
  return (
    <PainCardBase
      header={
        <>
          <p className="m-0 text-[13px] font-medium text-text">
            {painCard1Data.headerTitle}
          </p>
          <p className="mt-[2px] text-[11px] text-muted">
            {painCard1Data.headerSubtitle}
          </p>
        </>
      }
      footer={
        <p className="m-0 text-[13px] leading-[1.6] text-orange">
          {painCard1Data.footerText}{" "}
          <span className="font-medium">{painCard1Data.footerAccent}</span>
        </p>
      }
    >
      {painCard1Data.threads.map((t) => (
        <div
          key={t.name}
          className={`flex items-center gap-2.5 border-b border-border2 bg-card px-[14px] py-2.5 last:border-b-0 ${t.rowClass ?? ""}`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-medium ${t.avatarClass}`}
          >
            {t.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[13px] font-medium text-text">{t.name}</p>
            <p
              className={`mt-[2px] truncate text-xs text-muted ${t.previewClass ?? ""}`}
            >
              {t.preview}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="m-0 text-[11px] text-muted">{t.time}</p>
            {t.unread ? (
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ef44441a] text-[11px] font-medium text-[#dc2626]">
                {t.unread}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </PainCardBase>
  );
}
