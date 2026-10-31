// src/types/personalization.ts  (mirrors server/src/personalization/types.ts)

export type Skill = "attention" | "memory" | "math" | "reading" | "problemSolving" | "communication";
export type SkillMap = Record<Skill, number>;
export type Subject = "reading" | "math" | "science" | "logic" | "quizzes" | "daily" | "play";

export interface RecommendationItem {
  /** Route path, e.g. "/reading/vocabulary" – use directly in <Link to={id}> */
  id: string;
  emoji: string;
  title: string;
  description: string;
  subject: Subject;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  premium: boolean;
  reason: string;
  match: number;
}

export type PersonalizationPayload =
  | { status: "needs_assessment" }
  | {
      status: "ready";
      generatedAt: string;
      insight: string;
      skills: SkillMap; // 0..100
      focusSkills: Skill[];
      nextLearning: RecommendationItem;
      upNext: RecommendationItem[];
      recommended: RecommendationItem[];
      dailyPlan: { items: RecommendationItem[]; totalMinutes: number };
    };

export interface PersonalizationParams {
  sessionMinutes: 5 | 10 | 20;
  interests: string[];
}

export interface LearningEventInput {
  moduleId: string;
  /** 0..1 */
  score?: number;
  durationSec?: number;
  completed?: boolean;
  skipped?: boolean;
  hintsUsed?: number;
}