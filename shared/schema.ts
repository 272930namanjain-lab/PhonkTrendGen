import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Phonk track storage
export const phonkTracks = pgTable("phonk_tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title"),
  style: text("style").notNull(), // Memphis, Drift, Brazilian, Cowbell, House
  bpm: integer("bpm").notNull(),
  intensity: text("intensity").notNull(), // Chill, Moderate, Aggressive
  vocalStyle: text("vocal_style").notNull(), // Instrumental, Chopped
  mood: text("mood").array(), // Array of mood tags
  prompt: text("prompt").notNull(), // AI-generated prompt used
  audioUrl: text("audio_url"), // URL to the generated audio file
  waveformData: text("waveform_data"), // JSON string of waveform data
  duration: integer("duration"), // Duration in seconds
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPhonkTrackSchema = createInsertSchema(phonkTracks).omit({
  id: true,
  createdAt: true,
});

export type InsertPhonkTrack = z.infer<typeof insertPhonkTrackSchema>;
export type PhonkTrack = typeof phonkTracks.$inferSelect;

// Export phonk style options for frontend
export const PHONK_STYLES = ["Memphis", "Drift", "Brazilian", "Cowbell", "House"] as const;
export const INTENSITY_LEVELS = ["Chill", "Moderate", "Aggressive"] as const;
export const VOCAL_STYLES = ["Instrumental", "Chopped"] as const;
export const MOOD_OPTIONS = [
  "Dark",
  "Energetic",
  "Smooth",
  "Hard",
  "Lo-fi",
  "Underground",
  "Street",
  "Vintage"
] as const;
