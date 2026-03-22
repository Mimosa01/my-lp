/**
 * Таблица `leads` — заявки с формы.
 * Поля в snake_case, как в PostgreSQL / Supabase.
 */
export type Lead = {
  id: number;
  name: string;
  contact: string;
  occupation: string | null;
  service: string | null;
  message: string | null;
  created_at: string;
};

/** Вставка: без `id` и без явного `created_at` (DEFAULT в БД). */
export type LeadInsert = {
  name: string;
  contact: string;
  occupation?: string | null;
  service?: string | null;
  message?: string | null;
};
