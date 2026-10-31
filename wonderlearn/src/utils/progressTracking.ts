export type LearningActivityResult = {
  skill: string;
  activityName: string;
  correct?: boolean;
  score?: number;
  total?: number;
  timeSpent: number; // seconds
  completed?: boolean;
  hintUsed?: boolean;
  audioUsed?: boolean;
  visualSupport?: boolean;
};

const ACTIVITY_KEY = "wonderlearnActivityLog";

export function recordLearningActivity(
  result: LearningActivityResult
) {
  if (typeof window === "undefined") return;

  try {
    const existing: LearningActivityResult[] = JSON.parse(
      localStorage.getItem(ACTIVITY_KEY) || "[]"
    );

    const record = {
      ...result,
      id: crypto.randomUUID(),
      completed: result.completed ?? true,
      completedAt: new Date().toISOString(),
    };

    // Keep recent history without allowing unlimited growth.
    const updated = [...existing, record].slice(-500);

    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));

    // Refreshes the dashboard in the same browser tab.
    window.dispatchEvent(
      new CustomEvent("learning-activity-completed", {
        detail: record,
      })
    );

    return record;
  } catch (error) {
    console.error("Could not save learning activity:", error);
    return undefined;
  }
}