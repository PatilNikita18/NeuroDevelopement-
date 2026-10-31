// import { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Star,
//   Crown,
//   Sparkles,
//   Volume2,
//   VolumeX,
//   Play,
//   CheckCircle2,
//   Zap,
// } from "lucide-react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { cn } from "@/lib/cn";

// // =========================================================
// // TYPES
// // =========================================================

// interface ChallengeLevel {
//   id: number;
//   emoji: string;
//   title: string;
//   description: string;
//   hasCrown?: boolean;
//   gradient: string;
//   starsReward: number; // ⭐ stars earned when this level is completed
// }

// // =========================================================
// // DATA: 18 PHONICS CHALLENGE LEVELS
// // Each level gives a different star reward so progress feels
// // meaningful. Total possible = 1+2+3+...+18 = 171 stars.
// // =========================================================

// const phonicsLevels: ChallengeLevel[] = [
//   {
//     id: 1,
//     emoji: "🎯",
//     title: "Advanced Sound Match",
//     description: "Pick the word with the target sound",
//     gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
//     starsReward: 2,
//   },
//   {
//     id: 2,
//     emoji: "⚡",
//     title: "Build the Word Fast",
//     description: "Unscramble letters before time runs out",
//     gradient: "from-amber-400 via-orange-500 to-red-500",
//     starsReward: 3,
//   },
//   {
//     id: 3,
//     emoji: "📝",
//     title: "Sentence Builder",
//     description: "Put words in the right order",
//     gradient: "from-yellow-400 via-lime-500 to-green-500",
//     starsReward: 3,
//   },
//   {
//     id: 4,
//     emoji: "🎤",
//     title: "Read & Speak",
//     description: "Read aloud into the microphone",
//     gradient: "from-emerald-400 via-teal-500 to-cyan-500",
//     starsReward: 4,
//   },
//   {
//     id: 5,
//     emoji: "🎵",
//     title: "Rhyming Challenge",
//     description: "Find the word that rhymes",
//     gradient: "from-sky-400 via-blue-500 to-indigo-500",
//     starsReward: 4,
//   },
//   {
//     id: 6,
//     emoji: "👑",
//     title: "Phonics Adventure Story",
//     description: "Tap tricky words to hear them",
//     hasCrown: true,
//     gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
//     starsReward: 5,
//   },
//   {
//     id: 7,
//     emoji: "👑",
//     title: "Listening Detective",
//     description: "Listen, then choose the answer",
//     hasCrown: true,
//     gradient: "from-pink-400 via-rose-500 to-red-500",
//     starsReward: 5,
//   },
//   {
//     id: 8,
//     emoji: "✏️",
//     title: "Spell the Word",
//     description: "Type the word you hear",
//     gradient: "from-orange-400 via-amber-500 to-yellow-500",
//     starsReward: 6,
//   },
//   {
//     id: 9,
//     emoji: "👑",
//     title: "Speed Reading",
//     description: "Read before the timer ends",
//     hasCrown: true,
//     gradient: "from-red-400 via-rose-500 to-pink-500",
//     starsReward: 6,
//   },
//   {
//     id: 10,
//     emoji: "👑",
//     title: "R-Controlled Rangers",
//     description: "Bossy r — ar, er, ir, or, ur",
//     hasCrown: true,
//     gradient: "from-teal-400 via-emerald-500 to-green-500",
//     starsReward: 7,
//   },
//   {
//     id: 11,
//     emoji: "👑",
//     title: "Diphthong Dash",
//     description: "Gliding vowels — oi, ow, aw",
//     hasCrown: true,
//     gradient: "from-cyan-400 via-sky-500 to-blue-500",
//     starsReward: 7,
//   },
//   {
//     id: 12,
//     emoji: "👑",
//     title: "Soft C & G",
//     description: "When c says s and g says j",
//     hasCrown: true,
//     gradient: "from-indigo-400 via-violet-500 to-purple-500",
//     starsReward: 8,
//   },
//   {
//     id: 13,
//     emoji: "👑",
//     title: "Syllable Split",
//     description: "Count and split the beats",
//     hasCrown: true,
//     gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
//     starsReward: 8,
//   },
//   {
//     id: 14,
//     emoji: "👑",
//     title: "Suffix Factory",
//     description: "Endings — ing, ed, er, est",
//     hasCrown: true,
//     gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
//     starsReward: 9,
//   },
//   {
//     id: 15,
//     emoji: "👑",
//     title: "Prefix Power",
//     description: "Beginnings — un, re, pre, dis",
//     hasCrown: true,
//     gradient: "from-lime-400 via-green-500 to-emerald-500",
//     starsReward: 9,
//   },
//   {
//     id: 16,
//     emoji: "👑",
//     title: "Homophone Hunt",
//     description: "Same sound, different word",
//     hasCrown: true,
//     gradient: "from-yellow-400 via-amber-500 to-orange-500",
//     starsReward: 10,
//   },
//   {
//     id: 17,
//     emoji: "👑",
//     title: "Big Word Breaker",
//     description: "Break long words apart",
//     hasCrown: true,
//     gradient: "from-blue-400 via-indigo-500 to-violet-500",
//     starsReward: 10,
//   },
//   {
//     id: 18,
//     emoji: "👑",
//     title: "Final Phonics Test",
//     description: "Mixed challenge — all skills",
//     hasCrown: true,
//     gradient: "from-amber-400 via-orange-500 to-rose-500",
//     starsReward: 15,
//   },
// ];

// // =========================================================
// // COMPONENT
// // =========================================================

// export default function PhonicsPage() {
//   const [soundEnabled, setSoundEnabled] = useState(true);

//   // -------------------------------------------------------
//   // PLAYER PROGRESS STATE
//   // -------------------------------------------------------
//   // `completedLevelIds` tracks which levels the child has finished.
//   // Starts EMPTY so the star count begins at 0.
//   // When you wire this to a real store (Zustand/backend), replace
//   // this state with the store's value.
//   // -------------------------------------------------------
//   const [completedLevelIds, setCompletedLevelIds] = useState<number[]>([]);

//   // -------------------------------------------------------
//   // DERIVED STAR COUNT
//   // -------------------------------------------------------
//   // Stars are computed from completed levels — they go up
//   // automatically as the child finishes each challenge.
//   const stars = useMemo(() => {
//     return phonicsLevels
//       .filter((level) => completedLevelIds.includes(level.id))
//       .reduce((total, level) => total + level.starsReward, 0);
//   }, [completedLevelIds]);

//   const totalPossibleStars = useMemo(
//     () => phonicsLevels.reduce((sum, l) => sum + l.starsReward, 0),
//     []
//   );

//   const progressPercent = Math.round(
//     (completedLevelIds.length / phonicsLevels.length) * 100
//   );

//   // -------------------------------------------------------
//   // DEMO: simulate completing a level
//   // -------------------------------------------------------
//   // In the real app, this function will be triggered when the
//   // child finishes an actual level (e.g., after the level page
//   // calls a callback, or via the gamification store).
//   // -------------------------------------------------------
//   const handleLevelComplete = (levelId: number) => {
//     setCompletedLevelIds((prev) =>
//       prev.includes(levelId) ? prev : [...prev, levelId]
//     );
//   };

//   return (
//     <CloudBackground>
//       <div className="min-h-screen pb-12">
//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
//         >
//           <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
//             {/* Back Button */}
//             <Link to="/dashboard">
//               <motion.button
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.94 }}
//                 className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all"
//                 aria-label="Go back to dashboard"
//               >
//                 <ArrowLeft className="w-6 h-6" />
//               </motion.button>
//             </Link>

//             {/* Title */}
//             <div className="text-center flex-1 min-w-0">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent truncate">
//                 Phonics Adventure
//               </h1>
//               <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-0.5">
//                 18 challenge levels • {completedLevelIds.length} done
//               </p>
//             </div>

//             {/* Controls: Sound + Stars */}
//             <div className="flex items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.94 }}
//                 onClick={() => setSoundEnabled(!soundEnabled)}
//                 className={cn(
//                   "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all",
//                   soundEnabled
//                     ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
//                     : "bg-slate-200 text-slate-500"
//                 )}
//                 aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
//               >
//                 {soundEnabled ? (
//                   <Volume2 className="w-5 h-5" />
//                 ) : (
//                   <VolumeX className="w-5 h-5" />
//                 )}
//               </motion.button>

//               {/* ⭐ Stars — starts at 0, grows as levels are completed */}
//               <motion.div
//                 key={stars} // re-animate whenever stars change
//                 initial={{ scale: 1 }}
//                 animate={{ scale: [1, 1.15, 1] }}
//                 transition={{ duration: 0.4 }}
//                 className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-3 sm:px-4 py-2.5 border-2 border-amber-300 shadow-md"
//               >
//                 <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
//                 <span className="text-sm sm:text-base font-extrabold text-amber-700 tabular-nums">
//                   {stars}
//                 </span>
//                 <span className="text-[10px] sm:text-xs font-bold text-amber-600/70 hidden sm:inline">
//                   / {totalPossibleStars}
//                 </span>
//               </motion.div>
//             </div>
//           </div>

//           {/* Progress bar */}
//           <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-3">
//             <div className="flex items-center gap-3">
//               <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Your Journey
//               </span>
//               <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progressPercent}%` }}
//                   transition={{ duration: 1.2, ease: "easeOut" }}
//                   className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
//                 />
//               </div>
//               <span className="text-[10px] sm:text-xs font-extrabold text-emerald-600 whitespace-nowrap tabular-nums">
//                 {progressPercent}%
//               </span>
//             </div>
//           </div>
//         </motion.header>

//         {/* ================================================= */}
//         {/* CHALLENGE GRID */}
//         {/* ================================================= */}
//         <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-6">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mb-5 flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-dashed border-purple-200 px-4 py-3"
//           >
//             <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
//             <p className="text-xs sm:text-sm text-slate-600 font-medium">
//               Tap a colorful card to start a challenge. Earn stars as you play!
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
//             {phonicsLevels.map((level, index) => (
//               <ChallengeCard
//                 key={level.id}
//                 level={level}
//                 index={index}
//                 completed={completedLevelIds.includes(level.id)}
//                 onComplete={() => handleLevelComplete(level.id)}
//               />
//             ))}
//           </div>

//           {/* Bottom message */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-8 text-center"
//           >
//             <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 px-5 py-2.5 border-2 border-purple-200">
//               <Zap className="w-4 h-4 text-purple-600" />
//               <p className="text-xs sm:text-sm font-bold text-purple-700">
//                 {stars === 0
//                   ? "Play a level to earn your first star! ⭐"
//                   : `Amazing! You've earned ${stars} star${stars === 1 ? "" : "s"}! Keep going! 🚀`}
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </CloudBackground>
//   );
// }

// // =========================================================
// // CHALLENGE CARD
// // =========================================================

// function ChallengeCard({
//   level,
//   index,
//   completed,
//   onComplete,
// }: {
//   level: ChallengeLevel;
//   index: number;
//   completed: boolean;
//   onComplete: () => void;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{
//         delay: index * 0.04,
//         duration: 0.45,
//         ease: "easeOut",
//       }}
//       whileHover={{ y: -6, scale: 1.02 }}
//       whileTap={{ scale: 0.97 }}
//       className="h-full"
//     >
//       <Link
//         to={`/reading/phonics/level/${level.id}`}
//         aria-label={`Level ${level.id}: ${level.title}. ${level.description}`}
//         onClick={() => {
//           // -------------------------------------------------
//           // DEMO ONLY:
//           // Simulate the child completing this level.
//           // In the real app, remove this and let the level
//           // page call a shared store (e.g. gamificationStore)
//           // when the child actually finishes the challenge.
//           // -------------------------------------------------
//           onComplete();
//         }}
//       >
//         <div
//           className={cn(
//             "group relative overflow-hidden rounded-3xl bg-white h-full",
//             "border-2 transition-all duration-300",
//             "shadow-lg hover:shadow-2xl",
//             "cursor-pointer p-4 sm:p-5 flex flex-col",
//             completed
//               ? "border-emerald-300 ring-2 ring-emerald-100"
//               : "border-white hover:border-white"
//           )}
//         >
//           {/* Colorful gradient top accent bar */}
//           <div
//             className={cn(
//               "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
//               level.gradient
//             )}
//           />

//           {/* Soft gradient wash */}
//           <div
//             className={cn(
//               "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
//               level.gradient
//             )}
//           />

//           {/* Card Header: Emoji + Number Badge */}
//           <div className="relative flex items-start justify-between mb-3">
//             <motion.span
//               whileHover={{ rotate: [0, -8, 8, 0] }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl sm:text-5xl drop-shadow-md select-none"
//               aria-hidden="true"
//             >
//               {level.emoji}
//             </motion.span>

//             <div className="flex items-center gap-1.5 shrink-0">
//               {level.hasCrown && (
//                 <span
//                   className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md ring-2 ring-white"
//                   aria-label="Special challenge"
//                 >
//                   <Crown className="w-3.5 h-3.5 text-white" />
//                 </span>
//               )}

//               <span
//                 className={cn(
//                   "flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-extrabold shadow-md ring-2 ring-white bg-gradient-to-br",
//                   level.gradient
//                 )}
//               >
//                 {level.id}
//               </span>
//             </div>
//           </div>

//           {/* Title */}
//           <h3 className="relative text-sm sm:text-base md:text-lg font-extrabold text-slate-800 leading-snug mb-1.5">
//             {level.title}
//           </h3>

//           {/* Description */}
//           <p className="relative text-[11px] sm:text-xs md:text-sm text-slate-500 leading-snug flex-1">
//             {level.description}
//           </p>

//           {/* Footer */}
//           <div className="relative mt-3 flex items-center justify-between">
//             {completed ? (
//               <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-600 border border-emerald-200">
//                 <CheckCircle2 className="w-3 h-3" />
//                 +{level.starsReward} ⭐
//               </span>
//             ) : (
//               <span
//                 className={cn(
//                   "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r",
//                   level.gradient
//                 )}
//               >
//                 <Play className="w-3 h-3 fill-white" />
//                 +{level.starsReward} ⭐
//               </span>
//             )}

//             <motion.div
//               initial={{ x: 0, opacity: 0.6 }}
//               whileHover={{ x: 4, opacity: 1 }}
//               className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-slate-200 transition-colors"
//             >
//               <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
//             </motion.div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }






// import { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Star,
//   Crown,
//   Sparkles,
//   Volume2,
//   VolumeX,
//   Play,
//   CheckCircle2,
//   Zap,
// } from "lucide-react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { useGamificationStore } from "@/stores/gamificationStore";
// import { cn } from "@/lib/cn";

// interface ChallengeLevel {
//   id: number;
//   emoji: string;
//   title: string;
//   description: string;
//   hasCrown?: boolean;
//   gradient: string;
//   starsReward: number;
// }

// const phonicsLevels: ChallengeLevel[] = [
//   { id: 1, emoji: "🎯", title: "Advanced Sound Match", description: "Pick the word with the target sound", gradient: "from-rose-400 via-pink-500 to-fuchsia-500", starsReward: 20 },
//   { id: 2, emoji: "⚡", title: "Build the Word Fast", description: "Unscramble letters before time runs out", gradient: "from-amber-400 via-orange-500 to-red-500", starsReward: 30 },
//   { id: 3, emoji: "📝", title: "Sentence Builder", description: "Put words in the right order", gradient: "from-yellow-400 via-lime-500 to-green-500", starsReward: 30 },
//   { id: 4, emoji: "🎤", title: "Read & Speak", description: "Read aloud into the microphone", gradient: "from-emerald-400 via-teal-500 to-cyan-500", starsReward: 40 },
//   { id: 5, emoji: "🎵", title: "Rhyming Challenge", description: "Find the word that rhymes", gradient: "from-sky-400 via-blue-500 to-indigo-500", starsReward: 40 },
//   { id: 6, emoji: "👑", title: "Phonics Adventure Story", description: "Tap tricky words to hear them", hasCrown: true, gradient: "from-violet-400 via-purple-500 to-fuchsia-500", starsReward: 50 },
//   { id: 7, emoji: "👑", title: "Listening Detective", description: "Listen, then choose the answer", hasCrown: true, gradient: "from-pink-400 via-rose-500 to-red-500", starsReward: 50 },
//   { id: 8, emoji: "✏️", title: "Spell the Word", description: "Type the word you hear", gradient: "from-orange-400 via-amber-500 to-yellow-500", starsReward: 60 },
//   { id: 9, emoji: "👑", title: "Speed Reading", description: "Read before the timer ends", hasCrown: true, gradient: "from-red-400 via-rose-500 to-pink-500", starsReward: 60 },
//   { id: 10, emoji: "👑", title: "R-Controlled Rangers", description: "Bossy r — ar, er, ir, or, ur", hasCrown: true, gradient: "from-teal-400 via-emerald-500 to-green-500", starsReward: 70 },
//   { id: 11, emoji: "👑", title: "Diphthong Dash", description: "Gliding vowels — oi, ow, aw", hasCrown: true, gradient: "from-cyan-400 via-sky-500 to-blue-500", starsReward: 70 },
//   { id: 12, emoji: "👑", title: "Soft C & G", description: "When c says s and g says j", hasCrown: true, gradient: "from-indigo-400 via-violet-500 to-purple-500", starsReward: 80 },
//   { id: 13, emoji: "👑", title: "Syllable Split", description: "Count and split the beats", hasCrown: true, gradient: "from-purple-400 via-fuchsia-500 to-pink-500", starsReward: 80 },
//   { id: 14, emoji: "👑", title: "Suffix Factory", description: "Endings — ing, ed, er, est", hasCrown: true, gradient: "from-fuchsia-400 via-pink-500 to-rose-500", starsReward: 90 },
//   { id: 15, emoji: "👑", title: "Prefix Power", description: "Beginnings — un, re, pre, dis", hasCrown: true, gradient: "from-lime-400 via-green-500 to-emerald-500", starsReward: 90 },
//   { id: 16, emoji: "👑", title: "Homophone Hunt", description: "Same sound, different word", hasCrown: true, gradient: "from-yellow-400 via-amber-500 to-orange-500", starsReward: 100 },
//   { id: 17, emoji: "👑", title: "Big Word Breaker", description: "Break long words apart", hasCrown: true, gradient: "from-blue-400 via-indigo-500 to-violet-500", starsReward: 100 },
//   { id: 18, emoji: "👑", title: "Final Phonics Test", description: "Mixed challenge — all skills", hasCrown: true, gradient: "from-amber-400 via-orange-500 to-rose-500", starsReward: 150 },
// ];

// export default function PhonicsPage() {
//   const [soundEnabled, setSoundEnabled] = useState(true);

//   const stars = useGamificationStore((s) => s.stars);
//   const completedLevelIds = useGamificationStore(
//     (s) => s.completedPhonicsLevels
//   );

//   const totalPossibleStars = useMemo(
//     () => phonicsLevels.reduce((sum, l) => sum + l.starsReward, 0),
//     []
//   );

//   const progressPercent = Math.round(
//     (completedLevelIds.length / phonicsLevels.length) * 100
//   );

//   return (
//     <CloudBackground>
//       <div className="min-h-screen pb-12">
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
//         >
//           <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
//             <Link to="/dashboard">
//               <motion.button
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.94 }}
//                 className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg"
//                 aria-label="Go back"
//               >
//                 <ArrowLeft className="w-6 h-6" />
//               </motion.button>
//             </Link>

//             <div className="text-center flex-1 min-w-0">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent truncate">
//                 Phonics Adventure
//               </h1>
//               <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-0.5">
//                 18 challenge levels • {completedLevelIds.length} done
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.06 }}
//                 whileTap={{ scale: 0.94 }}
//                 onClick={() => setSoundEnabled(!soundEnabled)}
//                 className={cn(
//                   "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all",
//                   soundEnabled
//                     ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
//                     : "bg-slate-200 text-slate-500"
//                 )}
//                 aria-label={soundEnabled ? "Mute" : "Unmute"}
//               >
//                 {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
//               </motion.button>

//               <motion.div
//                 key={stars}
//                 initial={{ scale: 1 }}
//                 animate={{ scale: [1, 1.15, 1] }}
//                 transition={{ duration: 0.4 }}
//                 className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-3 sm:px-4 py-2.5 border-2 border-amber-300 shadow-md"
//               >
//                 <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
//                 <span className="text-sm sm:text-base font-extrabold text-amber-700 tabular-nums">
//                   {stars}
//                 </span>
//                 <span className="text-[10px] sm:text-xs font-bold text-amber-600/70 hidden sm:inline">
//                   / {totalPossibleStars}
//                 </span>
//               </motion.div>
//             </div>
//           </div>

//           <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-3">
//             <div className="flex items-center gap-3">
//               <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Your Journey
//               </span>
//               <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progressPercent}%` }}
//                   transition={{ duration: 1.2 }}
//                   className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
//                 />
//               </div>
//               <span className="text-[10px] sm:text-xs font-extrabold text-emerald-600 tabular-nums">
//                 {progressPercent}%
//               </span>
//             </div>
//           </div>
//         </motion.header>

//         <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-6">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-5 flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-dashed border-purple-200 px-4 py-3"
//           >
//             <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
//             <p className="text-xs sm:text-sm text-slate-600 font-medium">
//               Tap a colorful card to start a challenge. Earn stars as you play!
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
//             {phonicsLevels.map((level, index) => (
//               <ChallengeCard
//                 key={level.id}
//                 level={level}
//                 index={index}
//                 completed={completedLevelIds.includes(level.id)}
//               />
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-8 text-center"
//           >
//             <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 px-5 py-2.5 border-2 border-purple-200">
//               <Zap className="w-4 h-4 text-purple-600" />
//               <p className="text-xs sm:text-sm font-bold text-purple-700">
//                 {stars === 0
//                   ? "Play a level to earn your first star! ⭐"
//                   : `Amazing! You've earned ${stars} star${stars === 1 ? "" : "s"}! 🚀`}
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </CloudBackground>
//   );
// }

// function ChallengeCard({
//   level,
//   index,
//   completed,
// }: {
//   level: ChallengeLevel;
//   index: number;
//   completed: boolean;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ delay: index * 0.04, duration: 0.45 }}
//       whileHover={{ y: -6, scale: 1.02 }}
//       whileTap={{ scale: 0.97 }}
//       className="h-full"
//     >
//       <Link to={`/phonics/level/${level.id}`} className="block h-full">
//         <div
//           className={cn(
//             "group relative overflow-hidden rounded-3xl bg-white h-full",
//             "border-2 transition-all duration-300 shadow-lg hover:shadow-2xl",
//             "cursor-pointer p-4 sm:p-5 flex flex-col",
//             completed
//               ? "border-emerald-300 ring-2 ring-emerald-100"
//               : "border-white"
//           )}
//         >
//           <div
//             className={cn(
//               "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
//               level.gradient
//             )}
//           />
//           <div
//             className={cn(
//               "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
//               level.gradient
//             )}
//           />

//           <div className="relative flex items-start justify-between mb-3">
//             <span className="text-4xl sm:text-5xl drop-shadow-md select-none">
//               {level.emoji}
//             </span>
//             <div className="flex items-center gap-1.5 shrink-0">
//               {level.hasCrown && (
//                 <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md ring-2 ring-white">
//                   <Crown className="w-3.5 h-3.5 text-white" />
//                 </span>
//               )}
//               <span
//                 className={cn(
//                   "flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-extrabold shadow-md ring-2 ring-white bg-gradient-to-br",
//                   level.gradient
//                 )}
//               >
//                 {level.id}
//               </span>
//             </div>
//           </div>

//           <h3 className="relative text-sm sm:text-base md:text-lg font-extrabold text-slate-800 leading-snug mb-1.5">
//             {level.title}
//           </h3>
//           <p className="relative text-[11px] sm:text-xs md:text-sm text-slate-500 leading-snug flex-1">
//             {level.description}
//           </p>

//           <div className="relative mt-3 flex items-center justify-between">
//             {completed ? (
//               <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-600 border border-emerald-200">
//                 <CheckCircle2 className="w-3 h-3" />
//                 Done
//               </span>
//             ) : (
//               <span
//                 className={cn(
//                   "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r",
//                   level.gradient
//                 )}
//               >
//                 <Play className="w-3 h-3 fill-white" />
//                 +{level.starsReward} ⭐
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }


// src/pages/phonics/PhonicsPage.tsx

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Crown,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  Zap,
  Flame,
} from "lucide-react";

import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";

// =========================================================
// TYPES
// =========================================================

interface ChallengeLevel {
  id: number;
  emoji: string;
  title: string;
  description: string;
  hasCrown?: boolean;
  gradient: string;
  starsReward: number;
}

// =========================================================
// DATA
// =========================================================

const phonicsLevels: ChallengeLevel[] = [
  { id: 1, emoji: "🎯", title: "Advanced Sound Match", description: "Pick the word with the target sound", gradient: "from-rose-400 via-pink-500 to-fuchsia-500", starsReward: 20 },
  { id: 2, emoji: "⚡", title: "Build the Word Fast", description: "Unscramble letters before time runs out", gradient: "from-amber-400 via-orange-500 to-red-500", starsReward: 30 },
  { id: 3, emoji: "📝", title: "Sentence Builder", description: "Put words in the right order", gradient: "from-yellow-400 via-lime-500 to-green-500", starsReward: 30 },
  { id: 4, emoji: "🎤", title: "Read & Speak", description: "Read aloud into the microphone", gradient: "from-emerald-400 via-teal-500 to-cyan-500", starsReward: 40 },
  { id: 5, emoji: "🎵", title: "Rhyming Challenge", description: "Find the word that rhymes", gradient: "from-sky-400 via-blue-500 to-indigo-500", starsReward: 40 },
  { id: 6, emoji: "👑", title: "Phonics Adventure Story", description: "Tap tricky words to hear them", hasCrown: true, gradient: "from-violet-400 via-purple-500 to-fuchsia-500", starsReward: 50 },
  { id: 7, emoji: "👑", title: "Listening Detective", description: "Listen, then choose the answer", hasCrown: true, gradient: "from-pink-400 via-rose-500 to-red-500", starsReward: 50 },
  { id: 8, emoji: "✏️", title: "Spell the Word", description: "Type the word you hear", gradient: "from-orange-400 via-amber-500 to-yellow-500", starsReward: 60 },
  { id: 9, emoji: "👑", title: "Speed Reading", description: "Read before the timer ends", hasCrown: true, gradient: "from-red-400 via-rose-500 to-pink-500", starsReward: 60 },
  { id: 10, emoji: "👑", title: "R-Controlled Rangers", description: "Bossy r — ar, er, ir, or, ur", hasCrown: true, gradient: "from-teal-400 via-emerald-500 to-green-500", starsReward: 70 },
  { id: 11, emoji: "👑", title: "Diphthong Dash", description: "Gliding vowels — oi, ow, aw", hasCrown: true, gradient: "from-cyan-400 via-sky-500 to-blue-500", starsReward: 70 },
  { id: 12, emoji: "👑", title: "Soft C & G", description: "When c says s and g says j", hasCrown: true, gradient: "from-indigo-400 via-violet-500 to-purple-500", starsReward: 80 },
  { id: 13, emoji: "👑", title: "Syllable Split", description: "Count and split the beats", hasCrown: true, gradient: "from-purple-400 via-fuchsia-500 to-pink-500", starsReward: 80 },
  { id: 14, emoji: "👑", title: "Suffix Factory", description: "Endings — ing, ed, er, est", hasCrown: true, gradient: "from-fuchsia-400 via-pink-500 to-rose-500", starsReward: 90 },
  { id: 15, emoji: "👑", title: "Prefix Power", description: "Beginnings — un, re, pre, dis", hasCrown: true, gradient: "from-lime-400 via-green-500 to-emerald-500", starsReward: 90 },
  { id: 16, emoji: "👑", title: "Homophone Hunt", description: "Same sound, different word", hasCrown: true, gradient: "from-yellow-400 via-amber-500 to-orange-500", starsReward: 100 },
  { id: 17, emoji: "👑", title: "Big Word Breaker", description: "Break long words apart", hasCrown: true, gradient: "from-blue-400 via-indigo-500 to-violet-500", starsReward: 100 },
  { id: 18, emoji: "👑", title: "Final Phonics Test", description: "Mixed challenge — all skills", hasCrown: true, gradient: "from-amber-400 via-orange-500 to-rose-500", starsReward: 150 },
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
// MAIN PAGE
// =========================================================

export default function PhonicsPage() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const starsRaw = useGamificationStore((s) => s.stars);
  const completedRaw = useGamificationStore((s) => s.completedPhonicsLevels);
  const streakRaw = useGamificationStore((s) => s.streakDays);
  const lastActivityDate = useGamificationStore((s) => s.lastActivityDate);
  const resetStreakIfBroken = useGamificationStore((s) => s.resetStreakIfBroken);

  const stars = typeof starsRaw === "number" ? starsRaw : 0;
  const streakDays = typeof streakRaw === "number" ? streakRaw : 0;
  const completedLevelIds: number[] = Array.isArray(completedRaw)
    ? completedRaw
    : [];

  // Reset streak on mount if broken
  useEffect(() => {
    resetStreakIfBroken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset on tab focus
  useEffect(() => {
    const onFocus = () => resetStreakIfBroken();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live update ticks
  const [localTicks, setLocalTicks] = useState(0);
  useEffect(() => {
    const bump = () => setLocalTicks((n) => n + 1);

    window.addEventListener("phonics-level-completed", bump);
    window.addEventListener("gamification-updated", bump);
    window.addEventListener("assessment-result-updated", bump);
    window.addEventListener("storage", bump);

    return () => {
      window.removeEventListener("phonics-level-completed", bump);
      window.removeEventListener("gamification-updated", bump);
      window.removeEventListener("assessment-result-updated", bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  const totalPossibleStars = useMemo(
    () => phonicsLevels.reduce((sum, l) => sum + l.starsReward, 0),
    []
  );

  const completedCount = useMemo(
    () => phonicsLevels.filter((l) => completedLevelIds.includes(l.id)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedLevelIds, localTicks]
  );

  const progressPercent = Math.round(
    (completedCount / phonicsLevels.length) * 100
  );

  const todayKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTicks]);

  const streakMessage = useMemo(() => {
    if (streakDays === 0) return "Play today to start your streak! 🔥";
    if (lastActivityDate === todayKey)
      return `${streakDays}-day streak — already counted today!`;
    return `${streakDays}-day streak — play today to keep it alive!`;
  }, [streakDays, lastActivityDate, todayKey]);

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
                Phonics Adventure
              </h1>
              <p className="text-[11px] sm:text-sm text-purple-200/80 font-semibold mt-0.5">
                18 challenge levels •{" "}
                <span className="text-emerald-300 font-bold">
                  {completedCount} done
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 rounded-full bg-orange-500/20 px-3 py-2 border border-orange-400/50 shadow-md"
                title={streakMessage}
              >
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="text-sm font-extrabold text-orange-200 tabular-nums">
                  {streakDays}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={cn(
                  "hidden sm:flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all border",
                  soundEnabled
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-emerald-300/40 shadow-emerald-500/40"
                    : "bg-purple-500/20 text-purple-200 border-purple-400/40"
                )}
                aria-label={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </motion.button>

              <motion.div
                key={stars}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 sm:px-4 py-2.5 border border-amber-400/50 shadow-md"
              >
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span className="text-sm sm:text-base font-extrabold text-amber-200 tabular-nums">
                  {stars}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-300/70 hidden sm:inline">
                  / {totalPossibleStars}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Progress + streak info */}
          <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-bold text-purple-200/80 uppercase tracking-wider whitespace-nowrap">
                Your Journey
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-purple-950/50 border border-purple-400/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-extrabold text-emerald-300 tabular-nums">
                {progressPercent}%
              </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-orange-200/90 font-semibold">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              {streakMessage}
            </div>
          </div>
        </motion.header>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-400/40 px-4 py-3"
          >
            <Sparkles className="w-5 h-5 text-cyan-300 shrink-0" />
            <p className="text-xs sm:text-sm text-purple-100 font-medium">
              Tap a colorful card to start a challenge. Earn stars as you play!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {phonicsLevels.map((level, index) => (
              <ChallengeCard
                key={level.id}
                level={level}
                index={index}
                completed={completedLevelIds.includes(level.id)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 px-5 py-2.5 border border-purple-400/40 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-cyan-300" />
              <p className="text-xs sm:text-sm font-bold text-purple-100">
                {stars === 0
                  ? "Play a level to earn your first star! ⭐"
                  : `Amazing! You've earned ${stars} star${
                      stars === 1 ? "" : "s"
                    }! 🚀`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// CHALLENGE CARD
// =========================================================

function ChallengeCard({
  level,
  index,
  completed,
}: {
  level: ChallengeLevel;
  index: number;
  completed: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => {
          window.location.href = `/phonics/level/${level.id}`;
        }}
        className="block h-full w-full text-left"
      >
        <div
          className={cn(
            "group relative overflow-hidden rounded-[1.75rem] h-full",
            "backdrop-blur-xl border-2 transition-all duration-300",
            "cursor-pointer p-4 sm:p-5 flex flex-col",
            "bg-gradient-to-br from-[#1e1b4b]/90 to-[#0f0a2e]/90",
            completed
              ? "border-emerald-500/60 ring-2 ring-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              : "border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:border-purple-400/70"
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
              level.gradient
            )}
          />
          <div
            className={cn(
              "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl",
              level.gradient
            )}
          />

          <div className="relative flex items-start justify-between mb-3">
            <span className="text-4xl sm:text-5xl drop-shadow-lg select-none">
              {level.emoji}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {level.hasCrown && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md ring-2 ring-white/20">
                  <Crown className="w-3.5 h-3.5 text-white" />
                </span>
              )}
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-extrabold shadow-md ring-2 ring-white/20 bg-gradient-to-br",
                  level.gradient
                )}
              >
                {level.id}
              </span>
            </div>
          </div>

          <h3 className="relative text-sm sm:text-base md:text-lg font-extrabold text-white leading-snug mb-1.5">
            {level.title}
          </h3>
          <p className="relative text-[11px] sm:text-xs md:text-sm text-purple-200/75 leading-snug flex-1">
            {level.description}
          </p>

          <div className="relative mt-3 flex items-center justify-between">
            {completed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-200 border border-emerald-400/50">
                <CheckCircle2 className="w-3 h-3" />
                Done
              </span>
            ) : (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r shadow-md",
                  level.gradient
                )}
              >
                <Play className="w-3 h-3 fill-white" />
                +{level.starsReward} ⭐
              </span>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}