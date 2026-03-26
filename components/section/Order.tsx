import type { ReactNode } from "react";
import Form from "@/components/ui/Form";
import SectionHeader from "@/components/ui/SectionHeader";
import { TRUST_ROWS } from "@/data/trustRows";
import Section from "../ui/Section";

function TrustIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="text-muted"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export default function Order() {
  return (
    <section
      className="border-y border-border bg-surface py-[72px] md:py-24"
      id="order"
    >
      <Section>
        <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            <div className="reveal min-w-0 md:flex-1">
              <SectionHeader
                eyebrow="Заказать"
                title={
                  <>
                    Расскажите
                    <br />
                    <span>о своём деле</span>
                  </>
                }
                subtitle="Напишите коротко кто вы и что нужно — отвечу с точной ценой и сроком."
              />
              <div className="mt-10 flex flex-col gap-0 border-t border-border">
                {TRUST_ROWS.map(({ icon, title, body }, index) => (
                  <div
                    key={title}
                    className={`flex items-start gap-4 py-5 ${index < TRUST_ROWS.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-border">
                      <TrustIcon>{icon}</TrustIcon>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest text-muted uppercase">
                        {title}
                      </p>
                      <p className="mt-1 text-sm font-light leading-relaxed text-muted">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal min-w-0 md:flex-1">
              <Form />
            </div>
          </div>
      </Section>
    </section>
  );
}
