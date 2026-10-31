// // src/types/assessment.ts

// export type AssessmentSkill =
//   | "attention"
//   | "memory"
//   | "math"
//   | "reading"
//   | "problemSolving"
//   | "communication";

// export type QuestionType =
//   | "single"
//   | "memory"
//   | "sequence";

// export interface AssessmentQuestion {
//   id: string;
//   skill: AssessmentSkill;
//   type: QuestionType;
//   title: string;
//   instruction: string;
//   passage?: string;
//   visual?: string;
//   memoryItems?: string[];
//   options: string[];
//   answer?: string;
//   correctItems?: string[];
//   audioText?: string; // NEW: text to read aloud
//   emojiHint?: string; // NEW: large emoji clue
// }

// export interface AssessmentAnswer {
//   questionId: string;
//   skill: AssessmentSkill;
//   selectedAnswer: string;
//   correct: boolean;
//   timeSpent: number;
//   attempts: number;
//   hintUsed: boolean;
//   audioUsed: boolean;
//   visualSupport: boolean;
// }

// export interface AssessmentResult {
//   completedAt: string;
//   scores: Record<AssessmentSkill, number>;
//   activities: AssessmentAnswer[];
// }




// src/types/assessment.ts

export type AssessmentSkill =
  | "attention"
  | "memory"
  | "math"
  | "reading"
  | "problemSolving"
  | "communication";

// Same type, shorter name used by the save logic
export type SkillKey = AssessmentSkill;

export type QuestionType = "single" | "memory" | "sequence";

export interface AssessmentQuestion {
  id: string;
  skill: AssessmentSkill;
  type: QuestionType;
  title: string;
  instruction: string;
  passage?: string;
  visual?: string;
  memoryItems?: string[];
  options: string[];
  answer?: string;
  correctItems?: string[];
  audioText?: string; // text to read aloud
  emojiHint?: string; // large emoji clue
}

export type AssessmentActivity = {
  questionId: string;
  skill: SkillKey;
  selectedAnswer: string;
  correct: boolean;
  timeSpent: number; // seconds
  attempts: number;
  hintUsed: boolean;
  audioUsed: boolean;
  visualSupport: boolean;
};

// Kept so any older imports of AssessmentAnswer keep working
export type AssessmentAnswer = AssessmentActivity;

export type AssessmentResult = {
  scores: Record<SkillKey, number>;
  activities: AssessmentActivity[];
  completedAt: string; // ISO string
};