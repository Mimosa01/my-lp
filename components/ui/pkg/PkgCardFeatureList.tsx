import PkgCardFeatureItem from "./PkgCardFeatureItem";
import type { PkgFeatureLine } from "../../../data/pkgFeatureItems";

type PkgCardFeatureListProps = {
  items: readonly PkgFeatureLine[];
};

export default function PkgCardFeatureList({ items }: PkgCardFeatureListProps) {
  return (
    <ul className="mb-5 flex list-none flex-col gap-0">
      {items.map((item) => (
        <PkgCardFeatureItem key={item.text} emphasized={item.emphasized}>
          {item.text}
        </PkgCardFeatureItem>
      ))}
    </ul>
  );
}
