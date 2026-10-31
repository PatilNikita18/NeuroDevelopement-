import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sword, Heart, Clock, Star, Zap, ArrowLeft, Trophy,
  Flame, Coins, CheckCircle2, XCircle, Sparkles,
  Brain, Target, Award, Dog, TrendingUp, Timer,
} from "lucide-react";

import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// ------------------------------------------------------------------
// TYPES
// ------------------------------------------------------------------
type Difficulty = "Easy" | "Medium" | "Hard";
type Operation = "+" | "-" | "×" | "÷";

interface Question {
  id: number;
  text: string;
  answer: number;
  options: number[];
  operation: Operation;
}

interface BattleConfig {
  difficulty: Difficulty;
  questionCount: number;
  timePerQuestion: number; // seconds
  maxHearts: number;
}

const CONFIGS: Record<Difficulty, BattleConfig> = {
  Easy:   { difficulty: "Easy",   questionCount: 10, timePerQuestion: 15, maxHearts: 3 },
  Medium: { difficulty: "Medium", questionCount: 12, timePerQuestion: 12, maxHearts: 3 },
  Hard:   { difficulty: "Hard",   questionCount: 15, timePerQuestion: 8,  maxHearts: 2 },
};

// ------------------------------------------------------------------
// QUESTION GENERATOR
// ------------------------------------------------------------------
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(
  id: number,
  difficulty: Difficulty
): Question {
  const ranges: Record<Difficulty, [number, number]> = {
    Easy:   [1, 10],
    Medium: [2, 20],
    Hard:   [5, 50],
  };
  const [min, max] = ranges[difficulty];

  const ops: Operation[] =
    difficulty === "Easy" ? ["+", "-"] : ["+", "-", "×", "÷"];
  const op = ops[randInt(0, ops.length - 1)];

  let a = randInt(min, max);
  let b = randInt(min, max);
  let answer = 0;

  switch (op) {
    case "+": answer = a + b; break;
    case "-":
      if (a < b) [a, b] = [b, a];
      answer = a - b;
      break;
    case "×":
      a = randInt(1, difficulty === "Hard" ? 12 : 9);
      b = randInt(1, difficulty === "Hard" ? 12 : 9);
      answer = a * b;
      break;
    case "÷":
      b = randInt(1, 9);
      answer = randInt(1, 9);
      a = b * answer;
      break;
  }

  // Build 3 distractors near the correct answer
  const optionSet = new Set<number>([answer]);
  while (optionSet.size < 4) {
    const offset = randInt(-5, 5) || 3;
    const candidate = answer + offset;
    if (candidate > 0) optionSet.add(candidate);
  }
  const options = Array.from(optionSet).sort(() => Math.random() - 0.5);

  return {
    id,
    text: `${a} ${op} ${b}`,
    answer,
    options,
    operation: op,
  };
}

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
export default function MathBattle() {
  const [phase, setPhase] = useState<
    "config" | "battle" | "results"
  >("config");
  const [config, setConfig] = useState<BattleConfig>(CONFIGS.Easy);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(config.maxHearts);
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion);
  const [combo, setCombo] = useState(0);

  const gamification = useGamificationStore();

  // ------------------------------------------------------------------
  // START BATTLE
  // ------------------------------------------------------------------
  const startBattle = (diff: Difficulty) => {
    const cfg = CONFIGS[diff];
    const qs = Array.from({ length: cfg.questionCount }, (_, i) =>
      generateQuestion(i + 1, diff)
    );
    setConfig(cfg);
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setHearts(cfg.maxHearts);
    setTimeLeft(cfg.timePerQuestion);
    setCombo(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase("battle");
  };

  // ------------------------------------------------------------------
  // TIMER PER QUESTION
  // ------------------------------------------------------------------
  useEffect(() => {
    if (phase !== "battle") return;
    if (isCorrect !== null) return; // paused while showing feedback

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, isCorrect]);

  const handleTimeout = useCallback(() => {
    setIsCorrect(false);
    setHearts((h) => h - 1);
    setCombo(0);
    setTimeout(() => nextQuestion(false), 900);
  }, []);

  // ------------------------------------------------------------------
  // ANSWER
  // ------------------------------------------------------------------
  const handleAnswer = (option: number) => {
    if (isCorrect !== null) return;
    const q = questions[currentIndex];
    const correct = option === q.answer;

    setSelected(option);
    setIsCorrect(correct);

    if (correct) {
      const base = config.difficulty === "Easy" ? 3 :
                   config.difficulty === "Medium" ? 5 : 8;
      const speedBonus = Math.max(0, timeLeft - 5);
      setCombo((c) => c + 1);
      setScore((s) => s + base + speedBonus + combo);
    } else {
      setHearts((h) => h - 1);
      setCombo(0);
    }

    setTimeout(() => nextQuestion(correct), 900);
  };

  // ------------------------------------------------------------------
  // NEXT QUESTION / END
  // ------------------------------------------------------------------
  const nextQuestion = (wasCorrect: boolean) => {
    const newHearts =
      hearts - (wasCorrect ? 0 : 1);

    if (newHearts <= 0 || currentIndex + 1 >= questions.length) {
      finishBattle(wasCorrect);
      return;
    }

    setCurrentIndex((i) => i + 1);
    setSelected(null);
    setIsCorrect(null);
    setTimeLeft(config.timePerQuestion);
  };

  const finishBattle = (lastCorrect: boolean) => {
    const finalHearts = hearts - (lastCorrect ? 0 : 1);
    const isVictory = finalHearts > 0;

    const starsEarned = Math.round(score / 10) + (isVictory ? 5 : 0);
    const coinsEarned = starsEarned * 10;

    // ⭐ THIS is where streak/coins/stars/progress update
    gamification.recordActivity({
      stars: starsEarned,
      coins: coinsEarned,
      challenges: 1,
    });

    setPhase("results");
  };

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <CloudBackground>
      <div className="min-h-screen">
        <TopBar />
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            {phase === "config" && (
              <ConfigScreen key="config" onStart={startBattle} />
            )}
            {phase === "battle" && (
              <BattleScreen
                key="battle"
                question={questions[currentIndex]}
                index={currentIndex}
                total={questions.length}
                score={score}
                hearts={hearts}
                maxHearts={config.maxHearts}
                timeLeft={timeLeft}
                maxTime={config.timePerQuestion}
                combo={combo}
                selected={selected}
                isCorrect={isCorrect}
                onAnswer={handleAnswer}
              />
            )}
            {phase === "results" && (
              <ResultsScreen
                key="results"
                score={score}
                total={questions.length}
                starsEarned={Math.round(score / 10) + (hearts > 0 ? 5 : 0)}
                coinsEarned={(Math.round(score / 10) + (hearts > 0 ? 5 : 0)) * 10}
                victory={hearts > 0}
                onPlayAgain={() => setPhase("config")}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </CloudBackground>
  );
}

// ==================================================================
// TOP BAR — reused look from Dashboard
// ==================================================================
function TopBar() {
  const g = useGamificationStore();
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-lg font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            LearnWorld
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">{g.stars}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 border border-orange-200">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-700">{g.streakDays}d</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ==================================================================
// CONFIG SCREEN — pick difficulty
// ==================================================================
function ConfigScreen({ onStart }: { onStart: (d: Difficulty) => void }) {
  const cards: { d: Difficulty; emoji: string; desc: string; gradient: string }[] = [
    { d: "Easy",   emoji: "🌱", desc: "10 questions • 15s each • + and −", gradient: "from-emerald-400 to-teal-500" },
    { d: "Medium", emoji: "⚔️", desc: "12 questions • 12s each • all operations", gradient: "from-amber-400 to-orange-500" },
    { d: "Hard",   emoji: "🔥", desc: "15 questions • 8s each • 2 hearts only", gradient: "from-rose-500 to-red-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <Sword className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">Math Battle</h1>
            <p className="text-sm text-purple-100">Solve fast. Beat the clock. Earn stars.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.button
            key={c.d}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(c.d)}
            className="rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 p-6 text-left shadow-xl hover:shadow-2xl transition-all"
          >
            <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl text-3xl bg-gradient-to-br shadow-lg", c.gradient)}>
              {c.emoji}
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-white">{c.d}</h3>
            <p className="mt-1 text-sm text-white/80">{c.desc}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-white">
              Start <Zap className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ==================================================================
// BATTLE SCREEN — the actual question UI
// ==================================================================
function BattleScreen(props: {
  question: Question;
  index: number;
  total: number;
  score: number;
  hearts: number;
  maxHearts: number;
  timeLeft: number;
  maxTime: number;
  combo: number;
  selected: number | null;
  isCorrect: boolean | null;
  onAnswer: (n: number) => void;
}) {
  const {
    question, index, total, score, hearts, maxHearts,
    timeLeft, maxTime, combo, selected, isCorrect, onAnswer,
  } = props;

  const progressPct = ((index) / total) * 100;
  const timerPct = (timeLeft / maxTime) * 100;
  const timerColor =
    timerPct > 60 ? "from-emerald-400 to-teal-500"
    : timerPct > 30 ? "from-amber-400 to-orange-500"
    : "from-rose-500 to-red-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      {/* HUD */}
      <div className="rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 p-5 shadow-xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Hearts */}
          <div className="flex items-center gap-1">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "w-5 h-5 transition",
                  i < hearts ? "text-rose-500 fill-rose-500" : "text-white/30"
                )}
              />
            ))}
          </div>

          {/* Combo */}
          {combo > 1 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-extrabold text-white shadow-lg"
            >
              <Flame className="w-3.5 h-3.5" />
              {combo}x COMBO
            </motion.div>
          )}

          {/* Score */}
          <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 border border-white/30">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-sm font-extrabold text-white">{score}</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/80" />
            <span className="text-sm font-bold text-white tabular-nums w-8">{timeLeft}s</span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="mt-3 h-2 w-full rounded-full bg-white/20 overflow-hidden">
          <motion.div
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 0.3 }}
            className={cn("h-full rounded-full bg-gradient-to-r", timerColor)}
          />
        </div>

        {/* Progress */}
        <div className="mt-3 flex items-center justify-between text-xs text-white/80">
          <span>Question {index + 1} of {total}</span>
          <span>{Math.round(progressPct)}% complete</span>
        </div>
      </div>

      {/* QUESTION CARD */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 backdrop-blur-xl border border-white/30 p-8 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 text-white border border-white/30">
            <Brain className="w-5 h-5" />
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            Solve it!
          </p>
        </div>

        <motion.h2
          key={question.text}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center text-5xl sm:text-7xl font-black text-white drop-shadow-2xl tabular-nums"
        >
          {question.text}
        </motion.h2>
      </motion.div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((opt) => {
          const isSel = selected === opt;
          const showCorrect = isCorrect !== null && opt === question.answer;
          const showWrong = isCorrect === false && isSel;

          return (
            <motion.button
              key={opt}
              whileHover={isCorrect === null ? { scale: 1.03, y: -3 } : {}}
              whileTap={isCorrect === null ? { scale: 0.97 } : {}}
              onClick={() => onAnswer(opt)}
              disabled={isCorrect !== null}
              className={cn(
                "relative rounded-3xl border p-6 text-3xl font-black shadow-xl transition-all",
                "backdrop-blur-xl",
                showCorrect
                  ? "bg-emerald-500/40 border-emerald-300 text-white ring-4 ring-emerald-400/50"
                  : showWrong
                  ? "bg-rose-500/40 border-rose-300 text-white ring-4 ring-rose-400/50"
                  : "bg-white/15 border-white/25 text-white hover:bg-white/25"
              )}
            >
              {opt}

              {showCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg border-2 border-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.span>
              )}

              {showWrong && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 shadow-lg border-2 border-white"
                >
                  <XCircle className="w-4 h-4 text-white" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ==================================================================
// RESULTS SCREEN — shows earned stars
// ==================================================================
function ResultsScreen({
  score, total, starsEarned, coinsEarned, victory, onPlayAgain,
}: {
  score: number;
  total: number;
  starsEarned: number;
  coinsEarned: number;
  victory: boolean;
  onPlayAgain: () => void;
}) {
  const g = useGamificationStore();

  // star rating out of 3 for the visual
  const rating = victory
    ? starsEarned >= 60 ? 3 : starsEarned >= 30 ? 2 : 1
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 backdrop-blur-xl border border-white/30 p-8 shadow-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl"
        >
          {victory ? (
            <Trophy className="w-12 h-12 text-white" />
          ) : (
            <Target className="w-12 h-12 text-white" />
          )}
        </motion.div>

        <h1 className="mt-5 text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
          {victory ? "Victory!" : "Good Try!"}
        </h1>
        <p className="mt-2 text-white/85">
          You answered {Math.round((score / (total * 8)) * 100)}% correctly
        </p>

        {/* Star rating */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + n * 0.15, type: "spring" }}
            >
              <Star
                className={cn(
                  "w-12 h-12 drop-shadow-lg",
                  n <= rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-white/25"
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Rewards */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <RewardTile
            icon={<Star className="w-6 h-6" />}
            value={`+${starsEarned}`}
            label="Stars"
            gradient="from-amber-400 to-yellow-500"
          />
          <RewardTile
            icon={<Coins className="w-6 h-6" />}
            value={`+${coinsEarned}`}
            label="Coins"
            gradient="from-yellow-400 to-orange-500"
          />
          <RewardTile
            icon={<Flame className="w-6 h-6" />}
            value={`${g.streakDays}d`}
            label="Streak"
            gradient="from-orange-400 to-red-500"
          />
        </div>
      </div>

      {/* Live stats from store — the same 4 cards from Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MiniStat icon={<Flame className="w-5 h-5" />} label="Streak" value={`${g.streakDays} days`} gradient="from-orange-400 to-red-500" />
        <MiniStat icon={<Coins className="w-5 h-5" />} label="Coins" value={g.coins} gradient="from-amber-400 to-yellow-500" />
        <MiniStat icon={<Star className="w-5 h-5" />} label="Stars" value={g.stars} gradient="from-purple-400 to-pink-500" />
        <MiniStat icon={<Dog className="w-5 h-5" />} label="Pets" value={g.badgesUnlocked} gradient="from-blue-400 to-cyan-500" />
      </div>

      {/* Learning progress bar — now driven by store */}
      <div className="rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-white text-base">Learning Progress</h3>
              <p className="text-xs text-white/70">
                {g.challengesCompleted}/{g.totalChallenges} challenges completed
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-white">
            {Math.round((g.challengesCompleted / g.totalChallenges) * 100)}%
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/20 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(g.challengesCompleted / g.totalChallenges) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
          />
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            {g.challengesCompleted} done
          </span>
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-amber-300" />
            {g.totalChallenges - g.challengesCompleted} remaining
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onPlayAgain}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-extrabold text-slate-800 shadow-2xl hover:scale-[1.02] transition"
        >
          <Zap className="w-5 h-5" />
          Play Again
        </button>
        <Link
          to="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white/20 backdrop-blur border border-white/30 px-6 py-4 font-extrabold text-white hover:bg-white/30 transition"
        >
          <Award className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Small helpers
// ------------------------------------------------------------------
function RewardTile({
  icon, value, label, gradient,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur border border-white/25 p-3 text-center">
      <div className={cn("mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md", gradient)}>
        {icon}
      </div>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
      <p className="text-[11px] text-white/70 font-semibold uppercase">{label}</p>
    </div>
  );
}

function MiniStat({
  icon, label, value, gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm shrink-0", gradient)}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-white/70 truncate">{label}</p>
          <p className="text-lg font-bold text-white truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}