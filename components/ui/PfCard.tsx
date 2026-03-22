import type { PfCardData } from "@/data/pfCards";
import Image from "next/image";
import Link from "next/link";

type Props = {
  card: PfCardData;
};

export default function PfCard({ card }: Props) {
  const external = /^https?:\/\//i.test(card.href);

  return (
    <Link
      href={card.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-[14px] border border-border bg-card transition-all duration-300 hover:border-orange"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-[18px]">
        <div className="mb-1.5 text-[10px] font-bold tracking-widest text-orange uppercase">
          {card.tag}
        </div>
        <div className="mb-3 font-syne text-base font-bold tracking-[-0.01em]">
          {card.title}
        </div>
        <div className="mb-3.5 flex flex-col gap-2">
          <div className="flex items-start gap-2 text-xs leading-[1.55] text-muted before:mt-px before:shrink-0 before:content-['❌'] before:text-[11px]">
            {card.problem}
          </div>
          <div className="flex items-start gap-2 text-xs leading-[1.55] text-text before:mt-px before:shrink-0 before:font-bold before:text-orange before:content-['✓']">
            {card.solution}
          </div>
        </div>
        <span className="mt-auto flex w-fit items-center gap-1.5 rounded-full border border-orange px-2.5 py-1 text-[11px] text-orange">
          {card.feature}
        </span>
      </div>
    </Link>
  );
}
