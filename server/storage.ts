import { type PhonkTrack, type InsertPhonkTrack } from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  // Phonk tracks
  createTrack(track: InsertPhonkTrack): Promise<PhonkTrack>;
  getTrack(id: string): Promise<PhonkTrack | undefined>;
  getAllTracks(): Promise<PhonkTrack[]>;
  getRecentTracks(limit: number): Promise<PhonkTrack[]>;
}

export class MemoryStorage implements IStorage {
  private tracks: Map<string, PhonkTrack> = new Map();

  async createTrack(insertTrack: InsertPhonkTrack): Promise<PhonkTrack> {
    const id = nanoid();
    const track: PhonkTrack = {
      ...insertTrack,
      id,
      createdAt: new Date(),
    };
    this.tracks.set(id, track);
    return track;
  }

  async getTrack(id: string): Promise<PhonkTrack | undefined> {
    return this.tracks.get(id);
  }

  async getAllTracks(): Promise<PhonkTrack[]> {
    return Array.from(this.tracks.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getRecentTracks(limit: number = 20): Promise<PhonkTrack[]> {
    return Array.from(this.tracks.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemoryStorage();
