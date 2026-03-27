"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/lib/types/orders";

export type AdminLeadRow = Pick<
  Lead,
  "id" | "name" | "contact" | "service" | "created_at"
>;

export function useAdminLeads() {
  const [leads, setLeads] = useState<AdminLeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLeads() {
      const response = await fetch("/api/admin/leads", {
        method: "GET",
        cache: "no-store",
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        leads?: Pick<Lead, "id" | "name" | "contact" | "service" | "created_at">[];
      };

      if (!isMounted) return;

      if (!response.ok || !result.ok) {
        setError(result.message ?? "Не удалось загрузить клиентов.");
        setLeads([]);
        setLoading(false);
        return;
      }

      const rows = ((result.leads ?? []) as Pick<
        Lead,
        "id" | "name" | "contact" | "service" | "created_at"
      >[]).map((lead) => lead);

      setLeads(rows);
      setError(null);
      setLoading(false);
    }

    void loadLeads();

    return () => {
      isMounted = false;
    };
  }, []);

  return { leads, loading, error };
}
