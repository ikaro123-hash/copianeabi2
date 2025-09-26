import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { initializeDatabase } from "./database/init";
import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";
import eventsRoutes from "./routes/events";

export function createServer() {
  const app = express();

  // Initialize database
  initializeDatabase().catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // NEABI API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postsRoutes);
  app.use("/api/events", eventsRoutes);

  return app;
}
