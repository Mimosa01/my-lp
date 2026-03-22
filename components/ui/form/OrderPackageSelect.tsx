import clsx from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { orderFormFieldClass } from "./styles/orderFormStyles";
import { ORDER_PACKAGE_OPTIONS } from "../../../data/orderPackageOptions";

type Props = Omit<ComponentPropsWithoutRef<"select">, "children"> & {
  invalid?: boolean;
};

const OrderPackageSelect = forwardRef<HTMLSelectElement, Props>(
  function OrderPackageSelect({ className, invalid, disabled, ...rest }, ref) {
    return (
      <select
        ref={ref}
        id="order-package"
        className={clsx(
          orderFormFieldClass,
          invalid && "border-red-500 focus:border-red-500",
          className,
        )}
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        {...rest}
      >
        {ORDER_PACKAGE_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  },
);

export default OrderPackageSelect;
