import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Trophy,
  Target,
  Star,
  CheckCircle2,
  Settings,
  Home,
  Volume2,
  Lightbulb,
  Delete,
  Check,
  Flame,
  Clock,
} from "lucide-react";

import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// =========================================================
// TYPES
// =========================================================

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "direct" | "reverse" | "missing" | "word" | "skip";

interface Question {
  id: string;
  table: number;
  multiplier: number;
  answer: number;
  type: QuestionType;
  prompt: string;
  speechText: string;
  choices?: number[];
  hint: string;
}

// =========================================================
// QUESTION ENGINE
// =========================================================

const rand = (n: number) => Math.floor(Math.random() * n);

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function makeDistractors(correct: number, table: number, multiplier: number): number[] {
  const pool = new Set<number>();
  const deltas = [table, -table, 1, -1, 2, -2, 10, -10];
  for (const d of deltas) {
    const v = correct + d;
    if (v > 0 && v !== correct) pool.add(v);
  }
  pool.add(table * (multiplier + 1));
  pool.add(table * Math.max(1, multiplier - 1));
  pool.delete(correct);
  return shuffle([...pool]).slice(0, 3);
}

function buildChoices(correct: number, table: number, multiplier: number): number[] {
  return shuffle([correct, ...makeDistractors(correct, table, multiplier)]);
}

function pickType(difficulty: Difficulty, index: number): QuestionType {
  if (difficulty === "easy") return "direct";
  if (difficulty === "medium") return index % 3 === 0 ? "reverse" : "direct";
  const cycle: QuestionType[] = ["direct", "reverse", "missing", "word", "skip"];
  return cycle[index % cycle.length];
}

function generateQuestion(
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
      hint = `Count by ${table}: ${Array.from({ length: multiplier }, (_, i) => table * (i + 1)).join(", ")}`;
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
    choices: allowMultipleChoice ? buildChoices(answer, table, multiplier) : undefined,
    hint,
  };
}

function generateSession(
  table: number,
  difficulty: Difficulty,
  questionCount: number,
  allowMultipleChoice: boolean
): Question[] {
  const multipliers = shuffle(Array.from({ length: 12 }, (_, i) => i + 1)).slice(
    0,
    Math.min(questionCount, 12)
  );
  const result: Question[] = [];
  for (let i = 0; i < questionCount; i++) {
    const m = multipliers[i % multipliers.length];
    const type = pickType(difficulty, i);
    result.push(generateQuestion(table, m, type, allowMultipleChoice));
  }
  return result;
}

// =========================================================
// GAME STATE
// =========================================================

interface HistoryItem {
  questionId: string;
  multiplier: number;
  correct: boolean;
  timeMs: number;
  userAnswer: number;
}

interface GameState {
  status: "idle" | "playing" | "finished";
  questions: Question[];
  currentIndex: number;
  history: HistoryItem[];
  score: number;
  streak: number;
  bestStreak: number;
  starsEarned: number;
}

type Action =
  | { type: "START"; questions: Question[] }
  | { type: "ANSWER"; answer: number; timeMs: number }
  | { type: "NEXT" }
  | { type: "RESET" };

const initialState: GameState = {
  status: "idle",
  questions: [],
  currentIndex: 0,
  history: [],
  score: 0,
  streak: 0,
  bestStreak: 0,
  starsEarned: 0,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      return { ...initialState, status: "playing", questions: action.questions };
    case "ANSWER": {
      const q = state.questions[state.currentIndex];
      if (!q) return state;
      const correct = action.answer === q.answer;
      const newStreak = correct ? state.streak + 1 : 0;
      const stars = correct ? Math.max(1, Math.min(3, Math.floor(newStreak / 2) + 1)) : 0;
      return {
        ...state,
        history: [
          ...state.history,
          {
            questionId: q.id,
            multiplier: q.multiplier,
            correct,
            timeMs: action.timeMs,
            userAnswer: action.answer,
          },
        ],
        score: state.score + (correct ? 10 + newStreak * 2 : 0),
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        starsEarned: state.starsEarned + stars,
      };
    }
    case "NEXT": {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, status: "finished" };
      }
      return { ...state, currentIndex: nextIndex };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// =========================================================
// SPEECH HOOK (inlined)
// =========================================================

function useSpeech(enabled: boolean) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!enabled || !supported || !text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.pitch = 1.15;
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    },
    [enabled, supported]
  );

  return { speak };
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function TimesTablesFluency() {
  const [table, setTable] = useState(3);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questionCount, setQuestionCount] = useState(5);
  const [allowMultipleChoice, setAllowMultipleChoice] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showVisual, setShowVisual] = useState(false);

  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"answering" | "feedback">("answering");
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const questionStartRef = useRef<number>(Date.now());
  const { speak } = useSpeech(soundOn);

  const addStars = useGamificationStore((s: any) => s.addStars);
  const [awarded, setAwarded] = useState(false);

  const currentQuestion = state.questions[state.currentIndex] ?? null;
  const progress = state.questions.length
    ? (state.currentIndex / state.questions.length) * 100
    : 0;
  const accuracy = useMemo(() => {
    if (!state.history.length) return 0;
    const c = state.history.filter((h) => h.correct).length;
    return Math.round((c / state.history.length) * 100);
  }, [state.history]);

  // Reset timer on new question
  useEffect(() => {
    if (state.status === "playing" && currentQuestion) {
      questionStartRef.current = Date.now();
    }
  }, [state.currentIndex, state.status, currentQuestion]);

  // Award stars on finish
  useEffect(() => {
    if (state.status === "finished" && !awarded) {
      addStars?.(state.starsEarned);
      setAwarded(true);
    }
    if (state.status !== "finished") setAwarded(false);
  }, [state.status, state.starsEarned, addStars, awarded]);

  // Read question aloud
  useEffect(() => {
    if (state.status === "playing" && currentQuestion && soundOn) {
      speak(currentQuestion.speechText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id, state.status]);

  // Feedback phase auto-advance
  useEffect(() => {
    if (phase === "feedback") {
      const t = setTimeout(() => {
        setPhase("answering");
        setInput("");
        setShowHint(false);
        dispatch({ type: "NEXT" });
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleStart = () => {
    const qs = generateSession(table, difficulty, questionCount, allowMultipleChoice);
    dispatch({ type: "START", questions: qs });
  };

  const handleSubmit = (ans?: number) => {
    if (!currentQuestion || phase !== "answering") return;
    const value = ans ?? parseInt(input, 10);
    if (Number.isNaN(value)) return;
    const timeMs = Date.now() - questionStartRef.current;
    dispatch({ type: "ANSWER", answer: value, timeMs });
    setLastCorrect(value === currentQuestion.answer);
    setPhase("feedback");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (phase !== "answering") return;
    if (e.key === "Enter") handleSubmit();
    if (/^[0-9]$/.test(e.key) && input.length < 3) setInput((v) => v + e.key);
    if (e.key === "Backspace") setInput((v) => v.slice(0, -1));
  };

  // =========================================================
  // SETUP SCREEN
  // =========================================================
  if (state.status === "idle") {
    return (
      <CloudBackground>
        <div className="min-h-screen pb-16">
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✖️</span>
                <span className="font-extrabold text-slate-800">Times Tables</span>
              </div>
              <button
                onClick={() => setSoundOn((v) => !v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold transition",
                  soundOn ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                )}
              >
                {soundOn ? "🔊 Sound On" : "🔇 Muted"}
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto px-4 mt-8"
          >
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl mb-3 inline-block"
              >
                🎯
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
                Times Tables Fluency
              </h1>
              <p className="text-purple-100 mt-2 drop-shadow">
                Master multiplication — one friendly step at a time 💪
              </p>
            </div>

            <div className="rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 p-6 shadow-2xl space-y-6">
              {/* Table selector */}
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/80">
                  Pick a table
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <motion.button
                      key={n}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setTable(n)}
                      className={cn(
                        "flex h-12 items-center justify-center rounded-2xl text-lg font-extrabold shadow-md transition",
                        table === n
                          ? "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white ring-4 ring-white/40"
                          : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
                      )}
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-3 gap-2">
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "rounded-2xl px-3 py-3 text-sm font-bold capitalize transition",
                      difficulty === d
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Question count */}
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white/80">
                  Questions
                </p>
                <div className="flex gap-2">
                  {[5, 10, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={cn(
                        "flex-1 rounded-2xl px-3 py-3 text-sm font-bold transition",
                        questionCount === n
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"
                          : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multiple choice toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-white/80" />
                  <div>
                    <p className="text-sm font-bold text-white">Multiple choice</p>
                    <p className="text-xs text-white/70">Easier tapping, no typing</p>
                  </div>
                </div>
                <button
                  onClick={() => setAllowMultipleChoice((v) => !v)}
                  className={cn(
                    "relative h-7 w-12 rounded-full transition-colors",
                    allowMultipleChoice ? "bg-emerald-400" : "bg-slate-400"
                  )}
                  aria-label="Toggle multiple choice"
                >
                  <motion.span
                    layout
                    className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md"
                    style={{ left: allowMultipleChoice ? "22px" : "2px" }}
                  />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 px-6 py-5 text-xl font-extrabold text-white shadow-2xl"
              >
                <Play className="w-6 h-6" />
                Start Learning
              </motion.button>

              <div className="grid grid-cols-3 gap-3 text-center">
                <InfoPill icon="🧠" text="Adaptive" />
                <InfoPill icon="🔊" text="Read aloud" />
                <InfoPill icon="🎯" text="Hints" />
              </div>
            </div>
          </motion.div>
        </div>
      </CloudBackground>
    );
  }

  // =========================================================
  // FINISHED SCREEN
  // =========================================================
  if (state.status === "finished") {
    const total = state.history.length;
    const correct = state.history.filter((h) => h.correct).length;
    const avgTime =
      state.history.reduce((a, h) => a + h.timeMs, 0) / Math.max(1, total) / 1000;

    return (
      <CloudBackground>
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl border border-white/60"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
                className="text-7xl inline-block"
              >
                🏆
              </motion.div>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-800">
                Amazing work!
              </h2>
              <p className="text-slate-500 mt-1">You finished the session!</p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <ResultStat
                icon={<Target className="w-5 h-5" />}
                label="Score"
                value={state.score}
                color="from-violet-400 to-fuchsia-500"
              />
              <ResultStat
                icon={<CheckCircle2 className="w-5 h-5" />}
                label="Correct"
                value={`${correct}/${total}`}
                color="from-emerald-400 to-teal-500"
              />
              <ResultStat
                icon={<Star className="w-5 h-5" />}
                label="Stars"
                value={state.starsEarned}
                color="from-amber-400 to-orange-500"
              />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 space-y-2 text-sm">
              <Row label="Accuracy" value={`${accuracy}%`} />
              <Row label="Best streak" value={`${state.bestStreak} 🔥`} />
              <Row label="Avg. time" value={`${avgTime.toFixed(1)}s per question`} />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => dispatch({ type: "RESET" })}
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 hover:bg-slate-200 transition"
              >
                <Settings className="w-5 h-5" />
                Change setup
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "RESET" });
                  setTimeout(handleStart, 50);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-bold text-white shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Play again
              </button>
            </div>

            <Link
              to="/dashboard"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700"
            >
              <Home className="w-4 h-4" /> Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </CloudBackground>
    );
  }

  // =========================================================
  // PLAYING SCREEN
  // =========================================================
  const showMultipleChoice =
    allowMultipleChoice && phase === "answering" && currentQuestion?.choices;

  return (
    <CloudBackground>
      <div className="min-h-screen pb-24" onKeyDown={handleKey} tabIndex={0}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Quit</span>
            </button>

            <div className="flex items-center gap-2">
              {state.streak > 0 && (
                <motion.div
                  key={state.streak}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 shadow-lg"
                >
                  <Flame className="w-4 h-4 text-yellow-200 fill-yellow-300" />
                  <span className="text-sm font-extrabold text-white tabular-nums">
                    {state.streak}
                  </span>
                </motion.div>
              )}
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-200">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-amber-700">
                  {state.starsEarned}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                {state.currentIndex + 1}/{state.questions.length}
              </span>
              <ProgressRing progress={progress} size={44} stroke={5} color="#8b5cf6">
                <span className="text-[10px] font-bold text-slate-700">
                  {Math.round(progress)}%
                </span>
              </ProgressRing>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto px-4 pt-6 space-y-5">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-bold text-white border border-white/30">
              <Trophy className="w-4 h-4" />
              Table of {table} · {difficulty}
            </span>
          </div>

          {/* Question card */}
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative w-full rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border border-white/60"
            >
              <button
                onClick={() => speak(currentQuestion.speechText)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition"
                aria-label="Read question aloud"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {currentQuestion.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" /> Table of {currentQuestion.table}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 text-center leading-tight py-6">
                {currentQuestion.prompt}
              </h2>

              {showMultipleChoice && (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {currentQuestion.choices!.map((c) => (
                    <motion.button
                      key={c}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSubmit(c)}
                      disabled={phase !== "answering"}
                      className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 px-4 py-5 text-2xl font-extrabold text-slate-800 hover:border-violet-400 hover:from-violet-50 hover:to-fuchsia-50 transition disabled:opacity-50"
                    >
                      {c}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Feedback */}
          <div className="h-14 flex items-center justify-center">
            <AnimatePresence>
              {phase === "feedback" && lastCorrect !== null && (
                <motion.div
                  key={String(lastCorrect) + Date.now()}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "rounded-2xl px-5 py-3 text-base font-extrabold shadow-xl",
                    lastCorrect
                      ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white"
                      : "bg-gradient-to-r from-amber-300 to-orange-400 text-white"
                  )}
                >
                  {lastCorrect ? "Awesome! 🎉" : "Almost! Try again 💛"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Visual */}
          <AnimatePresence>
            {showVisual && currentQuestion && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/25 p-5 overflow-hidden"
              >
                <MultiplicationGrid
                  table={currentQuestion.table}
                  multiplier={currentQuestion.multiplier}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          <AnimatePresence>
            {showHint && currentQuestion && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl bg-amber-100 border border-amber-300 px-4 py-3 text-center text-sm font-bold text-amber-800"
              >
                💡 {currentQuestion.hint}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Type input if not multiple-choice */}
          {!showMultipleChoice && (
            <>
              <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-4 shadow-xl border border-white/60">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your answer
                  </p>
                  <p className="text-5xl font-extrabold text-slate-800 tabular-nums min-h-[60px] leading-[60px]">
                    {input || "—"}
                  </p>
                </div>
              </div>

              <NumberPad
                value={input}
                onChange={setInput}
                onSubmit={() => handleSubmit()}
                onHint={() => {
                  setShowHint(true);
                  setShowVisual(true);
                }}
                disabled={phase !== "answering"}
              />
            </>
          )}

          {/* Helper buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowVisual((v) => !v)}
              className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-xs font-bold text-white hover:bg-white/30 transition"
            >
              {showVisual ? "Hide" : "Show"} visual 🟦
            </button>
            {showMultipleChoice && (
              <button
                onClick={() => setShowHint((v) => !v)}
                className="rounded-full bg-amber-400/30 backdrop-blur-sm border border-amber-200/50 px-4 py-2 text-xs font-bold text-white hover:bg-amber-400/40 transition"
              >
                💡 Hint
              </button>
            )}
          </div>
        </div>
      </div>
    </CloudBackground>
  );
}

// =========================================================
// SUB-COMPONENTS (inlined)
// =========================================================

function InfoPill({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/15 border border-white/25 px-3 py-2">
      <div className="text-xl">{icon}</div>
      <div className="text-xs font-bold text-white mt-0.5">{text}</div>
    </div>
  );
}

function ResultStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center">
      <div
        className={cn(
          "mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
          color
        )}
      >
        {icon}
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="text-lg font-extrabold text-slate-800">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}

function ProgressRing({
  progress,
  size = 88,
  stroke = 8,
  color = "#22c55e",
  children,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function NumberPad({
  value,
  onChange,
  onSubmit,
  onHint,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onHint: () => void;
  disabled?: boolean;
}) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const press = (k: string) => {
    if (disabled) return;
    if (value.length >= 3) return;
    onChange(value + k);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.slice(0, 9).map((k) => (
        <PadKey key={k} label={k} onClick={() => press(k)} disabled={disabled} />
      ))}

      <PadKey
        label={<Lightbulb className="w-6 h-6" />}
        onClick={onHint}
        disabled={disabled}
        variant="hint"
      />
      <PadKey label="0" onClick={() => press("0")} disabled={disabled} />
      <PadKey
        label={<Delete className="w-6 h-6" />}
        onClick={() => onChange(value.slice(0, -1))}
        disabled={disabled || !value}
        variant="del"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onSubmit}
        disabled={disabled || !value}
        className="col-span-3 mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg disabled:opacity-40"
      >
        <Check className="w-6 h-6" />
        Check Answer
      </motion.button>
    </div>
  );
}

function PadKey({
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "hint" | "del";
}) {
  const styles = {
    default: "bg-white text-slate-800 hover:bg-slate-50 border-slate-200",
    hint: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    del: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
  };
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-16 items-center justify-center rounded-2xl border text-2xl font-extrabold shadow-sm transition disabled:opacity-40",
        styles[variant]
      )}
    >
      {label}
    </motion.button>
  );
}

function MultiplicationGrid({
  table,
  multiplier,
}: {
  table: number;
  multiplier: number;
}) {
  const total = Math.min(table * multiplier, 144);
  const cols = table;
  const rows = multiplier;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-bold uppercase tracking-wider text-white/70">
        Visual: {multiplier} rows × {table} per row
      </p>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.012, type: "spring", stiffness: 400 }}
            className="h-3.5 w-3.5 rounded-full shadow-sm bg-gradient-to-br from-cyan-300 to-blue-500"
          />
        ))}
      </div>
      <p className="text-2xl font-extrabold text-white">
        {rows} × {cols} = <span className="text-yellow-300">{table * multiplier}</span>
      </p>
    </div>
  );
}