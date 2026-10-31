import { motion, AnimatePresence } from "framer-motion";

const PRAISE = ["Awesome! 🎉", "Great job! 🌟", "You got it! 💪", "Brilliant! ✨", "Superstar! ⭐"];
const ENCOURAGE = ["Almost! Try again 💛", "Good try! 🌱", "Keep going! 🚀", "You're learning! 📚"];

export function FeedbackBubble({
  state,
}: {
  state: "correct" | "wrong" | null;
}) {
  const text =
    state === "correct"
      ? PRAISE[Math.floor(Math.random() * PRAISE.length)]
      : state === "wrong"
      ? ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]
      : "";

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-2xl px-5 py-3 text-base font-extrabold shadow-xl ${
            state === "correct"
              ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white"
              : "bg-gradient-to-r from-amber-300 to-orange-400 text-white"
          }`}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}