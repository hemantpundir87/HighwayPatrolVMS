import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./utils/logger";
import { getPool } from "./db/mssql.config";
import controlRoomRoutes from "./routes/controlRoom.routes";
import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import packageRoutes from "./routes/package.routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 🧩 Global Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// 🩺 Health check route
app.get("/api/health", async (_req, res) => {
  try {
    await getPool(); // Test DB connection
    res.status(200).json({
      ok: true,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    logger.error("DB connection failed:", err.message);
    res.status(500).json({ ok: false, message: err.message });
  }
});

// 🚔 Main routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/controlroom", controlRoomRoutes);
app.use("/api/package", packageRoutes);


// 🧱 Global Error Handler
app.use(
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Internal Server Error",
    });
  }
);

// 🚀 Start the server
app.listen(PORT, async () => {
  try {
    await getPool(); // Initial DB connection
    logger.info(`✅ Server running ➜ http://localhost:${PORT}`);
  } catch (err: any) {
    logger.error("❌ Failed to connect to SQL Server:", err.message);
  }
});
