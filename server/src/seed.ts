import pg from "pg";
import { faker } from "@faker-js/faker";
import pool from "./db.js";

const DB_NAME = process.env.DB_NAME || "account_settings";

async function initDatabase() {
  const client = new pg.Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: "postgres",
  });

  await client.connect();
  const result = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [DB_NAME],
  );

  if (result.rowCount === 0) {
    await client.query(`CREATE DATABASE ${client.escapeIdentifier(DB_NAME)}`);
    console.log(`Created database "${DB_NAME}"`);
  } else {
    console.log(`Database "${DB_NAME}" already exists`);
  }

  await client.end();
}

async function seed() {
  await initDatabase();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        account_id VARCHAR(50) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
          CHECK (status IN ('ACTIVE', 'PENDING', 'ARCHIVED')),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS account_settings (
        id SERIAL PRIMARY KEY,
        account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        key VARCHAR(255) NOT NULL,
        value JSONB NOT NULL,
        UNIQUE(account_id, key)
      );
    `);

    const existingAccounts = await client.query(
      "SELECT COUNT(*) FROM accounts",
    );
    if (Number(existingAccounts.rows[0].count) === 0) {
      const accounts = Array.from({ length: 10 }, () => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        account_id: faker.string.alphanumeric(12).toUpperCase(),
        status: faker.helpers.arrayElement(["ACTIVE", "PENDING", "ARCHIVED"]),
      }));

      for (const acc of accounts) {
        await client.query(
          "INSERT INTO accounts (id, name, account_id, status) VALUES ($1, $2, $3, $4)",
          [acc.id, acc.name, acc.account_id, acc.status],
        );
      }

      console.log("Seeded 10 accounts");
    } else {
      console.log("Accounts already exist, skipping seed");
    }

    await client.query("COMMIT");
    console.log("Database seeded successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
