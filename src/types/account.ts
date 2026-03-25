export type AccountStatus = "ACTIVE" | "PENDING" | "ARCHIVED";

export interface Account {
  id: string;
  name: string;
  accountId: string;
  status: AccountStatus;
}

export const statusConfig: Record<
  Account["status"],
  { label: string; bgcolor: string; color: string; iconBg: string }
> = {
  ACTIVE: {
    label: "ACTIVE",
    bgcolor: "#d6e3ff",
    color: "#00468b",
    iconBg: "#d6e3ff",
  },
  PENDING: {
    label: "PENDING",
    bgcolor: "#cbe7f5",
    color: "#304a55",
    iconBg: "#cbe7f5",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    bgcolor: "#ffdbcb",
    color: "#783100",
    iconBg: "#ffdbcb",
  },
};

export const statusIcons: Record<Account["status"], string> = {
  ACTIVE: "account_balance",
  PENDING: "pending",
  ARCHIVED: "block",
};
