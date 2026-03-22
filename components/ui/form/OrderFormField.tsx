import type { ReactNode } from "react";
import { orderFormLabelClass } from "./styles/orderFormStyles";

type OrderFormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
};

export default function OrderFormField({
  id,
  label,
  children,
  error,
}: OrderFormFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className={orderFormLabelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
