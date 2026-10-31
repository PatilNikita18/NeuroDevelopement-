import { motion } from "framer-motion";

export function HintButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sun-100 text-sun-700 font-display font-semibold shadow-[var(--shadow-softer)] hover:bg-sun-300 hover:text-white transition-colors"
    >
      💡 Hint
    </motion.button>
  );
}
