"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/lib/types/orders";

export type AdminLeadRow = Pick<
  Lead,
  "id" | "name" | "contact" | "service" | "created_at"
> & {
  status: "Новый" | "Не новый";
};

function getLeadStatus(createdAt: string): "Новый" | "Не новый" {
  const createdMs = new Date(createdAt).getTime();
  const nowMs = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  return nowMs - createdMs <= dayMs ? "Новый" : "Не новый";
}

export function useAdminLeads() {
  const [leads, setLeads] = useState<AdminLeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markAsSeen = (leadId: number) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: "Не новый" } : lead,
      ),
    );
  };

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
      >[]).map((lead) => ({
        ...lead,
        status: getLeadStatus(lead.created_at),
      }));

      setLeads(rows);
      setError(null);
      setLoading(false);
    }

    void loadLeads();

    return () => {
      isMounted = false;
    };
  }, []);

  return { leads, loading, error, markAsSeen };
}
