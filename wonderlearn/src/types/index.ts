// ---- Core domain types shared across the app ----

export type AgeRange = "5-8" | "9-12" | "13-18";

export type SupportCondition = "ID" | "DS" | "ADHD" | "AUTISM"; // ADDED "AUTISM"

export type LearningPreference =
  | "pictures"
  | "listening"
  | "games"
  | "reading"
  | "puzzles"
  | "animations";

export type SessionLength = 5 | 10 | 15;

export interface ChildProfile {
  id: string;
  name: string;
  nickname?: string;
  avatar: string; // emoji or asset key
  ageRange: AgeRange;
  condition: SupportCondition;
  preferences: LearningPreference[];
  sessionDuration: SessionLength;
  createdAt: string;
}

export interface LearningWorld {
  id: string;
  key:
    | "memory-garden"
    | "number-mountain"
    | "story-castle"
    | "focus-field"
    | "communication-village"
    | "puzzle-valley"
    | "daily-life-garden"
    | "knowledge-forest"
    | "rainbow-path"
    | "achievement-sky";
  name: string;
  emoji: string;
  description: string;
  progress: number; // 0-100
  level: number;
  stars: number;
  unlocked: boolean;
  color: "purple" | "sky" | "mint" | "sun" | "coral";
}

export interface Activity {
  id: string;
  worldKey: LearningWorld["key"];
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  gameType:
    | "memory-match"
    | "object-matching"
    | "focus-finder"
    | "number-catch"
    | "sequence-builder"
    | "pattern-recognition";
  stars: number;
  order: number;
}

export interface AttemptResult {
  activityId: string;
  score: number;
  accuracy: number; // 0-100
  responseTimeMs: number;
  mistakes: number;
  hintsUsed: number;
  attempts: number;
  completed: boolean;
  completedAt: string;
}

export interface ProgressSnapshot {
  overall: number;
  bySkill: {
    memory: number;
    mathematics: number;
    reading: number;
    focus: number;
  };
  weekly: { day: string; minutes: number; accuracy: number }[];
  activitiesCompleted: number;
  streakDays: number;
  totalStars: number;
}

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LearningRecommendation {
  activityId: string;
  difficulty: number;
  strategy: string;
  modality: string;
  estimatedDuration: number;
  reason: string;
}

export interface AccessibilitySettings {
  readAloud: boolean;
  textSize: "sm" | "md" | "lg" | "xl";
  highContrast: boolean;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  reduceDistractions: boolean;
}