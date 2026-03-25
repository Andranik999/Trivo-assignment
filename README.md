## Prerequisites

- **Node.js** >= 18
- **pnpm** — `npm install -g pnpm`
- **PostgreSQL** — must be installed and running on `localhost:5432`

### 1. Install dependencies

```bash
pnpm install
```

### 2. Seed the database

The seed script automatically creates the database (if it doesn't exist), tables, and populates 10 accounts with faker-generated data:

```bash
pnpm seed
```

To re-seed from scratch:

```bash
psql -U postgres -c "DROP DATABASE account_settings;"
pnpm seed
```

### 3. Start the application

Run the backend and frontend in separate terminals:

```bash
# Terminal 1 — Express API server (port 3001)
pnpm run server

# Terminal 2 — Vite dev server (port 5173)
pnpm dev
```

## Important components and files

-- FormField.tsx, SettingsModal.tsx, accountSettingsFields.ts, AccountSettings.tsx,

## Dynamic Form Fields

Settings fields are defined in `src/config/accountSettingsFields.ts`. Each entry in the array specifies the field name, type, default value, validation rules, section grouping, and UI hints. The `FormField` component renders the control based on the `type` property. To add or remove a setting, update the config array and the backend will store it automatically via the key-value schema.

Supported field types: `text`, `number`, `boolean`, `select`, `multiselect`.

## Overall Approach

Accounts table used to store the existing accounts. accounts_settings used to store
per account settings with a key-value pattern. Value uses JSONB and there is a unique constraint account_id, key to ensure unique settings.

## AI Tools Usage

-- Used Googles Stitch to craft a quick simple design and color palette.
-- Used Claude Sonnet to help with postgres db initialization, table creation and setup.
