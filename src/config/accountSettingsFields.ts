import type { FormFieldConfig, SettingsValues } from "../types";

export const accountSettingsFields: FormFieldConfig[] = [
  {
    name: "enableNotifications",
    label: "Enable notifications",
    type: "boolean",
    defaultValue: true,
    section: "Communication Preferences",
    icon: "notifications",
    description: "Receive alerts for major transactions",
  },
  {
    name: "allowedChannels",
    label: "Allowed channels",
    type: "multiselect",
    defaultValue: ["email", "slack"],
    section: "Communication Preferences",
    columns: 2,
    options: [
      { label: "Slack", value: "slack" },
      { label: "Email", value: "email" },
      { label: "Discord", value: "discord" },
      { label: "Teams", value: "teams" },
    ],
    validation: {
      validate: (value: unknown) => {
        const arr = value as string[];
        return (arr && arr.length > 0) || "Select at least one channel";
      },
    },
  },

  {
    name: "supportEmail",
    label: "Support email",
    type: "text",
    defaultValue: "",
    placeholder: "admin@example.com",
    section: "Data Configuration",
    icon: "mail",
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "dailyEmailLimit",
    label: "Daily email limit",
    type: "number",
    defaultValue: 10,
    placeholder: "150",
    section: "Data Configuration",
    icon: "numbers",
    validation: {
      max: { value: 1000, message: "Must be 10,000 or less" },
    },
  },
  {
    name: "timezone",
    label: "Timezone",
    type: "select",
    defaultValue: "est",
    section: "Data Configuration",
    icon: "schedule",
    options: [
      { label: "UTC (Coordinated Universal Time)", value: "utc" },
      { label: "EST (Eastern Standard Time)", value: "est" },
      { label: "CST (Central Standard Time)", value: "cst" },
      { label: "MST (Mountain Standard Time)", value: "mst" },
      { label: "PST (Pacific Standard Time)", value: "pst" },
      { label: "GMT (Greenwich Mean Time)", value: "gmt" },
    ],
    validation: {
      required: "Timezone is required",
    },
  },
];

export function getDefaultValues(fields: FormFieldConfig[]): SettingsValues {
  const defaults: SettingsValues = {};
  for (const field of fields) {
    defaults[field.name] = field.defaultValue;
  }
  return defaults;
}
