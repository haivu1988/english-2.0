export type MasteryLevel = 'new' | 'learning' | 'review' | 'mastered';

export interface VisualMnemonic {
  scene: string; // Cảnh tượng liên tưởng hình ảnh sinh động (Visual memory scene)
  clue?: string; // Mẹo âm thanh tương tự hoặc bắc cầu từ vựng
  icon?: string; // Emoji gợi nhớ trực quan
  accentColor?: string; // Màu sắc chủ đạo (e.g. 'amber', 'emerald', 'indigo', 'rose')
  imageUrl?: string; // Đường dẫn ảnh nếu có
}

export interface Flashcard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  vietnameseMeaning: string;
  exampleSentence: string;
  exampleTranslation: string;
  memoryTip: string;
  collocations: string[];
  deckId: string;
  dateAdded: string; // YYYY-MM-DD
  reviewCount: number;
  masteryLevel: MasteryLevel;
  lastReviewed?: string;
  nextReviewDate?: string;
  imageUrl?: string;
  visualMnemonic?: VisualMnemonic;
}

export type EnglishLevel = 'A1-A2' | 'B1-B2' | 'C1-C2' | 'IELTS' | 'TOEIC' | 'Business';

export interface UserPreferences {
  level: EnglishLevel;
  topics: string[];
  dailyGoal: number;
  isOnboarded: boolean;
}

export interface Deck {
  id: string;
  title: string;
  topic: string;
  level: EnglishLevel | string;
  createdAt: string;
  cardCount: number;
  isDaily: boolean;
  dateStr: string; // YYYY-MM-DD
}

export interface SentenceCheckResult {
  isCorrect: boolean;
  score: number;
  correction: string;
  explanation: string;
  betterAlternative: string;
}

export interface WordDeepDiveResult {
  word: string;
  nuance: string;
  commonMistake: string;
  synonyms: { word: string; difference: string }[];
  dialogue: { speaker: string; en: string; vi: string }[];
}

export interface UserProgress {
  dailyStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalCardsReviewed: number;
  todayCardsReviewed: number;
  dailyGoal: number;
  todayDateStr?: string;
}
