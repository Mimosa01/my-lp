"use client";

import {
  orderFormDefaultValues,
  orderFormResolver,
} from "@/components/ui/form/validation/orderFormValidation";
import type { OrderFormInput } from "@/components/ui/form/shemas/orderShema";
import { useOrderStore } from "@/store/orderStore";
import { FormProvider, useForm } from "react-hook-form";
import OrderFormFields from "./form/OrderFormFields";
import OrderFormSuccess from "./form/OrderFormSuccess";
import { orderFormCardClass } from "./form/styles/orderFormStyles";

export default function Form() {
  const submitted = useOrderStore((s) => s.submitted);
  const pending = useOrderStore((s) => s.pending);
  const error = useOrderStore((s) => s.error);
  const submitOrder = useOrderStore((s) => s.submitOrder);
  const clearSubmitError = useOrderStore((s) => s.clearSubmitError);

  const methods = useForm<OrderFormInput>({
    resolver: orderFormResolver,
    defaultValues: orderFormDefaultValues,
    mode: "onSubmit",
  });

  if (submitted) {
    return <OrderFormSuccess />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className={orderFormCardClass}
        id="order-form"
        noValidate
        onSubmit={methods.handleSubmit(
          async (data) => {
            await submitOrder(data);
          },
          () => {
            clearSubmitError();
          },
        )}
      >
        {error ? (
          <p className="mb-4 text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
        <OrderFormFields disabled={pending} />
      </form>
    </FormProvider>
  );
}
