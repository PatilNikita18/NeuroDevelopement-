// import { useMemo, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Star,
//   Volume2,
//   Heart,
//   Trophy,
// } from "lucide-react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { useGamificationStore } from "@/stores/gamificationStore";
// import { cn } from "@/lib/cn";

// // =========================================================
// // QUESTION BANK
// // =========================================================

// interface Question {
//   id: number;
//   targetSound: string;
//   prompt: string;
//   options: string[];
//   correctAnswer: string;
// }

// const soundMatchQuestions: Question[] = [
//   { id: 1, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Chip", "Ship", "Trip"], correctAnswer: "Ship" },
//   { id: 2, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shop", "Top", "Cop"], correctAnswer: "Shop" },
//   { id: 3, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Fish", "Fist", "Fast"], correctAnswer: "Fish" },
//   { id: 4, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shell", "Bell", "Tell"], correctAnswer: "Shell" },
//   { id: 5, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shark", "Bark", "Dark"], correctAnswer: "Shark" },
//   { id: 6, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Brush", "Brick", "Black"], correctAnswer: "Brush" },
//   { id: 7, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shy", "Sky", "Sly"], correctAnswer: "Shy" },
//   { id: 8, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Wish", "Wick", "Wing"], correctAnswer: "Wish" },
//   { id: 9, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Chair", "Share", "Stair"], correctAnswer: "Chair" },
//   { id: 10, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Chip", "Ship", "Trip"], correctAnswer: "Chip" },
//   { id: 11, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Cheese", "Sneeze", "Freeze"], correctAnswer: "Cheese" },
//   { id: 12, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Thumb", "Drum", "Plum"], correctAnswer: "Thumb" },
//   { id: 13, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Three", "Tree", "Free"], correctAnswer: "Three" },
//   { id: 14, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Bath", "Bat", "Back"], correctAnswer: "Bath" },
//   { id: 15, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Trash", "Track", "Truck"], correctAnswer: "Trash" },
// ];

// const LEVEL_ID = 1;
// const LEVEL_TITLE = "Advanced Sound Match";
// const STARS_PER_CORRECT = 2;
// const TOTAL_QUESTIONS = 10;

// // =========================================================
// // CONFETTI (built-in, no external dependency)
// // =========================================================

// interface ConfettiPiece {
//   id: number;
//   x: number;
//   color: string;
//   delay: number;
//   rotate: number;
//   emoji: string;
// }

// function ConfettiBurst({ trigger }: { trigger: number }) {
//   const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

//   useEffect(() => {
//     if (trigger === 0) return;

//     const colors = [
//       "#fbbf24", "#f472b6", "#60a5fa",
//       "#34d399", "#a78bfa", "#fb7185",
//     ];
//     const emojis = ["⭐", "✨", "🌟", "💫", "🎉"];

//     const newPieces: ConfettiPiece[] = Array.from({ length: 24 }).map(
//       (_, i) => ({
//         id: trigger * 1000 + i,
//         x: Math.random() * 100,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         delay: Math.random() * 0.3,
//         rotate: Math.random() * 360,
//         emoji: emojis[Math.floor(Math.random() * emojis.length)],
//       })
//     );

//     setPieces(newPieces);
//     const timer = setTimeout(() => setPieces([]), 2000);
//     return () => clearTimeout(timer);
//   }, [trigger]);

//   return (
//     <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
//       <AnimatePresence>
//         {pieces.map((piece) => (
//           <motion.div
//             key={piece.id}
//             initial={{ opacity: 1, y: -40, x: `${piece.x}vw`, rotate: 0, scale: 0.5 }}
//             animate={{ opacity: 0, y: "100vh", rotate: piece.rotate + 720, scale: 1.2 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.8, delay: piece.delay, ease: "easeOut" }}
//             className="absolute top-0 text-3xl"
//           >
//             <span className="inline-block drop-shadow-lg" style={{ color: piece.color }}>
//               {piece.emoji}
//             </span>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }

// // =========================================================
// // COMPONENT
// // =========================================================

// export default function AdvancedSoundMatchLevel() {
//   const navigate = useNavigate();
//   const gamification = useGamificationStore();

//   // 🔥 Defensive reads
//   const storeStars =
//     typeof gamification.stars === "number" ? gamification.stars : 0;
//   const completedLevels = Array.isArray(gamification.completedPhonicsLevels)
//     ? gamification.completedPhonicsLevels
//     : [];

//   const [questions] = useState<Question[]>(() => {
//     const shuffled = [...soundMatchQuestions].sort(() => Math.random() - 0.5);
//     return shuffled.slice(0, TOTAL_QUESTIONS);
//   });

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [combo, setCombo] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [sessionStars, setSessionStars] = useState(0);
//   const [lives, setLives] = useState(3);
//   const [confettiTrigger, setConfettiTrigger] = useState(0);
//   const [lastCorrectWord, setLastCorrectWord] = useState<string>("");

//   const currentQuestion = questions[currentIndex];
//   const progressPercent = useMemo(
//     () => Math.round((currentIndex / questions.length) * 100),
//     [currentIndex, questions.length]
//   );

//   // -------------------------------------------------------
//   // Speak the word aloud
//   // -------------------------------------------------------
//   const playSound = (word: string) => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel();
//       const u = new SpeechSynthesisUtterance(word);
//       u.rate = 0.8;
//       u.pitch = 1.1;
//       window.speechSynthesis.speak(u);
//     }
//   };

//   // -------------------------------------------------------
//   // Handle answer
//   // -------------------------------------------------------
//   const handleAnswer = (answer: string) => {
//     if (selectedAnswer !== null) return;
//     setSelectedAnswer(answer);
//     const isCorrect = answer === currentQuestion.correctAnswer;

//     if (isCorrect) {
//       const newCombo = combo + 1;
//       const bonus = newCombo >= 3 ? 2 : 0;
//       const gained = STARS_PER_CORRECT + bonus;

//       setCombo(newCombo);
//       setCorrectCount((c) => c + 1);
//       setSessionStars((s) => s + gained);
//       setLastCorrectWord(currentQuestion.correctAnswer);
//       setConfettiTrigger((t) => t + 1);

//       setTimeout(() => setShowResult(true), 400);
//     } else {
//       setCombo(0);
//       setLives((l) => Math.max(0, l - 1));
//       setTimeout(() => advanceQuestion(), 1200);
//     }
//   };

//   // -------------------------------------------------------
//   // Advance to the next question
//   // -------------------------------------------------------
//   const advanceQuestion = () => {
//     setSelectedAnswer(null);
//     setShowResult(false);

//     if (currentIndex + 1 >= questions.length) {
//       finishLevel();
//     } else {
//       setCurrentIndex((i) => i + 1);
//     }
//   };

//   // -------------------------------------------------------
//   // 🎯 FINISH LEVEL — save progress + bump streak
//   // -------------------------------------------------------
//   const finishLevel = () => {
//     if (!completedLevels.includes(LEVEL_ID)) {
//       // markPhonicsLevelComplete internally calls recordActivity()
//       // so the streak updates automatically ✅
//       gamification.markPhonicsLevelComplete(LEVEL_ID, sessionStars);
//     }
//   };

//   // -------------------------------------------------------
//   // Next button on the celebration popup
//   // -------------------------------------------------------
//   const handleNext = () => {
//     if (currentIndex + 1 >= questions.length) {
//       // Level finished → save & return to phonics grid
//       finishLevel();
//       navigate("/phonics");
//     } else {
//       advanceQuestion();
//     }
//   };

//   if (!currentQuestion) return null;

//   const celebrationStars = Math.min(3, Math.max(1, combo));

//   return (
//     <CloudBackground>
//       <div className="min-h-screen pb-12 relative overflow-hidden">
//         {/* Pastel glows */}
//         <div className="pointer-events-none absolute inset-0 -z-10">
//           <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
//           <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
//           <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
//         </div>

//         <ConfettiBurst trigger={confettiTrigger} />

//         {/* HEADER */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4"
//         >
//           <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
//             <Link to="/phonics">
//               <motion.button
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.94 }}
//                 className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md"
//                 aria-label="Go back"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </motion.button>
//             </Link>

//             <div className="text-center flex-1 min-w-0">
//               <h1 className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
//                 Level {LEVEL_ID}
//               </h1>
//               <p className="text-[11px] sm:text-sm text-slate-500 font-semibold">
//                 {LEVEL_TITLE}
//               </p>
//             </div>

//             <div className="flex flex-col items-end gap-0.5">
//               <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 border border-amber-200">
//                 <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
//                 <span className="text-sm font-extrabold text-amber-700 tabular-nums">
//                   {storeStars + sessionStars}
//                 </span>
//               </div>
//               <span className="text-[10px] font-bold text-emerald-600">
//                 Combo ×{combo}
//               </span>
//             </div>
//           </div>

//           {/* Progress bar */}
//           <div className="max-w-3xl mx-auto mt-3">
//             <div className="h-2 rounded-full bg-white/70 overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progressPercent}%` }}
//                 transition={{ duration: 0.4 }}
//                 className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
//               />
//             </div>
//             <div className="flex items-center justify-between mt-1.5 px-1">
//               <span className="text-[11px] font-bold text-slate-600">
//                 Question {currentIndex + 1} / {questions.length}
//               </span>
//               <span className="text-[11px] font-bold text-rose-500">
//                 ❤️ {lives}
//               </span>
//             </div>
//           </div>
//         </motion.header>

//         {/* QUESTION CARD */}
//         <div className="max-w-3xl mx-auto px-3 sm:px-4 mt-5">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentQuestion.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.35 }}
//               className="rounded-[2rem] bg-white border-4 border-blue-200/70 shadow-xl p-6 sm:p-8 text-center"
//             >
//               <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
//                 {currentQuestion.prompt}
//               </h2>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => playSound(currentQuestion.correctAnswer)}
//                 className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-5 py-3 shadow-sm border border-blue-200 transition"
//               >
//                 <Volume2 className="w-5 h-5" />
//                 Hear it
//               </motion.button>
//             </motion.div>
//           </AnimatePresence>

//           {/* ANSWER OPTIONS */}
//           <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
//             {currentQuestion.options.map((option) => {
//               const isSelected = selectedAnswer === option;
//               const isCorrect = option === currentQuestion.correctAnswer;
//               const showCorrect = selectedAnswer !== null && isCorrect;
//               const showWrong =
//                 selectedAnswer !== null && isSelected && !isCorrect;

//               return (
//                 <motion.button
//                   key={option}
//                   whileHover={
//                     selectedAnswer === null ? { y: -4, scale: 1.02 } : {}
//                   }
//                   whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
//                   onClick={() => handleAnswer(option)}
//                   disabled={selectedAnswer !== null}
//                   className={cn(
//                     "relative rounded-3xl bg-white shadow-md border-2 transition-all duration-300",
//                     "py-6 sm:py-8 px-4",
//                     "text-xl sm:text-2xl font-extrabold text-blue-600",
//                     "cursor-pointer",
//                     selectedAnswer === null &&
//                       "hover:shadow-xl hover:border-blue-200",
//                     showCorrect &&
//                       "border-emerald-400 bg-emerald-50 text-emerald-600",
//                     showWrong && "border-rose-400 bg-rose-50 text-rose-500",
//                     !showCorrect &&
//                       !showWrong &&
//                       selectedAnswer !== null &&
//                       "opacity-60"
//                   )}
//                 >
//                   {option}

//                   {option === currentQuestion.options[2] && (
//                     <Heart className="absolute -top-3 -right-3 w-6 h-6 text-pink-400 fill-pink-300 drop-shadow" />
//                   )}
//                 </motion.button>
//               );
//             })}

//             <div className="col-span-2 flex items-center justify-between mt-6 px-2 pointer-events-none select-none">
//               <span className="text-5xl font-black text-blue-200/60">ABC</span>
//               <span className="text-5xl font-black text-amber-200/60">123</span>
//             </div>
//           </div>
//         </div>

//         {/* RESULT / CELEBRATION POPUP */}
//         <AnimatePresence>
//           {showResult && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.7, opacity: 0, y: 40 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.7, opacity: 0 }}
//                 transition={{ type: "spring", damping: 18 }}
//                 className="relative w-full max-w-md rounded-[2rem] bg-white shadow-2xl px-6 pt-16 pb-7 text-center"
//               >
//                 <div className="absolute -top-14 left-1/2 -translate-x-1/2">
//                   <motion.div
//                     initial={{ scale: 0, rotate: -30 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ type: "spring", damping: 12, delay: 0.1 }}
//                     className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 shadow-xl ring-4 ring-white"
//                   >
//                     <Trophy className="w-14 h-14 text-amber-300 drop-shadow" />
//                   </motion.div>
//                 </div>

//                 <motion.h2
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
//                 >
//                   Great job!
//                 </motion.h2>

//                 <motion.div
//                   initial={{ scale: 0.6, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: 0.35, type: "spring" }}
//                   className="mt-6 flex justify-center"
//                 >
//                   <span className="inline-block rounded-full bg-blue-100 px-8 py-3 text-3xl sm:text-4xl font-extrabold text-blue-500">
//                     {lastCorrectWord}
//                   </span>
//                 </motion.div>

//                 <div className="mt-6 flex items-center justify-center gap-3">
//                   {[0, 1, 2].map((i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ delay: 0.5 + i * 0.15, type: "spring", damping: 12 }}
//                     >
//                       <Star
//                         className={cn(
//                           "w-14 h-14 drop-shadow-sm",
//                           i < celebrationStars
//                             ? "text-amber-400 fill-amber-400"
//                             : "text-slate-200 fill-slate-100"
//                         )}
//                       />
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.button
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.9 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleNext}
//                   className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xl px-10 py-4 shadow-lg transition"
//                 >
//                   <ArrowRight className="w-6 h-6" />
//                   Next
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </CloudBackground>
//   );
// }



// src/pages/phonics/AdvancedSoundMatchLevel.tsx

import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Volume2,
  Heart,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  SkipForward,
  Zap,
  Play,
} from "lucide-react";

import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// =========================================================
// QUESTIONS
// =========================================================

interface Question {
  id: number;
  targetSound: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

const soundMatchQuestions: Question[] = [
  { id: 1, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Chip", "Ship", "Trip"], correctAnswer: "Ship" },
  { id: 2, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shop", "Top", "Cop"], correctAnswer: "Shop" },
  { id: 3, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Fish", "Fist", "Fast"], correctAnswer: "Fish" },
  { id: 4, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shell", "Bell", "Tell"], correctAnswer: "Shell" },
  { id: 5, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shark", "Bark", "Dark"], correctAnswer: "Shark" },
  { id: 6, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Brush", "Brick", "Black"], correctAnswer: "Brush" },
  { id: 7, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Shy", "Sky", "Sly"], correctAnswer: "Shy" },
  { id: 8, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Wish", "Wick", "Wing"], correctAnswer: "Wish" },
  { id: 9, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Chair", "Share", "Stair"], correctAnswer: "Chair" },
  { id: 10, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Chip", "Ship", "Trip"], correctAnswer: "Chip" },
  { id: 11, targetSound: "CH", prompt: "Choose the word with the CH sound", options: ["Cheese", "Sneeze", "Freeze"], correctAnswer: "Cheese" },
  { id: 12, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Thumb", "Drum", "Plum"], correctAnswer: "Thumb" },
  { id: 13, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Three", "Tree", "Free"], correctAnswer: "Three" },
  { id: 14, targetSound: "TH", prompt: "Choose the word with the TH sound", options: ["Bath", "Bat", "Back"], correctAnswer: "Bath" },
  { id: 15, targetSound: "SH", prompt: "Choose the word with the SH sound", options: ["Trash", "Track", "Truck"], correctAnswer: "Trash" },
];

const LEVEL_ID = 1;
const LEVEL_TITLE = "Advanced Sound Match";
const STARS_PER_CORRECT = 2;
const TOTAL_QUESTIONS = 10;

// =========================================================
// CONFETTI
// =========================================================

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotate: number;
  emoji: string;
}

function ConfettiBurst({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = ["#fbbf24", "#f472b6", "#60a5fa", "#34d399", "#a78bfa", "#fb7185"];
    const emojis = ["⭐", "✨", "🌟", "💫", "🎉"];

    const newPieces: ConfettiPiece[] = Array.from({ length: 24 }).map((_, i) => ({
      id: trigger * 1000 + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
      rotate: Math.random() * 360,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 2000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ opacity: 1, y: -40, x: `${piece.x}vw`, rotate: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: "100vh", rotate: piece.rotate + 720, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, delay: piece.delay, ease: "easeOut" }}
            className="absolute top-0 text-3xl"
          >
            <span className="inline-block drop-shadow-lg" style={{ color: piece.color }}>
              {piece.emoji}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

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
    { size: 220, top: "5%", left: "-5%", from: "#7c3aed", to: "#1e1b4b" },
    { size: 160, top: "60%", left: "92%", from: "#0891b2", to: "#0f172a" },
    { size: 100, top: "85%", left: "3%", from: "#db2777", to: "#4c1d95" },
    { size: 80, top: "22%", left: "85%", from: "#f59e0b", to: "#7c2d12" },
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

      <motion.div
        className="absolute h-0.5 w-32 bg-gradient-to-r from-white via-white/60 to-transparent rounded-full"
        style={{ top: "25%", left: "10%" }}
        animate={{ x: [0, 700], y: [0, 300], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "easeOut" }}
      />
    </div>
  );
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function AdvancedSoundMatchLevel() {
  const navigate = useNavigate();
  const gamification = useGamificationStore();

  const storeStars =
    typeof gamification.stars === "number" ? gamification.stars : 0;
  const completedLevels = Array.isArray(gamification.completedPhonicsLevels)
    ? gamification.completedPhonicsLevels
    : [];

  const [questions] = useState<Question[]>(() => {
    const shuffled = [...soundMatchQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_QUESTIONS);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sessionStars, setSessionStars] = useState(0);
  const [lives, setLives] = useState(3);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [lastCorrectWord, setLastCorrectWord] = useState<string>("");

  const currentQuestion = questions[currentIndex];
  const progressPercent = useMemo(
    () => Math.round((currentIndex / questions.length) * 100),
    [currentIndex, questions.length]
  );

  const playSound = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.8;
      u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    }
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      const newCombo = combo + 1;
      const bonus = newCombo >= 3 ? 2 : 0;
      const gained = STARS_PER_CORRECT + bonus;

      setCombo(newCombo);
      setCorrectCount((c) => c + 1);
      setSessionStars((s) => s + gained);
      setLastCorrectWord(currentQuestion.correctAnswer);
      setConfettiTrigger((t) => t + 1);

      setTimeout(() => setShowResult(true), 400);
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      setTimeout(() => advanceQuestion(), 1400);
    }
  };

  const advanceQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);

    if (currentIndex + 1 >= questions.length) {
      finishLevel();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const finishLevel = () => {
    if (!completedLevels.includes(LEVEL_ID)) {
      gamification.markPhonicsLevelComplete(LEVEL_ID, sessionStars);
    }
    // Always dispatch to force PhonicsPage refresh
    window.dispatchEvent(new Event("phonics-level-completed"));
    window.dispatchEvent(new Event("gamification-updated"));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      finishLevel();
      navigate("/phonics");
    } else {
      advanceQuestion();
    }
  };

  const handleSkip = () => {
    if (selectedAnswer !== null) return;
    setCombo(0);
    advanceQuestion();
  };

  if (!currentQuestion) return null;

  const celebrationStars = Math.min(3, Math.max(1, combo));

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10 min-h-screen pb-16 overflow-hidden">
        <ConfettiBurst trigger={confettiTrigger} />

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4"
        >
          <div className="max-w-3xl mx-auto bg-[#0b0720]/80 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.3)] border-2 border-purple-500/40 px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/phonics")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/40 border border-purple-400/40"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Level {LEVEL_ID}
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold">
                {LEVEL_TITLE}
              </p>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 border border-amber-400/50">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-sm font-extrabold text-amber-200 tabular-nums">
                  {storeStars + sessionStars}
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-300">
                Combo ×{combo}
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-3">
            <div className="h-2 rounded-full bg-purple-950/60 border border-purple-400/30 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1">
              <span className="text-[11px] font-bold text-purple-200/90">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                {lives}
              </span>
            </div>
          </div>
        </motion.header>

        {/* QUESTION CARD */}
        <div className="max-w-3xl mx-auto px-3 sm:px-4 mt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] p-6 sm:p-8 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/25 border border-purple-400/50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Sound: {currentQuestion.targetSound}
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight">
                {currentQuestion.prompt}
              </h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playSound(currentQuestion.correctAnswer)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold px-6 py-3 shadow-lg shadow-cyan-500/40 border border-cyan-400/50 transition"
              >
                <Volume2 className="w-5 h-5" />
                Hear it
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* OPTIONS */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showWrong = selectedAnswer !== null && isSelected && !isCorrect;

              return (
                <motion.button
                  key={option}
                  whileHover={selectedAnswer === null ? { y: -4, scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    "relative rounded-3xl border-2 transition-all duration-300",
                    "py-6 sm:py-8 px-4",
                    "text-xl sm:text-2xl font-extrabold",
                    "bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90 backdrop-blur-xl",
                    "cursor-pointer",
                    selectedAnswer === null &&
                      "border-purple-500/40 text-white hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
                    showCorrect &&
                      "border-emerald-400 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.6)]",
                    showWrong &&
                      "border-rose-400 bg-gradient-to-br from-rose-500/30 to-pink-500/30 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.5)]",
                    !showCorrect && !showWrong && selectedAnswer !== null &&
                      "opacity-40 border-purple-500/20"
                  )}
                >
                  {option}

                  {showCorrect && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg ring-2 ring-white/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.span>
                  )}

                  {showWrong && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 shadow-lg ring-2 ring-white/30"
                    >
                      <XCircle className="w-5 h-5 text-white" />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSound(currentQuestion.correctAnswer)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-400/50 text-purple-100 font-extrabold text-sm sm:text-base py-3.5 px-4 transition shadow-lg"
            >
              <Volume2 className="w-5 h-5" />
              Listen again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSkip}
              disabled={selectedAnswer !== null}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 rounded-2xl font-extrabold text-sm sm:text-base py-3.5 px-4 transition shadow-lg border-2",
                selectedAnswer !== null
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-300/40 cursor-not-allowed"
                  : "bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/50 text-purple-100"
              )}
            >
              <SkipForward className="w-5 h-5" />
              Skip this one
            </motion.button>
          </div>

          <p className="mt-5 text-center text-xs sm:text-sm text-purple-300/70 font-medium flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-300" />
            Tap a word to choose your answer
          </p>
        </div>

        {/* CELEBRATION MODAL */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", damping: 18 }}
                className="relative w-full max-w-md rounded-[2rem] bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95] border-2 border-purple-400/50 shadow-[0_0_80px_rgba(168,85,247,0.6)] px-6 pt-16 pb-7 text-center"
              >
                <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, delay: 0.1 }}
                    className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.8)] ring-4 ring-white/20"
                  >
                    <Trophy className="w-14 h-14 text-amber-300 drop-shadow" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                >
                  Great job!
                </motion.h2>

                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: "spring" }}
                  className="mt-6 flex justify-center"
                >
                  <span className="inline-block rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 px-8 py-3 text-3xl sm:text-4xl font-extrabold text-white shadow-lg">
                    {lastCorrectWord}
                  </span>
                </motion.div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, type: "spring", damping: 12 }}
                    >
                      <Star
                        className={cn(
                          "w-14 h-14 drop-shadow-sm",
                          i < celebrationStars
                            ? "text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                            : "text-purple-700/40 fill-purple-800/30"
                        )}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white font-extrabold text-lg sm:text-xl px-8 py-4 shadow-[0_0_40px_rgba(59,130,246,0.7)] transition border-2 border-cyan-300/40"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Next Question
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <p className="mt-4 text-xs text-purple-300/70">
                  Keep going — you're doing amazing! 🚀
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}