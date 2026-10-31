// src/pages/motor/BallCatch.tsx

import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Star,
  Trophy,
  Play,
  Target,
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

interface Ball {
  id: number;
  x: number; // %
  y: number; // % (top)
  speed: number; // % per tick
  emoji: string;
}

const BALLS_TO_CATCH = 10;
const BALL_EMOJIS = ["⚽", "🏀", "🎾", "⭐", "🎈"];

// =========================================================
// MAIN
// =========================================================

export default function BallCatch() {
  const navigate = useNavigate();
  const addStars = useGamificationStore((s) => s.addStars);

  const [balls, setBalls] = useState<Ball[]>([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const nextIdRef = useRef(1);
  const basketXRef = useRef(50); // %
  const [basketX, setBasketX] = useState(50);

  // Spawn balls
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBalls((prev) => [
        ...prev,
        {
          id: nextIdRef.current++,
          x: 10 + Math.random() * 80,
          y: -5,
          speed: 0.8 + Math.random() * 0.5,
          emoji: BALL_EMOJIS[Math.floor(Math.random() * BALL_EMOJIS.length)],
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animate balls
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBalls((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + b.speed }))
          .filter((b) => {
            if (b.y >= 85) {
              const distanceToBasket = Math.abs(b.x - basketXRef.current);
              if (distanceToBasket < 12) {
                setCaught((c) => c + 1);
                return false;
              } else {
                setMissed((m) => m + 1);
                return false;
              }
            }
            return true;
          })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update basket ref when state changes
  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  // Win condition
  useEffect(() => {
    if (caught >= BALLS_TO_CATCH && !showCelebration) {
      setIsPlaying(false);
      setShowCelebration(true);
      try {
        addStars(20);
      } catch {
        /* ignore */
      }
      localStorage.setItem(
        "motor-skills-completed",
        JSON.stringify(["ball-catch"])
      );
    }
  }, [caught, showCelebration, addStars]);

  // Move basket with pointer / arrow keys
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, x)));
  };

  useEffect(() => {
    if (!isPlaying) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setBasketX((x) => Math.max(8, x - 5));
      } else if (e.key === "ArrowRight") {
        setBasketX((x) => Math.min(92, x + 5));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying]);

  const start = () => {
    setBalls([]);
    setCaught(0);
    setMissed(0);
    setBasketX(50);
    setIsPlaying(true);
    setShowCelebration(false);
  };

  const restart = () => {
    setBalls([]);
    setCaught(0);
    setMissed(0);
    setBasketX(50);
    setIsPlaying(false);
    setShowCelebration(false);
  };

  const progress = Math.min(100, (caught / BALLS_TO_CATCH) * 100);

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
                Ball Catch
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold">
                Move the basket to catch! 🧺
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-2 border border-amber-400/50">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="text-sm font-extrabold text-amber-200">
                {caught}
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-3">
            <div className="h-2 rounded-full bg-purple-950/60 border border-purple-400/30 overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
              />
            </div>
          </div>
        </motion.header>

        {/* MAIN */}
        <div className="max-w-3xl mx-auto px-3 sm:px-4 mt-6">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 p-4 mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-emerald-300 shrink-0" />
            <p className="text-sm text-purple-100">
              <strong>Move your basket</strong> with your finger or arrow keys.
              Catch <strong>{BALLS_TO_CATCH} balls</strong> to win!
            </p>
          </div>

          <div
            className="relative aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#0f0a2e] to-[#1e1b4b] border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.35)] touch-none select-none"
            onPointerMove={handlePointerMove}
          >
            {/* Stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.4 + Math.random() * 0.6,
                }}
              />
            ))}

            {/* Falling balls */}
            <AnimatePresence>
              {balls.map((ball) => (
                <motion.div
                  key={ball.id}
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: `${ball.x}%`,
                    top: `${ball.y}%`,
                    transform: "translate(-50%, -50%)",
                    fontSize: "clamp(28px, 8vw, 48px)",
                    filter: "drop-shadow(0 0 12px rgba(168,85,247,0.7))",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.6, opacity: 0 }}
                >
                  {ball.emoji}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Basket */}
            <motion.div
              className="absolute"
              style={{
                left: `${basketX}%`,
                bottom: "5%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="relative">
                <div className="w-[clamp(60px,15vw,100px)] h-[clamp(60px,15vw,100px)] flex items-center justify-center rounded-b-3xl rounded-t-lg bg-gradient-to-b from-amber-500/90 to-orange-600/90 border-2 border-amber-300/60 shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                  <span className="text-3xl">🧺</span>
                </div>
                {/* Glow under basket */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-3 rounded-full bg-amber-400/40 blur-md" />
              </div>
            </motion.div>

            {/* HUD */}
            {isPlaying && (
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 border border-emerald-400/40">
                  <span className="text-xs font-bold text-emerald-200">
                    CAUGHT: {caught} / {BALLS_TO_CATCH}
                  </span>
                </div>
                <div className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 border border-rose-400/40">
                  <span className="text-xs font-bold text-rose-200">
                    MISSED: {missed}
                  </span>
                </div>
              </div>
            )}

            {/* Start overlay */}
            {!isPlaying && !showCelebration && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center px-6">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🧺
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-white mb-3">
                    Catch the Falling Balls!
                  </h2>
                  <p className="text-sm text-purple-200/85 mb-6 max-w-sm mx-auto">
                    Slide your finger (or use arrow keys) to move the basket.
                    Catch {BALLS_TO_CATCH} balls to win!
                  </p>
                  <button
                    onClick={start}
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 font-extrabold text-white text-lg shadow-[0_0_30px_rgba(16,185,129,0.6)] border-2 border-emerald-300/40 hover:brightness-110 transition flex items-center gap-2 mx-auto"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Start Game
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-purple-300/70 mt-4">
            🎯 Watch the ball and move the basket under it!
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
                  className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 shadow-[0_0_50px_rgba(16,185,129,0.8)]"
                >
                  <Trophy className="w-12 h-12 text-amber-300" />
                </motion.div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                  Champion Catcher! 🎉
                </h2>
                <p className="text-base text-purple-100 mb-6">
                  You caught <strong className="text-amber-300">{caught}</strong>{" "}
                  balls and earned <strong className="text-amber-300">20 stars</strong>!
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/motor")}
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 px-6 py-4 font-extrabold text-white text-lg shadow-lg border-2 border-emerald-300/40 hover:brightness-110 transition"
                  >
                    Back to Motor Skills
                  </button>
                  <button
                    onClick={restart}
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