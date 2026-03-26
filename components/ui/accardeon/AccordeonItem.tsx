"use client";

import type { FaqItem } from "@/data/faqItems";
import FaqCard from "@/components/ui/FaqCard";

type Props = {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordeonItem({
  item,
  index,
  isOpen,
  onToggle,
}: Props) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        id={buttonId}
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-6 py-5 text-left font-syne text-base font-bold tracking-[-0.02em] text-text transition-colors duration-200 hover:bg-surface sm:text-[17px]"
      >
        <span>{item.title}</span>
        <svg
          className={`shrink-0 text-muted transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-2 border-t border-border bg-surface px-6 pt-4 pb-6">
          {item.messages.map((message, messageIndex) => (
            <FaqCard key={`${item.title}-${messageIndex}`} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
