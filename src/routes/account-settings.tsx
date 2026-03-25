import { createFileRoute } from '@tanstack/react-router'
import { AccountSettingsPage } from '../pages/AccountSettings'

export const Route = createFileRoute('/account-settings')({
  component: AccountSettingsPage,
})
