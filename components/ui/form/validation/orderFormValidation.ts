import {
  orderFormInputSchema,
  type OrderFormInput,
} from "@/components/ui/form/shemas/orderShema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues, Resolver } from "react-hook-form";

export type OrderFormValues = OrderFormInput;

export type OrderFormFieldName = keyof OrderFormInput;

export const orderFormDefaultValues: DefaultValues<OrderFormInput> = {
  name: "",
  contact: "",
  occupation: "",
  package: "landing",
  details: "",
};

export const orderFormResolver: Resolver<OrderFormInput> = zodResolver(
  orderFormInputSchema,
);

export { isValidContact, orderFormInputSchema } from "../shemas/orderShema";
