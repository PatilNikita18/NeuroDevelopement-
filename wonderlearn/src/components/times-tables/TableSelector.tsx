import { motion } from "framer-motion";
import { Difficulty } from "@/utils/questionGenerator";

interface Props {
  table: number;
  difficulty: Difficulty;
  questionCount: number;
  onTable: (n: number) => void;
  onDifficulty: (d: Difficulty) => void;
  onCount: (n: number) => void;
}

const TABLES = Array.from({ length: 12 }, (_, i) => i + 1);

export function TableSelector({
  table,
  difficulty,
  questionCount,
  onTable,
  onDifficulty,
  onCount,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/80">
          Pick a table
        </p>
        <div className="grid grid-cols-6 gap-2">
          {TABLES.map((n) => (
            <motion.button
              key={n}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onTable(n)}
              className={`flex h-12 items-center justify-center rounded-2xl text-lg font-extrabold shadow-md transition ${
                table === n
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white ring-4 ring-white/40"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
              }`}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => onDifficulty(d)}
            className={`rounded-2xl px-3 py-3 text-sm font-bold capitalize transition ${
              difficulty === d
                ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white/80">
          Questions
        </p>
        <div className="flex gap-2">
          {[5, 10, 20].map((n) => (
            <button
              key={n}
              onClick={() => onCount(n)}
              className={`flex-1 rounded-2xl px-3 py-3 text-sm font-bold transition ${
                questionCount === n
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/25"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}