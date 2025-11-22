import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhonkTrackSchema } from "@shared/schema";
import { generatePhonkPrompt, generateTrackTitle } from "./openai";
import { generatePhonkTrack } from "./suno-api";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate a new phonk track
  app.post("/api/generate", async (req, res) => {
    try {
      const { style, bpm, intensity, vocalStyle, mood } = req.body;

      // Validate input
      if (!style || !bpm || !intensity || !vocalStyle || !mood) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Generate AI-powered prompt using OpenAI
      const prompt = await generatePhonkPrompt({
        style,
        bpm,
        intensity,
        vocalStyle,
        mood,
      });

      // Generate track title
      const title = await generateTrackTitle({
        style,
        bpm,
        intensity,
        vocalStyle,
        mood,
      });

      // Generate music using Suno-like API
      const musicResult = await generatePhonkTrack({
        prompt,
        style,
        bpm,
        duration: 120, // 2 minutes
      });

      // Store track in database
      const trackData = {
        title,
        style,
        bpm,
        intensity,
        vocalStyle,
        mood,
        prompt,
        audioUrl: musicResult.audioUrl,
        waveformData: musicResult.waveformData,
        duration: musicResult.duration,
      };

      const validatedTrack = insertPhonkTrackSchema.parse(trackData);
      const savedTrack = await storage.createTrack(validatedTrack);

      res.json(savedTrack);
    } catch (error) {
      console.error("Error generating track:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to generate track" 
      });
    }
  });

  // Get all tracks
  app.get("/api/tracks", async (req, res) => {
    try {
      const tracks = await storage.getAllTracks();
      res.json(tracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).json({ error: "Failed to fetch tracks" });
    }
  });

  // Get a specific track
  app.get("/api/tracks/:id", async (req, res) => {
    try {
      const track = await storage.getTrack(req.params.id);
      if (!track) {
        return res.status(404).json({ error: "Track not found" });
      }
      res.json(track);
    } catch (error) {
      console.error("Error fetching track:", error);
      res.status(500).json({ error: "Failed to fetch track" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
