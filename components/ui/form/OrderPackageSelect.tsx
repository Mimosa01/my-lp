import { orderFormFieldClass } from "./orderFormStyles";
import { ORDER_PACKAGE_OPTIONS } from "../../../data/orderPackageOptions";

type Props = {
  disabled?: boolean;
};

export default function OrderPackageSelect({ disabled }: Props) {
  return (
    <select
      id="order-package"
      name="package"
      className={orderFormFieldClass}
      defaultValue="landing"
      disabled={disabled}
    >
      {ORDER_PACKAGE_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
