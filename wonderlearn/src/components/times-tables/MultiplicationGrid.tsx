import { motion } from "framer-motion";

interface Props {
  table: number;
  multiplier: number;
  highlight?: number;
}

// Visual array: shows table × multiplier as dots
// Helps children SEE the multiplication.
export function MultiplicationGrid({ table, multiplier, highlight }: Props) {
  const total = Math.min(table * multiplier, 144); // cap for sanity
  const cols = table;
  const rows = multiplier;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-bold uppercase tracking-wider text-white/70">
        Visual: {multiplier} rows × {table} per row
      </p>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.012, type: "spring", stiffness: 400 }}
            className={`h-3.5 w-3.5 rounded-full shadow-sm ${
              highlight === i
                ? "bg-yellow-300 ring-2 ring-yellow-100"
                : "bg-gradient-to-br from-cyan-300 to-blue-500"
            }`}
          />
        ))}
      </div>
      <p className="text-2xl font-extrabold text-white">
        {rows} × {cols} = <span className="text-yellow-300">{table * multiplier}</span>
      </p>
    </div>
  );
}