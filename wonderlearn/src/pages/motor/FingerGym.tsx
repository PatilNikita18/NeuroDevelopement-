// src/pages/motor/FingerGym.tsx

import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Star,
  Trophy,
  RotateCcw,
  Hand,
} from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

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
// TYPES
// =========================================================

interface Target {
  id: number;
  x: number; // %
  y: number; // %
  bornAt: number;
}

const TARGET_LIFETIME = 2500; // ms each target lives
const SPAWN_INTERVAL = 900; // ms between spawns
const TARGETS_TO_WIN = 15;

// =========================================================
// MAIN
// =========================================================

export default function FingerGym() {
  const navigate = useNavigate();
  const addStars = useGamificationStore((s) => s.addStars);

  const [targets, setTargets] = useState<Target[]>([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const nextIdRef = useRef(1);

  // Spawn targets
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTargets((prev) => {
        if (prev.length >= 3) return prev;
        return [
          ...prev,
          {
            id: nextIdRef.current++,
            x: 15 + Math.random() * 70,
            y: 15 + Math.random() * 70,
            bornAt: Date.now(),
          },
        ];
      });
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Remove expired targets
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setTargets((prev) => prev.filter((t) => now - t.bornAt < TARGET_LIFETIME));
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Win condition
  useEffect(() => {
    if (hits >= TARGETS_TO_WIN && !showCelebration) {
      setIsPlaying(false);
      setShowCelebration(true);
      try {
        addStars(15);
      } catch {
        /* ignore */
      }
      localStorage.setItem(
        "motor-skills-completed",
        JSON.stringify(["finger-gym"])
      );
    }
  }, [hits, showCelebration, addStars]);

  const hitTarget = (id: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setHits((h) => h + 1);
  };

  const start = () => {
    setTargets([]);
    setHits(0);
    setMisses(0);
    setIsPlaying(true);
    setShowCelebration(false);
  };

  const restart = () => {
    setTargets([]);
    setHits(0);
    setMisses(0);
    setIsPlaying(false);
    setShowCelebration(false);
  };

  const missClick = () => {
    if (isPlaying) setMisses((m) => m + 1);
  };

  const progress = Math.min(100, (hits / TARGETS_TO_WIN) * 100);

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
                Finger Gym
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold">
                Tap the bubbles! 🫧
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-2 border border-amber-400/50">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="text-sm font-extrabold text-amber-200">
                {hits}
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-3">
            <div className="h-2 rounded-full bg-purple-950/60 border border-purple-400/30 overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              />
            </div>
          </div>
        </motion.header>

        {/* MAIN */}
        <div className="max-w-3xl mx-auto px-3 sm:px-4 mt-6">
          <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 p-4 mb-4 flex items-center gap-3">
            <Hand className="w-6 h-6 text-cyan-300 shrink-0" />
            <p className="text-sm text-purple-100">
              <strong>Tap each bubble</strong> before it disappears. Aim for{" "}
              <strong>{TARGETS_TO_WIN} hits</strong> to win!
            </p>
          </div>

          <div className="relative aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1e1b4b]/95 to-[#0f0a2e]/95 border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.35)]">
            {/* Background stars */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: "0 0 4px 1px rgba(255,255,255,0.6)",
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}

            {/* Targets */}
            <AnimatePresence>
              {targets.map((target) => (
                <motion.button
                  key={target.id}
                  type="button"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.3 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => hitTarget(target.id)}
                  className="absolute flex items-center justify-center rounded-full cursor-pointer"
                  style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    width: "clamp(60px, 15vw, 100px)",
                    height: "clamp(60px, 15vw, 100px)",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span
                    className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.7)] text-3xl"
                    style={{
                      animation: "pulse-bubble 1.5s ease-in-out infinite",
                    }}
                  >
                    🫧
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Overlay: Start / End */}
            {!isPlaying && !showCelebration && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={missClick}
              >
                <div className="text-center px-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    👆
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-white mb-3">
                    Ready to Tap?
                  </h2>
                  <p className="text-sm text-purple-200/85 mb-6 max-w-sm mx-auto">
                    Bubbles will appear. Tap each one before it pops! Try to hit{" "}
                    {TARGETS_TO_WIN} bubbles.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      start();
                    }}
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-extrabold text-white text-lg shadow-[0_0_30px_rgba(59,130,246,0.6)] border-2 border-cyan-300/40 hover:brightness-110 transition"
                  >
                    <Sparkles className="w-5 h-5 inline mr-2" />
                    Start Tapping
                  </button>
                </div>
              </div>
            )}

            {/* HUD */}
            {isPlaying && (
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 border border-emerald-400/40">
                  <span className="text-xs font-bold text-emerald-200">
                    HITS: {hits} / {TARGETS_TO_WIN}
                  </span>
                </div>
                <div className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 border border-rose-400/40">
                  <span className="text-xs font-bold text-rose-200">
                    MISSES: {misses}
                  </span>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-purple-300/70 mt-4">
            🎯 Focus on the bubble and tap gently. Practice makes perfect!
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
                  className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.8)]"
                >
                  <Trophy className="w-12 h-12 text-amber-300" />
                </motion.div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                  Finger Master! 🎉
                </h2>
                <p className="text-base text-purple-100 mb-6">
                  You hit <strong className="text-amber-300">{hits}</strong>{" "}
                  bubbles and earned <strong className="text-amber-300">15 stars</strong>!
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/motor")}
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-cyan-300/40 hover:brightness-110 transition"
                  >
                    Back to Motor Skills
                  </button>
                  <button
                    onClick={restart}
                    className="rounded-2xl bg-purple-500/20 border-2 border-purple-400/40 px-6 py-3 font-bold text-purple-100 hover:bg-purple-500/30 transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes pulse-bubble {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `}</style>
      </div>
    </div>
  );
}