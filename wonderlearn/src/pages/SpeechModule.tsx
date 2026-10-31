// src/pages/SpeechModule.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw,
  Star, Flame, Coins, ArrowLeft, CheckCircle2, Sparkles,
  MessageCircle, Trophy, Award, TrendingUp, ChevronRight,
  Music, Waves, Zap, Target, Clock, Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useGamificationStore } from "@/stores/gamificationStore";

// =========================================================
// TYPES
// =========================================================

interface SpeechActivity {
  id: string;
  title: string;
  emoji: string;
  gradient: string;
  border: string;
  description: string;
  words: string[];
  stars: number;
  duration: number;
  level: 1 | 2 | 3;
}

interface SpeechSession {
  id: string;
  activityId: string;
  activityTitle: string;
  emoji: string;
  wordsAttempted: number;
  wordsCorrect: number;
  stars: number;
  timestamp: number;
}

// =========================================================
// SPEECH ACTIVITIES
// =========================================================

const speechActivities: SpeechActivity[] = [
  {
    id: "sp-1", title: "Space Animal Sounds", emoji: "🦁",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    border: "border-amber-400/50",
    description: "Say the animal name then make its sound!",
    words: ["Lion", "Cat", "Dog", "Cow", "Frog", "Owl"],
    stars: 10, duration: 3, level: 1,
  },
  {
    id: "sp-2", title: "Rocket Words", emoji: "🚀",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    border: "border-sky-400/50",
    description: "Practice space-related words out loud",
    words: ["Rocket", "Planet", "Star", "Moon", "Galaxy", "Astronaut"],
    stars: 10, duration: 3, level: 1,
  },
  {
    id: "sp-3", title: "Silly Tongue Twisters", emoji: "😜",
    gradient: "from-pink-400 via-fuchsia-500 to-purple-600",
    border: "border-pink-400/50",
    description: "Fun phrases that make your mouth exercise!",
    words: [
      "She sells sea shells",
      "Peter Piper picked peppers",
      "Red lorry yellow lorry",
      "I scream you scream",
    ],
    stars: 15, duration: 5, level: 2,
  },
  {
    id: "sp-4", title: "Feelings Words", emoji: "💗",
    gradient: "from-rose-400 via-pink-500 to-red-500",
    border: "border-rose-400/50",
    description: "Say how these feelings sound with your voice",
    words: ["Happy", "Sad", "Excited", "Calm", "Proud", "Surprised"],
    stars: 10, duration: 3, level: 1,
  },
  {
    id: "sp-5", title: "Letter Sounds", emoji: "🔤",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    border: "border-emerald-400/50",
    description: "Practice the letter sound in each word",
    words: ["B - Ball", "C - Cat", "D - Dog", "F - Fish", "M - Moon", "S - Star"],
    stars: 10, duration: 3, level: 1,
  },
  {
    id: "sp-6", title: "Story Retell", emoji: "📖",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    border: "border-violet-400/50",
    description: "Repeat this short story in your own words",
    words: [
      "Once upon a time a tiny star lost its glow.",
      "It asked the moon for help.",
      "The moon shared its light and the star shone again.",
    ],
    stars: 20, duration: 6, level: 3,
  },
];

// =========================================================
// SPACE BACKGROUND
// =========================================================

function SpeechSpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0b0720_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-fuchsia-500/15 blur-[140px]" />
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
// TYPES FOR SPEECH RECOGNITION
// =========================================================

type SpeechRecognitionType = {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
};

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// =========================================================
// SPEECH PAGE
// =========================================================

export default function SpeechModule() {
  const gamification = useGamificationStore();
  const [activeActivity, setActiveActivity] = useState<SpeechActivity | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState<{ word: string; transcript: string; correct: boolean }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finished, setFinished] = useState(false);
  const [justEarned, setJustEarned] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessions, setSessions] = useState<SpeechSession[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const stars = typeof gamification.stars === "number" ? gamification.stars : 0;
  const coins = typeof gamification.coins === "number" ? gamification.coins : 0;
  const streakDays = typeof gamification.streakDays === "number" ? gamification.streakDays : 0;

  // Load saved sessions
  useEffect(() => {
    try {
      const raw = localStorage.getItem("speechSessions");
      if (raw) setSessions(JSON.parse(raw) as SpeechSession[]);
    } catch {
      /* ignore */
    }
  }, []);

  // Check speech recognition support
  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionType;
      webkitSpeechRecognition?: SpeechRecognitionType;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setSpeechSupported(false);
    }
  }, []);

  const persistSessions = (next: SpeechSession[]) => {
    setSessions(next);
    try {
      localStorage.setItem("speechSessions", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    } catch {
      /* ignore */
    }
  };

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

  const checkMatch = (spoken: string, target: string) => {
    const cleanSpoken = normalize(spoken);
    const cleanTarget = normalize(target);
    if (!cleanSpoken) return false;
    if (cleanSpoken.includes(cleanTarget)) return true;
    // Simple fuzzy match on first word
    const first = cleanTarget.split(" ")[0];
    if (first && first.length > 2 && cleanSpoken.includes(first)) return true;
    // Similarity
    const a = new Set(cleanSpoken.split(" "));
    const b = cleanTarget.split(" ");
    const hits = b.filter((w) => a.has(w)).length;
    return hits / Math.max(1, b.length) >= 0.5;
  };

  const startListening = () => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionType;
      webkitSpeechRecognition?: SpeechRecognitionType;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setSpeechSupported(false);
      return;
    }
    try {
      const rec = new Ctor();
      rec.lang = "en-US";
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (event) => {
        const result = event.results[0][0];
        const text = result.transcript;
        setTranscript(text);
        handleWordAttempt(text);
      };
      rec.onerror = () => {
        setIsListening(false);
      };
      rec.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = rec;
      rec.start();
      setIsListening(true);
      setTranscript("");
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    setIsListening(false);
  };

  const handleWordAttempt = (spoken: string) => {
    if (!activeActivity) return;
    const target = activeActivity.words[currentWordIndex];
    const ok = checkMatch(spoken, target);
    setAttempts((prev) => [...prev, { word: target, transcript: spoken, correct: ok }]);

    if (ok) {
      speakText("Great job!");
    } else {
      speakText("Try again");
    }
  };

  const skipWord = () => {
    if (!activeActivity) return;
    setAttempts((prev) => [
      ...prev,
      { word: activeActivity.words[currentWordIndex], transcript: "(skipped)", correct: false },
    ]);
    advance();
  };

  const advance = () => {
    if (!activeActivity) return;
    if (currentWordIndex + 1 >= activeActivity.words.length) {
      finishSession();
    } else {
      setCurrentWordIndex((i) => i + 1);
      setTranscript("");
    }
  };

  const finishSession = () => {
    if (!activeActivity) return;
    const correct = attempts.filter((a) => a.correct).length;
    const starsAward = Math.max(2, Math.round(activeActivity.stars * (correct / activeActivity.words.length)));

    const newSession: SpeechSession = {
      id: `sp-${Date.now()}`,
      activityId: activeActivity.id,
      activityTitle: activeActivity.title,
      emoji: activeActivity.emoji,
      wordsAttempted: activeActivity.words.length,
      wordsCorrect: correct,
      stars: starsAward,
      timestamp: Date.now(),
    };
    persistSessions([newSession, ...sessions].slice(0, 40));

    try {
      if (typeof gamification.addStars === "function") gamification.addStars(starsAward);
      if (typeof gamification.addCoins === "function") gamification.addCoins(Math.max(1, Math.round(starsAward / 2)));
      if (typeof gamification.recordActivity === "function") {
        gamification.recordActivity({
          id: newSession.id,
          activityId: activeActivity.id,
          title: `Speech: ${activeActivity.title}`,
          emoji: activeActivity.emoji,
          stars: starsAward,
          timestamp: newSession.timestamp,
        });
      }
    } catch (e) {
      console.warn("Could not update gamification:", e);
    }

    setJustEarned(starsAward);
    setTimeout(() => setJustEarned(null), 2800);
    setFinished(true);
  };

  const resetActivity = () => {
    setAttempts([]);
    setCurrentWordIndex(0);
    setTranscript("");
    setFinished(false);
  };

  const startActivity = (activity: SpeechActivity) => {
    setActiveActivity(activity);
    resetActivity();
    setTimeout(() => speakText(activity.words[0]), 300);
  };

  const exitActivity = () => {
    stopListening();
    setActiveActivity(null);
    resetActivity();
  };

  const currentWord = activeActivity?.words[currentWordIndex] ?? "";

  return (
    <div className="relative min-h-screen text-white">
      <SpeechSpaceBackground />

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

        {/* HERO or ACTIVE ACTIVITY */}
        <AnimatePresence mode="wait">
          {!activeActivity ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600/40 via-purple-600/40 to-fuchsia-700/40 backdrop-blur-xl border-2 border-violet-400/50 p-8 md:p-10 shadow-[0_0_60px_rgba(139,92,246,0.35)]"
            >
              <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-purple-400/25 blur-3xl" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
                >
                  <MessageCircle className="w-14 h-14 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-200">Speech Module</p>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-1 drop-shadow-lg">
                    Speak up, space explorer! 🗣️
                  </h1>
                  <p className="text-base text-violet-100/90 mt-3 max-w-2xl">
                    Practice words out loud, tell stories, and build confidence with fun speech games.
                    Every session earns you stars and coins!
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/30">
                      🎤 {speechActivities.length} activities
                    </span>
                    <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/30">
                      📖 {sessions.length} session{sessions.length === 1 ? "" : "s"} done
                    </span>
                    {!speechSupported && (
                      <span className="rounded-full bg-rose-500/30 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-rose-100 border border-rose-300/40">
                        ⚠️ Voice not supported in this browser
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`active-${activeActivity.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-6 md:p-10 border-2 backdrop-blur-xl",
                activeActivity.gradient,
                activeActivity.border,
                "shadow-[0_0_60px_rgba(139,92,246,0.4)]"
              )}
            >
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{activeActivity.emoji}</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                        Speech Activity
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {activeActivity.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={exitActivity}
                    className="flex items-center gap-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white border border-white/30 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Exit
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2 text-sm font-bold text-white/90">
                    <span>
                      Word {Math.min(currentWordIndex + 1, activeActivity.words.length)} of{" "}
                      {activeActivity.words.length}
                    </span>
                    <span>
                      ✅ {attempts.filter((a) => a.correct).length} correct
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden border border-white/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(attempts.length / activeActivity.words.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                    />
                  </div>
                </div>

                {/* FINISHED STATE */}
                {finished ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="inline-block text-7xl mb-4"
                    >
                      🏆
                    </motion.div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                      Wonderful work, explorer!
                    </h3>
                    <p className="text-lg text-white/90 mb-6">
                      You said <strong>{attempts.filter((a) => a.correct).length}</strong> of{" "}
                      <strong>{activeActivity.words.length}</strong> words correctly.
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm px-6 py-3 border-2 border-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                      <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                      <span className="text-white font-extrabold text-xl">
                        +{Math.max(2, Math.round(activeActivity.stars * (attempts.filter((a) => a.correct).length / activeActivity.words.length)))} stars earned!
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mt-8">
                      <button
                        onClick={() => {
                          resetActivity();
                          setTimeout(() => speakText(activeActivity.words[0]), 300);
                        }}
                        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-900 shadow-lg hover:scale-105 transition"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Try Again
                      </button>
                      <button
                        onClick={exitActivity}
                        className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-6 py-3 font-bold text-white border border-white/40 hover:bg-white/30 transition"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Back to Activities
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* CURRENT WORD CARD */}
                    <motion.div
                      key={`word-${currentWordIndex}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-3xl bg-black/40 backdrop-blur-md border-2 border-white/30 p-6 md:p-8 text-center"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                        Say this out loud
                      </p>
                      <motion.p
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4"
                      >
                        {currentWord}
                      </motion.p>
                      <button
                        onClick={() => speakText(currentWord)}
                        className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white border border-white/40 hover:bg-white/30 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                        Hear it
                      </button>
                    </motion.div>

                    {/* MIC BUTTON */}
                    <div className="flex flex-col items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isListening ? stopListening : startListening}
                        disabled={!speechSupported}
                        className={cn(
                          "relative flex h-32 w-32 items-center justify-center rounded-full shadow-[0_0_50px_rgba(139,92,246,0.6)] border-4 transition",
                          isListening
                            ? "bg-gradient-to-br from-rose-500 to-pink-600 border-rose-300/60 animate-pulse"
                            : "bg-gradient-to-br from-violet-500 to-purple-600 border-violet-300/60",
                          !speechSupported && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isListening && (
                          <motion.span
                            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-rose-400/40"
                          />
                        )}
                        {isListening ? (
                          <MicOff className="w-14 h-14 text-white" />
                        ) : (
                          <Mic className="w-14 h-14 text-white" />
                        )}
                      </motion.button>
                      <p className="text-sm font-bold text-white/90">
                        {!speechSupported
                          ? "Voice recognition not available in this browser"
                          : isListening
                          ? "🎤 Listening... speak clearly"
                          : "Tap the mic and say the word"}
                      </p>
                      {transcript && (
                        <div className="rounded-xl bg-black/40 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm text-white">
                          You said: <strong>"{transcript}"</strong>
                        </div>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={skipWord}
                        className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-white border border-white/40 hover:bg-white/30 transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                        Skip word
                      </button>
                      {attempts.length > currentWordIndex && (
                        <button
                          onClick={advance}
                          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:scale-105 transition shadow-lg"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Next word
                        </button>
                      )}
                    </div>

                    {/* ATTEMPT HISTORY */}
                    {attempts.length > 0 && (
                      <div className="rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Recent attempts
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {attempts.slice(-6).map((a, i) => (
                            <span
                              key={`${a.word}-${i}`}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border",
                                a.correct
                                  ? "bg-emerald-500/30 border-emerald-300/50 text-emerald-100"
                                  : "bg-rose-500/30 border-rose-300/50 text-rose-100"
                              )}
                            >
                              {a.correct ? "✅" : "❌"} {a.word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVITY LIST (only when not in a session) */}
        {!activeActivity && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300" />
              Pick a speech adventure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {speechActivities.map((activity, idx) => (
                <motion.button
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startActivity(activity)}
                  className={cn(
                    "group relative overflow-hidden rounded-[1.75rem] p-6 text-left",
                    "bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2",
                    activity.border,
                    "hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all"
                  )}
                >
                  <div
                    className={cn(
                      "absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-25 blur-3xl group-hover:opacity-40 transition",
                      activity.gradient
                    )}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-lg bg-gradient-to-br",
                          activity.gradient
                        )}
                      >
                        {activity.emoji}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-purple-200/80">
                        <span className="rounded-full bg-purple-500/30 border border-purple-400/40 px-2 py-0.5">
                          ⭐ {activity.stars}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{activity.title}</h3>
                    <p className="text-sm text-purple-200/70 mt-1">{activity.description}</p>

                    <div className="flex items-center gap-3 mt-4 text-xs text-purple-200/80 font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-cyan-300" />
                        {activity.words.length} words
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-300" />
                        ~{activity.duration} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              n <= activity.level ? "bg-cyan-300" : "bg-white/20"
                            )}
                          />
                        ))}
                      </span>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white border border-white/30 group-hover:bg-white group-hover:text-slate-900 transition">
                      <Play className="w-4 h-4" />
                      Start
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* TIPS */}
        {!activeActivity && (
          <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2 border-emerald-500/40 p-6 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/40">
                <Lightbulb className="w-7 h-7 text-white" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-white">Speech practice tips</h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Find a quiet place so the microphone can hear you clearly.",
                    "Speak slowly and clearly — no rush!",
                    "Use the 'Hear it' button to listen to the correct pronunciation first.",
                    "It's okay to try again — every attempt makes you stronger.",
                    "Celebrate small wins — you earn stars for every word!",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-purple-100/85">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SESSION HISTORY */}
        {!activeActivity && sessions.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-300" />
              Recent sessions
            </h2>
            <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/80 to-[#0f0a2e]/80 backdrop-blur-xl border-2 border-purple-500/30 p-6 space-y-3">
              {sessions.slice(0, 8).map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 rounded-2xl bg-purple-900/30 border border-purple-400/20 p-4 hover:bg-purple-900/50 transition"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-800/60 text-3xl shrink-0 border border-purple-400/30">
                    {s.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-base truncate">{s.activityTitle}</p>
                    <p className="text-xs text-purple-200/70">
                      {s.wordsCorrect}/{s.wordsAttempted} correct ·{" "}
                      {new Date(s.timestamp).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-200 border border-amber-400/40 shrink-0">
                    +{s.stars} ⭐
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* QUICK LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
          <Link
            to="/emotional-wellness"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600/40 to-fuchsia-700/40 backdrop-blur-xl border-2 border-pink-400/50 p-6 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-lg">
                <Waves className="w-7 h-7 text-white" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-pink-200">Check in</p>
                <p className="text-xl font-extrabold text-white">Mood Journal →</p>
              </div>
              <ChevronRight className="w-6 h-6 text-pink-200 group-hover:translate-x-1 transition" />
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
    </div>
  );
}