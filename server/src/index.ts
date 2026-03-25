import express from "express";
import cors from "cors";
import accountsRouter from "./routes/accounts.js";
import settingsRouter from "./routes/settings.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/accounts", accountsRouter);
app.use("/api/accounts", settingsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
