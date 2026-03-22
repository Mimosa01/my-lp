import { PKG_PACKAGES } from "@/data/pkgFeatureItems";
import SectionTitle from "@/components/ui/SectionTitle";
import PkgCard from "../ui/pkg/PkgCard";

export default function Packages() {
  return (
    <section
      className="border-y border-border bg-surface py-[72px] md:py-24"
      id="packages"
    >
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="reveal">
          <SectionTitle
            eyebrow="Что предлагаю"
            title={
              <>
                Цены и <span>условия</span>
              </>
            }
            subtitle="Цена фиксируется до начала. Никаких сюрпризов."
          />
        </div>
        <div className="reveal mt-9 flex flex-col gap-4 md:flex-row">
          {PKG_PACKAGES.map((pkg) => (
            <PkgCard pkg={pkg} key={pkg.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
