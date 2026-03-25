import { Box } from '@mui/material'
import { statusConfig, statusIcons } from '../types/account'
import type { AccountStatus } from '../types'

interface StatusIconProps {
  status: AccountStatus
}

export default function StatusIcon({ status }: StatusIconProps) {
  const config = statusConfig[status]
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        bgcolor: config.iconBg,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 18, color: config.color }}
      >
        {statusIcons[status]}
      </span>
    </Box>
  )
}
