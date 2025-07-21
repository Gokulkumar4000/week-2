import type { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log(`${formattedTime} [express] ${message}`);
}

export function serveStatic(app: Express) {
  // In production, serve a simple API-only response
  app.get("/", (req, res) => {
    res.json({
      message: "FeedbackPro Backend API",
      status: "running",
      endpoints: {
        health: "/health",
        reviews: "/api/reviews",
        stats: "/api/reviews/stats"
      }
    });
  });
}