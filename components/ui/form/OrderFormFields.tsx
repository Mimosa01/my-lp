import OrderFormField from "./OrderFormField";
import OrderPackageSelect from "./OrderPackageSelect";
import {
  orderFormFieldClass,
} from "./orderFormStyles";
import Button from "../Button";

type Props = {
  disabled?: boolean;
};

export default function OrderFormFields({ disabled }: Props) {
  return (
    <>
      <OrderFormField id="order-name" label="Ваше имя">
        <input
          id="order-name"
          name="name"
          type="text"
          className={orderFormFieldClass}
          placeholder="Как к вам обращаться"
          autoComplete="name"
          required
          disabled={disabled}
        />
      </OrderFormField>
      <OrderFormField id="order-contact" label="Telegram или телефон">
        <input
          id="order-contact"
          name="contact"
          type="text"
          className={orderFormFieldClass}
          placeholder="@username или +7..."
          autoComplete="tel"
          required
          disabled={disabled}
        />
      </OrderFormField>
      <OrderFormField id="order-occupation" label="Чем занимаетесь">
        <input
          id="order-occupation"
          name="occupation"
          type="text"
          className={orderFormFieldClass}
          placeholder="Мастер, репетитор, парикмахер..."
          disabled={disabled}
        />
      </OrderFormField>
      <OrderFormField id="order-package" label="Что нужно">
        <OrderPackageSelect disabled={disabled} />
      </OrderFormField>
      <OrderFormField id="order-details" label="Дополнительно">
        <textarea
          id="order-details"
          name="details"
          className={`${orderFormFieldClass} h-[90px] resize-none`}
          placeholder="Срочность, пожелания, примеры которые нравятся..."
          rows={4}
          disabled={disabled}
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
