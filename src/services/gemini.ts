import { GoogleGenAI, Type } from "@google/genai";
import { DailyQuote, QuoteType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function fetchDailyQuote(type: QuoteType, date: string): Promise<DailyQuote> {
  const prompts = {
    [QuoteType.STOIC]: "Provide a powerful Stoic quote from a philosopher like Marcus Aurelius, Seneca, or Epictetus.",
    [QuoteType.INSPIRATIONAL]: "Provide a deeply moving and inspirational quote from a historical figure, leader, or thinker.",
    [QuoteType.LYRIC]: "Provide a meaningful and poetic lyric from a well-known song that carries a strong life lesson."
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${prompts[type]} 
    The date today is ${date}. Use this date as a seed to ensure the quote is unique for today but consistent if asked again for the same date.
    
    Requirements:
    1. The quote itself.
    2. The author or quotee.
    3. A exactly three-sentence summary of the meaning and how it applies to modern life.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quote: { type: Type.STRING },
          author: { type: Type.STRING },
          summary: { type: Type.STRING }
        },
        required: ["quote", "author", "summary"]
      },
      // Use the date as a seed for consistency
      seed: parseInt(date.replace(/-/g, ""))
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    type
  };
}
