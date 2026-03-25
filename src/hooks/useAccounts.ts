import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccounts,
  fetchAccountSettings,
  saveAccountSettings,
} from "../api/accountsApi";
import type { SettingsValues } from "../types";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
}

export function useAccountSettings(accountId: string | null) {
  return useQuery({
    queryKey: ["accountSettings", accountId],
    queryFn: () => fetchAccountSettings(accountId!),
    enabled: !!accountId,
  });
}

export function useSaveSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      accountId,
      settings,
    }: {
      accountId: string;
      settings: SettingsValues;
    }) => saveAccountSettings(accountId, settings),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["accountSettings", variables.accountId],
      });
    },
  });
}
