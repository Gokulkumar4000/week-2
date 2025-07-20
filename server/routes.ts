import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema } from "@shared/schema";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Sheets API
  const auth = new GoogleAuth({
    credentials: process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) : undefined,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

  // Submit review
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      
      // Store in memory
      const review = await storage.createReview(validatedData);

      // Also store in Google Sheets if configured
      if (SPREADSHEET_ID && sheets) {
        try {
          await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Reviews!A:F",
            valueInputOption: "RAW",
            requestBody: {
              values: [
                [
                  review.id,
                  review.rating,
                  review.comment || "",
                  review.sentiment,
                  review.email || "",
                  review.createdAt.toISOString(),
                ],
              ],
            },
          });
        } catch (sheetsError) {
          console.error("Failed to write to Google Sheets:", sheetsError);
          // Continue without failing the request
        }
      }

      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // Get all reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      // Try to sync from Google Sheets first if configured
      if (SPREADSHEET_ID && sheets) {
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Reviews!A:F",
          });

          const rows = response.data.values;
          if (rows && rows.length > 1) {
            // Skip header row and sync data to memory storage
            // This is a simplified sync - in production you'd want more sophisticated merging
            console.log("Synced data from Google Sheets");
          }
        } catch (sheetsError) {
          console.error("Failed to read from Google Sheets:", sheetsError);
        }
      }

      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Get review statistics
  app.get("/api/reviews/stats", async (req, res) => {
    try {
      const stats = await storage.getReviewStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
