import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface PhonkPromptParams {
  style: string;
  bpm: number;
  intensity: string;
  vocalStyle: string;
  mood: string[];
}

export async function generatePhonkPrompt(params: PhonkPromptParams): Promise<string> {
  const { style, bpm, intensity, vocalStyle, mood } = params;

  const systemPrompt = `You are an expert in phonk music production and trending phonk styles. Generate creative, detailed music prompts for AI music generation that capture authentic phonk characteristics.`;

  const userPrompt = `Create a detailed music generation prompt for a ${style} phonk track with these specifications:
- BPM: ${bpm}
- Intensity: ${intensity}
- Vocal Style: ${vocalStyle}
- Mood/Vibe: ${mood.join(", ")}

The prompt should be concise (2-3 sentences) but include specific musical elements like:
- Instrumentation (808s, cowbells, samples, etc.)
- Production style (lo-fi, clean, distorted)
- Atmospheric qualities
- Vocal treatment if applicable

Return ONLY the music generation prompt as plain text, no additional explanation.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate phonk prompt");
  }
}

export async function generateTrackTitle(params: PhonkPromptParams): Promise<string> {
  const { style, mood } = params;

  const userPrompt = `Generate a short, catchy title (2-4 words max) for a ${style} phonk track with ${mood.join(", ")} vibes. Return only the title, nothing else. Make it edgy and street-style like real phonk tracks.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "user", content: userPrompt }
      ],
    });

    return response.choices[0].message.content?.trim() || `${style} Phonk`;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return `${style} Phonk`;
  }
}
