
// import { useEffect, useState } from "react";
// import "./PreAssessment.css";

// type Skill =
//   | "Attention"
//   | "Memory"
//   | "Math"
//   | "Reading"
//   | "Problem Solving"
//   | "Communication";

// type Question = {
//   id: number;
//   skill: Skill;
//   title: string;
//   description: string;
//   options: string[];
//   answer: number;
//   hint: string;
// };

// const questions: Question[] = [
//   {
//     id: 1,
//     skill: "Attention",
//     title: "Find the matching star",
//     description: "Which symbol is the same as ⭐?",
//     options: ["🌙", "⭐", "☀️", "🌈"],
//     answer: 1,
//     hint: "Look for the five-pointed star.",
//   },
//   {
//     id: 2,
//     skill: "Memory",
//     title: "Remember the animal",
//     description: "Remember this animal: 🐰. Which animal did you see?",
//     options: ["🐱", "🐶", "🐰", "🐻"],
//     answer: 2,
//     hint: "Think about the animal with long ears.",
//   },
//   {
//     id: 3,
//     skill: "Math",
//     title: "Count the apples",
//     description: "🍎 🍎 🍎 — How many apples are there?",
//     options: ["2", "3", "4", "5"],
//     answer: 1,
//     hint: "Count each apple one by one.",
//   },
//   {
//     id: 4,
//     skill: "Reading",
//     title: "Choose the correct word",
//     description: "Which word names this animal? 🐱",
//     options: ["Dog", "Bird", "Cat", "Fish"],
//     answer: 2,
//     hint: "A cat says meow!",
//   },
//   {
//     id: 5,
//     skill: "Problem Solving",
//     title: "Complete the pattern",
//     description: "What comes next? 🔴 🔵 🔴 🔵 __",
//     options: ["🔵", "🟢", "🔴", "🟡"],
//     answer: 2,
//     hint: "The red and blue colors take turns.",
//   },
//   {
//     id: 6,
//     skill: "Communication",
//     title: "Choose a friendly response",
//     description:
//       'A friend says "Hello!" What can you say?',
//     options: [
//       "Hello!",
//       "Go away!",
//       "Nothing, always",
//       "I don't know",
//     ],
//     answer: 0,
//     hint: "A friendly greeting is a nice way to respond.",
//   },
// ];

// const skillIcons: Record<Skill, string> = {
//   Attention: "🎯",
//   Memory: "🧠",
//   Math: "➕",
//   Reading: "📖",
//   "Problem Solving": "🧩",
//   Communication: "🗣️",
// };

// type BuddyProps = {
//   side: "left" | "right";
//   name: string;
//   emoji: string;
//   message: string;
//   onSpeak: () => void;
//   onHelp: () => void;
// };

// function CartoonBuddy({
//   side,
//   name,
//   emoji,
//   message,
//   onSpeak,
//   onHelp,
// }: BuddyProps) {
//   return (
//     <aside
//       className={`pa-buddy pa-buddy--${side}`}
//       aria-label={`${name}, your learning friend`}
//     >
//       <div className="pa-buddy-bubble" aria-live="polite">
//         <span className="pa-buddy-label">{name} says</span>
//         <p>{message}</p>
//       </div>

//       <button
//         type="button"
//         className="pa-buddy-character"
//         onClick={onSpeak}
//         aria-label={`Hear ${name} speak`}
//         title={`Click to hear ${name}`}
//       >
//         <span className="pa-buddy-sparkle pa-sparkle-one">
//           ✨
//         </span>

//         <span className="pa-buddy-emoji" aria-hidden="true">
//           {emoji}
//         </span>

//         <span className="pa-buddy-sparkle pa-sparkle-two">
//           ⭐
//         </span>
//       </button>

//       <div className="pa-buddy-name">{name}</div>

//       <button
//         type="button"
//         className="pa-buddy-help"
//         onClick={onHelp}
//       >
//         💡 Need help?
//       </button>
//     </aside>
//   );
// }

// export default function PreAssessment() {
//   const [started, setStarted] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
//     null
//   );
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [showHint, setShowHint] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [calmMode, setCalmMode] = useState(false);
//   const [bigText, setBigText] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [feedback, setFeedback] = useState<
//     "correct" | "wrong" | null
//   >(null);

//   const currentQuestion = questions[currentIndex];

//   const score = answers.reduce((total, answer, index) => {
//     return total + (answer === questions[index].answer ? 1 : 0);
//   }, 0);

//   useEffect(() => {
//     return () => {
//       if ("speechSynthesis" in window) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   const speak = (message: string) => {
//     if (!soundEnabled || !("speechSynthesis" in window)) return;

//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(message);
//     utterance.rate = 0.85;
//     utterance.pitch = 1.1;
//     utterance.lang = "en-US";

//     window.speechSynthesis.speak(utterance);
//   };

//   const startAssessment = () => {
//     setStarted(true);
//     speak("Welcome! Let's learn and have fun together.");
//   };

//   const chooseAnswer = (index: number) => {
//     if (selectedAnswer !== null) return;

//     setSelectedAnswer(index);
//     setAnswers((previous) => {
//       const updated = [...previous];
//       updated[currentIndex] = index;
//       return updated;
//     });

//     const correct = index === currentQuestion.answer;

//     setFeedback(correct ? "correct" : "wrong");

//     speak(
//       correct
//         ? "Wonderful! That is correct."
//         : "Good try! Every question helps us learn."
//     );
//   };

//   const nextQuestion = () => {
//     if (selectedAnswer === null) return;

//     if (currentIndex === questions.length - 1) {
//       setShowResult(true);
//       speak("You finished your learning adventure. Great job!");
//       return;
//     }

//     setCurrentIndex((index) => index + 1);
//     setSelectedAnswer(null);
//     setShowHint(false);
//     setFeedback(null);
//   };

//   const restartAssessment = () => {
//     setStarted(false);
//     setCurrentIndex(0);
//     setSelectedAnswer(null);
//     setAnswers([]);
//     setShowHint(false);
//     setShowResult(false);
//     setFeedback(null);
//   };

//   const leftMessage = !started
//     ? "Hi, friend! Let's explore and learn together!"
//     : feedback === "correct"
//       ? "Amazing! You got it right! 🎉"
//       : feedback === "wrong"
//         ? "Good try! Keep learning at your own pace."
//         : "Take your time. You can do it!";

//   const rightMessage = !started
//     ? "I will help you along the way!"
//     : showHint
//       ? currentQuestion.hint
//       : "Look carefully and choose the answer you like.";

//   const questionProgress = showResult
//     ? 100
//     : (currentIndex / questions.length) * 100;

//   return (
//     <main
//       className={[
//         "preassessment",
//         calmMode ? "pa-calm-mode" : "",
//         bigText ? "pa-big-text" : "",
//       ].join(" ")}
//     >
//       <header className="pa-toolbar">
//         <div className="pa-brand">
//           <span className="pa-brand-icon">🌈</span>
//           <div>
//             <strong>Learning Adventure</strong>
//             <span>Discover how you learn</span>
//           </div>
//         </div>

//         <div className="pa-settings">
//           <button
//             type="button"
//             onClick={() => setCalmMode((value) => !value)}
//             aria-pressed={calmMode}
//           >
//             🌙 {calmMode ? "Color Mode" : "Calm Mode"}
//           </button>

//           <button
//             type="button"
//             onClick={() => setSoundEnabled((value) => !value)}
//             aria-pressed={soundEnabled}
//           >
//             {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
//           </button>

//           <button
//             type="button"
//             onClick={() => setBigText((value) => !value)}
//             aria-pressed={bigText}
//           >
//             🔠 {bigText ? "Normal Text" : "Big Text"}
//           </button>
//         </div>
//       </header>

//       <div className="pa-layout">
//         <CartoonBuddy
//           side="left"
//           name="Milo"
//           emoji="🦊"
//           message={leftMessage}
//           onSpeak={() => speak(leftMessage)}
//           onHelp={() => {
//             if (!started) {
//               speak("Press Start My Adventure to begin.");
//             } else if (!showResult) {
//               setShowHint(true);
//               speak(currentQuestion.hint);
//             }
//           }}
//         />

//         <section className="pa-main-card">
//           {!started ? (
//             <div className="pa-welcome">
//               <div className="pa-welcome-art" aria-hidden="true">
//                 <span>🌈</span>
//                 <span>🧸</span>
//                 <span>⭐</span>
//               </div>

//               <span className="pa-eyebrow">YOUR LEARNING JOURNEY</span>

//               <h1>Let's Discover How You Learn!</h1>

//               <p className="pa-welcome-description">
//                 Try some fun activities. Take your time. There is
//                 no wrong way to explore and learn.
//               </p>

//               <div className="pa-skills-grid">
//                 {(Object.keys(skillIcons) as Skill[]).map((skill) => (
//                   <div className="pa-skill-item" key={skill}>
//                     <span>{skillIcons[skill]}</span>
//                     <strong>{skill}</strong>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 type="button"
//                 className="pa-primary-button"
//                 onClick={startAssessment}
//               >
//                 Start My Adventure <span>🚀</span>
//               </button>

//               <p className="pa-reassurance">
//                 💙 You can ask for help whenever you need it.
//               </p>
//             </div>
//           ) : showResult ? (
//             <div className="pa-result">
//               <div className="pa-result-icon">🏆</div>
//               <span className="pa-eyebrow">ADVENTURE COMPLETED</span>
//               <h1>You Did It!</h1>
//               <p>
//                 Thank you for trying all the activities. Every effort
//                 is something to celebrate!
//               </p>

//               <div className="pa-score-circle">
//                 <strong>
//                   {score}/{questions.length}
//                 </strong>
//                 <span>Correct answers</span>
//               </div>

//               <div className="pa-result-note">
//                 <span>🌟</span>
//                 <p>
//                   This activity is a starting point for understanding
//                   learning preferences. It is not a medical or
//                   diagnostic assessment.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 className="pa-primary-button"
//                 onClick={restartAssessment}
//               >
//                 Try Again <span>🔄</span>
//               </button>
//             </div>
//           ) : (
//             <div className="pa-question-view">
//               <div className="pa-question-top">
//                 <span className="pa-question-count">
//                   Activity {currentIndex + 1} of {questions.length}
//                 </span>

//                 <span className="pa-skill-badge">
//                   {skillIcons[currentQuestion.skill]}{" "}
//                   {currentQuestion.skill}
//                 </span>
//               </div>

//               <div
//                 className="pa-progress-track"
//                 role="progressbar"
//                 aria-valuenow={Math.round(questionProgress)}
//                 aria-valuemin={0}
//                 aria-valuemax={100}
//                 aria-label="Assessment progress"
//               >
//                 <div
//                   className="pa-progress-fill"
//                   style={{ width: `${questionProgress}%` }}
//                 />
//               </div>

//               <div className="pa-question-heading">
//                 <span className="pa-question-icon">
//                   {skillIcons[currentQuestion.skill]}
//                 </span>

//                 <h1>{currentQuestion.title}</h1>

//                 <p>{currentQuestion.description}</p>

//                 <button
//                   type="button"
//                   className="pa-read-button"
//                   onClick={() =>
//                     speak(
//                       `${currentQuestion.title}. ${currentQuestion.description}`
//                     )
//                   }
//                 >
//                   🔊 Read question aloud
//                 </button>
//               </div>

//               <div className="pa-options" role="group" aria-label="Answer options">
//                 {currentQuestion.options.map((option, index) => {
//                   const isSelected = selectedAnswer === index;
//                   const isCorrect = index === currentQuestion.answer;

//                   let optionClass = "pa-option";

//                   if (selectedAnswer !== null && isCorrect) {
//                     optionClass += " pa-option-correct";
//                   } else if (isSelected && !isCorrect) {
//                     optionClass += " pa-option-wrong";
//                   }

//                   return (
//                     <button
//                       type="button"
//                       key={`${currentQuestion.id}-${option}`}
//                       className={optionClass}
//                       onClick={() => chooseAnswer(index)}
//                       disabled={selectedAnswer !== null}
//                     >
//                       <span className="pa-option-letter">
//                         {String.fromCharCode(65 + index)}
//                       </span>

//                       <span className="pa-option-text">{option}</span>

//                       {selectedAnswer !== null && isCorrect && (
//                         <span className="pa-option-status">✓</span>
//                       )}

//                       {isSelected && !isCorrect && (
//                         <span className="pa-option-status">↻</span>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {showHint && (
//                 <div className="pa-hint" role="status">
//                   <span>💡</span>
//                   <p>
//                     <strong>Here's a little hint:</strong>{" "}
//                     {currentQuestion.hint}
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setShowHint(false)}
//                     aria-label="Close hint"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}

//               {feedback && (
//                 <div
//                   className={`pa-feedback ${
//                     feedback === "correct"
//                       ? "pa-feedback-correct"
//                       : "pa-feedback-try"
//                   }`}
//                   role="status"
//                 >
//                   {feedback === "correct"
//                     ? "🎉 Wonderful! That's correct!"
//                     : "💙 Good try! The correct answer is highlighted above."}
//                 </div>
//               )}

//               <div className="pa-question-footer">
//                 <button
//                   type="button"
//                   className="pa-secondary-button"
//                   onClick={() => {
//                     setShowHint(true);
//                     speak(currentQuestion.hint);
//                   }}
//                 >
//                   💡 Show Hint
//                 </button>

//                 <button
//                   type="button"
//                   className="pa-primary-button pa-next-button"
//                   onClick={nextQuestion}
//                   disabled={selectedAnswer === null}
//                 >
//                   {currentIndex === questions.length - 1
//                     ? "See My Results"
//                     : "Next Activity"}
//                   <span>→</span>
//                 </button>
//               </div>

//               <p className="pa-footer-note">
//                 🌱 Everyone learns differently. Just do your best!
//               </p>
//             </div>
//           )}
//         </section>

//         <CartoonBuddy
//           side="right"
//           name="Luna"
//           emoji="🐼"
//           message={rightMessage}
//           onSpeak={() => speak(rightMessage)}
//           onHelp={() => {
//             if (!started) {
//               speak("Press Start My Adventure to begin.");
//             } else if (!showResult) {
//               setShowHint(true);
//               speak(currentQuestion.hint);
//             }
//           }}
//         />
//       </div>

//       <footer className="pa-page-footer">
//         Made with 💜 for every unique learner
//       </footer>
//     </main>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Rocket,
  Clock,
  ArrowLeft,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Type,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

import {
  saveAssessmentResult,
  type AssessmentActivityPayload,
  type AssessmentPayload,
  type AssessmentScoresPayload,
  type AssessmentSkillKey,
} from "@/lib/assessmentApi";

import "./PreAssessment.css";

// =========================================================
// TYPES
// =========================================================

type Skill =
  | "Attention"
  | "Memory"
  | "Math"
  | "Reading"
  | "Problem Solving"
  | "Communication";

type Question = {
  id: number;
  skill: Skill;
  title: string;
  description: string;
  options: string[];
  answer: number;
  hint: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

type QuestionRecord = {
  timeSpent: number;
  hintUsed: boolean;
  audioUsed: boolean;
  visualSupport: boolean;
};

const DASHBOARD_PATH = "/dashboard";

// =========================================================
// QUESTIONS DATA
// =========================================================

const questions: Question[] = [
  {
    id: 1,
    skill: "Attention",
    title: "Find the matching star",
    description: "Which symbol is the same as ⭐?",
    options: ["🌙", "⭐", "☀️", "🌈"],
    answer: 1,
    hint: "Look for the five-pointed star.",
  },
  {
    id: 2,
    skill: "Memory",
    title: "Remember the animal",
    description: "Remember this animal: 🐰. Which animal did you see?",
    options: ["🐱", "🐶", "🐰", "🐻"],
    answer: 2,
    hint: "Think about the animal with long ears.",
  },
  {
    id: 3,
    skill: "Math",
    title: "Count the apples",
    description: "🍎 🍎 🍎 — How many apples are there?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    hint: "Count each apple one by one.",
  },
  {
    id: 4,
    skill: "Reading",
    title: "Choose the correct word",
    description: "Which word names this animal? 🐱",
    options: ["Dog", "Bird", "Cat", "Fish"],
    answer: 2,
    hint: "A cat says meow!",
  },
  {
    id: 5,
    skill: "Problem Solving",
    title: "Complete the pattern",
    description: "What comes next? 🔴 🔵 🔴 🔵 __",
    options: ["🔵", "🟢", "🔴", "🟡"],
    answer: 2,
    hint: "The red and blue colors take turns.",
  },
  {
    id: 6,
    skill: "Communication",
    title: "Choose a friendly response",
    description: 'A friend says "Hello!" What can you say?',
    options: ["Hello!", "Go away!", "Nothing, always", "I don't know"],
    answer: 0,
    hint: "A friendly greeting is a nice way to respond.",
  },
];

const skillIcons: Record<Skill, string> = {
  Attention: "🎯",
  Memory: "🧠",
  Math: "➕",
  Reading: "📖",
  "Problem Solving": "🧩",
  Communication: "🗣️",
};

const skillKeyMap: Record<Skill, AssessmentSkillKey> = {
  Attention: "attention",
  Memory: "memory",
  Math: "math",
  Reading: "reading",
  "Problem Solving": "problemSolving",
  Communication: "communication",
};

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
    { size: 160, top: "65%", left: "92%", from: "#0891b2", to: "#0f172a" },
    { size: 100, top: "85%", left: "3%", from: "#db2777", to: "#4c1d95" },
    { size: 80, top: "20%", left: "85%", from: "#f59e0b", to: "#7c2d12" },
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

export default function PreAssessment() {
  const navigate = useNavigate();
  const { isLoaded, userId, getToken } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calmMode, setCalmMode] = useState(false);
  const [bigText, setBigText] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState("");

  const questionStartRef = useRef<number>(Date.now());
  const recordsRef = useRef<Record<number, QuestionRecord>>({});
  const hintUsedRef = useRef<Record<number, boolean>>({});
  const audioUsedRef = useRef<Record<number, boolean>>({});
  const payloadRef = useRef<AssessmentPayload | null>(null);

  const currentQuestion = questions[currentIndex];

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].answer ? 1 : 0);
  }, 0);

  useEffect(() => {
    if (started && !showResult) {
      questionStartRef.current = Date.now();
    }
  }, [started, currentIndex, showResult]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (message: string) => {
    if (!soundEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const speakOnRequest = (message: string) => {
    if (started && !showResult) {
      audioUsedRef.current[currentQuestion.id] = true;
    }
    speak(message);
  };

  const revealHint = () => {
    setShowHint(true);
    hintUsedRef.current[currentQuestion.id] = true;
    speakOnRequest(currentQuestion.hint);
  };

  const buildPayload = (clerkId: string): AssessmentPayload => {
    const counters: Record<string, number> = {};

    const activities: AssessmentActivityPayload[] = questions.map((q, i) => {
      const key = skillKeyMap[q.skill];
      counters[key] = (counters[key] || 0) + 1;
      const selectedIndex = answers[i];
      const record = recordsRef.current[q.id];

      return {
        questionId: `${key}_${counters[key]}`,
        skill: key,
        selectedAnswer: q.options[selectedIndex] ?? "",
        correct: selectedIndex === q.answer,
        timeSpent: record?.timeSpent ?? 1,
        attempts: 1,
        hintUsed: Boolean(hintUsedRef.current[q.id] ?? record?.hintUsed),
        audioUsed: Boolean(audioUsedRef.current[q.id] ?? record?.audioUsed),
        visualSupport: Boolean(record?.visualSupport),
      };
    });

    const scores: AssessmentScoresPayload = {
      attention: 0,
      memory: 0,
      math: 0,
      reading: 0,
      problemSolving: 0,
      communication: 0,
    };

    (Object.keys(scores) as AssessmentSkillKey[]).forEach((skill) => {
      const items = activities.filter((a) => a.skill === skill);
      scores[skill] =
        items.length === 0
          ? 0
          : Math.round((items.filter((a) => a.correct).length / items.length) * 100);
    });

    return {
      clerkId,
      scores,
      activities,
      completedAt: new Date().toISOString(),
    };
  };

  const cacheForDashboard = (payload: AssessmentPayload) => {
    try {
      localStorage.setItem(
        "assessmentResult",
        JSON.stringify({
          completedAt: payload.completedAt,
          scores: payload.scores,
          activities: payload.activities,
        })
      );
      window.dispatchEvent(new Event("assessment-result-updated"));
    } catch (error) {
      console.warn("Could not cache the assessment result:", error);
    }
  };

  const submitResults = async () => {
    if (saveStatus === "saving") return;
    setSaveStatus("saving");
    setSaveError("");

    try {
      if (!isLoaded) throw new Error("Still loading your account. Please try again.");
      if (!userId) throw new Error("You need to be signed in to save your results.");

      if (!payloadRef.current) {
        payloadRef.current = buildPayload(userId);
      }

      cacheForDashboard(payloadRef.current);
      await saveAssessmentResult(getToken, payloadRef.current);
      setSaveStatus("saved");
    } catch (error) {
      console.error("Saving the assessment failed:", error);
      setSaveStatus("error");
      setSaveError(error instanceof Error ? error.message : "Could not reach the server.");
    }
  };

  const goToDashboard = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    navigate(DASHBOARD_PATH);
  };

  const startAssessment = () => {
    setStarted(true);
    questionStartRef.current = Date.now();
    speak("Welcome! Let's learn and have fun together.");
  };

  const chooseAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    recordsRef.current[currentQuestion.id] = {
      timeSpent: Math.max(
        1,
        Math.round((Date.now() - questionStartRef.current) / 1000)
      ),
      hintUsed: Boolean(hintUsedRef.current[currentQuestion.id]),
      audioUsed: Boolean(audioUsedRef.current[currentQuestion.id]),
      visualSupport: calmMode || bigText,
    };

    setSelectedAnswer(index);
    setAnswers((previous) => {
      const updated = [...previous];
      updated[currentIndex] = index;
      return updated;
    });

    const correct = index === currentQuestion.answer;
    setFeedback(correct ? "correct" : "wrong");
    speak(correct ? "Wonderful! That is correct." : "Good try! Every question helps us learn.");
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      speak("You finished your learning adventure. Great job!");
      void submitResults();
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setShowHint(false);
    setFeedback(null);
  };

  const restartAssessment = () => {
    recordsRef.current = {};
    hintUsedRef.current = {};
    audioUsedRef.current = {};
    payloadRef.current = null;

    setStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowHint(false);
    setShowResult(false);
    setFeedback(null);
    setSaveStatus("idle");
    setSaveError("");
  };

  const questionProgress = showResult
    ? 100
    : (currentIndex / questions.length) * 100;

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10">
        <main
          className={[
            "preassessment",
            calmMode ? "pa-calm-mode" : "",
            bigText ? "pa-big-text" : "",
          ].join(" ")}
        >
          {/* =====================================================
              TOP TOOLBAR
          ===================================================== */}

          <header className="pa-toolbar">
            <div className="pa-brand">
              <motion.span
                className="pa-brand-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                🚀
              </motion.span>
              <div>
                <strong>Learning Adventure</strong>
                <span>Discover how you learn</span>
              </div>
            </div>

            <div className="pa-settings">
              <button type="button" className="pa-back-button" onClick={goToDashboard}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCalmMode((v) => !v)}
                aria-pressed={calmMode}
              >
                {calmMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{calmMode ? "Color" : "Calm"}</span>
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((v) => !v)}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? "Sound" : "Muted"}</span>
              </button>

              <button
                type="button"
                onClick={() => setBigText((v) => !v)}
                aria-pressed={bigText}
              >
                <Type className="w-4 h-4" />
                <span>{bigText ? "Normal" : "Big"}</span>
              </button>
            </div>
          </header>

          {/* =====================================================
              SINGLE-COLUMN CENTERED LAYOUT
          ===================================================== */}

          <div className="pa-layout-single">
            <section className="pa-main-card">
              <AnimatePresence mode="wait">
                {/* =============================================
                    WELCOME SCREEN
                ============================================= */}
                {!started && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="pa-welcome"
                  >
                    {/* Decorative rocket badge */}
                    <motion.div
                      className="pa-welcome-badge"
                      animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    >
                      <Rocket className="pa-welcome-badge-icon" />
                      <span className="pa-welcome-badge-ring" />
                    </motion.div>

                    <span className="pa-eyebrow">YOUR LEARNING JOURNEY</span>

                    <h1>Let's Discover How You Learn!</h1>

                    <p className="pa-welcome-description">
                      Try some fun activities. Take your time. There is no wrong way to explore and learn.
                    </p>

                    <div className="pa-skills-grid">
                      {(Object.keys(skillIcons) as Skill[]).map((skill) => (
                        <motion.div
                          className="pa-skill-item"
                          key={skill}
                          whileHover={{ y: -4, scale: 1.03 }}
                        >
                          <span>{skillIcons[skill]}</span>
                          <strong>{skill}</strong>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      type="button"
                      className="pa-primary-button"
                      onClick={startAssessment}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Rocket className="w-5 h-5" />
                      Start My Adventure
                      <Sparkles className="w-5 h-5" />
                    </motion.button>

                    <p className="pa-reassurance">
                      💙 You can ask for help whenever you need it.
                    </p>
                  </motion.div>
                )}

                {/* =============================================
                    RESULT SCREEN
                ============================================= */}
                {started && showResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="pa-result"
                  >
                    <motion.div
                      className="pa-result-icon"
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🏆
                    </motion.div>
                    <span className="pa-eyebrow">ADVENTURE COMPLETED</span>
                    <h1>You Did It!</h1>
                    <p>
                      Thank you for trying all the activities. Every effort is something to celebrate!
                    </p>

                    <div className="pa-score-circle">
                      <strong>
                        {score}/{questions.length}
                      </strong>
                      <span>Correct answers</span>
                    </div>

                    <div className="pa-result-note">
                      <span>🌟</span>
                      <p>
                        This activity is a starting point for understanding learning preferences.
                        It is not a medical or diagnostic assessment.
                      </p>
                    </div>

                    <div
                      className={`pa-save-status pa-save-${saveStatus}`}
                      role="status"
                      aria-live="polite"
                    >
                      {saveStatus === "saving" && (
                        <>
                          <Clock className="w-4 h-4 inline" /> Saving your results...
                        </>
                      )}
                      {saveStatus === "saved" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 inline" /> Your results are saved!
                        </>
                      )}
                      {saveStatus === "error" && (
                        <>
                          <XCircle className="w-4 h-4 inline" /> We couldn't save your results
                          {saveError ? ` (${saveError})` : ""}.
                        </>
                      )}
                    </div>

                    <div className="pa-result-actions">
                      {saveStatus === "saved" && (
                        <motion.button
                          type="button"
                          className="pa-primary-button"
                          onClick={goToDashboard}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <TrendingUp className="w-5 h-5" />
                          Go to Dashboard
                        </motion.button>
                      )}

                      {saveStatus === "error" && (
                        <>
                          <motion.button
                            type="button"
                            className="pa-primary-button"
                            onClick={() => void submitResults()}
                            whileHover={{ scale: 1.04 }}
                          >
                            <RotateCcw className="w-5 h-5" />
                            Retry Saving
                          </motion.button>

                          <button
                            type="button"
                            className="pa-secondary-button"
                            onClick={goToDashboard}
                          >
                            Go to Dashboard anyway
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        className="pa-secondary-button"
                        onClick={restartAssessment}
                        disabled={saveStatus === "saving"}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* =============================================
                    QUESTION SCREEN
                ============================================= */}
                {started && !showResult && (
                  <motion.div
                    key={`question-${currentIndex}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="pa-question-view"
                  >
                    <div className="pa-question-top">
                      <span className="pa-question-count">
                        Activity {currentIndex + 1} of {questions.length}
                      </span>

                      <span className="pa-skill-badge">
                        {skillIcons[currentQuestion.skill]} {currentQuestion.skill}
                      </span>
                    </div>

                    <div
                      className="pa-progress-track"
                      role="progressbar"
                      aria-valuenow={Math.round(questionProgress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Assessment progress"
                    >
                      <motion.div
                        className="pa-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${questionProgress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    <div className="pa-question-heading">
                      <motion.span
                        className="pa-question-icon"
                        animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {skillIcons[currentQuestion.skill]}
                      </motion.span>

                      <h1>{currentQuestion.title}</h1>
                      <p>{currentQuestion.description}</p>

                      <button
                        type="button"
                        className="pa-read-button"
                        onClick={() =>
                          speakOnRequest(
                            `${currentQuestion.title}. ${currentQuestion.description}`
                          )
                        }
                      >
                        <Volume2 className="w-4 h-4 inline mr-1.5" />
                        Read question aloud
                      </button>
                    </div>

                    <div className="pa-options" role="group" aria-label="Answer options">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === currentQuestion.answer;

                        let optionClass = "pa-option";
                        if (selectedAnswer !== null && isCorrect) {
                          optionClass += " pa-option-correct";
                        } else if (isSelected && !isCorrect) {
                          optionClass += " pa-option-wrong";
                        }

                        return (
                          <motion.button
                            type="button"
                            key={`${currentQuestion.id}-${option}`}
                            className={optionClass}
                            onClick={() => chooseAnswer(index)}
                            disabled={selectedAnswer !== null}
                            whileHover={selectedAnswer === null ? { y: -3, scale: 1.02 } : {}}
                            whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                          >
                            <span className="pa-option-letter">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="pa-option-text">{option}</span>
                            {selectedAnswer !== null && isCorrect && (
                              <span className="pa-option-status">
                                <CheckCircle2 className="w-5 h-5" />
                              </span>
                            )}
                            {isSelected && !isCorrect && (
                              <span className="pa-option-status">
                                <XCircle className="w-5 h-5" />
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pa-hint"
                        role="status"
                      >
                        <span>💡</span>
                        <p>
                          <strong>Here's a little hint:</strong> {currentQuestion.hint}
                        </p>
                        <button type="button" onClick={() => setShowHint(false)} aria-label="Close hint">
                          ✕
                        </button>
                      </motion.div>
                    )}

                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`pa-feedback ${
                          feedback === "correct" ? "pa-feedback-correct" : "pa-feedback-try"
                        }`}
                        role="status"
                      >
                        {feedback === "correct"
                          ? "🎉 Wonderful! That's correct!"
                          : "💙 Good try! The correct answer is highlighted above."}
                      </motion.div>
                    )}

                    <div className="pa-question-footer">
                      <button type="button" className="pa-secondary-button" onClick={revealHint}>
                        <Lightbulb className="w-4 h-4" />
                        Show Hint
                      </button>

                      <motion.button
                        type="button"
                        className="pa-primary-button pa-next-button"
                        onClick={nextQuestion}
                        disabled={selectedAnswer === null}
                        whileHover={selectedAnswer !== null ? { scale: 1.04 } : {}}
                        whileTap={selectedAnswer !== null ? { scale: 0.97 } : {}}
                      >
                        {currentIndex === questions.length - 1
                          ? "Submit & See Results"
                          : "Next Activity"}
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <p className="pa-footer-note">
                      🌱 Everyone learns differently. Just do your best!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>

          <footer className="pa-page-footer">
            Made with 💜 for every unique learner
          </footer>
        </main>
      </div>
    </div>
  );
}