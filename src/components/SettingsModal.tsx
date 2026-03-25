import {
  Dialog,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import FormField from './FormField'
import { accountSettingsFields, getDefaultValues } from '../config/accountSettingsFields'
import {
  useAccountSettings,
  useSaveSettings,
} from '../hooks/useAccounts'
import type { Account, FormFieldConfig, SettingsValues } from '../types'

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  account: Account
}

function groupFieldsBySection(fields: FormFieldConfig[]) {
  const sections: { section: string; fields: FormFieldConfig[] }[] = []
  for (const field of fields) {
    const sectionName = field.section ?? ''
    const existing = sections.find((s) => s.section === sectionName)
    if (existing) {
      existing.fields.push(field)
    } else {
      sections.push({ section: sectionName, fields: [field] })
    }
  }
  return sections
}

const defaults = getDefaultValues(accountSettingsFields)
const sections = groupFieldsBySection(accountSettingsFields)

export default function SettingsModal({
  open,
  onClose,
  account,
}: SettingsModalProps) {
  const { data: savedSettings, isLoading } = useAccountSettings(open ? account.id : null)
  const saveSettings = useSaveSettings()

  const initialValues = useMemo(
    () => savedSettings ? { ...defaults, ...savedSettings } : defaults,
    [savedSettings],
  )

  const methods = useForm<SettingsValues>({
    defaultValues: defaults,
  })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (open) {
      reset(initialValues)
    }
  }, [open, initialValues, reset])

  const onSubmit = (data: SettingsValues) => {
    saveSettings.mutate(
      { accountId: account.id, settings: data },
      { onSuccess: () => onClose() },
    )
  }

  const handleDiscard = () => {
    reset(initialValues)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleDiscard}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(25, 28, 30, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
        >
          <Box
            sx={{
              px: 4,
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Account Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure <Typography component="span" color='secondary.main' fontWeight={700}>{account.name}</Typography> parameters
              </Typography>
            </Box>
            <IconButton onClick={handleDiscard} size="small" sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              px: 4,
              py: 2,
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
            <>
            {sections.map((section) => (
              <Box key={section.section} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {section.section && (
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: '1.05rem' }}
                  >
                    {section.section}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {section.fields.map((field) => (
                    <FormField key={field.name} config={field} />
                  ))}
                </Box>
              </Box>
            ))}


              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: 'error.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => reset(defaults)}
                component="span"
              >
                Reset to system defaults
              </Typography>
            </>
            )}
          </Box>

          <Box
            sx={{
              px: 4,
              py: 3,
              bgcolor: 'background.default',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              onClick={handleDiscard}
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(214, 227, 255, 0.3)' },
              }}
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #00488d, #005fb8)',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(0, 72, 141, 0.2)',
                '&:hover': {
                  boxShadow: '0 4px 14px rgba(0, 72, 141, 0.4)',
                },
              }}
              disabled={saveSettings?.isPending}
            >
              Apply Settings
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Dialog>
  )
}
