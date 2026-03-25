import type { RegisterOptions } from "react-hook-form";

export type FieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "multiselect";

export interface SelectOption {
  label: string;
  value: string;
}

export type FieldValue = string | number | boolean | string[];

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  defaultValue: FieldValue;
  placeholder?: string;
  disabled?: boolean;
  options?: SelectOption[];
  validation?: RegisterOptions;
  section?: string;
  icon?: string;
  description?: string;
  columns?: number;
}

export type SettingsValues = Record<string, FieldValue>;
