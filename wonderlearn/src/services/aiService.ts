// Frontend service interface for the future Python/FastAPI AI service.
// Every function below currently resolves with mock data on a short
// artificial delay so the UI can be built against a realistic contract.
// Swap the function bodies for real `fetch` calls once the AI service
// (Bayesian Knowledge Tracing + scikit-learn/PyTorch models) is live.

import type { Activity, LearningRecommendation } from "@/types";
import { activities } from "@/lib/mockData";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/** GET /api/ai/recommendation */
export async function getLearningRecommendation(): Promise<LearningRecommendation> {
  await delay();
  return {
    activityId: "act_2",
    difficulty: 2,
    strategy: "visual-repetition",
    modality: "visual",
    estimatedDuration: 5,
    reason:
      "We noticed you enjoy visual activities and matched this to your current learning level.",
  };
}

/** GET /api/ai/next-activity */
export async function getNextActivity(worldKey?: string): Promise<Activity> {
  await delay();
  const pool = worldKey
    ? activities.filter((a) => a.worldKey === worldKey)
    : activities;
  return pool[0] ?? activities[0];
}

/** GET /api/ai/difficulty */
export async function getDifficulty(_childId: string): Promise<number> {
  await delay(200);
  return 2;
}

/** GET /api/ai/strategy */
export async function getLearningStrategy(_childId: string): Promise<string> {
  await delay(200);
  return "short-sessions-with-visual-support";
}

/** GET /api/ai/mastery */
export async function getMastery(_childId: string) {
  await delay(300);
  return {
    memory: 0.7,
    mathematics: 0.82,
    reading: 0.65,
    focus: 0.55,
  };
}

/** GET /api/ai/personalized-content */
export async function getPersonalizedContent(_childId: string) {
  await delay(300);
  return {
    modality: "visual",
    supportLevel: "medium",
    sessionLengthMinutes: 10,
  };
}

/** POST /api/ai/analyze-performance */
export async function analyzePerformance(_attempt: unknown) {
  await delay(300);
  return { nextDifficulty: 2, encouragement: "Amazing focus today!" };
}
