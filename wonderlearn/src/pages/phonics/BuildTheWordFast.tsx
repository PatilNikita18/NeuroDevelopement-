
// import React, { useEffect, useMemo, useState } from "react";
// import "./BuildTheWordFast.css";

// type WordQuestion = {
//   word: string;
//   emoji: string;
//   clue: string;
//   hint: string;
// };

// const QUESTIONS: WordQuestion[] = [
//   { word: "CAT", emoji: "🐱", clue: "A pet that says meow!", hint: "It starts with C." },
//   { word: "SUN", emoji: "☀️", clue: "It shines in the sky.", hint: "It starts with S." },
//   { word: "FISH", emoji: "🐠", clue: "It swims in water.", hint: "It starts with F." },
//   { word: "BOOK", emoji: "📚", clue: "You read a...", hint: "It starts with B." },
//   { word: "TREE", emoji: "🌳", clue: "It has leaves and branches.", hint: "It starts with T." },
//   { word: "STAR", emoji: "⭐", clue: "You can see it in the night sky.", hint: "It starts with S." },
//   { word: "DUCK", emoji: "🦆", clue: "A bird that can swim.", hint: "It starts with D." },
//   { word: "CAKE", emoji: "🎂", clue: "A sweet treat for birthdays.", hint: "It starts with C." },
// ];

// const ROUND_SECONDS = 25;

// function shuffleLetters(word: string): string[] {
//   const letters = word.split("");

//   // Try to avoid showing the answer in its original order.
//   for (let attempt = 0; attempt < 10; attempt++) {
//     for (let i = letters.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [letters[i], letters[j]] = [letters[j], letters[i]];
//     }

//     if (letters.join("") !== word) break;
//   }

//   return letters;
// }

// function speak(text: string) {
//   if (
//     typeof window !== "undefined" &&
//     "speechSynthesis" in window
//   ) {
//     window.speechSynthesis.cancel();
//     const message = new SpeechSynthesisUtterance(text);
//     message.rate = 0.8;
//     message.pitch = 1.05;
//     window.speechSynthesis.speak(message);
//   }
// }

// export default function BuildTheWordFast() {
//   const [round, setRound] = useState(0);
//   const [selected, setSelected] = useState<number[]>([]);
//   const [seconds, setSeconds] = useState(ROUND_SECONDS);
//   const [timedMode, setTimedMode] = useState(true);
//   const [gameOver, setGameOver] = useState(false);
//   const [finished, setFinished] = useState(false);
//   const [feedback, setFeedback] = useState(
//     "Tap the letters to build your word!"
//   );
//   const [feedbackType, setFeedbackType] = useState<
//     "info" | "success" | "try"
//   >("info");
//   const [hintVisible, setHintVisible] = useState(false);
//   const [stars, setStars] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [attempts, setAttempts] = useState(0);
//   const [completedWords, setCompletedWords] = useState<string[]>([]);

//   const question = QUESTIONS[round];

//   const scrambledLetters = useMemo(
//     () => shuffleLetters(question.word),
//     [round, question.word]
//   );

//   const chosenWord = selected
//     .map((index) => scrambledLetters[index])
//     .join("");

//   useEffect(() => {
//     if (!timedMode || gameOver || finished) return;

//     const timer = window.setInterval(() => {
//       setSeconds((previous) => Math.max(0, previous - 1));
//     }, 1000);

//     return () => window.clearInterval(timer);
//   }, [round, timedMode, gameOver, finished]);

//   useEffect(() => {
//     if (timedMode && seconds === 0 && !finished) {
//       setGameOver(true);
//       setFeedback("Time is up! That's okay — let's try again. 💛");
//       setFeedbackType("try");
//     }
//   }, [seconds, timedMode, finished]);

//   function selectLetter(index: number) {
//     if (
//       selected.includes(index) ||
//       gameOver ||
//       finished
//     ) {
//       return;
//     }

//     setSelected((previous) => [...previous, index]);
//     setFeedback("Keep going! You can do it. ✨");
//     setFeedbackType("info");
//   }

//   function removeLetter(position: number) {
//     if (gameOver || finished) return;

//     setSelected((previous) =>
//       previous.filter((_, index) => index !== position)
//     );
//     setFeedback("No problem! Try another letter.");
//     setFeedbackType("info");
//   }

//   function checkWord() {
//     if (gameOver || finished) return;

//     if (selected.length !== question.word.length) {
//       setFeedback("Choose all the letters first. 🌈");
//       setFeedbackType("info");
//       return;
//     }

//     setAttempts((previous) => previous + 1);

//     if (chosenWord === question.word) {
//       setStars((previous) => previous + (hintVisible ? 1 : 2));
//       setCorrectCount((previous) => previous + 1);
//       setCompletedWords((previous) => [...previous, question.word]);
//       setFeedback("Amazing! You built the word! 🎉");
//       setFeedbackType("success");

//       window.setTimeout(() => {
//         if (round + 1 >= QUESTIONS.length) {
//           setFinished(true);
//           setGameOver(false);
//           return;
//         }

//         setRound((previous) => previous + 1);
//         setSelected([]);
//         setSeconds(ROUND_SECONDS);
//         setHintVisible(false);
//         setFeedback("Ready for your next word?");
//         setFeedbackType("info");
//       }, 900);
//     } else {
//       setFeedback("Good try! Move a letter and try again. 💪");
//       setFeedbackType("try");
//     }
//   }

//   function showHint() {
//     if (gameOver || finished) return;

//     setHintVisible(true);
//     setFeedback(`Here's a clue: ${question.hint}`);
//     setFeedbackType("info");
//     speak(`${question.clue} ${question.hint}`);
//   }

//   function skipWord() {
//     if (gameOver || finished) return;

//     if (round + 1 >= QUESTIONS.length) {
//       setFinished(true);
//       return;
//     }

//     setRound((previous) => previous + 1);
//     setSelected([]);
//     setSeconds(ROUND_SECONDS);
//     setHintVisible(false);
//     setFeedback("Let's try a new word! 🌟");
//     setFeedbackType("info");
//   }

//   function restartGame() {
//     setRound(0);
//     setSelected([]);
//     setSeconds(ROUND_SECONDS);
//     setGameOver(false);
//     setFinished(false);
//     setHintVisible(false);
//     setStars(0);
//     setCorrectCount(0);
//     setAttempts(0);
//     setCompletedWords([]);
//     setFeedback("Tap the letters to build your word!");
//     setFeedbackType("info");
//   }

//   function toggleTimer() {
//     setTimedMode((previous) => !previous);
//     setSeconds(ROUND_SECONDS);
//     setFeedback(
//       timedMode
//         ? "Relax mode on! Take all the time you need. 💛"
//         : "Challenge mode on! You have 25 seconds per word."
//     );
//     setFeedbackType("info");
//   }

//   const progress = finished
//     ? 100
//     : Math.round((round / QUESTIONS.length) * 100);

//   return (
//     <main className="word-game">
//       <header className="word-game-header">
//         <a className="word-back-link" href="/phonics">
//           <span aria-hidden="true">←</span> Phonics
//         </a>

//         <div className="word-header-title">
//           <span className="word-header-icon" aria-hidden="true">🔤</span>
//           <div>
//             <p className="word-eyebrow">WORD ADVENTURE · LEVEL 2</p>
//             <h1>Build the Word Fast!</h1>
//           </div>
//         </div>

//         <p className="word-intro">
//           Look at the picture, find the letters, and build the word.
//           You can do it!
//         </p>
//       </header>

//       <section className="word-stats" aria-label="Game progress">
//         <div className="word-stat">
//           <span aria-hidden="true">⭐</span>
//           <div>
//             <strong>{stars}</strong>
//             <small>Stars earned</small>
//           </div>
//         </div>

//         <div className="word-stat">
//           <span aria-hidden="true">🎯</span>
//           <div>
//             <strong>{correctCount}/{QUESTIONS.length}</strong>
//             <small>Words solved</small>
//           </div>
//         </div>

//         <div className="word-stat word-timer-stat">
//           <span aria-hidden="true">⏰</span>
//           <div>
//             <strong>
//               {timedMode && !finished ? `${seconds}s` : "Relax"}
//             </strong>
//             <small>{timedMode ? "Time left" : "No time limit"}</small>
//           </div>
//         </div>
//       </section>

//       <section className="word-progress-area">
//         <div className="word-progress-label">
//           <span>Your adventure</span>
//           <strong>{finished ? QUESTIONS.length : round + 1} of {QUESTIONS.length}</strong>
//         </div>
//         <div
//           className="word-progress-track"
//           role="progressbar"
//           aria-label="Word adventure progress"
//           aria-valuemin={0}
//           aria-valuemax={100}
//           aria-valuenow={progress}
//         >
//           <div
//             className="word-progress-fill"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </section>

//       {!finished && !gameOver && (
//         <section className="word-play-card" aria-label="Word puzzle">
//           <div className="word-picture-panel">
//             <span className="word-picture" role="img" aria-label={question.word}>
//               {question.emoji}
//             </span>
//             <span className="word-picture-sparkle" aria-hidden="true">✨</span>
//             <h2>What is this?</h2>
//             <p>{question.clue}</p>
//             <button
//               type="button"
//               className="word-speak-button"
//               onClick={() => speak(question.clue)}
//             >
//               🔊 Listen to the clue
//             </button>
//           </div>

//           <div className="word-answer-panel">
//             <p className="word-step-label">YOUR TURN</p>
//             <h2>Build the word</h2>
//             <p className="word-instruction">
//               Tap a letter below. Tap a chosen letter to remove it.
//             </p>

//             <div
//               className="word-answer-slots"
//               aria-label={`Your word has ${selected.length} of ${question.word.length} letters`}
//             >
//               {Array.from({ length: question.word.length }).map((_, index) => {
//                 const letterIndex = selected[index];
//                 return (
//                   <button
//                     type="button"
//                     className={`word-slot ${letterIndex !== undefined ? "word-slot-filled" : ""}`}
//                     key={index}
//                     onClick={() => removeLetter(index)}
//                     disabled={letterIndex === undefined}
//                     aria-label={
//                       letterIndex !== undefined
//                         ? `Remove letter ${scrambledLetters[letterIndex]}`
//                         : `Empty letter slot ${index + 1}`
//                     }
//                   >
//                     {letterIndex !== undefined
//                       ? scrambledLetters[letterIndex]
//                       : ""}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="word-letter-bank" aria-label="Available letters">
//               {scrambledLetters.map((letter, index) => {
//                 const used = selected.includes(index);
//                 return (
//                   <button
//                     type="button"
//                     key={`${round}-${index}`}
//                     className={`word-letter ${used ? "word-letter-used" : ""}`}
//                     onClick={() => selectLetter(index)}
//                     disabled={used}
//                     aria-label={`Choose letter ${letter}`}
//                     aria-pressed={used}
//                   >
//                     {letter}
//                   </button>
//                 );
//               })}
//             </div>

//             <div
//               className={`word-feedback word-feedback-${feedbackType}`}
//               role="status"
//               aria-live="polite"
//             >
//               <span aria-hidden="true">
//                 {feedbackType === "success" ? "🎉" : feedbackType === "try" ? "💛" : "🌈"}
//               </span>
//               {feedback}
//             </div>

//             {hintVisible && (
//               <div className="word-hint-box">
//                 💡 {question.hint}
//               </div>
//             )}

//             <div className="word-action-buttons">
//               <button
//                 type="button"
//                 className="word-button word-button-primary"
//                 onClick={checkWord}
//               >
//                 Check my word ✓
//               </button>
//               <button
//                 type="button"
//                 className="word-button word-button-soft"
//                 onClick={() => {
//                   setSelected([]);
//                   setFeedback("Letters cleared. Have another go!");
//                   setFeedbackType("info");
//                 }}
//               >
//                 ↺ Clear
//               </button>
//             </div>

//             <div className="word-helper-actions">
//               <button type="button" onClick={showHint}>
//                 💡 Give me a hint
//               </button>
//               <button type="button" onClick={skipWord}>
//                 Skip this word →
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {(gameOver || finished) && (
//         <section className="word-end-card" role="status">
//           <div className="word-end-emoji" aria-hidden="true">
//             {finished ? "🏆" : "🌻"}
//           </div>
//           <p className="word-eyebrow">
//             {finished ? "ADVENTURE COMPLETE" : "KEEP GROWING"}
//           </p>
//           <h2>
//             {finished ? "You did it, Word Explorer!" : "Want to try again?"}
//           </h2>
//           <p>
//             {finished
//               ? `You solved ${correctCount} out of ${QUESTIONS.length} words and earned ${stars} stars. Every try helps you learn!`
//               : "It's okay if the timer ran out. Take a breath and give these letters another try."}
//           </p>

//           {completedWords.length > 0 && (
//             <div className="word-completed-list">
//               <strong>Words you built:</strong>
//               <div>
//                 {completedWords.map((word, index) => (
//                   <span key={`${word}-${index}`}>{word} ✓</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           <button
//             type="button"
//             className="word-button word-button-primary"
//             onClick={restartGame}
//           >
//             🔄 Play again
//           </button>
//           <a className="word-home-link" href="/phonics">
//             Back to Phonics
//           </a>
//         </section>
//       )}

//       <footer className="word-game-footer">
//         <div className="word-footer-mascot" aria-hidden="true">🦊</div>
//         <p>
//           <strong>Remember:</strong> Learning takes practice. It's wonderful
//           that you're trying!
//         </p>
//         <button
//           type="button"
//           className={`word-timer-toggle ${!timedMode ? "word-timer-toggle-active" : ""}`}
//           onClick={toggleTimer}
//           aria-pressed={!timedMode}
//           disabled={finished || gameOver}
//         >
//           {!timedMode ? "🌿 Relax mode ON" : "🌿 Practise without timer"}
//         </button>
//       </footer>
//     </main>
//   );
// }




// src/pages/phonics/BuildTheWordFast.tsx

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Trophy,
  Clock,
  Target,
  Sparkles,
  Lightbulb,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  SkipForward,
  Rocket,
  Flame,
  Leaf,
  Zap,
} from "lucide-react";

import { useGamificationStore } from "@/stores/gamificationStore";
import { cn } from "@/lib/cn";
import "./BuildTheWordFast.css";

// =========================================================
// TYPES
// =========================================================

type WordQuestion = {
  word: string;
  emoji: string;
  clue: string;
  hint: string;
};

// =========================================================
// DATA
// =========================================================

const QUESTIONS: WordQuestion[] = [
  { word: "CAT", emoji: "🐱", clue: "A pet that says meow!", hint: "It starts with C." },
  { word: "SUN", emoji: "☀️", clue: "It shines in the sky.", hint: "It starts with S." },
  { word: "FISH", emoji: "🐠", clue: "It swims in water.", hint: "It starts with F." },
  { word: "BOOK", emoji: "📚", clue: "You read a...", hint: "It starts with B." },
  { word: "TREE", emoji: "🌳", clue: "It has leaves and branches.", hint: "It starts with T." },
  { word: "STAR", emoji: "⭐", clue: "You can see it in the night sky.", hint: "It starts with S." },
  { word: "DUCK", emoji: "🦆", clue: "A bird that can swim.", hint: "It starts with D." },
  { word: "CAKE", emoji: "🎂", clue: "A sweet treat for birthdays.", hint: "It starts with C." },
];

const ROUND_SECONDS = 25;
const LEVEL_ID = 2;

// =========================================================
// HELPERS
// =========================================================

function shuffleLetters(word: string): string[] {
  const letters = word.split("");
  for (let attempt = 0; attempt < 10; attempt++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    if (letters.join("") !== word) break;
  }
  return letters;
}

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(text);
    message.rate = 0.8;
    message.pitch = 1.05;
    window.speechSynthesis.speak(message);
  }
}

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

export default function BuildTheWordFast() {
  const navigate = useNavigate();

  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [timedMode, setTimedMode] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("Tap the letters to build your word!");
  const [feedbackType, setFeedbackType] = useState<"info" | "success" | "try">("info");
  const [hintVisible, setHintVisible] = useState(false);
  const [stars, setStars] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rewarded, setRewarded] = useState(false);

  const addStars = useGamificationStore((s) => s.addStars);
  const completePhonicsLevel = useGamificationStore((s) => s.completePhonicsLevel);
  const markPhonicsLevelComplete = useGamificationStore((s) => s.markPhonicsLevelComplete);
  const bumpStreakIfNewDay = useGamificationStore((s) => s.bumpStreakIfNewDay);

  const question = QUESTIONS[round];

  const scrambledLetters = useMemo(
    () => shuffleLetters(question.word),
    [round, question.word]
  );

  const chosenWord = selected
    .map((index) => scrambledLetters[index])
    .join("");

  // =========================================================
  // TIMER
  // =========================================================

  useEffect(() => {
    if (!timedMode || gameOver || finished) return;
    const timer = window.setInterval(() => {
      setSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [round, timedMode, gameOver, finished]);

  useEffect(() => {
    if (timedMode && seconds === 0 && !finished) {
      setGameOver(true);
      setFeedback("Time is up! That's okay — let's try again. 💛");
      setFeedbackType("try");
    }
  }, [seconds, timedMode, finished]);

  // =========================================================
  // SAVE PROGRESS ON FINISH
  // =========================================================

  useEffect(() => {
    if (!finished || rewarded) return;
    setRewarded(true);

    try {
      // Prefer the full method that also bumps streak + records activity
      if (typeof markPhonicsLevelComplete === "function") {
        markPhonicsLevelComplete(LEVEL_ID, stars);
      } else {
        if (typeof addStars === "function" && stars > 0) {
          addStars(stars);
        }
        if (typeof completePhonicsLevel === "function") {
          completePhonicsLevel(LEVEL_ID);
        }
        if (typeof bumpStreakIfNewDay === "function") {
          bumpStreakIfNewDay();
        }
      }

      window.dispatchEvent(new Event("phonics-level-completed"));
      window.dispatchEvent(new Event("gamification-updated"));
    } catch (err) {
      console.warn("Could not update gamification:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, rewarded]);

  // =========================================================
  // ACTIONS
  // =========================================================

  function selectLetter(index: number) {
    if (selected.includes(index) || gameOver || finished) return;
    setSelected((previous) => [...previous, index]);
    setFeedback("Keep going! You can do it. ✨");
    setFeedbackType("info");
  }

  function removeLetter(position: number) {
    if (gameOver || finished) return;
    setSelected((previous) => previous.filter((_, index) => index !== position));
    setFeedback("No problem! Try another letter.");
    setFeedbackType("info");
  }

  function checkWord() {
    if (gameOver || finished) return;

    if (selected.length !== question.word.length) {
      setFeedback("Choose all the letters first. 🌈");
      setFeedbackType("info");
      return;
    }

    setAttempts((previous) => previous + 1);

    if (chosenWord === question.word) {
      setStars((previous) => previous + (hintVisible ? 1 : 2));
      setCorrectCount((previous) => previous + 1);
      setCompletedWords((previous) => [...previous, question.word]);
      setFeedback("Amazing! You built the word! 🎉");
      setFeedbackType("success");

      window.setTimeout(() => {
        if (round + 1 >= QUESTIONS.length) {
          setFinished(true);
          setGameOver(false);
          return;
        }
        setRound((previous) => previous + 1);
        setSelected([]);
        setSeconds(ROUND_SECONDS);
        setHintVisible(false);
        setFeedback("Ready for your next word?");
        setFeedbackType("info");
      }, 900);
    } else {
      setFeedback("Good try! Move a letter and try again. 💪");
      setFeedbackType("try");
    }
  }

  function showHint() {
    if (gameOver || finished) return;
    setHintVisible(true);
    setFeedback(`Here's a clue: ${question.hint}`);
    setFeedbackType("info");
    if (soundEnabled) speak(`${question.clue} ${question.hint}`);
  }

  function skipWord() {
    if (gameOver || finished) return;
    if (round + 1 >= QUESTIONS.length) {
      setFinished(true);
      return;
    }
    setRound((previous) => previous + 1);
    setSelected([]);
    setSeconds(ROUND_SECONDS);
    setHintVisible(false);
    setFeedback("Let's try a new word! 🌟");
    setFeedbackType("info");
  }

  function restartGame() {
    setRound(0);
    setSelected([]);
    setSeconds(ROUND_SECONDS);
    setGameOver(false);
    setFinished(false);
    setHintVisible(false);
    setStars(0);
    setCorrectCount(0);
    setAttempts(0);
    setCompletedWords([]);
    setRewarded(false);
    setFeedback("Tap the letters to build your word!");
    setFeedbackType("info");
  }

  function toggleTimer() {
    setTimedMode((previous) => !previous);
    setSeconds(ROUND_SECONDS);
    setFeedback(
      timedMode
        ? "Relax mode on! Take all the time you need. 💛"
        : "Challenge mode on! You have 25 seconds per word."
    );
    setFeedbackType("info");
  }

  const progress = finished ? 100 : Math.round((round / QUESTIONS.length) * 100);

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10">
        <main className="word-game">
          {/* HEADER */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="word-game-header"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <button
                type="button"
                onClick={() => navigate("/phonics")}
                className="word-back-link inline-flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-100 hover:bg-purple-500/30 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Phonics</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-2 border border-orange-400/50 shadow-md">
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span className="text-sm font-extrabold text-orange-200 tabular-nums">
                    {stars}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border transition",
                    soundEnabled
                      ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                      : "bg-purple-500/20 border-purple-400/40 text-purple-300"
                  )}
                  aria-label={soundEnabled ? "Mute" : "Unmute"}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="word-header-title">
              <motion.span
                className="word-header-icon"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <Rocket className="w-8 h-8 text-cyan-300" />
              </motion.span>
              <div>
                <p className="word-eyebrow">WORD ADVENTURE · LEVEL 2</p>
                <h1>Build the Word Fast!</h1>
              </div>
            </div>

            <p className="word-intro">
              Look at the picture, find the letters, and build the word. You can do it!
            </p>
          </motion.header>

          {/* STATS */}
          <section className="word-stats" aria-label="Game progress">
            <div className="word-stat">
              <span aria-hidden="true">
                <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
              </span>
              <div>
                <strong>{stars}</strong>
                <small>Stars earned</small>
              </div>
            </div>

            <div className="word-stat">
              <span aria-hidden="true">
                <Target className="w-6 h-6 text-emerald-300" />
              </span>
              <div>
                <strong>{correctCount}/{QUESTIONS.length}</strong>
                <small>Words solved</small>
              </div>
            </div>

            <div className="word-stat word-timer-stat">
              <span aria-hidden="true">
                <Clock className="w-6 h-6 text-cyan-300" />
              </span>
              <div>
                <strong>{timedMode && !finished ? `${seconds}s` : "Relax"}</strong>
                <small>{timedMode ? "Time left" : "No time limit"}</small>
              </div>
            </div>
          </section>

          {/* PROGRESS */}
          <section className="word-progress-area">
            <div className="word-progress-label">
              <span>Your adventure</span>
              <strong>
                {finished ? QUESTIONS.length : round + 1} of {QUESTIONS.length}
              </strong>
            </div>
            <div
              className="word-progress-track"
              role="progressbar"
              aria-label="Word adventure progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <motion.div
                className="word-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </section>

          {/* PLAY / END */}
          <AnimatePresence mode="wait">
            {!finished && !gameOver && (
              <motion.section
                key={`play-${round}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="word-play-card"
                aria-label="Word puzzle"
              >
                <div className="word-picture-panel">
                  <motion.span
                    className="word-picture"
                    role="img"
                    aria-label={question.word}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {question.emoji}
                  </motion.span>
                  <motion.span
                    className="word-picture-sparkle"
                    aria-hidden="true"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </motion.span>
                  <h2>What is this?</h2>
                  <p>{question.clue}</p>
                  <button
                    type="button"
                    className="word-speak-button"
                    onClick={() => {
                      if (soundEnabled) speak(question.clue);
                    }}
                  >
                    <Volume2 className="w-4 h-4 inline mr-1.5" />
                    Listen to the clue
                  </button>
                </div>

                <div className="word-answer-panel">
                  <p className="word-step-label">YOUR TURN</p>
                  <h2>Build the word</h2>
                  <p className="word-instruction">
                    Tap a letter below. Tap a chosen letter to remove it.
                  </p>

                  <div
                    className="word-answer-slots"
                    aria-label={`Your word has ${selected.length} of ${question.word.length} letters`}
                  >
                    {Array.from({ length: question.word.length }).map((_, index) => {
                      const letterIndex = selected[index];
                      return (
                        <button
                          type="button"
                          className={`word-slot ${letterIndex !== undefined ? "word-slot-filled" : ""}`}
                          key={index}
                          onClick={() => removeLetter(index)}
                          disabled={letterIndex === undefined}
                          aria-label={
                            letterIndex !== undefined
                              ? `Remove letter ${scrambledLetters[letterIndex]}`
                              : `Empty letter slot ${index + 1}`
                          }
                        >
                          {letterIndex !== undefined ? scrambledLetters[letterIndex] : ""}
                        </button>
                      );
                    })}
                  </div>

                  <div className="word-letter-bank" aria-label="Available letters">
                    {scrambledLetters.map((letter, index) => {
                      const used = selected.includes(index);
                      return (
                        <motion.button
                          type="button"
                          key={`${round}-${index}`}
                          className={`word-letter ${used ? "word-letter-used" : ""}`}
                          onClick={() => selectLetter(index)}
                          disabled={used}
                          aria-label={`Choose letter ${letter}`}
                          aria-pressed={used}
                          whileHover={!used ? { y: -3, scale: 1.05 } : {}}
                          whileTap={!used ? { scale: 0.95 } : {}}
                        >
                          {letter}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div
                    className={`word-feedback word-feedback-${feedbackType}`}
                    role="status"
                    aria-live="polite"
                  >
                    <span aria-hidden="true">
                      {feedbackType === "success" ? (
                        <CheckCircle2 className="w-5 h-5 inline" />
                      ) : feedbackType === "try" ? (
                        <XCircle className="w-5 h-5 inline" />
                      ) : (
                        <Sparkles className="w-4 h-4 inline" />
                      )}
                    </span>{" "}
                    {feedback}
                  </div>

                  {hintVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="word-hint-box"
                    >
                      <Lightbulb className="w-4 h-4 inline mr-1.5" />
                      {question.hint}
                    </motion.div>
                  )}

                  <div className="word-action-buttons">
                    <button
                      type="button"
                      className="word-button word-button-primary"
                      onClick={checkWord}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Check my word
                    </button>
                    <button
                      type="button"
                      className="word-button word-button-soft"
                      onClick={() => {
                        setSelected([]);
                        setFeedback("Letters cleared. Have another go!");
                        setFeedbackType("info");
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>

                  <div className="word-helper-actions">
                    <button type="button" onClick={showHint}>
                      <Lightbulb className="w-4 h-4 inline mr-1" />
                      Give me a hint
                    </button>
                    <button type="button" onClick={skipWord}>
                      <SkipForward className="w-4 h-4 inline mr-1" />
                      Skip this word
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {(gameOver || finished) && (
              <motion.section
                key="end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="word-end-card"
                role="status"
              >
                <motion.div
                  className="word-end-emoji"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  aria-hidden="true"
                >
                  {finished ? (
                    <Trophy className="w-20 h-20 text-amber-300 mx-auto" />
                  ) : (
                    <Sparkles className="w-20 h-20 text-cyan-300 mx-auto" />
                  )}
                </motion.div>
                <p className="word-eyebrow">
                  {finished ? "ADVENTURE COMPLETE" : "KEEP GROWING"}
                </p>
                <h2>
                  {finished ? "You did it, Word Explorer!" : "Want to try again?"}
                </h2>
                <p>
                  {finished
                    ? `You solved ${correctCount} out of ${QUESTIONS.length} words and earned ${stars} stars. Every try helps you learn!`
                    : "It's okay if the timer ran out. Take a breath and give these letters another try."}
                </p>

                {completedWords.length > 0 && (
                  <div className="word-completed-list">
                    <strong>Words you built:</strong>
                    <div>
                      {completedWords.map((word, index) => (
                        <span key={`${word}-${index}`}>{word} ✓</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 justify-center mt-5">
                  <button
                    type="button"
                    className="word-button word-button-primary"
                    onClick={restartGame}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play again
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/phonics")}
                    className="word-button word-button-soft"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Phonics
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* FOOTER */}
          <footer className="word-game-footer">
            <div className="word-footer-mascot" aria-hidden="true">
              <Rocket className="w-6 h-6 text-cyan-300" />
            </div>
            <p>
              <strong>Remember:</strong> Learning takes practice. It's wonderful
              that you're trying!
            </p>
            <button
              type="button"
              className={cn("word-timer-toggle", !timedMode && "word-timer-toggle-active")}
              onClick={toggleTimer}
              aria-pressed={!timedMode}
              disabled={finished || gameOver}
            >
              {!timedMode ? (
                <>
                  <Leaf className="w-3.5 h-3.5 inline mr-1" />
                  Relax mode ON
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  Practise without timer
                </>
              )}
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}