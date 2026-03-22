import {
  leadInsertFromOrderFormInput,
  submitLead,
  type OrderFormInput,
} from "@/service/orderService";
import type { Lead } from "@/types/orders";
import { create } from "zustand";

type OrderState = {
  submitted: boolean;
  pending: boolean;
  error: string | null;
  lastLead: Lead | null;
  reset: () => void;
  clearSubmitError: () => void;
  submitOrder: (values: OrderFormInput) => Promise<void>;
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

  clearSubmitError: () => set({ error: null }),

  submitOrder: async (values) => {
    set({ error: null, pending: true });
    try {
      const result = await submitLead(leadInsertFromOrderFormInput(values));
      if (!result.ok) {
        set({ error: result.message });
        return;
      }
      set({
        submitted: true,
        error: null,
        lastLead: result.lead,
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось отправить заявку.";
      set({ error: message });
    } finally {
      set({ pending: false });
    }
  },
}));
