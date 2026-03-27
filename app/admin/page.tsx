"use client";

import { useState } from "react";
import { useAdminLeads } from "@/hooks/useAdminLeads";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { ClipboardCheck, Copy } from "lucide-react";

export default function AdminPage() {
  const { leads, loading, error } = useAdminLeads();
  const [copiedLeadId, setCopiedLeadId] = useState<number | null>(null);
  const {
    hydrated,
    supported,
    permission,
    isSubscribed,
    loading: pushLoading,
    message: pushMessage,
    subscribe,
    unsubscribe,
    testNotification,
  } = usePushNotifications();

  const handleCopyContact = async (leadId: number, contact: string) => {
    try {
      await navigator.clipboard.writeText(contact);
      setCopiedLeadId(leadId);
      window.setTimeout(() => setCopiedLeadId(null), 1200);
    } catch {
      setCopiedLeadId(null);
    }
  };

  return (
    <main className="mx-auto max-w-5xl w-full px-5 py-10">
      <h1 className="text-2xl font-bold text-text">Клиенты</h1>
      <div className="mt-4 rounded-xl border border-border2 bg-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">
            Push:{" "}
            {!hydrated
              ? "проверка..."
              : supported
              ? isSubscribed
                ? "включены"
                : permission === "denied"
                  ? "заблокированы"
                  : "выключены"
              : "не поддерживаются"}
          </span>
          <button
            type="button"
            onClick={subscribe}
            disabled={!supported || pushLoading}
            className="rounded-md border border-border2 px-2.5 py-1 text-xs text-text hover:bg-surface disabled:opacity-50"
          >
            Включить push
          </button>
          <button
            type="button"
            onClick={unsubscribe}
            disabled={!supported || pushLoading}
            className="rounded-md border border-border2 px-2.5 py-1 text-xs text-text hover:bg-surface disabled:opacity-50"
          >
            Отключить push
          </button>
          <button
            type="button"
            onClick={testNotification}
            disabled={!supported || pushLoading}
            className="rounded-md border border-border2 px-2.5 py-1 text-xs text-text hover:bg-surface disabled:opacity-50"
          >
            Тест уведомления
          </button>
        </div>
        {pushMessage ? (
          <p className="mt-2 text-xs text-muted">{pushMessage}</p>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-4 rounded-lg border border-border2 bg-card p-3 text-sm text-muted">
          Загрузка клиентов...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Ошибка загрузки: {error}
        </p>
      ) : null}

      {!loading && !error && leads.length === 0 ? (
        <p className="mt-4 rounded-lg border border-border2 bg-card p-3 text-sm text-muted">
          Пока нет клиентов.
        </p>
      ) : null}

      {!loading && !error && leads.length > 0 ? (
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-xl border border-border2 bg-card p-3"
              >
                <p className="m-0 text-sm font-semibold text-text">{lead.name}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="m-0 text-sm text-text">{lead.contact}</p>
                  <button
                    type="button"
                    onClick={() => void handleCopyContact(lead.id, lead.contact)}
                    className="rounded-md border border-border2 px-2 py-1 text-xs text-muted hover:bg-surface hover:text-text"
                  >
                    {copiedLeadId === lead.id ? <ClipboardCheck /> : <Copy />}
                  </button>
                </div>
                <p className="mt-2 mb-0 text-xs text-muted">
                  Услуга: {lead.service ?? "—"}
                </p>
                <p className="mt-1 mb-0 text-xs text-muted">
                  {new Date(lead.created_at).toLocaleString("ru-RU")}
                </p>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-xl border border-border2 bg-card md:block">
            <table className="w-full min-w-[680px]">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted">
                  Имя
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted">
                  Контакт
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted">
                  Услуга
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted">
                  Дата
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                return (
                  <tr key={lead.id} className="border-t border-border2">
                    <td className="px-4 py-3 text-sm text-text">{lead.name}</td>
                    <td className="px-4 py-3 text-sm text-text">
                      <div className="flex items-center gap-2 justify-between">
                        <span>{lead.contact}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleCopyContact(lead.id, lead.contact);
                          }}
                          className="rounded-md border border-border2 px-2 py-1 text-xs text-muted hover:bg-surface hover:text-text"
                        >
                          {copiedLeadId === lead.id ? <ClipboardCheck /> : <Copy />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {lead.service ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {new Date(lead.created_at).toLocaleString("ru-RU")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </main>
  );
}