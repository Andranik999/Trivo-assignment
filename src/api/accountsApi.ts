import type { Account } from "../types";
import type { SettingsValues } from "../types";

const API_BASE = "/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ||
        `Request failed: ${response.status}`,
    );
  }
  return response.json() as Promise<T>;
}

export async function fetchAccounts(): Promise<Account[]> {
  const res = await fetch(`${API_BASE}/accounts`);
  return handleResponse<Account[]>(res);
}

export async function fetchAccountSettings(
  accountId: string,
): Promise<SettingsValues> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/settings`);
  return handleResponse<SettingsValues>(res);
}

export async function saveAccountSettings(
  accountId: string,
  settings: SettingsValues,
): Promise<void> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  await handleResponse(res);
}
