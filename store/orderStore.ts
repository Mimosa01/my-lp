import {
  leadInsertFromFormData,
  submitLead,
} from "@/service/orderService";
import type { Lead } from "@/types/orders";
import { create } from "zustand";

type OrderState = {
  submitted: boolean;
  pending: boolean;
  error: string | null;
  lastLead: Lead | null;
  reset: () => void;
  submitFromFormData: (formData: FormData) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set) => ({
  submitted: false,
  pending: false,
  error: null,
  lastLead: null,

  reset: () =>
    set({
      submitted: false,
      pending: false,
      error: null,
      lastLead: null,
    }),

  submitFromFormData: async (formData) => {
    set({ error: null, pending: true });
    try {
      const result = await submitLead(leadInsertFromFormData(formData));
      if (!result.ok) {
        set({ pending: false, error: result.message });
        return;
      }
      set({
        submitted: true,
        pending: false,
        error: null,
        lastLead: result.lead,
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось отправить заявку.";
      set({ pending: false, error: message });
    }
  },
}));
