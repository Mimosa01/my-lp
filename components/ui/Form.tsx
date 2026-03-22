"use client";

import { useOrderStore } from "@/store/orderStore";
import { type FormEvent } from "react";
import OrderFormFields from "./form/OrderFormFields";
import OrderFormSuccess from "./form/OrderFormSuccess";
import { orderFormCardClass } from "./form/orderFormStyles";

export default function Form() {
  const submitted = useOrderStore((s) => s.submitted);
  const pending = useOrderStore((s) => s.pending);
  const error = useOrderStore((s) => s.error);
  const submitFromFormData = useOrderStore((s) => s.submitFromFormData);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void submitFromFormData(new FormData(e.currentTarget));
  }

  if (submitted) {
    return <OrderFormSuccess />;
  }

  return (
    <form
      className={orderFormCardClass}
      id="order-form"
      onSubmit={handleSubmit}
    >
      {error ? (
        <p className="mb-4 text-center text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : null}
      <OrderFormFields disabled={pending} />
    </form>
  );
}
