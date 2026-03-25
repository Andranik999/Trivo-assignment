import { Outlet } from '@tanstack/react-router'
import { Box, Stack, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

export function RootLayout() {
  return (
    <Stack sx={{ display: 'flex', height: '100vh', bgcolor: '#f7f9fc', overflow: 'hidden' }}>
      <Box
        component="aside"
        sx={{
          width: 256,
          flexShrink: 0,
          bgcolor: '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        }}
      >
        <Box sx={{ mb: 4, px: 1 }}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: '"Manrope", sans-serif',
              color: '#00488d',
            }}
          >
            TRIVO Assignment
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Management Console
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.5,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            color: '#00488d',
            fontWeight: 600,
          }}
        >
          <AccountBalanceWalletIcon fontSize="small" />
          <Typography variant="body2" fontWeight={600}>
            Accounts
          </Typography>
        </Box>
      </Box>

      <Box sx={{ ml: '256px', flex: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  )
}
