// src/pages/motor/MovementBreak.tsx

import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Star,
  Trophy,
  Footprints,
  ChevronRight,
} from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// =========================================================
// EXERCISES
// =========================================================

interface Exercise {
  id: string;
  emoji: string;
  name: string;
  instruction: string;
  seconds: number;
  gradient: string;
}

const EXERCISES: Exercise[] = [
  {
    id: "jump",
    emoji: "🦘",
    name: "Jump in Place",
    instruction: "Jump up and down gently. Count with me!",
    seconds: 15,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "clap",
    emoji: "👏",
    name: "Clap Your Hands",
    instruction: "Clap your hands together to a rhythm.",
    seconds: 15,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "stretch",
    emoji: "🙆",
    name: "Reach for the Sky",
    instruction: "Stretch your arms up high like a tree!",
    seconds: 15,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "balance",
    emoji: "🦩",
    name: "Stand on One Foot",
    instruction: "Lift one foot and balance. Switch sides!",
    seconds: 15,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "march",
    emoji: "🎖️",
    name: "March in Place",
    instruction: "March with high knees like a soldier!",
    seconds: 15,
    gradient: "from-sky-500 to-blue-600",
  },
];

// =========================================================
// SPACE BACKGROUND
// =========================================================

function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0b0720_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[120px]" />
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

// =========================================================
// MAIN
// =========================================================

export default function MovementBreak() {
  const navigate = useNavigate();
  const addStars = useGamificationStore((s) => s.addStars);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(EXERCISES[0].seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const current = EXERCISES[index];
  const progress = ((index + (isRunning || completed.includes(current.id) ? 1 : 0)) / EXERCISES.length) * 100;

  // Timer
  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft <= 0) {
      // Exercise complete
      if (!completed.includes(current.id)) {
        const next = [...completed, current.id];
        setCompleted(next);
        try {
          addStars(4);
        } catch {
          /* ignore */
        }

        localStorage.setItem(
          "motor-skills-completed",
          JSON.stringify(
            Array.from(new Set([...next.map(() => "movement-break"), "movement-break"]))
          )
        );

        if (index === EXERCISES.length - 1) {
          setTimeout(() => setShowCelebration(true), 500);
        }
      }
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isRunning, secondsLeft, current.id, index, completed, addStars]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(current.seconds);
  };

  const nextExercise = () => {
    if (index < EXERCISES.length - 1) {
      setIndex((i) => i + 1);
      setSecondsLeft(EXERCISES[index + 1].seconds);
      setIsRunning(false);
    }
  };

  const restartAll = () => {
    setIndex(0);
    setSecondsLeft(EXERCISES[0].seconds);
    setIsRunning(false);
    setCompleted([]);
    setShowCelebration(false);
  };

  const isExerciseDone = completed.includes(current.id);

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10 min-h-screen pb-16">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 bg-[#0b0720]/80 backdrop-blur-xl border-b border-purple-500/25"
        >
          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/motor")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg border border-purple-400/40 hover:scale-105 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Movement Break
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold">
                {index + 1} of {EXERCISES.length} exercises
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-2 border border-amber-400/50">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="text-sm font-extrabold text-amber-200">
                {completed.length * 4}
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-3">
            <div className="h-2 rounded-full bg-purple-950/60 border border-purple-400/30 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"
              />
            </div>
          </div>
        </motion.header>

        {/* MAIN */}
        <div className="max-w-2xl mx-auto px-3 sm:px-4 mt-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/95 to-[#0f0a2e]/95 border-2 border-purple-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.35)]">
            {/* Exercise info */}
            <div className="text-center mb-6">
              <motion.div
                animate={
                  isRunning
                    ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 1, repeat: Infinity }}
                className={cn(
                  "mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-[0_0_50px_rgba(168,85,247,0.5)] text-6xl",
                  current.gradient
                )}
              >
                {current.emoji}
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {current.name}
              </h2>
              <p className="text-base text-purple-200/85 mb-4">
                {current.instruction}
              </p>

              {/* Timer circle */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(168,85,247,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#timerGrad)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(secondsLeft / current.seconds) * 264} 264`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.5s" }}
                  />
                  <defs>
                    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#67e8f9" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-white tabular-nums">
                    {secondsLeft}
                  </span>
                  <span className="text-xs font-bold text-purple-300 uppercase">
                    seconds
                  </span>
                </div>
              </div>

              {isExerciseDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/25 px-4 py-2 border border-emerald-400/50 mb-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm font-bold text-emerald-200">
                    Exercise Complete!
                  </span>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!isRunning && !isExerciseDone && secondsLeft > 0 && (
                <button
                  onClick={start}
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-emerald-300/40 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white" /> Start
                </button>
              )}
              {isRunning && (
                <button
                  onClick={pause}
                  className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-amber-300/40 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" /> Pause
                </button>
              )}
              <button
                onClick={reset}
                className="rounded-2xl bg-purple-500/20 border-2 border-purple-400/40 px-6 py-4 font-bold text-purple-100 hover:bg-purple-500/30 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Reset
              </button>

              {isExerciseDone && index < EXERCISES.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextExercise}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-cyan-300/40 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  Next Exercise <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}

              {isExerciseDone && index === EXERCISES.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setShowCelebration(true)}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-cyan-300/40 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" /> See Results
                </motion.button>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-purple-300/70 mt-4">
            🌟 Move at your own pace. Take breaks whenever you need!
          </p>
        </div>

        {/* CELEBRATION */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative w-full max-w-md rounded-[2rem] bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95] border-2 border-purple-400/50 p-8 text-center shadow-[0_0_80px_rgba(168,85,247,0.6)]"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 shadow-[0_0_50px_rgba(251,191,36,0.8)]"
                >
                  <Trophy className="w-12 h-12 text-amber-300" />
                </motion.div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-2">
                  Body Break Done! 💪
                </h2>
                <p className="text-base text-purple-100 mb-6">
                  You moved your body through {EXERCISES.length} exercises and earned{" "}
                  <strong className="text-amber-300">
                    {completed.length * 4} stars
                  </strong>
                  !
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/motor")}
                    className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-amber-300/40 hover:brightness-110 transition"
                  >
                    Back to Motor Skills
                  </button>
                  <button
                    onClick={restartAll}
                    className="rounded-2xl bg-purple-500/20 border-2 border-purple-400/40 px-6 py-3 font-bold text-purple-100 hover:bg-purple-500/30 transition"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}