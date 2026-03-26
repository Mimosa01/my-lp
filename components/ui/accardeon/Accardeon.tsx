"use client";
import { useState } from "react";
import { FAQ_ITEMS } from "@/data/faqItems";
import AccordeonItem from "./AccordeonItem";

export default function Accardeon() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="reveal mt-9 overflow-hidden rounded-2xl border border-border">
      {FAQ_ITEMS.map((item, index) => (
        <AccordeonItem
          key={item.title}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
