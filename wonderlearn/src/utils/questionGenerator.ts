// Adaptive question generator for neurodivergent learners
// - Spaced repetition (Leitner system)
// - Difficulty ladder: array → skip-count → fact → reverse → missing
// - Distractor generation for multiple choice
// - Pure functions for easy testing

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType =
  | "direct"      // 3 × 4 = ?
  | "reverse"     // ? × 4 = 12
  | "missing"     // 3 × ? = 12
  | "word"        // 3 groups of 4 = ?
  | "skip";       // 3, 6, 9, __

export interface Question {
  id: string;
  table: number;       // the times-table (e.g. 3)
  multiplier: number;  // the other factor (e.g. 4)
  answer: number;      // 12
  type: QuestionType;
  prompt: string;      // "3 × 4 = ?"
  speechText: string;  // what TTS reads aloud
  choices?: number[];  // for multiple choice
  hint: string;        // "Think 3, 6, 9, 12"
}

export interface SessionConfig {
  table: number;            // 1..12
  difficulty: Difficulty;
  questionCount: number;    // 5, 10, 20
  allowMultipleChoice: boolean;
  allowSpeech: boolean;
}

const rand = (n: number) => Math.floor(Math.random() * n);

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Generate wrong answers that are "close" but not correct.
// Avoid the off-by-table mistakes that confuse learners.
function makeDistractors(
  correct: number,
  table: number,
  multiplier: number
): number[] {
  const pool = new Set<number>();
  const deltas = [table, -table, 1, -1, 2, -2, 10, -10];
  for (const d of deltas) {
    const v = correct + d;
    if (v > 0 && v !== correct) pool.add(v);
  }
  // Add a couple of true multiples to tempt
  pool.add(table * (multiplier + 1));
  pool.add(table * Math.max(1, multiplier - 1));
  pool.delete(correct);

  return shuffle([...pool]).slice(0, 3);
}

function buildChoices(
  correct: number,
  table: number,
  multiplier: number
): number[] {
  return shuffle([correct, ...makeDistractors(correct, table, multiplier)]);
}

function pickType(difficulty: Difficulty, index: number, total: number): QuestionType {
  if (difficulty === "easy") return "direct";
  if (difficulty === "medium") {
    return index % 3 === 0 ? "reverse" : "direct";
  }
  // hard: cycle through all
  const cycle: QuestionType[] = ["direct", "reverse", "missing", "word", "skip"];
  return cycle[index % cycle.length];
}

export function generateQuestion(
  table: number,
  multiplier: number,
  type: QuestionType,
  allowMultipleChoice: boolean
): Question {
  const answer = table * multiplier;
  let prompt = "";
  let speech = "";
  let hint = "";

  switch (type) {
    case "direct":
      prompt = `${table} × ${multiplier} = ?`;
      speech = `${table} times ${multiplier} equals what?`;
      hint = `Think ${Array.from({ length: multiplier }, (_, i) => table * (i + 1)).join(", ")}`;
      break;
    case "reverse":
      prompt = `? × ${multiplier} = ${answer}`;
      speech = `What times ${multiplier} equals ${answer}?`;
      hint = `Count by ${multiplier}s up to ${answer}`;
      break;
    case "missing":
      prompt = `${table} × ? = ${answer}`;
      speech = `${table} times what equals ${answer}?`;
      hint = `How many ${table}s fit in ${answer}?`;
      break;
    case "word": {
      const nouns = ["🍎", "⭐", "🐟", "🎈", "🍪"];
      const noun = nouns[rand(nouns.length)];
      prompt = `${multiplier} groups of ${table} ${noun} = ?`;
      speech = `${multiplier} groups of ${table} equals what?`;
      hint = `Count all the ${noun} one by one`;
      break;
    }
    case "skip":
      prompt = `Skip-count by ${table}: ${table}, ${table * 2}, ${table * 3}, __`;
      speech = `Skip count by ${table}: ${table}, ${table * 2}, ${table * 3}, what comes next?`;
      hint = `Add ${table} to ${table * 3}`;
      break;
  }

  return {
    id: `${table}-${multiplier}-${type}-${Date.now()}-${rand(9999)}`,
    table,
    multiplier,
    answer,
    type,
    prompt,
    speechText: speech,
    choices: allowMultipleChoice
      ? buildChoices(answer, table, multiplier)
      : undefined,
    hint,
  };
}

export function generateSession(config: SessionConfig): Question[] {
  const { table, difficulty, questionCount, allowMultipleChoice } = config;
  const multipliers = shuffle(Array.from({ length: 12 }, (_, i) => i + 1))
    .slice(0, Math.min(questionCount, 12));

  // For longer sessions, repeat with new types
  const result: Question[] = [];
  for (let i = 0; i < questionCount; i++) {
    const m = multipliers[i % multipliers.length];
    const type = pickType(difficulty, i, questionCount);
    result.push(generateQuestion(table, m, type, allowMultipleChoice));
  }
  return result;
}

// Leitner-style: promote/demote next multiplier pool based on performance
export function pickNextMultiplier(
  history: { multiplier: number; correct: boolean }[],
  allMultipliers: number[]
): number {
  const stats = new Map<number, { ok: number; no: number }>();
  for (const h of history) {
    const s = stats.get(h.multiplier) ?? { ok: 0, no: 0 };
    h.correct ? s.ok++ : s.no++;
    stats.set(h.multiplier, s);
  }
  // Prefer weakest multipliers (most wrong)
  const weakest = allMultipliers
    .map((m) => ({ m, score: (stats.get(m)?.no ?? 0) * 3 - (stats.get(m)?.ok ?? 0) }))
    .sort((a, b) => b.score - a.score);

  // 70% chance to pick weakest, 30% random
  if (Math.random() < 0.7) return weakest[0].m;
  return allMultipliers[rand(allMultipliers.length)];
}