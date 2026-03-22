"use client";

import clsx from "clsx";
import type { OrderFormInput } from "@/components/ui/form/shemas/orderShema";
import { useOrderStore } from "@/store/orderStore";
import { useFormContext } from "react-hook-form";
import OrderFormField from "./OrderFormField";
import OrderPackageSelect from "./OrderPackageSelect";
import { orderFormFieldClass } from "./styles/orderFormStyles";
import Button from "../Button";

type Props = {
  disabled?: boolean;
};

function fieldClass(error?: string) {
  return clsx(
    orderFormFieldClass,
    error && "border-red-500 focus:border-red-500",
  );
}

export default function OrderFormFields({ disabled }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormInput>();
  const clearSubmitError = useOrderStore((s) => s.clearSubmitError);

  function registerClearingServerError<T extends keyof OrderFormInput>(name: T) {
    const r = register(name);
    return {
      ...r,
      onChange: (e: Parameters<typeof r.onChange>[0]) => {
        clearSubmitError();
        void r.onChange(e);
      },
    };
  }

  return (
    <>
      <OrderFormField id="order-name" label="Ваше имя" error={errors.name?.message}>
        <input
          id="order-name"
          type="text"
          className={fieldClass(errors.name?.message)}
          placeholder="Как к вам обращаться"
          autoComplete="name"
          disabled={disabled}
          aria-invalid={errors.name ? true : undefined}
          {...registerClearingServerError("name")}
        />
      </OrderFormField>
      <OrderFormField
        id="order-contact"
        label="Telegram или телефон"
        error={errors.contact?.message}
      >
        <input
          id="order-contact"
          type="text"
          inputMode="tel"
          className={fieldClass(errors.contact?.message)}
          placeholder="@username или +7…"
          autoComplete="tel"
          disabled={disabled}
          aria-invalid={errors.contact ? true : undefined}
          {...registerClearingServerError("contact")}
        />
      </OrderFormField>
      <OrderFormField
        id="order-occupation"
        label="Чем занимаетесь"
        error={errors.occupation?.message}
      >
        <input
          id="order-occupation"
          type="text"
          className={fieldClass(errors.occupation?.message)}
          placeholder="Мастер, репетитор, парикмахер..."
          disabled={disabled}
          aria-invalid={errors.occupation ? true : undefined}
          {...registerClearingServerError("occupation")}
        />
      </OrderFormField>
      <OrderFormField
        id="order-package"
        label="Что нужно"
        error={errors.package?.message}
      >
        <OrderPackageSelect
          disabled={disabled}
          invalid={Boolean(errors.package)}
          {...registerClearingServerError("package")}
        />
      </OrderFormField>
      <OrderFormField
        id="order-details"
        label="Дополнительно"
        error={errors.details?.message}
      >
        <textarea
          id="order-details"
          className={clsx(fieldClass(errors.details?.message), "h-[90px] resize-none")}
          placeholder="Срочность, пожелания, примеры которые нравятся..."
          rows={4}
          disabled={disabled}
          aria-invalid={errors.details ? true : undefined}
          {...registerClearingServerError("details")}
        />
      </OrderFormField>
      <Button
        type="submit"
        variant="primary"
        className={"mx-auto block"}
        disabled={disabled}
      >
        {disabled ? "Отправка…" : "Отправить заявку"}
      </Button>
      <p className="mt-2.5 text-center text-xs leading-normal text-muted2">
        Отвечу быстро · Работаю по всей России
      </p>
    </>
  );
}
