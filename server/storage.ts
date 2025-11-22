import { type PhonkTrack, type InsertPhonkTrack, phonkTracks } from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  // Phonk tracks
  createTrack(track: InsertPhonkTrack): Promise<PhonkTrack>;
  getTrack(id: string): Promise<PhonkTrack | undefined>;
  getAllTracks(): Promise<PhonkTrack[]>;
  getRecentTracks(limit: number): Promise<PhonkTrack[]>;
}

export class PgStorage implements IStorage {
  async createTrack(insertTrack: InsertPhonkTrack): Promise<PhonkTrack> {
    const [track] = await db.insert(phonkTracks).values(insertTrack).returning();
    return track;
  }

  async getTrack(id: string): Promise<PhonkTrack | undefined> {
    const [track] = await db.select().from(phonkTracks).where(eq(phonkTracks.id, id));
    return track;
  }

  async getAllTracks(): Promise<PhonkTrack[]> {
    return await db.select().from(phonkTracks).orderBy(desc(phonkTracks.createdAt));
  }

  async getRecentTracks(limit: number = 20): Promise<PhonkTrack[]> {
    return await db.select().from(phonkTracks).orderBy(desc(phonkTracks.createdAt)).limit(limit);
  }
}

export const storage = new PgStorage();
