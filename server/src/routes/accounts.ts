import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, account_id AS "accountId", status FROM accounts ORDER BY created_at DESC',
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch accounts:", err);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, account_id AS "accountId", status FROM accounts WHERE id = $1',
      [req.params.id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to fetch account:", err);
    res.status(500).json({ error: "Failed to fetch account" });
  }
});

export default router;
