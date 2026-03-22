import { ORDER_PACKAGE_OPTIONS } from "@/data/orderPackageOptions";
import { z } from "zod";

const NAME_MAX = 120;
const OCC_MAX = 200;
const DETAILS_MAX = 2000;

const packageTuple = ORDER_PACKAGE_OPTIONS.map((o) => o.value) as [
  (typeof ORDER_PACKAGE_OPTIONS)[number]["value"],
  ...(typeof ORDER_PACKAGE_OPTIONS)[number]["value"][],
];

function normalizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

function isValidRuPhone(raw: string): boolean {
  let d = normalizePhoneDigits(raw);
  if (d.length === 11 && d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 11 && d.startsWith("7")) return true;
  if (d.length === 10 && d.startsWith("9")) return true;
  return false;
}

/**
 * Строго @username: строка начинается с @, дальше только латиница, цифры и _
 * (ник 5–32 символа, с буквы — как в Telegram).
 */
function isValidAtLatinHandle(raw: string): boolean {
  const t = raw.trim();
  return /^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(t);
}

/** Телефон РФ или @username латиницей (без ссылок и без ника без @). */
export function isValidContact(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  return isValidRuPhone(t) || isValidAtLatinHandle(t);
}

/** Поля формы заказа до/после валидации (строки из FormData). */
export const orderFormInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Укажите, как к вам обращаться.")
    .min(2, "Имя слишком короткое.")
    .max(NAME_MAX, `Не длиннее ${NAME_MAX} символов.`),

  contact: z
    .string()
    .trim()
    .min(1, "Укажите телефон или Telegram.")
    .refine((v) => isValidContact(v), {
      message:
        "Укажите номер РФ (+7… / 8… / 9…) или @ник латиницей (без пробелов и ссылок).",
    }),

  occupation: z
    .string()
    .trim()
    .max(OCC_MAX, `Не длиннее ${OCC_MAX} символов.`),

  package: z.enum(packageTuple, {
    message: "Выберите вариант из списка.",
  }),

  details: z
    .string()
    .trim()
    .max(DETAILS_MAX, `Не длиннее ${DETAILS_MAX} символов.`),
});

export type OrderFormInput = z.infer<typeof orderFormInputSchema>;
