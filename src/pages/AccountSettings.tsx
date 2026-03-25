import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import SettingsModal from "../components/SettingsModal";
import StatusIcon from "../components/StatusIcon";
import type { Account } from "../types";
import { statusConfig } from "../types/account";
import { useAccounts } from "../hooks/useAccounts";

export function AccountSettingsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: accounts = [], isLoading, error } = useAccounts();

  const handleOpenModal = (account: Account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography color="error">Failed to load accounts.</Typography>
      </Box>
    );
  }

  const stats = {
    total: accounts.length,
    active: accounts.filter((a) => a.status === "ACTIVE").length,
    pending: accounts.filter((a) => a.status === "PENDING").length,
  };

  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <Box sx={{ mb: 4, flexShrink: 0 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
          }}
        >
          Account Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Review and manage your accounts
        </Typography>
      </Box>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          mb: 4,
          flexShrink: 0,
        }}
      >
        {[
          { label: "Total Accounts", value: stats.total, color: "#191c1e" },
          { label: "Active Ledgers", value: stats.active, color: "#00468b" },
          { label: "Pending Sync", value: stats.pending, color: "#304a55" },
        ].map((stat) => (
          <Paper
            key={stat.label}
            variant="elevation"
            sx={{
              p: 2.5,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {stat.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.75rem",
                fontWeight: 800,
                fontFamily: '"Manrope", sans-serif',
                color: stat.color,
                lineHeight: 1.3,
              }}
            >
              {stat.value}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "secondary",
          flex: 1,
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Account Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Account ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => {
              const status = statusConfig[account.status];
              return (
                <TableRow
                  key={account.id}
                  hover
                  sx={{
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpenModal(account)}
                    >
                      <StatusIcon status={account.status} />
                      <Typography variant="body2" fontWeight={600}>
                        {account.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {account.accountId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        bgcolor: status.bgcolor,
                        color: status.color,
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        letterSpacing: "0.04em",
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          px: 1,
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Showing {accounts.length} of {accounts.length} accounts
        </Typography>
      </Box>

      {selectedAccount && (
        <SettingsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          account={selectedAccount}
        />
      )}
    </Stack>
  );
}
