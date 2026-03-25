import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/:accountId/settings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT key, value FROM account_settings WHERE account_id = $1",
      [req.params.accountId],
    );

    const settings: Record<string, unknown> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }

    res.json(settings);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.put("/:accountId/settings", async (req, res) => {
  const { accountId } = req.params;
  const settings = req.body as Record<string, unknown>;

  if (!settings || typeof settings !== "object") {
    res
      .status(400)
      .json({ error: "Request body must be an object of key-value pairs" });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const [key, value] of Object.entries(settings)) {
      await client.query(
        `INSERT INTO account_settings (account_id, key, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (account_id, key) DO UPDATE SET value = $3`,
        [accountId, key, JSON.stringify(value)],
      );
    }

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Failed to save settings:", err);
    res.status(500).json({ error: "Failed to save settings" });
  } finally {
    client.release();
  }
});

export default router;
