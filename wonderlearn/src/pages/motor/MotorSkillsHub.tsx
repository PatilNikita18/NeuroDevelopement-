// src/pages/motor/MotorSkillsHub.tsx

import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Footprints,
  Hand,
  Target,
  Activity,
  ChevronRight,
  Sparkles,
  Rocket,
  Star,
  Trophy,
  CheckCircle2,
  Play,
  Flame,
} from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// =========================================================
// TYPES
// =========================================================

interface MotorActivity {
  id: string;
  emoji: string;
  title: string;
  description: string;
  skillType: "gross" | "fine" | "visual-motor";
  path: string;
  gradient: string;
  glow: string;
  duration: string;
  starsReward: number;
}

// =========================================================
// ACTIVITIES
// =========================================================

const motorActivities: MotorActivity[] = [
  {
    id: "trace-lines",
    emoji: "✏️",
    title: "Trace the Lines",
    description: "Follow dotted paths with your finger to build hand control.",
    skillType: "visual-motor",
    path: "/motor/trace-lines",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    glow: "shadow-pink-500/40",
    duration: "2-3 min",
    starsReward: 15,
  },
  {
    id: "movement-break",
    emoji: "🏃",
    title: "Movement Break",
    description: "Fun exercises to move your body and release energy.",
    skillType: "gross",
    path: "/motor/movement-break",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    glow: "shadow-orange-500/40",
    duration: "3-5 min",
    starsReward: 20,
  },
  {
    id: "finger-gym",
    emoji: "👆",
    title: "Finger Gym",
    description: "Tap moving targets to sharpen finger control and focus.",
    skillType: "fine",
    path: "/motor/finger-gym",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    glow: "shadow-cyan-500/40",
    duration: "2-3 min",
    starsReward: 15,
  },
  {
    id: "ball-catch",
    emoji: "⚽",
    title: "Ball Catch",
    description: "Catch the falling ball to train eye-hand coordination.",
    skillType: "visual-motor",
    path: "/motor/ball-catch",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/40",
    duration: "2-3 min",
    starsReward: 20,
  },
];

// =========================================================
// SPACE BACKGROUND
// =========================================================

function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const planets = [
    { size: 200, top: "8%", left: "-5%", from: "#7c3aed", to: "#1e1b4b" },
    { size: 150, top: "65%", left: "92%", from: "#0891b2", to: "#0f172a" },
    { size: 90, top: "85%", left: "3%", from: "#db2777", to: "#4c1d95" },
    { size: 70, top: "22%", left: "85%", from: "#f59e0b", to: "#7c2d12" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0b0720_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[100px]" />

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
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {planets.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: `radial-gradient(circle at 30% 30%, ${p.from}, ${p.to})`,
            boxShadow: `0 0 60px 20px ${p.from}40, inset -20px -20px 40px rgba(0,0,0,0.5)`,
          }}
          animate={{ y: [0, -25, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60 + i * 20, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </div>
  );
}

// =========================================================
// MAIN HUB
// =========================================================

export default function MotorSkillsHub() {
  const navigate = useNavigate();
  const stars = useGamificationStore((s) => s.stars) ?? 0;
  const streakDays = useGamificationStore((s) => s.streakDays) ?? 0;

  const totalStarsPossible = motorActivities.reduce(
    (sum, a) => sum + a.starsReward,
    0
  );

  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("motor-skills-completed");
    if (stored) {
      try {
        setCompletedIds(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

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
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/40 border border-purple-400/40 hover:scale-105 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="text-center flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent truncate">
                Motor Skills
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold mt-0.5">
                Move, play & grow stronger 💪
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-2 border border-orange-400/50">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="text-sm font-extrabold text-orange-200 tabular-nums">
                  {streakDays}
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-2 border border-amber-400/50">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-sm font-extrabold text-amber-200 tabular-nums">
                  {stars}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-8">
          {/* HERO */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/95 to-[#0f0a2e]/95 backdrop-blur-xl border-2 border-purple-500/40 p-6 sm:p-10 mb-8 shadow-[0_0_60px_rgba(168,85,247,0.4)]"
          >
            <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_50px_rgba(34,211,238,0.6)]"
              >
                <Activity className="w-12 h-12 text-white" />
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-2">
                  Motor Skills Adventure
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Let's move and play! 🎉
                </h2>
                <p className="text-base text-purple-200/85 max-w-2xl">
                  These fun activities help build coordination, focus, and body
                  control. Take your time and enjoy each one!
                </p>
                <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 rounded-full bg-purple-500/25 px-4 py-2 border border-purple-400/40">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-bold text-purple-100">
                      4 activities
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-amber-500/25 px-4 py-2 border border-amber-400/40">
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span className="text-sm font-bold text-amber-100">
                      {totalStarsPossible} stars available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ACTIVITIES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {motorActivities.map((activity, index) => {
              const completed = completedIds.includes(activity.id);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={activity.path}
                    className={cn(
                      "group block h-full rounded-[2rem] overflow-hidden",
                      "bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2",
                      "transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.25)]",
                      completed
                        ? "border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                        : "border-purple-500/40 hover:border-purple-400/70 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
                    )}
                  >
                    <div className="relative p-6 sm:p-8">
                      <div
                        className={cn(
                          "absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-25 blur-3xl",
                          activity.gradient
                        )}
                      />

                      <div className="relative flex items-start justify-between mb-5">
                        <span
                          className={cn(
                            "flex h-20 w-20 items-center justify-center rounded-2xl text-4xl shadow-lg bg-gradient-to-br",
                            activity.gradient,
                            activity.glow
                          )}
                        >
                          {activity.emoji}
                        </span>
                        {completed && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-500/25 px-3 py-1.5 border border-emerald-400/50">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            <span className="text-xs font-bold text-emerald-200">
                              Done
                            </span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-sm sm:text-base text-purple-200/80 mb-4">
                        {activity.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold",
                            activity.skillType === "gross" &&
                              "bg-orange-500/25 text-orange-200 border border-orange-400/40",
                            activity.skillType === "fine" &&
                              "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40",
                            activity.skillType === "visual-motor" &&
                              "bg-purple-500/25 text-purple-200 border border-purple-400/40"
                          )}
                        >
                          {activity.skillType === "gross" && (
                            <Footprints className="w-3 h-3" />
                          )}
                          {activity.skillType === "fine" && (
                            <Hand className="w-3 h-3" />
                          )}
                          {activity.skillType === "visual-motor" && (
                            <Target className="w-3 h-3" />
                          )}
                          {activity.skillType === "gross"
                            ? "Gross Motor"
                            : activity.skillType === "fine"
                            ? "Fine Motor"
                            : "Eye-Hand"}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-3 py-1.5 text-xs font-bold text-purple-200 border border-purple-400/30">
                          ⏱ {activity.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/25 px-3 py-1.5 text-xs font-bold text-amber-200 border border-amber-400/40">
                          <Star className="w-3 h-3 fill-amber-300" />
                          +{activity.starsReward}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-bold text-cyan-300">
                          {completed ? "Play again" : "Start now"}
                        </span>
                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br shadow-md transition-transform group-hover:scale-110",
                            activity.gradient
                          )}
                        >
                          <Play className="w-4 h-4 text-white fill-white" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}