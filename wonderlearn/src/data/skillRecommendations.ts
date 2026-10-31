import type { AssessmentSkill } from "../types/assessment";

// =========================================================
// SKILLS
// =========================================================

export const ALL_SKILLS: AssessmentSkill[] = [
  "attention",
  "memory",
  "math",
  "reading",
  "problemSolving",
  "communication",
];

export const skillMeta: Record<AssessmentSkill, { label: string; emoji: string }> = {
  attention: { label: "Attention", emoji: "🎯" },
  memory: { label: "Memory", emoji: "🧠" },
  math: { label: "Math", emoji: "➕" },
  reading: { label: "Reading", emoji: "📖" },
  problemSolving: { label: "Problem Solving", emoji: "🧩" },
  communication: { label: "Communication", emoji: "🗣️" },
};

// =========================================================
// SKILL → DASHBOARD MODULES
// =========================================================

export interface SkillModuleRef {
  path: string; // must match a module path in Dashboard's subjectSections
  title: string;
}

// Best modules first. All titles/paths exist on the dashboard.
export const skillModuleMap: Record<AssessmentSkill, SkillModuleRef[]> = {
  attention: [
    { path: "/logic/spot", title: "Spot the Difference" },
    { path: "/logic/puzzles", title: "Puzzle Games" },
    { path: "/daily/streak", title: "Streak Boosters" },
  ],
  memory: [
    { path: "/reading/vocabulary", title: "Vocabulary Builder" },
    { path: "/quizzes/gk", title: "GK Quiz" },
    { path: "/logic/chess", title: "Chess Puzzles" },
  ],
  math: [
    { path: "/math/times-tables", title: "Times Tables Fluency" },
    { path: "/math/money", title: "Money Math" },
    { path: "/math/battle", title: "Math Battle" },
  ],
  reading: [
    { path: "/phonics", title: "Phonics Learning" },
    { path: "/reading/stories", title: "Reading Stories" },
    { path: "/reading/vocabulary", title: "Vocabulary Builder" },
    { path: "/reading/worksheets", title: "Printable Worksheets" },
  ],
  problemSolving: [
    { path: "/logic/puzzles", title: "Puzzle Games" },
    { path: "/logic/code", title: "Code Quest" },
    { path: "/logic/chess", title: "Chess Puzzles" },
    { path: "/science/lab", title: "Science Lab" },
  ],
  communication: [
    { path: "/reading/debate", title: "Debate Cards" },
    { path: "/reading/creative-writing", title: "Creative Writing" },
    { path: "/reading/ai-story", title: "AI Story Weaver" },
  ],
};

// =========================================================
// LEVELS
// =========================================================

export type SkillLevel = "needs-practice" | "developing" | "strong";

export const levelLabel: Record<SkillLevel, string> = {
  "needs-practice": "Needs practice",
  developing: "Developing",
  strong: "Strong",
};

export function getSkillLevel(score: number): SkillLevel {
  if (score < 40) return "needs-practice";
  if (score < 70) return "developing";
  return "strong";
}

// =========================================================
// RANKING
// =========================================================

export interface RankedSkill {
  skill: AssessmentSkill;
  score: number;
  level: SkillLevel;
}

/**
 * Lowest score first. `attempted` limits ranking to skills that actually had
 * questions, so a skill with no questions is never shown as "0% weak".
 */
export function rankSkills(
  scores: Partial<Record<AssessmentSkill, number>>,
  attempted?: AssessmentSkill[]
): RankedSkill[] {
  const skills =
    attempted && attempted.length > 0
      ? attempted
      : ALL_SKILLS.filter((s) => typeof scores[s] === "number");

  return skills
    .filter((s) => typeof scores[s] === "number")
    .map((skill) => {
      const score = Math.max(0, Math.min(100, scores[skill] as number));
      return { skill, score, level: getSkillLevel(score) };
    })
    .sort((a, b) => a.score - b.score);
}

/** Weak areas = anything below "strong". If all are strong, use the lowest two. */
export function getFocusSkills(ranked: RankedSkill[]): RankedSkill[] {
  const weak = ranked.filter((r) => r.level !== "strong");
  return weak.length > 0 ? weak : ranked.slice(0, 2);
}