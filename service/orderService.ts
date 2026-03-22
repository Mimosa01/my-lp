import { ORDER_PACKAGE_OPTIONS } from "@/data/orderPackageOptions";
import { supabase } from "@/lib/supabase";
import type { Lead, LeadInsert } from "@/types/orders";

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

  const { data, error } = await supabase
    .from("leads")
    .insert(row)

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, lead: data as unknown as Lead };
}
