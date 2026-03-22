import { PkgCardContent } from "@/data/pkgFeatureItems";
import clsx from "clsx";
import Button from "../Button";
import PkgCardBadge from "./PkgCardBadge";
import PkgCardFeatureList from "./PkgCardFeatureList";
import PkgCardHeading from "./PkgCardHeading";
import PkgCardShell from "./PkgCardShell";


type PkgCardProps = {
  pkg: PkgCardContent;
  onClick?: () => void;
};

export default function PkgCard({ pkg, onClick }: PkgCardProps) {
  const featured = pkg.featured ?? false;
  const variant = pkg.buttonVariant ?? "primary";

  return (
    <PkgCardShell featured={featured}>
      {featured ? <PkgCardBadge /> : null}
      <PkgCardHeading
        name={pkg.name}
        price={pkg.price}
        period={pkg.period}
        description={pkg.description}
      />
      <PkgCardFeatureList items={pkg.features} />
      <Button
        variant={variant === "outline" ? "outline" : "primary"}
        className={clsx("w-full")}
        href={onClick ? undefined : "#order"}
        onClick={onClick}
      >
        Заказать
      </Button>
    </PkgCardShell>
  );
}
