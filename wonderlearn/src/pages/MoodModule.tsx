// src/pages/MoodModule.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile, Heart, Sparkles, Star, Flame, Coins, Home, ArrowLeft,
  CheckCircle2, ChevronRight, Moon, Sun, Wind, Music, CloudRain,
  Cloud, Zap, Brain, Award, TrendingUp, CalendarDays, Play, Pause,
  Volume2, VolumeX, RotateCcw, Trophy, Lightbulb, Timer,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useGamificationStore } from "@/stores/gamificationStore";

// =========================================================
// TYPES
// =========================================================

type MoodKey =
  | "happy" | "calm" | "excited" | "tired"
  | "sad" | "angry" | "anxious" | "proud";

interface MoodOption {
  key: MoodKey;
  emoji: string;
  label: string;
  gradient: string;
  border: string;
  glow: string;
  message: string;
  coping: string[];
}

interface MoodEntry {
  id: string;
  mood: MoodKey;
  note: string;
  timestamp: number;
  stars: number;
}

// =========================================================
// MOOD OPTIONS
// =========================================================

const moodOptions: MoodOption[] = [
  {
    key: "happy", emoji: "😊", label: "Happy",
    gradient: "from-amber-400 via-yellow-400 to-orange-500",
    border: "border-amber-400/60", glow: "shadow-amber-500/40",
    message: "Wonderful! Your happiness lights up the whole galaxy 🌟",
    coping: ["Share your joy with someone you love", "Do a little happy dance", "Draw what made you smile"],
  },
  {
    key: "calm", emoji: "😌", label: "Calm",
    gradient: "from-teal-400 via-cyan-400 to-sky-500",
    border: "border-teal-400/60", glow: "shadow-teal-500/40",
    message: "Peaceful and grounded — perfect for learning 🌊",
    coping: ["Take 5 slow deep breaths", "Listen to soft space sounds", "Stretch gently like a star"],
  },
  {
    key: "excited", emoji: "🤩", label: "Excited",
    gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
    border: "border-fuchsia-400/60", glow: "shadow-fuchsia-500/40",
    message: "Amazing energy! Let's channel it into something fun 🚀",
    coping: ["Try a quick movement game", "Pick a challenge to conquer", "Tell someone what excites you"],
  },
  {
    key: "tired", emoji: "😴", label: "Tired",
    gradient: "from-indigo-400 via-violet-500 to-purple-600",
    border: "border-indigo-400/60", glow: "shadow-indigo-500/40",
    message: "Rest is important too. Let's take it slow 🌙",
    coping: ["Try a 2-minute breathing break", "Close your eyes and imagine space", "Sip some water"],
  },
  {
    key: "sad", emoji: "😢", label: "Sad",
    gradient: "from-blue-400 via-sky-500 to-cyan-600",
    border: "border-blue-400/60", glow: "shadow-blue-500/40",
    message: "It's okay to feel sad. You're safe here 💙",
    coping: ["Hug a cozy blanket", "Draw or write how you feel", "Talk to someone you trust"],
  },
  {
    key: "angry", emoji: "😠", label: "Angry",
    gradient: "from-red-400 via-rose-500 to-pink-600",
    border: "border-red-400/60", glow: "shadow-red-500/40",
    message: "Anger is normal — let's cool the rocket engines 🌡️",
    coping: ["Count slowly to 10", "Squeeze a soft toy tightly", "Run in place for 30 seconds"],
  },
  {
    key: "anxious", emoji: "😰", label: "Anxious",
    gradient: "from-purple-400 via-fuchsia-500 to-pink-600",
    border: "border-purple-400/60", glow: "shadow-purple-500/40",
    message: "You're safe. Let's breathe together like an astronaut 🌌",
    coping: ["5-4-3-2-1 grounding game", "Blow bubbles slowly", "Name 3 things you can see"],
  },
  {
    key: "proud", emoji: "🦸", label: "Proud",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    border: "border-emerald-400/60", glow: "shadow-emerald-500/40",
    message: "You should be proud! Look how far you've come 💪",
    coping: ["Say one kind thing to yourself", "Do a celebration dance", "Share your win with a friend"],
  },
];

// =========================================================
// SPACE BACKGROUND
// =========================================================

function MoodSpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2e1065_0%,#0f0728_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-pink-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-500/15 blur-[140px]" />
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.55)",
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

// =========================================================
// BREATHING WIDGET
// =========================================================

const BREATH_PHASES = [
  { label: "Inhale", seconds: 4, scale: 1.5, color: "from-cyan-400 to-blue-500" },
  { label: "Hold", seconds: 4, scale: 1.5, color: "from-violet-400 to-purple-500" },
  { label: "Exhale", seconds: 4, scale: 0.75, color: "from-pink-400 to-fuchsia-500" },
  { label: "Hold", seconds: 2, scale: 0.75, color: "from-amber-400 to-orange-500" },
] as const;

function BreathingWidget() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(BREATH_PHASES[0].seconds);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        setPhaseIndex((pi) => {
          const next = (pi + 1) % BREATH_PHASES.length;
          setSecondsLeft(BREATH_PHASES[next].seconds);
          return next;
        });
        return BREATH_PHASES[phaseIndex].seconds;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, phaseIndex]);

  const phase = BREATH_PHASES[phaseIndex];

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2 border-cyan-500/40 p-6 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/40">
            <Wind className="w-6 h-6 text-white" />
          </span>
          <div>
            <h4 className="font-bold text-white text-lg">Calm Breathing</h4>
            <p className="text-xs text-cyan-200/70">4-4-4-2 breathing like an astronaut</p>
          </div>
        </div>
        <button
          onClick={() => setRunning((r) => !r)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition shadow-lg",
            running
              ? "bg-rose-500/80 hover:bg-rose-500 shadow-rose-500/40"
              : "bg-cyan-500/80 hover:bg-cyan-500 shadow-cyan-500/40"
          )}
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Start"}
        </button>
      </div>

      <div className="relative h-56 flex items-center justify-center">
        <motion.div
          animate={{
            scale: running ? phase.scale : 1,
            opacity: running ? 1 : 0.7,
          }}
          transition={{ duration: running ? phase.seconds : 0.6, ease: "easeInOut" }}
          className={cn(
            "flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br shadow-[0_0_50px_rgba(34,211,238,0.6)]",
            phase.color
          )}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0f0a2e]/80 backdrop-blur-md flex-col">
            <p className="text-white font-extrabold text-2xl tabular-nums">{secondsLeft}</p>
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{phase.label}</p>
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className={cn("h-44 w-44 rounded-full blur-2xl opacity-40 bg-gradient-to-br", phase.color)} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        {BREATH_PHASES.map((p, i) => (
          <span
            key={`${p.label}-${i}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === phaseIndex && running ? "w-8 bg-white" : "w-2 bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// =========================================================
// MOOD PAGE
// =========================================================

export default function MoodModule() {
  const gamification = useGamificationStore();
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [justEarned, setJustEarned] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stars = typeof gamification.stars === "number" ? gamification.stars : 0;
  const coins = typeof gamification.coins === "number" ? gamification.coins : 0;
  const streakDays = typeof gamification.streakDays === "number" ? gamification.streakDays : 0;

  // Load saved mood journal
  useEffect(() => {
    try {
      const raw = localStorage.getItem("moodJournal");
      if (raw) setEntries(JSON.parse(raw) as MoodEntry[]);
    } catch {
      /* ignore */
    }
  }, []);

  const persistEntries = (next: MoodEntry[]) => {
    setEntries(next);
    try {
      localStorage.setItem("moodJournal", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const logMood = () => {
    if (!selectedMood) return;
    const starsAward = 5;
    const newEntry: MoodEntry = {
      id: `mood-${Date.now()}`,
      mood: selectedMood.key,
      note: note.trim(),
      timestamp: Date.now(),
      stars: starsAward,
    };
    persistEntries([newEntry, ...entries].slice(0, 60));

    // Award through the gamification store if available
    try {
      if (typeof gamification.addStars === "function") {
        gamification.addStars(starsAward);
      }
      if (typeof gamification.addCoins === "function") {
        gamification.addCoins(2);
      }
      if (typeof gamification.recordActivity === "function") {
        gamification.recordActivity({
          id: newEntry.id,
          activityId: "mood-checkin",
          title: `Mood check-in: ${selectedMood.label}`,
          emoji: selectedMood.emoji,
          stars: starsAward,
          timestamp: newEntry.timestamp,
        });
      }
    } catch (e) {
      console.warn("Could not update gamification store:", e);
    }

    setJustEarned(starsAward);
    setNote("");
    const saved = selectedMood;
    setTimeout(() => setJustEarned(null), 2600);
    setSelectedMood(saved);
  };

  const resetToday = () => {
    setSelectedMood(null);
    setNote("");
  };

  const stats = useMemo(() => {
    const total = entries.length;
    const uniqueDays = new Set(
      entries.map((e) => new Date(e.timestamp).toDateString())
    ).size;
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return {
      total,
      uniqueDays,
      topMoodKey: (topMood?.[0] ?? null) as MoodKey | null,
      topMoodCount: topMood?.[1] ?? 0,
    };
  }, [entries]);

  const topMoodOption = stats.topMoodKey
    ? moodOptions.find((m) => m.key === stats.topMoodKey) ?? null
    : null;

  return (
    <div className="relative min-h-screen text-white">
      <MoodSpaceBackground />

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 space-y-8">
        {/* TOP BAR */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 flex-wrap"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 px-4 py-2 text-sm font-semibold text-purple-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 hover:bg-purple-500/30"
              aria-label={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-4 py-2 border border-orange-400/40">
              <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              <span className="text-sm font-bold text-orange-200 tabular-nums">{streakDays}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-4 py-2 border border-amber-400/40">
              <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span className="text-sm font-bold text-amber-200 tabular-nums">{stars}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-4 py-2 border border-yellow-400/40">
              <Coins className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-bold text-yellow-200 tabular-nums">{coins}</span>
            </div>
          </div>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-600/40 via-fuchsia-600/40 to-purple-700/40 backdrop-blur-xl border-2 border-pink-400/50 p-8 md:p-10 shadow-[0_0_60px_rgba(236,72,153,0.35)]"
        >
          <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-[0_0_40px_rgba(236,72,153,0.6)]"
            >
              <Smile className="w-14 h-14 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-pink-200">Mood Module</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-1 drop-shadow-lg">
                How are you feeling today? 🌟
              </h1>
              <p className="text-base text-pink-100/90 mt-3 max-w-2xl">
                Choose the face that matches your feeling right now. Every check-in earns you <strong>+5 stars</strong> and helps you understand yourself better.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/30">
                  🗓️ {stats.uniqueDays} day{stats.uniqueDays === 1 ? "" : "s"} logged
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/30">
                  📖 {stats.total} total check-in{stats.total === 1 ? "" : "s"}
                </span>
                {topMoodOption && (
                  <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/30">
                    {topMoodOption.emoji} Most common: {topMoodOption.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* MOOD PICKER */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-300" />
            Pick a mood
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {moodOptions.map((mood) => {
              const isSelected = selectedMood?.key === mood.key;
              return (
                <motion.button
                  key={mood.key}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                                   onClick={() => setSelectedMood(mood)}
                  className={cn(
                    "relative overflow-hidden rounded-2xl p-5 border-2 transition-all text-left",
                    "bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl",
                    isSelected
                      ? `${mood.border} ${mood.glow} shadow-[0_0_40px_rgba(236,72,153,0.4)] scale-[1.02]`
                      : "border-purple-500/30 hover:border-purple-400/60"
                  )}
                >
                  <div
                    className={cn(
                      "absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-30 blur-2xl",
                      mood.gradient
                    )}
                  />
                  <div className="relative flex items-center gap-3">
                    <motion.span
                      animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0 }}
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl text-3xl shadow-lg bg-gradient-to-br shrink-0",
                        mood.gradient
                      )}
                    >
                      {mood.emoji}
                    </motion.span>
                    <div className="min-w-0">
                      <p className="font-extrabold text-white text-lg">{mood.label}</p>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wide">
                          <CheckCircle2 className="w-3 h-3" />
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* SELECTED MOOD DETAILS */}
        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              key={selectedMood.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] bg-gradient-to-br p-6 md:p-8 border-2 backdrop-blur-xl",
                selectedMood.gradient,
                selectedMood.border,
                "shadow-[0_0_60px_rgba(236,72,153,0.4)]"
              )}
            >
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="text-6xl md:text-7xl shrink-0 drop-shadow-2xl"
                >
                  {selectedMood.emoji}
                </motion.span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Feeling {selectedMood.label.toLowerCase()} {selectedMood.emoji}
                  </h3>
                  <p className="text-base text-white/95 mb-4 leading-relaxed">
                    {selectedMood.message}
                  </p>

                  <div className="rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      Things that might help
                    </p>
                    <ul className="space-y-1.5">
                      {selectedMood.coping.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-white/95">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NOTE + LOG BUTTON */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2 border-purple-400/40 p-6 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          >
            <label className="block mb-2 text-sm font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-300" />
              Want to say more? (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What made you feel this way today?"
              rows={3}
              maxLength={240}
              className="w-full rounded-2xl bg-[#0f0a2e]/70 border border-purple-400/30 focus:border-pink-400/60 outline-none px-4 py-3 text-white placeholder-purple-300/40 resize-none transition"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-purple-300/60">
              <span>{note.length}/240 characters</span>
              <button
                onClick={resetToday}
                className="inline-flex items-center gap-1 text-purple-200 hover:text-white transition"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logMood}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-6 py-4 text-base font-extrabold text-white shadow-[0_0_30px_rgba(236,72,153,0.6)] border-2 border-pink-300/50 hover:from-pink-400 hover:to-purple-500 transition"
              >
                <Sparkles className="w-5 h-5" />
                Log Mood · Earn +5 ⭐
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* EARNED TOAST */}
        <AnimatePresence>
          {justEarned !== null && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 shadow-[0_0_40px_rgba(251,191,36,0.8)] border-2 border-amber-200/60 flex items-center gap-3"
            >
              <Trophy className="w-6 h-6 text-white" />
              <span className="text-white font-extrabold text-lg">+{justEarned} stars earned!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CALM TOOLS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BreathingWidget />

          <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2 border-amber-500/40 p-6 shadow-[0_0_40px_rgba(251,191,36,0.25)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40">
                <Timer className="w-6 h-6 text-white" />
              </span>
              <div>
                <h4 className="font-bold text-white text-lg">5-4-3-2-1 Grounding</h4>
                <p className="text-xs text-amber-200/70">Anxious? Come back to the present moment</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { n: 5, label: "things you can SEE", emoji: "👀" },
                { n: 4, label: "things you can TOUCH", emoji: "✋" },
                { n: 3, label: "things you can HEAR", emoji: "👂" },
                { n: 2, label: "things you can SMELL", emoji: "👃" },
                { n: 1, label: "thing you can TASTE", emoji: "👅" },
              ].map((row) => (
                <div
                  key={row.n}
                  className="flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-400/30 px-3 py-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-extrabold text-sm shrink-0">
                    {row.n}
                  </span>
                  <span className="text-lg">{row.emoji}</span>
                  <span className="text-sm text-amber-100/90 font-semibold">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOOD HISTORY */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
            <CalendarDays className="w-6 h-6 text-cyan-300" />
            Mood Journal
          </h2>
          {entries.length === 0 ? (
            <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/80 to-[#0f0a2e]/80 backdrop-blur-xl border-2 border-purple-500/30 p-10 text-center">
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-purple-900/40 mb-4 border border-purple-400/30">
                <Smile className="w-10 h-10 text-purple-300/50" />
              </div>
              <p className="text-purple-100 text-lg font-medium">No moods logged yet.</p>
              <p className="text-purple-300/60 text-sm mt-2">
                Log your first mood above to start your journal!
              </p>
            </div>
          ) : (
            <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/80 to-[#0f0a2e]/80 backdrop-blur-xl border-2 border-purple-500/30 p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)] space-y-3">
              {entries.slice(0, 10).map((entry, idx) => {
                const mood = moodOptions.find((m) => m.key === entry.mood);
                if (!mood) return null;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 rounded-2xl bg-purple-900/30 border border-purple-400/20 p-4 hover:bg-purple-900/50 transition"
                  >
                    <span className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl text-3xl shadow-md bg-gradient-to-br shrink-0",
                      mood.gradient
                    )}>
                      {mood.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-base">{mood.label}</p>
                      {entry.note && (
                        <p className="text-xs text-purple-200/70 italic truncate">"{entry.note}"</p>
                      )}
                      <p className="text-xs text-purple-300/60 mt-1">
                        {new Date(entry.timestamp).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-200 border border-amber-400/40 shrink-0">
                      +{entry.stars} ⭐
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
          <Link
            to="/speech-practice"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/40 to-purple-700/40 backdrop-blur-xl border-2 border-violet-400/50 p-6 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-200">Next up</p>
                <p className="text-xl font-extrabold text-white">Speech Practice →</p>
              </div>
              <ChevronRight className="w-6 h-6 text-violet-200 group-hover:translate-x-1 transition" />
            </div>
          </Link>
          <Link
            to="/progress"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/40 to-orange-700/40 backdrop-blur-xl border-2 border-amber-400/50 p-6 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-200">See growth</p>
                <p className="text-xl font-extrabold text-white">My Progress →</p>
              </div>
              <ChevronRight className="w-6 h-6 text-amber-200 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}