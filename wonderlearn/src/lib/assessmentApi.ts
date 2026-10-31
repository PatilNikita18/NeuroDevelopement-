// src/lib/assessmentApi.ts

// Use the same backend URL your app already uses (Express runs on port 5000).
const API_BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:5000"
).replace(/\/$/, "");

export type AssessmentSkillKey =
  | "attention"
  | "memory"
  | "math"
  | "reading"
  | "problemSolving"
  | "communication";

export interface AssessmentActivityPayload {
  questionId: string;
  skill: AssessmentSkillKey;
  selectedAnswer: string;
  correct: boolean;
  timeSpent: number;
  attempts: number;
  hintUsed: boolean;
  audioUsed: boolean;
  visualSupport: boolean;
}

export type AssessmentScoresPayload = Record<AssessmentSkillKey, number>;

export interface AssessmentPayload {
  clerkId: string;
  scores: AssessmentScoresPayload;
  activities: AssessmentActivityPayload[];
  completedAt: string;
}

type GetToken = () => Promise<string | null>;

export async function saveAssessmentResult(
  getToken: GetToken,
  payload: AssessmentPayload
): Promise<void> {
  const token = await getToken();

  const response = await fetch(`${API_BASE}/api/assessment/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message || `Server responded with status ${response.status}`
    );
  }
}