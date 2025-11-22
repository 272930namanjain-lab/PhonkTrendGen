import { type PhonkTrack, type InsertPhonkTrack, phonkTracks } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

// Lazy load db to avoid circular dependency
let dbInstance: any;
function getDb() {
  if (!dbInstance) {
    dbInstance = require("./db").db;
  }
  return dbInstance;
}

export interface IStorage {
  // Phonk tracks
  createTrack(track: InsertPhonkTrack): Promise<PhonkTrack>;
  getTrack(id: string): Promise<PhonkTrack | undefined>;
  getAllTracks(): Promise<PhonkTrack[]>;
  getRecentTracks(limit: number): Promise<PhonkTrack[]>;
}

export class PgStorage implements IStorage {
  async createTrack(insertTrack: InsertPhonkTrack): Promise<PhonkTrack> {
    const db = getDb();
    const [track] = await db.insert(phonkTracks).values(insertTrack).returning();
    return track;
  }

  async getTrack(id: string): Promise<PhonkTrack | undefined> {
    const db = getDb();
    const [track] = await db.select().from(phonkTracks).where(eq(phonkTracks.id, id));
    return track;
  }

  async getAllTracks(): Promise<PhonkTrack[]> {
    const db = getDb();
    return await db.select().from(phonkTracks).orderBy(desc(phonkTracks.createdAt));
  }

  async getRecentTracks(limit: number = 20): Promise<PhonkTrack[]> {
    const db = getDb();
    return await db.select().from(phonkTracks).orderBy(desc(phonkTracks.createdAt)).limit(limit);
  }
}

export const storage = new PgStorage();
