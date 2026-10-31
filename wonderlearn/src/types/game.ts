export type GameLevel = "beginner" | "intermediate" | "advanced";

export type GameDomain =
  | "math"
  | "memory"
  | "attention"
  | "problemSolving"
  | "communication";

export interface Game {
  id: string;
  title: string;
  description: string;
  domain: GameDomain;
  skill: string;
  level: GameLevel;
  ageGroups: string[];
  duration: number;
  stars: number;
  emoji: string;

  questions: GameQuestion[];
}

export interface GameQuestion {
  id: string;
  question: string;
  items: string[];
  correctAnswer: string;
  options: string[];
}