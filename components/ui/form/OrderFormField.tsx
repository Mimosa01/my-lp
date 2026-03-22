import type { ReactNode } from "react";
import { orderFormLabelClass } from "./orderFormStyles";

type OrderFormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export default function OrderFormField({
  id,
  label,
  children,
}: OrderFormFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className={orderFormLabelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
