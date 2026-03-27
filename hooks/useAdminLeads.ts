"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
      const { data, error: fetchError } = await supabase
        .from("leads")
        .select("id, name, contact, service, created_at")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setLeads([]);
        setLoading(false);
        return;
      }

      const rows = ((data ?? []) as Pick<
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
