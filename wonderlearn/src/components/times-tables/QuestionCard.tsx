import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Clock } from "lucide-react";
import { Question } from "@/utils/questionGenerator";

interface Props {
  question: Question;
  choices?: number[];
  onChoice?: (n: number) => void;
  onSpeak: () => void;
  disabled?: boolean;
}

export function QuestionCard({ question, choices, onChoice, onSpeak, disabled }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative w-full rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border border-white/60"
    >
      <button
        onClick={onSpeak}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition"
        aria-label="Read question aloud"
      >
        <Volume2 className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
          {question.type}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" /> Table of {question.table}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.h2
          key={question.prompt}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 text-center leading-tight py-6"
        >
          {question.prompt}
        </motion.h2>
      </AnimatePresence>

      {choices && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          {choices.map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: disabled ? 1 : 1.03 }}
              whileTap={{ scale: disabled ? 1 : 0.97 }}
              onClick={() => onChoice?.(c)}
              disabled={disabled}
              className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 px-4 py-5 text-2xl font-extrabold text-slate-800 hover:border-violet-400 hover:from-violet-50 hover:to-fuchsia-50 transition disabled:opacity-50"
            >
              {c}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}