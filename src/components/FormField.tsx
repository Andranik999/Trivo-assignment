import {
  TextField,
  Switch,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  InputAdornment,
  FormHelperText,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import type { FormFieldConfig } from '../types'
import MaterialIcon from './MaterialIcon'

interface FormFieldProps {
  config: FormFieldConfig
}

export default function FormField({ config }: FormFieldProps) {
  const { name, label, type, placeholder, disabled, options, validation, icon, description } =
    config
  const { control } = useFormContext()

  if (type === 'boolean') {
    return (
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'background.default',
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {icon && <MaterialIcon name={icon} />}
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {label}
                </Typography>
                {description && (
                  <Typography variant="caption" color="text.secondary">
                    {description}
                  </Typography>
                )}
              </Box>
            </Box>
            <Switch
              checked={!!field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
            />
          </Box>
        )}
      />
    )
  }

  if (type === 'select') {
    return (
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ mb: 0.5, display: 'block', px: 0.5 }}
            >
              {label}
            </Typography>
            <TextField
              {...field}
              select
              fullWidth
              placeholder={placeholder}
              disabled={disabled}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                input: icon
                  ? {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MaterialIcon name={icon} />
                        </InputAdornment>
                      ),
                    }
                  : undefined,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#e6e8eb',
                  borderRadius: 3,
                  '& fieldset': { border: 'none' },
                  '&:focus-within': {
                    bgcolor: 'background.paper',
                    boxShadow: '0 0 0 2px #00488d',
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select {label.toLowerCase()}</em>
              </MenuItem>
              {options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      />
    )
  }

  if (type === 'multiselect') {
    const cols = config.columns ?? 2
    return (
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field, fieldState: { error } }) => {
          const selected = (field.value as string[]) ?? []
          return (
            <Box>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1, display: 'block', px: 0.5 }}
              >
                {label}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: 1.5,
                }}
              >
                {options?.map((opt) => {
                  const checked = selected.includes(opt.value)
                  return (
                    <Box
                      key={opt.value}
                      onClick={() => {
                        const next = checked
                          ? selected.filter((v) => v !== opt.value)
                          : [...selected, opt.value]
                        field.onChange(next)
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.5,
                        border: '1px solid',
                        borderColor: checked
                          ? 'primary.main'
                          : 'rgba(194, 198, 212, 0.3)',
                        borderRadius: 3,
                        cursor: disabled ? 'default' : 'pointer',
                        bgcolor: checked
                          ? 'primary.light'
                          : 'transparent',
                        transition: 'all 0.15s',
                        '&:hover': disabled
                          ? {}
                          : { bgcolor: checked ? 'primary.light' : 'background.default' },
                      }}
                    >
                      <Checkbox
                        checked={checked}
                        size="small"
                        disabled={disabled}
                        tabIndex={-1}
                        sx={{ p: 0 }}
                      />
                      <Typography variant="body2" fontWeight={500}>
                        {opt.label}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
              {error && (
                <FormHelperText error sx={{ px: 0.5 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )
        }}
      />
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ mb: 0.5, display: 'block', px: 0.5 }}
          >
            {label}
          </Typography>
          <TextField
            {...field}
            fullWidth
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            slotProps={{
              input: icon
                ? {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MaterialIcon name={icon} />
                      </InputAdornment>
                    ),
                  }
                : undefined,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#e6e8eb',
                borderRadius: 3,
                '& fieldset': { border: 'none' },
                '&:focus-within': {
                  bgcolor: 'background.paper',
                  boxShadow: '0 0 0 2px #00488d',
                },
              },
            }}
            onChange={(e) => {
              field.onChange(
                type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }}
          />
        </Box>
      )}
    />
  )
}
