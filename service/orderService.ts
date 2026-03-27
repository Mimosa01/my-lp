import type { OrderFormInput } from "@/components/ui/form/shemas/orderShema";
import { ORDER_PACKAGE_OPTIONS } from "@/data/orderPackageOptions";
import { supabase } from "@/lib/supabase";
import type { Lead, LeadInsert } from "@/lib/types/orders";

export type { OrderFormInput };

export type SubmitLeadResult =
  | { ok: true; lead: Lead }
  | { ok: false; message: string };

function trimOrNull(value: string | null | undefined): string | null {
  if (value == null) return null;
  const t = value.trim();
  return t === "" ? null : t;
}

function normalizeInsert(payload: LeadInsert): LeadInsert {
  return {
    name: payload.name.trim(),
    contact: payload.contact.trim(),
    occupation: trimOrNull(payload.occupation ?? undefined),
    service: trimOrNull(payload.service ?? undefined),
    message: trimOrNull(payload.message ?? undefined),
  };
}

/** Из значений формы (после Zod / react-hook-form) в `LeadInsert`. */
export function leadInsertFromOrderFormInput(input: OrderFormInput): LeadInsert {
  const option = ORDER_PACKAGE_OPTIONS.find((o) => o.value === input.package);
  return {
    name: input.name,
    contact: input.contact,
    occupation: input.occupation,
    service: option?.label ?? input.package,
    message: input.details,
  };
}

/** Собирает поля формы заказа (`name`, `contact`, `occupation`, `package`, `details`) в `LeadInsert`. */
export function leadInsertFromFormData(formData: FormData): LeadInsert {
  const pkg = String(formData.get("package") ?? "");
  const option = ORDER_PACKAGE_OPTIONS.find((o) => o.value === pkg);

  return {
    name: String(formData.get("name") ?? ""),
    contact: String(formData.get("contact") ?? ""),
    occupation: String(formData.get("occupation") ?? ""),
    service: option?.label ?? (pkg ? pkg : null),
    message: String(formData.get("details") ?? ""),
  };
}

export async function submitLead(
  payload: LeadInsert,
): Promise<SubmitLeadResult> {
  const row = normalizeInsert(payload);

  if (!row.name || !row.contact) {
    return { ok: false, message: "Укажите имя и способ связи." };
  }

  const { error } = await supabase
    .from("leads")
    .insert(row);

  if (error) {
    return { ok: false, message: error.message };
  }

  try {
    await fetch("/api/push/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead: {
          name: row.name,
          contact: row.contact,
          service: row.service ?? null,
        },
      }),
    });
  } catch {
    // Не блокируем UX формы из-за ошибок push.
  }

  return {
    ok: true,
    lead: {
      id: 0,
      name: row.name,
      contact: row.contact,
      occupation: row.occupation ?? null,
      service: row.service ?? null,
      message: row.message ?? null,
      created_at: new Date().toISOString(),
    } as Lead,
  };
}
