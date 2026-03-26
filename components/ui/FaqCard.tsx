import type { ChatMessage } from "@/data/faqItems";

type Props = {
  message: ChatMessage;
};

export default function FaqCard({ message }: Props) {
  return (
    <div
      className={
        message.side === "client"
          ? "max-w-[78%] self-start rounded-[14px] rounded-bl-[4px] border border-border bg-card px-[14px] py-2.5 text-[13px] leading-[1.6] font-normal text-muted sm:max-w-[68%] sm:text-sm"
          : "max-w-[78%] self-end rounded-[14px] rounded-br-[4px] bg-orange px-[14px] py-2.5 text-[13px] leading-[1.6] font-normal text-white sm:max-w-[68%] sm:text-sm"
      }
    >
      {message.text}
    </div>
  );
}
