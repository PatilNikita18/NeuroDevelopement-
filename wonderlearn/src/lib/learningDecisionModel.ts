// src/lib/learningDecisionModel.ts
//
// Rule-based, explainable decision model.
//   Assessment signals -> diagnose -> pick strategy -> filter for the child
//   -> score modules -> build a difficulty ladder per weak skill -> weekly rhythm.
//
// It only ever recommends modules that are passed in (i.e. the modules that
// exist on the dashboard). No network calls, fully deterministic.

export type AgeGroup = "5-8" | "9-12" | "13-18";
export type SupportType = "ADHD" | "Intellectual Disability" | "Autism";
export type LearningPreference =
  | "Games" | "Stories" | "Music" | "Drawing" | "Puzzles"
  | "Videos" | "Movement" | "Animals" | "Science";
export type AssessmentSkill =
  | "attention" | "memory" | "math" | "reading" | "problemSolving" | "communication";

export interface AssessmentAnswer {
  skill: AssessmentSkill;
  correct?: boolean;
  timeSpent?: number;
  attempts?: number;
  hintUsed?: boolean;
}

export interface ModuleInput {
  path: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  premium?: boolean;
}

export type Severity = "critical" | "support" | "developing" | "secure";
export type Strategy = "scaffold" | "fluency" | "accuracy" | "practice";
export type StepLabel = "Start here" | "Build up" | "Level up";

export interface RecommendedStep {
  module: ModuleInput;
  label: StepLabel;
  level: 1 | 2 | 3;
  minutes: number;
  score: number;
  reasons: string[];
}

export interface SkillPlan {
  skill: AssessmentSkill;
  skillLabel: string;
  score: number;
  need: number;
  priority: "high" | "medium" | "low";
  severity: Severity;
  strategy: Strategy;
  strategyLabel: string;
  strategyTip: string;
  signals: string[];
  confidence: "high" | "low";
  steps: RecommendedStep[];
}

export interface WeekDay {
  dayLabel: string;
  kind: "focus" | "support" | "fun";
  skill: AssessmentSkill | null;
  module: ModuleInput;
  minutes: number;
  note: string;
}

export interface FunBoost {
  module: ModuleInput;
  minutes: number;
  reason: string;
}

export interface TraceStep {
  title: string;
  detail: string;
}

export interface LearningDecision {
  skillPlans: SkillPlan[];
  week: WeekDay[];
  funBoost: FunBoost | null;
  trace: TraceStep[];
  weights: { label: string; value: string }[];
}

export interface DecisionInput {
  scores: Record<AssessmentSkill, number>;
  /** Higher = needs more help. -1 = skill has no answer-level data. */
  needScores: Record<AssessmentSkill, number>;
  observations: AssessmentAnswer[];
  modules: ModuleInput[];
  profile: {
    ageGroup: AgeGroup;
    supportType: SupportType;
    preferences: LearningPreference[];
    sessionLength: number;
  };
}

// ---------------------------------------------------------------------------
// STATIC KNOWLEDGE
// ---------------------------------------------------------------------------

export const SKILL_LABELS: Record<AssessmentSkill, string> = {
  attention: "Attention",
  memory: "Memory",
  math: "Math",
  reading: "Reading & Language",
  problemSolving: "Problem Solving",
  communication: "Communication",
};

/** Which assessment skills each module trains. First skill = primary. */
export const MODULE_SKILL_MAP: Record<string, AssessmentSkill[]> = {
  "/phonics": ["reading", "attention"],
  "/reading/vocabulary": ["reading", "memory"],
  "/reading/ai-story": ["reading", "communication", "memory"],
  "/reading/stories": ["reading", "memory", "attention"],
  "/reading/worksheets": ["reading", "attention"],
  "/reading/creative-writing": ["reading", "communication", "problemSolving"],
  "/reading/typing": ["reading", "attention"],
  "/reading/debate": ["communication", "problemSolving"],
  "/math/battle": ["math", "attention", "problemSolving"],
  "/math/times-tables": ["math", "memory"],
  "/math/money": ["math", "problemSolving"],
  "/science/lab": ["problemSolving", "attention", "memory"],
  "/science/living": ["memory", "problemSolving"],
  "/science/snap": ["attention", "problemSolving"],
  "/logic/puzzles": ["problemSolving", "attention", "memory"],
  "/logic/chess": ["problemSolving", "memory", "attention"],
  "/logic/code": ["problemSolving", "attention"],
  "/logic/spot": ["attention", "memory"],
  "/quizzes/gk": ["memory", "reading"],
  "/quizzes/geography": ["memory", "reading"],
  "/quizzes/battle": ["memory", "attention", "communication"],
  "/quizzes/telling-time": ["math", "problemSolving"],
  "/quizzes/calendar": ["memory", "math"],
  "/daily/ai-pack": ["attention", "memory", "math", "reading", "problemSolving", "communication"],
  "/daily/streak": ["attention"],
  "/daily/stars": ["attention", "problemSolving"],
  "/rewards/leaderboard": ["communication", "attention"],
  "/rewards/certificates": ["reading", "communication"],
  "/rewards/family": ["communication"],
};

type Pressure = "none" | "timed" | "social";
type Format = "guided" | "game" | "creative" | "quiz" | "practice";

interface ModuleProfile {
  /** 1 = gentle, 2 = standard, 3 = challenge */
  level: 1 | 2 | 3;
  minutes: number;
  ages: AgeGroup[];
  styles: LearningPreference[];
  pressure: Pressure;
  format: Format;
}

const ALL: AgeGroup[] = ["5-8", "9-12", "13-18"];
const YOUNG: AgeGroup[] = ["5-8", "9-12"];
const OLDER: AgeGroup[] = ["9-12", "13-18"];

/** Teaching profile of each learnable module (daily / rewards are not remediation). */
const MODULE_PROFILES: Record<string, ModuleProfile> = {
  "/phonics": { level: 1, minutes: 10, ages: YOUNG, styles: ["Music", "Games"], pressure: "none", format: "guided" },
  "/reading/vocabulary": { level: 1, minutes: 8, ages: ALL, styles: ["Games", "Puzzles"], pressure: "none", format: "practice" },
  "/reading/ai-story": { level: 2, minutes: 10, ages: YOUNG, styles: ["Stories"], pressure: "none", format: "guided" },
  "/reading/stories": { level: 1, minutes: 10, ages: ALL, styles: ["Stories", "Videos"], pressure: "none", format: "guided" },
  "/reading/worksheets": { level: 1, minutes: 10, ages: ALL, styles: ["Drawing", "Puzzles"], pressure: "none", format: "practice" },
  "/reading/creative-writing": { level: 3, minutes: 15, ages: OLDER, styles: ["Stories", "Drawing"], pressure: "none", format: "creative" },
  "/reading/typing": { level: 2, minutes: 10, ages: OLDER, styles: ["Games"], pressure: "none", format: "practice" },
  "/reading/debate": { level: 3, minutes: 10, ages: OLDER, styles: [], pressure: "social", format: "creative" },
  "/math/battle": { level: 3, minutes: 5, ages: OLDER, styles: ["Games"], pressure: "timed", format: "game" },
  "/math/times-tables": { level: 2, minutes: 10, ages: OLDER, styles: ["Games", "Puzzles"], pressure: "none", format: "practice" },
  "/math/money": { level: 2, minutes: 10, ages: ALL, styles: ["Games"], pressure: "none", format: "guided" },
  "/science/lab": { level: 2, minutes: 15, ages: OLDER, styles: ["Science"], pressure: "none", format: "guided" },
  "/science/living": { level: 1, minutes: 5, ages: YOUNG, styles: ["Science", "Animals"], pressure: "none", format: "game" },
  "/science/snap": { level: 2, minutes: 10, ages: ALL, styles: ["Science", "Animals"], pressure: "none", format: "creative" },
  "/logic/puzzles": { level: 1, minutes: 8, ages: ALL, styles: ["Puzzles", "Games"], pressure: "none", format: "game" },
  "/logic/chess": { level: 3, minutes: 15, ages: OLDER, styles: ["Puzzles", "Games"], pressure: "none", format: "practice" },
  "/logic/code": { level: 2, minutes: 15, ages: OLDER, styles: ["Games", "Puzzles"], pressure: "none", format: "guided" },
  "/logic/spot": { level: 1, minutes: 5, ages: ALL, styles: ["Games", "Puzzles"], pressure: "none", format: "game" },
  "/quizzes/gk": { level: 2, minutes: 10, ages: OLDER, styles: ["Games"], pressure: "none", format: "quiz" },
  "/quizzes/geography": { level: 2, minutes: 10, ages: OLDER, styles: ["Games"], pressure: "none", format: "quiz" },
  "/quizzes/battle": { level: 3, minutes: 10, ages: OLDER, styles: ["Games"], pressure: "social", format: "game" },
  "/quizzes/telling-time": { level: 1, minutes: 8, ages: YOUNG, styles: ["Games"], pressure: "none", format: "guided" },
  "/quizzes/calendar": { level: 2, minutes: 8, ages: YOUNG, styles: ["Games"], pressure: "none", format: "practice" },
};

// ---------------------------------------------------------------------------
// MODEL WEIGHTS (kept visible so the UI can explain them)
// ---------------------------------------------------------------------------

const W = {
  relevance: [30, 20, 12], // primary / secondary / tertiary skill of the module
  levelFit: 25,            // max points, loses 12 per level of distance from target
  levelPenalty: 12,
  ageFit: 15,
  preference: 10,
  session: 5,
  strategy: 10,
  funPrefMultiplier: 2,
  funStrengthBonus: 8,
};

export const WEIGHT_SUMMARY = [
  { label: "Skill match", value: "up to 30" },
  { label: "Right difficulty", value: "up to 25" },
  { label: "Age fit", value: "15" },
  { label: "Support-type fit", value: "-20 to +14" },
  { label: "Teaching strategy", value: "up to 10" },
  { label: "Child's interests", value: "up to 10" },
  { label: "Session length", value: "+5 / -6" },
];

const STRATEGY_COPY: Record<Strategy, { label: string; tip: string }> = {
  scaffold: {
    label: "Guided support",
    tip: "Start with step-by-step, hint-friendly activities before any timed or competitive play.",
  },
  fluency: {
    label: "Build speed",
    tip: "Answers are mostly right but slow — short, repeated rounds will build confidence and pace.",
  },
  accuracy: {
    label: "Slow down & check",
    tip: "Several answers needed a second try — pick calm activities that reward checking your work.",
  },
  practice: {
    label: "Steady practice",
    tip: "Regular practice at the right level will keep this skill growing.",
  },
};

// severity -> target difficulty level for step 1, 2, 3 of the ladder
const LADDER: Record<Severity, [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3]> = {
  critical: [1, 1, 2],
  support: [1, 2, 2],
  developing: [2, 2, 3],
  secure: [2, 3, 3],
};

const STEP_LABELS: StepLabel[] = ["Start here", "Build up", "Level up"];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function severityOf(score: number): Severity {
  if (score < 40) return "critical";
  if (score < 60) return "support";
  if (score < 75) return "developing";
  return "secure";
}

interface Signals {
  answered: number;
  incorrectRate: number;
  hintRate: number;
  slow: number; // 0..1
  repeatRate: number;
  avgTime: number;
}

function signalsFor(skill: AssessmentSkill, obs: AssessmentAnswer[]): Signals {
  const a = obs.filter((o) => o.skill === skill);
  if (a.length === 0) {
    return { answered: 0, incorrectRate: 0, hintRate: 0, slow: 0, repeatRate: 0, avgTime: 0 };
  }
  const avgTime = a.reduce((s, o) => s + (o.timeSpent || 0), 0) / a.length;
  return {
    answered: a.length,
    incorrectRate: a.filter((o) => o.correct === false).length / a.length,
    hintRate: a.filter((o) => o.hintUsed).length / a.length,
    slow: clamp((avgTime - 8) / 22, 0, 1),
    repeatRate: a.filter((o) => (o.attempts || 1) > 1).length / a.length,
    avgTime,
  };
}

function pickStrategy(sev: Severity, s: Signals): Strategy {
  if (s.answered === 0) return sev === "critical" || sev === "support" ? "scaffold" : "practice";
  if (sev === "critical" || s.hintRate >= 0.4 || s.incorrectRate >= 0.6) return "scaffold";
  if (s.slow >= 0.5) return "fluency";
  if (s.repeatRate >= 0.4) return "accuracy";
  return "practice";
}

function describeSignals(s: Signals): string[] {
  if (s.answered === 0) return ["Not enough answers to measure behaviour"];
  const out: string[] = [];
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  if (s.incorrectRate >= 0.4) out.push(`Missed ${pct(s.incorrectRate)} of questions`);
  if (s.hintRate >= 0.25) out.push(`Used hints on ${pct(s.hintRate)}`);
  if (s.slow >= 0.35) out.push(`Slow responses (~${Math.round(s.avgTime)}s each)`);
  if (s.repeatRate >= 0.25) out.push(`Needed 2+ tries on ${pct(s.repeatRate)}`);
  if (out.length === 0) out.push("Answers were steady — no strong struggle signals");
  return out;
}

interface ScoredModule {
  module: ModuleInput;
  profile: ModuleProfile;
  score: number;
  parts: { relevance: number; level: number; support: number; pref: number; session: number; strategy: number };
  prefMatches: LearningPreference[];
}

function supportFit(p: ModuleProfile, support: SupportType): number {
  let v = 0;
  if (support === "ADHD") {
    if (p.minutes <= 10) v += 8;
    if (p.minutes >= 15) v -= 10;
    if (p.pressure === "timed") v -= 4;
    if (p.format === "game") v += 4;
  } else if (support === "Autism") {
    if (p.pressure === "social") v -= 20;
    if (p.pressure === "timed") v -= 10;
    if (p.format === "guided") v += 6;
  } else {
    if (p.level === 3) v -= 15;
    if (p.level === 1) v += 8;
    if (p.format === "guided") v += 6;
    if (p.minutes > 12) v -= 6;
  }
  return clamp(v, -20, 14);
}

function strategyFit(p: ModuleProfile, strategy: Strategy): number {
  if (strategy === "scaffold") {
    if (p.format === "guided") return W.strategy;
    if (p.pressure !== "none") return -8;
    return 3;
  }
  if (strategy === "fluency") {
    if (p.pressure === "timed" || p.format === "practice") return W.strategy;
    return 2;
  }
  if (strategy === "accuracy") {
    if (p.format === "guided" || p.format === "quiz") return 6;
    return 0;
  }
  return 0;
}

function scoreModule(
  module: ModuleInput,
  skill: AssessmentSkill,
  targetLevel: number,
  strategy: Strategy,
  profile: DecisionInput["profile"]
): ScoredModule | null {
  const p = MODULE_PROFILES[module.path];
  const skills = MODULE_SKILL_MAP[module.path] || [];
  const idx = skills.indexOf(skill);
  if (!p || idx === -1) return null;

  const relevance = W.relevance[Math.min(idx, 2)];
  const level = Math.max(0, W.levelFit - W.levelPenalty * Math.abs(p.level - targetLevel));
  const ageOk = p.ages.includes(profile.ageGroup);
  const age = ageOk ? W.ageFit : -30; // soft penalty so we can still fall back
  const support = supportFit(p, profile.supportType);
  const prefMatches = p.styles.filter((s) => profile.preferences.includes(s));
  const pref = p.styles.length ? (prefMatches.length / p.styles.length) * W.preference : 0;
  const session = p.minutes <= profile.sessionLength ? W.session : -6;
  const strat = strategyFit(p, strategy);

  return {
    module,
    profile: p,
    score: relevance + level + age + support + pref + session + strat,
    parts: { relevance, level, support, pref, session, strategy: strat },
    prefMatches,
  };
}

function reasonsFor(
  s: ScoredModule,
  skill: AssessmentSkill,
  profile: DecisionInput["profile"],
  strategy: Strategy
): string[] {
  const out: string[] = [];
  const idx = (MODULE_SKILL_MAP[s.module.path] || []).indexOf(skill);
  out.push(idx === 0 ? `Trains ${SKILL_LABELS[skill]} directly` : `Also supports ${SKILL_LABELS[skill]}`);
  if (s.parts.strategy >= 6) out.push(`Fits "${STRATEGY_COPY[strategy].label}" approach`);
  if (s.parts.support >= 6) out.push(`Works well with ${profile.supportType} support`);
  if (s.prefMatches.length) out.push(`Matches interest: ${s.prefMatches[0]}`);
  if (s.parts.session > 0) out.push(`Fits a ${profile.sessionLength}-min session`);
  return out.slice(0, 3);
}

// ---------------------------------------------------------------------------
// MAIN ENTRY
// ---------------------------------------------------------------------------

export function buildLearningDecision(input: DecisionInput): LearningDecision | null {
  const { scores, needScores, observations, modules, profile } = input;
  const skills = Object.keys(SKILL_LABELS) as AssessmentSkill[];

  // 1) Rank weak skills (same rule the dashboard uses: need > 0, highest first)
  const ranked = skills
    .map((skill) => ({ skill, need: needScores[skill], score: scores[skill] }))
    .filter((s) => s.need > 0)
    .sort((a, b) => b.need - a.need)
    .slice(0, 3);

  if (ranked.length === 0) return null;

  const candidates = modules.filter((m) => MODULE_PROFILES[m.path]);
  const used = new Set<string>();
  const stepsPerPriority = { high: 3, medium: 2, low: 1 } as const;

  // 2) Diagnose + 3) strategy + 4/5) ladder
  const skillPlans: SkillPlan[] = ranked.map((r, i) => {
    const priority: "high" | "medium" | "low" = i === 0 ? "high" : i === 1 ? "medium" : "low";
    const severity = severityOf(r.score);
    const sig = signalsFor(r.skill, observations);
    const strategy = pickStrategy(severity, sig);
    const ladder = LADDER[severity];
    const wanted = stepsPerPriority[priority];
    const steps: RecommendedStep[] = [];

    for (let step = 0; step < wanted; step++) {
      const target = ladder[step];
      const scored = candidates
        .map((m) => scoreModule(m, r.skill, target, strategy, profile))
        .filter((x): x is ScoredModule => x !== null)
        .filter((x) => !steps.some((s) => s.module.path === x.module.path))
        .sort((a, b) => {
          // prefer modules not yet used by another skill, then by score
          const ua = used.has(a.module.path) ? 1 : 0;
          const ub = used.has(b.module.path) ? 1 : 0;
          if (ua !== ub) return ua - ub;
          return b.score - a.score;
        });
      const best = scored[0];
      if (!best) break;
      used.add(best.module.path);
      steps.push({
        module: best.module,
        label: STEP_LABELS[step],
        level: best.profile.level,
        minutes: Math.min(best.profile.minutes, profile.sessionLength),
        score: Math.round(best.score),
        reasons: reasonsFor(best, r.skill, profile, strategy),
      });
    }

    return {
      skill: r.skill,
      skillLabel: SKILL_LABELS[r.skill],
      score: r.score,
      need: r.need,
      priority,
      severity,
      strategy,
      strategyLabel: STRATEGY_COPY[strategy].label,
      strategyTip: STRATEGY_COPY[strategy].tip,
      signals: describeSignals(sig),
      confidence: sig.answered >= 2 ? "high" : "low",
      steps,
    };
  });

  // 6) Fun boost — a motivating, low-pressure module that is NOT already in the plan
  const strongSkills = new Set(
    [...skills].sort((a, b) => scores[b] - scores[a]).slice(0, 2)
  );
  const funPick = candidates
    .filter((m) => !used.has(m.path))
    .map((m) => {
      const p = MODULE_PROFILES[m.path];
      if (p.level === 3 || p.pressure === "social") return null;
      if (!p.ages.includes(profile.ageGroup)) return null;
      const matches = p.styles.filter((s) => profile.preferences.includes(s));
      const primary = (MODULE_SKILL_MAP[m.path] || [])[0];
      const strong = primary && strongSkills.has(primary);
      const score =
        matches.length * W.funPrefMultiplier +
        supportFit(p, profile.supportType) +
        (p.minutes <= profile.sessionLength ? W.session : -6) +
        (strong ? W.funStrengthBonus : 0);
      return { m, p, matches, strong, score };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.score - a.score)[0];

  const funBoost: FunBoost | null = funPick
    ? {
        module: funPick.m,
        minutes: Math.min(funPick.p.minutes, profile.sessionLength),
        reason: funPick.matches.length
          ? `Because ${profile.supportType === "Autism" ? "it is calm and predictable and " : ""}${funPick.matches[0].toLowerCase()} is a favourite`
          : funPick.strong
          ? "Builds on a strength to keep confidence high"
          : "A light, low-pressure way to end the week",
      }
    : null;

  // 7) Weekly rhythm (5 short sessions)
  const focus = skillPlans[0];
  const second = skillPlans[1];
  const third = skillPlans[2];
  const stepOf = (plan: SkillPlan | undefined, i: number) =>
    plan ? plan.steps[i] ?? plan.steps[plan.steps.length - 1] : undefined;

  const dayDefs: { label: string; plan?: SkillPlan; i: number; kind: WeekDay["kind"]; note: string }[] = [
    { label: "Day 1", plan: focus, i: 0, kind: "focus", note: "Gentle start on the top priority" },
    { label: "Day 2", plan: second ?? focus, i: second ? 0 : 1, kind: second ? "support" : "focus", note: second ? "Second weakest skill" : "Build on yesterday" },
    { label: "Day 3", plan: focus, i: 1, kind: "focus", note: "Back to the top priority, slightly harder" },
    { label: "Day 4", plan: third ?? second ?? focus, i: third ? 0 : 1, kind: "support", note: third ? "Third skill — short and light" : "Reinforce and revisit" },
  ];

  const week: WeekDay[] = [];
  for (const d of dayDefs) {
    const step = stepOf(d.plan, d.i);
    if (!step || !d.plan) continue;
    week.push({
      dayLabel: d.label,
      kind: d.kind,
      skill: d.plan.skill,
      module: step.module,
      minutes: step.minutes,
      note: d.note,
    });
  }
  if (funBoost) {
    week.push({
      dayLabel: "Day 5",
      kind: "fun",
      skill: null,
      module: funBoost.module,
      minutes: funBoost.minutes,
      note: "Fun boost — celebrate the week",
    });
  }

  // 8) Decision trace for the "How we decided" panel
  const assessedSkills = skills.filter((s) => needScores[s] >= 0).length;
  const top = skillPlans[0];
  const trace: TraceStep[] = [
    {
      title: "1. Read the signals",
      detail: `${assessedSkills} of 6 skills have answer-level data (score, hints, speed, retries).`,
    },
    {
      title: "2. Find what needs help first",
      detail: `${top.skillLabel} ranks highest (${top.score}% — ${top.severity === "critical" ? "needs intensive support" : top.severity === "support" ? "needs support" : top.severity === "developing" ? "still developing" : "secure but improvable"}).`,
    },
    {
      title: "3. Choose a teaching strategy",
      detail: `"${top.strategyLabel}" — ${top.signals[0].toLowerCase()}.`,
    },
    {
      title: "4. Filter for this child",
      detail: `Age ${profile.ageGroup}, ${profile.supportType} support, ${profile.sessionLength}-minute sessions, interests: ${profile.preferences.slice(0, 3).join(", ")}.`,
    },
    {
      title: "5. Score every dashboard module",
      detail: "Each module earns points for skill match, right difficulty, age/support fit, strategy and interests.",
    },
    {
      title: "6. Build a difficulty ladder",
      detail: "Easier modules first, then step up — high priority gets 3 steps, medium 2, low 1. Plus one fun boost.",
    },
  ];

  return { skillPlans, week, funBoost, trace, weights: WEIGHT_SUMMARY };
}