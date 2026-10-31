import { motion } from "framer-motion";

export function AudioButton({
  label = "Read aloud",
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={label}
      className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xl shadow-[var(--shadow-softer)] hover:bg-sky-300 hover:text-white transition-colors"
    >
      🔊
    </motion.button>
  );
}
