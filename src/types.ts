export enum QuoteType {
  STOIC = "STOIC",
  INSPIRATIONAL = "INSPIRATIONAL",
  LYRIC = "LYRIC"
}

export interface DailyQuote {
  quote: string;
  author: string;
  summary: string;
  type: QuoteType;
}
